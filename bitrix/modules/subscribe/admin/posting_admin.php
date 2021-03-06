<?
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_before.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/subscribe/include.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/subscribe/prolog.php");

IncludeModuleLangFile(__FILE__);

$POST_RIGHT = $APPLICATION->GetGroupRight("subscribe");
if($POST_RIGHT=="D")
	$APPLICATION->AuthForm(GetMessage("ACCESS_DENIED"));

$ID = intval($ID);
$sTableID = "tbl_posting";

if($_REQUEST["action"]=="js_send" && check_bitrix_sessid())
{
	require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_js.php");

	$cPosting = new CPosting;
	$rsPosting = CPosting::GetByID($ID);
	$arPosting = $rsPosting->Fetch();
	if($arPosting)
	{
		if($arPosting["STATUS"]=="D" || $arPosting["STATUS"]=="W")
		{
			if($cPosting->ChangeStatus($ID, "P"))
			{
				if($arPosting["AUTO_SEND_TIME"]!="")
				{
					if(COption::GetOptionString("subscribe", "subscribe_auto_method")!=="cron")
					{
						$rsAgents = CAgent::GetList(array("ID"=>"DESC"), array(
							"MODULE_ID" => "subscribe",
							"NAME" => "CPosting::AutoSend(".$ID.",%",
						));
						if(!$rsAgents->Fetch())
						{
							CAgent::AddAgent("CPosting::AutoSend(".$ID.",true);", "subscribe", "N", 0, $arPosting["AUTO_SEND_TIME"], "Y", $arPosting["AUTO_SEND_TIME"]);
							CAdminMessage::ShowMessage(array("MESSAGE"=>GetMessage("posting_agent_submitted"), "TYPE"=>"OK"));
						}
					}
					else
					{
						CAdminMessage::ShowMessage(array("MESSAGE"=>GetMessage("posting_cron_setup"), "TYPE"=>"OK"));
					}
				}
				else
				{
					$arEmailStatuses = CPosting::GetEmailStatuses($ID);
					$nEmailsSent = intval($arEmailStatuses["N"]);
					$nEmailsError = intval($arEmailStatuses["E"]);
					$nEmailsTotal = intval($arEmailStatuses["Y"]) + $nEmailsSent + $nEmailsError;
					?><script>
						<?=$sTableID?>.GetAdminList('<?echo $APPLICATION->GetCurPage();?>?lang=<?=LANGUAGE_ID?>');
						setTimeout('MoveProgress(<?echo $nEmailsSent?>, <?echo $nEmailsError?>, <?echo $nEmailsTotal?>)', 1000);
					</script><?
				}
			}
			else
			{
				CAdminMessage::ShowMessage($cPosting->LAST_ERROR);
			}
		}
		elseif($arPosting["STATUS"]=="P")
		{
			$cPosting=new CPosting;
			if($cPosting->SendMessage($ID, COption::GetOptionString("subscribe", "posting_interval")) !== false)
			{
				$arEmailStatuses = CPosting::GetEmailStatuses($ID);
				$nEmailsSent = intval($arEmailStatuses["N"]);
				$nEmailsError = intval($arEmailStatuses["E"]);
				$nEmailsTotal = intval($arEmailStatuses["Y"]) + $nEmailsSent + $nEmailsError;
				?><script>
					setTimeout('MoveProgress(<?echo $nEmailsSent?>, <?echo $nEmailsError?>, <?echo $nEmailsTotal?>)', 100);
				</script><?
			}
			else
			{
				CAdminMessage::ShowMessage($cPosting->LAST_ERROR);
			}
		}
		elseif($arPosting["STATUS"]=="S" || $arPosting["STATUS"]=="E")
		{
			CAdminMessage::ShowMessage(array("MESSAGE"=>GetMessage("post_send_ok"), "TYPE"=>"OK"));
			?><script>
				<?=$sTableID?>.GetAdminList('<?echo $APPLICATION->GetCurPage();?>?lang=<?=LANGUAGE_ID?>');
			</script><?
		}
		else
		{
			CAdminMessage::ShowMessage(GetMessage("POST_ADM_POST_NOT_FOUND"));
		}
	}
	else
	{
		CAdminMessage::ShowMessage(GetMessage("POST_ADM_POST_NOT_FOUND"));
	}

	require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_admin_js.php");
}

