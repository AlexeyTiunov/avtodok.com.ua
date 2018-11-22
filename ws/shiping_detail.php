<?
 require($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php'); 
 require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/php_interface/include/autodoc_globals.php");        
  global $USER ;
  
  if (!isset($_REQUEST["ID"])) exit();
  if(!$USER->IsAuthorized())                                                                 
 {
   die("");
 }       
  
 CModule::IncludeModule("sale"); CModule::IncludeModule('iblock');     
if (!function_exists(GetUserID_1CByID)) 
{     

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
} 
 $ID1C =GetUserID_1CByID($USER->GetID()  ); 
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
   $arSelect=Array('ID','TIMESTAMP_X', 'PROPERTY_Code','PROPERTY_ClientCode','PROPERTY_AgreementCode','PROPERTY_DocumentDate','PROPERTY_Summ',
        'PROPERTY_CurrencyCode','PROPERTY_Status','PROPERTY_DeclarationID','PROPERTY_ID1C');
             #$arSelect=Array(); 
             $arFilter = Array(
                    "IBLOCK_ID" =>25,
                    "ID"=>$_REQUEST["ID"]
                    
    
                    );
       $arAgrs = GetAgreementsList();
       
      $itemsRowsArray=array();            
      $itemsRowArr=Array();                            
      $ShipItemResult= CIBlockElement::GetList(Array(), $arFilter, false, false, $arSelect);  
      while($ShipItem=$ShipItemResult->Fetch())
      {    $itemsRowArr["ID"]=$ShipItem["ID"];
           $itemsRowArr["DATE"]=$ShipItem['TIMESTAMP_X'];        
          foreach ($ShipItem as $name=>$item)
          {
            $nameArr=explode("_",$name);
            if (count ($nameArr)==3 && $nameArr[2]=="VALUE")
            {
               $itemsRowArr[$nameArr[1]]=$item; 
            }  
          }
          $itemsRowArr["AGREEMENTNAME"]="";
          if (floatval($itemsRowArr["SUMM"])>0)
          {
              $itemsRowArr["DOCUMENTTYPE"]=0;   // реализация 
          }else
          {
               $itemsRowArr["DOCUMENTTYPE"]=1;   // возврат 
          }
          foreach ($arAgrs as $argprop)
            {
                if ($argprop['Code'] == $ShipItem["PROPERTY_AGREEMENTCODE_VALUE"])
                {
                    $itemsRowArr["AGREEMENTNAME"]=$argprop['Caption'];
                }
            } 
       
        $itemsRowsArray["SHIPMENT"][]=$itemsRowArr;  
      }           
 
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
  $arSelect=Array(
           'ID','TIMESTAMP_X','PROPERTY_ShippingID','PROPERTY_BCode','PROPERTY_ICode','PROPERTY_Quantity',
           'PROPERTY_Summ','PROPERTY_Price','PROPERTY_Caption'
    );
     $arFilter = Array(
                    "IBLOCK_ID" =>26,
                     "PROPERTY_ShippingID"=>$_REQUEST["ID"],
                    );

     $ShipedItemCodePositionsResult = CIBlockElement::GetList(Array('ID'=>"DESC"), $arFilter, false, false, $arSelect);
     
     $itemsRowArr=array();
      while ($ShipedItemCodePosition=$ShipedItemCodePositionsResult->Fetch())
      {
          foreach ($ShipedItemCodePosition as $name=>$item)
          {
            $nameArr=explode("_",$name);
            if (count ($nameArr)==3 && $nameArr[2]=="VALUE")
            {
               $itemsRowArr[$nameArr[1]]=$item; 
            }  
          }
          $itemsRowsArray["ROWS"][]=$itemsRowArr;
          
          
      } 

       echo (json_encode($itemsRowsArray ,JSON_UNESCAPED_UNICODE));
?>