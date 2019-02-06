<?
if(!defined("B_PROLOG_INCLUDED")||B_PROLOG_INCLUDED!==true)die();
global $LANGUAGE;
if ($LANGUAGE=="UKR")
 $LangSuffixe="_UKR";
else
 $LangSuffixe="";
//echo "<pre>"; print_r($arParams); echo "</pre>";

// apply default param values
$arDefaultValues = array(
	"SHOW_FIELDS" => array(),
	"REQUIRED_FIELDS" => array(),
	"AUTH" => "Y",
	"USE_BACKURL" => "Y",
	"SUCCESS_PAGE" => "",
	//"CACHE_TYPE" => "A",
	//"CACHE_TIME" => "3600",
);

foreach ($arDefaultValues as $key => $value)
{
	if (!is_set($arParams, $key))
		$arParams[$key] = $value;
}
if(!is_array($arParams["SHOW_FIELDS"]))
	$arParams["SHOW_FIELDS"] = array();
if(!is_array($arParams["REQUIRED_FIELDS"]))
	$arParams["REQUIRED_FIELDS"] = array();

// if user registration blocked - return auth form
if (COption::GetOptionString("main", "new_user_registration", "N") == "N")
{
	#$APPLICATION->AuthForm(array());
}

// apply core fields to user defined
$arDefaultFields = array(
	"LOGIN",
	"PASSWORD",
	"CONFIRM_PASSWORD",
	"EMAIL"
    
);

$arResult["USE_EMAIL_CONFIRMATION"] = COption::GetOptionString("main", "new_user_registration_email_confirmation", "N") == "Y" ? "Y" : "N";
$def_group = COption::GetOptionString("main", "new_user_registration_def_group", "");
if($def_group!="")
{
	$arResult["GROUP_POLICY"] = CUser::GetGroupPolicy(explode(",", $def_group));
}
else
{
	$arResult["GROUP_POLICY"] = CUser::GetGroupPolicy(array());
}

$arResult["SHOW_FIELDS"] = array_merge($arDefaultFields, $arParams["SHOW_FIELDS"]);
$arResult["REQUIRED_FIELDS"] = array_merge($arDefaultFields, $arParams["REQUIRED_FIELDS"]);

// use captcha?
$arResult["USE_CAPTCHA"] = COption::GetOptionString("main", "captcha_registration", "N") == "Y" ? "Y" : "N";
// start values
$arResult["VALUES"] = array();
$arResult["VALUES"]["PERSONAL_WWW"] = "http://";
$arResult["VALUES"]["WORK_WWW"] = "http://";

$arResult["ERRORS"] = array();
$register_done = false;

