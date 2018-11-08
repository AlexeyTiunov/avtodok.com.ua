<?
 

require_once ($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');   
require_once $_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/Search_ITG4.php";
require_once $_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/Analogs_new.php";
require_once $_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Appearance/Appearance.php"; 
ini_set("display_errors","1");
error_reporting(0); 
ignore_user_abort(false);  
//session_start();  


 
global $USER; 
function GetUserID_1CByID( $ID )
{
  global $DB;
  $sql = "SELECT ID_1C FROM b_user WHERE ID='".$ID."'";
  $res = $DB->Query( $sql );
  if( $arRes = $res->Fetch() )
    return $arRes["ID_1C"];
  else
    return false;
}   



 
                require ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/IB.property/IBPropertyAdvanced1.php"); 
                 $regionID = 17;
                 $brandID = 14;
                 $oRegion = new IBPropertyAdvanced_ITG(array('IB'=>$regionID));
                 $arRegions = $oRegion->getArray();
                 $oBrand = new IBPropertyAdvanced_ITG(array('IB'=>$brandID));
                 $arBrands = $oBrand->getArray();
                  
           
    

 if(!$USER->IsAuthorized())                                                                 
 {
   die("ERROR");
 }       
if (!isset($_REQUEST['ItemCode']) || !isset($_REQUEST['BrandCode']))
{
    
  exit("1");  
} else
{
  if (preg_match("/^\#{1}[0-9]{1}$/i",$_REQUEST['BrandCode']))
  {
   $_GET['bgroup']=$_REQUEST['BrandCode']; 
  
  } 
  
  $_GET['bcode']=$_REQUEST['BrandCode'];    
  $_GET['icode']=$_REQUEST['ItemCode'] ;  
  $_GET["BCODE"]=$_REQUEST['BrandCode'];  
}
   

if (!isset($_GET['icode']) || !isset($_GET['bcode']))
{
    exit("2");
}     
    
  
  if ($_GET['bgroup'] && $_GET['bgroup']!="")
    {
       $bcode =$_GET['bgroup']; 
    } else
    {
     $bcode = intval($_GET['bcode']);
    }
    $icode = preg_replace("/[^A-Za-z0-9]*/i",'', $_GET['icode']);
    $oAnalogs = new Analogs(array('icode'=>$icode,'bcode'=>$bcode));
    $arAnalogs = $oAnalogs->getArrItems();
   // var_dump($arAnalogs);
     $_REQUEST["CURRENCY"]="USD";    
     $products_arr=Array();
      $UID = GetUserID_1CByID($USER->GetID());
      
      
    foreach ($arAnalogs as $analog)
    {
       
        $sAnalogs = new Search_ITG(array(    
                                'exactOnly'=>true,
                                'user'=>$UID,                                
                                'usergrouparray'=>$USER->GetUserGroupArray(),                                 
                                 'currency'=>$_REQUEST["CURRENCY"], 
                                 'icode'=>$analog['icode'], 
                                 'bcode'=>$analog['bcode'], 
                                 'page'=>0, 
                                 'numPage'=>1000, 
                                 'arBrands'=>$arBrands['id'],
                                 'region'=>$arRegions['Code'],
                                 'regionID'=>$arRegions['id'],
                                'AnalogsForOurStock'=>(isset($_REQUEST['AnalogsForOurStock']) and $_REQUEST['AnalogsForOurStock']=='YES')?true:false)
                                
                                );
                                  
        if (isset($_REQUEST['AnalogsForOurStock']) and $_REQUEST['AnalogsForOurStock']=='YES')   
        {
          $sAnalogs->AnalogForOurStock=true;
           #echo "-------------------<br /><pre>";
           #print_r($sAnalogs->sqlString);
            # echo "</pre>";  
        }
        if ($sAnalogs->getNumRows() > 0)
        {
           //   var_dump($analog['icode']);
           //  var_dump($analog['bcode']);
           //  var_dump($sAnalogs->getArrItems());  
              $products_arr[] = $sAnalogs->getArrItems();
             
            #echo "-------------------<br /><pre>";
            #print_r($sAnalogs->sqlString);
            #echo "</pre>";
            # $infoArray=$sAnalogs->GetInfoFromMegaP() ;
       }                         
        
    // var_dump($sAnalogs->getArrItems());   
        
      unset($sAnalogs); 
    } 
   
    //var_dump($products_arr); 
   
     $products_m=Array();   
     foreach  ($products_arr as $key=>$value)
     {
         foreach ($value as $val)
         {
           $products_m[]=$val;  
             
         }
         
         
     }
     
      $products=$products_m; 
       echo (json_encode($products,JSON_UNESCAPED_UNICODE));
      //var_dump($products);
?>