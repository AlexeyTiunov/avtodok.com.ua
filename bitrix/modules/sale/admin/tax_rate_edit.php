<?
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_before.php");

$saleModulePermissions = $APPLICATION->GetGroupRight("sale");
if ($saleModulePermissions == "D")
	$APPLICATION->AuthForm(GetMessage("ACCESS_DENIED"));

IncludeModuleLangFile(__FILE__);
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/sale/include.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/sale/prolog.php");

$ID = IntVal($ID);

ClearVars();
ClearVars("fp_");

$strError = "";
$bInitVars = false;
if ((strlen($save)>0 || strlen($apply)>0) && $REQUEST_METHOD=="POST" && $saleModulePermissions=="W" && check_bitrix_sessid())
{
	$TAX_ID = IntVal($TAX_ID);
	if ($TAX_ID<=0)
		$strError .= GetMessage("ERROR_NO_TAX_ID")."<br>";

	$VALUE = str_replace(",", ".", $VALUE);
	$VALUE = DoubleVal($VALUE);
	if ($VALUE<=0)
		$strError .= GetMessage("ERROR_NO_VALUE")."<br>";

	if ($IS_IN_PRICE!="Y") $IS_IN_PRICE = "N";
	if ($ACTIVE!="Y") $ACTIVE = "N";

	$IS_PERCENT = "Y";
	if ($IS_PERCENT!="Y") $IS_PERCENT = "N";

	if ($IS_PERCENT!="Y" && strlen($CURRENCY)<=0)
		$strError .= GetMessage("ERROR_PERCENT_OR_CURRENCY")."<br>";

	$APPLY_ORDER = IntVal($APPLY_ORDER);
	if ($APPLY_ORDER<=0) $APPLY_ORDER = 100;

	$arLocation = array();
	if (isset($LOCATION1) && is_array($LOCATION1) && count($LOCATION1)>0)
	{
		for ($i = 0; $i<count($LOCATION1); $i++)
		{
			if (IntVal($LOCATION1[$i])>0)
			{
				$arLocation[] = array(
					"LOCATION_ID" => IntVal($LOCATION1[$i]),
					"LOCATION_TYPE" => "L"
					);
			}
		}
	}

	if (isset($LOCATION2) && is_array($LOCATION2) && count($LOCATION2)>0)
	{
		for ($i = 0; $i<count($LOCATION2); $i++)
		{
			if (IntVal($LOCATION2[$i])>0)
			{
				$arLocation[] = array(
					"LOCATION_ID" => IntVal($LOCATION2[$i]),
					"LOCATION_TYPE" => "G"
					);
			}
		}
	}

	if (!is_array($arLocation) || count($arLocation)<=0)
		$strError .= GetMessage("ERROR_NO_LOCATION")."<br>";

	if (strlen($strError)<=0)
	{
		unset($arFields);
		$arFields = array(
			"PERSON_TYPE_ID" => (IntVal($PERSON_TYPE_ID)>0) ? IntVal($PERSON_TYPE_ID) : False,
			"TAX_ID" => $TAX_ID,
			"VALUE" => $VALUE,
			"CURRENCY" => (strlen($CURRENCY)>0) ? $CURRENCY : False,
			"IS_PERCENT" => $IS_PERCENT,
			"IS_IN_PRICE" => $IS_IN_PRICE,
			"APPLY_ORDER" => $APPLY_ORDER,
			"ACTIVE" => $ACTIVE,
			"TAX_LOCATION" => $arLocation
			);

		if ($ID>0)
		{
			if (!CSaleTaxRate::Update($ID, $arFields))
				$strError .= GetMessage("ERROR_EDIT_TAX_RATE")."<br>";
		}
		else
		{
			$ID = CSaleTaxRate::Add($arFields);
			if ($ID<=0)
				$strError .= GetMessage("ERROR_ADD_TAX_RATE")."<br>";
		}
	}

	if (strlen($strError)>0) $bInitVars = True;

	if (strlen($save)>0 && strlen($strError)<=0)
		LocalRedirect("sale_tax_rate.php?lang=".LANG.GetFilterParams("filter_", false));
}

if ($ID>0)
{
	$db_tax_rate = CSaleTaxRate::GetList(Array(), Array("ID"=>$ID));
	$db_tax_rate->ExtractFields("str_");
}
else
{
	$str_APPLY_ORDER = 100;
	$str_ACTIVE = "Y";
	$str_IS_PERCENT = "Y";
	$str_IS_IN_PRICE = "N";
}