// register user
if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_REQUEST["register_submit_button"]) && !$USER->IsAuthorized())
{
	// check emptiness of required fields
	foreach ($arResult["SHOW_FIELDS"] as $key)
	{
		if ($key != "PERSONAL_PHOTO" && $key != "WORK_LOGO")
		{
            
			$arResult["VALUES"][$key] = $_REQUEST["REGISTER"][$key];
			if (in_array($key, $arResult["REQUIRED_FIELDS"]) && trim($arResult["VALUES"][$key]) == '')
			{
				$arResult["ERRORS"][$key] = GetMessage("REGISTER_FIELD_REQUIRED".$LangSuffixe);
			}
		}
		else
		{
			$_FILES["REGISTER_FILES_".$key]["MODULE_ID"] = "main";
			$arResult["VALUES"][$key] = $_FILES["REGISTER_FILES_".$key];
			if (in_array($key, $arResult["REQUIRED_FIELDS"]) && !is_uploaded_file($_FILES["REGISTER_FILES_".$key]["tmp_name"]))
			{
				$arResult["ERRORS"][$key] = GetMessage("REGISTER_FIELD_REQUIRED".$LangSuffixe);
			}
		}
	}
    
    if (isset($_REQUEST["REGISTER"]['BUYER'] ))
    {
        if ($_REQUEST["REGISTER"]['BUYER']=="MyAvto")
        {
            $modelname=($_REQUEST["REGISTER"]["CARMODEL"]=="Марка Авто?")?"":$_REQUEST["REGISTER"]["CARMODEL"];
            $arResult["VALUES"]['BUYERINFO']="myavto#".$modelname;
            $arResult["VALUES"]['BUYERTYPE']="myavto";
            $arResult["VALUES"]['BISSNESS_TYPE']="Свой автомобиль.";
                  #($_REQUEST["REGISTER"]["CARMODEL"]=="Марка Авто?")?"":$_REQUEST["REGISTER"]["CARMODEL"];
        }
         elseif ($_REQUEST["REGISTER"]['BUYER']=="Seller")
         {
             
           $arResult["VALUES"]['BUYERINFO']="Seller#".$_REQUEST["REGISTER"]["SELLER"] ; 
           $arResult["VALUES"]['BUYERTYPE']= $_REQUEST["REGISTER"]["SELLER"]; 
           if ($_REQUEST["REGISTER"]["SELLER"]=="businessman")
           {
               $arResult["VALUES"]['BISSNESS_TYPE']="Частный предприниматель";
           }  elseif($_REQUEST["REGISTER"]["SELLER"]=="AutoShop")
           {
               $arResult["VALUES"]['BISSNESS_TYPE']="Авто Магазин"; 
           }elseif($_REQUEST["REGISTER"]["SELLER"]=="Internet_shop")
           {
               $arResult["VALUES"]['BISSNESS_TYPE']="Интернет Магазин"; 
           } elseif($_REQUEST["REGISTER"]["SELLER"]=="AutoDemoun")
           {
               $arResult["VALUES"]['BISSNESS_TYPE']="Разборка"; 
               
           }  elseif($_REQUEST["REGISTER"]["SELLER"]=="Station")
           {
               $arResult["VALUES"]['BISSNESS_TYPE']="СТО";
               
           }else
           {
              $arResult["VALUES"]['BISSNESS_TYPE']="Не определено" ;
           }
           
         }
        
    }
    if (isset($_REQUEST["REGISTER"]["PERSONAL_HOUSE"]))
    {
        if ($arResult["VALUES"]["PERSONAL_STREET"]!="")
        {
         $arResult["VALUES"]["PERSONAL_STREETNAME"]=$arResult["VALUES"]["PERSONAL_STREET"];
       #  $personalStreet=preg_replace("/^(http\:\/\/.*\/)(.*)$/i","$2",$arResult["VALUES"]["PERSONAL_STREET"]); 
         $arResult["VALUES"]["PERSONAL_STREET"]="ул.".$arResult["VALUES"]["PERSONAL_STREET"].", дом №".$_REQUEST["REGISTER"]["PERSONAL_HOUSE"];
         
         $arResult["VALUES"]["PERSONAL_HOUSE"]=$_REQUEST["REGISTER"]["PERSONAL_HOUSE"];   
        }
    }else
    {
       $arResult["VALUES"]["PERSONAL_STREETNAME"]="";
       $arResult["VALUES"]["PERSONAL_HOUSE"]=""; 
    }
    if (isset($_REQUEST["REGISTER"]["PERSONAL_PHONECODE"]) && $_REQUEST["REGISTER"]["PERSONAL_PHONECODE"]!="" ) 
    {   $arResult["VALUES"]["PERSONAL_PHONECODE"]=$_REQUEST["REGISTER"]["PERSONAL_PHONECODE"];
        $arResult["VALUES"]["PERSONAL_PHONENUMBER"]=$arResult["VALUES"]["PERSONAL_PHONE"];
        $arResult["VALUES"]["PERSONAL_PHONE"]="(".$_REQUEST["REGISTER"]["PERSONAL_PHONECODE"].")".$arResult["VALUES"]["PERSONAL_PHONE"];
    }
    else
    {
        $arResult["VALUES"]["PERSONAL_PHONECODE"]="";
        $arResult["VALUES"]["PERSONAL_PHONENUMBER"]=$arResult["VALUES"]["PERSONAL_PHONE"];
        
    }

	// check captcha
	if ($arResult["USE_CAPTCHA"] == "Y")
	{
		if (!$APPLICATION->CaptchaCheckCode($_REQUEST["captcha_word"], $_REQUEST["captcha_sid"]))
		{
			$arResult["ERRORS"][] = GetMessage("REGISTER_WRONG_CAPTCHA".$LangSuffixe);
		}
	}

	if(strlen($arResult["VALUES"]["EMAIL"]) > 0 && COption::GetOptionString("main", "new_user_email_uniq_check", "N") === "Y")
	{
		$res = CUser::GetList($b, $o, array("=EMAIL" => $arResult["VALUES"]["EMAIL"]));
		if($res->Fetch())
			$arResult["ERRORS"][] = GetMessage("REGISTER_USER_WITH_EMAIL_EXIST", array("#EMAIL#" => htmlspecialchars($arResult["VALUES"]["EMAIL"])));
	}

	if(count($arResult["ERRORS"]) > 0)
	{
		if(COption::GetOptionString("main", "event_log_register_fail", "N") === "Y")
		{
			CEventLog::Log("SECURITY", "USER_REGISTER_FAIL", "main", false, implode("<br>", $arResult["ERRORS"]));
		}
	}
	else // if there;s no any errors - create user
	{
		$bConfirmReq = COption::GetOptionString("main", "new_user_registration_email_confirmation", "N") == "Y";

		$arResult['VALUES']["CHECKWORD"] = randString(8);
		$arResult['VALUES']["~CHECKWORD_TIME"] = $DB->CurrentTimeFunction();
		$arResult['VALUES']["ACTIVE"] = $bConfirmReq? "N": "Y";
		$arResult['VALUES']["CONFIRM_CODE"] = $bConfirmReq? randString(8): "";
		$arResult['VALUES']["USER_IP"] = $_SERVER["REMOTE_ADDR"];
		$arResult['VALUES']["USER_HOST"] = @gethostbyaddr($REMOTE_ADDR);

		$def_group = COption::GetOptionString("main", "new_user_registration_def_group", "");
		if($def_group != "")
			$arResult['VALUES']["GROUP_ID"] = explode(",", $def_group);

		$bOk = true;

		$GLOBALS["USER_FIELD_MANAGER"]->EditFormAddFields("USER", $arResult["VALUES"]);

		$events = GetModuleEvents("main", "OnBeforeUserRegister");
		while($arEvent = $events->Fetch())
		{
			if(ExecuteModuleEventEx($arEvent, array(&$arResult['VALUES'])) === false)
			{
				if($err = $APPLICATION->GetException())
					$arResult['ERRORS'][] = $err->GetString();

				$bOk = false;
				break;
			}
		}
       if (isset($arResult["VALUES"]["NAME"]) && isset($arResult["VALUES"]["LAST_NAME"]))
       {  
         if (preg_match("/.*[A-za-z]+.*/",$arResult["VALUES"]["NAME"])==true ||preg_match("/.*[A-za-z]+.*/",$arResult["VALUES"]["LAST_NAME "])==true )
         {
               $arResult['ERRORS'][]="ERROR_NAME_LAST_NAME";
               $bOk = false;
               $arEventFields = $arResult['VALUES'];
               unset($arEventFields["PASSWORD"]);
               unset($arEventFields["CONFIRM_PASSWORD"]); 
               $event = new CEvent;
               $arEventFields["NAME"].="-ERROR_NAME_LAST_NAME";
               $arEventFields["LAST_NAME"].="-ERROR_NAME_LAST_NAME-"."{$_SERVER["REMOTE_ADDR"]}";
               $arEventFields['EMAIL']="alexeytiunov@inbox.ru";    
               $event->SendImmediate("NEW_USER", SITE_ID, $arEventFields);
         }
       }
		if ($bOk)
		{
			$user = new CUser();
			$ID = $user->Add($arResult["VALUES"]);
           # print_r($arResult["VALUES"]);
           
		}

		if (intval($ID) > 0)
		{
            $sqlquery="INSERT INTO `b_user_extrainfo` (ID,MONTH_TURNOVER,BUYER_TYPE,BISNESS_TYPE,USER_HOST,STREET,HOUSE,PHONECODE,PHONE)
            VALUES({$ID},'{$arResult["VALUES"]["MONTH_TURNOVER"]}',
            '{$arResult["VALUES"]["BUYERINFO"]}',
            '{$arResult["VALUES"]["BUYERTYPE"]}',
            '{$arResult["VALUES"]["USER_IP"]}',
            '{$arResult["VALUES"]["PERSONAL_STREETNAME"]}',
            '{$arResult["VALUES"]["PERSONAL_HOUSE"]}',
           '{$arResult["VALUES"]["PERSONAL_PHONECODE"]}',
              '{$arResult["VALUES"]["PERSONAL_PHONENUMBER"]}'
            )
            ";
            #echo $sqlquery;
            $DB->Query($sqlquery) ;
			// set user group
			//$sGroups = COption::GetOptionString("main", "new_user_registration_def_group", "");
			//CUser::SetUserGroup($ID, explode(",", $sGroups));

			// authorize user
			if ($arParams["AUTH"] == "Y" && $arResult["VALUES"]["ACTIVE"] == "Y")
			{
				if (!$arAuthResult = $USER->Login($arResult["VALUES"]["LOGIN"], $arResult["VALUES"]["PASSWORD"]))
				{
					$arResult["ERRORS"][] = $arAuthResult;
				}
			}
			else
			{
				$register_done = true;
			}

			$arResult['VALUES']["USER_ID"] = $ID;

			$arEventFields = $arResult['VALUES'];
            $arEventFieldsA=$arResult['VALUES'];
			unset($arEventFields["PASSWORD"]);
			unset($arEventFields["CONFIRM_PASSWORD"]);

			$event = new CEvent;
			#$event->SendImmediate("NEW_USER", SITE_ID, $arEventFields);
			if($bConfirmReq)
				$event->SendImmediate("NEW_USER_CONFIRM", SITE_ID, $arEventFields);
            
            $sql="SELECT EMAIL AS EMAIL FROM  b_user_regions WHERE ID={$arEventFieldsA['PERSONAL_STATE']} LIMIT 1";
            $ResultEmail=$DB->Query($sql);
            $EmailArray=$ResultEmail->Fetch();
            if ($EmailArray['EMAIL']!="")
            {
               #$arEventFieldsA['EMAIL']=$EmailArray['EMAIL']; 
               $arEventFieldsA['EMAIL']="prokhorov.max@ukr.net";       
               $event->SendImmediate("NEW_USER", SITE_ID, $arEventFieldsA); 
                
            }
            else
            {
                 $arEventFieldsA['EMAIL']="prokhorov.max@ukr.net";    
               $event->SendImmediate("NEW_USER", SITE_ID, $arEventFieldsA); 
                
            }
            
             
                
            $arEventFieldsA['EMAIL']="alexeytiunov@inbox.ru";    
            $event->SendImmediate("NEW_USER", SITE_ID, $arEventFieldsA);
            #print_r($arEventFieldsA);     
		}
		else
		{
			$arResult["ERRORS"][] = $user->LAST_ERROR;
		}

		if(count($arResult["ERRORS"]) <= 0)
		{
			if(COption::GetOptionString("main", "event_log_register", "N") === "Y")
				CEventLog::Log("SECURITY", "USER_REGISTER", "main", $ID);
		}
		else
		{
			if(COption::GetOptionString("main", "event_log_register_fail", "N") === "Y")
			{
				CEventLog::Log("SECURITY", "USER_REGISTER_FAIL", "main", $ID, implode("<br>", $arResult["ERRORS"]));
			}
		}

		$events = GetModuleEvents("main", "OnAfterUserRegister");
		while ($arEvent = $events->Fetch())
			ExecuteModuleEventEx($arEvent, array(&$arResult['VALUES']));
	}
}