$oSort = new CAdminSorting($sTableID, "ID", "desc");
$lAdmin = new CAdminList($sTableID, $oSort);

function CheckFilter()
{
	global $FilterArr, $lAdmin;
	foreach ($FilterArr as $f) global $$f;
	if (strlen(trim($find_timestamp_1))>0 || strlen(trim($find_timestamp_2))>0)
	{
		$date_1_ok = false;
		$date1_stm = MkDateTime(FmtDate($find_timestamp_1,"D.M.Y"),"d.m.Y");
		$date2_stm = MkDateTime(FmtDate($find_timestamp_2,"D.M.Y")." 23:59","d.m.Y H:i");
		if (!$date1_stm && strlen(trim($find_timestamp_1))>0)
			$lAdmin->AddFilterError(GetMessage("POST_WRONG_TIMESTAMP_FROM"));
		else $date_1_ok = true;
		if (!$date2_stm && strlen(trim($find_timestamp_2))>0)
			$lAdmin->AddFilterError(GetMessage("POST_WRONG_TIMESTAMP_TILL"));
		elseif ($date_1_ok && $date2_stm <= $date1_stm && strlen($date2_stm)>0)
			$lAdmin->AddFilterError(GetMessage("POST_FROM_TILL_TIMESTAMP"));
	}
	if (strlen(trim($find_date_sent_1))>0 || strlen(trim($find_date_sent_2))>0)
	{
		$date_1_ok = false;
		$date1_stm = MkDateTime(FmtDate($find_date_sent_1,"D.M.Y"),"d.m.Y");
		$date2_stm = MkDateTime(FmtDate($find_date_sent_2,"D.M.Y")." 23:59","d.m.Y H:i");
		if (!$date1_stm && strlen(trim($find_date_sent_1))>0)
			$lAdmin->AddFilterError(GetMessage("POST_WRONG_DATE_SENT_FROM"));
		else $date_1_ok = true;
		if (!$date2_stm && strlen(trim($find_date_sent_2))>0)
			$lAdmin->AddFilterError(GetMessage("POST_WRONG_DATE_SENT_TILL"));
		elseif ($date_1_ok && $date2_stm <= $date1_stm && strlen($date2_stm)>0)
			$lAdmin->AddFilterError(GetMessage("POST_FROM_TILL_DATE_SENT"));
	}
	if (strlen(trim($find_auto_send_time_1))>0 || strlen(trim($find_auto_send_time_2))>0)
	{
		$date_1_ok = false;
		$date1_stm = MkDateTime(FmtDate($find_auto_send_time_1,"D.M.Y"),"d.m.Y");
		$date2_stm = MkDateTime(FmtDate($find_auto_send_time_2,"D.M.Y")." 23:59","d.m.Y H:i");
		if (!$date1_stm && strlen(trim($find_auto_send_time_1))>0)
			$lAdmin->AddFilterError(GetMessage("POST_WRONG_DATE_AUTOSEND_FROM"));
		else $date_1_ok = true;
		if (!$date2_stm && strlen(trim($find_auto_send_time_2))>0)
			$lAdmin->AddFilterError(GetMessage("POST_WRONG_DATE_AUTOSEND_TILL"));
		elseif ($date_1_ok && $date2_stm <= $date1_stm && strlen($date2_stm)>0)
			$lAdmin->AddFilterError(GetMessage("POST_FROM_TILL_DATE_AUTOSEND"));
	}
	return count($lAdmin->arFilterErrors)==0;
}

$FilterArr = Array(
	"find",
	"find_type",
	"find_id",
	"find_timestamp_1",
	"find_timestamp_2",
	"find_date_sent_1",
	"find_date_sent_2",
	"find_auto_send_time_1",
	"find_auto_send_time_2",
	"find_status",
	"find_status_id",
	"find_subject",
	"find_from",
	"find_to",
	"find_body",
	"find_body_type",
	"find_rubric",
);

$lAdmin->InitFilter($FilterArr);

