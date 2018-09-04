<?
 require_once ($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');
 
?><?$APPLICATION->IncludeComponent(
    "bitrix:main.profile",
    "",
    Array(
        "SET_TITLE" => "Y", 
    )
);?>