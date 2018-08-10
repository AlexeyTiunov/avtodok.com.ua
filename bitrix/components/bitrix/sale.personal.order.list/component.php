<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/sale/general/export.autodoc.php");

if (!CModule::IncludeModule("sale"))
{
	ShowError(GetMessage("SALE_MODULE_NOT_INSTALL"));
	return;
}
if (!$USER->IsAuthorized())
{
	$APPLICATION->AuthForm(GetMessage("SALE_ACCESS_DENIED"));
}

$arParams["PATH_TO_DETAIL"] = Trim($arParams["PATH_TO_DETAIL"]);
if (strlen($arParams["PATH_TO_DETAIL"]) <= 0)
	$arParams["PATH_TO_DETAIL"] = htmlspecialchars($APPLICATION->GetCurPage()."?"."ID=#ID#");

$arParams["PATH_TO_COPY"] = Trim($arParams["PATH_TO_COPY"]);
if (strlen($arParams["PATH_TO_COPY"]) <= 0)
	$arParams["PATH_TO_COPY"] = htmlspecialchars($APPLICATION->GetCurPage()."?"."ID=#ID#");

$arParams["PATH_TO_CANCEL"] = Trim($arParams["PATH_TO_CANCEL"]);
if (strlen($arParams["PATH_TO_CANCEL"]) <= 0)
	$arParams["PATH_TO_CANCEL"] = htmlspecialchars($APPLICATION->GetCurPage()."?"."ID=#ID#");

$arParams["PATH_TO_BASKET"] = Trim($arParams["PATH_TO_BASKET"]);
if (strlen($arParams["PATH_TO_BASKET"]) <= 0)
	$arParams["PATH_TO_BASKET"] = "basket.php";

$arParams["PATH_TO_COPY"] .= (strpos($arParams["PATH_TO_COPY"], "?") === false ? "?" : "&amp;");
$arParams["PATH_TO_CANCEL"] .= (strpos($arParams["PATH_TO_CANCEL"], "?") === false ? "?" : "&amp;");

if($arParams["SET_TITLE"] == 'Y')
	$APPLICATION->SetTitle(GetMessage("SPOL_DEFAULT_TITLE"));
if($arParams["SAVE_IN_SESSION"] != "N")
	$arParams["SAVE_IN_SESSION"] = "Y";

$arParams["NAV_TEMPLATE"] = (strlen($arParams["NAV_TEMPLATE"])>0 ? $arParams["NAV_TEMPLATE"] : "");

$arParams["ORDERS_PER_PAGE"] = (intval($arParams["ORDERS_PER_PAGE"]) <= 0 ? 20 : intval($arParams["ORDERS_PER_PAGE"]));

//Copy order
$ID = IntVal($arParams["ID"]);
if ($ID > 0 && $_REQUEST["COPY_ORDER"] == "Y")
{
	$dbOrder = CSaleOrder::GetList(Array("ID"=>"DESC"), Array("ID"=>$ID, "USER_ID"=>IntVal($USER->GetID()), "LID" => SITE_ID));
	if ($arOrder = $dbOrder->Fetch())
	{
		$dbBasket = CSaleBasket::GetList(Array("ID"=>"ASC"), Array("ORDER_ID"=>$arOrder["ID"]));
		while ($arBasket = $dbBasket->Fetch())
		{
			$arFields=Array();
			$arProps = array();
			$dbBasketProps = CSaleBasket::GetPropsList(
					array("SORT" => "ASC"),
					array("BASKET_ID" => $arBasket["ID"]),
					false,
					false,
					array("ID", "BASKET_ID", "NAME", "VALUE", "CODE", "SORT")
			);

			if ($arBasketProps = $dbBasketProps->Fetch())
			{
				do
				{
					$arProps[] = array(
						"NAME" => $arBasketProps["NAME"],
						"CODE" => $arBasketProps["CODE"],
						"VALUE" => $arBasketProps["VALUE"]
					);
				}
				while ($arBasketProps = $dbBasketProps->Fetch());
			}

			$arFields = array(
				"PRODUCT_ID"			=> $arBasket["PRODUCT_ID"],
				"PRODUCT_PRICE_ID"		=> $arBasket["PRODUCT_PRICE_ID"],
				"PRICE"					=> $arBasket["PRICE"],
				"CURRENCY"				=> $arBasket["CURRENCY"],
				"WEIGHT"				=> $arBasket["WEIGHT"],
				"QUANTITY"				=> $arBasket["QUANTITY"],
				"LID"					=> $arBasket["LID"],
				"DELAY"					=> "N",
				"CAN_BUY"				=> "Y",
				"NAME"					=> $arBasket["NAME"],
				"CALLBACK_FUNC"			=> $arBasket["CALLBACK_FUNC"],
				"MODULE"				=> $arBasket["MODULE"],
				"NOTES"					=> $arBasket["NOTES"],
				"ORDER_CALLBACK_FUNC"	=> $arBasket["ORDER_CALLBACK_FUNC"],
				"DETAIL_PAGE_URL"		=> $arBasket["DETAIL_PAGE_URL"],
				"CATALOG_XML_ID" 		=> $arBasket["CATALOG_XML_ID"],
				"PRODUCT_XML_ID" 		=> $arBasket["PRODUCT_XML_ID"],
				"PROPS"					=> $arProps,
				);

			CSaleBasket::Add($arFields);
		}
		LocalRedirect($arParams["PATH_TO_BASKET"]);
	}
}