if (CheckFilter())
{
	$arFilter = array(
		"ID" => ($find!="" && $find_type == "id"? $find:$find_id),
		"TIMESTAMP_1" => $find_timestamp_1,
		"TIMESTAMP_2" => $find_timestamp_2,
		"DATE_SENT_1" => $find_date_sent_1,
		"DATE_SENT_2" => $find_date_sent_2,
		"AUTO_SEND_TIME_1" => $find_auto_send_time_1,
		"AUTO_SEND_TIME_2" => $find_auto_send_time_2,
		"STATUS" => ($find!="" && $find_type == "status"? $find:$find_status),
		"STATUS_ID" => $find_status_id,
		"SUBJECT" => ($find!="" && $find_type == "subject"? $find:$find_subject),
		"FROM" => $find_from,
		"TO" => $find_to,
		"BODY" => $find_body,
		"BODY_TYPE" => $find_body_type,
		"RUB_ID" => $find_rubric,
	);
}

if($lAdmin->EditAction() && $POST_RIGHT=="W")
{
	foreach($FIELDS as $ID=>$arFields)
	{
		if(!$lAdmin->IsUpdated($ID))
			continue;
		$DB->StartTransaction();
		$ID = IntVal($ID);
		$ob = new CPosting;
		if(!$ob->Update($ID, $arFields))
		{
			$lAdmin->AddUpdateError(GetMessage("post_save_err").$ID.": ".$ob->LAST_ERROR, $ID);
			$DB->Rollback();
		}
		$DB->Commit();
	}
}

if(($arID = $lAdmin->GroupAction()) && $POST_RIGHT=="W")
{
	if($_REQUEST['action_target']=='selected')
	{
		$cData = new CPosting;
		$rsData = $cData->GetList(array($by=>$order), $arFilter);
		while($arRes = $rsData->Fetch())
			$arID[] = $arRes['ID'];
	}

	foreach($arID as $ID)
	{
		if(strlen($ID)<=0)
			continue;
	   	$ID = IntVal($ID);
		switch($_REQUEST['action'])
		{
		case "delete":
			@set_time_limit(0);
			$DB->StartTransaction();
			if(!CPosting::Delete($ID))
			{
				$DB->Rollback();
				$lAdmin->AddGroupError(GetMessage("post_del_err"), $ID);
			}
			$DB->Commit();
			break;
		case "stop":
			$cPosting = new CPosting;
			$cPosting->ChangeStatus($ID, "W");
			$rsAgents = CAgent::GetList(array("ID"=>"DESC"), array(
				"MODULE_ID" => "subscribe",
				"NAME" => "CPosting::AutoSend(".$ID.",%",
			));
			while($arAgent = $rsAgents->Fetch())
				CAgent::Delete($arAgent["ID"]);
			break;
		}
	}
}

$lAdmin->AddHeaders(array(
	array(	"id"		=>"ID",
		"content"	=>"ID",
		"sort"		=>"id",
		"align"		=>"right",
		"default"	=>true,
	),
	array(	"id"		=>"TIMESTAMP_X",
		"content"	=>GetMessage("post_updated"),
		"sort"		=>"timestamp",
		"default"	=>true,
	),
	array(	"id"		=>"SUBJECT",
		"content"	=>GetMessage("post_subj"),
		"sort"		=>"subject",
		"default"	=>true,
	),
	array(	"id"		=>"BODY_TYPE",
		"content"	=>GetMessage("post_body_type"),
		"sort"		=>"body_type",
		"default"	=>true,
	),
	array(	"id"		=>"STATUS",
		"content"	=>GetMessage("post_stat"),
		"sort"		=>"status",
		"default"	=>true,
	),
	array(	"id"		=>"DATE_SENT",
		"content"	=>GetMessage("post_sent"),
		"sort"		=>"date_sent",
		"default"	=>true,
	),
	array(	"id"		=>"SENT_TO",
		"content"	=>GetMessage("post_report"),
		"sort"		=>false,
		"default"	=>false,
	),
	array(	"id"		=>"FROM_FIELD",
		"content"	=>GetMessage("post_from"),
		"sort"		=>"from_field",
		"default"	=>false,
	),
	array(	"id"		=>"TO_FIELD",
		"content"	=>GetMessage("post_to"),
		"sort"		=>"to_field",
		"default"	=>false,
	),
));

