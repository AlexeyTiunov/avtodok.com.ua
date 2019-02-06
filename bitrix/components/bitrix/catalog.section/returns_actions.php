<?
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/bitrix/catalog.section/returns.php");

 //var_dump($_POST);
if (isset($_POST['action']) && isset($_POST['status'])&& $_POST['status']!="" && isset($_POST['ID']))
{
   // var_dump($_POST);
 if ($_POST['action']($_POST['ID'],$_POST['status']))
 {
  //var_dump($_POST['action']($_POST['ID'],$_POST['status']));
  echo 1;
 } 
    

}

if (isset($_POST['action'])&& isset($_POST['ID'] ) && !isset($_POST['status']) )
{
    //var_dump($_POST); 
   echo $_POST['action']($_POST['ID']);
    
    
}

//sleep(5);    
//echo 0;    
?>