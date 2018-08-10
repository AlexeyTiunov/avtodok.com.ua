<?
#error_reporting(E_ALL ^ E_NOTICE);
  class ReceiveOrderForString
  {
      private $OrderString; 
      private $arResultArray;
     function __construct($OrderID,$userid)      
      {
          
          #$_GET["OrderString"]="YES";
         # $_GET["ID"]=$orderID;
          #require($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');
          #include ($_SERVER['DOCUMENT_ROOT']."/personal/order/index.php"); 
          #require_once($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php'); 
          #global $USER; 
          $userID=$userid;
          $NoTemplate="YES";
          $arParams=array(
            "CACHE_TYPE" => "A",
            "CACHE_TIME" => "86400",
            "arrCURRENCY_FROM" => array(
                0 => "USD",
                1 => "EUR",
            ),
            "CURRENCY_BASE" => "UAH",
            "RATE_DAY" => "",
            "SHOW_CB" => "N"
            );
          require($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/bitrix/currency.rates/component.php"); 
          global $rateCurrency;  
          $arParams=Array(
        "PATH_TO_LIST" => "order_list.php",
        "PATH_TO_CANCEL" => "order_cancel.php",
        "PATH_TO_PAYMENT" => "payment.php",
        "ID" => $OrderID,
        "CACHE_TYPE" => "A",
        "CACHE_TIME" => "3600",
        "CACHE_GROUPS" => "Y",
        "SET_TITLE" => "Y",
        "ACTIVE_DATE_FORMAT" => "d.m.Y",
        "PREVIEW_PICTURE_WIDTH" => "110",
        "PREVIEW_PICTURE_HEIGHT" => "110",        
        "RESAMPLE_TYPE" => "1",
        "CUSTOM_SELECT_PROPS" => array(),
        "PROP_1" => Array(),
        "PROP_2" => Array()
    );
     require($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/bitrix/sale.personal.order.detail/component_mail.php");
          
          
      global $arr;          
     
      $this->arResultArray=$arr;  
      $this->MakeOrderHTMLStringFromArray();           
          
      }
      
   public function RecieveOrderText()   
   {
       return $this->OrderString;
   }
   
      
   private function  MakeOrderHTMLStringFromArray()
   {
        global $DB;
        ob_start();
        $arResult=$this->arResultArray;
        require($_SERVER["DOCUMENT_ROOT"]."/bitrix/templates/avtodok/components/bitrix/sale.personal.order.detail/detail/template.php") ;
            
        $Ccontents = ob_get_contents();
        ob_end_clean(); 
        ob_end_flush() ; 
        $parrten="/(\<script\>)(.*)(\<\/script\>)/ms";
        $Ccontents=preg_replace($parrten,"",$Ccontents); 
        $ContentsArrayString=explode("\n",$Ccontents);
        $ContentsMD="";
        foreach($ContentsArrayString as $String)
        {
             $StringM=$String;
             
             if (preg_match("/\<table.*\>/",$String))
             {
               $table="table style='width: 100%;
                       font-size: 12px;
                       color: black;
                       background:#E0E0E0;  
                      border: 2px solid black;
                      font-size:13pt;'
        ";    
              $StringM=str_replace("table",$table,$StringM);   
             }
             
             if (preg_match("/\<td.*id=\"OrderStatus\".*\>/i",$StringM))
             {
                  $StringM=preg_replace("/(\<td)(.*)(id=\"OrderStatus\".*)(style=)\"(.*)\"(\>)/","$1$2$3$4\"$5 border:solid 1px black; font-weight:bold;\" $6",$StringM);
                 
             }
             else
             {
                  if (preg_match("/\<td\>/",$StringM))
                  {
                    $StringM=preg_replace("/(\<td)(\>)/","$1 style=\"border:solid 1px black;\" $2 ",$StringM);   
                  }elseif  (preg_match("/\<td.*\>/",$StringM))
                  {
                  $StringM=preg_replace("/(\<td)(.*?\>)/is","$1 style=\"border:solid 1px black;\" $2 ",$StringM);
                  }
             }
              
           $ContentsMD.=$StringM."\n"; 
        }

      $this->OrderString=$ContentsMD; 
   }   
      
      
  }  
    
    
    
    
?>