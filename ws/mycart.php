<?
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header("pragma","no-cache");
header("Expires ","-1");
if ( isSet($_REQUEST["BasketOrder"]) )
  {   if(!isset($_REQUEST["DELIVERY"]))
      {
          $_REQUEST["DELIVERY"]="N";
      }
      if (isSet($_REQUEST["PAYS"]) && $_REQUEST["PAYS"]=='Y' )
      {
  	 header("Location: process_order.php?PAYS=Y&DELIVERY={$_REQUEST["DELIVERY"]}");
      }elseif (isSet($_REQUEST["PAYS"]) && $_REQUEST["PAYS"]=='N' )
      {
         header("Location: process_order.php?PAYS=N&DELIVERY={$_REQUEST["DELIVERY"]}");
       
      }else{$check=false;}
  } else {$check=true;}


require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/php_interface/include/autodoc_globals.php");
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/sale/general/export.autodoc.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/autodoc/includes/autodoc_templaytor.php");


$APPLICATION->SetTitle("Корзина");

 Global $USER;
# global $DB;   
function getUserTypeDelivery($userID)
{
    if ($userID==0 || $userID=="" || $userID==null)
    {
        return 0;
    } 
    global $DB;
  $sql="SELECT * FROM b_user WHERE ID={$userID} LIMIT 1"; 
  $result=$DB->Query($sql);
  $arrayUserInfo=$result->fetch();
  if (!isset ($arrayUserInfo["DeliveryType"]) )
  return 0;
  return $arrayUserInfo["DeliveryType"];
    
}
function getDeliveryMethodArray()
{
    $deliveryMethodArray['sea']="30-45 дней 4$ за кг";
    $deliveryMethodArray['air']="8-14 дней 7$ за кг";
    return  $deliveryMethodArray;
}
function getDeliveryMethodToUA($regionCode)
{
    global $DB;     
    $sql="SELECT DESCRIPTION_95 as DeliveryType FROM b_iblock_element_prop_s17 WHERE PROPERTY_92={$regionCode} LIMIT 1";
    $result=$DB->Query($sql);     
    $deliveryObject=$result->Fetch();
    
    if (isset($deliveryObject['DeliveryType']) && $deliveryObject['DeliveryType']!="" )
    {
        return $deliveryObject['DeliveryType'];
    }
    
    return "";
    
}
function showDeliveryMethod($deliveryMethod,$nameCheckedItem,$basketID)
{
     if ($deliveryMethod=="")
     {
         return "";
     }
     $deliveryMethodsArray=explode("#",$deliveryMethod);
     $imagePath = "http://".$_SERVER["SERVER_NAME"]."/personal/order/images/"; 
     $DeliveryMethod=""; 
     $DeliveryMethod.="<div style=''>";
     $DeliveryMethodArray=getDeliveryMethodArray();    
     foreach ($deliveryMethodsArray as $methods)
     {
         $checked="";
       if ($methods==$nameCheckedItem) 
       {
           $checked="checked='checked'";
       } 
       $DeliveryMethod.="<input type='radio' {$checked} class='deliveryMethodToUAChange' id='deliveryMethodToUA_{$basketID}'  name='deliveryMethodToUA_{$basketID}' value='{$methods}'>";
       $DeliveryMethod.="<img src='{$imagePath}method_{$methods}.png' title='{$DeliveryMethodArray[$methods]}' style='width:30px; height:15px;'>";
       
       $DeliveryMethod.="</input><br>"; 
         
         
         
     }
     
     $DeliveryMethod.="<div>";
     return $DeliveryMethod;
}


 $checkChangeQuantity=true;



     if (CModule::IncludeModule("sale")&& CModule::IncludeModule('iblock') )
         {

	       CSaleBasket::Init();

	       $basketUserID = CSaleBasket::GetBasketUserID();

			$lcur = CCurrency::GetList(($b="name"), ($order1="asc"), LANGUAGE_ID);

			if( !isSet( $_REQUEST["CURRENCY"]) )
			  $_REQUEST["CURRENCY"] = "USD";



	       $arBasketItems = array();

			$dbBasketItems = CSaleBasket::GetList(
		        array(
		                "ID" => "ASC"
		            ),
		        array(
		                "FUSER_ID" => $basketUserID,
		                "LID" => SITE_ID,
		                "ORDER_ID" => "NULL"
		            ),
		        false,
		        false,
		        array("ID", "PRODUCT_ID","NAME", "QUANTITY",
		              "CAN_BUY", "PRICE", "NOTES")
		    );



                  //  Если нажата кнопка "Обновить"
			if ( isSet($_REQUEST["BasketRefresh"]) )
			  {

				 while ($arItems2 = $dbBasketItems->Fetch())
				   {
				         // обновляем комментарий
	                  if( $_REQUEST["COMMENT_".$arItems2["ID"]] != $arItems2["NOTES"] )
	                    {
	                       $sql = "UPDATE b_sale_basket ";
				           $sql .= " SET NOTES='".$_REQUEST["COMMENT_".$arItems2["ID"]]."'";
				           $sql .= " WHERE ID='".$arItems2["ID"]."'";
				           $tmpRes = $DB->Query($sql);
	                    }

	                        //  обновляем количсетво
   	                  if( $_REQUEST["QUANTITY_".$arItems2["ID"]] != $arItems2["QUANTITY"] 
                         &&  $_REQUEST["QUANTITY_".$arItems2["ID"]]!=0    )
	                    {
	                       $sql = "UPDATE b_sale_basket ";
				           $sql .= " SET QUANTITY='".abs(intval($_REQUEST["QUANTITY_".$arItems2["ID"]]))."'";
				           $sql .= " WHERE ID='".$arItems2["ID"]."'";
				           $tmpRes = $DB->Query($sql);
                           $checkChangeQuantity=true;
	                    }elseif ($_REQUEST["QUANTITY_".$arItems2["ID"]]==0)
                        {
                            $checkChangeQuantity=false; 
                        }


                            //  удаляем записи
                      if( $_REQUEST["DELETE_".$arItems2["ID"]] == 'Y' )
                        {
                           CSaleBasket::Delete($arItems2["ID"]);
                        }


	               }
			  }


			$dbBasketItems = CSaleBasket::GetList(
		        array(
		                "ID" => "ASC"
		            ),
		        array(
		                "FUSER_ID" => $basketUserID,
		                "LID" => SITE_ID,
		                "ORDER_ID" => "NULL"
		            ),
		        false,
		        false,
		        array("ID", "PRODUCT_ID","NAME", "QUANTITY",
		              "CAN_BUY", "PRICE", "NOTES")
		    );



		    $i = 0;

            $arRegions = GetAllRegionsProperties();
            if( $dbBasketItems->SelectedRowsCount() > 0 )
              {

?>
<script>
 $(document).ready(function(){
     
    $("input.deliveryMethodToUAChange").each(function(){
       //if ($(this).attr("checked")=='checked')
       //{
          $(this).trigger('change');  
       
       
    }) 
     
 })
</script>

<form method="post" action="mycart.php" name="basket_form">
<?
 if ($check==false) 
 { 
     echo '<p style="color:red; font-size: 13pt;"> Укажите вид оплаты. (Наличный или Безналичный) </p>' ;
 }

?>
   
		Для того, чтобы начать оформление заказа, нажмите кнопку "Оформить заказ".
<br><br>

<table width="100%">
	<tr>
		<td width="85%">



<!--<label>Валюта пересчета  <select name="CURRENCY">


<?

        /*    while($lcur_res = $lcur->Fetch())
            {
                $cur = $lcur_res["CURRENCY"];
                $curName = $cur." - ". CCurrencyRates::ConvertCurrency( 1, $cur, "UAH" ) . " грн. ";    // курс
?>
                <option value="<?=$cur;?>" <? if( $_REQUEST["CURRENCY"]== $cur) echo 'selected="selected"'; ?>><?=$curName;?></option>
<?
            } */

?>

</select>
</label>   -->  
		</td>
		<td align="center" width="15%" >
           <a href='export_cart.php' target='_blank'><div id="search_name"><img src='/images/ms-excel.png' border=0><br>Экспортировать <br>в MS Excel</div></a>

		</td>
	</tr>
</table>


<br /><br />
 <?
 
 if ($checkChangeQuantity==false)
 {
     echo '<p style="color:red; font-size: 13pt;">Количество не обновлено. Количество не может быть - 0. Удалите позицию.  Установите галочку удалить и нажмите кнопку Обновить.</p>' ; 
   $checkChangeQuantity=true;
 }
?>
<table width="100%">
	<tr>
		<td width="50%">
			<input type="submit" value="Обновить" name="BasketRefresh">
		</td>
		<td align="right" width="50%">

			<input type="submit" value="Оформить заказ" name="BasketOrder"  id="basketOrderButton1">

		</td>
	</tr>
</table>
<br />
<div id='table_mycart' style="width:100%" >
<table  class="sale_basket_basket data-table" style="width:100%">
<tr>
					<th>&nbsp;Бренд, код, название&nbsp;</th>
									<!--<th style='min-width:30px'>&nbsp;№ заказа по Вашей базе&nbsp;</th> -->
                                   <th style='min-width:30px'>Доставка<br> 
                                                              на тер.<br>
                                                              Украины 
                                                               </th> 
									<th style='width:40px;'>&nbsp;Срок <br>&nbsp;поставки&nbsp;</th>
							<th>&nbsp;Количество&nbsp;</th>
							<th style='min-width:50px;'>&nbsp;Цена&nbsp;</th>
							<th style='min-width:50px;'>&nbsp;Сумма&nbsp;</th>
							<th style='min-width:50px;'>&nbsp;Цена,&nbsp;<br>&nbsp; <?=$_REQUEST["CURRENCY"];?>&nbsp;</th>
							<th style='min-width:50px;'>&nbsp;Сумма,&nbsp;<br>&nbsp;<?=$_REQUEST["CURRENCY"];?>&nbsp;</th>
                              
							<th>&nbsp;Удалить&nbsp;</th>
							</tr>
<?
            $userTotal = 0;

			while ($arItems = $dbBasketItems->Fetch())
			{

               $caption = $arItems["NAME"];
               $comment = $arItems["NOTES"];


               $objTStr = new TemplatedString( GetBasketItemProperty( $arItems["ID"], "ItemCode" ) );

               $brandID = GetBrandCodeByCHR( GetBasketItemProperty( $arItems["ID"], "Brand" ));

       		   $objTStr->SetTemplate( $brandID );
			   $itemCode = $objTStr->GetTemplated();



               $brand = GetBasketItemProperty( $arItems["ID"], "Brand" );
//               $itemCode = GetBasketItemProperty( $arItems["ID"], "ItemCode" );
               $currency = GetBasketItemProperty( $arItems["ID"], "Currency" );
               $regionCode = GetBasketItemProperty( $arItems["ID"], "RegionCode" );
               
               $DeliveryMethodToUA= GetBasketItemProperty( $arItems["ID"], "DeliveryMethodToUA" ); 
               #var_dump($DeliveryMethodToUA);
               $DeliveryMethodSSToUA=getDeliveryMethodToUA($regionCode);
               
               $price = $arItems["PRICE"];
               $sum = $price*$arItems["QUANTITY"];
               $userCurrency = $_REQUEST["CURRENCY"];

               $userPrice = CCurrencyRates::ConvertCurrency( $price, $currency, $userCurrency );
               $userSum = CCurrencyRates::ConvertCurrency( $sum, $currency, $userCurrency );
               $userTotal += $userSum;
?>



<tr>


<tr>
				<td>&nbsp;<?=$brand;?> : <?=$itemCode;?><br><?=$caption;?></td>
				<td align="center">
              <!--  <input maxlength="20" type="text" name="COMMENT_<?#=$arItems["ID"]?>" id="COMMENT_<?#=$i;?>"  size="6" value="<?#=$comment;?>">  -->
                  
                  <?echo showDeliveryMethod($DeliveryMethodSSToUA,$DeliveryMethodToUA,$arItems["ID"]);?>
                </td>
				<td align="center"><input type='text' id='deliveryDays_<?=$arItems["ID"]?>' disabled="disabled" style='background-color:#E0E0E0;border-radius:5px; width:15px; color:black; border:none;' value='<?=$arRegions[$regionCode]["DeliveryDays"];?>'></input></td> 
				<td align="center"><input class="quantity" maxlength="5" type="text" STYLE="text-align:right" name="QUANTITY_<?=$arItems["ID"]?>" value="<?=intVal($arItems["QUANTITY"]);?>" size="3" ></td>
				<td align="right">&nbsp;<?=CurrencyFormat( $price,$currency);?>&nbsp;</td>
				<td align="right">&nbsp;<?=CurrencyFormat( $sum, $currency );?>&nbsp;</td>
				<td align="right">&nbsp;<?=CurrencyFormat( $userPrice,$userCurrency);?>&nbsp;</td>
				<td align="right">&nbsp;<?=CurrencyFormat( $userSum,$userCurrency);?>&nbsp;</td>
                
				<td align="center"><input type="checkbox" name="DELETE_<?=$arItems["ID"]?>" id="DELETE_<?=$i;?>" value="Y"></td>
</tr>

<?
                $i ++;
			}





?>
<script>
	function sale_check_all(val)
	{
		for(i=0;i<=<?=$i;?>;i++)
		{
			if(val)
				document.getElementById('DELETE_'+i).checked = true;
			else
				document.getElementById('DELETE_'+i).checked = false;
		}
	}
	</script>

<tr>
<?
 $UserID=$USER->GetID();
  
  $sql = "SELECT ID_1C , Agreement_1C FROM b_user WHERE ID='".$UserID."'";

  $res = $DB->Query( $sql );

  if( $ID_1C = $res->Fetch() )
    $ID1C=$ID_1C["ID_1C"];
    $Agreement_1C= $ID_1C["Agreement_1C"];
    
  /*  $sql="SELECT * FROM `b_autodoc_agreements`  WHERE ClientCode='{$ID1C}' AND Code='{$Agreement_1C}' LIMIT 1";
    $result = $DB->Query( $sql );
    if ($Aresult=$result->Fetch())  
    {
        if ($Aresult["CurrencyCode"]=="USD")
        {
            $selectY="style='display:none;'";
            $selectN="checked='checked'"; 
            $PayCaption="";
            
        }elseif($Aresult["CurrencyCode"]=="UAH" && str_replace(" ","",$Aresult["Caption"])=="ДОГОВОРБЕЗНАЛГРН." && $Aresult["Number"]!="")
        {
            $selectY="checked='checked'";        
            $selectN="";
            $PayCaption="Оплата по Безналичному расчету"; 
            
        }  else
        {
            $selectY="style='display:none;'";
            $selectN="checked='checked'"; 
            $PayCaption="";
            
        }
        
    }  else
    {
        $selectY="style='display:none;'";
        $selectN="checked='checked'"; 
        $PayCaption="";
        
    }      */
    
    
    
    #$AgreementCaption=str_replace(" ","","ДОГОВОР БЕЗНАЛ ГРН.");
   $sql="SELECT * FROM `b_autodoc_agreements` WHERE ClientCode='{$ID1C}' AND REPLACE(Caption,' ','')='ДОГОВОРБЕЗНАЛГРН.' AND CurrencyCode='UAH' AND Number IS NOT NULL AND Number<>'' LIMIT 1  ";
    $result = $DB->Query( $sql );                                                    //ДОГОВОР БЕЗНАЛ ГРН.
    if ($Aresult=$result->Fetch())
    {
    #$selectY="checked='checked'";  
    $selectY="style='display:inline-block;'";      
    $selectN="";
    $PayCaption="Оплата по БЕЗНАЛИЧНОМУ расчету";   
    }else
    {
        $selectY="style='display:none;'";
        #$selectN="checked='checked'"; 
        $selectN="";  
        $PayCaption="";
    } 
    
    $sql="SELECT * FROM `b_autodoc_agreements`  WHERE ClientCode='{$ID1C}' AND Code='{$Agreement_1C}' LIMIT 1";
    $result = $DB->Query( $sql );
    if ($Aresult=$result->Fetch())  
    {
         if ($Aresult["CurrencyCode"]=="USD")
        {
            $selectY.=""; 
            $selectN.="checked='checked'";
           
            
        }elseif($Aresult["CurrencyCode"]=="UAH" && str_replace(" ","",$Aresult["Caption"])=="ДОГОВОРБЕЗНАЛГРН." && $Aresult["Number"]!="")
        {
            $selectY.=" checked='checked'"; 
            $selectN.="";
            
        }  else
        {
            $selectN.="checked='checked'"; 
            
        }
        
        
        
    }  else
    {
        $selectN.="checked='checked'";  
    }
    
    
     
    $userTypeDelivery=getUserTypeDelivery($UserID);
  #var_dump ($userTypeDelivery);
    if ($userTypeDelivery=="1")
    {
         $delivery="checked='checked'";
         $notdelivery="";
    }elseif($userTypeDelivery=="0")
    {
        $notdelivery="checked='checked'";
        $delivery="";
        
    } else
    {
         $notdelivery="checked='checked'";
        $delivery="";
    }
?>
<td colspan=6 > <div style='width:50%;height:auto; border-right: solid 1px black; float:left'> <strong><?=$PayCaption?></strong>&nbsp;&nbsp;&nbsp;<input type="radio" name="PAYS" <?=$selectY?> value="Y"><br>----------------------------
 <br>&nbsp; <strong>Оплата по НАЛИЧНОМУ расчету</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="radio" name="PAYS" <?=$selectN?> value="N"> 
 </div>
 <div style='width:45%;height:auto; float: left; '> 
    &nbsp;<strong>Доставка/Отправка</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="radio" name="DELIVERY" <?=$delivery?> value="Y"><br>----------------------------
   <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Самовывоз</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="radio" name="DELIVERY" <?=$notdelivery?> value="N">
    
   
 </div>
 </td>
<td align="right">Итого:&nbsp;</td>
<td align="right"><b><?=CurrencyFormat( $userTotal,$userCurrency);?></b>&nbsp;</td>
 
<td align="center" bgcolor=yellow><input name="DELETE" value="Y" onclick="sale_check_all(this.checked)" type="checkbox"><br>Выбрать<br>все</td>
							</tr>

</table>
</div> <!--#table_mycart-->
<br><br>
<table width="100%">



 <tr>
		<td width="30%">
			<input type="submit" value="       Обновить       " name="BasketRefresh"><br />
			<small>Нажмите эту кнопку, чтобы пересчитать, удалить или отложить товары.</small><br />
		</td>
		<td align="center" width="40%"><div style="width:100%; display: none;" id="loadProgess"> <img style="margin-left: 5%;" src="/images/loadIcon.gif"></div></td>
		<td align="right" width="30%">

			<input type="submit" value="Оформить заказ" name="BasketOrder"  id="basketOrderButton2"><br />
			<small>Нажмите эту кнопку, чтобы заказать товары, находящиеся в корзине</small><br />
		</td>
	</tr>

</table>

</form>
<script>
    $("#basketOrderButton2").click(function()
    {
        $("#loadProgess").css("display","block");
        
    }) ;
     $("#basketOrderButton1").click(function()
    {
        $("#loadProgess").css("display","block");
        
    }) ;
</script>
 <script>
   var previousQuantity=0;
   $(".quantity").focus(function(){
        previousQuantity= $(this).val()
       
   }); 
   $(".quantity").change(function()
   {
        if ($(this).val()==0 )
        {
            $(this).val(previousQuantity);
            alert("Количество не может быть -0. Удалите позицию.  Установите галочку удалить и нажмите кнопку Обновить.");
        }
       
   });
</script>
<br>
 <div>
<p>  <strong> Ув. Клиент. Обратите внимание на то , что на странице вашей корзины появилась новая опция - "Оплата по Безналичному расчету".<br>
      Обязательно используйте её ,если вы хотите оплатить ваш заказ по безналичному расчету. </strong>
</p>
</div>

<script>
var USER_ID_MC=<?=$USER->GetID();?> ;
$(function()
{
   //  
       infoText="<div style='font-family:Times New Romans; font-size:20px;' align='center'> Шановний клієнте! <br>Зверніть увагу, що у зв’язку з нестабільною ситуацією<br><span style='color:red'>що до курсу валют</span> в нашій Країні,<br>умови  <span style='color:red'>безготівкової оплати можуть буту змінені</span>.<br> Стосовно детальної  інформації, звертайтесь до вашого особистого менеджера. </div>" ;
      // infoText+="<div  align='center'><input type='button' align='center' value='OK'></input></div>";
       val = $('input:checked').filter("[name=PAYS]").val();
        // alert(USER_ID_MC);            
       if (val=='Y')
       {
           //  fillInfoDiv(infoText,"info_div","Ознайомлений");
           //  showInfoMassage("info_div","info_div_background");
           
       } 
      
        
        
    $('input[name="PAYS"]').click(function() 
     { 
          val = $('input:checked').filter(" [name='PAYS'] ").val();
          // alert(val);            
           if (val=='Y')
           {
              //  fillInfoDiv(infoText,"info_div","Ознайомлений");
             //   showInfoMassage("info_div","info_div_background");
               
           } 
        
       
       
     }  ) ; 
     
     function confirmInfo()
     {
         $.ajax({
           type:"POST",
           url:"/personal/suppload/infoConfirm.php",
           data:{CONFIRM:1,USER_ID:USER_ID_MC},
           cache:false,
           success: function(data){
               
                    
                           }
            
            
            
        });
         
     } 
    
     $("#OK_BUTTON").live("click",function(){
          confirmInfo();
          closeInfoMassage("info_div","info_div_background");
       
     })
   




});
</script>
<?          }
	else 
	{
		echo "<font style='font-weight:bold;'>Корзина пуста</font>";
	}
      }
?>

<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>