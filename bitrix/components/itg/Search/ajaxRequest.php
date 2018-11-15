<?php
error_reporting(E_ALL);
ignore_user_abort(false);
$_GET['OnlyUsa']='N';
#set_time_limit(1); 
require_once $_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/Search_ITG4.php";
if (isset($_GET['OnlyUsa'])&& $_GET['OnlyUsa']=='N')
{
require_once $_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/connect.web/Connect_ITG4.php";

}elseif (isset($_GET['OnlyUsa'])&& $_GET['OnlyUsa']=='Y') 
{
 require_once $_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/connect.web/Connect_ITG41.php";
#exit;   
} elseif (isset($_GET['OnlyUsa'])&& $_GET['OnlyUsa']=='W') 
{
 require_once $_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/connect.web/Connect_ITG42.php";
#exit;   
}
//var_dump($_GET['OnlyUsa']);
require_once $_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Appearance/Appearance.php";
#require ("/media/Vol/www/bitrix/components/itg/Search/Search_ITG4.php");  
session_start();

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

   
       
        $_GET['user'] = ($_GET['user'] == '')?'09999':$_GET['user'];
        $itemsFromWebAll = new Connect_ITG(array(
                                                'user'=>$_GET['user'],
                                                #'client'=>'autopalma',
                                                'article'=>$_GET['icode'],
                                                'currency'=>"USD"
                                        ));
        $i = $_GET['iterator'];
        $itemsFromWeb = $itemsFromWebAll->getResult();
        #echo "<pre>";
        #print_r($arBrands);
        #echo "</pre>";
        if (is_array($itemsFromWeb) && count($itemsFromWeb)>0)
        {
             #echo "<pre>";
        #print_r($arBrands);
        #echo "</pre>";
        $ItemsArray=Array();
            foreach ($itemsFromWeb as $resConnect)
            {
                if (count($resConnect) == 0) continue;
                foreach ($resConnect as $product)
                {
                  
                    $brand = $arBrands['ShortName'][strtoupper($product['Brand'])]['FullName'];
                    if ($brand)
                    {
                        
                        
                        $bcode = $arBrands['ShortName'][strtoupper($product['Brand'])]['id'];
                    }
                    else 
                    {     
                        
                        $brand = isset($arBrands['FullName'][strtoupper($product['Brand'])]['ShortName'])?strtoupper($product['Brand']):"";
                        $bcode = $arBrands['FullName'][strtoupper($product['Brand'])]['id']; 
                          #echo "<pre>";
                         # echo $product['Brand'];
                         # echo "</pre>"; 
                        
                    }
                    
                    foreach ($_SESSION['GLUSERMASS'] as $id=>$ii)
                              {
   
                                  if ($ii==4)
                                 {  #echo'www';
                                   $idgrch=true; 
                                    break;   
                                  } else
                                    {
                                      $idgrch=false ;
                                     }
                               }
                              if( $idgrch!=true) 
                               { 
                                 if ($product['REGIONR']=='USA' || $product['REGIONR']=='KOREA' || $product['REGIONR']=="UAE" || $product['REGIONR']=="JPN") 
                                 {
                                      $product['REGIONRR']= $product['REGIONR'];
                                 }else
                                 {
                                     $product['REGIONRR']= 'УКРАИНА';
                                 }
                                 //$product['REGIONRR'] = ($product['REGIONR']!='USA' && $product['REGIONR']!='KOREA' )?'УКРАИНА':$product['REGIONR']; 
                               } else
                                {
                                $product['REGIONRR'] = "<a href='#' title='{$product['REGIONR']}'><br>{$product['REGIONR']}</a>";
                                $cssStyle = 'background-color:#eed5d5;';
                                }
                    
                    
                    
                    
                    //
                   if (!$brand) continue;//
                    ++$i;
                    $product["BrandShortCode"]=$arBrands['id'][$bcode]['ShortName'];
                    //$brand
                   // $bcode
                    
                    $OrderAfterDay=Search_ITG::DefineOrderAfterDay($product['REGION']);
                      if ($OrderAfterDay!="" || $OrderAfterDay!=NULL)
                      {
                        
                          if (Search_ITG::DefineOrderAfterTime($product['REGION'])=="" || Search_ITG::DefineOrderAfterTime($product['REGION'])==NULL)
                          {
                              $deliveryDateMassage="Отримання приблизно ".Search_ITG::DefineDeliveryDate($OrderAfterDay,Search_ITG::DefineOrderEndTime($product['REGION']));
                          } else
                          {
                             $deliveryDateMassage="Отримання приблизно ".Search_ITG::DefineDeliveryDate($OrderAfterDay,Search_ITG::DefineOrderEndTime($product['REGION']))." після ".Search_ITG::DefineOrderAfterTime($product['REGION']);
                          }
                           if (Search_ITG::DefineOrderEndTime($product['REGION'])=="" || Search_ITG::DefineOrderEndTime($product['REGION'])==NULL) 
                           {
                             echo "<td style='width:30px;font-size:10px;'><strong>{$product["DELIVERY"]}</strong><input type='hidden' name='RegionCode' value='".$arRegions['ShortName'][$product['REGION']]['Code']."' /></td>";  
                           } else
                           {
                             echo "<td style='width:30px;font-size:10px;'><strong> <a href='#' title='".$deliveryDateMassage."'>{$product["DELIVERY"]}</a></strong><input type='hidden' name='RegionCode' value='".$arRegions['ShortName'][$product['REGION']]['Code']."' /></td>";
                           }
                      }else
                      {
                         echo "<td style='width:30px;font-size:10px;'><strong>{$product["DELIVERY"]}</strong><input type='hidden' name='RegionCode' value='".$arRegions['ShortName'][$product['REGION']]['Code']."' /></td>";  
                      }
                       if (isset($product['NOT_REGION_CURRENCY']))
                         {
                           $RregionCodeCurency= $product['NOT_REGION_CURRENCY']; 
                         } else
                         {
                           $RregionCodeCurency=$arRegions['ShortName'][$product['REGION']]['chrCurrencyCode'];  
                         }
                         
                     # $RregionCodeCurency =$product['Currency'];
                         $Koef= Appearance_ITG::PriceKoef($RregionCodeCurency,'UAH');
                         $product['Price']= $product['PRICEREGION']*$Koef;
                         $product['CurrencyCode']="UAH";
                         $product['PriceP']=Appearance_ITG::preparePrice($product['PRICEREGION']*$Koef,'UAH');
                  
                   $ItemsArray[]=$product;
                }
            }
        }
     echo (json_encode($ItemsArray,JSON_UNESCAPED_UNICODE));
?>