$cData = new CPosting;
$rsData = $cData->GetList(array($by=>$order), $arFilter);
$rsData = new CAdminResult($rsData, $sTableID);
$rsData->NavStart();
$lAdmin->NavText($rsData->GetNavPrint(GetMessage("post_nav")));

while($arRes = $rsData->NavNext(true, "f_")):
	$row =& $lAdmin->AddRow($f_ID, $arRes);
	$row->AddViewField("SUBJECT", '<a href="posting_edit.php?ID='.$f_ID.'&amp;lang='.LANG.'" title="'.GetMessage("post_act_edit").'">'.$f_SUBJECT.'</a>');
	$row->AddInputField("SUBJECT", array("size"=>20));
	$row->AddSelectField("BODY_TYPE",array("text"=>GetMessage("POST_TEXT"),"html"=>GetMessage("POST_HTML")));
	$strStatus="";
	switch ($f_STATUS) :
		case "S": $strStatus='[S] '.GetMessage("POST_STATUS_SENT"); break;
		case "P": $strStatus='[P] '.GetMessage("POST_STATUS_PART"); break;
		case "E": $strStatus='[E] '.GetMessage("POST_STATUS_ERROR"); break;
		case "D": $strStatus='[D] '.GetMessage("POST_STATUS_DRAFT"); break;
		case "W": $strStatus='[W] '.GetMessage("POST_STATUS_WAIT"); break;
	endswitch;
	if($f_STATUS!="D")
	{
		$arSTATUS = array($f_STATUS=>$strStatus);
		if($f_STATUS=="P")
			$arSTATUS["W"]=GetMessage("POST_STATUS_WAIT");
		else
			$arSTATUS["D"]=GetMessage("POST_STATUS_DRAFT");
		$row->AddSelectField("STATUS", $arSTATUS);
	}

	$strStatus = "&nbsp;";
	switch ($f_STATUS) :
		case "S": $strStatus='[<span style="color:green">S</span>]&nbsp;<span style="color:green">'.GetMessage("POST_STATUS_SENT").'</span>'; break;
		case "P": $strStatus='[<span style="color:blue">P</span>]&nbsp;<span style="color:blue">'.GetMessage("POST_STATUS_PART").'</span>'; break;
		case "E": $strStatus='[<span style="color:green">E</span>]&nbsp;<span style="color:green">'.GetMessage("POST_STATUS_ERROR").'</span>'; break;
		case "D": $strStatus='[D]&nbsp;'.GetMessage("POST_STATUS_DRAFT"); break;
		case "W": $strStatus='[<span style="color:red">W</span>]&nbsp;<span style="color:red">'.GetMessage("POST_STATUS_WAIT").'</span>'; break;
	endswitch;

	$row->AddViewField("STATUS", $strStatus);
	$row->AddViewField("SENT_TO", "[&nbsp;<a href=\"javascript:void(0)\" OnClick=\"jsUtils.OpenWindow('posting_bcc.php?ID=".$f_ID."&lang=".LANG."', 600, 500);\">".GetMessage("POST_SHOW_LIST")."</a>&nbsp;]");
	$row->AddInputField("FROM_FIELD", array("size"=>20));
	$row->AddInputField("TO_FIELD", array("size"=>20));

	$arActions = Array();

	if(($f_STATUS!="P") && $POST_RIGHT=="W")
		$arActions[] = array(
			"ICON"=>"edit",
			"DEFAULT"=>true,
			"TEXT"=>GetMessage("post_act_edit"),
			"ACTION"=>$lAdmin->ActionRedirect("posting_edit.php?ID=".$f_ID)
		);
	$arActions[] = array(
			"ICON"=>"copy",
			"TEXT"=>GetMessage("posting_copy_link"),
			"ACTION"=>$lAdmin->ActionRedirect("posting_edit.php?ID=".$f_ID."&amp;action=copy")
	);
	if(($f_STATUS!="P") && $POST_RIGHT=="W")
		$arActions[] = array(
			"ICON"=>"delete",
			"TEXT"=>GetMessage("post_act_del"),
			"ACTION"=>"if(confirm('".GetMessage("post_act_del_conf")."')) ".$lAdmin->ActionDoGroup($f_ID, "delete")
		);

	$arActions[] = array("SEPARATOR"=>true);

	if($f_STATUS=="D" && $POST_RIGHT=="W")
		$arActions[] = array(
			"ICON"=>"",
			"TEXT"=>GetMessage("post_act_send"),
			"ACTION"=>"if(confirm('".GetMessage("post_conf")."')) window.location='".$APPLICATION->GetCurPage()."?ID=".$f_ID."&action=send&lang=".LANG."&".bitrix_sessid_get()."'"
		);
	if($f_STATUS=="W" && $POST_RIGHT=="W")
		$arActions[] = array(
			"ICON"=>"",
			"TEXT"=>GetMessage("posting_continue_act"),
			"ACTION"=>"if(confirm('".GetMessage("posting_continue_conf")."')) window.location='".$APPLICATION->GetCurPage()."?ID=".$f_ID."&action=send&lang=".LANG."&".bitrix_sessid_get()."'"
		);
	if($f_STATUS=="P" && $POST_RIGHT=="W")
		$arActions[] = array(
			"ICON"=>"",
			"TEXT"=>GetMessage("posting_stop_act"),
			"ACTION"=>"if(confirm('".GetMessage("posting_stop_conf")."')) window.location='".$APPLICATION->GetCurPage()."?ID=".$f_ID."&action=stop&lang=".LANG."&".bitrix_sessid_get()."'"
		);

	if(is_set($arActions[count($arActions)-1], "SEPARATOR"))
		unset($arActions[count($arActions)-1]);
	$row->AddActions($arActions);

