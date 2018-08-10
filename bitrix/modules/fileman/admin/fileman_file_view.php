<?
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_before.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/fileman/prolog.php");

if (!($USER->CanDoOperation('fileman_admin_files') || $USER->CanDoOperation('fileman_edit_existent_files') || $USER->CanDoOperation('fileman_view_file_structure')))
	$APPLICATION->AuthForm(GetMessage("ACCESS_DENIED"));

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/fileman/include.php");
IncludeModuleLangFile(__FILE__);
$addUrl = 'lang='.LANGUAGE_ID.($logical == "Y"?'&logical=Y':'');

$strWarning = "";

$site = CFileMan::__CheckSite($site);
$DOC_ROOT = CSite::GetSiteDocRoot($site);

while(($l=strlen($path))>0 && $path[$l-1]=="/")
	$path = substr($path, 0, $l-1);

$path = Rel2Abs("/", $path);
$arParsedPath = CFileMan::ParsePath(Array($site, $path), false, false, "", $logical == "Y");
$abs_path = $DOC_ROOT.$path;
$arPath = Array($site, $path);

$APPLICATION->SetTitle(GetMessage("FILEMAN_FILEVIEW_TITLE")." \"".$arParsedPath["LAST"]."\"");

foreach ($arParsedPath["AR_PATH"] as $chainLevel)
{
	$adminChain->AddItem(
		array(
			"TEXT" => htmlspecialcharsex($chainLevel["TITLE"]),
			"LINK" => ((strlen($chainLevel["LINK"]) > 0) ? $chainLevel["LINK"] : ""),
		)
	);
}

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_after.php");

//Check access to file
if(!$USER->CanDoFileOperation('fm_view_file', $arPath))
	$strWarning = GetMessage("ACCESS_DENIED");
else if(!is_file($abs_path))
	$strWarning = GetMessage("FILEMAN_FILENOT_FOUND");
elseif(!($USER->CanDoOperation('edit_php') || $USER->CanDoFileOperation('fm_lpa', $arPath)) && (in_array(CFileman::GetFileExtension($path), CFileMan::GetScriptFileExt()) || substr(CFileman::GetFileName($path), 0, 1)=="."))
	$strWarning = GetMessage("FILEMAN_FILEVIEW_PHPERROR");


$limit_php_access = ($USER->CanDoFileOperation('fm_lpa',$arPath) && !$USER->CanDoOperation('edit_php'));

$fileType = CFileMan::GetFileTypeEx($path);
$fileTypeParent = $arFilemanPredifinedFileTypes[CFileMan::GetFileTypeEx($path)]["gtype"];
?>
<?CAdminMessage::ShowMessage($strWarning);?>