//Save statuses for Filter form
$dbStatus = CSaleStatus::GetList(Array("SORT"=>"ASC"), array("LID"=>LANGUAGE_ID));
while ($arStatus = $dbStatus->GetNext())
{
   #  if ($arStatus["ID"]==0 ||$arStatus["ID"]==1 || $arStatus["ID"]==5 || $arStatus["ID"]==6 ) continue;  

	$arResult["INFO"]["STATUS"][$arStatus["ID"]] = $arStatus;
   # $arResult["INFO"]["ITEMSTATUS"][$arStatus["ID"]]=$arStatus["NAME"];
}    
   #$arResult["INFO"]["ITEMSTATUS"][0]="В работе";
   $arResult["INFO"]["ITEMSTATUS"][0]="Активный";
   # $arResult["INFO"]["ITEMSTATUS"][1]="Выкуплен";
    $arResult["INFO"]["ITEMSTATUS"][2]="Отказ";
    $arResult["INFO"]["ITEMSTATUS"][3]="Склад";
    $arResult["INFO"]["ITEMSTATUS"][4]="Отгружен";
   # $arResult["INFO"]["ITEMSTATUS"][5]="В пути";
  #  $arResult["INFO"]["ITEMSTATUS"][6]="СкладДонецк";
    $arResult["INFO"]["ITEMSTATUS"][7]="Отложено"; 

$dbPaySystem = CSalePaySystem::GetList(Array("SORT"=>"ASC"));
while ($arPaySystem = $dbPaySystem->GetNext())
	$arResult["INFO"]["PAY_SYSTEM"][$arPaySystem["ID"]] = $arPaySystem;

$dbDelivery = CSaleDelivery::GetList(Array("SORT"=>"ASC"));
while ($arDelivery = $dbDelivery->GetNext())
	$arResult["INFO"]["DELIVERY"][$arDelivery["ID"]] = $arDelivery;

$arResult["INFO"]["DELIVERY_HANDLERS"] = array();
$dbDelivery = CSaleDeliveryHandler::GetList(array(), array(array("SITE_ID" => SITE_ID)));
while ($arDeliveryHandler = $dbDelivery->GetNext())
{
	$arResult["INFO"]["DELIVERY_HANDLERS"][$arDeliveryHandler["SID"]] = $arDeliveryHandler;
}

$arResult["CURRENT_PAGE"] = $APPLICATION->GetCurPage();

//Preparing filter
$arFilter = Array();
$arFilter["USER_ID"] = IntVal($USER->GetID());

if(strlen($_REQUEST["del_filter"]) > 0)
{
	unset($_REQUEST["filter_id"]);
	unset($_REQUEST["filter_date_from"]);
	unset($_REQUEST["filter_date_to"]);
	unset($_REQUEST["filter_status"]);
    unset($_REQUEST["filter_itemstatus"]);
    unset($_REQUEST["filter_itemcode"]);   
	unset($_REQUEST["filter_payed"]);
	unset($_REQUEST["filter_canceled"]);
	$_REQUEST["filter_history"] = "Y";
	if($arParams["SAVE_IN_SESSION"] == "Y")
	{
		unset($_SESSION["spo_filter_id"]);
		unset($_SESSION["spo_filter_date_from"]);
		unset($_SESSION["spo_filter_date_to"]);
		unset($_SESSION["spo_filter_status"]);
		unset($_SESSION["spo_filter_payed"]);
		unset($_SESSION["spo_filter_canceled"]);
		$_SESSION["spo_filter_history"] = "Y";
	}
}

