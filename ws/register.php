<?
require_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php'); 
global $USER;

if (isset ($_REQUEST["getCaptchaSid"]))
{
    echo  htmlspecialchars($APPLICATION->CaptchaGetCode());    
    die();
}


 function CheckPassword($password)
 {
     if (!preg_match("/^.{5,}$/" ,$password )){ var_dump("1"); return false;}          
     if (!preg_match("/^.*?[A-Z]+.*$/",$password)){ var_dump("1"); return false;}          
     if (!preg_match("/^.*?[a-z]+.*$/",$password)){ var_dump("1"); return false;}                       
     if (!preg_match("/^.*?\d+.*$/",$password)){ var_dump("1"); return false;}          
     if (preg_match("/^.*?\<+.*$/",$password)){ var_dump("1"); return false;}                     
     if (preg_match("/^.*?\>+.*$/",$password)){ var_dump("1"); return false;}            
              
     
     return true;
     
 }
 function CheckLogin ($login)
 {
     if (preg_match("/38[0-9]{3}[0-9]{5,}/",$login) )
     {
        return true; 
     }
      
     
     
     return false ;
 }
 
 $replyMassages=Array
 (
   "IncorrectPassword"=>0,
   "IncorrectLogin"=>0,
   "UserID"=>0,
   "Success"=>"",
   
 
 );
 

 if (!isset($_REQUEST['PASSWORD']) || $_REQUEST['PASSWORD']=="" || $_REQUEST['PASSWORD']==null || CheckPassword($_REQUEST['PASSWORD'])==false )
 {
   $replyMassages["IncorrectPassword"]=1;
    echo (json_encode($replyMassages,JSON_UNESCAPED_UNICODE));
    die();
 }
 if (!isset($_REQUEST['LOGIN']) || $_REQUEST['LOGIN']=="" || $_REQUEST['LOGIN']==null || CheckLogin($_REQUEST['LOGIN'])==false)
 {
     $replyMassages["IncorrectLogin"]=1;
    
    die();
 }
$NewEmail= ($_REQUEST['LOGIN']!=false)? "".$_REQUEST['LOGIN']."@".$_REQUEST['LOGIN'].".com.ua":false;

//COption::SetOptionString("main","captcha_registration","N");//отключили капчу
COption::SetOptionString("main","new_user_registration_email_confirmation","N");//отключили подтверждение
$arResult = $USER->Register($_REQUEST['LOGIN'], $_REQUEST['LOGIN'], "",$_REQUEST['PASSWORD'],$_REQUEST['PASSWORD_CONFIRM'], $NewEmail,false,$_REQUEST["CAPTCHA_WORD"],$_REQUEST["capture_sid"]);//регистрируем и авторизуем
//далее включаем обратно 
//COption::SetOptionString("main","captcha_registration","Y");
COption::SetOptionString("main","new_user_registration_email_confirmation","Y");

 if ($USER->IsAuthorized())
  {
    $sql="INSERT INTO b_user_extrainfo (ID,MONTH_TURNOVER,BUYER_TYPE,BISNESS_TYPE,USER_HOST,1C_CHECK_CREATE,STREET,HOUSE,PHONECODE,PHONE)
    VALUES ({$USER->GetID()},'onebuyR','myavto#','myavto','{$_SERVER['REMOTE_ADDR']}',0,'#FutureIN# ','#FutureIN#','','{$_REQUEST['LOGIN']}')
     ";
     $result=$DB->Query($sql); 
      
  }

$replyMassages["UserID"]=$USER->GetID();
$replyMassages["Success"]=$arResult;
 echo (json_encode($replyMassages,JSON_UNESCAPED_UNICODE));
//ShowMessage($arResult); //все успешно
//var_dump($arResult);
//$USER_ID = $USER->GetID(); // тут мой индификатор, а не только что созданный
//var_dump($USER_ID);     
    
    
?>