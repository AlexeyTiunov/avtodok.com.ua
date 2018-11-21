<?
require($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');         
  global $USER ;
  if(!$USER->IsAuthorized())                                                                 
 {
   die("ERROR");
 }       
  
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

 $ID1C =GetUserID_1CByID($USER->GetID()  ); 
 
  if( ! isset( $_REQUEST["filter_date_from"] )   )
      {
                //  сегодня - 1 месяц
        //$mkDateFrom = date( "d.m.Y" ,mktime(0, 0, 0, date("m")-1, date("d"),date("Y")));
        $mkDateFrom = mktime(0, 0, 0, date("m"), date("d"),   date("Y")-10);
         // $mkDateFrom= mktime(0,0,0,1,1,2012); 
        $dateLineBegin=date($DB->DateFormatToPHP(CLang::GetDateFormat("SHORT")),$mkDateFrom);     
       // var_dump($dateLineBegin);
      //  var_dump(date($DB->DateFormatToPHP(CLang::GetDateFormat("SHORT")), mktime(0,0,0,1,1,2003))) ;
      }
      else
      {
        $dateFrom = $_REQUEST["filter_date_from"];
        $arDateFrom = explode(".", $dateFrom);
        $mkDateFrom = mktime(0, 0, 0, $arDateFrom[1], $arDateFrom[0], $arDateFrom[2]);
        $dateLineBegin=date($DB->DateFormatToPHP(CLang::GetDateFormat("SHORT")),$mkDateFrom);  
        $TimeCheckDate= mktime(0,0,0,1,1,2012);
        if($TimeCheckDate>$mkDateFrom)
        {
             $dateFrom=  date( "d.m.Y" ,mktime(0,0,0,1,1,2012)); 
             $arDateFrom = explode(".", $dateFrom);
             $mkDateFrom = mktime(0, 0, 0, $arDateFrom[1], $arDateFrom[0], $arDateFrom[2]);
             $dateLineBegin=date($DB->DateFormatToPHP(CLang::GetDateFormat("SHORT")),$mkDateFrom);
        } 
        
      
        
      }  
      
      if( ! isset( $_REQUEST["filter_date_to"] )   )
      {
                //  сегодня
        $dateTo = date( "d.m.Y" );
        $mkDateTo = mktime(0, 0, 0, date("m"), date("d"),   date("Y"));  
        $dateLineTo=date($DB->DateFormatToPHP(CLang::GetDateFormat("SHORT")),$mkDateTo); 
        
      }
    else
      {
        $dateTo = $_REQUEST["filter_date_to"];
        $arDateTo = explode(".", $dateTo);
        $mkDateTo = mktime(0, 0, 0, $arDateTo[1], $arDateTo[0], $arDateTo[2]);     
        $dateLineTo=date($DB->DateFormatToPHP(CLang::GetDateFormat("SHORT")),$mkDateTo); 
        
       
      }
 
 
      $arFilter = Array(
    "IBLOCK_ID" =>31,
    array("LOGIC" => "AND",
     "PROPERTY_AgentCode"=>$ID1C,
      ">=DATE_CREATE"=>$dateLineBegin,
      "<=DATE_CREATE"=>$dateLineTo
      
      ) 

      );
      $arSelect=Array('ID',"DATE_CREATE",'PROPERTY_Receiver','PROPERTY_NumPlace',
       'PROPERTY_Deliver','PROPERTY_Number','PROPERTY_Num1c','PROPERTY_Date');
     $DocShipedResult= CIBlockElement::GetList(Array(), $arFilter, false, false, $arSelect);
     while ($DocShiped=$DocShipedResult->Fetch())
     {
         $DocShipedToshow[$DocShiped['ID']]['ID']=$DocShiped['ID'];
        $DocShipedToshow[$DocShiped['ID']]['NUMBER']=$DocShiped['PROPERTY_NUMBER_VALUE'];
       $DocShipedToshow[$DocShiped['ID']]['NUMBERBASE']=$DocShiped['PROPERTY_NUM1C_VALUE'];
       $DocShipedToshow[$DocShiped['ID']]['DELIVER']=$DocShiped['PROPERTY_DELIVER_VALUE'];
       $DocShipedToshow[$DocShiped['ID']]['DATE']=$DocShiped['PROPERTY_DATE_VALUE'];
       $DocShipedToshow[$DocShiped['ID']]['PLACES']=$DocShiped['PROPERTY_NUMPLACE_VALUE'];
       
       $ShipedToShowArr["SHIPINGDOCS"][]= $DocShipedToshow[$DocShiped['ID']]; 
     }

    echo (json_encode($ShipedToShowArr ,JSON_UNESCAPED_UNICODE));
?>