endwhile;

$lAdmin->AddFooter(
	array(
		array("title"=>GetMessage("MAIN_ADMIN_LIST_SELECTED"), "value"=>$rsData->SelectedRowsCount()),
		array("counter"=>true, "title"=>GetMessage("MAIN_ADMIN_LIST_CHECKED"), "value"=>"0"),
	)
);
$lAdmin->AddGroupActionTable(Array(
	"delete"=>GetMessage("MAIN_ADMIN_LIST_DELETE"),
	));

$aContext = array(
	array(
		"TEXT"=>GetMessage("MAIN_ADD"),
		"LINK"=>"posting_edit.php?lang=".LANG,
		"TITLE"=>GetMessage("POST_ADD_TITLE"),
		"ICON"=>"btn_new",
	),
);
$lAdmin->AddAdminContextMenu($aContext);
$lAdmin->CheckListMode();

$APPLICATION->SetTitle(GetMessage("post_title"));

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_after.php");

$oFilter = new CAdminFilter(
	$sTableID."_filter",
	array(
		"id" => GetMessage("POST_F_ID"),
		"timestamp" => GetMessage("POST_F_TIMESTAMP"),
		"date_sent" => GetMessage("POST_F_DATE_SENT"),
		"auto_send_time" => GetMessage("POST_F_AUTO_SEND_TIME"),
		"status" => GetMessage("POST_F_STATUS"),
		"from" => GetMessage("POST_F_FROM"),
		"to" => GetMessage("POST_F_TO"),
		"subject" => GetMessage("POST_F_SUBJECT"),
		"body_type" => GetMessage("POST_F_BODY_TYPE"),
		"body" => GetMessage("POST_F_BODY"),
		"rubric" => GetMessage("POST_F_RUBRIC"),
	)
);
?>
<form name="find_form" method="get" action="<?echo $APPLICATION->GetCurPage();?>">
<?
$oFilter->Begin();
?>
<tr>
	<td><b><?=GetMessage("POST_FIND")?>:</b></td>
	<td>
		<input type="text" size="25" name="find" value="<?echo htmlspecialchars($find)?>" title="<?=GetMessage("POST_FIND_TITLE")?>">
		<?
		$arr = array(
			"reference" => array(
				GetMessage("POST_F_SUBJECT"),
				GetMessage("POST_F_ID"),
				GetMessage("POST_F_STATUS"),
			),
			"reference_id" => array(
				"subject",
				"id",
				"status",
			)
		);
		echo SelectBoxFromArray("find_type", $arr, $find_type, "", "");
		?>
	</td>
</tr>
<tr>
	<td><?=GetMessage("POST_F_ID")?>:</td>
	<td>
		<input type="text" name="find_id" size="47" value="<?echo htmlspecialchars($find_id)?>">
		&nbsp;<?=ShowFilterLogicHelp()?>
	</td>