if($arParams["SAVE_IN_SESSION"] == "Y" && strlen($_REQUEST["filter"]) <= 0)
{
	if (IntVal($_SESSION["spo_filter_id"])>0)
		$_REQUEST["filter_id"] = $_SESSION["spo_filter_id"];
	if (strlen($_SESSION["spo_filter_date_from"])>0)
		$_REQUEST["filter_date_from"] = $_SESSION["spo_filter_date_from"];
	if (strlen($_SESSION["spo_filter_date_to"])>0)
		$_REQUEST["filter_date_to"] = $_SESSION["spo_filter_date_to"];
	if (strlen($_SESSION["spo_filter_status"])>0)
		$_REQUEST["filter_status"] = $_SESSION["spo_filter_status"];
	if (strlen($_SESSION["spo_filter_payed"])>0)
		$_REQUEST["filter_payed"] = $_SESSION["spo_filter_payed"];
	if (strlen($_SESSION["spo_filter_canceled"])>0)
		$_REQUEST["filter_canceled"] = $_SESSION["spo_filter_canceled"];
	if ($_SESSION["spo_filter_history"]=="Y")
		$_REQUEST["filter_history"] == "Y";
}


if (IntVal($_REQUEST["filter_id"])>0)
	$arFilter["ID"] = IntVal($_REQUEST["filter_id"]);
if (strlen($_REQUEST["filter_date_from"])>0)
	$arFilter["DATE_FROM"] = Trim($_REQUEST["filter_date_from"]);
if (strlen($_REQUEST["filter_date_to"])>0)
{
	$arFilter["DATE_TO"] = Trim($_REQUEST["filter_date_to"]);

	if ($arDate = ParseDateTime(Trim($_REQUEST["filter_date_to"]), CSite::GetDateFormat("FULL", SITE_ID)))
	{
		if (StrLen(Trim($_REQUEST["filter_date_to"])) < 11)
		{
			$arDate["HH"] = 23;
			$arDate["MI"] = 59;
			$arDate["SS"] = 59;
		}

		$arFilter["DATE_TO"] = date($DB->DateFormatToPHP(CSite::GetDateFormat("FULL", SITE_ID)), mktime($arDate["HH"], $arDate["MI"], $arDate["SS"], $arDate["MM"], $arDate["DD"], $arDate["YYYY"]));
	}
}

if (strlen($_REQUEST["filter_status"])>0)
	$arFilter["STATUS_ID"] = Trim($_REQUEST["filter_status"]);
if (strlen($_REQUEST["filter_payed"])>0)
	$arFilter["PAYED"] = Trim($_REQUEST["filter_payed"]);
if (strlen($_REQUEST["filter_canceled"])>0)
	$arFilter["CANCELED"] = Trim($_REQUEST["filter_canceled"]);
if ($_REQUEST["filter_history"]!="Y")
{
//	$arFilter["!STATUS_ID"] = "F";
	$arFilter["CANCELED"] = "N";
}

$arFilter["LID"] = SITE_ID;
if($arParams["SAVE_IN_SESSION"] == "Y" && strlen($_REQUEST["filter"]) > 0)
{
	$_SESSION["spo_filter_id"] = $_REQUEST["filter_id"];
	$_SESSION["spo_filter_date_from"] = $_REQUEST["filter_date_from"];
	$_SESSION["spo_filter_date_to"] = $_REQUEST["filter_date_to"];
	$_SESSION["spo_filter_status"] = $_REQUEST["filter_status"];
	$_SESSION["spo_filter_payed"] = $_REQUEST["filter_payed"];
	$_SESSION["spo_filter_history"] = $_REQUEST["filter_history"];
}



  
$by = (strlen($_REQUEST["by"])>0 ? $_REQUEST["by"]: "ID");
$order = (strlen($_REQUEST["order"])>0 ? $_REQUEST["order"]: "DESC");

