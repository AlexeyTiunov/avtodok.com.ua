<?
  require_once ($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');
  require_once ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/IB.property/BrandGroup.php");    
  require ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/IB.property/IBPropertyAdvanced1.php"); 
  
   $regionID = 17;
                 $brandID = 14;
                 $oRegion = new IBPropertyAdvanced_ITG(array('IB'=>$regionID));
                 $arRegions = $oRegion->getArray();
                 $oBrand = new IBPropertyAdvanced_ITG(array('IB'=>$brandID));
                 $arBrands = $oBrand->getArray();
                 
   
   echo (json_encode($arRegions ,JSON_UNESCAPED_UNICODE));                   
    
    
?>