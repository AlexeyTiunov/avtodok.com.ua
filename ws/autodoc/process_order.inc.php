<?php
    //  Возвращает список уникальных кодов регионов товаров в корзине пользователя
    // либо falseб если корзина пуста или не найдено кодов региона в свойствах товаров в корзине

function GetCartRegionsList( )


{
   global $DB;

   $arRes = Array();

   if ( CModule::IncludeModule("sale") )
     {
       CSaleBasket::Init();

       $sql = "SELECT DISTINCT VALUE FROM b_sale_basket_props ";
       $sql .= " WHERE CODE='RegionCode'";
       $sql .= " AND BASKET_ID IN (";
       $sql .= "SELECT ID FROM b_sale_basket ";
       $sql .= " WHERE ORDER_ID IS NULL ";
       $sql .= " AND FUSER_ID='".CSaleBasket::GetBasketUserID()."'";
       $sql .= " AND LID='".SITE_ID."'";
       $sql .= ")";

       $i = 0;
       $tmpR = $DB->Query($sql);
       while( $ar = $tmpR->Fetch() )
         {
            $arRes[$i]=$ar["VALUE"];
            $i++ ;
         }

       if( isset($arRes))
         return $arRes;
     }
   else
     return false;
}



     //  Устанавливает поле "Can Buy" для всех товаров с заданным ид региона
     // в корзине пользователя в "Y", для товаров из других регионов "Can Buy"
     // ставится в "N"

function SetCanBuyForRegion( $regionID )
{
   global $DB;


   if ( CModule::IncludeModule("sale") )
     {

       CSaleBasket::Init();


          //  Ставим can buy = 'Y' для региона regionID


       $sql = "SELECT BASKET_ID FROM b_sale_basket_props ";
       $sql .= " WHERE CODE='RegionCode'";
       $sql .= " AND VALUE='".IntVal($regionID)."'";
       $sql .= " AND BASKET_ID IN (";
       $sql .= "SELECT ID FROM b_sale_basket ";
       $sql .= " WHERE ORDER_ID IS NULL ";
       $sql .= " AND FUSER_ID='".CSaleBasket::GetBasketUserID()."'";
       $sql .= " AND LID='".SITE_ID."'";
       $sql .= ")";

       $tmpR = $DB->Query($sql);
       while( $ar = $tmpR->Fetch() )
         {
            $sql = "UPDATE b_sale_basket";
            $sql .= " SET CAN_BUY='Y'";
            $sql .= " WHERE ID='".$ar["BASKET_ID"]."'";

            $tmpR2 = $DB->Query($sql);


         }


          //  Ставим can buy = 'N' для остальных регионов


       $sql = "SELECT BASKET_ID FROM b_sale_basket_props ";
       $sql .= " WHERE CODE='RegionCode'";
       $sql .= " AND VALUE <> '".IntVal($regionID)."'";
       $sql .= " AND BASKET_ID IN (";
       $sql .= "SELECT ID FROM b_sale_basket ";
       $sql .= " WHERE ORDER_ID IS NULL ";
       $sql .= " AND FUSER_ID='".CSaleBasket::GetBasketUserID()."'";
       $sql .= " AND LID='".SITE_ID."'";
       $sql .= ")";

       $tmpR = $DB->Query($sql);
       while( $ar = $tmpR->Fetch() )
         {
            $sql = "UPDATE b_sale_basket";
            $sql .= " SET CAN_BUY='N'" ;
            $sql .= " WHERE ID='".$ar["BASKET_ID"]."'";

            $tmpR2 = $DB->Query($sql);
         }
     }
}

         //  возвращает валюту, в которой сделан заказ для заданного региона

function GetCurrencyForRegion( $regionID )
{
      global $DB;


   if ( CModule::IncludeModule("sale") )
     {

       CSaleBasket::Init();


          //  Ставим can buy = 'Y' для региона regionID


       $sql = "SELECT BASKET_ID FROM b_sale_basket_props ";
       $sql .= " WHERE CODE='RegionCode'";
       $sql .= " AND VALUE='".IntVal($regionID)."'";
       $sql .= " AND BASKET_ID IN (";
       $sql .= "SELECT ID FROM b_sale_basket ";
       $sql .= " WHERE ORDER_ID IS NULL ";
       $sql .= " AND FUSER_ID='".CSaleBasket::GetBasketUserID()."'";
       $sql .= " AND LID='".SITE_ID."'";
       $sql .= ") LIMIT 1";

       $tmpR = $DB->Query($sql);
       $ar = $tmpR->Fetch();

       $basketID = $ar["BASKET_ID"];


       $sql = "SELECT VALUE FROM b_sale_basket_props ";
       $sql .= " WHERE BASKET_ID='".$basketID."'";
       $sql .= " AND CODE='Currency'";

       $res = '';
       $rRes = $DB->Query($sql);
       if( $arRes = $rRes->Fetch())
         $res = $arRes["VALUE"] ;

       return $res;

     }


}

      //  Возвращает сумму заказа ( для всех товаров в корзине данного пользователя с CAN_BUY='Y' )
function GetOrderSum()
{
      global $DB;


   if ( CModule::IncludeModule("sale") )
     {

       CSaleBasket::Init();


       $sum = 0;

       $sql .= "SELECT SUM( QUANTITY * PRICE ) as sum FROM b_sale_basket ";
       $sql .= " WHERE ORDER_ID IS NULL ";
       $sql .= " AND FUSER_ID='".CSaleBasket::GetBasketUserID()."'";
       $sql .= " AND CAN_BUY='Y' ";
       $sql .= " AND LID='".SITE_ID."'";

       $tmpR = $DB->Query($sql);
       if ($ar = $tmpR->Fetch() )
          $sum = $ar["sum"];

       return $sum;

     }


}


?>