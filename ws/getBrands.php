<?
 require_once ($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');
  require_once ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/IB.property/BrandGroup.php");    
  require ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/IB.property/IBPropertyAdvanced1.php"); 
  
  
  global $USER;
  /* $regionID = 17;
                 $brandID = 14;
                 $oRegion = new IBPropertyAdvanced_ITG(array('IB'=>$regionID));
                 $arRegions = $oRegion->getArray();
                 $oBrand = new IBPropertyAdvanced_ITG(array('IB'=>$brandID));
                 $arBrands = $oBrand->getArray(); */   
    
   $brandID = 14;   
    $oBrand = new IBPropertyAdvanced_ITG(array('IB'=>$brandID));
    $arBrands = $oBrand->getArray();
    if (isset($_REQUEST['ID']))
    echo (json_encode($arBrands['id'],JSON_UNESCAPED_UNICODE));   
    elseif (isset($_REQUEST['SHORTNAME']))
     echo (json_encode($arBrands['ShortName'],JSON_UNESCAPED_UNICODE));
     elseif (isset($_REQUEST['FULLNAME']))
     echo (json_encode($arBrands['FullName'],JSON_UNESCAPED_UNICODE));
    else
     echo (json_encode($arBrands,JSON_UNESCAPED_UNICODE));
?>