</tr>
<tr>
	<td><?echo GetMessage("POST_F_TIMESTAMP")." (".FORMAT_DATE."):"?></td>
	<td><?echo CalendarPeriod("find_timestamp_1", $find_timestamp_1, "find_timestamp_2", $find_timestamp_2, "find_form","Y")?></td>
</tr>
<tr>
	<td><?echo GetMessage("POST_F_DATE_SENT")." (".FORMAT_DATE."):"?></td>
	<td><?echo CalendarPeriod("find_date_sent_1", $find_date_sent_1, "find_date_sent_2", $find_date_sent_2, "find_form","Y")?></td>
</tr>
<tr>
	<td><?echo GetMessage("POST_F_AUTO_SEND_TIME")." (".FORMAT_DATE."):"?></td>
	<td><?echo CalendarPeriod("find_auto_send_time_1", $find_auto_send_time_1, "find_auto_send_time_2", $find_auto_send_time_2, "find_form","Y")?></td>
</tr>
<tr>
	<td><?=GetMessage("POST_F_STATUS")?>:</td>
	<td>
		<input type="text" name="find_status" size="47" value="<?echo htmlspecialchars($find_status)?>">&nbsp;<?=ShowFilterLogicHelp()?><br>
		<?
		$arr = array(
			"reference" => array(
				"[S] ".GetMessage("POST_STATUS_SENT"),
				"[P] ".GetMessage("POST_STATUS_PART"),
				"[D] ".GetMessage("POST_STATUS_DRAFT"),
				"[E] ".GetMessage("POST_STATUS_ERROR"),
				"[W] ".GetMessage("POST_STATUS_WAIT"),
			),
			"reference_id" => array(
				"S",
				"P",
				"D",
				"E",
				"W",
			)
		);
		echo SelectBoxFromArray("find_status_id", $arr, $find_status_id, GetMessage("MAIN_ALL"), "");
		?>
	</td>
</tr>
<tr>
	<td><?echo GetMessage("POST_F_FROM")?>:</td>
	<td><input type="text" name="find_from" size="47" value="<?echo htmlspecialchars($find_from)?>">&nbsp;<?=ShowFilterLogicHelp()?></td>
</tr>
<tr>
	<td><?echo GetMessage("POST_F_TO")?>:</td>
	<td><input type="text" name="find_to" size="47" value="<?echo htmlspecialchars($find_to)?>">&nbsp;<?=ShowFilterLogicHelp()?></td>
</tr>
<tr>
	<td><?echo GetMessage("POST_F_SUBJECT")?>:</td>
	<td><input type="text" name="find_subject" size="47" value="<?echo htmlspecialchars($find_subject)?>">&nbsp;<?=ShowFilterLogicHelp()?></td>
</tr>
<tr>
	<td><?=GetMessage("POST_F_BODY_TYPE")?>:</td>
	<td>
		<?
		$arr = array(
			"reference" => array(
				GetMessage("POST_TEXT"),
				GetMessage("POST_HTML"),
			),
			"reference_id" => array(
				"text",
				"html",
			)
		);
		echo SelectBoxFromArray("find_body_type", $arr, $find_body_type, GetMessage("MAIN_ALL"), "");
		?>
	</td>
</tr>
<tr>
	<td><?echo GetMessage("POST_F_BODY")?>:</td>
	<td><input type="text" name="find_body" size="47" value="<?echo htmlspecialchars($find_body)?>"><?=ShowFilterLogicHelp()?></td>
</tr>
<tr>
	<td><?=GetMessage("POST_F_RUBRIC")?>:</td>
	<td>
		<?
		$arr = array(
			"reference" => array(),
			"reference_id" => array(),
		);
		$rsRubrics = CRubric::GetList();
		while($arRubric = $rsRubrics->Fetch())
		{
			$arr["reference"][] = "[".$arRubric["ID"]."] ".$arRubric["NAME"];
			$arr["reference_id"][] = $arRubric["ID"];
		}
		echo SelectBoxMFromArray("find_rubric[]", $arr, $find_rubric, GetMessage("MAIN_ALL"), "");
		?>
	</td>