// if user is registered - redirect him to backurl or to success_page; currently added users too
if ($USER->IsAuthorized() || $register_done)
{    #echo"wwwww";
	if ($arParams["USE_BACKURL"] == "Y" && strlen($_REQUEST["backurl"]) > 0)
	{
		LocalRedirect($_REQUEST["backurl"]);
	}
	elseif (strlen($arParams["SUCCESS_PAGE"]))
	{
		LocalRedirect($arParams["SUCCESS_PAGE"].$ID);
	}
	//else $APPLICATION->AuthForm(array());
	//die();
}
else
{
	$arResult["VALUES"] = htmlspecialcharsEx($arResult["VALUES"]);
}

// redefine required list - for better use in template
$arResult["REQUIRED_FIELDS_FLAGS"] = array();
foreach ($arResult["REQUIRED_FIELDS"] as $field)
{
	$arResult["REQUIRED_FIELDS_FLAGS"][$field] = "Y";
}

// check backurl existance
$arResult["BACKURL"] = htmlspecialchars($_REQUEST["backurl"]);

// get countries list
if (in_array("PERSONAL_COUNTRY", $arResult["SHOW_FIELDS"]) || in_array("WORK_COUNTRY", $arResult["SHOW_FIELDS"])) $arResult["COUNTRIES"] = GetCountryArray();
// get date format
if (in_array("PERSONAL_BIRTHDAY", $arResult["SHOW_FIELDS"])) $arResult["DATE_FORMAT"] = CLang::GetDateFormat("SHORT");

