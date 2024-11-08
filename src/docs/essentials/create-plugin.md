# Create a plugin
## Resources
- [Official Joomla! documentation](https://manual.joomla.org/docs/next/building-extensions/plugins/basic-content-plugin)

## Introduction
Plugins are triggered by events in Joomla! and can be used to modify the behaviour of Joomla! or to add additional functionality. Plugins are extensions which are installed in the Joomla! `plugins` directory and are generally associated with specific events.
## Create a plugin
### Plugin definition
Let's take the example of a plugin whose purpose is to ask the user to reset their password every 6 months. As this plugin is linked to the user's connection, we'll place it in the `plugins/user/ask_password_reset` folder. Once the folder has been created, we'll add an `ask_password_reset.xml` file to describe the plugin and define the parameters. Here is an example of the contents of the `ask_password_reset.xml` file:
```xml
<?xml version="1.0" encoding="utf-8"?>
<extension method="upgrade" type="plugin" group="user">
    <name>PLG_USER_ASK_PASSWORD_RESET</name>
    <version>1.0</version>
    <description>PLG_USER_ASK_PASSWORD_RESET_DESCRIPTION</description>
    <author>dev@emundus.fr</author>
    <creationDate>02/08/2024</creationDate>
    <copyright>(C) 2024 Open Source Matters, Inc.</copyright>
    <license>GNU General Public License version 2 or later</license>
    <namespace path="src">Emundus\Plugin\User\AskPasswordReset</namespace>
    <files>
        <folder plugin="ask_password_reset">services</folder>
        <folder>src</folder>
    </files>
    <languages>
        <language tag="en-GB">language/en-GB/plg_user_ask_password_reset.ini</language>
        <language tag="en-GB">language/en-GB/plg_user_ask_password_reset.sys.ini</language>
    </languages>
    <config>
        <fields name="params">
            <fieldset name="basic">
                <field name="delay"
                       type="text"
                       default="60"
                       label="PLG_ASK_PASSWORD_RESET_PARAMS_DELAY_LABEL"
                       description="PLG_ASK_PASSWORD_RESET_PARAMS_DELAY_DESC"/>
            </fieldset>
        </fields>
    </config>
</extension>
```
You can consult the list of available parameter types [here](https://manual.joomla.org/docs/general-concepts/forms-fields/standard-fields/)
A few points to note about the XML file:
- `group="user"` : the plugin group to which the plugin belongs. If the plugin is linked to a Fabrik element, the group will be `fabrik_element`
- `namespace path="src"` : the plugin namespace, like the plugin group, the namespace depends on the type of plugin

### Create the plugin
Now that the plugin is defined, we'll create the `AskPasswordReset.php` file in the `src/Extension` folder. Here is an example of the contents of the `AskPasswordReset.php` file:
```php
<?php
namespace Emundus\Plugin\Users\AskPasswordReset\Extension;

// phpcs:disable PSR1.Files.SideEffects
\defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

use Joomla\CMS\User\UserFactoryAwareTrait;
use Joomla\Database\DatabaseAwareTrait;
use Joomla\Event\SubscriberInterface;

/**
 * Emundus AskPasswordReset User plugin
 *
 * @package     Joomla.Plugin
 * @subpackage  User.ask_password_reset
 * @since       2.0.0
 */
class AskPasswordReset extends CMSPlugin implements SubscriberInterface
{
    use DatabaseAwareTrait;
	use UserFactoryAwareTrait;
}
```

As mentioned above, plugins run on Joomla! events. These events are triggered in the code by `trigger` and are listened to by the plugins. To listen to an event, you need to implement the `SubscriberInterface` and define the `getSubscribedEvents` method. Here is an example of this method for the `AskPasswordReset.php` file:
```php
<?php
public static function getSubscribedEvents(): array
{
    return [
        'onUserLogin' => 'checkPasswordReset'
    ];
}
```
For our plugin, we'll listen for the `onUserLogin` event and call the `checkPasswordReset` method each time this event is triggered.
All that's left is to implement the `checkPasswordReset` method to ask the user to reset their password if the time limit has passed.

### Load the plugin
As with modules, you need to tell Joomla what needs to be loaded to make the plugin work. To do this, you need to add a `provider.php` file to the plugin's `services` folder. Here is an example of the content of the `provider.php` file:
```php
<?php
\defined('_JEXEC') or die;

use Joomla\CMS\Extension\PluginInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Plugin\PluginHelper;
use Joomla\CMS\User\UserFactoryInterface;
use Joomla\Database\DatabaseInterface;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;
use Joomla\Event\DispatcherInterface;
use Emundus\Plugin\User\AskPasswordReset\Extension\AskPasswordReset;

return new class () implements ServiceProviderInterface {
    
    public function register(Container $container)
    {
        $container->set(
            PluginInterface::class,
            function (Container $container) {
                $plugin = new AskPasswordReset(
                    $container->get(DispatcherInterface::class),
                    (array) PluginHelper::getPlugin('user', 'ask_password_reset')
                );
                $plugin->setApplication(Factory::getApplication());
                $plugin->setDatabase($container->get(DatabaseInterface::class));
                $plugin->setUserFactory($container->get(UserFactoryInterface::class));

                return $plugin;
            }
        );
    }
};
```