</tr>
<?
$oFilter->Buttons(array("table_id"=>$sTableID,"url"=>$APPLICATION->GetCurPage(), "form" => "find_form"));
$oFilter->End();
?>
</form>

<?
//******************************
// Send message and show progress
//******************************
if($_REQUEST['action']=="send"):
	$cPosting = new CPosting;
	$rsPosting = CPosting::GetByID($ID);
	$arPosting = $rsPosting->Fetch();
	if($arPosting && $arPosting["STATUS_ID"] == "P")
	{
		$arEmailStatuses = CPosting::GetEmailStatuses($ID);
		$nEmailsSent = intval($arEmailStatuses["N"]);
		$nEmailsError = intval($arEmailStatuses["E"]);
		$nEmailsTotal = intval($arEmailStatuses["Y"]) + $nEmailsSent + $nEmailsError;
	}
	else
	{
		$nEmailsSent = 0;
		$nEmailsError = 0;
		$nEmailsTotal = 0;
	}
	?>
	<div id="progress_monitor">
		<p><?echo GetMessage("POST_ADM_SENDING_NOTE_LINE1")?><br>
		<?echo GetMessage("POST_ADM_SENDING_NOTE_LINE2")?></p>
		<table border="0" cellpadding="0" width="350" cellspacing="0"><tr><td>
			<div class="pbar-outer"><div class="pbar-inner-green" id="progressline_ok" style="width:0px; padding-left:0px"></div><div class="pbar-inner-red" id="progressline_error" style="width:0px; padding-left:0px"></div></div>
			<p>
			<?echo GetMessage("posting_addr_processed")?> <span id="progress_cnt">0</span> <?echo GetMessage("posting_addr_of")?> <span id="progress_total">0</span> (<span id="progress_perc">0</span>%)<br>
			<?echo GetMessage("POST_ADM_WITH_ERRORS")?>: <span id="progress_error">0</span>.
			</p>
		</td></tr></table>
	</div>
	<div id="progress_message">
	<input type="button" value="<?echo GetMessage("POST_ADM_BTN_STOP")?>" id="btn_stop" OnClick="Stop()">
	<input type="button" value="<?echo GetMessage("posting_continue_button")?>" id="btn_cont" OnClick="Cont()" disabled>
	</div>
	<script>
		var stop = false;
		var _sent = 0;
		var _error = 0;
		var _total = 0;
		function Stop()
		{
			stop=true;
			document.getElementById('btn_stop').disabled = true;
			document.getElementById('btn_cont').disabled = false;
		}
		function Cont()
		{
			stop=false;
			document.getElementById('btn_stop').disabled = false;
			document.getElementById('btn_cont').disabled = true;
			MoveProgress(_sent, _error, _total);
		}
		function MoveProgress(sent, error, total)
		{
			if(stop)
			{
				_sent = sent;
				_error = error;
				_total = total;
				return;
			}
			document.getElementById("progress_cnt").innerHTML = sent+error;
			document.getElementById("progress_total").innerHTML = total;
			document.getElementById("progress_error").innerHTML = error;
			if(total > 0)
			{
				document.getElementById("progress_perc").innerHTML = parseInt((sent+error)/total*100);
				document.getElementById("progressline_ok").style.width = parseInt(350*(sent/total))+'px';
				document.getElementById("progressline_ok").style.paddingLeft = parseInt(350*(sent/total))+'px';
				document.getElementById("progressline_error").style.width = parseInt(350*(error/total))+'px';
				document.getElementById("progressline_error").style.paddingLeft = parseInt(350*(error/total))+'px';
			}

			CHttpRequest.Action = function(result)
			{
				CloseWaitWindow();
				if(result.length > 0 && result.indexOf("MoveProgress") < 0)
					document.getElementById('progress_message').innerHTML = result;
			}

			var url = 'posting_admin.php?lang=<?echo LANGUAGE_ID?>&ID=<?echo $ID?>&<?echo bitrix_sessid_get()?>&action=js_send';
			ShowWaitWindow();
			CHttpRequest.Send(url);
		}
		setTimeout('MoveProgress(<?echo $nEmailsSent?>, <?echo $nEmailsError?>, <?echo $nEmailsTotal?>)', 100);
	</script>
<?endif;?>

<?$lAdmin->DisplayList();?>

<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_admin.php");
?>
