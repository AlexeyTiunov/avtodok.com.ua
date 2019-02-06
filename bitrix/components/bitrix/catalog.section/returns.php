<?
require($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php'); 
if(!CModule::IncludeModule("iblock"))
    {
            echo "0" ;
            exit;
    }             
 function getInfoAboutReturns()
 {    global $DB;
     $sql="SELECT 
     (SELECT PROPERTY_197 FROM b_iblock_element_prop_s26 WHERE IBLOCK_ELEMENT_ID)
     
     SELECT * FROM b_iblock_element_prop_s26 WHERE PROPERTY_262=0";
     
     $result=$DB->Query($sql);
     while($retuns=$result->Fetch())
     {
         
     }
     
 }   

function getShipingPartInfo($ID)
{
    $arSelect = array(
        "ID",
        "NAME",
        "CODE",
        "DATE_CREATE",
        "ACTIVE_FROM",
        "CREATED_BY",
        "IBLOCK_ID",
        "IBLOCK_SECTION_ID",
        "DETAIL_PAGE_URL",
        "DETAIL_TEXT",
        "DETAIL_TEXT_TYPE",
        "DETAIL_PICTURE",
        "PREVIEW_TEXT",
        "PREVIEW_TEXT_TYPE",
        "PREVIEW_PICTURE",
        "PROPERTY_*",
    );
    $arFilter = array(
        "ID"=>$ID, 
        "IBLOCK_ID"=> 26,
        "IBLOCK_LID" => SITE_ID,
        "IBLOCK_ACTIVE" => "Y",
        "ACTIVE_DATE" => "Y",
        "ACTIVE" => "Y"
        
    );
    $arObjectResult=new CIBlockElement();     
    
    $arResult=$arObjectResult->GetList(
    array(),
    $arFilter,
    false,
    false,
    $arSelect);
    
   $result=$arResult->GetNextElement();
   $resultFields=$result->GetFields();
    $resultFields["PROPERTIES"] = $result->GetProperties();
   return $resultFields;   
    
}
function getReturnPartStatus($ID)
{
     $returnStatusInfo=getShipingPartInfo($ID)["PROPERTIES"]["ReturnStatus"]["VALUE"];
     if   ($returnStatusInfo=="")
     {
         $returnStatusInfo=-1;
     }
     return $returnStatusInfo;
    
}
function getShipingInfoByShipingPartID($ShipingPartID) 
{
   $ShipingId=getShipingPartInfo($ShipingPartID)["PROPERTIES"]["ShippingID"]["VALUE"];
   $arSelect = array(
        "ID",
        "NAME",
        "CODE",
        "DATE_CREATE",
        "ACTIVE_FROM",
        "CREATED_BY",
        "IBLOCK_ID",
        "IBLOCK_SECTION_ID",
        "DETAIL_PAGE_URL",
        "DETAIL_TEXT",
        "DETAIL_TEXT_TYPE",
        "DETAIL_PICTURE",
        "PREVIEW_TEXT",
        "PREVIEW_TEXT_TYPE",
        "PREVIEW_PICTURE",
        "PROPERTY_*",
    );
    $arFilter = array(
        "ID"=> $ShipingId,
        "IBLOCK_ID" => 25,
        "IBLOCK_LID" => SITE_ID,
        "IBLOCK_ACTIVE" => "Y",
        "ACTIVE_DATE" => "Y",
        "ACTIVE" => "Y"
        
    );
    $arObjectResult=new CIBlockElement();     
    
    $arResult=$arObjectResult->GetList(
    array(),
    $arFilter,
    false,
    false,
    $arSelect);
    
        $result=$arResult->GetNextElement();
   $resultFields=$result->GetFields();
    $resultFields["PROPERTIES"] = $result->GetProperties();
   return $resultFields;   
   
   
    
}
 /*
 *  NULL - no return
 *  0    - user request
 *  1    - approved
 *  2    - not approved
 */
function setReturnStatus ($ID,$status)
{
    global $DB;
    $sql="UPDATE b_iblock_element_prop_s26 SET PROPERTY_262={$status} WHERE IBLOCK_ELEMENT_ID={$ID} ";
    var_dump($sql);
    $result=$DB->Query($sql);
    if ($result->AffectedRowsCount>0)
    return true;
    else return false;
    //return (bool)$result->AffectedRowsCount>0;
    
    
}   
function isPossibleMakeReturn($ID)
{
      global $DB;
    $sql="          
      SELECT VALUE FROM
     (SELECT 
     (SELECT PROPERTY_209 FROM b_iblock_element_prop_s26 WHERE IBLOCK_ELEMENT_ID ={$ID}) AS OrderID, 
     (SELECT ID FROM b_sale_basket WHERE ORDER_ID = OrderID LIMIT 1 ) AS BASKET_IDD ) AS F LEFT JOIN b_sale_basket_props AS S     
     ON  F.BASKET_IDD = S.BASKET_ID  WHERE Code='IsReturnable' LIMIT 1";
   #  var_dump($sql) ;
    $result=$DB->Query($sql); 
    if ($value=$result->Fetch())
    {
       # var_dump($value['VALUE']);
         if ($value['VALUE']==0)
         {
             return false;
         }else
         {
            # return true;
         }
        
    } else
    {
        #var_dump("ERROR"); 
        return false;
    }
    
    
    $sql=" SELECT PROPERTY_201 AS DATE FROM b_iblock_element_prop_s25 
    WHERE IBLOCK_ELEMENT_ID=  (SELECT PROPERTY_206  FROM b_iblock_element_prop_s26 WHERE IBLOCK_ELEMENT_ID ={$ID} LIMIT 1)    
    ";
    $result=$DB->Query($sql); 
    if ($date=$result->Fetch())
    {
        if ($date["DATE"]=="" || $date['DATE']=null)
        {
            return false;
        }else
        {
            #2014-03-12 00:00:00
            $datetime_array=explode(" ",$date["DATE"]);
            $date_str=$datetime_array[0];
            $date_array=explode("-",$date_str);
            $timestamp_doc=mktime(0,0,0,$date_array[1],$date_str[2],$date_str[0]);
            $timestamo_now=time();
            
            if (($timestamo_now-$timestamp_doc)>(60*60*24*14))
            {
                return false;
            } else
            {
                return true;
            }
            
        }
        
        
    }  else
    {
         return false; 
    }
    
    
    
  return false;  
    
}

function ShowReturnPartStatus($ID)
{
    $show_status="";
   // var_dump(getReturnPartStatus($ID));
   if (isPossibleMakeReturn($ID))
   {
    switch (getReturnPartStatus($ID))
    {
        case 0:
          $show_status.="<input type='checkbox' checked='checked' class='returns' id='return_{$ID}' return_id='{$ID}'>&nbsp;";
          $show_status.="<img title='Ожидание подтверждения' src='/bitrix/components/bitrix/catalog.section/images/return_request.gif' style='width:15px; height:18px;'>";
        break;
        
        case 1:
             $show_status.="<img title='Возврат подтвержден' src='/personal/order/images/otgruzhen.png' style='width:15px; height:18px;'>"; 
        break; 
        case 2:
             $show_status.="<img title='Возврат не подтвержден' src='/personal/order/images/otkaz.png' style='width:15px; height:18px;'>"; 
        break;        
        default:
           $show_status.="<input type='checkbox'  class='returns' id='return_{$ID}' return_id='{$ID}'>";
        break;
        
        
    }
   }else
   {
       $show_status.="<input type='checkbox' disabled='disabled' class='returns' id='return_{$ID}' return_id='{$ID}'>&nbsp;"; 
   }
    
    
    return $show_status;
} 
    
    
    
?>