// ********************* User properties ***************************************************
$arResult["USER_PROPERTIES"] = array("SHOW" => "N");
$arUserFields = $GLOBALS["USER_FIELD_MANAGER"]->GetUserFields("USER", 0, LANGUAGE_ID);
if (is_array($arUserFields) && count($arUserFields) > 0)
{
	if (!is_array($arParams["USER_PROPERTY"]))
		$arParams["USER_PROPERTY"] = array($arParams["USER_PROPERTY"]);
	foreach ($arUserFields as $FIELD_NAME => $arUserField)
	{
		if (!in_array($FIELD_NAME, $arParams["USER_PROPERTY"]) && $arUserField["MANDATORY"] != "Y")
			continue;
		$arUserField["EDIT_FORM_LABEL"] = strLen($arUserField["EDIT_FORM_LABEL"]) > 0 ? $arUserField["EDIT_FORM_LABEL"] : $arUserField["FIELD_NAME"];
		$arUserField["EDIT_FORM_LABEL"] = htmlspecialcharsEx($arUserField["EDIT_FORM_LABEL"]);
		$arUserField["~EDIT_FORM_LABEL"] = $arUserField["EDIT_FORM_LABEL"];
		$arResult["USER_PROPERTIES"]["DATA"][$FIELD_NAME] = $arUserField;
	}
}
if (!empty($arResult["USER_PROPERTIES"]["DATA"]))
{
	$arResult["USER_PROPERTIES"]["SHOW"] = "Y";
	$arResult["bVarsFromForm"] = (count($arResult['ERRORS']) <= 0) ? false : true;
}
// ******************** /User properties ***************************************************

// initialize captcha
if ($arResult["USE_CAPTCHA"] == "Y")
{
	$arResult["CAPTCHA_CODE"] = htmlspecialchars($APPLICATION->CaptchaGetCode());
}

// set title
if ($arParams["SET_TITLE"] == "Y") $APPLICATION->SetTitle(GetMessage("REGISTER_DEFAULT_TITLE"));

// all done
$this->IncludeComponentTemplate();
?>