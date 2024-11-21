# Some reminders

## PHP Classes
The model is a PHP class defined as follows :
```php
class EmundusModelUsers extends JModelList {
    private $_db;

    ...
}
```

Each time a class method is called, the public function `__construct()` method is called. It is in this method that we will define our class attributes:
```php
public function __construct() {
        parent::__construct();
        
        $this->_db = JFactory::getDBO();
}
```

So, in method requests (for example: `getProfileColor`) you can use `$this->_db`, which saves you having to copy/paste the line `$db = Factory::getContainer('DatabaseDriver');` everywhere. It's also handy if you need to change the method for retrieving `$db` (Joomla 4 for example) as it only changes one line.
Furthermore, we can also see that the `EmundusModelUsers` class extends the `JModelList` class, which means that the `EmundusModelUsers` class can use all the attributes and public and protected methods of the `JModelList` class.
Also, if we look at the `JModelList`:
```php
class ListModel extends BaseDatabaseModel
{ }
```
This class also extends another class, `BaseDatabaseModel`. This class has the `$_db` attribute:
```php
abstract class BaseDatabaseModel
{
    protected $_db;
        ...
}
```
which means that we can use `$this->_db` in the `EmundusModelUsers` class without having to define it.
```php
class EmundusModelUsers extends JModelList {

    public function getProfileColor() {
         // Ceci fonctionne car $this->_db est défini dans la classe BaseDatabaseModel
         $query = $this->_db->getQuery(true);
    }
}
```