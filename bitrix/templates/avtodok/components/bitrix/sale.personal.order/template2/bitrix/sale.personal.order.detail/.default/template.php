<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/php_interface/include/autodoc_globals.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/autodoc/includes/autodoc_templaytor.php");
?>
<a name="tb"></a>
<!--<a href="<?=$arResult["URL_TO_LIST"]?>"><?=GetMessage("SPOD_RECORDS_LIST")?></a> 
<br /><br />  --> 
<script>
  function ItemStatusChangeQuery(BASKET_ID,STATUS_CODE)
  {
   params={
         BASKET_ID:BASKET_ID,
         STATUS_CODE:STATUS_CODE,
           };   
      
     urlQueryAjax = '/personal/suppload/ItemStatusChangeQuery.php';
                   $.get(urlQueryAjax, params, function(data)
                   {                   
                   
                   
                   });       
      
  } ;
  function QuantityChangeQuery(BASKET_ID,QUANTITY)
  {
       if (QUANTITY==0 || QUANTITY=='0' || QUANTITY=="")
       {
           return false;
       } 
       params={
         BASKET_ID:BASKET_ID,
         QUANTITY:QUANTITY,
             };   
      
       urlQueryAjax = '/personal/suppload/QuantityChangeQuery.php';
                   $.get(urlQueryAjax, params, function(data)
                   {                   
                   
                   
                   });
                         
  }
  
</script>
<?
    function defineItemStatusChangeQuery($value)
    {
        #global $DB;
        #$sql="SELECT * FROM b_sale_basket_prop WHERE BASKET_ID={$basketID} AND CODE='ItemStatusChageQuery'" ;
        
        if ($value=="")
        {
            return false;
        }
        $arrayValue=explode("#",$value);
        if (count($arrayValue)!=2)
        {
           return false; 
        }
        
        $queryStatus=$arrayValue[0];
        $answerStatus=$arrayValue[1];
        
        if ($answerStatus=="?")
        {
             return defineStatusName($queryStatus)."<br><h4 style='color:red;'> НЕ ПОДТВЕРЖДЕН<h4>";
            
            
        }elseif ($answerStatus=="X")
        {
             return defineStatusName($queryStatus)."<br><h4 style='color:red;'> ОТКЛОНЕН</h4>";
            
            
        }  
        elseif($queryStatus==$answerStatus)
        {
            
          return defineStatusName($queryStatus)."<br><h4 style='color:green;'>ПОДТВЕРЖДЕН"; 
            
        }
        
        
    }
    function defineStatusName($statusCode)
    {
        switch ($statusCode)
        {
            case 0:  
             return "В работе";
            case 1:
             return "Выкуплен" ;
            case 2:
            return "Отказ" ;
            
        }
        
    }
    function defineQuantityChangeQuery($value)
    {
           if ($value=="")
        {
            return false;
        }
        $arrayValue=explode("#",$value);
        if (count($arrayValue)!=2)
        {
           return false; 
        }
         $queryStatus=$arrayValue[0];
         $answerStatus=$arrayValue[1];
         if ($answerStatus=="?")
        {
             return "Изменение количества на <strong>{$queryStatus}</strong> "."<br><h4 style='color:red;'> НЕ ПОДТВЕРЖДЕНО<h4>";
            
            
        }elseif ($answerStatus=="X")
        {
                return "Изменение количества на<strong> {$queryStatus}</storng>"." <br><h4 style='color:red;'> ОТКЛОНЕНО</h4>";
            
            
        }  
        elseif($queryStatus==$answerStatus)
        {
            
          return "Изменение количества на <strong>{$queryStatus}</strong>"."<br><h4 style='color:green;'>ПОДТВЕРЖДЕНО";
            
        }
    }
