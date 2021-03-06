<?
define("ADMIN_MODULE_NAME", "security");

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_before.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/security/include.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/security/prolog.php");

IncludeModuleLangFile(__FILE__);

$RIGHT_R = $USER->CanDoOperation('security_session_settings_read');
$RIGHT_W = $USER->CanDoOperation('security_session_settings_write');
if(!$RIGHT_R && !$RIGHT_W)
	$APPLICATION->AuthForm(GetMessage("ACCESS_DENIED"));

$aTabs = array(
	array(
		"DIV" => "savedb",
		"TAB" => GetMessage("SEC_SESSION_ADMIN_SAVEDB_TAB"),
		"ICON"=>"main_user_edit",
		"TITLE"=>GetMessage("SEC_SESSION_ADMIN_SAVEDB_TAB_TITLE"),
	),
	array(
		"DIV" => "sessid",
		"TAB" => GetMessage("SEC_SESSION_ADMIN_SESSID_TAB"),
		"ICON"=>"main_user_edit",
		"TITLE"=>GetMessage("SEC_SESSION_ADMIN_SESSID_TAB_TITLE"),
	),
);
$tabControl = new CAdminTabControl("tabControl", $aTabs);

if($REQUEST_METHOD == "POST" && ($save!="" || $apply!="" || $db_session_on!="" || $db_session_off!="" || $sessid_ttl_off!="" || $sessid_ttl_on!="") && $RIGHT_W && check_bitrix_sessid())
{
	if(array_key_exists("db_session_on", $_POST))
	{
		COption::SetOptionString("security", "session", "Y");
		CSecuritySession::Init();
	}
	elseif(array_key_exists("db_session_off", $_POST))
	{
		COption::SetOptionString("security", "session", "N");
	}

	$ttl = intval($_POST["sessid_ttl"]);
	if($ttl <= 0)
		$ttl = 60;
	COption::SetOptionInt("main", "session_id_ttl", $ttl);

	if(array_key_exists("sessid_ttl_on", $_POST))
	{
		COption::SetOptionString("main", "use_session_id_ttl", "Y");
	}
	elseif(array_key_exists("sessid_ttl_off", $_POST))
	{
		COption::SetOptionString("main", "use_session_id_ttl", "N");
	}

	if($save!="" && $_GET["return_url"]!="")
		LocalRedirect($_GET["return_url"]);
	LocalRedirect("/bitrix/admin/security_session.php?lang=".LANGUAGE_ID.($return_url? "&return_url=".urlencode($_GET["return_url"]): "")."&".$tabControl->ActiveTabParam());
}

$APPLICATION->SetTitle(GetMessage("SEC_SESSION_ADMIN_TITLE"));

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_after.php");

?>

<form method="POST" action="security_session.php?lang=<?echo LANGUAGE_ID?><?echo $_GET["return_url"]? "&amp;return_url=".urlencode($_GET["return_url"]): ""?>"  enctype="multipart/form-data" name="editform">
<?
$tabControl->Begin();
$tabControl->BeginNextTab();
?>
<?if(COption::GetOptionString("security", "session") == "Y"):?>
	<tr>
		<td valign="top" colspan="2" align="left">
			<span style="color:green;"><b><?echo GetMessage("SEC_SESSION_ADMIN_DB_ON")?></b></span>
		</td>
	</tr>
	<tr>
		<td valign="top" colspan="2" align="left">
			<input type="submit" name="db_session_off" value="<?echo GetMessage("SEC_SESSION_ADMIN_DB_BUTTON_OFF")?>"<?if(!$RIGHT_W) echo " disabled"?>>
		</td>
	</tr>
<?else:?>
	<tr>
		<td valign="top" colspan="2" align="left">
			<span style="color:red;"><b><?echo GetMessage("SEC_SESSION_ADMIN_DB_OFF")?></b></span>
		</td>
	</tr>
	<?if(CSecuritySession::CheckSessionId(session_id())):?>
	<tr>
		<td valign="top" colspan="2" align="left">
			<input type="submit" name="db_session_on" value="<?echo GetMessage("SEC_SESSION_ADMIN_DB_BUTTON_ON")?>"<?if(!$RIGHT_W) echo " disabled"?>>
		</td>
	</tr>
	<?else:?>
	<tr>
		<td valign="top" colspan="2" align="left">
			<span style="color:red;"><b><?echo GetMessage("SEC_SESSION_ADMIN_SESSID_WARNING")?></b></span>
		</td>
	</tr>
	<?endif;?>
<?endif;?>
<tr>
	<td colspan="2">
		<?echo BeginNote();?><?echo GetMessage("SEC_SESSION_ADMIN_DB_NOTE")?>
		<?echo EndNote(); ?>
	</td>
</tr>
<tr>
	<td colspan="2">
		<?echo BeginNote();?><span style="color:red">*</span><?echo GetMessage("SEC_SESSION_ADMIN_DB_WARNING")?>
		<?echo EndNote(); ?>
	</td>
</tr>
<?
$tabControl->BeginNextTab();
?>
<?if(COption::GetOptionInt("main", "use_session_id_ttl") == "Y"):?>
	<tr>
		<td valign="top" colspan="2" align="left">
			<span style="color:green;"><b><?echo GetMessage("SEC_SESSION_ADMIN_SESSID_ON")?></b></span>
		</td>
	</tr>
	<tr>
		<td valign="top" colspan="2" align="left">
			<input type="submit" name="sessid_ttl_off" value="<?echo GetMessage("SEC_SESSION_ADMIN_SESSID_BUTTON_OFF")?>"<?if(!$RIGHT_W) echo " disabled"?>>
		</td>
	</tr>
<?else:?>
	<tr>
		<td valign="top" colspan="2" align="left">
			<span style="color:red;"><b><?echo GetMessage("SEC_SESSION_ADMIN_SESSID_OFF")?></b></span>
		</td>
	</tr>
	<tr>
		<td valign="top" colspan="2" align="left">
			<input type="submit" name="sessid_ttl_on" value="<?echo GetMessage("SEC_SESSION_ADMIN_SESSID_BUTTON_ON")?>"<?if(!$RIGHT_W) echo " disabled"?>>
		</td>
	</tr>
<?endif;?>
<tr>
	<td width="40%"><?echo GetMessage("SEC_SESSION_ADMIN_SESSID_TTL")?>:</td>
	<td width="60%"><input type="text" name="sessid_ttl" size="6" value="<?echo COption::GetOptionInt("main", "session_id_ttl", 60)?>"></td>
</tr>
<tr>
	<td colspan="2">
		<?echo BeginNote();?><?echo GetMessage("SEC_SESSION_ADMIN_SESSID_NOTE")?>
		<?echo EndNote(); ?>
	</td>
</tr>
<?
$tabControl->Buttons(
	array(
		"disabled"=>(!$RIGHT_W),
		"back_url"=>$_GET["return_url"]? $_GET["return_url"]: "security_session.php?lang=".LANG,
	)
);
?>
<?echo bitrix_sessid_post();?>
<input type="hidden" name="lang" value="<?echo LANG?>">
<?
$tabControl->End();
?>
</form>
<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_admin.php");
?>