/////////////////
$dbOrder = CSaleOrder::GetList(Array($by => $order), $arFilter );

 if (isset($_REQUEST["filter_itemstatus"]) && $_REQUEST["filter_itemstatus"]!="" )
 {
    #$dbOrder->NavStart($arParams["ORDERS_PER_PAGE"]);     
 } else
 {
   #$dbOrder->NavStart($arParams["ORDERS_PER_PAGE"]);
 }
#$arResult["NAV_STRING"] = $dbOrder->GetPageNavString(GetMessage("SPOL_PAGES"), $arParams["NAV_TEMPLATE"]);
$arResult["CURRENT_PAGE"] = $APPLICATION->GetCurPage();
$arResult["ORDERS"] = Array();
 ###########################################
if ((isset($_REQUEST["filter_itemstatus"]) && $_REQUEST["filter_itemstatus"]!="") || (isset($_REQUEST["filter_itemcode"]) && $_REQUEST["filter_itemcode"]!=""))
{  
     $arResult["ORDERS_COLLECT"] = Array(); 
     while($arOrder = $dbOrder->GetNext()) 
     {
       $dbBasket = CSaleBasket::GetList(($b="NAME"), ($o="ASC"), array("ORDER_ID"=>$arOrder["ID"]));
        while ($arBasket = $dbBasket->Fetch())    
        {
            if (isset($_REQUEST["filter_itemstatus"]) && $_REQUEST["filter_itemstatus"]!="" )
            {
               $arBasket["ITEMSTATUS"] = GetBasketItemProperty( $arBasket["ID"], "ItemStatus" );  //  DG  
                if($arBasket["ITEMSTATUS"]==1 || $arBasket["ITEMSTATUS"]==5 )
                {
                    $arBasket["ITEMSTATUS"]=0;
                }
               
               if  ($arBasket["ITEMSTATUS"]!=$_REQUEST["filter_itemstatus"] )
               {
                   continue;
               }
            }
            if (isset($_REQUEST["filter_itemcode"]) && $_REQUEST["filter_itemcode"]!="" )
            {
               $arBasket["ARTICLE"] = GetBasketItemProperty( $arBasket["ID"], "ItemCode" );  //  DG  
               if  ($arBasket["ARTICLE"]!=$_REQUEST["filter_itemcode"] )
               {
                   continue;
               }
            }
            #$arOBasket[] = $arBasket;
            $arResult["ORDERS_COLLECT"][]=$arOrder["ID"];
        }
        
        
         
     }  
     $arFilter["@ID"] = $arResult["ORDERS_COLLECT"];
     $dbOrder = CSaleOrder::GetList(Array($by => $order), $arFilter ); 
 
}
 
/* if (isset($_REQUEST["filter_itemstatus"]) && $_REQUEST["filter_itemstatus"]!="" )
 {
    $dbOrder->NavStart($arParams["ORDERS_PER_PAGE"]);     
 } else
 {
   $dbOrder->NavStart($arParams["ORDERS_PER_PAGE"]);
 } */
  $dbOrder->NavStart($arParams["ORDERS_PER_PAGE"]);
$arResult["NAV_STRING"] = $dbOrder->GetPageNavString(GetMessage("SPOL_PAGES"), $arParams["NAV_TEMPLATE"]);  


