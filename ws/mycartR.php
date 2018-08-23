<?
global $USER ;
global $DB;
$errorArray=Array();
 function UpdateCondConfirm($USERID,$value)
 {
         global $DB;
         $sql="UPDATE  `b_user` SET CondConfirm=".$value." WHERE ID='".$USERID."'";
         $result = $DB->Query( $sql );   
         #return true;
        
 }
#require($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php'); 
if (isset ($_POST['NewRegister']) && $_POST['NewRegister']=="YES") 
{
  require($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php'); 
   #global $USER; 
   /** remove email registration **/
 # $NewLogin=(preg_match("/.*[\@]{1}.+[\.]{1}.*/",$_POST["MailLogin"])==true)?$_POST["MailLogin"]:false; 
    /** remove email registration end **/ 
  $NewLogin=false;
  if ($NewLogin==false)
  {
     $NewLogin=(preg_match("/38[0-9]{3}[0-9]{5,}/",$_POST["MailLogin"])==true)?$_POST["MailLogin"]:false; 
   # var_dump($NewLogin);    
     $NewEmail= ($NewLogin!=false)? "".$NewLogin."@".$NewLogin.".com.ua":false; 
     #var_dump($NewEmail);
  } else
  {
   $NewEmail=$NewLogin;   
  }
 # $NewEmail= (Strlen($_POST["Mail"])>0)?$_POST["Mail"]:false ;  
  $NewName=(Strlen($_POST["Name"])>0)?$_POST["Name"]:false ;
  $NewSirName= (Strlen( $_POST["SirName"])>0)?$_POST["SirName"]:false ;
  /** remove email registration **/    
  #$NewPhone=(strlen($_POST['PhoneCode'])==3 && strlen($_POST['PhoneNumber'])>0 && preg_match("/[0-9]{5,}/",$_POST['PhoneNumber'])==true)?"38".$_POST['PhoneCode'].$_POST['PhoneNumber']:false;
    /** remove email registration end **/ 
  $NewCity=(Strlen($_POST["City"])>0)?$_POST["City"]:false;
 
 // if ($NewEmail==false)$errorArray['NewMail']="Не точный Email." ; 
  //if ($NewLogin==false)$errorArray['NewLogin']="Не верный логин. Только ваш Email или моб.телефон." ;
  if ($NewLogin==false)$errorArray['NewLogin']="Введенный логин {$_POST["MailLogin"]} не корректный. Введите правильно свой логин (номер мобильного или email) согласно правилу.<br> 
                                                 38050XXXXXXX" ; 
  if ($NewName===false) $errorArray['NewName']="Заполните ваше имя;" ;
  if ($NewSirName===false) $errorArray['NewSirName']="Заполните вашу фамилию";
   /** remove email registration  **/ 
 # if ($NewPhone==False) $errorArray['NewPhone']="Заполните правильно ваш номер мобильного телефона";
  /** remove email registration end **/ 
  if ($NewCity==false)  $errorArray['NewCity']="Заполните поле Город";
  if (count ($errorArray)>0)
  {
      
  } else
  {
  $NewPassWord=substr(md5($_POST["MailLogin"]),0,8);
  #echo $NewPassWord; 
  $Captcha= $_POST["captcha"];
  $CaptchaSid=$_POST["captcha_sid"];
  COption::SetOptionString("main","new_user_registration_email_confirmation","N");  
  $arResult=$USER->Register($NewLogin,$NewName,$NewSirName,$NewPassWord,$NewPassWord,$NewEmail,false,$Captcha,$CaptchaSid);
 # ShowMessage($arResult);
  COption::SetOptionString("main","new_user_registration_email_confirmation","Y");
  }
   /*ID
   MONTH_TURNOVER
   BUYER_TYPE
   BISNESS_TYPE
   USER_HOST
   1C_CHECK_CREATE
   STREET
   HOUSE
   PHONECODE
   PHONE */
  if ($USER->IsAuthorized())
  {
      $fields=array(
      "PERSONAL_CITY"=>$NewCity
      );
      $updateUser= new CUser;
      $updateUser->Update($USER->GetID(),$fields);
      UpdateCondConfirm($USER->GetID(),1);
      
      $MailFields['USER_ID']=$USER->GetID();
      $MailFields['BISSNESS_TYPE']="Покупаю на свой автомобиль";
      $MailFields['NAME']=$NewName;
      $MailFields['LAST_NAME']=$NewSirName;
      $MailFields['LOGIN']= $NewLogin;
      $MailFields['PASSWORD']=$NewPassWord;
      $MailFields['EMAIL']=($NewEmail==$NewLogin)?$NewEmail:"";            
      $event =new CEvent;
     # $event->SendImmediate("NEW_USER","s1",$MailFields);
     $sql="INSERT INTO b_user_extrainfo (ID,MONTH_TURNOVER,BUYER_TYPE,BISNESS_TYPE,USER_HOST,1C_CHECK_CREATE,STREET,HOUSE,PHONECODE,PHONE)
    VALUES ({$USER->GetID()},'onebuyR','myavto#','myavto','{$_SERVER['REMOTE_ADDR']}',0,'#FutureIN# ','#FutureIN#','{$_POST['PhoneCode']}','{$_POST['PhoneNumber']}')
     ";
    # echo $sql;
     $result=$DB->Query($sql);
     if ($result->AffectedRowsCount()>0)
     {
          
            if ($MailFields['EMAIL']=="")
          {
            require_once('./Alphasmsclient.class.php'); 
            $sms = new SMSclient('380508124053', 'T26071980', '7d16cab2c8640c4c11b93d5e122c3a75eabfd9f8');
            $SmsText="Уважаемый(ая) {$NewName}. Вы успешно прошли регистрацию на сайте avtodok.com.ua. Ваш Логин {$MailFields['LOGIN']}. Ваш Пароль {$MailFields['PASSWORD']}."; 
               
                      
            $idSMS = $sms->sendSMS('Avtodok', $NewLogin, $SmsText);      
          }
          else 
          { 
            require_once('./Alphasmsclient.class.php'); 
            $sms = new SMSclient('380508124053', 'T26071980', '7d16cab2c8640c4c11b93d5e122c3a75eabfd9f8');
             $SmsText="Уважаемый(ая) {$NewName}. Вы успешно прошли регистрацию на сайте avtodok.com.ua. Ваш Логин {$MailFields['LOGIN']}. Ваш Пароль {$MailFields['PASSWORD']}."; 
            $id = $sms->sendSMS('Avtodok', $NewPhone, $SmsText);          
                         
           $event->SendImmediate("NEW_USER","s1",$MailFields);           
          } 
           $MailFields['EMAIL']="prokhorov.max@ukr.net";
           $MailFields['PASSWORD']="";          
           $event->SendImmediate("NEW_USER","s1",$MailFields);
          
           $MailFields['EMAIL']="alexeytiunov@inbox.ru"; 
           if($sms->hasErrors()) 
           {
             $MailFields['COMMENTS']=$sms->getErrors();  
           } 
           else
           {
              $MailFields['COMMENTS']="SMS ID -".$idSMS; 
           }          
           $event->SendImmediate("NEW_USER","s1",$MailFields); 
           $MailFields['PASSWORD']=$NewPassWord;
           $MailFields['EMAIL']=$NewLogin;
           
     } else
     {
             $errorArray["AffectedRow"]=0;
     }
      
      
  }
     
    
}
#
if (isset ($_POST['NewRegister']) && $_POST['NewRegister']=="NO") 
{
    require($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');
  $Login=(preg_match("/.*[\@]{1}.+[\.]{1}.*/",$_POST["MailLogin"])==true)?$_POST["MailLogin"]:false; 
  $PassWord=(strlen($_POST['Password'])>0)?$_POST['Password']:false; 
  if ($Login==false)
  {$errorArray['Login']="Внимание!!! Вы заказывайте по розничной цене. Ваш тип пользователя подразумевает возможные скидки.
   Очистите корзину,пройдите авторизацию, перезакажите товар.
  "  ;
  }else
  {   
      if (!is_object($USER)) $USER = new CUser;
      $arResult=$USER->Login($Login,$PassWord);
  }
    
}
if  (is_object($USER) && $USER->IsAuthorized() && count($errorArray)==0)
{
      if(!isset($_REQUEST["DELIVERY"]))
      {
          $_REQUEST["DELIVERY"]="N";
      }
       if ( isSet($_REQUEST["BasketOrder"]) )
      {
          if (isSet($_REQUEST["PAYS"]) && $_REQUEST["PAYS"]=='Y' )
          {
  	      header("Location: process_order.php?PAYS=Y&DELIVERY={$_REQUEST["DELIVERY"]}");
          }elseif (isSet($_REQUEST["PAYS"]) && $_REQUEST["PAYS"]=='N' )
          {
             header("Location: process_order.php?PAYS=N&DELIVERY={$_REQUEST["DELIVERY"]}");
           
          }
      } 
} 

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/php_interface/include/autodoc_globals.php");
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/sale/general/export.autodoc.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/autodoc/includes/autodoc_templaytor.php");


$APPLICATION->SetTitle("Корзина");

 Global $USER;
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
# global $DB;
 $checkChangeQuantity=true;     
#var_dump ($errorArray); 

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
<style>
#AuthR td {
    
    
      padding: 5px;
         }
</style>
<!-- Google Code for &#1056;&#1072;&#1076;&#1080;&#1072;&#1090;&#1086;&#1088; -&#1085;&#1072;&#1078;&#1072;&#1083; &#1082;&#1085;&#1086;&#1087;&#1082;&#1091; &#1082;&#1091;&#1087;&#1080;&#1090;&#1100; Conversion Page -->
<script type="text/javascript">
/* <![CDATA[ */
var google_conversion_id = 922186473;
var google_conversion_language = "en";
var google_conversion_format = "3";
var google_conversion_color = "ffffff";
var google_conversion_label = "dptbCK3_-WQQ6eXdtwM";
var google_remarketing_only = false;
/* ]]> */
</script>
<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
</script>
<noscript>
<div style="display:inline;">
<img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/922186473/?label=dptbCK3_-WQQ6eXdtwM&amp;guid=ON&amp;script=0"/>
</div>
</noscript>
<div style=" width:99%; height:50px; "> 
       <img  id="WideSearch" style="width:5%;height:50px;margin-left:10px; margin-top: 10px;" src="/bitrix/templates/avtodok/images/ArrowWideSearchLeft.jpg"> 
      </div>
<form method="post" action="mycartR.php" name="basket_form">
<?
 #if ($check==false) 
 #{ 
  #  echo '<p style="color:red; font-size: 13pt;"> Нет авторизации.</p>' ;
 #}
?>
         <p align="center" style="font-size:15pt; color:Red;"> Быстрый заказ</p>
		<p align="center" style="font-size:12pt; color:Red;">Для того, чтобы начать оформление заказа, заполните нужные поля и  нажмите кнопку "Оформить заказ".</p>
<br><br>

<table width="100%">
	<tr>
		<td width="85%">



<!--<label>Валюта пересчета  <select name="CURRENCY">


<?

		/*	while($lcur_res = $lcur->Fetch())
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

			<input type="submit"  disabled="disabled"   value="Оформить заказ" name="BasketOrder"  id="basketOrderButton1">

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
									<th style='width:40px;'>&nbsp;Срок <br>&nbsp;поставки&nbsp;<br>дней</th>
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
               
               #$DeliveryMethodToUA= GetBasketItemProperty( $arItems["ID"], "DeliveryMethodToUA" );


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
  
  $sql = "SELECT ID_1C FROM b_user WHERE ID='".$UserID."'";

  $res = $DB->Query( $sql );

  if( $ID_1C = $res->Fetch() )
    $ID1C=$ID_1C["ID_1C"];
    
    #$AgreementCaption=str_replace(" ","","ДОГОВОР БЕЗНАЛ ГРН.");
    $sql="SELECT * FROM `b_autodoc_agreements` WHERE ClientCode='{$ID1C}' AND REPLACE(Caption,' ','')='ДОГОВОРБЕЗНАЛГРН.' AND CurrencyCode='UAH' AND Number IS NOT NULL AND Number<>'' LIMIT 1  ";
    $result = $DB->Query( $sql );                                                    //ДОГОВОР БЕЗНАЛ ГРН.
    if ($Aresult=$result->Fetch())
    {
    $selectY="checked='checked'";        
    $selectN="";
    $PayCaption="Оплата по Безналичному расчету";   
    }else
    {
        $selectY="style='display:none;'";
        $selectN="checked='checked'"; 
        $PayCaption="";
    }
    $userTypeDelivery=getUserTypeDelivery($UserID);
    if ($userTypeDelivery==1)
    {
         $delivery="checked='checked'";
         $notdelivery="";
    }elseif($userTypeDelivery==0)
    {
        $notdelivery="checked='checked'";
        $delivery="";
        
    } else
    {
         $notdelivery="checked='checked'";
        $delivery="";
    }
?>
    <td colspan=6> <div style='width:50%;height:auto; border-right: solid 1px black; float:left'> <strong><?=$PayCaption?></strong> &nbsp;  <input type="radio" name="PAYS" <?=$selectY?> value="Y"><br>----------------------------
 <br>&nbsp; <strong>Оплата по Наличному расчету</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="radio" name="PAYS" <?=$selectN?> value="N"> 
 </div>
 <div style='width:45%;height:auto; float: left; '> 
    &nbsp;<strong>Доставка/Отправка</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="radio" id='DELIVERY_Y' name="DELIVERY" <?=$delivery?> value="Y"><br>----------------------------
   <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Самовывоз</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="radio" name="DELIVERY" id='DELIVERY_N' <?=$notdelivery?> value="N">
    
   
 </div>
 </td>
<td align="right">Итого:&nbsp;</td>
<td align="right"><b><?=CurrencyFormat( $userTotal,$userCurrency);?></b>&nbsp;</td>
 
<td align="center" bgcolor=yellow><input name="DELETE" value="Y" onclick="sale_check_all(this.checked)" type="checkbox"><br>Выбрать<br>все</td>
							</tr>

</table>
</div> <!--#table_mycart-->
<br><br>
 <div id="AuthCartR">
   <?
           if(!is_object($USER)) 
           {
           $USER = new CUser ;
            $cookie_login = ${COption::GetOptionString("main", "cookie_name", "BITRIX_SM")."_LOGIN"};
            $cookie_md5pass = ${COption::GetOptionString("main", "cookie_name", "BITRIX_SM")."_UIDH"};
           $USER->LoginByHash($cookie_login, $cookie_md5pass);
           }
           if (!$USER->IsAuthorized())
           {    
               ShowMessage($arResult); 
                if (count($errorArray)>0)
                {
                  foreach ($errorArray as $key=>$error)
                  {
                      echo "<p style='color:red; font-size:15pt;'>".$error."</p><br>"  ;
                  }  
                    
                }
                $arResult["CAPTCHA_CODE"] = htmlspecialchars($APPLICATION->CaptchaGetCode());  
                ?> 
                <table id="AuthR" > 
                <tr><td colspan="2"><p align="center">Для оформления заказа заполните нужные поля.</p> </td></tr>   
                <?
               if (strlen($cookie_login)>0)
               {
                 ?>
                 <tr>
                                                                                                                                            <!--value="<?#=$cookie_login?>"-->
                  <td><p>Ваш Логин (моб.телефон <br> 38050XXXXXXX)</p></td><td><input type="text" id="MailLogin"  name="MailLogin" value="<?=$_POST['MailLogin']?>"></td>
                       <text id="rightLog" style="color:red;"></text> 
                       <input  class="NewRegister" type="hidden" name="NewRegister" value="YES">
                     <td class="PassWord" >Ваш Пароль</td>  <td >  <input  class="PassWord" type="password" name="Password" ></td>
                 </tr>  
                 
                 
                 <? 
                   
                   
               } else
               {
                  
                 ?>
                 <tr>
                  
                  <td><p>Ваш новый Логин (Email или моб.телефон)</p></td><td> <input type="text" id="MailLogin"  name="MailLogin" value="<?=$_POST['MailLogin']?>">
                                                              
                                                             <input type="hidden" class="NewRegister" name="NewRegister" value="YES">
                                                             <input type="hidden" name="NoAuth" value="YES"></td></td> 
                                                             <text id="rightLog" style="color:red;"></text>
                 </tr>            
               <?
               } #<input type="text" id="PhoneCode"  maxlength="3"  size="3" name="PhoneCode">  
                    /* 039 Golden Telecom
                    * 050 МТС
                    * 063 Life (Астелит)
                    * 066 Джинс
                    * 067 Киевстар или Djuice
                    * 068 Beeline / WellCOM / МОБI
                    * 091 Utel
                    * 091 Укртелеком 3 поколение
                    * 092 PEOPLEnet
                    * 093 Life (Астелит)
                    * 094 Интертелеком (CDMA)
                    * 095 МТС или Джинс
                    * 096 Киевстар или Djuice
                    * 097 Киевстар / Djuice / Мобилыч
                    * 098 Киевстар / Djuice / Мобилыч
                    * 099 Экотел(1xx-xx-xx - 6xx-xx-xx) / Джинс  */     
               ?>                           
                <!-- <tr>
                   <td><p>Ваш Email</p></td><td> <input type="text" id="Mail"  name="Mail" value=""> </td>
                 </tr> -->
                <tr >
                  <td ><p>Имя</p></td><td><input class="NewRegInfo" type="text" id="Name"  name="Name" value='<?=$_POST['Name']?>'></td> 
                  
                </tr>  
                 
                <tr>
                  <td><p>Фамилия</p></td><td><input  class="NewRegInfo" type="text" id="SirName"  name="SirName" value='<?=$_POST['SirName']?>'>    </td>       
                </tr> 
                 
             <!--   <tr>
                  <td style="width:100px;"><p>Телефон</p></td><td> 
                 +38( <select name="PhoneCode"  class="NewRegInfo">
                      <option value="0">Код?</option> 
                      <option value="039">039</option>
                       <option value="050">050</option>
                        <option value="066">066</option>
                        <option value="066">063</option>
                         <option value="067">067</option>
                          <option value="068">068</option>
                           <option value="091">091</option>
                            <option value="092">092</option>
                             <option value="093">093</option>
                              <option value="094">094</option>
                               <option value="095">095</option>
                                <option value="096">096</option>
                                 <option value="097">097</option>   
                                  <option value="098">098</option>   
                                   <option value="099">099</option>   
                                  
                  </select> )                      
                   <input class="NewRegInfo" type="text" id="PhoneNumber"  maxlength="7"  size="7" name="PhoneNumber" value="<?=$_POST['PhoneNumber']?>"> 
                   </td>       
                </tr>       -->
                <tr>
                   <td>Город</td>
                   <td><input class="" type="text" id="City"  maxlength="20"  size="20" name="City" value='<?=$_POST['City']?>'></td>  
                </tr>
                <tr> 
                <td>Способ Доставки </td>
                 <td> <select name="Delivery" id='DeliveryKind'  class="NewRegInfo">
                       <option value="1">Самовывоз</option>
                       <option value="2">Новая Почта</option>
                       <option value="3">Гюнсел</option>
                  </select></td>
                </tr>
                <td><p>Введите Код</p></td>
                <input type="hidden" name="captcha_sid" value="<?=$arResult["CAPTCHA_CODE"]?>" /> 
                <td><input class="NewRegInfo" type="text" name="captcha"/><td>
                <td><img src="/bitrix/tools/captcha.php?captcha_sid=<?=$arResult["CAPTCHA_CODE"]?>" width="180" height="40" alt="CAPTCHA" /> <td>
                </tr>   
                <tr>
                <td style="width:150px;"><p style="color: red;"> <?echo($LANGUAGE=="UKR")?"Підтвердіть, що ви <br> ознайомлені з правилами роботи  <br> на сайті </p> <br>":"Подтвердите, что вы <br>ознакомлены с  правилами работы<br> и условиями доставки<br> на сайте</p><br>"?></p><br>
                <a href="/rules/" target="_blank" style="color: red;"><?echo($LANGUAGE=="UKR")?"Правила роботи":"Правила работы"?></a>
                <a href="/docc/index.php" target="_blank" style="color: red;"><?echo($LANGUAGE=="UKR")?"Умови доставки":"Условия доставки"?></a>
                </td> 
                <td><input class="NewRegInfo" type="checkbox" id="Rules"/></td> 
                </tr>
                   
              </table>   
               
            <?
          
          
           }
        ?>  
   </div>
   <script>
    $('Document').ready(function()
    {
        txt = $("#MailLogin").val();
        //alert(txt);
        if(txt.length >= 6)
        {
            var params = {login: $('#MailLogin').val()}
         $.get("/auth/Registration/ajaxRequest.php", params, function(data)
         {
             triggerLogin = Number(data);
             //alert(trigger)
             //if (data == '0') return false;//такого логина нету значит можно оставить
             //else return true;
             
         });
            $.ajax({
               complete: function()
               {
                    if(triggerLogin == 1)
                    {
                        //alert('error');
                        $('#rightLog').show().text('Данный логин уже зарегистрирован в системе! выберите другой');
                           $('#rightLog').css("color","red");
                           $('.NewRegInfo').attr("disabled","disabled");
                           $('.PassWord').css("display","block")
                           $('.NewRegister').val("NO");
                           $('#basketOrderButton2').removeAttr("disabled");
                          /* $('#register_submit_button').attr("disabled","disabled"); 
                           $('#rules').attr("disabled","disabled");  */ 
                    }
                    else
                    {
                        $('#rightLog').show().text('Логин может быть использован.');
                        $('#rightLog').css("color","green");
                         $('.NewRegInfo').removeAttr("disabled","disabled");
                         $('.PassWord').css("display","none");
                         $('.NewRegister').val("YES");
                         $('#basketOrderButton2').attr("disabled","disabled"); 
                       /* $('#register_submit_button').removeAttr("disabled");  
                          $('#rules').removeAttr("disabled");   */
                    }
               }
            });
        }
        else (txt.length < 6)
        {
            $('#rightLog').show().text('Логин должен содержать не менее 6 символов!');
             $('#rightLog').css("color","red");
            /* $('#register_submit_button').attr("disabled","disabled");*/
             $('#rules').attr("disabled","disabled");
             $('.PassWord').css("display","none");
                        $('.NewRegister').val("YES"); 
                        $('#basketOrderButton2').attr("disabled","disabled");  
        }
        
    });
    $('#MailLogin').focusout(function()
    {
        txt = $("#MailLogin").val();
        //alert(txt);
        if(txt.length >= 6)
        {
            var params = {login: $('#MailLogin').val()}
         $.get("/auth/Registration/ajaxRequest.php", params, function(data)
         {
             triggerLogin = Number(data);
             //alert(trigger)
             //if (data == '0') return false;//такого логина нету значит можно оставить
             //else return true;
             
         });
            $.ajax({
               complete: function()
               {
                    if(triggerLogin == 1)
                    {
                        //alert('error');
                        $('#rightLog').show().text('Данный логин уже зарегистрирован в системе! выберите другой, или введите пароль');
                           $('#rightLog').css("color","red");
                           $('.NewRegInfo').attr("disabled","disabled");
                           $('.PassWord').css("display","block") ;
                           $('.NewRegister').val("NO"); 
                           $('#basketOrderButton2').removeAttr("disabled");
                          /* $('#register_submit_button').attr("disabled","disabled"); 
                           $('#rules').attr("disabled","disabled");  */ 
                    }
                    else
                    {
                        $('#rightLog').show().text('Логин может быть использован.');
                        $('#rightLog').css("color","green");
                        $('.NewRegInfo').removeAttr("disabled","disabled");
                        $('.PassWord').css("display","none");
                        $('.NewRegister').val("YES"); 
                        $('#basketOrderButton2').attr("disabled","disabled");
                       /* $('#register_submit_button').removeAttr("disabled");  
                          $('#rules').removeAttr("disabled");   */
                    }
               }
            });
        }
        else (txt.length < 6)
        {
            $('#rightLog').show().text('Логин должен содержать не менее 6 символов!');
             $('#rightLog').css("color","red");
            /* $('#register_submit_button').attr("disabled","disabled");*/
             $('#rules').attr("disabled","disabled");
             $('.PassWord').css("display","none");
                        $('.NewRegister').val("YES"); 
                        $('#basketOrderButton2').attr("disabled","disabled");  
        }
        
    });
    $('#MailLogin').keyup (function()
    {
        txt = $("#MailLogin").val();
        //alert(txt);
        if(txt.length >= 6)
        {
            var params = {login: $('#MailLogin').val()}
         $.get("/auth/Registration/ajaxRequest.php", params, function(data)
         {
             triggerLogin = Number(data);
             //alert(trigger)
             //if (data == '0') return false;//такого логина нету значит можно оставить
             //else return true;
             
         });
            $.ajax({
               complete: function()
               {
                    if(triggerLogin == 1)
                    {
                        //alert('error');
                        $('#rightLog').show().text('Данный логин уже зарегистрирован в системе! выберите другой, или введите пароль');
                           $('#rightLog').css("color","red");
                          $('.NewRegInfo').attr("disabled","disabled");
                          $('.PassWord').css("display","block");
                          $('.NewRegister').val("NO");
                          $('#basketOrderButton2').removeAttr("disabled");  
                          /* $('#register_submit_button').attr("disabled","disabled"); 
                           $('#rules').attr("disabled","disabled");  */ 
                    }
                    else
                    {
                        $('#rightLog').show().text('Логин может быть использован.');
                        $('#rightLog').css("color","green");
                        $('.NewRegInfo').removeAttr("disabled","disabled");
                        $('.PassWord').css("display","none");
                        $('.NewRegister').val("YES"); 
                        $('#basketOrderButton2').attr("disabled","disabled");
                       /* $('#register_submit_button').removeAttr("disabled");  
                          $('#rules').removeAttr("disabled");   */
                    }
               }
            });
        }
        else (txt.length < 6)
        {
            $('#rightLog').show().text('Логин должен содержать не менее 6 символов!');
             $('#rightLog').css("color","red");
            /* $('#register_submit_button').attr("disabled","disabled");*/
             $('#rules').attr("disabled","disabled");
             $('.PassWord').css("display","none");
                        $('.NewRegister').val("YES"); 
                        $('#basketOrderButton2').attr("disabled","disabled");
              
        }
        
    });
    $("#Rules").click(function()
  {
      if( $(this).attr("checked")=="checked")
      {
        $('#basketOrderButton2').removeAttr("disabled");
           
      }
      else
      {
            $('#basketOrderButton2').attr("disabled","disabled");
      }
  });
  
     $("#DeliveryKind").change(function()
     {
        val= $(this).val();
        if (val=="1") 
        {
          /*find(':input[type="radio"]').filter('[name="Delivery"]').filter('[value="N"]').css("checked","checked");
          find(':input[type="radio"]').filter('[name="Delivery"]').filter('[value="Y"]').css("checked","");  */
          $("#DELIVERY_N").attr("checked","checked");
         // $("#DELIVERY_Y").css("checked","");
            
        } else
        {
           /* find(':input[type="radio"]').filter('[name="Delivery"]').filter('[value="Y"]').css("checked","checked");
          find(':input[type="radio"]').filter('[name="Delivery"]').filter('[value="N"]').css("checked","");*/
        //  $("#DELIVERY_N").css("checked","");
          $("#DELIVERY_Y").attr("checked","checked");
            
        }
                                
         
         
     }    
     );
  
   
   </script>
