# Create a view/page in Joomla!
## Resources
- [Official Joomla! documentation](https://manual.joomla.org/docs/next/building-extensions/components/mvc/mvc-overview#view)

## Introduction
A Joomla view can be considered as a page. It is responsible for displaying data to the user. Views are generally PHP files containing HTML and PHP code. Views are stored in the `views` folder of the component.

The `views` folder contains a folder for each view. Each view folder can contain files for each type of view. For example, if you have a `hello` view, you will have a `hello` folder in the `views` folder and a `view.html.php` file in that folder.

## View types
There are several types of view in Joomla. The most common view types are :
- `view.html.php` : The most common type, used to display an HTML page **with associated modules** in the menu calling up this view.
- `view.json.php` : Used to display data in JSON format.
- `view.raw.php` : Used to display raw data. These views will display HTML **without the modules associated** with the menu calling this view.

## Créer une vue
Let's take the example of a `hello` view. To create a `hello` view, you need to create a `hello` folder in the `views` folder of your component. Then create a `view.html.php` file in this folder. Here is an example of the contents of the `view.html.php` file:

```php
<?php
// phpcs:disable PSR1.Files.SideEffects
\defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

jimport('joomla.application.component.view');

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\MVC\View\HtmlView;

/**
 * HTML Hello View class for the Emundus component
 *
 * @package    Emundus
 */
class EmundusViewHello extends HtmlView
{
    private $app;
    
    // Define variables to pass in template
    protected $hello_text;
    
    function __construct($config = array())
	{
	    require_once(JPATH_BASE . '/components/com_emundus/helpers/access.php');
	    $this->app = Factory::getApplication();
	    
	    parent::__construct($config);
	}
	
	function display($tpl = null)
	{
	    // Define minimal access for access to this view
	    if (!EmundusHelperAccess::asPartnerAccessLevel($this->user->id)) {
			die(Text::_('COM_EMUNDUS_ACCESS_RESTRICTED_ACCESS'));
		}
		
		$this->hello_text = 'Hello dear';
		
		parent::display();
	}
}
```

This file will allow to:
- initialise variables according to the context and then use them in the HTML view
- check that the call to this view is valid: does the current user have the necessary rights, for example

Now we need to create the file that will host our HTML content. To do this, we need to create a `tmpl` folder in the `views/hello` folder. In this folder we will create 2 files:
- `default.php` : this file will contain the HTML content
- `default.xml` : this file will allow us to call our view from a Joomla! menu link and describe its use

Here is an example of content for `default.php` :
```php
<?php
?>
<div>
    <p><?php echo $this->hello_text; ?></p>
</div>
<script type="application/javascript">
</script>
```

Here is an example of content for `default.xml` : 
```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata>
	<layout title="COM_EMUNDUS_HELLO_VIEW_DEFAULT_TITLE">
		<message>
			<![CDATA[COM_EMUNDUS_HELLO_VIEW_DEFAULT_DESC]]>
		</message>
	</layout>
</metadata>
```

`COM_EMUNDUS_HELLO_VIEW_DEFAULT_TITLE` et `COM_EMUNDUS_HELLO_VIEW_DEFAULT_DESC` are translation tags that must be added to the language files located in the `administrator/components/com_emundus/language/`

## Tester ma vue
Now that your eyesight is ready, you can [create a Joomla! menu link](https://docs.joomla.org/J3.x:Adding_a_new_menu/fr) to view it.