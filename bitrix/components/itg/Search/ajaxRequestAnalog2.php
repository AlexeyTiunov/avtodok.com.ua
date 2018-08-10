<?php  
ignore_user_abort(false);
require_once $_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/Search_ITG4.php";
require_once $_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/Analogs_new.php";
require_once $_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Appearance/Appearance.php";
#error_reporting(0);
session_start();
$arRegions = $_SESSION['arRegion_ITG'];
$arBrands = $_SESSION['arBrands_ITG'];
$arUser = $_SESSION['arUser_ITG'];
 #var_dump($_GET['bgroup']);
if (isset($_GET['icode']) && isset($_GET['bcode']))
{
    if ($_GET['bgroup'] && $_GET['bgroup']!="")
    {
       $bcode =$_GET['bgroup']; 
    } else
    {
	 $bcode = intval($_GET['bcode']);
    }
     # echo "-------------------<br /><pre>";
       # print_r($bcode);
       # echo "</pre>";
	$icode = preg_replace("/[^A-Za-z0-9]*/i",'', $_GET['icode']);
	$oAnalogs = new Analogs(array('icode'=>$icode,'bcode'=>$bcode));
	$arAnalogs = $oAnalogs->getArrItems();
   # var_dump($_GET['bcode']);
     #echo "-------------------<br /><pre>";
        #print_r($arAnalogs);
        #echo "</pre>";
        $products_arr=Array();
	foreach ($arAnalogs as $analog)
	{
		$sAnalogs = new Search_ITG(array(	
								'exactOnly'=>true,
								'user'=>$arUser['user'],
                                'usergrouparray'=>$_SESSION['GLUSERMASS'], 
 								'currency'=>$arUser["currency"], 
 								'icode'=>$analog['icode'], 
 								'bcode'=>$analog['bcode'], 
 								'page'=>0, 
 								'numPage'=>25, 
 								'arBrands'=>$arBrands['id'],
 								'region'=>$arRegions['Code'],
 								'regionID'=>$arRegions['id'],
                                'AnalogsForOurStock'=>(isset($_GET['AnalogsForOurStock']) and $_GET['AnalogsForOurStock']=='YES')?true:false)
                                
                                );
        if (isset($_GET['AnalogsForOurStock']) and $_GET['AnalogsForOurStock']=='YES')   
        {
          $sAnalogs->AnalogForOurStock=true;
         #echo "-------------------<br /><pre>";
       #print_r($sAnalogs->sqlString);
       # echo "</pre>";  
        }
                            
		if ($sAnalogs->getNumRows() > 0)
		{
			$products_arr[] = $sAnalogs->getArrItems();
            #echo "-------------------<br /><pre>";
            #print_r($sAnalogs->sqlString);
            #echo "</pre>";
            # $infoArray=$sAnalogs->GetInfoFromMegaP() ;
       }
    } 
    $products_m=Array();   
     foreach  ($products_arr as $key=>$value)
     {
         foreach ($value as $val)
         {
           $products_m[]=$val;  
             
         }
         
         
     }
      $products=Search_ITG::SortBubble($products_m) ;
    
			if (count($products) > 0)
			{
				foreach ($products as $product)
				{
		    		++$i;
		    		if ($product['RegionCode'] > 4) 
                    {
                            
                             #$idgr=$USER->GetUserGroupArray();
                                #print_r($idgr)    ;
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
                                 $product['RegionShortName'] = 'УКРАИНА';//по просьбе идиотов  
                               } else
                                {
                                $product['RegionShortName'] = "<a href='#' title='{$product['RegionFullName']}'>УКРАИНА<br>{$product['RegionFullName']}</a>";//по просьбе идиотов
                                $cssStyle = 'background-color:#eed5d5;';
                                }
                        }
                    if ($product['RegionCode'] ==1000) $product['RegionShortName'] = 'ДОНЕЦК';//
                    if ($product['RegionCode'] ==997) $product['RegionShortName'] = 'JPN';
                     if ($product['RegionCode'] ==999) $product['RegionShortName'] = 'PL';//
                     if ($product['RegionCode'] ==995) $product['RegionShortName'] = 'EU';//
                      if ($product['RegionCode'] ==994) $product['RegionShortName'] = 'Б/У запчасти';
                      if ($product['RegionCode'] ==992) $product['RegionShortName'] = 'UAE'; 
                      if ($product['RegionCode'] ==991) $product['RegionShortName'] = 'UAE';  
                      if ($product['RegionCode'] ==990) $product['RegionShortName'] = 'UA'; 
                      if ($product['RegionCode'] ==989) $product['RegionShortName'] = 'DE';
                       if ($product['RegionCode'] ==988) $product['RegionShortName'] = 'DE'; 
                       if ($product['RegionCode'] ==987) $product['RegionShortName'] = 'DE'; 
                       if ($product['RegionCode'] ==986) $product['RegionShortName'] = 'DE';
                       if ($product['RegionCode'] ==985) $product['RegionShortName'] = 'DE'; 
                        if ($product['RegionCode'] ==984) $product['RegionShortName'] = 'DE'; 
		    		$product['DeliveryDays'] = intval($product['DeliveryDays']);
		    		$cssStyle = '';
		    		switch ($product['RegionShortName'])
		    		{
		    			case 'УКРАИНА':
		    				$cssStyle = 'background-color:#eed5d5;';
		    				break;
                            case "<a href='#' title='{$product['RegionFullName']}'>УКРАИНА<br>{$product['RegionFullName']}</a>" :
                            $cssStyle = 'background-color:#eed5d5;';
                            break;
		    			case 'СКЛАД':
		    				$cssStyle = 'background-color:#fefedc;';
		    				break;
                            case 'ДОНЕЦК':
                                $cssStyle = 'background-color:#fefedc;';
                                break;
                            default:
                                $cssStyle = 'background-color:#e3e3e3;';
		    		}
                    if ($product['DeliveryDays'] != 0 && $product['RegionCode']>1 )
                    {
                      if ($product['ORDER_AFTER_DAY']!="" or $product['ORDER_AFTER_DAY']!=null ) 
                      {  
                       if ($product['ORDER_END_TIME']!="" && $product['ORDER_END_TIME']!=null  )
                       {
                            
                        if ($product['ORDER_AFTER_TIME']=="" or $product['ORDER_AFTER_TIME']==null )
                                {
                                    $deliveryDateMassage="Отримання приблизно {$product["DeliveryDate"]}";
                                }else
                                {
                                      $deliveryDateMassage="Отримання приблизно {$product["DeliveryDate"]} після {$product['ORDER_AFTER_TIME']}.";
                                }
                        $delivery =  "<strong><a href='#' title='{$deliveryDateMassage}'>".intval($product["DeliveryDays"])."</a></strong>";
                       }else
                       {
                            $delivery =  "<strong>".intval($product["DeliveryDays"])."</strong>"; 
                       }
                     }else
                     {
                         $delivery =  "<strong>".intval($product["DeliveryDays"])."</strong>"; 
                     }
                    } elseif ($product['RegionCode']==1 && $product["Quantity"]==0)
                    {
                         $delivery ="<font style='font-size:10px;text-align:left;color:red;'><strong>Нет<br>в<br>нал-и</strong></font>";    
                    }
                    else
                    {
                          $delivery =  "<font style='font-size:10px;text-align:left;'> <strong>Есть<br>в<br>нал-и</strong> </font>";
                    }
		    		#$delivery = ($product['DeliveryDays'] != 0)? "<strong>".$product['DeliveryDays']." </strong>" :"<font style='font-size:10px;text-align:left;'> <strong>Есть<br>в<br>нал-и</strong> </font>";
		    		$printRow = '';
					$printRow .= "<tr id='{$brand}{$i}' style='{$cssStyle}'>";
					$printRow .= "<td style='width:30px;'> <span class='counterFor'></span><input type='hidden' name='BrandShortCode' value='".$arBrands['id'][$product['BrandCode']]['ShortName']."' /> </td>";
					$printRow .= "<td style='width:80px;'>";
                       $printRow .= "
                            <script>
                               function defPosition(event) {
                                var x = y = 0;
                                  if (document.attachEvent != null) {
                                    x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
                                    y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
                                        }
                                if (!document.attachEvent && document.addEventListener) {
                                 x = event.clientX + window.scrollX;
                                 y = event.clientY + window.scrollY;
                                }
                                 return {x:x, y:y};
      
                                 }
                             </script>  
                            ";
                           if  ($product['BrandName']=="KOYORAD")  $printRow .= $product['BrandName']."<br>
                            <a href=\"#\" onclick=\"window.open('/bitrix/components/itg/radiators/ajaxRequestInfo.php?ItemCode=".$product["ItemCode"]."','".$product["ItemCode"]."','width=630,height=620,left='+defPosition(event).x+',top='+defPosition(event).y); return false\" >INFO</a>
                           " ;
                           elseif(($product['BrandName']=="GSP" && $product["RegionCode"] == 1) ||($product['BrandName']=="GSP" && $product["RegionCode"] ==1000) ) $printRow .= $product['BrandName']."<br> 
                            <a href=\"#\" onclick=\"window.open('/personal/order/chassis/GspInfo.php?ItemCode=".$product["ItemCode"]."&BrandCode=".$product["BrandCode"]."','".$product["ItemCode"]."','width=490,height=430,left='+defPosition(event).x+',top='+defPosition(event).y); return false\" >INFO</a>
                           " ;
                            elseif(($product['BrandName']=="AP" && $product["RegionCode"] == 1) ||($product['BrandName']=="AP" && $product["RegionCode"] ==1000) ) $printRow .= $product['BrandName']."<br>
                            <a href=\"#\" onclick=\"window.open('/personal/order/DiskBrake/DiskBrakeInfo.php?ItemCode=".$product["ItemCode"]."&BrandCode=".$product["BrandCode"]."','".$product["ItemCode"]."','width=490,height=480,left='+defPosition(event).x+',top='+defPosition(event).y); return false\" >INFO</a>
                           " ;
                            elseif(($product['BrandName']=="RTI" && $product["RegionCode"] == 1) ||($product['BrandName']=="RTI" && $product["RegionCode"] ==1000) ) $printRow .= $product['BrandName']."<br>
                            <a href=\"#\" onclick=\"window.open('/personal/order/RTI/RTIinfo.php?ItemCode=".$product["ItemCode"]."&BrandCode=".$product["BrandCode"]."','".$product["ItemCode"]."','width=490,height=480,left='+defPosition(event).x+',top='+defPosition(event).y); return false\" >INFO</a>
                           " ;
                           elseif(($product['BrandName']=="BROTHER" && $product["RegionCode"] == 1) ||($product['BrandName']=="BROTHER" && $product["RegionCode"] ==1000) ) $printRow .= $product['BrandName']."<br>
                            <a href=\"#\" onclick=\"window.open('/personal/order/BROTHERS/BROTHERSinfo.php?ItemCode=".$product["ItemCode"]."&BrandCode=".$product["BrandCode"]."','".$product["ItemCode"]."','width=510,height=480,left='+defPosition(event).x+',top='+defPosition(event).y); return false\" >INFO</a>
                           " ;                  
                           else $printRow .= $product['BrandName'];  
                           
                            if ($product['Pic64Base']!="")  $printRow .="<br> <div class='search_table_item_icon'><img src='data:image/png;base64,{$product['Pic64Base']}' style='width:30px;height:30px'></div>  
                           
                           "; 
                    
                    $printRow .="<input type='hidden' name='BrandCode' value='{$product['BrandCode']}' /></td>";
					$printRow .= "<td style='width:80px;text-align:left; font-size:11px'><strong>".$product['ItemCode']."</strong> <input type='hidden' name='ItemCode' value='{$product['ItemCode']}' /></td>";
					$printRow .= "<td style='width:80px;text-align:left;'>".$product['Caption']." <input type='hidden' name='Caption' value='{$product['Caption']}' /></td>";
					$printRow .= "<td style='width:30px; font-size:10px;'>".$delivery." <input type='hidden' name='RegionCode' value='".$product['RegionCode']."' /></td>";
                    $printRow .= "<td style='width:80px;text-align:left;font-size:11px;'>";
                    if($product["RegionCode"] == 1 or $product["RegionCode"] == 1000 )  
                     {
                         /* if ($product["Quantity"]>0)
                              {
                                $printRow .= "<font style='font-size:10px;text-align:left;'><strong>Есть<br>в<br>нал-и</strong></font>";  
                              } else
                              {
                                $printRow .= "<font style='font-size:10px;text-align:left;color:red;'><strong>Нет<br>в<br>нал-и</strong></font>";
                              } */
                  
                    
                    $printRow .= "<br><strong>".$product["Quantity"]." шт.</strong>" ;
                      }          
                             
                               elseif( $product["RegionCode"] == 3 )   $printRow .=  "<strong>>".$product["Quantity"]." шт.</strong>" ;
                               elseif( $product["RegionCode"] == 2)
                               { 
                                 if   ($product["Quantity"]==0) 
                                 {
                                     $printRow .= "<strong>>2 шт.</strong>" ; 
                                 }else
                                 {
                                  $printRow .=  "<p style=\"color:red;\"><strong>".$product["Quantity"]." шт.</strong></p>" ;
                                 }  
                               } 
                              # elseif($product["RegionCode"] == 2  )   $printRow .=  "<strong>".$infoArray["quantity"]." шт.</strong>" ;
                               else    $printRow .= "<strong>".$product["Quantity"]." шт.</strong>" ;
                     $printRow .="</td>" ;
					$printRow .= "<td style='width:50px; font-size:10px;'>
                    <strong>";
                    $printRow .=(isset($product["ReturnableParts"]) && $product["ReturnableParts"]==1)? $product['RegionShortName']."<br><img title='Возвратная позиция (по согласованию!)' src='/personal/order/images/is_returnable.png'>":
                                                                                            $product['RegionShortName']."<br><img title='Не возвратная позиция' src='/personal/order/images/isnot_returnable.png'>";
                    $printRow .= "<input type='hidden' name='ReturnableParts' value='{$product['ReturnableParts']}' /> ";
                    $printRow .="</strong><input type='hidden' name='DeliveryDays' value='".intval($product["DeliveryDays"])."' /></td>";
					 $printRow .=  "<td style='width:20px; font-size:11px;'>";
                                      if($product["RegionCode"] == 1 or $product["RegionCode"] == 1000) $printRow .= "100%";
                                       elseif  ( $product["RegionCode"] == 987 ) $printRow .= "100%" ; 
                                  elseif  ( $product["RegionCode"] == 3 ) $printRow .= "100%" ;
                                  elseif( $product["RegionCode"] == 2 ) $printRow .=  $sAnalogs->supped.'%'  ;
                                  else $printRow .= $product['PercentSupp']."%";
                    $printRow .= "</td> " ;
                    $printRow .= "<td style='width:50px;font-size:11px;'>".$product['Weight']."<input type='hidden' name='Weight' value='{$infoArray['weight']}' /></td>";
					  
                    $printRow .= "<td style='width:80px;font-size:11px;text-align:center'>".Appearance_ITG::preparePrice( $product['Price']*(Search_ITG::PriceKoef($product["Currency"],'UAH')) ,'UAH')."<input type='hidden' name='CurrencyCode' value='UAH' /></td>";
					$printRow .= "<td style='width:80px;font-size:11px;text-align:center'>".Appearance_ITG::preparePrice($product['UserPrice']*(Search_ITG::PriceKoef($product["Currency"],$arUser["currency"])),$arUser["currency"])."<input type='hidden' name='Price' value='".$product['Price']*(Search_ITG::PriceKoef($product["Currency"],'UAH'))."' /></td>";
				 if (($product["Quantity"]==0&&$product['RegionCode']!=1) || ($product["Quantity"]>0) )
                 {	
					if($arUser["auth"] == 'yes')
					{
						$printRow .="
						<td style='width:120px;'>&nbsp;
							<input name='Quantity' type='text' size='1' value='1' id='qty_{$i}_{$product['BrandCode']}'/> шт.&nbsp;&nbsp;
							<a 	class='itg-basket-style' style='border-width:0px;'
								href='#' 
								><img style='width:30px;float:right;' title='Добавить в корзину' src=\"http://parts.avtodok.com.ua/bitrix/components/itg/Search/basket.png\" />
							</a>
							<span id='pic_{$i}_{$product['BrandCode']}'>&nbsp;</span>
						</td>";
					}
                    else
                    {
                        $printRow .="
                        <td style='width:120px;'>&nbsp;
                            <input name='Quantity' type='text' size='1' value='1' id='qty_{$i}_{$product['BrandCode']}'/> шт.&nbsp;&nbsp;
                            <a     class='itg-basketR-style' style='border-width:0px;'
                                href='#' 
                                ><img style='width:30px;float:right;' title='Быстрый Заказ,Розничная цена' src=\"http://parts.avtodok.com.ua/bitrix/components/itg/Search/Basket.gif\" />
                            </a>
                            <span id='pic_{$i}_{$product['BrandCode']}'>&nbsp;</span>
                        </td>";
                        
                    }
                 }
                  else
                  {
                     $printRow .="<td style='width:120px;'>&nbsp;</td>";   
                  }  
					$printRow .= "</tr>";
					if ($product['RegionCode'] == 1 || $product['RegionCode'] > 4) $j = 200+$i-100;
					else $j = 200+$i+100;
					//echo "<tr><td colspan='10'>".intval($product['RegionCode'].$j)."</td></tr>";
					$arPrintRow[intval($j)] = $printRow;
				}
			}
		
	//echo "<tr><td colspan='10' style='height:500px;'><pre>";
	//var_dump($arPrintRow);
	//echo "</pre></td></tr>";
	if (isset($arPrintRow) && count($arPrintRow) > 0)
	{
		ksort($arPrintRow, SORT_NUMERIC);
		echo implode('', $arPrintRow);
	}
}
?>