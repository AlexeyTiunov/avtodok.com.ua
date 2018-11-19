<?
require_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php'); 

 function CheckPassword($password)
 {
     if (!preg_match("/.{5,}/")) return false;      
     if (!preg_match("/.*?[A-Z]+.*/")) return false;      
     if (!preg_match("/.*?[a-z]+.*/")) return false;     
     if (!preg_match("/.*?\d+.*/")) return false; 
     
     if (preg_match("/.*?\<+.*/")) return false; 
     if (preg_match("/.*?\>+.*/")) return false;  
     
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
   "IncorrectPassword"=>1,
   "IncorrectLogin"=>1,
   "UserID"=>0,
   
 
 );
 

 if (!isset($_REQUEST['PASSWORD']) || $_REQUEST['PASSWORD']=="" || $_REQUEST['PASSWORD']==null)
 {
    echo (json_encode($replyMassages,JSON_UNESCAPED_UNICODE));
    die();
 }
 if (!isset($_REQUEST['LOGIN']) || $_REQUEST['LOGIN']=="" || $_REQUEST['LOGIN']==null)
 {
     echo (json_encode($replyMassages,JSON_UNESCAPED_UNICODE));
    die();
 }
$NewEmail= ($_REQUEST['LOGIN']!=false)? "".$_REQUEST['LOGIN']."@".$_REQUEST['LOGIN'].".com.ua":false;

COption::SetOptionString("main","captcha_registration","N");//отключили капчу
COption::SetOptionString("main","new_user_registration_email_confirmation","N");//отключили подтверждение
$arResult = $USER->Register($_REQUEST['LOGIN'], "", "", $pas, $pas, $_POST["mail"]); //регистрируем и авторизуем
//далее включаем обратно 
COption::SetOptionString("main","captcha_registration","Y");
COption::SetOptionString("main","new_user_registration_email_confirmation","Y");
//ShowMessage($arResult); //все успешно
$USER_ID = $USER->GetID(); // тут мой индификатор, а не только что созданный
     
    
    
?>