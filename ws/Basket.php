<?
  require_once ($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');  
  require($_SERVER["DOCUMENT_ROOT"]."/bitrix/php_interface/include/autodoc_globals.php");
  require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/sale/general/export.autodoc.php");
  require_once($_SERVER["DOCUMENT_ROOT"]."/ws/autodoc/includes/autodoc_templaytor.php");
 // error_reporting(E_ALL);
// ini_set("display_errors","1");   
function getUserTypeDelivery($userID)
{
    if ($userID==0 || $userID=="" || $userID==null)
    {
        return 0;
    } 
    global $DB;
  $sql="SELECT * FROM b_user WHERE ID={$userID} LIMIT 1"; 
  $result=$DB->Query($sql);
  $arrayUserInfo=$result->fetch();
  if (!isset ($arrayUserInfo["DeliveryType"]) )
  return 0;
  return $arrayUserInfo["DeliveryType"];
    
}
function getDeliveryMethodArray()
{
    $deliveryMethodArray['sea']="30-45 дней 4$ за кг";
    $deliveryMethodArray['air']="8-14 дней 7$ за кг";
    return  $deliveryMethodArray;
}
function getDeliveryMethodToUA($regionCode)
{
    global $DB;     
    $sql="SELECT DESCRIPTION_95 as DeliveryType FROM b_iblock_element_prop_s17 WHERE PROPERTY_92={$regionCode} LIMIT 1";
    
    $result=$DB->Query($sql);     
    $deliveryObject=$result->Fetch();
    
    if (isset($deliveryObject['DeliveryType']) && $deliveryObject['DeliveryType']!="" )
    {
        return $deliveryObject['DeliveryType'];
    }
    
    return "";
    
}
function showDeliveryMethod($deliveryMethod,$nameCheckedItem,$basketID)
{
     if ($deliveryMethod=="")
     {
         return "";
     }
     $deliveryMethodsArray=explode("#",$deliveryMethod);
     $imagePath = "http://".$_SERVER["SERVER_NAME"]."/personal/order/images/"; 
     $DeliveryMethod=""; 
     $DeliveryMethod.="<div style=''>";  
     $DeliveryMethodArray=getDeliveryMethodArray(); 
     foreach ($deliveryMethodsArray as $methods)
     {
         $checked="";
       if ($methods==$nameCheckedItem) 
       {
           $checked="checked='checked'";
       } 
       $DeliveryMethod.="<input type='radio' {$checked} class='deliveryMethodToUAChange' id='deliveryMethodToUA_{$basketID}'  name='deliveryMethodToUA_{$basketID}' value='{$methods}'>";
       $DeliveryMethod.="<img src='{$imagePath}method_{$methods}.png' title='{$DeliveryMethodArray[$methods]}' style='width:30px; height:15px;'>";
       
       $DeliveryMethod.="</input><br>"; 
         
         
         
     }
     
     $DeliveryMethod.="<div>";
     return $DeliveryMethod;
}
 
  $checkChangeQuantity=true;
  #var_dump($_POST);
  #var_dump($_REQUEST);
  if (CModule::IncludeModule("sale")&& CModule::IncludeModule('iblock') )
  {
      
       CSaleBasket::Init();

           $basketUserID = CSaleBasket::GetBasketUserID();

            $lcur = CCurrency::GetList(($b="name"), ($order1="asc"), LANGUAGE_ID);

            if( !isSet( $_REQUEST["CURRENCY"]) )
              $_REQUEST["CURRENCY"] = "USD";
              
              
              
        $dbBasketItems = CSaleBasket::GetList(
                array(
                        "ID" => "ASC"
                    ),
                array(
                        "FUSER_ID" => $basketUserID,
                        "LID" => SITE_ID,
                        "ORDER_ID" => "NULL"
                    ),
                false,
                false,
                array("ID", "PRODUCT_ID","NAME", "QUANTITY",
                      "CAN_BUY", "PRICE", "NOTES")
            );
            
            
            if ( isSet($_REQUEST["BasketRefresh"]) )
              {

                 while ($arItems2 = $dbBasketItems->Fetch())
                   {
                         // обновляем комментарий
                      if( $_REQUEST["COMMENT_".$arItems2["ID"]] != $arItems2["NOTES"] )
                        {
                           $sql = "UPDATE b_sale_basket ";
                           $sql .= " SET NOTES='".$_REQUEST["COMMENT_".$arItems2["ID"]]."'";
                           $sql .= " WHERE ID='".$arItems2["ID"]."'";
                           $tmpRes = $DB->Query($sql);
                        }

                            //  обновляем количсетво
                           if( $_REQUEST["QUANTITY_".$arItems2["ID"]] != $arItems2["QUANTITY"] 
                         &&  $_REQUEST["QUANTITY_".$arItems2["ID"]]!=0    )
                        {
                           $sql = "UPDATE b_sale_basket ";
                           $sql .= " SET QUANTITY='".abs(intval($_REQUEST["QUANTITY_".$arItems2["ID"]]))."'";
                           $sql .= " WHERE ID='".$arItems2["ID"]."'";
                           $tmpRes = $DB->Query($sql);
                           $checkChangeQuantity=true;
                        }elseif ($_REQUEST["QUANTITY_".$arItems2["ID"]]==0)
                        {
                            
                            $checkChangeQuantity=false; 
                        }


                            //  удаляем записи
                      if( $_REQUEST["DELETE_".$arItems2["ID"]] == 'Y' )
                        {
                           CSaleBasket::Delete($arItems2["ID"]);
                        }


                   }
              
              
             
            }
              $dbBasketItems = CSaleBasket::GetList(
                array(
                        "ID" => "ASC"
                    ),
                array(
                        "FUSER_ID" => $basketUserID,
                        "LID" => SITE_ID,
                        "ORDER_ID" => "NULL"
                    ),
                false,
                false,
                array("ID", "PRODUCT_ID","NAME", "QUANTITY",
                      "CAN_BUY", "PRICE", "NOTES")
            );
            
            
             $i = 0;

            $arRegions = GetAllRegionsProperties2();
            $arBrands=GetAllBrandsNameFromID();
           // var_dump($arRegions);
            if( $dbBasketItems->SelectedRowsCount() > 0 )
            {
                   
                 
                  $userTotal = 0;
                  
                  $BusketItemsArray= Array();                                    
                  //$BasketItemProperties= GetBasketItemProperties( $basketUserID);
                  //$BusketItemsArray['PROP']=$BasketItemProperties;
                while ($arItems = $dbBasketItems->Fetch())
               {
                      $BasketItemProperties= GetBasketItemProperties( $arItems["ID"]); 
                      // $caption = $arItems["NAME"];
                      // $arItems["NAME"]=$caption;
                     //  $comment = $arItems["NOTES"];
                       
                       #$DeliveryMethodToUA= GetBasketItemProperty( $arItems["ID"], "DeliveryMethodToUA" );

                       //GetBasketItemProperty( $arItems["ID"], "ItemCode" )
                       $objTStr = new TemplatedString( $BasketItemProperties["ItemCode"] );
                       $brandID = GetBrandCodeByCHR( $BasketItemProperties["Brand"] );
                       $BasketItemProperties["BrandName"]=$arBrands[$brandID];
                       $BasketItemProperties["BrandCode"]=$BasketItemProperties["Brand"];
                       $objTStr->SetTemplate( $brandID );
                       $itemCode = $objTStr->GetTemplated();
                       $BasketItemProperties["ItemCodeTamplate"]=$itemCode;


                      // $brand = $BasketItemProperties["Brand"];
                       
        //               $itemCode = GetBasketItemProperty( $arItems["ID"], "ItemCode" );
                       $currency = $BasketItemProperties["Currency"];
                      // $regionCode = GetBasketItemProperty( $arItems["ID"], "RegionCode" );
                       
                        
                      // $DeliveryMethodToUA= GetBasketItemProperty( $arItems["ID"], "DeliveryMethodToUA" ); 
                       #var_dump($DeliveryMethodToUA);
                       $BasketItemProperties["DeliveryMethodSSToUA"]=getDeliveryMethodToUA($BasketItemProperties["RegionCode"].".0000");
                      $BasketItemProperties["DeliveryDays"]=$arRegions[$BasketItemProperties["RegionCode"].".0000"]["DeliveryDays"];
                       
                       $price = $arItems["PRICE"];
                       $sum = $price*$arItems["QUANTITY"];
                       
                       $userCurrency = $_REQUEST["CURRENCY"];
                      $userCurrency="USD";

                      $arItems["UserPrice"]= CCurrencyRates::ConvertCurrency( $price, $currency, $userCurrency );
                      $arItems["UserSum"] = CCurrencyRates::ConvertCurrency( $sum, $currency, $userCurrency );
                       $userTotal += $userSum;
                       
                       
                       
                       /////////////////////////////
                   
                       //////////////////////////
                       $i ++;
                       
                       
                       
                       
                        $UserID=$USER->GetID();  
                        $sql = "SELECT ID_1C , Agreement_1C FROM b_user WHERE ID='".$UserID."'";
                        $res = $DB->Query( $sql );
                        if( $ID_1C = $res->Fetch() )
                        $ID1C=$ID_1C["ID_1C"];
                        $Agreement_1C= $ID_1C["Agreement_1C"];
                        
                        
                        
                        $sql="SELECT * FROM `b_autodoc_agreements`  WHERE ClientCode='{$ID1C}' AND Code='{$Agreement_1C}' LIMIT 1";
                        $result = $DB->Query( $sql );
                        if ($Aresult=$result->Fetch()) 
                        {
                            
                        } 
                        $arItems["PROPS"]= $BasketItemProperties;
                        $BusketItemsArray[]=$arItems;
                   
               }
                
                
                
                
            }
      
     echo (json_encode($BusketItemsArray,JSON_UNESCAPED_UNICODE));  
    //var_dump($BusketItemsArray);
  }    
    
    
    
?>