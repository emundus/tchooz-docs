---
outline: deep
---

# Standalone installation

[[toc]]

## Installing the web server: Apache2
For the Tchooz web application to work properly, which is based on PHP and operates via the HTTP/HTTPS protocols, it is essential to install a web server. You can use Apache or Nginx.

### Step 1: System update
Before starting the installation, we need to update the repositories and the packages already installed. Run the following command:
```bash
sudo apt update && apt -y upgrade
```

### Step 2: Installing Apache2
We are now going to install Apache2 and its required dependencies:
```bash
sudo apt install -y apache2 libapache2-mod-security2 apt-transport-https ca-certificates curl libxml2-dev python3-apt
```

### Step 3: Activating the expires module
It is also important to activate the Apache expires module to optimise resource management. Run the following commands:
```bash
sudo a2enmod expires
sudo systemctl restart apache2
```

### Step 4: Configuring automatic start-up
To ensure that Apache2 starts automatically when the system is rebooted, run :
```bash
sudo systemctl enable apache2
```

### Step 5: Installing PHP
The Tchooz platform requires PHP to run, but this is not installed by default with Apache2. PHP version 8.2 is currently recommended for the Tchooz software.
To install PHP and its extensions, you must first add the Sury package repository and trust its :
```bash
sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
```

### Step 6: Configuring the PHP repository
> [!WARNING]
> À partir d’ici toutes les valeurs que vous devrez changer seront entourées de doubles accolades :
> {{ exemple }} 
> Veuillez donc bien relire chaque ligne avant de les utiliser.

```bash
sudo echo "deb https://packages.sury.org/php/ {{ os_name_version }} main" >> /etc/apt/sources.list.d/php.list
sudo apt-get update
```
> [!NOTE]
> `os_name_version` : Nom de la version Debian que vous utilisez. Debian 12 est très fortement recommandé (bookworm).


### Step 7: Installing PHP extensions
The following PHP extensions are required for Tchooz to function correctly:
- `gd` 
- `cli` 
- `common` 
- `mbstring` 
- `bcmath` 
- `ldap` 
- `libapache2-mod-php8.2`
- `pdo` 
- `mysql` 
- `zip` 
- `xml` 
- `curl` 
- `intl` 
- `redis` 
- `xmlrpc` 
- `gmp` 
- `bz2` 
- `apcu`

To install these extensions, run the following command:
```bash
sudo apt install -y php8.2 php8.2-cli php8.2-pdo php8.2-common php8.2-mysql php8.2-zip php8.2-gd php8.2-mbstring php8.2-curl php8.2-xml php8.2-bcmath php8.2-ldap php8.2-intl php8.2-redis php8.2-xmlrpc php8.2-gmp php8.2-bz2 php8.2-apcu libapache2-mod-php8.2
```

### Step 8: Configuration de PHP
You then need to set certain PHP configuration parameters:
- Increase the maximum size of uploaded files in /etc/php/8.2/apache2/php.ini:
    ```bash
    upload_max_filesize = 20M
    ```
- Adjust the Apache configuration parameters according to your number of CPU cores in the /etc/apache2/mods-available/mpm_prefork.conf file:  
    Pour un système avec moins de 4 cœurs :
    ```bash
      StartServers				5
      MinSpareServers				5
      MaxSpareServers				10
      ServerLimit					150
      MaxRequestWorkers			150
      MaxConnectionsPerChild		0
    ```

    Pour un système avec 4 à 8 cœurs :
    ```bash
    StartServers				40
    MinSpareServers				50
    MaxSpareServers				100
    ServerLimit					500
    MaxRequestWorkers			500
    MaxConnectionsPerChild		750
    ```

    Pour un système avec plus de 8 cœurs :
    ```bash
    Pour un système avec plus de 8 cœurs :
    StartServers				80
    MinSpareServers				100
    MaxSpareServers				200
    ServerLimit					1000
    MaxRequestWorkers			1000
    MaxConnectionsPerChild		1500
    ```
  
### Step 9: Restarting Apache
After making these changes, you need to restart Apache2:
```bash
sudo systemctl restart apache2
```

## Installing third-party components
To ensure the proper functioning of certain Tchooz modules, it is necessary to install additional packages. The EMUNDUS support team may need these packages during the :
- `nodejs`
- `npm`
- `yarn`
- `python3`
- `python3-mysqldb`
- `python3-pip`
In a Debian environment, these packages are usually available in the official repositories. To install them, run the following commands:
```bash
sudo apt update && sudo apt install -y nodejs npm yarn python3 python3-mysqldb python3-pip python3-pymysql
```

## DBMS installation: MySQL
For the platform to function properly, a database management system (DBMS) is required. We will use MySQL as the database for our application platform.

### Step 1: Adding the MySQL repository
Before installing MySQL, you must first add the repository and trust the MySQL key. Depending on your network environment, the commands will vary:
- without a web proxy on your infrastructure (default) :
    ```bash
    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys B7B3B788A8D3785C
    ```
- with proxy on your infrastructure (customised) :
    ```bash
    sudo apt-key adv --keyserver keyserver.ubuntu.com --keyserver-options http-proxy={{ proxy_address }} --recv-keys B7B3B788A8D3785C
    ```
  > [!NOTE]
  > Replace {{ proxy_address }} with the address of the proxy you wish to use if necessary.

### Step 2: Configuring the MySQL repository
To install MySQL, first update the repositories, then install the MySQL server using the following commands:
```bash
sudo apt update
sudo apt install mysql-server -y
```

[Node-url]: https://nodejs.org/
[Node-min-badge]: https://img.shields.io/badge/min-16.x-orange
[Node-reco-badge]: https://img.shields.io/badge/recommended-18.x-green
[Composer-local-installation]: https://getcomposer.org/download/
[Composer-global-installation]: https://getcomposer.org/doc/00-intro.md#globally
[PHP-min-badge]: https://img.shields.io/badge/dependencies-PHP%207.4-green
[PHP-url]: https://www.php.net/manual/en/install.macosx.php
