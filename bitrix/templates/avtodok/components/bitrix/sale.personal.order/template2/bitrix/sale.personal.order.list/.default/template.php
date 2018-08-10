<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<script>
function QuantityChangeQuery(BASKET_ID,QUANTITY)
  {
      
       if (QUANTITY==0 || QUANTITY=='0' || QUANTITY=="")
       {
           return false;
       } 
       params={
         BASKET_ID:BASKET_ID,
         QUANTITY:QUANTITY,
             };   
      
       urlQueryAjax = '/personal/suppload/QuantityChangeQuery.php';
                   $.get(urlQueryAjax, params, function(data)
                   {                   
                   
                   
                   });
                         
  }
  
$(document).ready(function() {
            $('.minus').click(function () {
                var $input = $(this).parent().find('input').filter('[name="iQuantity"]');
                var count = parseInt($input.val()) - 1;
                count = count < 1 ? 1 : count;
                $input.val(count);
                $input.change();
                ID=$(this).attr("id");                    
               // QuantityChangeQuery(ID,count);
                return false;
            });
            $('.plus').click(function () {
                var $input = $(this).parent().find('input').filter('[name="iQuantity"]');;
                $input.val(parseInt($input.val()) + 1);
                $input.change();
                ID=$(this).attr("id");                    
                //QuantityChangeQuery(ID, $input.val());
                return false;
            });
        });
  function ItemStatusChangeQuery(BASKET_ID,STATUS_CODE)
  {
   params={
         BASKET_ID:BASKET_ID,
         STATUS_CODE:STATUS_CODE,
           };   
      
     urlQueryAjax = '/personal/suppload/ItemStatusChangeQuery.php';
                   $.get(urlQueryAjax, params, function(data)
                   {                   
                   
                   
                   });       
      
  } ;
  
</script>
<form method="GET" action="<?= $arResult["CURRENT_PAGE"] ?>" name="bfilter">
<table class="sale-personal-order-list-filter-new data-table">
	<tr>
		<th colspan="2"><?echo GetMessage("SPOL_T_F_FILTER")?></th>
	</tr>
	<tr>
		<td><?=GetMessage("SPOL_T_F_ID");?>:</td>
		<td><input type="text" name="filter_id" value="<?=htmlspecialchars($_REQUEST["filter_id"])?>" size="10"></td>
	</tr>
    <tr>
        <td>Номер Детали:</td>
        <td><input type="text" name="filter_itemcode" value="<?=htmlspecialchars($_REQUEST["filter_itemcode"])?>" size="10"></td>
    </tr>
	<tr>
		<td><?=GetMessage("SPOL_T_F_DATE");?>:</td>
		<td><?$APPLICATION->IncludeComponent(
	"bitrix:main.calendar",
	"",
	Array(
		"SHOW_INPUT" => "Y",
		"FORM_NAME" => "bfilter",
		"INPUT_NAME" => "filter_date_from",
		"INPUT_NAME_FINISH" => "filter_date_to",
		"INPUT_VALUE" => $_REQUEST["filter_date_from"],
		"INPUT_VALUE_FINISH" => $_REQUEST["filter_date_to"],
		"SHOW_TIME" => "N"
	)
);


