<?php

   require($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');
   $APPLICATION->SetTitle("Список документов");
    global $USER ;
    //-------------------------------------------------------------
       function OrderProperty ($BasketId)
       {
            global $USER ;
            global $DB;
            CModule::IncludeModule("sale"); CModule::IncludeModule('iblock');
           # $OrderProp=array();
            $BusketProp=CSaleBasket::GetPropsList(
            
                       array(
                       "SORT" => "ASC",
                        "NAME" => "ASC"
                         ),
                     array(
                           "BASKET_ID"=>$BasketId
                           )
                      );
           
            while( $BusketPropR=$BusketProp->Fetch())
             {     
                  #print_r($BusketPropResult);
                   #$BusketIDArray[]=$BusketPropResult['BASKET_ID'];
                   
                  if($BusketPropR['CODE']=='RegionCode') $OrderProp['RegionCode']=$BusketPropR['VALUE'];
                  elseif ($BusketPropR['CODE']=='ItemStatus') $OrderProp['ItemStatus']=$BusketPropR['VALUE'];    
                                   
                             
             } 
             
             #print_r($OrderProp);
             $sql="SELECT PROPERTY_92 AS RegionCode, PROPERTY_93 AS RegionNumber , PROPERTY_94 AS RegionName FROM  b_iblock_element_prop_s17 
             WHERE PROPERTY_92='{$OrderProp['RegionCode']}'";
             
             $ResultRegion=$DB->Query($sql);
             $Region=$ResultRegion->Fetch();
             if ($OrderProp['ItemStatus']=='0')  $Region['ItemStatus']='В работе';
              elseif ($OrderProp['ItemStatus']=='1')  $Region['ItemStatus']='Выкуплен';
              elseif ($OrderProp['ItemStatus']=='2')  $Region['ItemStatus']='Отказ';
              elseif ($OrderProp['ItemStatus']=='3')  $Region['ItemStatus']='Склад';
              elseif ($OrderProp['ItemStatus']=='4')  $Region['ItemStatus']='Отгружен';
              elseif ($OrderProp['ItemStatus']=='5')  $Region['ItemStatus']='В Пути';
              else $Region['ItemStatus']='нео';
              
             if ($Region['RegionCode']<=4 || ($Region['RegionCode']>900 && $Region['RegionCode']<=1000))
             {
                 if ($Region['RegionNumber']=="")
                 $Region['Name']="";
                 else 
                 $Region['Name']=$Region['RegionNumber']; 
             } 
 
              else $Region['Name']='УКРАИНА';
            
              #print_r($Region);
          return   $Region; 
           
       }            
                          
                             
          
          
          
    //--------------------------------------------------------------      
    
function GetUserID_1CByID( $ID )
{

  global $DB;
  $sql = "SELECT ID_1C FROM b_user WHERE ID='".$ID."'";

  $res = $DB->Query( $sql );

  if( $arRes = $res->Fetch() )
    return $arRes["ID_1C"];
  else
    return false;
}            

 $ID1C =GetUserID_1CByID($USER->GetID()  );    
    
    
   if ($_GET['auth']=='no') 
   {
        #require($_SERVER["DOCUMENT_ROOT"].'/personal/profile/index.php') ;       
        # echo 'no' ;    
   }
   if (!$USER->IsAuthorized())
   {  
       die();   
   }
   
   
   
 # $_GET['ItemCode']="0446660120" ;
 #$_GET["filter_date_from"]='01.01.2012';
   if( isset($_REQUEST['ItemCode']) ) 
   {   
      
              if( ! isset( $_REQUEST["filter_date_from"] )   )
              {
                        //  сегодня - 1 месяц
                #$mkDateFrom = date( "d.m.Y" ,mktime(0, 0, 0, date("m")-1, date("d"),   date("Y")) );
                $mkDateFrom = mktime(0, 0, 0, date("m"), date("d"),   date("Y")-1);
                
                $dateLineBegin=date("Y-m-d h:i:s",$mkDateFrom);
              }
              else
              {
                $dateFrom = $_GET["filter_date_from"];
                $arDateFrom = explode(".", $dateFrom);
                $mkDateFrom = mktime(0, 0, 0, $arDateFrom[1], $arDateFrom[0], $arDateFrom[2]);
                $dateLineBegin=date("Y-m-d h:i:s",$mkDateFrom);  
                $TimeCheckDate= mktime(0,0,0,1,1,2012);
                if($TimeCheckDate>$mkDateFrom)
                {
                     $dateFrom=  date( "d.m.Y" ,mktime(0,0,0,1,1,2012)); 
                     $arDateFrom = explode(".", $dateFrom);
                     $mkDateFrom = mktime(0, 0, 0, $arDateFrom[1], $arDateFrom[0], $arDateFrom[2]);
                     $dateLineBegin=date("Y-m-d h:i:s",$mkDateFrom);
                } 
                
               // var_dump($dateLineBegin);
                
              }  
              
              if( ! isset( $_REQUEST["filter_date_to"] )   )
              {
                        //  сегодня
                $dateTo = date( "d.m.Y" );
              }
            else
              {
                $dateTo = $_REQUEST["filter_date_to"];
              }

                
       
       
       
    CModule::IncludeModule("sale"); CModule::IncludeModule('iblock');
   # echo CSaleBasket::GetBasketUserID(); 
    $ItemCode= preg_replace("/[^A-Za-z0-9]*/i", "",  $_REQUEST['ItemCode']); 
    
   # $BusketPosition=CSaleBasket::GetList(
      #               array(
      #          "NAME" => "ASC",
      #          "ID" => "ASC"
      #          )
        
      #  );
    #  while ($BusketPositionResult=$BusketPosition->Fetch())
    #  {
  if ($_REQUEST['GETORDERS'])
  {
      
               
   $BusketProp=CSaleBasket::GetPropsList(
            
     array(
       "SORT" => "ASC",
        "NAME" => "ASC"
         ),
     array(
           "VALUE"=>$ItemCode,           
           )
       );
            
    while( $BusketPropResult= $BusketProp->Fetch())
     {
           $BusketIDArray[]=$BusketPropResult['BASKET_ID'];                
                     
     } 
     
     # }
     $OrderCol=0;
  foreach($BusketIDArray as $IDofBusket) 
  {
     # print_r($IDofBusket);
       $BusketPosition=CSaleBasket::GetList(
                 array(
            "NAME" => "ASC",
            "ID" => "ASC",
           
            ),
             
        array(
            "ID"=>$IDofBusket,
            ">=DATE_INSERT"=>$dateLineBegin, 
              
            ),
            false,
              false,
               array()
    );
          $OrderProps= OrderProperty ($IDofBusket); 
         # print_r($OrderProps);
         
          while ($BusketPositionResult=$BusketPosition->fetch())
          {      
                 
                 $Order=CSaleOrder::GetByID($BusketPositionResult['ORDER_ID']);
                 #print_r($BusketPositionResult);
                 if ($Order['USER_ID']== $USER->GetID())
                 {
                  $OrderDateArr=explode(' ',$Order['DATE_INSERT']);
                  $OrderDateStr=explode('-',$OrderDateArr[0]) ;  //Y M D
                  $OrderDate=mktime(0,0,0,$OrderDateStr[1],$OrderDateStr[2],$OrderDateStr[0]);  //m d y
                  $newOrderDate=date( "d.m.Y",$OrderDate);
                  if($OrderDate>$mkDateFrom) 
                  {  
                          $OrderToShow[$Order['ID']]['ORDER_ID']=$BusketPositionResult['ORDER_ID'];
                         # $OrderToShow[$Order['ID']]['STATUS_ID']=$Order['STATUS_ID'];
                          $OrderToShow[$Order['ID']]['STATUS_ID'] =$OrderProps['ItemStatus'];
                           $OrderToShow[$Order['ID']]['REGION'] =$OrderProps['Name'];
                         # $OrderToShow[$Order['ID']]['DATE_INSERT']=$Order['DATE_INSERT'];
                           $OrderToShow[$Order['ID']]['DATE_INSERT']=$newOrderDate;
                          $OrderToShow[$Order['ID']]['QUANTITY']=$BusketPositionResult['QUANTITY'];
                          $OrderToShow[$Order['ID']]['PRICE']=$BusketPositionResult['PRICE'] ;
                          $OrderToShow[$Order['ID']]['CURRENCY']=$BusketPositionResult['CURRENCY'];
                          //$OrderIdArray[]= $BusketPositionResult['ORDER_ID'] ;
                          //$OrderArray[]=$Order;
                          $OrderArray["ORDERS"][]=$OrderToShow[$Order['ID']];
                          $OrderCol++; 
                 }
                 }
              #$OrderCol++;   
          }
      
  }
     echo (json_encode($OrderArray ,JSON_UNESCAPED_UNICODE)); 
  }elseif ($_REQUEST["GETSHIPINGS"])
  {
      
  
  
  # var_dump($mkDateFrom);      
   #print_r($OrderDate);
  # print_r($OrderToShow);
   
   #if (count($OrderToShow)>0) $CountOrderToShow=true;
  # else $CountOrderToShow=false;
    
 //---------------------------------------------------------    //    
    
    $arSelect=Array(
           'ID','TIMESTAMP_X','PROPERTY_ShippingID','PROPERTY_BCode','PROPERTY_ICode','PROPERTY_Quantity',
           'PROPERTY_Summ','PROPERTY_Price','PROPERTY_Caption'
    );
    $arFilter = Array(
                    "IBLOCK_ID" =>26,
                    "PROPERTY_ICode"=>$ItemCode,
                    ">=TIMESTAMP_X"=> $dateLineBegin
                    );
                    
                    
    $ShipedItemCodePositionsResult = CIBlockElement::GetList(Array('ID'=>"DESC"), $arFilter, false, false, $arSelect);
    
     $arSelect=Array('ID', 'PROPERTY_Code','PROPERTY_ClientCode','PROPERTY_AgreementCode','PROPERTY_DocumentDate',
     'PROPERTY_CurrencyCode','PROPERTY_DocumentType','PROPERTY_Status','PROPERTY_DeclarationID','PROPERTY_ID1C'); 
     #$arSelect=Array();
      #print_r($ShipedItemCodePositionsResult);
      while ($ShipedItemCodePosition=$ShipedItemCodePositionsResult->Fetch())
      {
          $arSelect=Array('ID', 'PROPERTY_Code','PROPERTY_ClientCode','PROPERTY_AgreementCode','PROPERTY_DocumentDate',
        'PROPERTY_CurrencyCode','PROPERTY_DocumentType','PROPERTY_Status','PROPERTY_DeclarationID','PROPERTY_ID1C');
             #$arSelect=Array(); 
             $arFilter = Array(
                    "IBLOCK_ID" =>25,
                    "ID"=>$ShipedItemCodePosition['PROPERTY_SHIPPINGID_VALUE']
                    
    
                    );
                    #print_r($arFilter);
              $ShipItemResult= CIBlockElement::GetList(Array(), $arFilter, false, false, $arSelect);
              #print_r($ShipItemResult);
             while($ShipItem=$ShipItemResult->Fetch())
        {           
            # print_r($ShipItem);
             #echo"------------------------------------------------------------------------------------------------------------------";
           
            # print_r($ID1C);  
             if ($ShipItem['PROPERTY_CLIENTCODE_VALUE']==$ID1C)
             {     #print_r($ShipItem);           
                  $ShipedDateArr=explode('.',$ShipItem['PROPERTY_DOCUMENTDATE_VALUE']); // d m y
                     # print_r($ShipedDateArr);
                  $ShipedDate=mktime(0,0,0,$ShipedDateArr[1],$ShipedDateArr[0],$ShipedDateArr[2]);//m d y
                # print_r($ShipedDate);
                # print_r($mkDateFrom);
                  if ($ShipItem['PROPERTY_DOCUMENTTYPE_VALUE']=='Реализация товаров и услуг' && $ShipedDate>$mkDateFrom)
                  { 
                     
                      
                      $ShipedToShow[$ShipItem['ID']]['NUMBER']=$ShipItem['PROPERTY_CODE_VALUE'];
                      $ShipedToShow[$ShipItem['ID']]['STATUS']=$ShipItem['PROPERTY_STATUS_VALUE'];
                      $ShipedToShow[$ShipItem['ID']] ['DATE']=$ShipItem['PROPERTY_DOCUMENTDATE_VALUE'];
                      $ShipedToShow[$ShipItem['ID']] ['QUANTITY']=$ShipedItemCodePosition['PROPERTY_QUANTITY_VALUE'];
                      $ShipedToShow[$ShipItem['ID']]['SUMM']=$ShipedItemCodePosition['PROPERTY_SUMM_VALUE'];
                      $ShipedToShow[$ShipItem['ID']]['CURRENCY']=$ShipItem['PROPERTY_CURRENCYCODE_VALUE'];
                      #print_r($ShipedToShow);
                     # $DocShipedToshow[$ShipItem['ID']]['NUMBER']=$ShipItem['PROPERTY_DECLARATIONID_VALUE'];
                     if ($ShipItem['PROPERTY_DECLARATIONID_VALUE']!='')
                     {
                                  $arFilter = Array(
                                "IBLOCK_ID" =>31,
                                 "ID"=>$ShipItem['PROPERTY_DECLARATIONID_VALUE']
            
                                  );
                                  $arSelect=Array('ID','PROPERTY_Receiver','PROPERTY_NumPlace',
                                   'PROPERTY_Deliver','PROPERTY_Number','PROPERTY_Num1c','PROPERTY_Date');
                                 $DocShipedResult= CIBlockElement::GetList(Array(), $arFilter, false, Array(), $arSelect);
                                 $DocShiped=$DocShipedResult->Fetch();
                               
                               $DocShipedToshow[$DocShiped['ID']]['NUMBER']=$DocShiped['PROPERTY_NUMBER_VALUE'];
                               $DocShipedToshow[$DocShiped['ID']]['NUMBERBASE']=$DocShiped['PROPERTY_NUM1C_VALUE'];
                               $DocShipedToshow[$DocShiped['ID']]['DELIVER']=$DocShiped['PROPERTY_DELIVER_VALUE'];
                               $DocShipedToshow[$DocShiped['ID']]['DATE']=$DocShiped['PROPERTY_DATE_VALUE'];
                               $DocShipedToshow[$DocShiped['ID']]['PLACES']=$DocShiped['PROPERTY_NUMPLACE_VALUE'];
                               
                               $DocShipedToshowArr["SHIPINGDOCS"][]= $DocShipedToshow[$DocShiped['ID']];
                               #print_r($DocShipedToshow);
                     }
                     
                     $ShipedToShowArr["SHIPINGS"][]=$ShipedToShow[$ShipItem['ID']];
                     
                      
                  }
                  elseif ($ShipItem['PROPERTY_DOCUMENTTYPE_VALUE']=='Возврат товаров от покупателя' && $ShipedDate>$mkDateFrom )
                  {
                      $BackToShow[$ShipItem['ID']]['NUMBER']=$ShipItem['PROPERTY_CODE_VALUE'];
                      $BackToShow[$ShipItem['ID']]['STATUS']=$ShipItem['PROPERTY_STATUS_VALUE'];
                      $BackToShow[$ShipItem['ID']] ['DATE']=$ShipItem['PROPERTY_DOCUMENTDATE_VALUE'];
                      $BackToShow[$ShipItem['ID']] ['QUANTITY']=$ShipedItemCodePosition['PROPERTY_QUANTITY_VALUE'];
                      $BackToShow[$ShipItem['ID']]['SUMM']=$ShipedItemCodePosition['PROPERTY_SUMM_VALUE'];
                      $BackToShow[$ShipItem['ID']]['CURRENCY']=$ShipItem['PROPERTY_CURRENCYCODE_VALUE'];
                      
                      $BackToShowArr["RETURNS"][]= $BackToShow[$ShipItem['ID']];
                      
                      #print_r($BackToShow);
                      
                  }
                 
             }
           }     
             
             
             #print_r($ShipedItemCodePosition);
             #print_r($ShipItem);  
              
             #var_dump($arFilter) ;
         }
         if  (count($ShipedToShowArr)>0)
         echo (json_encode($ShipedToShowArr ,JSON_UNESCAPED_UNICODE));
         if  (count($DocShipedToshowArr)>0) 
         echo (json_encode($DocShipedToshowArr ,JSON_UNESCAPED_UNICODE));
         if  (count($BackToShowArr)>0) 
         echo (json_encode($BackToShowArr ,JSON_UNESCAPED_UNICODE));      
   } else
   {
        exit();     
   }       
         
   exit();          
         if ($ItemCode!='')  
         {   
        ?>
        <table  id='full_doc_code'>
           <tr align="center">
              <td align="center" >Код Детали:</td>
              <td align="center" ><?=$ItemCode?> </td>
        
            <tr>
        </table>
        <br>
        <br>
        <?     
         }
         if  (count($OrderToShow)>0)
         {
              
             ?>
             <table id="order_to_show_title">
                 <tr>
                    <th > Заказы Покупателя </th>            
                  </tr>
              </table>
              <table id="order_to_show">    
                  <tr>
                     <th style="width: 100px;">Номер Заказа</td>
                     <th style="width: 100px;">Дата</td>
                     <th style="width: 100px;">Статус<br> Позиции</td>
                     <th style="width: 100px;">Регион</td>
                     <th style="width: 100px;">Количество</td>
                     <th style="width: 150px;">Цена</td>
                  </tr>
             
             <?
                 foreach ($OrderToShow as $OrderId=>$OrderProp)
                 {
                      if($OrderProp['STATUS_ID']=='A') $OrderStatus='Подтвержден';
                      elseif($OrderProp['STATUS_ID']=='C') $OrderStatus='Закрыт';
                      elseif ($OrderProp['STATUS_ID']=='N') $OrderStatus='Рассматривается';
                      elseif ($OrderProp['STATUS_ID']=='B') $OrderStatus='Отложен';
                      $OrderPrice=number_format($OrderProp['PRICE'], 2, '.', '');
                     echo  "<tr>
                 <td align=\"center\"><a href=\"/personal/order/index.php?ID=".$OrderProp['ORDER_ID']."\"> №{$OrderProp['ORDER_ID']}</a></td>
                 <td align=\"center\">{$OrderProp['DATE_INSERT']}</td> 
                 <td align=\"center\">  {$OrderProp['STATUS_ID']}</td> 
                 <td align=\"center\">  {$OrderProp['REGION']}</td>                     
                  <td align=\"center\">  {$OrderProp['QUANTITY']}</td>    
                   <td align=\"center\">  {$OrderPrice} {$OrderProp['CURRENCY']}</td>  
                     </tr>";
                     
                 }
             
             echo"</table>";
         } 
          
         if (count ($ShipedToShow)>0) 
         {
             
           ?>
           <br>
           <br>
           <br>
            <table id='order_to_show_title'>
                <tr>
                    <th>Расходные Накладные </th>
                </tr>
            </table>
             <table id='order_to_show'>
                  <tr>
                     <th style="width: 100px;"> Номер </th>
                     <th style="width: 100px;"> Дата</th>
                     <th style="width: 100px;"> Статус</th>
                     <th style="width: 100px;"> Количество</th>
                     <th style="width: 150px;"> Сумма</th>
                  <tr>
                  
             <?   
             foreach ($ShipedToShow as $ShipId=>$ShipPro)
             {
                  $ShipPrice=number_format($ShipPro['SUMM'], 2, '.', '');
                 echo"
                 <tr> 
                    <td align=\"center\" ><a href='/autodoc/shipping_detail.php?ID={$ShipId}'> ".$ShipPro['NUMBER']."</a></td>
                    <td align=\"center\"> {$ShipPro['DATE']}</td>
                    <td align=\"center\"> {$ShipPro['STATUS']}</td>
                    <td align=\"center\"> {$ShipPro['QUANTITY']}</td>
                    <td align=\"center\"> {$ShipPrice} {$ShipPro['CURRENCY']}<td>
                    </tr>        
                 
                 </tr>
                 ";
              }
                  
                  
                  
               echo "</table>";
           }   
                 
           if(count($BackToShow)>0)  
           {
               
               
               ?>
               <br>
           <br>
           <br>
            <table id='order_to_show_title'>
                <tr>
                    <th>Возвраты Товаров</th>
                </tr>
            </table>
             <table id='order_to_show'>
                  <tr>
                     <th style="width: 100px;"> Номер </th>
                     <th style="width: 100px;"> Дата</th> 
                    <th style="width: 100px;"> Статус</th>                     
                     <th style="width: 100px;"> Количество</th>
                     <th style="width: 150px;"> Сумма</th>
                  <tr>
               <?
                foreach($BackToShow as $BackId=>$BackPro)
                {
                    $BackPrice=number_format($BackPro['SUMM'], 2, '.', '');
                 echo"
                 <tr> 
                    <td align=\"center\" ><a href='/autodoc/shipping_detail.php?ID={$BackId}'> {$BackPro['NUMBER']}</a></td>
                    <td align=\"center\"> {$BackPro['DATE']}</td> 
                   <td align=\"center\"> {$BackPro['STATUS']}</td>                 
                    <td align=\"center\"> {$BackPro['QUANTITY']}</td>
                    <td align=\"center\"> {$BackPrice} {$BackPro['CURRENCY']}<td>
                    </tr>        
                 
                 
                 ";
                    
                    
                    
                    
                    
                }  
           }          
           if (count($DocShipedToshow)>0) 
           {
               
               ?>
               <br>
           <br>
           <br>
            <table id='order_to_show_title'>
                <tr>
                    <th>Декларации Отгрузки</th>
                </tr>
            </table>
             <table id='order_to_show'>
                  <tr>
                     <th style="width: 100px;"> Первозчик </th>
                     <th style="width: 100px;"> Дата</th> 
                    <th style="width: 100px;"> Номер</th>                     
                     <th style="width: 100px;"> Количество Мест</th>
                     <th style="width: 150px;"> Номер по базе </th>
                  <tr>
               
               
               <?
                foreach($DocShipedToshow as $DocShipId=>$DocShipPro)
                {
                   echo"
                      <tr> 
                    <td align=\"center\" >{$DocShipPro['DELIVER']}</td>
                    <td align=\"center\"> {$DocShipPro['DATE']}</td> 
                   <td align=\"center\"> {$DocShipPro['NUMBER']}</td>                 
                    <td align=\"center\"> {$DocShipPro['PLACES']}</td>
                    <td align=\"center\"><a href=\"/autodoc/declaration_detail.php?ID=".$DocShipId."\"> {$DocShipPro['NUMBERBASE']}<td>
                    </tr>        
                 
                 </tr>
                 ";
                   
                   
                   
                   
                    
                    
                    
                }
           }   
               
               
             
          
          
      
          
       
   
    
   
   
   
   
   
   
   
   
   
   
    
    
   }
   else
   { 
       echo "Введите код номенклатуры"; 
   }
   
   
      
?>
