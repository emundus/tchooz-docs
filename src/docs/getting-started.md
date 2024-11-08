---
outline: deep
---

# Getting Started

[[toc]]

## Presentation
Manage your application campaigns and calls for proposals simply

* Manage your application programmes, create your application portal and launch your campaign
* Evaluate the content of applications
* Automatic response
* Archive and export campaign data
* Create automatic notifications to your applicants
* Group your files using status and tags
* Manage your user profiles and groups
* Granular rights management
* And much more!

## Prerequisites
### PHP
[![PHP][PHP-min-badge]][PHP-url]
* MacOS : It's recommended to install PHP with homebrew : `brew install php`. You can switch of versions by adding `@7.x`.
    * If you need more informations : https://daily-dev-tips.com/posts/installing-php-on-your-mac/
* Windows : You can use [XAMPP](https://www.apachefriends.org/index.html) or [WAMP](https://www.wampserver.com/en/)

### NodeJS
[![Node][Node-min-badge]][Node-url]

[![Node][Node-reco-badge]][Node-url]

This project is built with VueJS so it is necessary to have NodeJS installed on your computer.
* MacOS : Download Node [here][Node-url] OR if you use homebrew run following command
    * `brew install node`
* Windows : Download Node [here][Node-url]

### Composer
Joomla requires an installation of composer.
You can install composer only for this project by following this [documentation][Composer-local-installation].

If you need composer for other project you can install it globally by following this [chapter][Composer-global-installation].

## Installation
```bash
git clone https://github.com/emundus/tchooz.git
```

### Via Docker
The easiest way to get started with Tchooz is to use Docker. You can run the following command in your terminal to start a new Tchooz project:

```bash
cp docker-compose.yml docker-compose-[username].yml
docker-compose -f docker-compose-bhubinet.yml up --build -d
```

You can easily edit the `docker-compose-[username].yml` file to customize the project name, the ports, and the database credentials.

### For Debian-based systems
You can follow the installation steps in the [Standalone installation](./extra/standalone-installation.md) documentation.

## Local development
First you need to install **Tailwind dependencies** of the project. You can do this by running the following command in the root of the project:

::: code-group
  ```bash [npm]
  npm install
  ```
  ```bash[yarn]
  yarn install
  ```
:::

Then you need to install **Tchooz dependencies**. You can do this by running the following command in `components/com_emundus` folder:
::: code-group
  ```bash [npm]
  cd components/com_emundus && npm install
  ```
  ```bash[yarn]
  cd components/com_emundus && yarn install
  ```
:::

### Watch for changes
To watch for changes in the project, you can run the following command in in `components/com_emundus` folder:
::: code-group
  ```bash [npm]
  npm run watch
  ```
  ```bash[yarn]
  yarn run watch
  ```
:::




[Node-url]: https://nodejs.org/
[Node-min-badge]: https://img.shields.io/badge/min-16.x-orange
[Node-reco-badge]: https://img.shields.io/badge/recommended-18.x-green
[Composer-local-installation]: https://getcomposer.org/download/
[Composer-global-installation]: https://getcomposer.org/doc/00-intro.md#globally
[PHP-min-badge]: https://img.shields.io/badge/dependencies-PHP%207.4-green
[PHP-url]: https://www.php.net/manual/en/install.macosx.php
