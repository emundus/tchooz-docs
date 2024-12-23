# SAML
## Resources
- [MiniOrange](https://plugins.miniorange.com/joomla-single-sign-on-sso)

## Introduction
SAML (Security Assertion Markup Language) is an open standard for exchanging authentication and authorization data between an identity provider and a service provider. It is widely used for single sign-on (SSO) services.

## Integration
We use the MiniOrange SAML plugin to integrate SAML authentication in Joomla.

### Installation
> [!WARNING]
> This plugin is not free. You need to have a subscription to use it. Each licence is valid for only one domain.
1. You need to have a MiniOrange account with a SAML plugin subscription. You can create an account [here](https://www.miniorange.com/businessfreetrial) and subscribe to a license for the SAML plugin.
2. Then login to your miniOrange account via following link: [https://login.xecurify.com/moas/login](https://login.xecurify.com/moas/login)
3. You can find your licences in the `Licence/View Licences` section. In this section you have a tab `Releases and Downloads` where you can download the latest version of the plugin.
4. Install the plugin via the Joomla! installer (System > Install > Extensions).
5. Now go to the plugin configuration (Components > Miniorange Saml Single Sign-ON > Account). We ask you here to login with your miniOrange account and to enter the licence key that you can find in the `Licence/View Licences` section of your miniOrange account.

### Configuration
You can now configure the plugin : 
1. Go to the `Service Provider Setup` tab and select `Add New IDP` to add a new identity provider. 
   1. You can run an automatic configuration by clicking on the `Upload ID Metadata` button. Upload the metadata file or enter the metadata URL.
   2. Do not forget to fill the Relay State field with the URL of your Joomla site.
2. You have to send the metadata of your service provider to the identity provider. You can find it in the `Service Provider Metadata` tab. You can download it or copy the URL.
3. You can now test the connection by clicking on the `Test` button in the `Service Provider Setup` tab. Login to a user account of your identity provider and check if the connection is successful. If the connection is successful, the test will display the user's attributes.
4. You can map the attributes of your identity provider to the Joomla user fields in the `Attribute Mapping` tab.
5. Finally you have to enable Group Mapping in the `Group Mapping` tab. You can map the groups of your identity provider to the Joomla user groups. By default select Registered as the default group. All users will be assigned to this group and will be able to create an application file.

### Usage
Once the plugin is configured, you can access your Joomla site, in the login form you will see a new button `Login with [IDP_NAME]`. Click on this button to authenticate with your identity provider.

### Troubleshooting
- If you have local accounts on your Joomla site and you want to link them to your identity provider, you can edit the `Login Settings` in the plugin configuration to use `Email` instead of `Username`. When a user logs in with SAML, the plugin will check if the email of the user matches the email of a local account and will link the accounts.
- If you have a problem with the connection: 
  - Check the metadata of your service provider and identity provider.
  - Check the Relay State field in the plugin configuration.
  - Check the expiration date of your licence in the `Account` tab of the plugin configuration.