<table width="100%">



 <tr>
		<td width="30%">
			<input type="submit" value="       Обновить       " name="BasketRefresh"><br />
			<small>Нажмите эту кнопку, чтобы пересчитать, удалить или отложить товары.</small><br />
		</td>
		<td align="center" width="40%"><div style="width:100%; display: none;" id="loadProgess"> <img style="margin-left: 5%;" src="/images/loadIcon2.gif"></div></td>
		
       
          <td align="right" width="30%">  
			<input type="submit"      value="Оформить заказ" name="BasketOrder"  id="basketOrderButton2"><br />
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
<script>
 $("#MailLogin").keyup(function(){
        
        phoneNumber=$("#MailLogin").val(); 
      if (phoneNumber!="")
      {
        if  (!phoneNumber.match(/^(38)([0-9]*)/g ) && !phoneNumber.match(/^(3)([0-9]*)/g ) )
        {
           $("#MailLogin").val("38"+phoneNumber); 
        }
      }
       if (phoneNumber.match(/^(39)([0-9]*)/g ) ||
           phoneNumber.match(/^(37)([0-9]*)/g ) ||
           phoneNumber.match(/^(34)([0-9]*)/g ) ||
           phoneNumber.match(/^(35)([0-9]*)/g ) ||
           phoneNumber.match(/^(36)([0-9]*)/g )
       
       )
       {
         shortFoneNumber=phoneNumber.replace(/^(38|39|36|35|34|37)([0-9]*)/g,'38$2'); 
         $("#MailLogin").val(shortFoneNumber); 
        // alert(shortFoneNumber);  
       }
       // shortFoneNumber=phoneNumber.replace(/ ^([\+]*)(38) ([0-9]{3}) ([0-9]{7})/g,'$2$3');
        //alert(shortFoneNumber);
        
    })
</script>
<br>
 <div>

</div>
<?          }
	else 
	{
		echo "<font style='font-weight:bold;'>Корзина пуста</font>";
	}
      }
  $ua = $_SERVER['HTTP_USER_AGENT'];
                if (eregi('Android', $ua) && eregi('Mobile', $ua)) $platform = "Android Phone";
                elseif (eregi('Android', $ua) && !eregi('Mobile', $ua)) $platform = "Android Tablet";
                 elseif (eregi('iPhone', $ua) ) $platform = "iPhone"; 
                 
                   if ($platform != "Android Phone" && $platform != "Android Tablet" && $platform != "iPhone" )  
                   {
                       
                   }   else
                   {
                       ?>
                       <script>
                            $("#WideSearch").trigger("click");
                       
                       </script>
                       <?
                       
                   }  
?>

<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>