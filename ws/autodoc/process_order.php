<?
    /* Обрабатываем заказ (товары - из корзины текущего покупателя)
    */

//require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
require_once ($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');  
require("process_order.inc.php");
define("STOP_STATISTICS", true);  // отключаем сбор статистики

 $_GET["DELIVERY"]=$_POST["DELIVERY"];
 $_GET["PAYS"]=$_POST["PAYS"];

       if (CModule::IncludeModule("sale"))
         {
                   //  если не добавка комментария к заказам, а добавление заказов
            if( !isSet( $_REQUEST["AddComments"] ) )
              {
                   $delivery=preg_replace("/[^A-Za-z]/","",$_GET["DELIVERY"]);
                   $arRegions = GetCartRegionsList( );
                   CSaleBasket::Init();
        
                           //  добавляем для каждого региона товаров в корзине по отдельному заказу
                   for ( $i = 0; $i < count( $arRegions ); $i++)
                     {

                       $sum = 0;
                       $currency = "";
                               // оставляем включенными только товары из данного региона
                       SetCanBuyForRegion( $arRegions[ $i ] );

                       $currency = GetCurrencyForRegion( $arRegions[ $i ] ) ;
                       $sum = GetOrderSum();
                       # if (  $_REQUEST["PAYS"] )
                       $arFields = array(
                           "LID" => SITE_ID,
                           "PERSON_TYPE_ID" => 1,
                           "PAYED" => "N",
                           "CANCELED" => "N",
                           "STATUS_ID" => "N",
                           "PRICE" => $sum,
                           "CURRENCY" => $currency,
                           "USER_ID" => IntVal($USER->GetID()),
                           "PAY_SYSTEM_ID" => ($_GET["PAYS"]==='Y')? 7:1,
                           "ALLOW_DELIVERY"=> ($delivery),
                           "TAX_VALUE" => 0.0,
                           "USER_DESCRIPTION" => "",
                           "REGION_CODE"  => $arRegions[ $i ]
                            );



                       $ORDER_ID = CSaleOrder::Add($arFields);
                       CSaleBasket::OrderBasket($ORDER_ID, $_SESSION["SALE_USER_ID"], SITE_ID);
                       $massagesArray[$ORDER_ID]["REGION"]=$arRegions[ $i ];  
                       #$massagesArray[$ORDER_ID][]="Для товаров с регионом поставки {$arRegions[ $i ]} создан заказ № {$ORDER_ID = IntVal($ORDER_ID)}";
                      # $massagesArray[$ORDER_ID][]="Вы можете добавить комментарий к заказу № &nbsp;&nbsp;{$ORDER_ID}";
                       
                       #<p><textarea id="COMMENT_ <?#=$i; >" name="COMMENT_<?#=$i;>" rows="5" cols="30"></textarea></p>  
      
                      
                     }
                  $massagesArray["NUM_ORDERS"]=count( $arRegions );
                  
              }
            else
              {
                   //  Добавляем комментарии к заказам
                  for( $i=0; $i < intval($_REQUEST["NUM_ORDERS"]); $i++ )
                    {
                       $orderID = $_REQUEST["ORDER_".$i];

                       $sql = "UPDATE b_sale_order";
                       $sql .= " SET COMMENTS='".htmlspecialchars($_REQUEST["COMMENT_".$i])."'" ;
                       $sql .= " WHERE ID='".$orderID."'";
                       $sql .= " AND USER_ID='".IntVal($USER->GetID())."'";
                       $tmpRes = $DB->Query($sql);

                       echo "<br> Комментарий к заказу № <b>".$orderID."</b> добавлен.";

                    }

                   echo "<p>&nbsp;</p><a href='/autodoc/search.php'>Вернуться к поиску</a>";
              }


           echo (json_encode($massagesArray,JSON_UNESCAPED_UNICODE));
         }



?>
