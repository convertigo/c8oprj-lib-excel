# lib_GoogleSheet
This is the Microsoft Excel connector for Convertigo platform. Install this library to enable reading from Microsoft Excel sheets on Office365 Cloud  for your Convertigo applications

# Installation

* In your Convertigo Studio use File->Import->Convertigo->Convertigo Project and hit the 'Next' button

* In the Dialog 'Project remote URL' field Paste :

        lib_MicrosoftExcel=https://github.com/convertigo/c8oprj-lib-excel.git

* And click the 'Finish' button
* This will also automatically import the lib_OAuth project
* Create all 'Undefined Global Symbols' when prompted

# Usage

## Configuring your Microsoft Azure AD  OAuth

This connector uses the OAuth authentication protocol to exchange data with Microsoft Excel Sheets hosted on Microsoft OneDrive. You must configure OAuth  in your Azure portal:

* Connect to https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps
* Click on "new registration"
* Configure **Name** and **Account type**
* Add the http://localhost:18080/convertigo/projects/lib_OAuth/getToken.html redirect URI with the **"Single-page application (SPA)"** type.  (Useful for Studio testing operations)
* Add the https://c8ocloud.convertigo.net/convertigo/projects/lib_OAuth/getToken.html with the **"Single-page application (SPA)"** type. (useful for production operations)
* In **Authentication** menu, check **Access tokens (used for implicit flows)** and **ID tokens (used for implicit and hybrid flows)**

Copy and save  the **Client ID** and if necessary the **Tenant ID** as you will need these in the next steps.

## Configuring Convertigo Symbols

__lib_MicrosoftExcel__ needs some symbols to be configured. You configure them through the Web Console: **https://&lt;your site&gt;.convertigo.net/admin**, hit the ___symbols___ button to get to the symbol configuration page.


Symbol  | value
------| ------
lib_oauth.azuread.clientid | The **client ID** value you copied in the previous step
lib_oauth.azuread.tenantid | the **tenenant id** value you copied in the previous step. This is optional and should be used only if you want to restrict to a specific Azure tenant.

## Sequences

__lib_MicrosoftExcel__ provides sequences you can call in your projects

Sequence  | Action
------| ------
SheetGetRange | Read a Range of values form a Google Sheet. <br>Takes 3 variables :<br>- name : the sheet name in a workbook (If none provided, the first sheet in a workbook)<br >- range : the range of cells to retrieve for ex: as A1:D10  (If not provided, all non empty cells in a sheet)<br >- itemPath : The path of the file in a OneDrive account.

These sequences will only work if you performed a OAuth Authentication to AzureAD first. To help you with this, the library provides a Shared action you can use in your Apps. 

## Shared Actions

In order to authenticate with Microsoft Azure AD and access the availables documents in Microsoft OneDrive , the library provides a Shared Action you can use in your client apps.

Shared Action  | Usage
------| ------
Authenticate   | This will authenticate you app to Microsoft AzureAd. A Microsoft popup login page will appear to log you in. 

## Sample Application

You will find in this project a sample application using the Microsoft Excel Sheet Library, use this as a reference and tutorial about using the library. This demonstrates :
- Use of the **Authenticate** Shared Action
- use of the **SheetGetRange** Sequence

