<?
require($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');         
  global $USER ;
  
 CModule::IncludeModule("sale"); CModule::IncludeModule('iblock');     
  
  
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
function getShippingRows()
{
    $arSelect=Array(
           'ID','TIMESTAMP_X','PROPERTY_ShippingID','PROPERTY_BCode','PROPERTY_ICode','PROPERTY_Quantity',
           'PROPERTY_Summ','PROPERTY_Price','PROPERTY_Caption'
    );
    $arFilter = Array(
                    "IBLOCK_ID" =>26,
                    "PROPERTY_ICode"=>$ItemCode,
                    ">=TIMESTAMP_X"=> $dateLineBegin
                    );
                    
                    
    $ShipedItemCodePositionsResult = CIBlockElement::GetList(Array('ID'=>"DESC"), $arFilter, false, false, $arSelect);
    
     while ($ShipedItemCodePosition=$ShipedItemCodePositionsResult->Fetch()) 
     {
         
     }
    
}          

 $ID1C =GetUserID_1CByID($USER->GetID()  ); 
 
  if( ! isset( $_REQUEST["filter_date_from"] )   )
      {
                //  сегодня - 1 месяц
        //$mkDateFrom = date( "d.m.Y" ,mktime(0, 0, 0, date("m")-1, date("d"),date("Y")));
        $mkDateFrom = mktime(0, 0, 0, date("m"), date("d"),   date("Y")-1);
         // $mkDateFrom= mktime(0,0,0,1,1,2012); 
        $dateLineBegin=date($DB->DateFormatToPHP(CLang::GetDateFormat("SHORT")),$mkDateFrom);     
       // var_dump($dateLineBegin);
      //  var_dump(date($DB->DateFormatToPHP(CLang::GetDateFormat("SHORT")), mktime(0,0,0,1,1,2003))) ;
      }
      else
      {
        $dateFrom = $_GET["filter_date_from"];
        $arDateFrom = explode(".", $dateFrom);
        $mkDateFrom = mktime(0, 0, 0, $arDateFrom[1], $arDateFrom[0], $arDateFrom[2]);
        $dateLineBegin=date("Y-m-d h:i:s",$mkDateFrom);  
        $TimeCheckDate= mktime(0,0,0,1,1,2012);
        if($TimeCheckDate>$mkDateFrom)
        {
             $dateFrom=  date( "d.m.Y" ,mktime(0,0,0,1,1,2012)); 
             $arDateFrom = explode(".", $dateFrom);
             $mkDateFrom = mktime(0, 0, 0, $arDateFrom[1], $arDateFrom[0], $arDateFrom[2]);
             $dateLineBegin=date("Y-m-d h:i:s",$mkDateFrom);
        } 
        
      
        
      }  
      
      if( ! isset( $_REQUEST["filter_date_to"] )   )
      {
                //  сегодня
        $dateTo = date( "d.m.Y" );
      }
    else
      {
        $dateTo = $_REQUEST["filter_date_to"];
      }
 
      
    $arSelect=Array('ID', 'PROPERTY_Code','PROPERTY_Summ','PROPERTY_ClientCode','PROPERTY_AgreementCode','PROPERTY_DocumentDate',
        'PROPERTY_CurrencyCode','PROPERTY_DocumentType','PROPERTY_Status','PROPERTY_DeclarationID','PROPERTY_ID1C');
    $arFilter = Array(
                    "IBLOCK_ID" =>25,
                    "PROPERTY_ClientCode"=>$ID1C,
                     ">=DATE_CREATE"=>$dateLineBegin,
                    );
       $ShipItemResult= CIBlockElement::GetList(Array(), $arFilter, false, false, $arSelect);
              #print_r($ShipItemResult);
       while($ShipItem=$ShipItemResult->Fetch())
       {
           if ($ShipItem['PROPERTY_DOCUMENTTYPE_VALUE']=='Возврат товаров от покупателя') 
           {
                      
                      $BackToShow[$ShipItem['ID']]['NUMBER']=$ShipItem['PROPERTY_CODE_VALUE'];
                      $BackToShow[$ShipItem['ID']]['STATUS']=$ShipItem['PROPERTY_STATUS_VALUE'];
                      $BackToShow[$ShipItem['ID']] ['DATE']=$ShipItem['PROPERTY_DOCUMENTDATE_VALUE'];
                     
                      $BackToShow[$ShipItem['ID']]['SUMM']=$ShipItem['PROPERTY_SUMM_VALUE']*-1;
                      $BackToShow[$ShipItem['ID']]['CURRENCY']=$ShipItem['PROPERTY_CURRENCYCODE_VALUE'];
                      
                      $ShipedToShowArr["RETURNS"][]= $BackToShow[$ShipItem['ID']];
           } 
           
       }               
     
 
    
    echo (json_encode($ShipedToShowArr ,JSON_UNESCAPED_UNICODE));
?>