if ($bInitVars)
{
	$DB->InitTableVarsForEdit("b_sale_tax_rate", "", "str_");
}

if($ID > 0)
	$sDocTitle = GetMessage("TAX_RATE_EDIT_RECORD", array("#ID#"=>$ID));
else
	$sDocTitle = GetMessage("TAX_RATE_NEW_RECORD");
$APPLICATION->SetTitle($sDocTitle);

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_after.php");

/*********************************************************************/
/********************  BODY  *****************************************/
/*********************************************************************/
?>

<?
$aMenu = array(
		array(
				"TEXT" => GetMessage("STREN_2FLIST"),
				"ICON" => "btn_list",
				"LINK" => "/bitrix/admin/sale_tax_rate.php?lang=".LANG.GetFilterParams("filter_")
			)
	);

if ($ID > 0 && $saleModulePermissions >= "W")
{
	$aMenu[] = array("SEPARATOR" => "Y");

	$aMenu[] = array(
			"TEXT" => GetMessage("STREN_NEW_RATE"),
			"ICON" => "btn_new",
			"LINK" => "/bitrix/admin/sale_tax_rate_edit.php?lang=".LANG.GetFilterParams("filter_")
		);

	$aMenu[] = array(
			"TEXT" => GetMessage("STREN_DELETE_RATE"),
			"ICON" => "btn_delete",
			"LINK" => "javascript:if(confirm('".GetMessage("STREN_DELETE_RATE_CONFIRM")."')) window.location='/bitrix/admin/sale_tax_rate.php?action=delete&ID[]=".$ID."&lang=".LANG."&".bitrix_sessid_get()."#tb';",
		);
}
$context = new CAdminContextMenu($aMenu);
$context->Show();
?>

<?CAdminMessage::ShowMessage($strError);?>

<form method="POST" action="<?echo $APPLICATION->GetCurPage()?>?" name="form1">
<?echo GetFilterHiddens("filter_");?>
<input type="hidden" name="Update" value="Y">
<input type="hidden" name="lang" value="<?echo LANG ?>">
<input type="hidden" name="ID" value="<?echo $ID ?>">
<?=bitrix_sessid_post()?>

<?
$aTabs = array(
		array("DIV" => "edit1", "TAB" => GetMessage("STREN_TAB_RATE"), "ICON" => "sale", "TITLE" => GetMessage("STREN_TAB_RATE_DESCR"))
	);

$tabControl = new CAdminTabControl("tabControl", $aTabs);
$tabControl->Begin();
?>

