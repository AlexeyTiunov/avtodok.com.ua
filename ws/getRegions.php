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
    function GetAllRegionsProperties_2($addCaption)
    {
        global $DB;

        $MY_IBLOCK_ID = 17;   //  Код инфоблока "Регионы"

        $items = GetIBlockElementList($MY_IBLOCK_ID,false, Array("NAME"=>"ASC"));


        $allRegions=Array();
        while($arItem = $items->GetNext())
          {
               
             $elem = GetIBlockElement($arItem["ID"]);
              if($elem['PROPERTIES']['Code']['VALUE']=="")continue;
                   //  заполняем массив свойств каждого региона
             $arRegions["ID"]= $elem['PROPERTIES']['Code']['VALUE'];
             $arRegions["chrCurrencyCode"] = $elem['PROPERTIES']['chrCurrencyCode']['VALUE'];
             $arRegions["DeliveryDays"] = $elem['PROPERTIES']['OrderDays']['VALUE'];
             $arRegions["ShortName"] = $elem['PROPERTIES']['ShortName']['VALUE'];
             if ($addCaption)
             {
                $arRegions["Caption"] = $elem['PROPERTIES']['Caption']['VALUE'];  
             }else
             {
                 $arRegions["Caption"] = $elem['PROPERTIES']['ShortName']['VALUE'];
             }
            $allRegions[]=$arRegions ;
          }

        if ( isSet($allRegions) )
          return $allRegions;
        else
          return false;
    }                
   
                 
   function GetAllRegionsProperties($addCaption)
    {
        global $DB;

        $MY_IBLOCK_ID = 17;   //  Код инфоблока "Регионы"

        $items = GetIBlockElementList($MY_IBLOCK_ID,false, Array("NAME"=>"ASC"));


        
        
        while($arItem = $items->GetNext())
          {   
             $elem = GetIBlockElement($arItem["ID"]);
               if ( $elem['PROPERTIES']['Code']['VALUE']=="") continue;
                   //  заполняем массив свойств каждого региона 
             $arRegions[ $elem['PROPERTIES']['Code']['VALUE'] ]["chrCurrencyCode"] = $elem['PROPERTIES']['chrCurrencyCode']['VALUE'];
             $arRegions[ $elem['PROPERTIES']['Code']['VALUE'] ]["DeliveryDays"] = $elem['PROPERTIES']['OrderDays']['VALUE'];
             $arRegions[ $elem['PROPERTIES']['Code']['VALUE'] ]["ShortName"] = $elem['PROPERTIES']['ShortName']['VALUE'];
             if ($addCaption)
             {
                $arRegions[ $elem['PROPERTIES']['Code']['VALUE'] ]["Caption"] = $elem['PROPERTIES']['Caption']['VALUE'];  
             }else
             {
                 $arRegions[ $elem['PROPERTIES']['Code']['VALUE'] ]["Caption"] = $elem['PROPERTIES']['ShortName']['VALUE'];
             }
           
          }

        if ( isSet($arRegions) )
          return $arRegions;
        else
          return false;
    }  
      CModule::IncludeModule('iblock'); 
     $idgr=$USER->GetUserGroupArray(); 
     foreach ($idgr as $id=>$i)
      {

          if ($i==4)
         { 
           $idgrch=true; 
            break;   
          } else
          {
           $idgrch=false ;
          }
       } 
     if(!$USER->IsAuthorized()|| $idgrch!=true)
     {
         $arRegions= GetAllRegionsProperties(false); 
     }else
     {
           $arRegions=GetAllRegionsProperties(true);
     }  
     
     if (isset($_REQUEST['REGION_ID']) && $_REQUEST['REGION_ID']>0) 
     {
          
          echo (json_encode($arRegions[$_REQUEST['REGION_ID']] ,JSON_UNESCAPED_UNICODE));
          
     } 
     if (isset($_REQUEST['REGIONS']))
     {
          echo (json_encode($arRegions,JSON_UNESCAPED_UNICODE));
     }            
   
                
   
 //  echo (json_encode($arRegions ,JSON_UNESCAPED_UNICODE));                   
    
    
?>