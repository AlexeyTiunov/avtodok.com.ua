<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/php_interface/include/autodoc_globals.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/autodoc/includes/autodoc_templaytor.php");
global $DB;
?>
<a name="tb"></a>
<!--<a href="<?=$arResult["URL_TO_LIST"]?>"><?=GetMessage("SPOD_RECORDS_LIST")?></a> 
<br /><br />  -->  
<?if(strlen($arResult["ERROR_MESSAGE"])<=0):?>
    <table class="sale_personal_order_detail data-table">
    <tr>
        <th colspan="2" align="center"><b><?="Заказ №"#GetMessage("SPOD_ORDER_NO")?>&nbsp;<?=$arResult["ID"]?>&nbsp;<?=GetMessage("SPOD_FROM")?> <?=$arResult["DATE_INSERT"] ?></b></th>
    </tr>
    <tr>
        <td align="right" width="40%"><?="Текущий статус заказа:"#echo GetMessage("SPOD_ORDER_STATUS")?></td>
        <td width="60%"><?=str_ireplace('Подтвержден','В работе',$arResult["STATUS"]["NAME"])?><?= "( от "#GetMessage("SPOD_ORDER_FROM")?><?=$arResult["DATE_STATUS"]?>)</td>
    </tr>
    <tr>
        <td align="right" width="40%"><?="Сумма заказa"#GetMessage("P_ORDER_PRICE")?>:</td>
        <td width="60%"><?
                echo "<b>".$arResult["PRICE_FORMATED"]."</b>";
                if (DoubleVal($arResult["SUM_PAID"]) > 0)
                    echo "(".GetMessage("SPOD_ALREADY_PAID")."&nbsp;<b>".$arResult["SUM_PAID_FORMATED"]."</b>)";
                ?></td>
    </tr>

    <tr>
        <td align="right" width="40%">Регион:</td>
        <td width="60%"><?

        CModule::IncludeModule('iblock');
        $arRegions = GetAllRegionsProperties();
       # echo $arRegions[GetRegionCodeForOrder( $arResult["ID"] )]["ShortName"];
        if ($arRegions[GetRegionCodeForOrder( $arResult["ID"] )]["ShortName"]=='JPNA')
               {
                   echo 'Япония';
               } 
               elseif($arRegions[GetRegionCodeForOrder( $arResult["ID"] )]["ShortName"]=='UAE' 
                      || GetRegionCodeForOrder( $arResult["ID"] )==2 )
               {
                   echo 'Эмираты'; 
               }
               elseif($arRegions[GetRegionCodeForOrder( $arResult["ID"] )]["ShortName"]=='DE' 
                    || GetRegionCodeForOrder( $arResult["ID"] )==3)
               {
                   echo 'Германия'; 
               }
               elseif($arRegions[GetRegionCodeForOrder( $arResult["ID"] )]["ShortName"]=='USA')
               {
                   echo 'США'; 
               }
               elseif($arRegions[GetRegionCodeForOrder($arResult["ID"])]["ShortName"]=='EU')
               {
                   echo 'Европа'; 
               }
               elseif($arRegions[GetRegionCodeForOrder( $arResult["ID"] )]["ShortName"]=='Склад')
               {
                   echo 'Склад'; 
               }
               else
               {
                   #echo $arRegions[GetRegionCodeForOrder($val["ORDER"]["ID"])]["ShortName"];
                  echo 'Украина';
               }
                ?></td>
    </tr>

    <?
    if(!empty($arResult["ORDER_PROPS"]))
    {
        foreach($arResult["ORDER_PROPS"] as $val)
        {
            if ($val["SHOW_GROUP_NAME"] == "Y")
            {
                ?>
                <tr>
                    <td colspan="2" align="center"><b><?=$val["GROUP_NAME"];?></b></td>
                </tr>
                <?
            }
            ?>
            <tr>
                <td width="40%" align="right"><?echo $val["NAME"] ?>:</td>
                <td width="60%"><?
                    if ($val["TYPE"] == "CHECKBOX")
                    {
                        if ($val["VALUE"] == "Y")
                            echo GetMessage("SALE_YES");
                        else
                            echo GetMessage("SALE_NO");
                    }
                    else
                        echo $val["VALUE"];
                    ?></td>
            </tr>
            <?
        }
    }
    if (strlen($arResult["USER_DESCRIPTION"])>0)
    {
        ?>
        <tr>
            <td align="right" colspan="2">
                <img src="/bitrix/images/1.gif" width="1" height="8">
            </td>
        </tr>
        <tr>
            <td align="right" width="40%"><?=GetMessage("P_ORDER_USER_COMMENT")?>:</td>
            <td width="60%"><?=$arResult["USER_DESCRIPTION"]?></td>
        </tr>
        <?
    }
    ?>
    <tr>
        <td align="right" colspan="2">
            <img src="/bitrix/images/1.gif" width="1" height="8">
        </td>
    </tr>


    <tr>
        <th colspan="2" align="center"><b><?=GetMessage("P_ORDER_BASKET")?></b></th>
    </tr>
    <tr>
        <td colspan="2">
            <table class="sale_personal_order_detail data-table">
                  <tr>
                    <th>Бренд, код, название</th>
                    <th colspan="2">Статусы строки</th>
                    
                    <th>№ заказа по<br>Вашей базе</th>
                    <th><?= GetMessage("SPOD_QUANTITY") ?></th>
                    <th><?= GetMessage("SPOD_PRICE") ?></th>
                </tr>
                <?
                $itemCodeChangeCheck=false;
                $itemCodeChangeTH=""; 
               
                foreach($arResult["BASKET"] as $val)
                {    $ColorForStatus=""; 
                    $itemCodeChangeCheck=false;
                    $itemCodeChangeTH="";
                     

                            if(!empty($val["PROPS"]))
                              {
                                foreach($val["PROPS"] as $vv)
                                {
                                   
                                    switch($vv["CODE"])
                                      {
                                          case "Brand" :
                                            $sql="SELECT PROPERTY_72 AS BrandName FROM `b_iblock_element_prop_s14` WHERE PROPERTY_71='{$vv["VALUE"]}' LIMIT 1";
                                            $result=$DB->Query($sql);
                                            $BrandNameArray=$result->Fetch();
                                           # $brand = $vv["VALUE"];
                                            if ($BrandNameArray["BrandName"]=="")
                                            {
                                               $brand = $vv["VALUE"]; 
                                            } else
                                            {
                                             $brand=$BrandNameArray["BrandName"];
                                            }
                                            break;

                                          case "ItemCode" :
                                            $itemCode = $vv["VALUE"];
                                            break;
                                           case "ItemCodeChange"  :
                                            $itemCodeChange=$vv["VALUE"];
                                            $itemCodeChangeCheck=true;
                                            $itemCodeChangeTH="(Была Произведена Замена На)<br> ";
                                           break; 
                                          case "ItemStatusQuantity":
                                             $ItemStatusQuantity=$vv["VALUE"];
                                          break;
                                          
                                          case "ItemStatusQuantity2":
                                             $ItemStatusQuantity2=$vv["VALUE"];
                                          break;
                                          
                                          case "ItemStatus" :
                                               switch( $vv["VALUE"])
                                                 {
                                                      case 0 :
                                                         $itemStatus = "В работе";
                                                         $itemStatusID=0;
                                                      break;

                                                      case 1 :
                                                         $itemStatus = "Выкуплен";
                                                          $itemStatusID=1;
                                                      break;

                                                      case 2 :
                                                         $itemStatus = "Отказ";
                                                         $ColorForStatus="red";
                                                          $itemStatusID=2;
                                                      break;

                                                      case 3 :
                                                         $itemStatus = "Склад";
                                                         $ColorForStatus="Green";
                                                          $itemStatusID=3;
                                                      break;

                                                      case 4 :
                                                         $itemStatus = "Отгружен";
                                                          $itemStatusID=4;
                                                      break;
                                                        case 5:
                                                        $itemStatus = "В пути";
                                                         $itemStatusID=5;
                                                      break;
                                                      case 6 :
                                                         $itemStatus = "СкладДонецк";
                                                          $itemStatusID=6;
                                                      break;

                                                 }
                                            break;
                                            case "ItemStatus2" :
                                               switch( $vv["VALUE"])
                                                 {
                                                      case 0 :
                                                         $itemStatus2 = "В работе";
                                                      break;

                                                      case 1 :
                                                         $itemStatus2 = "Выкуплен";
                                                      break;

                                                      case 2 :
                                                         $itemStatus2 = "Отказ";
                                                      break;

                                                      case 3 :
                                                         $itemStatus2 = "Склад";
                                                      break;

                                                      case 4 :
                                                         $itemStatus2 = "Отгружен";
                                                      break;
                                                        case 5:
                                                        $itemStatus2 = "В пути";
                                                      break;
                                                      case 6 :
                                                         $itemStatus = "СкладДонецк";
                                                      break;

                                                 }
                                            break;
                                            case "WAREHOUSEDATE":
                                            if ($vv["VALUE"]!="" )
                                            {
                                            $explodedatearray=explode("-",$vv["VALUE"]);
                                            $warehousedate="<br>Ожидается:<br>".$explodedatearray[2]."-".$explodedatearray[1]."-".$explodedatearray[0];
                                           # $warehousedate=$vv["VALUE"];
                                            }else
                                            {
                                               $warehousedate=""; 
                                            }
                                            break;
                                      
                                      
                                      }
                                }


                             }
                           else
                             {
                               $brand = "";
                               $itemCode = "Не определено";
                               $itemStatus = "Не определено";
                             }





                    ?>
                    
                    <tr>
                        <td><?

                            $objTStr = new TemplatedString( $itemCode );

                           $brandID = GetBrandCodeByCHR( $brand );

                              $objTStr->SetTemplate( $brandID );
                           $itemCode = $objTStr->GetTemplated();
                             $title="Инфо                                                                    
                             
                             
                             
                             
                             
                             ";

                            if (strlen($val["DETAIL_PAGE_URL"])>0)
                                echo "<a href=\"".$val["DETAIL_PAGE_URL"]."\">";
                                if ($itemCodeChangeCheck)
                                {
                                  echo $itemCodeChangeTH.
                                  $brand." : <a id=\"RequestInfo\"  href='#table' title='{$title}'> 
                                  <input type=\"hidden\" name=\"ItemCode\" value=\"".$itemCode."\"> "
                                  .htmlspecialcharsEx($itemCode)."</a>
                                  <br>".htmlspecialcharsEx($val["NAME"])."<br>----------------------------------<br>
                                  Старый Артикул: ".htmlspecialcharsEx($itemCodeChange)."
                                  ";   
                                }  else
                                {
                                echo $brand." : <a id=\"RequestInfo\" href='#table' title='{$title}'>  
                                <input type=\"hidden\" name=\"ItemCode\" value=\"".$itemCode."\"> " 
                                .htmlspecialcharsEx($itemCode)."</a>
                                <br>".htmlspecialcharsEx($val["NAME"]);
                                }
                            if (strlen($val["DETAIL_PAGE_URL"])>0)
                                echo "</a>";
                            ?></td>
                            <?
                            if ($ItemStatusQuantity2=='0'|| (!isset($ItemStatusQuantity2)))
                            {
                               $itemStatus2="";
                               $ItemStatusQuantity2="";
                               $line=""; 
                            } else
                            {
                                $line="-------" ;
                            }
                            if ($itemStatusID==0 || $itemStatusID==1 || $itemStatusID==5)
                            {
                               
                            }else
                            {
                                $warehousedate="";
                            }
                            ?>
                        <td id="OrderStatus" style="color:<?=$ColorForStatus?>;"><?=$itemStatus?><?=$warehousedate?><br><?=$line?><br><?=$itemStatus2?></td>
                        <td><?=$ItemStatusQuantity?><br><?=$line?><br><?=$ItemStatusQuantity2?></td>
                        <td><?=$val["NOTES"]?></td>
                        <td><?=$val["QUANTITY"]?></td>
                        <td align="right"><?=$val["PRICE_FORMATED"]?></td>
                    </tr>
                    <?
                }
                ?>
                <tr>
                    <td align="right"><b><?=GetMessage("SPOD_ITOG")?>:</b></td>
                    <td align="right" colspan="4"><?=$arResult["PRICE_FORMATED"]?></td>
                </tr>
            </table>
        </td>
    </tr>
</table>
 <? 
 $dateFrom=  date( "d.m.Y" ,mktime(0,0,0,1,1,2012)); 
 echo "
 <script>
   \$('a#RequestInfo').click(function()
   {
   \$('#infotable').html('Идет Поиск Информации.<a name=\"table\"></a>');
   
     params={
           filter_date_from: '{$dateFrom}',
          ItemCode: \$(this).find(':input[type=\"hidden\"]').filter('[name=\"ItemCode\"]').val(),
                    
           auth: 'YES',
           };
           urlQueryAjax = '/autodoc/fulldocdetail.php';
                   $.get(urlQueryAjax, params, function(data)
                   {
                   
                    \$('#infotable').html('<a name=\"table\"></a>'+data);
                   
                   
                   });
           
           
   
   }   
   ); 
    </script> "   
 ?>
 

<br><br>
<a name="table"></a>
<div id="infotable">
<a name="table"></a>

</div>
<?else:?>
    <?=ShowError($arResult["ERROR_MESSAGE"]);?>
<?endif;?>
