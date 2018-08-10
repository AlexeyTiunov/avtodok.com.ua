<?
define("START_EXEC_PROLOG_BEFORE_1", microtime());
$GLOBALS["BX_STATE"] = "PB";
if(isset($_REQUEST["BX_STATE"])) unset($_REQUEST["BX_STATE"]);
if(isset($_GET["BX_STATE"])) unset($_GET["BX_STATE"]);
if(isset($_POST["BX_STATE"])) unset($_POST["BX_STATE"]);
if(isset($_COOKIE["BX_STATE"])) unset($_COOKIE["BX_STATE"]);
if(isset($_FILES["BX_STATE"])) unset($_FILES["BX_STATE"]);

if(!isset($USER)) {global $USER;}
if(!isset($APPLICATION)) {global $APPLICATION;}
if(!isset($DB)) {global $DB;}

require_once(dirname(__FILE__)."/../include.php");
if ($_SERVER['SERVER_NAME']=="new.avtodok.com.ua")
$GLOBALS["LANGUAGE"]="UKR";
else
$GLOBALS["LANGUAGE"]="RUS";

$ua = $_SERVER['HTTP_USER_AGENT'];
                             if (eregi('Android', $ua) && eregi('Mobile', $ua)) 
                             {
                               $platform = "Android Phone";
                               $_GET['STO']="STO";  
                             }
                             elseif (eregi('Android', $ua) && !eregi('Mobile', $ua)) 
                              {
                                 $platform = "Android Tablet"; 
                                 $_GET['STO']="STO";    
                              }
                             
                             elseif (eregi('iPhone', $ua) ) 
                             {
                                 $platform = "iPhone";
                                  $_GET['STO']="STO";
                                 
                             } 


CMain::PrologActions();
?>