<?
$tabControl->BeginNextTab();
?>


	<?if ($ID>0):?>
	<tr>
		<td width="40%">
			ID:
		</td>
		<td width="60%">
			<b><?echo $ID ?></b>
		</td>
	</tr>
	<tr>
		<td width="40%">
			<?echo GetMessage("TAX_TIMESTAMP") ?>:
		</td>
		<td width="60%">
			<b><?echo $str_TIMESTAMP_X ?></b>
		</td>
	</tr>
	<?endif;?>

	<tr>
		<td width="40%"><span class="required">*</span><?echo GetMessage("F_TAX_ID") ?>:</td>
		<td width="60%">
			<select name="TAX_ID">
				<?
				$db_TAX = CSaleTax::GetList(array("NAME", "ASC"), array());
				while ($db_TAX_arr = $db_TAX->NavNext(true, "fp_"))
				{
					?><option value="<?echo $fp_ID ?>" <?if (IntVal($fp_ID)==IntVal($str_TAX_ID)) echo "selected";?>><?echo $fp_NAME ?> (<?echo $fp_LID ?>)</option><?
				}
				?>
			</select>
		</td>
	</tr>
	<tr>
		<td width="40%">
			<?echo GetMessage("RATE_ACTIVE");?>:
		</td>
		<td width="60%">
			<input type="checkbox" name="ACTIVE" value="Y" <?if ($str_ACTIVE=="Y") echo "checked";?>>
		</td>
	</tr>
	<tr>
		<td width="40%">
			<?echo GetMessage("SALE_F_PERSON_TYPE") ?>:
		</td>
		<td width="60%">
			<select name="PERSON_TYPE_ID">
				<option value=""><?echo GetMessage("SALE_ANY")?></option>
				<?
				$l = CSalePersonType::GetList(($b="NAME"), ($o="ASC"), Array());
				while ($l->ExtractFields("fp_")):
					?><option value="<?echo $fp_ID?>"<?if (IntVal($str_PERSON_TYPE_ID)==IntVal($fp_ID)) echo " selected"?>>[<?echo $fp_ID ?>] <?echo $fp_NAME?> (<?echo $fp_LID ?>)</option><?
				endwhile;
				?>
			</select>
		</td>
	</tr>
	<tr>
		<td width="40%"><span class="required">*</span><?echo GetMessage("RATE_VALUE") ?>:</td>
		<td width="60%">
			<input type="text" name="VALUE" value="<?echo $str_VALUE ?>" size="10">
			<b>%</b>
			<input type="hidden" name="IS_PERCENT" value="Y">
		</td>
	</tr>
	<tr>
		<td width="40%">
			<?echo GetMessage("RATE_IS_INPRICE");?>:
		</td>
		<td width="60%">
			<select name="IS_IN_PRICE">
				<option value="N" <?if ($str_IS_IN_PRICE=="N" || strlen($str_IS_IN_PRICE)<=0) echo " selected"?>><?echo GetMessage("RATE_NET");?></option>
				<option value="Y" <?if ($str_IS_IN_PRICE=="Y") echo " selected"?>><?echo GetMessage("RATE_YES");?></option>
			</select>
		</td>
	</tr>
	<tr>
		<td width="40%"><span class="required">*</span><?echo GetMessage("RATE_APPLY_ORDER");?>:</td>
		<td width="60%">
			<input type="text" name="APPLY_ORDER" value="<?echo $str_APPLY_ORDER ?>" size="10">
		</td>
	</tr>

	<tr>
		<td width="40%" valign="top"><span class="required">*</span><?echo GetMessage("F_LOCATION1");?>:</td>
		<td width="60%" valign="top">
			<select name="LOCATION1[]" size="5" multiple>
				<?$db_vars = CSaleLocation::GetList(Array("SORT"=>"ASC", "COUNTRY_NAME_LANG"=>"ASC", "CITY_NAME_LANG"=>"ASC"), array(), LANG)?>
				<?
				$arLOCATION1 = array();
				if ($bInitVars)
				{
					$arLOCATION1 = $LOCATION1;
				}
				else
				{
					$db_location = CSaleTaxRate::GetLocationList(Array("TAX_RATE_ID" => $ID, "LOCATION_TYPE" => "L"));
					while ($arLocation = $db_location->Fetch())
					{
						$arLOCATION1[] = $arLocation["LOCATION_ID"];
					}
				}
				?>
				<?while ($vars = $db_vars->Fetch()):?>
					<option value="<?echo $vars["ID"]?>"<?if (in_array(IntVal($vars["ID"]), $arLOCATION1)) echo " selected"?>><?echo htmlspecialchars($vars["COUNTRY_NAME"]." - ".$vars["CITY_NAME"])?></option>
				<?endwhile;?>
			</select>
		</td>
	</tr>
	<tr>
		<td width="40%" valign="top"><span class="required">*</span><?echo GetMessage("F_LOCATION2");?>:</td>
		<td width="60%" valign="top">
			<select name="LOCATION2[]" size="5" multiple>
				<?$db_vars = CSaleLocationGroup::GetList(Array("NAME"=>"ASC"), array(), LANG)?>
				<?
				$arLOCATION2 = array();
				if ($bInitVars)
				{
					$arLOCATION2 = $LOCATION2;
				}
				else
				{
					$db_location = CSaleTaxRate::GetLocationList(Array("TAX_RATE_ID" => $ID, "LOCATION_TYPE" => "G"));
					while ($arLocation = $db_location->Fetch())
					{
						$arLOCATION2[] = $arLocation["LOCATION_ID"];
					}
				}
				?>
				<?while ($vars = $db_vars->Fetch()):?>
					<option value="<?echo $vars["ID"]?>"<?if (in_array(IntVal($vars["ID"]), $arLOCATION2)) echo " selected"?>><?echo htmlspecialchars($vars["NAME"])?></option>
				<?endwhile;?>
			</select>
		</td>
	</tr>

<?
$tabControl->EndTab();
?>

<?
$tabControl->Buttons(
		array(
				"disabled" => ($saleModulePermissions < "W"),
				"back_url" => "/bitrix/admin/sale_tax_rate.php?lang=".LANG.GetFilterParams("filter_")
			)
	);
?>

<?
$tabControl->End();
?>

</form>

<?echo BeginNote();?>
<span class="required">*</span> <?echo GetMessage("REQUIRED_FIELDS")?>
<?echo EndNote(); ?>

<?require($DOCUMENT_ROOT."/bitrix/modules/main/include/epilog_admin.php");?>