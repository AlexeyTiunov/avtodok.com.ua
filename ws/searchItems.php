<?
  error_reporting(E_ALL);
  require_once ($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');  
  require_once  ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/Search_ITG4.php");
  require_once ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/IB.property/BrandGroup.php");  
  session_start();
  global $USER; 
  
  ////
  $_SESSION['GLUSERMASS'] =$USER->GetUserGroupArray(); 
  
  //// 
  
  
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
  
  ////
  
  function CheckCondConfirm($USERID)
    {
        global $DB;
        $sql="SELECT CondConfirm FROM b_user WHERE ID='".$USERID."' LIMIT 1";
        $result = $DB->Query( $sql );
        
        if ($CondConfirm=$result->Fetch()) 
        {
            if ($CondConfirm['CondConfirm']==1 )
            {
               return true;
            }
            else
            {
               return false; 
            }
            
        } else
        {
               return false;
        }
        
        
        
    }       
         
  ////  
  
  
  
   if(!isSet( $_REQUEST["ICODE"]))
      {
          $_REQUEST["ICODE"]=$_GET['icode']  ;
               //  Приводим к стандартному виду ( верхний регистр, удалены "левые символы" )
          #$_REQUEST["ICODE"] = PrepareICode( $_REQUEST["ICODE"] );
           $_REQUEST["ICODE"] = preg_replace("/[^A-Za-z0-9]*/i", "",$_REQUEST["ICODE"]);
                 //  разруливаем ситуации с новым поиском и пересчетом текущих результаттов ( сортировка, пересчет цен в валюту и т.п.
      } else
      {
        $_REQUEST["ICODE"]=$_GET['icode']  ; 
         //  Приводим к стандартному виду ( верхний регистр, удалены "левые символы" )
         $_REQUEST["ICODE"] = preg_replace("/[^A-Za-z0-9]*/i", "",$_REQUEST["ICODE"]);       
         
               
      }  
       if(!isSet( $_REQUEST["BCODE"]) )
       {
                      
           $_REQUEST["BCODE"]= $_GET['BCODE'];
       }     
    
     $cartItemsCnt =0;
     CModule::IncludeModule("sale"); CModule::IncludeModule('iblock');
     
     
     
     if (isset($_SESSION['arBrands_ITG']) && isset ($_SESSION['arRegion_ITG']))
           {
                $arRegions = $_SESSION['arRegion_ITG'];
                $arBrands = $_SESSION['arBrands_ITG'];
               
           } else
           {
                require ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/IB.property/IBPropertyAdvanced1.php"); 
                 $regionID = 17;
                 $brandID = 14;
                 $oRegion = new IBPropertyAdvanced_ITG(array('IB'=>$regionID));
                 $arRegions = $oRegion->getArray();
                 $oBrand = new IBPropertyAdvanced_ITG(array('IB'=>$brandID));
                 $arBrands = $oBrand->getArray();
                  $_SESSION['arRegion_ITG'] = $arRegions;
                 $_SESSION['arBrands_ITG'] = $arBrands;
           }
           
           
           
     $UID = GetUserID_1CByID($USER->GetID());
     (!$UID && $USER->IsAuthorized())
     {} 
     
     
     $CondConfirm=CheckCondConfirm($USER->GetID());
     if (!$CondConfirm && $USER->IsAuthorized())
     {}
     
     if (!isset($_REQUEST["CURRENCY"]))
     {
         $_REQUEST["CURRENCY"] = $_GET['currency']; 
     }
     
     
     if(!isset($_REQUEST["ICODE"]))
     {}
     
      $itemCodeGAF= $_REQUEST["ICODE"];
      
      $_GET["pg"]=0;
      $_REQUEST["NUM_PAG"]=1000;
      $_REQUEST["CMB_SORT"] = "PRICE";
      
      
      $items = new Search_ITG(array(    'user'=>$UID,
                                        'userID'=>$USER->GetID(),
                                        'usergrouparray'=>$USER->GetUserGroupArray(),
                                         'currency'=>$_REQUEST["CURRENCY"], 
                                         'icode'=>$itemCodeGAF, 
                                         'bcode'=>$_GET["BCODE"], 
                                         'page'=>$_GET["pg"], 
                                         'numPage'=>$_REQUEST["NUM_PAG"], 
                                         'sort'=>$_REQUEST["CMB_SORT"],
                                         'arBrands'=>$arBrands['id'],
                                         'region'=>$arRegions['Code'],
                                         'regionID'=>$arRegions['id'],
                                        'DBB'=>$DBS));
     
     
    
  if ($items->getNumRows()== 0)
  {}
      
     echo json_encode($products = $items->getArrItems()); 
     // $brands = $items->getBrans();
      
      
      //$countBrand = count($brands);
       
     //  if($countBrand == 0 )
     //  {
               
       
      // }
       
       
       
      
      
      
    
    
?>