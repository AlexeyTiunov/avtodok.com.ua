<?php # echo __DIR__;
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/php_interface/include/autodoc_globals.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/sale/include.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/autodoc/includes/autodoc_templaytor.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/bitrix/catalog.section/returns.php");

global $SummITG,$CurrencyCodeITG;
?>
<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<div class="catalog-section">
<?if($arParams["DISPLAY_TOP_PAGER"]):?>
    <p><?=$arResult["NAV_STRING"]?></p>
<?endif?>
<div id='table_upload' >
<table class="data-table" cellspacing="0" cellpadding="0" border="0" width="100%">
    <thead>
    <tr>
        <!-- <th><?=GetMessage("CATALOG_TITLE")?></th>
        <?if(count($arResult["ITEMS"]) > 0):
            foreach($arResult["ITEMS"][0]["DISPLAY_PROPERTIES"] as $arProperty):?>
                <th><?=$arProperty["NAME"]?></th>
            <?endforeach;
        endif;?>
        <?foreach($arResult["PRICES"] as $code=>$arPrice):?>
            <th><?=$arPrice["TITLE"]?></th>
        <?endforeach?>
        <?if(count($arResult["PRICES"]) > 0):?>
            <th>&nbsp;</th>
        <?endif?> -->
        <th>№</th>
        <th>Бренд</th>
        <th>Артикул</th>
        <th>Наименование</th>
        <th>Заказ</th>
        <th>Количество</th>
        <th>Цена</th>
        <th>Сумма</th>
        <th>Возврат</th>
    </tr>
    </thead>
    
    <?php 
    # var_dump($arResult); 
    $i=0; foreach($arResult["ITEMS"] as $arElement):?>
    <tr>
        <td>
            <!--<span href="<?=$arElement["DETAIL_PAGE_URL"]?>"><?=$arElement["NAME"]?></span>
            <?if(count($arElement["SECTION"]["PATH"])>0):?>
                <br />
                <?foreach($arElement["SECTION"]["PATH"] as $arPath):?>
                    / <span href="<?=$arPath["SECTION_PAGE_URL"]?>"><?=$arPath["NAME"]?></span>
                <?endforeach?>
            <?endif?>-->
            <?=++$i;?>
        </td>
        <?foreach($arElement["DISPLAY_PROPERTIES"] as $pid=>$arProperty):?>
        <!--<td>
            <?if(is_array($arProperty["DISPLAY_VALUE"]))
                echo implode("&nbsp;/&nbsp;", $arProperty["DISPLAY_VALUE"]);
            elseif($arProperty["DISPLAY_VALUE"] === false)
                echo "&nbsp;";
            else
                echo $arProperty["DISPLAY_VALUE"];?>

        </td>-->
        <?endforeach?>
        <script>
 function  OpenDetailHere(IDn)
  {
     if ($("#heredetail").css("display")=="none" )
     {
     /*$("#td").css("background","#ADC3D5");*/     
     $("#heredetail").css("display","block"); 
     
     params={
         HereDetail:'YES',
         ID:IDn,
           };
     urlQueryAjax = '/personal/order/index.php';
                   $.get(urlQueryAjax, params, function(data)
                   {
                    $('#heredetail').html("");
                    $('#heredetail').html(data);
                   
                   
                   });      
       }
       else
       {
         /*$("#td").css("background","#E0E0E0");*/ 
          $("#heredetail").css("display","none");
          $("#heredetail").html(''); 
       }    
 }

