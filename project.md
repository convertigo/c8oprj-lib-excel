
# ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/core/images/project_color_16x16.png?raw=true "Project") lib_MicrosoftExcel

The Microsoft Excel connector for Convertigo

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

<details><summary><span style="color:DarkGoldenRod"><i>References</i></span></summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/references/images/ProjectSchemaReference_16x16.png?raw=true "ProjectSchemaReference") lib_OAuth


see [readme](https://github.com/convertigo/c8oprj-lib-oauth/tree/7.9.0#readme)
</p></blockquote></details>

<details><summary><span style="color:DarkGoldenRod"><i>Connectors</i></span></summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/connectors/images/httpconnector_color_16x16.png?raw=true "HttpConnector") MSGraphConnector



<details><summary><span style="color:DarkGoldenRod"><i>Transactions</i></span></summary><blockquote><p>


<details><summary><b>Default_transaction</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/images/httptransaction_color_16x16.png?raw=true "HttpTransaction") Default_transaction


</p></blockquote></details>

<details><summary><b>DriveSearchFiles</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/images/jsonhttptransaction_color_16x16.png?raw=true "JsonHttpTransaction") DriveSearchFiles


</p></blockquote></details>

<details><summary><b>GetDataRange</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/images/jsonhttptransaction_color_16x16.png?raw=true "JsonHttpTransaction") GetDataRange



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableHttpVariable" >&nbsp;itemPath
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableHttpVariable" >&nbsp;name
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableHttpVariable" >&nbsp;range
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>GetUsedRange</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/images/jsonhttptransaction_color_16x16.png?raw=true "JsonHttpTransaction") GetUsedRange



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableHttpVariable" >&nbsp;itemPath
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableHttpVariable" >&nbsp;name
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>
</p></blockquote></details>
</p></blockquote></details>

<details><summary><span style="color:DarkGoldenRod"><i>Sequences</i></span></summary><blockquote><p>


<details><summary><b>checkAccessToken</b> : Checks is a valid access token is held by the current users' session for AzureAD</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") checkAccessToken

Checks is a valid access token is held by the current users' session for AzureAD

This as to be called by client apps to decide whenever or not they have to display an OAuth login screen


</p></blockquote></details>

<details><summary><b>loginAzureAdWithAccessToken</b> : Perform the OAuth flow for AzureAD</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") loginAzureAdWithAccessToken

Perform the OAuth flow for AzureAD

If the token is valid, it will be stored in the user's session to be used when calling Microsoft APIs.

Also if the token is valid, setAuthenticatedUser step is executed to flag this session as authenticated.


<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;access_token
</td>
<td>
Access Token
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>SheetGetRange</b> : Read a Range of values from an Office 365 Sheet</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") SheetGetRange

Read a Range of values from an Office 365 Sheet.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;itemPath
</td>
<td>
The path of the file to import.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;name
</td>
<td>
The sheet name in a workbook (If none provided, the first sheet in a workbook)
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;range
</td>
<td>
The range of cells to retrieve for ex: as A1:D10 (If not provided, all non empty cells in a sheet)
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>SheetGetRangeFile</b> : Imports an xlsx file ( from "itemPath") and outputs a JSON object of the "name" Sheet by the range of "range"</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") SheetGetRangeFile

Imports an xlsx file ( from "itemPath") and outputs a JSON object of the "name" Sheet by the range of "range". Uses the SheetJS CE framework.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;itemPath
</td>
<td>
The local path of the file to import.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;name
</td>
<td>
The sheet name in a workbook (If none provided, the first sheet in a workbook)
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;range
</td>
<td>
The range of cells to retrieve for ex: as A1:D10 (If not provided, all non empty cells in a sheet)
</td>
</tr>
</table>

</p></blockquote></details>
</p></blockquote></details>
