<?
require_once ($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php'); 

if ( !isset($_REQUEST["dir"]) )
$dir_name="/ws/carousel/img" ;
else
$dir_name=$_REQUEST["dir"];

//var_dump($_SERVER["DOCUMENT_ROOT"].$dir_name);
$files_names=scandir($_SERVER["DOCUMENT_ROOT"].$dir_name);
 if ($files_names==false) exit("ERROR");
  $correct_name_array=Array();
 foreach ($files_names as $file_name )
 {
     if ($file_name=="." || $file_name=="..") continue;
     if (preg_match("/(.+?)(\.{1})(jpg|jepg|png)/i",$file_name))
     $correct_name_array[]=$file_name;
     
 }
 
  echo (json_encode($correct_name_array,JSON_UNESCAPED_UNICODE));



    
?>