</script>
        <?php 
        $brands = GetAllBrandsNameFromID();
        $brands2 = GetAllBrandsProperties();
        $objTStr = new TemplatedString($arElement['DISPLAY_PROPERTIES']['ICode']['DISPLAY_VALUE']);
        $objTStr->SetTemplate($brands2[$arElement['DISPLAY_PROPERTIES']['BCode']['DISPLAY_VALUE']]);
        $objTStr->SetColor("#000000");
        $objTStr->SetSelection($arElement['DISPLAY_PROPERTIES']['ICode']['DISPLAY_VALUE']);
        echo "<td>&nbsp;".$brands[GetBrandCodeByCHR($arElement['DISPLAY_PROPERTIES']['BCode']['DISPLAY_VALUE'])]."&nbsp;</td>";
        echo "<td>&nbsp;{$objTStr->GetTemplated()}&nbsp;</td>";
        echo "<td>&nbsp;{$arElement['DISPLAY_PROPERTIES']['Caption']['DISPLAY_VALUE']}&nbsp;</td>";
        
                $OrderID=($arElement['DISPLAY_PROPERTIES']['ClentOrderCode']['DISPLAY_VALUE']!="")?"<a href='#' style='color:black;' onclick='OpenDetailHere({$arElement['DISPLAY_PROPERTIES']['ClentOrderCode']['DISPLAY_VALUE']})'>{$arElement['DISPLAY_PROPERTIES']['ClentOrderCode']['DISPLAY_VALUE']}</a>":"" ;
         echo "<td>&nbsp;{$OrderID}&nbsp;</td>";
         
        echo "<td align='right'>&nbsp;{$arElement['DISPLAY_PROPERTIES']['Quantity']['DISPLAY_VALUE']}&nbsp;</td>";
        echo "<td align='right'>&nbsp;".number_format($arElement['DISPLAY_PROPERTIES']['Price']['DISPLAY_VALUE'],2)."&nbsp;</td>";
        echo "<td align='right'>&nbsp;".number_format($arElement['DISPLAY_PROPERTIES']['Summ']['DISPLAY_VALUE'],2)."&nbsp;</td>";
        $a="getShipingInfoByShipingPartID";
       # var_dump($arElement['ID']);
       #var_dump ($a($arElement['ID']));
        #echo " <td align='center'><input type='checkbox'></td> "
        ?>
        <td align='center' id='return_column'>
           <?
            // var_dump($arElement['ID']);
             echo ShowReturnPartStatus($arElement['ID']); 
            ?>
        
        
        </td>
        <?foreach($arResult["PRICES"] as $code=>$arPrice):?>
        <td>
            <?if($arPrice = $arElement["PRICES"][$code]):?>
                <?if($arPrice["DISCOUNT_VALUE"] < $arPrice["VALUE"]):?>
                    <s><?=$arPrice["PRINT_VALUE"]?></s><br /><span class="catalog-price"><?=$arPrice["PRINT_DISCOUNT_VALUE"]?></span>
                <?else:?>
                    <span class="catalog-price"><?=$arPrice["PRINT_VALUE"]?></span>
                <?endif?>
            <?else:?>
                &nbsp;
            <?endif;?>
        </td>
        <?endforeach;?>
        <?if(count($arResult["PRICES"]) > 0):?>
        <td>
            <?if($arElement["CAN_BUY"]):?>
                <noindex>
                <span href="<?echo $arElement["BUY_URL"]?>" rel="nofollow"><?echo GetMessage("CATALOG_BUY")?></span>
                &nbsp;<span href="<?echo $arElement["ADD_URL"]?>" rel="nofollow"><?echo GetMessage("CATALOG_ADD")?></span>
                </noindex>
            <?elseif((count($arResult["PRICES"]) > 0) || is_array($arElement["PRICE_MATRIX"])):?>
                <?=GetMessage("CATALOG_NOT_AVAILABLE")?>
            <?endif?>&nbsp;
        </td>
        <?endif;?>
    </tr>
    <?endforeach;?>
</table>
</div> <!--#table_upload-->
<?if($arParams["DISPLAY_BOTTOM_PAGER"]):?>
    <p><?=$arResult["NAV_STRING"]?></p>
<?endif?>
<br/>
<table  width="200" style="color: black;background: #E0E0E0; border: border:solid  white 1px ;
    border-right:solid 2px #afb0b2;
    border-bottom:solid 2px #afb0b2 ; float:right; padding-left:3px;padding-right:3px;">
    <tr style="border-color: inherit;">
        <td align='right' style="border: 1px solid white;">&nbsp;<b>Сумма</b>&nbsp;</td>
        <td align='right' style="border: 1px solid white;">&nbsp;<b><?php
        echo SaleFormatCurrency($SummITG, $CurrencyCodeITG);
        ?></b>&nbsp;</td>
    </tr>
</table>
</div>
<br>
<br>
<div id="heredetail" style="display: none;">
</div>
<script>
 $(function(){
  $(".returns").live("change",function(){
     // alert("OK") ;
    status="NULL";
    setReturnStatus="setReturnStatus";
    ShowReturnPartStatus="ShowReturnPartStatus";
    ID=$(this).attr("return_id");  
    if ($(this).prop("checked"))
    {
        status=0;
    }
    $.ajax({
      type:"POST",
      url:"/bitrix/components/bitrix/catalog.section/returns_actions.php",
      data:{status:status,action:setReturnStatus,ID:ID},
      cache:false, 
      async:false,
      success: function(data)
      {
          
         alert("w"+data); 
          
      },
      error: function(XMLHttpRequest, textStatus, errorThrown)
      {
          alert(textStatus);
                       
      }     
        
        
    })
      $.ajax({  
         type:"POST",
         url:"/bitrix/components/bitrix/catalog.section/returns_actions.php",
         data:{action:ShowReturnPartStatus,ID:ID},
         cache:false, 
         async:false, 
          success: function(data)
          {
              
             alert(data); 
             $("#return_column").html(data);
              
          },
          error: function(XMLHttpRequest, textStatus, errorThrown)
          {
              alert(textStatus);
                           
          }      
          
          
          
          
      })
    
    
    alert("stop"); 
      
  })   
     
     
     
     
     
     
     
     
 })


</script>
