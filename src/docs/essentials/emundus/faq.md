# Frequently Asked Questions

::: details Retrieve my user's eMundus session
```php
$app = Factory::getApplication();
$session = $app->getSession();
$session->get('emundusUser', null);
```
:::