# Understanding the database by Joomla!
## Resources
- [Official Joomla! documentation](https://manual.joomla.org/docs/next/general-concepts/database/)

## Points of attention
- Use `->quoteName()` for column and table names
- Use `->quote()` for values

## Inserting via an associative table
Rather than making an SQL query to insert data, you can use the `insertObject()` method of the `DatabaseDriver` class to insert an object into a table. When you use this method, you don't need to specify `->quoteName()` or `->quote()`.
```php
<?php
// Get a db connection.
$db = Factory::getContainer()->get('DatabaseDriver');

$campaign = [
    'label' => 'Campagne 1',
    'description' => 'Description de la campagne 1',
    'start_date' => '2024-08-02 12:00:00',
    'end_date' => '2024-09-02 12:00:00'
];
$campaign (object) $campaign;
$db->insertObject('#__emundus_campaigns', $campaign);
```

## Update via an associative table
Rather than making an SQL query to update data, you can use the `updateObject()` method of the `DatabaseDriver` class to update an object in a table. When you use this method, you don't need to specify `->quoteName()` or `->quote()`.
```php
<?php
// Get a db connection.
$db = Factory::getContainer()->get('DatabaseDriver');

$campaign = [
    'id' => 1,
    'label' => 'Le nouveau nom de ma campagne'
];
$campaign (object) $campaign;

// The last parameter is the column name to use as where condition
$db->updateObject('#__emundus_campaigns', $campaign, 'id');
```
