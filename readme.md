


# lib_MicrosoftExcel

This is the Microsoft Excel connector for Convertigo platform. Install this library to enable writing and reading from Microsoft Excel sheets on Office365 Cloud or local XSLX files for your Convertigo applications.

# Usage for Office 365

The Office 365 sequences will only work if you performed an OAuth Authentication to AzureAD first.

## Configuring your Microsoft Azure AD OAuth

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

# Usage for local Excel files

To upload an Excel file and output an XML or JSON structure use the sequence [SheetGetRangeFile](#sheetgetrangefile)

# Table Of Content



For more technical informations : [documentation](./project.md)

- [Installation](#installation)
- [Sequences](#sequences)
    - [checkAccessToken](#checkaccesstoken)
    - [loginAzureAdWithAccessToken](#loginazureadwithaccesstoken)
    - [SheetGetRange](#sheetgetrange)
    - [SheetGetRangeFile](#sheetgetrangefile)


## Installation

1. In your Convertigo Studio click on ![](https://github.com/convertigo/convertigo/blob/develop/eclipse-plugin-studio/icons/studio/project_import.gif?raw=true "Import a project in treeview") to import a project in the treeview
2. In the import wizard

   ![](https://github.com/convertigo/convertigo/blob/develop/eclipse-plugin-studio/tomcat/webapps/convertigo/templates/ftl/project_import_wzd.png?raw=true "Import Project")
   
   paste the text below into the `Project remote URL` field:
   <table>
     <tr><td>Usage</td><td>Click the copy button at the end of the line</td></tr>
     <tr><td>To contribute</td><td>

     ```
     lib_MicrosoftExcel=https://github.com/convertigo/c8oprj-lib-excel.git:branch=8.2.X
     ```
     </td></tr>
     <tr><td>To simply use</td><td>

     ```
     lib_MicrosoftExcel=https://github.com/convertigo/c8oprj-lib-excel/archive/8.2.X.zip
     ```
     </td></tr>
    </table>
3. Click the `Finish` button. This will automatically import the __lib_MicrosoftExcel__ project


## Sequences

### checkAccessToken

Checks is a valid access token is held by the current users' session for AzureAD

This as to be called by client apps to decide whenever or not they have to display an OAuth login screen



### loginAzureAdWithAccessToken

Perform the OAuth flow for AzureAD

If the token is valid, it will be stored in the user's session to be used when calling Microsoft APIs.

Also if the token is valid, setAuthenticatedUser step is executed to flag this session as authenticated.


**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>access_token</td><td>Access Token</td>
</tr>
</table>

### SheetGetRange

Read a Range of values from an Office 365 Sheet.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>itemPath</td><td>The path of the file to import.</td>
</tr>
<tr>
<td>name</td><td>The sheet name in a workbook (If none provided, the first sheet in a workbook)</td>
</tr>
<tr>
<td>range</td><td>The range of cells to retrieve for ex: as A1:D10 (If not provided, all non empty cells in a sheet)</td>
</tr>
</table>

### SheetGetRangeFile

Imports an xlsx file ( from "itemPath") and outputs a JSON object of the "name" Sheet by the range of "range". Uses the SheetJS CE framework.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>itemPath</td><td>The local path of the file to import.</td>
</tr>
<tr>
<td>name</td><td>The sheet name in the workbook (If not provided, the first sheet in a workbook). Can not be empty string.</td>
</tr>
<tr>
<td>range</td><td>The range of cells to retrieve for ex: "A1:D10" (If not provided or empty string, all non empty cells in a sheet)</td>
</tr>
</table>