############################################
while($arOrder = $dbOrder->GetNext())
{
	$arOrder["FORMATED_PRICE"] = SaleFormatCurrency($arOrder["PRICE"], $arOrder["CURRENCY"]);
	$arOrder["CAN_CANCEL"] = (($arOrder["CANCELED"]!="Y" && $arOrder["STATUS_ID"]!="F" && $arOrder["PAYED"]!="Y") ? "Y" : "N");

	$arOrder["URL_TO_DETAIL"] = CComponentEngine::MakePathFromTemplate($arParams["PATH_TO_DETAIL"], Array("ID" => $arOrder["ID"]));
	$arOrder["URL_TO_COPY"] = CComponentEngine::MakePathFromTemplate($arParams["PATH_TO_COPY"], Array("ID" => $arOrder["ID"]))."COPY_ORDER=Y";
	$arOrder["URL_TO_CANCEL"] = CComponentEngine::MakePathFromTemplate($arParams["PATH_TO_CANCEL"], Array("ID" => $arOrder["ID"]))."CANCEL=Y";
    #$arOrder["SHIPPING_DOCUMENT"]=getPositionOrderShippingDocument($arOrder['ID']); 
    
	$arOBasket = Array();
	$dbBasket = CSaleBasket::GetList(($b="NAME"), ($o="ASC"), array("ORDER_ID"=>$arOrder["ID"]));
	
    while ($arBasket = $dbBasket->Fetch())
	{
        if (isset($_REQUEST["filter_itemstatus"]) && $_REQUEST["filter_itemstatus"]!="" )
        {
           $arBasket["ITEMSTATUS"] = GetBasketItemProperty( $arBasket["ID"], "ItemStatus" );  //  DG  
            if($arBasket["ITEMSTATUS"]==1 || $arBasket["ITEMSTATUS"]==5 )
            {
                $arBasket["ITEMSTATUS"]=0;
            }
           
           if  ($arBasket["ITEMSTATUS"]!=$_REQUEST["filter_itemstatus"] )
           {
               continue;
           }
        }
        if (isset($_REQUEST["filter_itemcode"]) && $_REQUEST["filter_itemcode"]!="" )
        {
           $arBasket["ARTICLE"] = GetBasketItemProperty( $arBasket["ID"], "ItemCode" );  //  DG  
           if  ($arBasket["ARTICLE"]!=$_REQUEST["filter_itemcode"] )
           {
               continue;
           }
        }
        
        
		$arBasket["NAME~"] = $arBasket["NAME"];
		$arBasket["NOTES~"] = $arBasket["NOTES"];
		$arBasket["ARTICLE"] = GetBasketItemProperty( $arBasket["ID"], "ItemCode" );
		$arBasket["BRAND"] = GetBasketItemProperty( $arBasket["ID"], "Brand" );
        $arBasket["~BRAND"] = GetBasketItemProperty( $arBasket["ID"], "Brand" ); 
		$arBasket["NAME"] = htmlspecialcharsEx($arBasket["NAME"]);
		$arBasket["NOTES"] = htmlspecialcharsEx($arBasket["NOTES"]);
		$arBasket["QUANTITY"] = DoubleVal($arBasket["QUANTITY"]);
        $arBasket["REGIONCODE"] = GetBasketItemProperty( $arBasket["ID"], "RegionCode" );  
		$arBasket["ITEMSTATUS"] = GetBasketItemProperty( $arBasket["ID"], "ItemStatus" );  //  DG
        $arBasket["ITEMSTATUSQUANTITY"]=GetBasketItemProperty( $arBasket["ID"], "ItemStatusQuantity" );
        $arBasket["ITEMSTATUS2"] = GetBasketItemProperty( $arBasket["ID"], "ItemStatus2" );  //  DG
        $arBasket["ITEMSTATUSQUANTITY2"]=GetBasketItemProperty( $arBasket["ID"], "ItemStatusQuantity2" );
        $arBasket["ITEMSTATUSCHANGEQUERY"]=GetBasketItemProperty( $arBasket["ID"], "ItemStatusChangeQuery" );
        $arBasket["QUANTITYCHANGEQUERY"]=GetBasketItemProperty( $arBasket["ID"], "QuantityChangeQuery" ); 
        $arBasket["WAREHOUSEDATE"]=GetBasketItemProperty( $arBasket["ID"], "WAREHOUSEDATE" );   
        $arBasket["PRICE_FORMATED"]=SaleFormatCurrency( $arBasket["PRICE"], $arBasket["CURRENCY"]); 
        $arBasket["SUM"]=DoubleVal($arBasket["PRISE"]*$arBasket["QUANTITY"]);
        $arBasket["SUM_FORMATED"]=SaleFormatCurrency(DoubleVal($arBasket["PRICE"]*$arBasket["QUANTITY"]),$arBasket["CURRENCY"]);
        $arBasket['SHIPPING_DOCUMENT']=getPositionOrderShippingDocument($arOrder['ID'],$arBasket["ARTICLE"]);
        $arBasket["ISRETURNABLE"]=GetBasketItemProperty( $arBasket["ID"], "IsReturnable" ); 
        $arBasket["DELIVERYMETHODTOUA"]=GetBasketItemProperty( $arBasket["ID"], "DeliveryMethodToUA" );
        
		$arOBasket[] = $arBasket;
	}

	$arResult["ORDERS"][] = Array(
			"ORDER" =>$arOrder,
			"BASKET_ITEMS" =>$arOBasket,
		);
}

$this->IncludeComponentTemplate();
?>