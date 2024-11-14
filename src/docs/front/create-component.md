# Create a Vue component
## Resources
- [Official Vue3 documentation](https://vuejs.org/guide/introduction.html)

## Introduction
Vue.js is a progressive JavaScript framework for building user interfaces. It is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only and is easy to pick up and integrate with other libraries or existing projects.

## Our usages
We use Vue.js to create interactive user interfaces. We use Vue.js to create components that can be reused in different parts of the application. We work with **Options API** only for now.

## Create a Vue interface with Joomla!
### Joomla! view definition
To create a Vue interface with Joomla!, you need to create a view in the `views` folder of your component. Here is an example of the contents of the `views/hello/view.html.php` file:
```php
<?php
/**
 * @package     Joomla
 * @subpackage  com_hello
 */

// No direct access to this file
defined('_JEXEC') or die('Restricted access');

use Joomla\CMS\Factory;

/**
 * Hello View
 */
class HelloViewHello extends JViewLegacy
{

	function display($tpl = null)
	{
		$jinput = Factory::getApplication()->input;

		// Display the template
		$layout = $jinput->getString('layout', null);
		
		// Display the template
		parent::display($tpl);
	}
}
```

Then create a `views/hello/tmpl/default.php` file in the same folder to define the template. Here is an example of the contents of the `views/hello/tmpl/default.php` file:
```php
<?php

/**
 * @package     Joomla
 * @subpackage  com_hello
 */

// No direct access to this file
defined('_JEXEC') or die('Restricted Access');

use Joomla\CMS\Language\Text;

/** IMPORT TRANSLATIONS TAGS **/
Text::script('COM_EMUNDUS_ONBOARD_MODIFY');
?>

<!-- Initialize the Vue div using to mount the Vue component -->
<div 
    <!-- id is always em-component-vue -->
    id="em-component-vue"
    <!-- component is the name of the Vue component that you want to use -->
    component="List"
    <!-- data is the data that you want to pass to the Vue component -->
    message="hello world"
    other_data="<?php echo $user->id; ?>"
>
</div>

<!-- Load the Vue component -->
<script type="module" src="media/com_emundus_vue/app_emundus.js"></script>
```

### Vue component definition
To create a Vue component, you need to create a Vue file in the `src/views` folder of your component. Here is an example of the contents of the `src/views/HelloWord.vue` file:
```vue
<template>
    <div>
        <h1>{{ message }}</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: 'Hello World'
        }
    }
}
</script>
```

### Go further
Now that you have created a Vue component, you can go further by creating more complex components. You can use Pinia to manage the state of your application, create other components to use in your view.