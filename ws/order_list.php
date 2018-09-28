<?
error_reporting(E_ALL);
  ini_set("display_errors","1");
require_once ($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');

if (!$USER->IsAuthorized())
{
   
}

$APPLICATION->IncludeComponent("bitrix:sale.personal.order", "template2", Array(
    "SEF_MODE" => "N",    // Включить поддержку ЧПУ
    "ORDERS_PER_PAGE" => "50",    // Количество заказов на одной странице
    "PATH_TO_PAYMENT" => "/personal/order/payment/",    // Страница подключения платежной системы
    "PATH_TO_BASKET" => "/personal/cart/",    // Страница с корзиной
    "SET_TITLE" => "Y",    // Устанавливать заголовок страницы
    ),
    false
);



?>