CModule::IncludeModule('iblock');
$arRegions = GetAllRegionsProperties();
function FormatOrderDate($date)
{
    if ($date=="")return $date; 
    $arrayDate=explode(" ",$date);
    
    return $arrayDate[0];
};
function FindBrandName($shortName)
{
    global $DB;
    $sql="SELECT PROPERTY_72 AS FullName FROM b_iblock_element_prop_s14 WHERE PROPERTY_71='{$shortName}' LIMIT 1";
    $result=$DB->query($sql);
    $fullName=$result->Fetch();
    
     
    return  strtoupper($fullName["FullName"]);
}
function GetItemStatusNameByID($status_ID)
{
     switch($status_ID)
                 {
                      case 0 :
                         $itemStatus = "В работе";
                      break;

                      case 1 :
                         $itemStatus = "Выкуплен";
                      break;

                      case 2 :
                         $itemStatus = "Отказ";                        
                      break;

                      case 3 :
                         $itemStatus = "Склад";                         
                      break;

                      case 4 :
                         $itemStatus = "Отгружен";
                      break;
                        case 5:
                        $itemStatus = "В пути";
                      break;
                      case 6 :
                         $itemStatus = "СкладДонецк";
                      break;
                      case 7 :
                         $itemStatus = "Отложено. Пополните баланс!";
                      break;
                      default:
                           $itemStatus="-";
                      break;

                 }
   return $itemStatus;
}
function CheckShippingDocuments($shippingDocumentsArray)
{
    
}
function CheckItemActionForRegion($basketProps,$itemAction)
{
    if (!isset($basketProps['REGIONCODE'])) return $itemAction;
    
    if  ( ($basketProps['REGIONCODE']>0 && $basketProps['REGIONCODE']<5) || ($basketProps['REGIONCODE']>899 && $basketProps['REGIONCODE']<1000)  )
    {
        return "-";
    }
    return  $itemAction ;
}
function StatusShow($basketProps,$itemStatus,$itemAction,$itemQuantity)
{
    global  $itemStatus,$itemAction,$itemQuantity;
   // $itemQuantity=$basketProps["QUANTITY"];
    $ID=$basketProps["ID"];
    #$basketProps["ITEMSTATUSCHANGEQUERY"]=$value;
    $statusID=$basketProps['ITEMSTATUS'];
    if (intval($basketProps['ITEMSTATUSQUANTITY2']>0))
    {
       $statusID2=$basketProps['ITEMSTATUS2'];  
    }  else
    {
      $statusID2=-1; 
    }
     
    $imagePath = "http://".$_SERVER["SERVER_NAME"]."/personal/order/images/";
   
       if (defineQuantityChangeStatus($basketProps['QUANTITYCHANGEQUERY'])==false)
           {
              $itemQuantity="<span id='{$ID}' class='minus'>-</span>
              <input id='i{$ID}' name='iQuantity' disabled='disabled' type='text' value='{$basketProps['QUANTITY']}' size='1'/>
              <input type='hidden' id='f{$ID}' name='fQuantity' value='{$basketProps['QUANTITY']}'>
              <span id='{$ID}' class='plus'>+</span>"; 
              $itemQuantity.="<br><a href='###' id='{$ID}'><img title='' src='".$imagePath."quantity_change.png'>"; 
              #$itemQuantity.=
           }                                     
            elseif(defineQuantityChangeStatus($basketProps['QUANTITYCHANGEQUERY'])==="?") 
           {
              $itemQuantity="{$basketProps['QUANTITY']}<img title='изменение количества на ".explode("#",$basketProps['QUANTITYCHANGEQUERY'])[0]." пока не подтверждено.' src='".$imagePath."user_wait.png'>"; 
           } elseif(defineQuantityChangeStatus($basketProps['QUANTITYCHANGEQUERY'])==="X")
           {
               $itemQuantity="<img src='".$imagePath."v_rabote.png'>";
           } else
           {
             $itemQuantity=$basketProps['QUANTITY']."<img title='Колличество подтверждено.' src='".$imagePath."otgruzhen.png'>";
               
           }
    
     
    if (defineItemStatusChangeQuery($basketProps["ITEMSTATUSCHANGEQUERY"],2)=="?")
           {
             $itemStatus="";                                                              
             $itemAction="<a><img  title='ожидание подтверждения отказа' src='".$imagePath."user_deny_wait.png'></a>";  
             $itemQuantity=$basketProps['QUANTITY'];
               
           } elseif (defineItemStatusChangeQuery($basketProps["ITEMSTATUSCHANGEQUERY"],2)=="X")
           {
               
              $itemStatusName=GetItemStatusNameByID($statusID);
              $itemStatus="<a><img title='".$itemStatusName.". Отказ от позиции отклонен.' src='".$imagePath."v_rabote.png'></a>"; 
              $itemAction=$basketProps["QUANTITY"];
              $itemQuantity=$basketProps['QUANTITY']; 
               
           } elseif (defineItemStatusChangeQuery($basketProps["ITEMSTATUSCHANGEQUERY"],2)==="2")
           {
                $itemStatusName="Отказ  пользователя";                                 
                $itemStatus="<a><img title='".$itemStatusName."' src='".$imagePath."user_deny.png'></a>";                                  
                $itemAction="-"; 
                $itemQuantity=$basketProps['QUANTITY'];
           }  else
           {
               switch ($statusID)
               {   
                   case 0: // $itemStatus = "В работе";
                       
                     $itemAction="<a  href='####' id='{$ID}'><img onclick=\"ItemStatusChangeQuery({$basketProps["ID"]},2)\" title='Запросить возможность отказа' src='".$imagePath."user_button_cancel.png'></a>";  
                     $itemAction=CheckItemActionForRegion($basketProps,$itemAction);
                     $itemStatusName=GetItemStatusNameByID(0);
                     $itemStatus="<a><img title='".$itemStatusName."'  src='".$imagePath."v_rabote.png'></a>";
                    // $itemQuantity="<span id='{$ID}'class='minus'>-</span><input disabled='disabled' type='text' value='{$itemQuantity}' size='1'/><span id='{$ID}' class='plus'>+</span>";
                   break;
                    case 7: // $itemStatus = "Отложен";  
                     $itemAction="<a  href='####' id='{$ID}'><img onclick=\"ItemStatusChangeQuery({$basketProps["ID"]},2)\" title='Снять с заказа' src='".$imagePath."user_button_cancel.png'></a>";  
                     # $itemAction=CheckItemActionForRegion($basketProps,$itemAction); 
                    # $itemAction.="<br><a href='####' ><img src='".$imagePath."privat_24.png'></a>";
                     $itemStatusName=GetItemStatusNameByID(7);
                     $itemStatus="<a><img title='".$itemStatusName."' style='width:15px;height:15px;' src='".$imagePath."otlozhen.png'></a>";
                     $itemStatus.="<br><a href='/personal/privatbank/privat24.php' target='_blank' ><img style='width:15px;height:15px;' title='оплатить по Приват 24' src='".$imagePath."privat_24.png'></a>"; 
                     $itemStatus.="<a href='/personal/privatbank/liqpay.php' target='_blank' ><img style='width:15px;height:15px;' title='оплатить по LiqPay' src='".$imagePath."Liq_pay.png'></a>";  
                    // $itemQuantity="<span id='{$ID}'class='minus'>-</span><input disabled='disabled' type='text' value='{$itemQuantity}' size='1'/><span id='{$ID}' class='plus'>+</span>";
                   break;
                   case 1:# $itemStatus = "Выкуплен"; 
                        $itemStatusName=GetItemStatusNameByID(1);
                        $itemStatus="<a><img title='".$itemStatusName." ".$basketProps['ITEMSTATUSQUANTITY']." шт.' src='".$imagePath."vykuplen.png'></a>";                                   
                        if ($basketProps["WAREHOUSEDATE"]!="")
                          { 
                          $itemAction="<img title='дата ожидания ".FormatOrderDate($basketProps["WAREHOUSEDATE"])."' src='".$imagePath."date_come.gif'>"; 
                          } else
                         {
                          $itemAction=$basketProps["QUANTITY"]; 
                          }                           
                        
                        $itemQuantity=$basketProps["QUANTITY"];
                   break;
                   case 2:  // $itemStatus = "Отказ";
                         $itemStatusName=GetItemStatusNameByID(2);                                 
                         $itemStatus="<a><img title='".$itemStatusName."' src='".$imagePath."otkaz.png' ></a>";                                  
                         $itemAction="-"; 
                         $itemQuantity=$basketProps['QUANTITY'];
                   break;
                   case 3 : // $itemStatus = "Склад"; 
                      $itemStatus = "<img title='Склад  {$basketProps['ITEMSTATUSQUANTITY']} шт.' src='".$imagePath."sklad.png'>";
                      $itemQuantity=$basketProps['QUANTITY'];
                      $itemAction="-";                         
                    break;
                    case 4 : // $itemStatus = "Отгружен"; 
                     $itemStatus = "<img title='Отгружен-{$basketProps['ITEMSTATUSQUANTITY']} шт.' src='".$imagePath."otgruzhen.png'>";
                      $itemQuantity=$basketProps['QUANTITY'];
                      $itemAction=$basketProps['ITEMSTATUSQUANTITY'];                         
                       //itemStatus = "Отгружен";
                    break;
                    case 5: ////itemStatus = "В пути"; 
                      if ($basketProps["DELIVERYMETHODTOUA"]=="air")
                      {
                          $itemStatus = "<img title='В Пути, доставка воздухом' style='width:25px;height:18px;' src=' ".$imagePath."method_air.png'>";
                      } elseif($basketProps["DELIVERYMETHODTOUA"]=="sea")
                      {    $itemStatus = "<img title='В Пути, доставка морем' style='width:25px;height:18px;' src=' ".$imagePath."method_sea.png'>";
                          
                      }  else
                      {
                         $itemStatus = "<img title='В Пути' src=' ".$imagePath."v_puti.png '>"; 
                      }
                      
                      $itemQuantity=$basketProps['QUANTITY']; 
                     if ($basketProps["WAREHOUSEDATE"]!="")
                      { 
                      $itemAction="<img title='дата ожидания ".FormatOrderDate($basketProps["WAREHOUSEDATE"])."' src='".$imagePath."date_come.gif'>"; 
                      } else
                     {
                        $itemAction="-"; 
                      }                           
                     break;
                   default:
                      $itemStatus="-";                                  
                      $itemAction="-"; 
                   break;
                    
                   
               }
               switch ($statusID2)
               {   
                   case 0: // $itemStatus = "В работе";  
                    //$itemAction.="<a  href='####' id='{$ID}'><img onclick=\"ItemStatusChangeQuery({$basketProps["ID"]},2)\" title='Снять с заказа' src='".$imagePath."user_button_cancel.png'></a>";  
                     
                     $itemStatusName=GetItemStatusNameByID(0);
                     $itemStatus.="<a><img title='".$itemStatusName."-".$basketProps['ITEMSTATUSQUANTITY2']."шт.'  src='".$imagePath."v_rabote.png'></a>";
                    // $itemQuantity="<span id='{$ID}'class='minus'>-</span><input disabled='disabled' type='text' value='{$itemQuantity}' size='1'/><span id='{$ID}' class='plus'>+</span>";
                   break;
                    case 70: // $itemStatus = "Отложен";  
                     $itemAction.="<a  href='####' id='{$ID}'><img onclick=\"ItemStatusChangeQuery({$basketProps["ID"]},2)\" title='Снять с заказа' src='".$imagePath."user_button_cancel.png'></a>";  
                    # $itemAction.="<br><a href='####' ><img src='".$imagePath."privat_24.png'></a>";
                     $itemStatusName=GetItemStatusNameByID(7);
                     $itemStatus.="<a><img title='".$itemStatusName."' style='width:15px;height:15px;' src='".$imagePath."otlozhen.png'></a>";
                     $itemStatus.="<br><a href='/personal/privatbank/privat24.php' target='_blank' ><img style='width:15px;height:15px;' title='оплатить по Приват 24' src='".$imagePath."privat_24.png'></a>"; 
                     $itemStatus.="<a href='/personal/privatbank/liqpay.php' target='_blank' ><img style='width:15px;height:15px;' title='оплатить по LiqPay' src='".$imagePath."Liq_pay.png'></a>";  
                    // $itemQuantity="<span id='{$ID}'class='minus'>-</span><input disabled='disabled' type='text' value='{$itemQuantity}' size='1'/><span id='{$ID}' class='plus'>+</span>";
                   break;
                   case 1:# $itemStatus = "Выкуплен"; 
                        $itemStatusName=GetItemStatusNameByID(1);
                        $itemStatus.="<a><img title='".$itemStatusName." ".$basketProps['ITEMSTATUSQUANTITY2']." шт.' src='".$imagePath."vykuplen.png'></a>";                                   
                       # if ($basketProps["WAREHOUSEDATE"]!="")
                        #  { 
                        #  $itemAction.="<img title='дата ожидания ".FormatOrderDate($basketProps["WAREHOUSEDATE"])."' src='".$imagePath."date_come.gif'>"; 
                        #  } else
                       #  {
                       #   $itemAction.=$basketProps["QUANTITY"]; 
                      #    }                           
                        
                       // $itemQuantity.=$basketProps["QUANTITY"];
                   break;
                   case 2:  // $itemStatus = "Отказ";
                         $itemStatusName=GetItemStatusNameByID(2);                                 
                         $itemStatus.="<a><img title='".$itemStatusName."-".$basketProps['ITEMSTATUSQUANTITY2']."шт.' src='".$imagePath."otkaz.png' ></a>";                                  
                         $itemAction.=""; 
                         //$itemQuantity.=$basketProps['QUANTITY'];
                   break;
                   case 30 : // $itemStatus = "Склад"; 
                      $itemStatus .= "<img title='Склад  {$basketProps['ITEMSTATUSQUANTITY']} шт.' src='".$imagePath."sklad.png'>";
                      $itemQuantity.=$basketProps['QUANTITY'];
                      $itemAction.="-";                         
                    break;
                    case 40 : // $itemStatus = "Отгружен"; 
                     $itemStatus .= "<img title='Отгружен' src='".$imagePath."otgruzhen.png'>";
                      $itemQuantity.=$basketProps['QUANTITY'];
                      $itemAction.="-";                         
                       //itemStatus = "Отгружен";
                    break;
                    case 50: ////itemStatus = "В пути"; 
                      if ($basketProps["DELIVERYMETHODTOUA"]=="air")
                      {
                          $itemStatus .= "<img title='В Пути, доставка воздухом' style='width:25px;height:18px;' src=' ".$imagePath."method_air.png'>";
                      } elseif($basketProps["DELIVERYMETHODTOUA"]=="sea")
                      {    $itemStatus.= "<img title='В Пути, доставка морем' style='width:25px;height:18px;' src=' ".$imagePath."method_sea.png'>";
                          
                      }  else
                      {
                         $itemStatus .= "<img title='В Пути' src=' ".$imagePath."v_puti.png '>"; 
                      }
                      
                      $itemQuantity=$basketProps['QUANTITY']; 
                     if ($basketProps["WAREHOUSEDATE"]!="")
                      { 
                      $itemAction.="<img title='дата ожидания ".FormatOrderDate($basketProps["WAREHOUSEDATE"])."' src='".$imagePath."date_come.gif'>"; 
                      } else
                     {
                        $itemAction.="-"; 
                      }                           
                     break;
                   default:
                     $itemStatus.="";                                  
                      $itemAction.=""; 
                  break;
                    
                   
               }   
              
           } 
           if (isset($basketProps['SHIPPING_DOCUMENT']))
           {
              if($basketProps['SHIPPING_DOCUMENT']['DECLARATION_ID']!="") 
              {
                  $itemStatus.="<a target='_blank' href=\"/autodoc/declaration_detail.php?ID=".$basketProps['SHIPPING_DOCUMENT']['DECLARATION_ID']."\"><img title='Декларация Отгрузки' style='width:16px;height:16px' src='".$imagePath."shipping_document.png'></a>" ; 
              } 
               
              elseif($basketProps['SHIPPING_DOCUMENT']['ID']!="") 
              {    
              
              $itemStatus.="<a target='_blank' href='/autodoc/shipping_detail.php?ID={$basketProps['SHIPPING_DOCUMENT']['ID']}'><img title='Расходгая Накладная' style='width:16px;height:16px' src='".$imagePath."shipping_document.png'></a>" ; 
              }
              
               
           }
        # var_dump($itemQuantity);
}
function RecieveStatusActionColumnsContent($basketProsArray,$status_ID,$status2_ID=false)
{
    
   foreach ($basketProsArray as $basketProps)
   {
    
     
       
            $imagePath = "http://".$_SERVER["SERVER_NAME"]."/personal/order/images/"; 
            switch($basketProps["ITEMSTATUS"])
                         {
                             
                              case 10:   // $itemStatus = "В работе";
                                   if (defineItemStatusChangeQuery($basketProps["ITEMSTATUSCHANGEQUERY"],2)=="?")
                                   {
                                     $itemStatus="";                                                              
                                     $itemAction="<a><img  title='ожидание подтверждения отказа' src='".$imagePath."user_deny_wait.png'></a>";  
                                       
                                   } elseif (defineItemStatusChangeQuery($basketProps["ITEMSTATUSCHANGEQUERY"],2)=="X")
                                   {
                                      $itemStatusName=GetItemStatusNameByID(0);
                                      $itemStatus="<a><img title='".$itemStatusName."' src='".$imagePath."v_rabote.png'></a>"; 
                                      $itemAction=$basketProps["QUANTITY"]; 
                                       
                                   } elseif (defineItemStatusChangeQuery($basketProps["ITEMSTATUSCHANGEQUERY"],2)==="2")
                                   {
                                        $itemStatusName="Отказ пользователя";                                 
                                        $itemStatus="<a><img title='".$itemStatusName."' src='".$imagePath."user_deny.png'></a>";                                  
                                        $itemAction="-"; 
                                   }  else
                                   {
                                       $itemAction="<a href='#'><img onclick=\"ItemStatusChangeQuery({$basketProps["ID"]},2)\" title='Снять с заказа' src='".$imagePath."user_button_cancel.png'></a>";  
                                        $itemStatusName=GetItemStatusNameByID(0);
                                       $itemStatus="<a><img title='".$itemStatusName."' src='".$imagePath."v_rabote.png'></a>";
                                   }
                                  # if (defineItemStatusChangeQuery($basketProps["ITEMSTATUSCHANGEQUERY"],0)==="0")
                                   #{
                                   #    var_dump(defineItemStatusChangeQuery($basketProps["ITEMSTATUSCHANGEQUERY"],0));
                                        #$itemAction.="<a href='#'><img onclick=\"ItemStatusChangeQuery({$basketProps["ID"]},2)\" title='Снять  с заказа' src='".$imagePath."user_button_cancel.png'></a>";  
                                  # }  
                              break;
                              case 0:
                                  global $itemStatus;                                                              
                                  global $itemAction;
                                  StatusShow($basketProps,0, $itemStatus,  $itemAction);
                                 # var_dump($itemStatus);   
                              break;
                              case 1 :     # $itemStatus = "Выкуплен";
                                      $itemStatusName=GetItemStatusNameByID(1);
                                      $itemStatus="<a><img title='".$itemStatusName."' src='".$imagePath."vykuplen.png'></a>";                                   
                                      $itemAction=$basketProps["QUANTITY"];  #vykuplen.png
                                      if (defineItemStatusChangeQuery($basketProps["ITEMSTATUSCHANGEQUERY"],2)==="2")
                                       {
                                            $itemStatusName="Отказ пользователя";                                 
                                            $itemStatus="<a><img title='".$itemStatusName."' src='".$imagePath."user_deny.png'></a>";                                  
                                            $itemAction="-"; 
                                       } 
                              break;

                              case 20 :   // $itemStatus = "Отказ";
                                    if (isset( $basketProps["ITEMSTATUSCHANGEQUERY"] ) && $basketProps["ITEMSTATUSCHANGEQUERY"]!="") 
                                    {
                                        $statusChange=defineItemStatusChangeQuery($basketProps["ITEMSTATUSCHANGEQUERY"],2);    
                                       # var_dump($statusChange);
                                    } else
                                    {
                                        $statusChange=false;
                                    }
                                    if ($statusChange==false)
                                    {
                                      $itemStatusName=GetItemStatusNameByID(2);                                 
                                      $itemStatus="<a><img title='".$itemStatusName."' src='".$imagePath."otkaz.png'></a>";                                  
                                      $itemAction=""; 
                                    } elseif ($statusChange==$basketProps["ITEMSTATUS"])
                                    {
                                      $itemStatusName="Отказ пользователя";                                 
                                      $itemStatus="<a><img title='".$itemStatusName."' src='".$imagePath."otkaz.png'></a>";                                  
                                      $itemAction="";   
                                        
                                    }  elseif ($statusChange=="?")
                                    {
                                        
                                        $itemAction="<a><img  title='ожидание подтверждения отказа' src='".$imagePath."user_button_cancel.png'></a>";  
                                    }
                                     
                                     
                                                        
                              break;
                              case 2:   // $itemStatus = "Отказ";   
                                     if (defineItemStatusChangeQuery($basketProps["ITEMSTATUSCHANGEQUERY"],2)=="?")
                                     {
                                      $itemStatus="";                                                              
                                      $itemAction="<a><img  title='ожидание подтверждения отказа' src='".$imagePath."user_deny_wait.png'></a>";   
                                     }elseif (defineItemStatusChangeQuery($basketProps["ITEMSTATUSCHANGEQUERY"],2)==="2")   
                                     {
                                          $itemStatusName="Отказ пользователя";                                 
                                        $itemStatus="<a><img title='".$itemStatusName."' src='".$imagePath."user_deny.png'></a>";                                  
                                        $itemAction="-"; 
                                     } 
                                     else
                                     {
                                         $itemStatusName=GetItemStatusNameByID(2);                                 
                                         $itemStatus="<a><img title='".$itemStatusName."' src='".$imagePath."otkaz.png'></a>";                                  
                                         $itemAction="-"; 
                                     }
                              break;
                              case 3 :
                                    $itemStatus = "Склад";                         
                              break;

                              case 4 :
                                   $itemStatus = "Отгружен";
                              break;
                              case 5:
                                $itemStatus = "В пути";
                              break;
                              case 6 :
                                 $itemStatus = "СкладДонецк";
                              break;
                              default:
                                   $itemStatus="-";
                              break;

                         }
            
             
            $item[0]=$itemStatus;
            $item[1]=$itemAction;
            return $item;
    }  
     
}
 function defineItemStatusChangeQuery($value,$statusID)
    {
        #global $DB;
        #$sql="SELECT * FROM b_sale_basket_prop WHERE BASKET_ID={$basketID} AND CODE='ItemStatusChageQuery'" ;
        
        if ($value=="")
        {
            return false;
        }
        $arrayValue=explode("#",$value);
        if (count($arrayValue)!=2)
        {
           return false; 
        }
        
        $queryStatus=$arrayValue[0];
        $answerStatus=$arrayValue[1];
        if (intval($queryStatus)!=$statusID)
        {
            return false;
        }
        
        if ($answerStatus=="?")
        {
             return "?" ;
            
            
        }elseif ($answerStatus=="X")
        {
             return "X";
            
            
        }  
        elseif($queryStatus==$answerStatus)
        {
            
          return $queryStatus;
            
        }
        
        
    }
 function defineQuantityChangeStatus($value)
 {
      if ($value=="")
        {
            return false;
        }
        $arrayValue=explode("#",$value);
        if (count($arrayValue)!=2)
        {
           return false; 
        }
        
        $queryStatus=$arrayValue[0];
        $answerStatus=$arrayValue[1];
        if ($answerStatus=="?")
        {
             return "?" ;
            
            
        }elseif ($answerStatus=="X")
        {
             return "X";
            
            
        }  
        elseif($queryStatus==$answerStatus)
        {
            
          return $queryStatus;
            
        }
 }   
 function defineRegion($arRegions,$orderID)
 {
      if ($arRegions[GetRegionCodeForOrder($orderID)]["ShortName"]=='JPNA')
               {
                   return 'Япония';
               } 
               elseif($arRegions[GetRegionCodeForOrder($orderID)]["ShortName"]=='UAE')
               {
                   return 'Эмираты'; 
               }
                elseif($arRegions[GetRegionCodeForOrder($orderID)]["ShortName"]=='UAE_2')
               {
                   return 'Эмираты'; 
               }
               elseif($arRegions[GetRegionCodeForOrder($orderID)]["ShortName"]=='DE')
               {
                   return 'Германия'; 
               }
                elseif($arRegions[GetRegionCodeForOrder($orderID)]["ShortName"]=='DE_2')
               {
                   return 'Германия'; 
               }
               elseif($arRegions[GetRegionCodeForOrder($orderID)]["ShortName"]=='USA')
               {
                   return 'США'; 
               }
                elseif($arRegions[GetRegionCodeForOrder($orderID)]["ShortName"]=='PL')
               {
                   return 'Польша'; 
               }
                elseif($arRegions[GetRegionCodeForOrder($orderID)]["ShortName"]=='EU')
               {
                   return 'Европа'; 
               }
               elseif($arRegions[GetRegionCodeForOrder($orderID)]["ShortName"]=='Склад')
               {
                   return 'Склад'; 
               }
               else
               {
                   #echo $arRegions[GetRegionCodeForOrder($val["ORDER"]["ID"])]["ShortName"];
                  return 'Украина';
               }
            
 }
 function defineIsReturnable($isReturnableID)
 {
     if ($isReturnableID==1) return "<img title='Возвратная позиция' src='/personal/order/images/is_returnable.png'>";
     elseif ($isReturnableID==0)    return "<img  title='Не возвратная позиция' src='/personal/order/images/isnot_returnable.png'>" ; 
     else return "";  
 }
