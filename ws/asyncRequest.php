<?
  ignore_user_abort(false);
  require_once ($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');  
  require_once  ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/Search_ITG4.php");
  require_once ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/IB.property/BrandGroup.php");


  $fp = fsockopen ("176.36.252.82", 8090, $errno, $errstr);
  if (!$fp) {
    var_dump("ERRROR");
  }
  $vars = array(
    'ItemCode' => $_REQUEST["ItemCode"],
    'BrandCode'=> $_REQUEST["BrandCode"]);
    
    
    $content = http_build_query($vars);
    //var_dump($content);
stream_set_blocking($fp,false); 
fwrite($fp, "POST /ws/searchItems.php HTTP/1.1\r\n");
fwrite($fp, "Host: 176.36.252.82\r\n");
fwrite($fp, "Content-Type: application/x-www-form-urlencoded\r\n");
fwrite($fp, "Content-Length: ".strlen($content)."\r\n");
fwrite($fp, "Connection: close\r\n");
fwrite($fp, "\r\n");
fwrite($fp, $content);

$check=true;
$i=1;
while($check)
{
    $str= stream_get_contents($fp);
 if ($str!=false)
 {
     echo $str;
    #$check=false;  
 } 
 ; 
 $i++;   
}
  
    
    
    
    
    
    
?>