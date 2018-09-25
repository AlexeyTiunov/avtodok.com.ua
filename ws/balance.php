<?
 require_once ($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/php_interface/include/autodoc_globals.php"); 
require_once "{$_SERVER['DOCUMENT_ROOT']}/bitrix/components/itg/balance/balance1.php";
require_once "{$_SERVER['DOCUMENT_ROOT']}/bitrix/components/itg/balance/ItemsFromBasket.php";   
 //error_reporting(E_ALL);
//ini_set("display_errors","1");  
 global $USER;
$UID = GetUserID_1CByID($USER->GetID());

$arAgrs = GetAgreementsList();
 $checkagrements=false;
  $pointOfRefferenceArray=Array(); 
foreach($arAgrs as $agr)
{
    
  if  (str_replace(" ","",$agr["Caption"])!="ДОГОВОРБЕЗНАЛГРН." && str_replace(" ","",$agr["Caption"])!="ДОГОВОРНАЛИЧНЫЙДОЛЛАР" ) continue;
  
  $currDateObj = new DateTime('now');
    $currDate = $currDateObj->format('Ymd');
    $params = array( 
                    'user'=>$UID, 
                    'agreement'=>$agr["Code"], 
                    'dateEnd'=>$currDate); 
    $balance = new Balance($params);
    $pointOfRefference=$balance->getPointOfReference();
    $pointOfRefferenceArray[]=$pointOfRefference;
     #$params['user'] = $USER->GetID();
    #$itemsFromBasket = new ItemsFromBasket($params);  
    
    
}    
  echo (json_encode($pointOfRefferenceArray,JSON_UNESCAPED_UNICODE));    
 //var_dump($pointOfRefferenceArray);   
?>