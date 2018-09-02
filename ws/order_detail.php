<?                                                                      

require_once($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php'); 
$APPLICATION->IncludeComponent("bitrix:sale.personal.order", "template1", Array(
    "SEF_MODE" => "N",    // Включить поддержку ЧПУ
    "ORDERS_PER_PAGE" => "20",    // Количество заказов на одной странице
    "PATH_TO_PAYMENT" => "/personal/order/payment/",    // Страница подключения платежной системы
    "PATH_TO_BASKET" => "/personal/cart/",    // Страница с корзиной
    "SET_TITLE" => "Y",    // Устанавливать заголовок страницы
    ),
    false
);

?>

