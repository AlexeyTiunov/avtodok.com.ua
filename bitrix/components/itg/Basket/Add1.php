<?
require_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php');
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/php_interface/include/autodoc_globals.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/autodoc/includes/autodoc_stats.php");
#require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/sale/general/export.autodoc.php");
define("STOP_STATISTICS", true);  

global $USER;
global $DB;
function getUserTypeDelivery($userID)
{
    if ($userID==0 || $userID="" || $userID=null)
    {
        return 0;
    } 
    global $DB;
  $sql="SELECT * FROM b_user WHERE ID={$userID} LIMIT 1"; 
  $result=$DB->Query($sql);
  $arrayUserInfo=$result->fetch();
  if (!isset ($arrayUserInfo["DeliveryType"]) )
  return 0;
  return $$arrayUserInfo["DeliveryType"];
    
}
function isAnyDeliveryMethodToUA($regionCode)
{
    global $DB;     
    $sql="SELECT DESCRIPTION_95 as DeliveryType FROM b_iblock_element_prop_s17 WHERE PROPERTY_92={$regionCode} LIMIT 1";
    $result=$DB->Query($sql);     
    $deliveryObject=$result->Fetch();
    
    if (isset($deliveryObject['DeliveryType']) && $deliveryObject['DeliveryType']!="" )
    {
        return true;
    }
    
    return false;
    
}
if(isset($_GET["rcode"]))
{
    $_GET["quantity"] = intval($_GET["quantity"]);
    if(!$_GET["quantity"] || $_GET["quantity"] < 0)$_GET["quantity"] = 1;


    if(isset($_GET["r"]) && ( $_GET["r"]=="1"))$redirect = true;
    else $redirect = false;

    $_GET['icode'] = str_replace(array('-',' ','.',',','*'),'',$_GET['icode']);
    if (CModule::IncludeModule("sale")&& CModule::IncludeModule('iblock'))
    {
        CSaleBasket::Init();
        unset($arProps);
        if (!$_GET['caption']) $_GET['caption'] = '-';
        $productID = intval(preg_replace('/[^0-9]/', '', $_GET['icode'].$_GET['bcode']));
        $arFields = array(
                "PRODUCT_ID"             => $productID,
                "PRODUCT_PRICE_ID"        => 0,
                "PRICE"                 => $_GET['price'],
                "CURRENCY"                 => $_GET['currency'],
                "WEIGHT"                 => 0,
                "QUANTITY"                 => intval($_GET['quantity']),
                "LID"                     => LANG,
                "DELAY"                 => "N",
                "CAN_BUY"                 => "Y",
                "NAME"                     => $_GET['caption'],
                "MODULE"                 => "AUTODOC"
                );
        
        $arProps = array();
        $arProps[] = array("NAME" => "Валюта",                    "CODE" => "Currency",    "VALUE" => $_GET['currency']);
        $arProps[] = array("NAME" => "Артикул",                    "CODE" => "ItemCode",    "VALUE" => $_GET['icode']);
        $arProps[] = array("NAME" => "Код бренда",                "CODE" => "Brand",        "VALUE" => $_GET['bscode']);
        $arProps[] = array("NAME" => "Код региона",                "CODE" => "RegionCode",    "VALUE" => $_GET['rcode']);
        $arProps[] = array("NAME" => "Статус строки заказа",    "CODE" => "ItemStatus",    "VALUE" => "0");
        if (isset($_GET['is_returnable']) && intval($_GET['is_returnable'])==1)
        {
           $arProps[] = array("NAME" => "Статус возврата",    "CODE" => "IsReturnable",    "VALUE" => "1"); 
        }  
        else
        {
             $arProps[] = array("NAME" => "Статус возврата",    "CODE" => "IsReturnable",    "VALUE" => "0");   
        } 
        $DeliveryMethodToUA=isAnyDeliveryMethodToUA($_GET['rcode']);
        if ($DeliveryMethodToUA)
        {
           $arProps[] = array("NAME" => "Метод Доставки в Украину ",    "CODE" => "DeliveryMethodToUA",    "VALUE" =>"air");   
        }
        
        
              
        $arFields["PROPS"] = $arProps;

            $arBasketItems = array();
                                    $checkItem=true;
                                    $checkRegion=true;
                                    $checkBrand=true;
                                      $dbBasketItems = CSaleBasket::GetList(
                                           array(
                                                   "NAME" => "ASC",
                                                   "ID" => "ASC"
                                                   ),
                                           array(
                                               "FUSER_ID" => CSaleBasket::GetBasketUserID(),
                                                "LID" => "s1",
                                                "ORDER_ID" => "NULL"
                                                  ),
                                                  false,
                                                   false,
                                            array("ID","QUANTITY") 
                                                      ); 
                                                         
                                                    
                                          while ($arItems = $dbBasketItems->Fetch())
                                          {
                                              $checkItem=true;
                                              $checkRegion=true;
                                               $checkBrand=true;
                                               $db_res = CSaleBasket::GetPropsList(
                                                   array(
                                                      "SORT" => "ASC",
                                                      "NAME" => "ASC"
                                                            ),
                                                   array("BASKET_ID" => $arItems['ID'])
                                                           );
                                               while ($ar_res = $db_res->Fetch())
                                               {
                                                   if ( $ar_res['CODE']=="ItemCode"  && $ar_res['VALUE']==$_GET['icode']  )
                                                    {   
                                                        $checkItem=false;
                                                    }
                                                    if ( $ar_res['CODE']=="RegionCode" &&  $ar_res['VALUE']==$_GET['rcode']  )  
                                                   {  
                                                      $checkRegion=false;   
                                                   }
                                                   if ( $ar_res['CODE']=="Brand" &&  $ar_res['VALUE']==$_GET['bscode']  ) 
                                                   {
                                                      $checkBrand=false; 
                                                   } 
                                                   if ($checkItem==false && $checkRegion==false && $checkBrand==false)
                                                    {
                                                        
                                                    break;
                                                    }
                                               }
                                               
                                               if ($checkItem==false && $checkRegion==false && $checkBrand==false)
                                               {
                                                   $arItemQuantity=$arItems['QUANTITY'];
                                                   $arItemId= $arItems['ID'];
                                                    break;
                                               }
                                          }
             
           
           if ($checkItem==false && $checkRegion==false && $checkBrand==false) 
           {  
               if (isset($_GET['item_duplicate_check'])) 
               {
                  exit("".$arItemQuantity); 
               } 
              /* $arFieldsUpdates= array(
                        "QUANTITY" => $arItemQuantity +intval($_GET['quantity']) 
                         );  */
                $arFieldsUpdates= array(
                        "QUANTITY" => intval($_GET['quantity']) 
                         );         
                CSaleBasket::Update($arItemId, $arFieldsUpdates);
           } 
            else
            {  
               if (isset($_GET['item_duplicate_check'])) 
               {
                  exit("0"); 
               } 
        
        
               $basketItemID = CSaleBasket::Add($arFields);
               

                $sql = "UPDATE b_sale_basket SET
                                        PRICE='{$_GET['price']}',
                                        CURRENCY='{$_GET['currency']}',
                                        PRODUCT_ID='{$productID}'
                                    WHERE 
                                        ID='{$basketItemID}'";
                    $tmpRes = $DB->Query($sql);
           }
        if($redirect) header("Location: /autodoc/mycart.php");
        else
        {
               //echo "Basket ID: ".$basketItemID;
            
            $arBasketItems = array();
            $dbBasketItems = CSaleBasket::GetList(
                                                    array(
                                                        "NAME" => "ASC",
                                                        "ID" => "ASC"
                                                    ),
                                                    array(
                                                        "FUSER_ID" => CSaleBasket::GetBasketUserID(),
                                                        "LID" => SITE_ID,
                                                        "ORDER_ID" => "NULL"
                                                    ),
                                                    false,
                                                    false,
                                                    array("ID")
                    );
            echo $dbBasketItems->SelectedRowsCount().'|<div id="search_name">Артикул <b>'.$_GET['icode'].'</b> добавлен в корзину</div>';
                                 
            $statObj = new CStats();
            $statObj->StoreLine($_GET['bcode'],$_GET['icode']);
        }
    }
}
if (isset($_POST['basket_ID']) && isset($_POST['VALUE']))
{
    $regionCode=GetBasketItemProperty( $_POST['basket_ID'],"RegionCode" );
    global $DB;
    $deliveryDaysArray['sea']['2']=45;
    $deliveryDaysArray['air']['2']=10;
    $deliveryDaysArray['sea']['4']=45;
    $deliveryDaysArray['air']['4']=14;
   $sql = "UPDATE b_sale_basket_props SET
                                     VALUE='{$_POST['VALUE']}'   
                                    WHERE 
                                        BASKET_ID={$_POST['basket_ID']}
                                        AND CODE='DeliveryMethodToUA';
                                        ";
                                        
                    $result = $DB->Query($sql); 
    echo $_POST['basket_ID']."#".$deliveryDaysArray[$_POST['VALUE']][$regionCode];
  #  var_dump($result);
    
}
function GetBasketItemProperty( $basketID, $propertyCode )
{
   global $DB;
   $res = '';

   $sql = "SELECT VALUE FROM b_sale_basket_props ";
   $sql .= " WHERE BASKET_ID='".$basketID."'";
   $sql .= " AND CODE='".$propertyCode."'";

   $rRes = $DB->Query($sql);
   if( $arRes = $rRes->Fetch())
     $res = $arRes["VALUE"] ;


   return $res;

}
?>
