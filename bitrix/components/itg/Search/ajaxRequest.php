<?php
error_reporting(E_ALL);
ignore_user_abort(false);
for ($i=0; $i<1;$i++)
{
                    
}     
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
$arRegions = $_SESSION['arRegion_ITG'];
$arBrands = $_SESSION['arBrands_ITG'];
    if(isset($_GET["web"]))
    {
        /*$itemsFromWeb['tehnomir'] = new Connect_ITG(array(
                                                'user'=>$_GET['user'],
                                                'client'=>'tehnomir',
                                                'article'=>$_GET['icode'],
                                                'currency'=>$_GET['currency']
                                        ));*/
        $_GET['user'] = ($_GET['user'] == '')?'09999':$_GET['user'];
        $itemsFromWebAll = new Connect_ITG(array(
                                                'user'=>$_GET['user'],
                                                #'client'=>'autopalma',
                                                'article'=>$_GET['icode'],
                                                'currency'=>$_GET['currency']
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
            foreach ($itemsFromWeb as $resConnect)
            {
                if (count($resConnect) == 0) continue;
                foreach ($resConnect as $product)
                {
                   # echo "<pre>";
                    #echo $product['Brand']; 
                   # echo "</pre>";
                    if ($product['REGIONR']=='USA')
                    {
                        if ($product['Brand']=='CHRYSLER' || $product['Brand']=='FORD' || $product['Brand']=='GENERAL MOTORS'
                        || $product['Brand']=='HYUNDAI' || $product['Brand']=='MAZDA' || $product['Brand']=='MITSUBISHI' || $product['Brand']=='TOYOTA' )
                         {
                             #continue;
                         }
                        
                    }
                    //
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
                    echo "<tr id='{$brand}{$i}' style='background-color:{$product['CS']}'>";
                    echo "<td style='width:30px;'> <span class='counterFor'></span><input type='hidden' name='BrandShortCode' value='".$arBrands['id'][$bcode]['ShortName']."' /> </td>";
                    echo "<td style='width:80px;'>".$brand."<input type='hidden' name='BrandCode' value='{$bcode}' /></td>";
                    echo "<td style='width:90px;text-align:left; font-size:11px'><strong>".$product['ICODE']."</strong> <input type='hidden' name='ItemCode' value='{$product['ICODE']}' /></td>";
                    echo "<td style='width:90px;text-align:left;'>".$product['CAPTION']." <input type='hidden' name='Caption' value='{$product['CAPTION']}' /></td>";
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
                     echo "<td style='width:80px;text-align:left;font-size:11px;'><strong>".$product['QuantityS']." шт.</strong></td>";
                    echo "<td style='width:50px; font-size:10px;'><strong>";
                    echo $product['REGIONRR']."<br><img  title='Не возвратная позиция' src='/personal/order/images/isnot_returnable.png'>";
                    echo "<input type='hidden' name='ReturnableParts' value='0' /> ";  
                    echo"</strong><input type='hidden' name='DeliveryDays' value='".$product["DELIVERY"]."' /></td>";
                     echo"<td style='width:20px; font-size:11px;'>{$product['PercentSupp']}%</td> "  ;
                    echo "<td style='width:50px;font-size:11px;'>".$product['Weight']."<input type='hidden' name='Weight' value='{$product['Weight']}' /></td>";
                         if (isset($product['NOT_REGION_CURRENCY']))
                         {
                           $RregionCodeCurency= $product['NOT_REGION_CURRENCY']; 
                         } else
                         {
                           $RregionCodeCurency=$arRegions['ShortName'][$product['REGION']]['chrCurrencyCode'];  
                         }
                         
                     # $RregionCodeCurency =$product['Currency'];
                         $Koef= Appearance_ITG::PriceKoef($RregionCodeCurency,'UAH');
                    echo "<td style='width:80px;font-size:11px;text-align:center'>".Appearance_ITG::preparePrice($product['PRICEREGION']*$Koef,'UAH')."<input type='hidden' name='CurrencyCode' value='UAH' /></td>";
                    echo "<td style='width:80px;font-size:11px;text-align:center''>".Appearance_ITG::preparePrice($product['PRICEREGIONINCURRENCY'],$_GET['currency'])."<input type='hidden' name='Price' value='".$product['PRICEREGION']*$Koef."' /></td>";
                    
                    if($_GET['auth'])
                    {
                        echo"
                        <td style='width:120px;'>&nbsp;
                            <input name='Quantity' type='text' size='1' value='1' id='qty_{$i}_{$product['BrandCode']}'/> шт.&nbsp;&nbsp;
                            <a     class='itg-basket-style' style='border-width:0px;'
                                href='#' 
                                ><img style='width:30px;float:right;' title='Добавить в корзину' src=\"/bitrix/components/itg/Search/basket.png\" />
                            </a>
                            <span id='pic_{$i}_{$bcode}'>&nbsp;</span>
                        </td>";
                    } else
                    {
                        echo"
                            <td style='width:120px;'>&nbsp;
                                <input name='Quantity' type='text' size='1' value='1' id='qty_{$i}_{$product['BrandCode']}'/> шт.&nbsp;&nbsp;
                                <a  class='itg-basketR-style' style='border-width:0px;'
                                    href='#' 
                                    ><img style='width:30px;float:right;' title='Быстрый Заказ,Розничная цена' src=\"/bitrix/components/itg/Search/Basket.gif\" />
                                </a>
                                <span id='pic_{$i}_{$product['BrandCode']}'>&nbsp;</span>
                            </td>";
                    }
                    echo "</tr>";
                }
            }
        }
    }
?>