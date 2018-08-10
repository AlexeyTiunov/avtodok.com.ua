<?
    if (!isset($_POST['AUTH_FORM']))
    {
     require($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');
        $APPLICATION->IncludeComponent("bitrix:system.auth.form", "template1", array(
         "REGISTER_URL" => "/personal/profile/index.php",
         "PROFILE_URL" => "/personal/profile/",
         "SHOW_ERRORS" => "N"
         ),
    false
           );
    } 
    else 
    {
          if (isset ($_GET['Code']) &&  $_GET['Code']=="2")
            {
             require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php"); 
           require($_SERVER["DOCUMENT_ROOT"]."/personal/order/index.php");  
           require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");   
            }
            elseif (isset ($_GET['Code']) &&  $_GET['Code']=="3")
            {
             require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php"); 
           require($_SERVER["DOCUMENT_ROOT"]."/personal/cabinet/Payment/indexnew.php");  
           require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");   
            }
            elseif (isset ($_GET['Code']) &&  $_GET['Code']=="4")
            {
             require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php"); 
           require($_SERVER["DOCUMENT_ROOT"]."/personal/privatbank/privat24.php");  
           require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");   
            }
            elseif (isset ($_GET['Code']) &&  $_GET['Code']=="5")
            {
             require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php"); 
           require($_SERVER["DOCUMENT_ROOT"]."/personal/privatbank/liqpay.php");  
           require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");   
            }
   require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php"); 
    require($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/searchnew.php");  
   require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");
    }
    
    
?>