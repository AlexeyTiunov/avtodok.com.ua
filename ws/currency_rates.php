<?
  require($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php'); 
    CModule::IncludeModule("sale"); CModule::IncludeModule('iblock');  

$APPLICATION->IncludeComponent("bitrix:currency.rates", "template1", array(
    "CACHE_TYPE" => "A",
    "CACHE_TIME" => "86400",
    "arrCURRENCY_FROM" => array(
        0 => "USD",
        1 => "EUR",
    ),
    "CURRENCY_BASE" => "UAH",
    "RATE_DAY" => "",
    "SHOW_CB" => "N"
    ),
    false
);?>