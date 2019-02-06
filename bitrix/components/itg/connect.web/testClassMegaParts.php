<?
    require_once ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/connect.web/Connect_MegaParts.php"); 
     error_reporting(E_ALL);   
    $objectMegaParts= new MegaParts("5310148421","MegaPartsStockAllowed_JAPAN_EMIL");  #5310148421      #DF71510L0G
      var_dump( $objectMegaParts->getfinalArray());
   var_dump( $objectMegaParts->check());
   var_dump($objectMegaParts->SoapObjectToCheck()); 
?>