?> 
<?if(strlen($arResult["ERROR_MESSAGE"])<=0):?>

            <table class="sale_personal_order_detail data-table">
                  <!--<tr>
                    <th>Бренд, код, название</th>
                    <th colspan="2">Статусы строки</th>
                    
                    <th>№ заказа по<br>Вашей базе</th>
                    <th><?= GetMessage("SPOD_QUANTITY") ?></th>
                    <th><?= GetMessage("SPOD_PRICE") ?></th>
                </tr>  -->
                <?
                $itemCodeChangeCheck=false;
                $itemCodeChangeTH=""; 
                     # var_dump ($arResult["BASKET"] );
                foreach($arResult["BASKET"] as $val)
                {     #var_dump ($val["PROPS"]);
                     $ColorForStatus=""; 
                     $itemCodeChangeCheck=false;
                     $itemCodeChangeTH="";
                     
                     $itemStatusChangeQuery="<a href='#' onclick=\"ItemStatusChangeQuery({$val["ID"]},2);OpenDetailHere({$arResult["ID"]});OpenDetailHere({$arResult["ID"]})\" >Запрос на отказ</a>";
                     $quantityChangeQuery="<a href='###'  id='{$val["ID"]}'><h4>Изменить количество. Запрос.</h4></a>
                                           <input type='text' size='5' id='i{$val["ID"]}'></input>
                     "; 
                            if(!empty($val["PROPS"]))
                              {
                                foreach($val["PROPS"] as $vv)
                                {
                                   
                                    switch($vv["CODE"])
                                      {
                                          
                                          case "ItemStatusChangeQuery": 
                                          
                                            $itemStatusChangeQuery=defineItemStatusChangeQuery($vv['VALUE']);
                                          break;
                                          case "QuantityChangeQuery":
                                               $quantityChangeQuery=defineQuantityChangeQuery($vv['VALUE']);
                                          break;
                                          case "Brand" :
                                            $brand = $vv["VALUE"];
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
                                                      break;

                                                      case 1 :
                                                         $itemStatus = "Выкуплен";
                                                      break;

                                                      case 2 :
                                                         $itemStatus = "Отказ";
                                                         $ColorForStatus="red";
                                                         $itemStatusChangeQuery="";
                                                          $quantityChangeQuery="";
                                                      break;

                                                      case 3 :
                                                         $itemStatus = "Склад";
                                                         $ColorForStatus="Green";
                                                      break;

                                                      case 4 :
                                                         $itemStatus = "Отгружен";
                                                      break;
                                                        case 5:
                                                        $itemStatus = "В пути";
                                                      break;
                                                      case 6 :
                                                         $itemStatus = "СкладДонецк";
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
                                            if ($vv["VALUE"]!="")
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
                        <td style="width:25%;"><?

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
                         <td style="width:15%;" align="right"><?=$val["PRICE_FORMATED"]?></td>   
                            
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
                            ?>
                        <td  style="width:25%;"id="OrderStatus" style="color:<?=$ColorForStatus?>;">
                        <div style="width:49%;float:left;">
                        <?=$itemStatus?><?=$warehousedate?><br><?=$line?><br><?=$itemStatus2?>
                        </div>
                        <div style="width:39%;float:left;border-left: solid 1px #ADC3D5;">
                             <?=$itemStatusChangeQuery?>
                        </div>
                        </td>
                        <td style="width:15%;"><?=$ItemStatusQuantity?><br><?=$line?><br><?=$ItemStatusQuantity2?></td>
                      
                        <td style="width:20%;">
                          <div style="width:19%;float:left;">
                            <?=$val["QUANTITY"]?>
                          </div>
                          <div style="width:59%;float:left; border-left: solid 1px #ADC3D5;"> 
                              <?=$quantityChangeQuery?>
                           </div>
                        </td>
                        
                    </tr>
                    <?
                }
                ?>
                <tr>
                    <td style="width:25%;"  align="right"><b><?=GetMessage("SPOD_ITOG")?>:</b></td>
                    <td style="width:75%;" align="right" colspan="4"><?=$arResult["PRICE_FORMATED"]?></td>
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