?></td>
	</tr>
	<!--<tr>
		<td><?=GetMessage("SPOL_T_F_STATUS")?>:</td>
		<td><select name="filter_status">
				<option value=""><?=GetMessage("SPOL_T_F_ALL")?></option>
				<?
				foreach($arResult["INFO"]["STATUS"] as $val)
				{

						?><option value="<?echo $val["ID"]?>"<?if($_REQUEST["filter_status"]==$val["ID"]) echo " selected"?>>[<?=$val["ID"]?>] <?=$val["NAME"]?></option><?

				}
				?>
		</select></td>
	</tr> -->
    <tr>
        <td><?="Статус позиции"?>:</td>
        <td><select name="filter_itemstatus">
                <option value=""><?=GetMessage("SPOL_T_F_ALL")?></option>
                <?
                foreach($arResult["INFO"]["ITEMSTATUS"] as $key=>$val)
                {

                        ?><option value="<?echo $key?>"<?if($_REQUEST["filter_itemstatus"]==$key && $_REQUEST["filter_itemstatus"]!="") echo " selected"?>> <?=$val?></option><?

                }                                                                                                                                             
                ?>
        </select></td>
    </tr>
	<tr>
		<th colspan = "2">
			<input type="submit" name="filter" value="<?=GetMessage("SPOL_T_F_SUBMIT")?>">&nbsp;&nbsp;
			<input type="submit" name="del_filter" value="<?=GetMessage("SPOL_T_F_DEL")?>">
		</th>
	</tr>
