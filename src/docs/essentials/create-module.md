# Create a module
## Resources
- [Official Joomla! documentation](https://manual.joomla.org/docs/next/building-extensions/modules/module-development-tutorial/)
- [Parameter types](https://manual.joomla.org/docs/general-concepts/forms-fields/standard-fields/)

## Introduction
A Joomla module is an extension that displays information on site pages.
Modules are generally used to display information on site pages, such as menus, articles, search forms, etc. Modules are stored in the `modules` folder on the site.
Modules are associated with positions that are defined by the template used.

## Create a module
### Module definition
Let's take the example of a `hello` module. To create a `hello` module, you need to create a `hello` folder in the `modules` folder on your site. Then create a `mod_hello.xml` file in this folder to describe the module and define parameters. Here is an example of the contents of the `mod_hello.xml` file:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<extension type="module" client="site" method="upgrade">
    <name>My Hello module</name>
    <version>1.0.0</version>
    <author>dev@emundus.fr</author>
    <creationDate>01/08/2024</creationDate>
    <description>A module to display a hello text</description>
    <namespace path="src">Emundus\Module\Hello</namespace>
    <files>
        <folder module="mod_hello">services</folder>
        <folder>src</folder>
    </files>
    <config>
        <fields name="params">
            <fieldset name="basic">
            <field name="message"
                   type="text"
                   default="Hello dear"
                   label="MOD_HELLO_PARAMS_TEXT_LABEL"
                   description="MOD_HELLO_PARAMS_TEXT_DESC"/>
            </fieldset>
        </fields>
    </config>
</extension>
```
You can consult the list of available parameter types [here](https://manual.joomla.org/docs/general-concepts/forms-fields/standard-fields/)

### Preparing the module
Next, create a `Dispatcher.php` file in the `src/Dispatcher` folder. Here is an example of the contents of the `Dispatcher.php` file:
```php
<?php
namespace Emundus\Module\Hello\Site\Dispatcher;

use Joomla\CMS\Dispatcher\AbstractModuleDispatcher;
use Joomla\CMS\Factory;

// phpcs:disable PSR1.Files.SideEffects
\defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Dispatcher class for mod_hello
 *
 * @since  4.4.0
 */
class Dispatcher extends AbstractModuleDispatcher
{

    /**
     * Check context and define data to pass to the layout
     *
     * @return  array
     *
     * @since   2.0.0
     */
    protected function getLayoutData(): array
    {
        $data   = parent::getLayoutData();
        
        // Get the module parameters
        $params = $data['params'];

        return $data;
    }
}
```

### Create the module
You can now create a `default.php` file in a `tmpl` folder. This will contain the HTML content of the module. Here is an example of the content of the `default.php` file:
```php
<?php
?>
<h4><?php echo $params->get('message');?></h4>
```

### Loading the module
So that Joomla knows how to load the module, you need to create a `services` folder with a file called `provider.php`. Here is an example of content for the `provider.php` file:
```php
<?php
\defined('_JEXEC') or die;

use Joomla\CMS\Extension\Service\Provider\HelperFactory;
use Joomla\CMS\Extension\Service\Provider\Module;
use Joomla\CMS\Extension\Service\Provider\ModuleDispatcherFactory;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;

/**
 * The articles category module service provider.
 *
 * @since  4.4.0
 */
return new class () implements ServiceProviderInterface {
    /**
     * Registers the service provider with a DI container.
     *
     * @param   Container  $container  The DI container.
     *
     * @return  void
     *
     * @since   4.4.0
     */
    public function register(Container $container)
    {
        // Register Dispatcher.php file
        $container->registerServiceProvider(new ModuleDispatcherFactory('\\Emundus\\Module\\Hello'));
        // Register the helper factory (if any) located in src/Helper/HelloHelper.php
        $container->registerServiceProvider(new HelperFactory('\\Emundus\\Module\\Hello\\Site\\Helper'));
        // Register this folder as a Joomla! module
        $container->registerServiceProvider(new Module());
    }
};
```