<?if(strlen($strWarning) <= 0):?>
	<?
	$aMenu = Array();
	if($fileTypeParent == "text")
	{
		if($USER->CanDoOperation('fileman_edit_existent_files') && $USER->CanDoFileOperation('fm_edit_existent_file',$arPath))
		{
			$aDDMenuEdit = array();
			$aDDMenuEdit[] = array(
				"TEXT" => GetMessage("FILEMAN_FILEVIEW_EDIT_AS_TEXT"),
				"ACTION" => "window.location='fileman_file_edit.php?".$addUrl."&site=".urlencode($site)."&path=".urlencode($path)."';",
			);
			if($USER->CanDoOperation('edit_php'))
			{
				$aDDMenuEdit[] = array(
					"TEXT" => GetMessage("FILEMAN_FILEVIEW_EDIT_AS_PHP"),
					"ACTION" => "window.location='fileman_file_edit.php?".$addUrl."&site=".urlencode($site)."&path=".urlencode($path)."&full_src=Y';"
				);
			}
			$aDDMenuEdit[] = array(
				"TEXT" => GetMessage("FILEMAN_FILEVIEW_EDIT_AS_HTML"),
				"ACTION" => "window.location='fileman_html_edit.php?".$addUrl."&site=".urlencode($site)."&path=".urlencode($path)."';"
			);

			$aMenu[] = array(
				"TEXT" => GetMessage("FILEMAN_FILE_EDIT"),
				"TITLE" => GetMessage("FILEMAN_FILE_EDIT"),
				"MENU" => $aDDMenuEdit,
				//"ICON" => "btn_edit"
			);
		}
	}

	if(($USER->CanDoFileOperation('fm_download_file', $arPath) &&
	!(in_array(CFileman::GetFileExtension($path), CFileMan::GetScriptFileExt()) ||
	substr(CFileman::GetFileName($path), 0, 1)==".")) ||
	$USER->CanDoOperation('edit_php'))
	{
		$aMenu[] = array(
			"TEXT" => GetMessage("FILEMAN_FILEVIEW_DOWNLOAD"),
			"LINK" => "fileman_file_download.php?".$addUrl."&site=".urlencode($site)."&path=".urlencode($path),
			//"ICON" => "btn_download"
		);
	}

	$folder_path = substr($path, 0, strrpos($path, "/"));
	$id = GetFileName($path);
	if($USER->CanDoFileOperation('fm_rename_file', $arPath))
	{
		$aMenu[] = array(
			"TEXT" => GetMessage("FILEMAN_FILEVIEW_RENAME"),
			"LINK" => "fileman_rename.php?".$addUrl."&site=".urlencode($site)."&path=".urlencode($folder_path)."&files[]=".urlencode($id),
			//"ICON" => "btn_rename"
		);
	}

	if($USER->CanDoFileOperation('fm_delete_file', $arPath))
	{
		$aMenu[] = array(
			"TEXT" => GetMessage("FILEMAN_FILE_DELETE"),
			"LINK" => "javascript:if(confirm('".GetMessage("FILEMAN_FILE_DELETE_CONFIRM")."')) window.location='/bitrix/admin/fileman_admin.php?ID=".urlencode(GetFileName($path))."&action=delete&".$addUrl."&site=".urlencode($site)."&path=".urlencode($folder_path)."&".bitrix_sessid_get()."';",
			"TITLE"	=> GetMessage("FILEMAN_FILE_DELETE"),
			//"ICON" => "btn_delete"
		);
	}

	if (count($aMenu) > 0)
	{
		$context = new CAdminContextMenu($aMenu);
		$context->Show();
	}

	$aTabs = array(
		array("DIV" => "edit1", "TAB" => GetMessage('FILEMAN_VIEW_TAB'), "ICON" => "fileman", "TITLE" => GetMessage('FILEMAN_VIEW_TAB_ALT')),
	);

	$tabControl = new CAdminTabControl("tabControl", $aTabs);
	$tabControl->Begin();
	$tabControl->BeginNextTab();

	?>
	<tr>
		<td><?=GetMessage("FILEMAN_FILEVIEW_NAME")?></td>
		<td><?=htmlspecialchars($arParsedPath["LAST"])?></td>
	</tr>
	<tr>
		<td><?=GetMessage("FILEMAN_FILEVIEW_TYPE")?></td>
		<td><?=$arFilemanPredifinedFileTypes[$fileType]["name"]?></td>
	</tr>
	<tr>
		<td><?=GetMessage("FILEMAN_FILEVIEW_SIZE")?></td>
		<td><?=filesize($abs_path)?></td>
	</tr>
	<?$date_format = CDatabase::DateFormatToPHP(CLang::GetDateFormat("FULL"));?>
	<tr>
		<td><?=GetMessage("FILEMAN_FILEVIEW_TIMESTAMP")?></td>
		<td><?=date($date_format, filemtime($abs_path))?></td>
	</tr>
	<tr>
		<td><?=GetMessage("FILEMAN_FILEVIEW_LAST_ACCESS")?></td>
		<td><?=date($date_format, fileatime($abs_path))?></td>
	</tr>
	<tr>
		<td colspan="2">&nbsp;</td>
	</tr>
	<?if ($fileTypeParent=="text"):?>
		<tr class="heading">
			<td colspan="2"><?= GetMessage('FILEMAN_VIEW_CONT') ?></td>
		</tr>
		<tr><td colspan="2" style="font-size:100%;"><?
		// ###########  L  P  A  ############
		if (!$USER->CanDoOperation('edit_php'))
		{
			$filesrc = $APPLICATION->GetFileContent($abs_path);
			$arPHP = PHPParser::ParseFile($filesrc);
			$l = count($arPHP);
			if ($limit_php_access && $l > 0)
			{
				$new_filesrc = '';
				$end = 0;
				$php_count = 0;
				for ($n = 0; $n < $l; $n++)
				{
					$start = $arPHP[$n][0];
					$new_filesrc .= substr($filesrc, $end, $start-$end);
					$end = $arPHP[$n][1];

					//Trim php tags
					$src = $arPHP[$n][2];
					if (SubStr($src, 0, 5) == "<?"."php")
						$src = SubStr($src, 5);
					else
						$src = SubStr($src, 2);
					$src = SubStr($src, 0, -2);

					//If it's Component 2, keep the php code. If it's component 1 or ordinary PHP - than replace code by #PHPXXXX#
					$comp2_begin = '$APPLICATION->INCLUDECOMPONENT(';
					if (strtoupper(substr($src,0, strlen($comp2_begin))) == $comp2_begin)
						$new_filesrc .= $arPHP[$n][2];
					else
						$new_filesrc .= '#PHP'.str_pad(++$php_count, 4, "0", STR_PAD_LEFT).'#';
				}
				$new_filesrc .= substr($filesrc, $end);
				highlight_string($new_filesrc);
			}
			else
			{
				show_source($abs_path);
			}
		}
		else
		{
			show_source($abs_path);
		}
		?></td></tr>
	<?elseif($fileTypeParent=="image"):?>
		<tr class="heading">
			<td colspan="2"><?= GetMessage('FILEMAN_VIEW_CONT') ?></td>
		</tr>
		<tr><td colspan="2"><?echo CFile::ShowImage($path, 600, 600, "border=0", "", true, GetMessage("FILEMAN_FILEVIEW_ENLARGE"))?></td></tr>
	<?endif?>
	</tr>
<?
$tabControl->EndTab();
$tabControl->End();
endif;
?>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_admin.php");?>