</table>
</form>
<br />
<script>
 function  OpenDetailHere(IDn)
  {
     if ($("#heredetail"+IDn).css("display")=="none" )
     {
     $("#td"+IDn).css("background","#ADC3D5");     
     $("#heredetail"+IDn).css("display","block"); 
     
     params={
         HereDetail:'YES',
         ID:IDn,
           };
     urlQueryAjax = '/personal/order/index_new.php';
                   $.get(urlQueryAjax, params, function(data)
                   {
                   
                    $('#heredetail'+IDn).html(data);
                   
                   
                   });      
       }
       else
       {
          $("#td"+IDn).css("background","#E0E0E0"); 
          $("#heredetail"+IDn).css("display","none");
          $("#heredetail"+IDn).html(''); 
       }    
 }
 $("a").live("click",function(){
      if ($(this).attr("href")=="###")
      { 
         BASKET_ID=$(this).attr("id");
    // alert(BASKET_ID); 
       QUANTITY=$("#i"+BASKET_ID).val(); 
       OLD_QUANTITY=$("#f"+BASKET_ID).val(); 
      //alert(QUANTITY); 
          if (QUANTITY==OLD_QUANTITY )
          {
              return false;
          }
          if (QUANTITY!='0' && QUANTITY!=0 && QUANTITY!='' )
         {
          QuantityChangeQuery(BASKET_ID,QUANTITY); 
          img=$(this).find('img');
          img.attr("src","/personal/order/images/user_wait.png");
          $(this).attr("href","#");
          $(".plus").css("display","none");
          $(".minus").css("display","none");  
          
         // return false;
         } 
     } else if ($(this).attr("href")=="####")
     {
          img=$(this).find('img');
          img.attr("src","/personal/order/images/user_deny_wait.png");
          img.attr("title","ожидание подтверждения отказа");
          $(this).attr("href","#");
          var $plus=$(this).parent().parent().find('.plus');
          var $minus=$(this).parent().parent().find('.minus'); 
          $plus.css("display","none");
          $minus.css("display","none");
          //$(".minus").css("display","none");    
     }
  });
