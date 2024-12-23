# Understanding the database by Joomla!
## Resources
- [Official Joomla! documentation](https://manual.joomla.org/docs/next/general-concepts/database/)

## Points of attention
- Use `->quoteName()` for column and table names
- Use `->quote()` for values

## Initialize a query
To initialize a query, you can use the `getQuery()` method of the `DatabaseDriver` class. This method returns a new `Query` object.
```php
<?php
// Get a db connection.
$db = Factory::getContainer()->get('DatabaseDriver');
$query = $db->createQuery();
```

## Selecting data
To select data from a table, you can use the `select()` method of the `Query` object. This method takes an array of column names as its first parameter and the table name as its second parameter.
```php
<?php
// Get a db connection.
$db = Factory::getContainer()->get('DatabaseDriver');
$query = $db->createQuery();

$query->select(['id', 'label', 'description'])
    ->from($db->quoteName('#__emundus_setup_campaigns'));
$db->setQuery($query);
$campaigns = $db->loadObjectList();
```

## Where clause
To add a `WHERE` clause to a query, you can use the `where()` method of the `Query` object. This method takes three parameters: the column name, the operator, and the value.
```php
<?php
// Get a db connection.
$db = Factory::getContainer()->get('DatabaseDriver');
$query = $db->createQuery();

$query->select(['id', 'label', 'description'])
    ->from($db->quoteName('#__emundus_setup_campaigns'))
    ->where($db->quoteName('id') . '= 1');
$db->setQuery($query);
$campaign = $db->loadObject();
```

### Extending the where clause
You can extend the `WHERE` clause by using the `andWhere()` method of the `Query` object. This method takes the same parameters as the `where()` method.
```php
<?php
// Get a db connection.
$db = Factory::getContainer()->get('DatabaseDriver');
$query = $db->createQuery();

$query->select(['id', 'label', 'description'])
    ->from($db->quoteName('#__emundus_setup_campaigns'))
    ->where($db->quoteName('id') . '= 1')
    ->andWhere($db->quoteName('label') . ' LIKE ' . $db->quote('Campagne 1'));
$db->setQuery($query);
$campaign = $db->loadObject();
```

You can also use the `extendWhere()` method of the `Query` object to extend the `WHERE` clause. This method takes the same parameters as the `where()` method.
```php
<?php
// Get a db connection.
$db = Factory::getContainer()->get('DatabaseDriver');
$query = $db->createQuery();

$query->select(['id', 'label', 'description'])
    ->from($db->quoteName('#__emundus_setup_campaigns'))
    ->where($db->quoteName('id') . '= 1')
$query->extendWhere(
    'AND',
    [
        $db->quoteName('a.publish_up') . ' IS NULL',
        $db->quoteName('a.publish_up') . ' <= :publishUp',
    ],
    'OR'
);
$query->bind(':publishUp', '2024-08-02 12:00:00', ParameterType::STRING);
$db->setQuery($query);
$campaign = $db->loadObject();
```    

This will generate the following SQL query:
```sql
SELECT `id`, `label`, `description`
FROM `#__emundus_setup_campaigns`
WHERE `id` = 1
AND (`a.publish_up` IS NULL OR `a.publish_up` <= '2024-08-02 12:00:00')
```

## Binding parameters
To bind parameters to a query, you can use the `bind()` method of the `Query` object. This method takes two parameters: the name of the parameter and its value.
```php
<?php
// Get a db connection.
$db = Factory::getContainer()->get('DatabaseDriver');
$query = $db->createQuery();

$query->select(['id', 'label', 'description'])
    ->from($db->quoteName('#__emundus_setup_campaigns'))
    ->where( $db->quoteName('a.id') . ' = :pk');
$query->bind(':pk', 1, ParameterType::INTEGER);
$db->setQuery($query);
$campaign = $db->loadObject();
```

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
