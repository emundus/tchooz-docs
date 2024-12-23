# Adding methods

## Add a method to a controller

The main role of a controller is to check access to an action according to the user and the parameters passed.
On Joomla, all controllers extend the JControllerLegacy class, which already has certain attributes and methods to
facilitate this control.
Below is a typical :

```php
<?php
    public function createcampaign() {
        $response = array('status' => false, 'msg' => Text::_('ACCESS_DENIED'));

        // Check if the user has the necessary rights to access this method
        // $this->user ou $this->_user is always available in a controller
        if (!EmundusHelperAccess::asPartnerAccessLevel($this->_user->id)) 
        {
            header('HTTP/1.1 403 Forbidden');
        } 
        else {
            // Use $this->input to retrieve the data sent by the client
            // getArray() returns an associative array of the data sent
            $data = $this->input->getArray();
            $data['user'] = $this->_user->id;

            // Call the model method to create a campaign
            $result = $this->m_campaign->createCampaign($data);

            // Manage the result of the model method
            if ($result) {
                $response = array('status' => true, 'msg' => Text::_('CAMPAIGN_ADDED'), 'data' => $result);
            } else {
                $response['msg'] = Text::_('ERROR_CANNOT_ADD_CAMPAIGN');
                $response['data'] = $result;
            }
        }
        
        // Return the response in JSON format
        echo json_encode((object)$response);
        exit;
    }
```

> [!TIP]
> If a model is not initialised (here `$this->m_campaign` for example) use the following method: `$this->getModel('Campaign);` This method includes the file's require_once if necessary and instantiates it only if it is not already instantiated in the current context.

## Add a method to a model
Its role is to execute actions without having to define a context; the context is defined at controller level.
On Joomla, all models extend the JModelList class, which already has certain attributes and methods to facilitate this control.

> [!TIP]
> If you need to initialise `$db` you can use the following method of the extended class: $this->getDatabase(); `$this->getDatabase();` or `Factory::getContainer()->get('DatabaseDriver');`

```php
    function getCampaignsByProgramId($program) {
        // Initialize the variable
        $campaigns = [];

        if (!empty($program)) {
            // Use query builder to create a query
            // $this->_db ou $this->db need to be initialised in the model constructor
            $query = $this->_db->getQuery(true);
            $date = new Date();

            $query->select('sc.*')
                ->from($this->_db->quoteName('#__emundus_setup_programmes','sp'))
                ->leftJoin($this->_db->quoteName('#__emundus_setup_campaigns', 'sc') . ' ON ' . $this->_db->quoteName('sp.code') . ' LIKE ' . $this->_db->quoteName('sc.training'))
                ->where($this->_db->quoteName('sp.id') . ' = ' . $this->_db->quote($program))
                ->andWhere($this->_db->quoteName('sc.end_date') . ' >= ' . $this->_db->quote($date));

            // Do not forget to catch exceptions
            try {
                $this->_db->setQuery($query);
                $campaigns = $this->_db->loadObjectList();
            } catch (Exception $e){
                Log::add('component/com_emundus/models/campaign | Error when try to get campaigns associated to programs : ' . preg_replace("/[\r\n]/"," ",$query->__toString().' -> '.$e->getMessage()), Log::ERROR, 'com_emundus.error');
            }
        }

        // We return the result, and the controller will manage the response
        return $campaigns;
    }
```

> [!WARNING]
> Avoid calling the current user in a method of the model: `Factory::getApplication()->getIdentity();` Use an additional parameter `$user = null`, if the parameter is empty then the current user is retrieved.