</script>
<?if(strlen($arResult["NAV_STRING"]) > 0):?>
	<p class="navstring"><?=$arResult["NAV_STRING"]?></p>
<?endif;

#var_dump ($arResult["ORDERS"]);
?>
<br>
<table class="sale-personal-order-list-new data-table">
     <tr>
         <th style='width:5%;'><?=GetMessage("SPOL_T_ID")?><br /><?=SortingEx("ID")?></th>
         <th style='width:10%;'><?=GetMessage("SPOL_T_F_DATE")?><br /><?=SortingEx("DATE_STATUS")?></th>
         <th style='width:7%;'><?=GetMessage("SPOL_T_F_BRAND")?><br /><?#=SortingEx("BRAND")?></th> 
          <th style='width:10%;'><?="Регион"?><br /><?#=SortingEx("BRAND")?></th>  
         <th style='width:10%;'> <?=GetMessage("SPOL_T_F_ARTICLE")?> <br /><?#=SortingEx("ARTICLE")?></th>
         <th style='width:25%;'><?=GetMessage("SPOL_T_F_CAPTION")?><br /><?#=SortingEx("NAME")?></th> 
         <th style='width:12%;'><?=GetMessage("SPOL_T_F_QUANTITY")?><br /><?#=SortingEx("NAME")?></th>  
         <th style='width:7%;' ><?=GetMessage("SPOL_T_PRICE")?><br /><?=SortingEx("PRICE")?></th> 
         <th style='width:7%;' ><?=GetMessage("SPOL_T_SUM")?><br /><?#=SortingEx("PRICE")?></th> 
         <th style='width:5%;'><?="Дей-е"?><br /><?=SortingEx("STATUS_ID")?></th> 
        <th style='width:5%;'><?="Сост"?><br /><?=SortingEx("STATUS_ID")?></th>
     </tr>
     <?
      foreach ($arResult["ORDERS"] as $val)
      {    
         
    
    
     ?>  
           
        
            <?
            foreach ($val["BASKET_ITEMS"] as $itemProps)
             {
                   if ($background=="transparent none repeat scroll 0%")
                          {
                             $background="#F0F0F0"; 
                          } elseif($background=="#F0F0F0") 
                          {
                              $background="transparent none repeat scroll 0%";
                          }  else
                          {
                               $background="transparent none repeat scroll 0%";
                          }
            ?>
            <tr style="background:<?=$background?>;"> 
              <td >               
                 <a style="color: black;" href="<?$_SERVER["DOCUMENT_ROOT"]?>/personal/order/index.php?ID=<?=$val["ORDER"]["ID"]?>"><?=$val["ORDER"]["ID"]?></a>
              </td>
               <td>
                  <?=FormatOrderDate($val["ORDER"]["DATE_INSERT"])?>
                  <input type="hidden" name='basketID' value="<?=$itemProps["ID"]?>">
               </td>
               <td style="font-size: 11px;">
                  <?=FindBrandName($itemProps["BRAND"])?>
               </td>
               <td>
                  <strong> <?=defineRegion($arRegions,$val["ORDER"]['ID']);?>  </strong> <br>
                     <?=defineIsReturnable(intval($itemProps["ISRETURNABLE"]))?>
               </td>
               <td>   
                 <strong> <?=$itemProps["ARTICLE"]?></strong>
               </td>
               <td style="font-size: 12px;">
                   <?=$itemProps["NAME"]?>
               </td>
                 <?
                   global $itemStatus,$itemAction,$itemQuantity;
               
                  StatusShow($itemProps,$itemStatus,$itemAction,$itemQuantity);
                 
                 ?>
               
               <td>
                  <?=$itemQuantity;#=$itemProps["QUANTITY"]?>
               </td>
               <td>
                   <?=$itemProps["PRICE_FORMATED"]?>
               </td>
               <td>
                   <?=$itemProps["SUM_FORMATED"]?>
               </td>
               <?
                 
                # $itemActionProps=RecieveStatusActionColumnsContent($val["BASKET_ITEMS"],$itemProps["ITEMSTATUS"]);
                # global $itemStatus,$itemAction;
               
                 # StatusShow($itemProps,$itemStatus,$itemAction);
               
               
               ?>
               <td>
               
                     <?
                        $regionCode=GetRegionCodeForOrder($val["ORDER"]["ID"]);
                        if (($itemProps["ITEMSTATUS"]==1 && $regionCode<5) ||  ($itemProps["ITEMSTATUS"]==1 && $regionCode>900 && $regionCode<=1000 ))
                        {
                          echo "";  
                        }  else
                        {
                          echo  $itemAction;  
                        }    
                     ?>
                    <?#=$itemAction;#=$itemActionProps[1]?> 
               </td>
               <td>
                  <?=$itemStatus;#=$itemActionProps[0];#=GetItemStatusNameByID($itemProps["ITEMSTATUS"])?> 
               </td>
             </tr> 
            
             <?
             }
             ?>
            
          
            
     <?
      }
     ?>   
</table>
<table style="display:none;" class="sale-personal-order-list data-table">
	<tr>
		<th style='width:25%;'><?=GetMessage("SPOL_T_ID")?><br /><?=SortingEx("ID")?></th>
		<th style='width:15%;' ><?=GetMessage("SPOL_T_PRICE")?><br /><?=SortingEx("PRICE")?></th>
		<th style='width:25;'><?=GetMessage("SPOL_T_STATUS")?><br /><?=SortingEx("STATUS_ID")?></th>
		<th style='width:15%;'><?=GetMessage("SPOL_T_BASKET")?><br /></th>
		<th style='width:20%;'>Регион/<br>Заказанное количество</th>
	</tr>
	<? #var_dump ($arResult["ORDERS"]);
    foreach($arResult["ORDERS"] as $val):?>
		<tr id="td<?=$val["ORDER"]["ID"]?>">                                                                                               <?#href="=$val["ORDER"]["URL_TO_DETAIL"]?>
			<td style='width:25%;'><b><a style='color:#25639A;' title="<?=GetMessage("SPOL_T_DETAIL_DESCR")?>" onclick="OpenDetailHere(<?=$val["ORDER"]["ID"]?>)" ><?=$val["ORDER"]["ID"]?></a></b><br /><?=GetMessage("SPOL_T_FROM")?> <?=$val["ORDER"]["DATE_INSERT_FORMAT"]?></td>
			<td style='width:15%;'> <?=$val["ORDER"]["FORMATED_PRICE"]?> </td>
			<td style='width:25%;'><?php 
				$statusOrderStr = str_ireplace('Подтвержден','В работе',$arResult["INFO"]["STATUS"][$val["ORDER"]["STATUS_ID"]]["NAME"]);
				echo $statusOrderStr;
				?>
				<br /><?=$val["ORDER"]["DATE_STATUS"]?>
			</td>
			<td style='width:15%;'><?
				$bNeedComa = False;

				$arStatuses = Array();

				foreach($val["BASKET_ITEMS"] as $vval)
				{
					$arStatuses[] = $vval["ITEMSTATUS"];
				}


				$arStatuses = array_unique($arStatuses);

                $imagePath = "http://".$_SERVER["SERVER_NAME"]."/personal/order/images/";
                if ($statusOrderStr == 'Отложен')
                {
                	$itemStatus = "<img src='{$imagePath}otlozhen.png' title='Отложен' height='16' />";
                	echo $itemStatus;
                }
                elseif ($statusOrderStr == 'Рассматривается')
                {
                	$itemStatus = "<img src='{$imagePath}binokl.png' title='Рассматривается' height='16' />";
                	echo $itemStatus;
                }
				else 
				{
					foreach( $arStatuses as $v )
					{
	                     switch( $v)
	 
				  	       {
				  	       	 case 0 :/*В работе*/
				  	       	    $itemStatus = "<img src='{$imagePath}v_rabote.png' title='В работе' height='16' />";
				  	            break;
	
				  	       	 case 1 :/*Выкуплен*/
				  	       	    $itemStatus = "<img src='{$imagePath}vykuplen.png' title='Выкуплен' height='16' />";
				  	            break;
	
				  	       	 case 2 :/*Отказ*/
				  	       	    $itemStatus = "<img src='{$imagePath}otkaz.png' title='Отказ' height='16' />";
				  	            break;
	
				  	       	 case 3 :/*Склад*/
				  	       	    $itemStatus = "<img src='{$imagePath}sklad.png' title='Склад' height='16' />";
				  	            break;
	
				  	       	 case 4 :/*Отгружен*/
				  	       	    $itemStatus = "<img src='{$imagePath}otgruzhen.png' title='Отгружен' height='16' />";
				  	            break;
	                         case 5:/*В пути*/
	                            $itemStatus = "<img src='{$imagePath}v_puti.png' title='В пути' height='16' />";
	                            break;
				  	       }
	
	                      //echo "<Иконка для статуса товара : ".$itemStatus."><br>";
	                      echo $itemStatus."<br />";
					}
				}

			?></td>
			<td style='width:20%;'><?#= $arRegions[GetRegionCodeForOrder($val["ORDER"]["ID"])]["ShortName"]; ?>
            <? if ($arRegions[GetRegionCodeForOrder($val["ORDER"]["ID"])]["ShortName"]=='JPNA')
               {
                   echo 'Япония';
               } 
               elseif($arRegions[GetRegionCodeForOrder($val["ORDER"]["ID"])]["ShortName"]=='UAE')
               {
                   echo 'Эмираты'; 
               }
               elseif($arRegions[GetRegionCodeForOrder($val["ORDER"]["ID"])]["ShortName"]=='DE')
               {
                   echo 'Германия'; 
               }
               elseif($arRegions[GetRegionCodeForOrder($val["ORDER"]["ID"])]["ShortName"]=='USA')
               {
                   echo 'США'; 
               }
                elseif($arRegions[GetRegionCodeForOrder($val["ORDER"]["ID"])]["ShortName"]=='PL')
               {
                   echo 'Польша'; 
               }
               elseif($arRegions[GetRegionCodeForOrder($val["ORDER"]["ID"])]["ShortName"]=='Склад')
               {
                   echo 'Склад'; 
               }
               else
               {
                   #echo $arRegions[GetRegionCodeForOrder($val["ORDER"]["ID"])]["ShortName"];
                  echo 'Украина';
               }
            ?>
			</td>

		</tr>
	     <tr> 
         
         <?
        echo "<td colspan='5' style='width:400px; padding:0;'><div style='display:none;  z-index:9999;' id=heredetail".$val["ORDER"]["ID"]."></div></td>";
        echo"
           <script>
              OpenDetailHere({$val["ORDER"]["ID"]}); 
           </script>
        
        
        "; 
         
         ?>  

         </tr>
         <?        
         #echo "<div style='display:none; position:relative; z-index:9999;' id=heredetail".$val["ORDER"]["ID"]."></div>";
         ?>
    <?endforeach;?>
</table>
<?if(strlen($arResult["NAV_STRING"]) > 0):?>
	<p class="navstring"><?=$arResult["NAV_STRING"]?></p>
<?endif?>