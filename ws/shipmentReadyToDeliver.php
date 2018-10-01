<?
require_once ($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php'); 
require_once ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/Search_ITG4.php"); 
require_once ($_SERVER["DOCUMENT_ROOT"]."/ws/autodoc/includes/autodoc_templaytor.php");
 $APPLICATION->SetTitle("Список Запчастей Готовых для Отгрузки");
    global $USER ;
error_reporting(0);    
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

function GetAgreementInfo($agrementCode,$userCode)
{
    global $DB;
    $sqlSelectPointOfReference = "SELECT  `CurrencyCode`,`OrdersAllSumm`,`OrdersWorkSumm`,`CurrentDebt`,`CurrentDelayDebt` FROM `b_autodoc_agreements`
                                            WHERE
                                                    `Code`='".$agrementCode."' 
                                                AND `ClientCode`='".$userCode."'";

        $resSelectPointOfReference = $DB->Query($sqlSelectPointOfReference);
        
        $selectPointOfReference = $resSelectPointOfReference->Fetch();      
        return  $selectPointOfReference;
         
        
}  
function GetBalanceString($balance)
{  
    if ($balance<=0)
     {
         $DebtName="Баланс";
         $DebtSum=number_format($balance*-1,2,',',' ');
        
     }
     else
     {
       $DebtName="Долг";
       $DebtSum=number_format($balance,2,',',' ');
      
     }
     return  $DebtName.": ".$DebtSum;     
    
} 
function getBrandNameBySortName($shortName)
{
     global $DB; 
     $sql="SELECT PROPERTY_72 AS FullName FROM b_iblock_element_prop_s14 WHERE PROPERTY_71='{$shortName}' LIMIT 1";
     return $DB->Query($sql)->Fetch()["FullName"];
    
}
function getIDBySortName($shortName)
{
     global $DB; 
     $sql="SELECT IBLOCK_ELEMENT_ID AS ID FROM b_iblock_element_prop_s14 WHERE PROPERTY_71='{$shortName}' LIMIT 1";
     return $DB->Query($sql)->Fetch()["ID"];
    
}

$SHIPMENT_TYPE[0]="Самовывоз";
$SHIPMENT_TYPE[1]="Отправка";
$SHIPMENT_TYPE[2]="Доставка";

$DELIVERY_ALLOW[0]="НЕТ";
$DELIVERY_ALLOW[1]="ДА";

        

 $ID1C =GetUserID_1CByID($USER->GetID()  );    
   CModule::IncludeModule("sale"); CModule::IncludeModule('iblock');    

     $arSelect=Array('ID','PROPERTY_Code','PROPERTY_ClientCode','PROPERTY_AgreementCode','PROPERTY_DocumentDate',
            'PROPERTY_CurrencyCode','PROPERTY_DocumentType','PROPERTY_Status','PROPERTY_DeclarationID','PROPERTY_ID1C','PROPERTY_ShipmentType','PROPERTY_DeliveryAllow');
                 #$arSelect=Array(); 
     $arFilter = Array(
            "IBLOCK_ID" =>25,
            "PROPERTY_ClientCode"=>$ID1C ,
            "PROPERTY_Status"=>"Отобрано"

            );
            #print_r($arFilter);
      $ShipItemResult= CIBlockElement::GetList(Array(), $arFilter, false, false, $arSelect);
      while($ShipItem=$ShipItemResult->Fetch()) 
      {
          #$arrayexplodeddatetime=explode(' ',$ShipItem['PROPERTY_DOCUMENTDATE_VALUE']);
          #$arrayexlodedate=explode('-',$arrayexplodeddatetime[0]);
          #echo $ShipItem['PROPERTY_DOCUMENTDATE_VALUE'];
          
          $arDateFrom = explode(".",$ShipItem['PROPERTY_DOCUMENTDATE_VALUE']);
          $mkDateFrom = mktime(0, 0, 0, $arDateFrom[1], $arDateFrom[0], $arDateFrom[2]);
          $TimeCheckDate= mktime(0,0,0,1,1,2018);
         # print_r($arDateFrom);
         if ($TimeCheckDate <= $mkDateFrom)
         {
          $ShipsID[$ShipItem['ID']]['shipnumber']=$ShipItem['PROPERTY_CODE_VALUE'];
          $ShipsID[$ShipItem['ID']]['currency'] = $ShipItem['PROPERTY_CURRENCYCODE_VALUE'];
          $ShipsID[$ShipItem['ID']]['NUMBER'] = $ShipItem['PROPERTY_CODE_VALUE'];
          $ShipsID[$ShipItem['ID']]['SHIPMENT_TYPE']=$ShipItem['PROPERTY_SHIPMENTTYPE_VALUE'];
          $ShipsID[$ShipItem['ID']]['DELIVERY_ALLOW']=$ShipItem['PROPERTY_DELIVERYALLOW_VALUE'];
          $ShipsID[$ShipItem['ID']]['CLIENT_CODE']=$ShipItem['PROPERTY_CLIENTCODE_VALUE'];
          $ShipsID[$ShipItem['ID']]['AGREEMENT_CODE']=$ShipItem['PROPERTY_AGREEMENTCODE_VALUE']; 
          $ShipsID[$ShipItem['ID']]['DATE']=Date("m.d.Y",$mkDateFrom);
         }
          
      }
        #print_r($ShipsID);
       #var_dump($ShipsID);
      foreach ($ShipsID as $shipid=>$shipnumber)
      {
           $arSelect=Array(
           'ID','PROPERTY_ShippingID','PROPERTY_BCode','PROPERTY_ICode','PROPERTY_Quantity',
           'PROPERTY_Summ','PROPERTY_Price','PROPERTY_Caption','PROPERTY_Order'
                        );
            $arFilter = Array(
                    "IBLOCK_ID" =>26,
                    "PROPERTY_ShippingID"=>$shipid
    
                                );
                    
                    
           $ShipsItemResult = CIBlockElement::GetList(Array('ID'=>"DESC"), $arFilter, false, false, $arSelect);
           while($shipeditem= $ShipsItemResult->Fetch())  
           {
               
               
               $partsreadytodeliver[$shipnumber["NUMBER"]]['SHIPMENT_INFO']=$shipnumber;
               $partsreadytodeliver[$shipnumber["NUMBER"]][$shipeditem['ID'] ]['ShipingID']=$shipeditem['PROPERTY_SHIPPINGID_VALUE'];
               $partsreadytodeliver[$shipnumber["NUMBER"]][$shipeditem['ID'] ]['Shiping1cCode']=$shipnumber['shipnumber'];
               $partsreadytodeliver[$shipnumber["NUMBER"]][$shipeditem['ID'] ]['ItemCode']=$shipeditem['PROPERTY_ICODE_VALUE'];
               $objTStr = new TemplatedString($shipeditem['PROPERTY_ICODE_VALUE']);
                        $objTStr->SetTemplate(getIDBySortName($shipeditem['PROPERTY_BCODE_VALUE']));
                        $objTStr->SetColor("black");
                        #$objTStr->SetSelection($itemCodeGAF);
                        $codeTemplate = $objTStr->GetTemplated();
               $partsreadytodeliver[$shipnumber["NUMBER"]][$shipeditem['ID'] ]['ItemCodeTamlated']=$codeTemplate;         
               $partsreadytodeliver[$shipnumber["NUMBER"]][$shipeditem['ID'] ]['BrandCode']=getBrandNameBySortName($shipeditem['PROPERTY_BCODE_VALUE']);
               $partsreadytodeliver[$shipnumber["NUMBER"]][$shipeditem['ID'] ]['Caption']=$shipeditem['PROPERTY_CAPTION_VALUE'];
               $partsreadytodeliver[$shipnumber["NUMBER"]][$shipeditem['ID'] ]['Quantity']=$shipeditem['PROPERTY_QUANTITY_VALUE'];
               $partsreadytodeliver[$shipnumber["NUMBER"]][$shipeditem['ID'] ]['Price']=number_format($shipeditem['PROPERTY_PRICE_VALUE']*Search_ITG::PriceKoef($shipnumber['currency'],'USD'),  2, '.', '');
               $partsreadytodeliver[$shipnumber["NUMBER"]][$shipeditem['ID'] ]['Sum']=number_format($shipeditem['PROPERTY_SUMM_VALUE']*Search_ITG::PriceKoef($shipnumber['currency'],'USD'),  2, '.', '');  
               $partsreadytodeliver[$shipnumber["NUMBER"]][$shipeditem['ID'] ]['Order']=$shipeditem['PROPERTY_ORDER_VALUE'];
               
           }    
          
          
      }
      
      echo (json_encode($partsreadytodeliver,JSON_UNESCAPED_UNICODE));
      exit();

      #print_r($partsreadytodeliver);
      ?>
      
        
             <div class="container">      
           
    
      
      
      
            <?
            
        if (count($partsreadytodeliver)==0)
        {
                        ?>
                          <div class="alert alert-danger p-4 mt-2"  >НЕТ ТОВАРОВ ДЛЯ ОТГРУЗКИ.</div>
                        <?
        }                                                       
           
        foreach ($partsreadytodeliver as $keyy=>$shipment )
         {   $sum=0;
            ?>  
           
             <table class="table mb-0"> 
               <tr>  <th class=' alert table-danger p-0'><strong> Расходная накладная № <?=$keyy?> от <?=$shipment['SHIPMENT_INFO']['DATE']?></strong></div></th> </tr>
                    
             </table>
            
              <table class="table table-striped  table-bordered mb-0">
              <tr class="p-0">
               <th class="p-0"><strong> Заказ</strong></th>      
               <th class="p-0">Бренд</th>     
                <th class="p-0"> Артикул</th>                     
                     <th class="p-0 pl-5"> Наименование</th>                     
                    <th class="p-0"> К-во</th>
                    <th class="p-0"> Цена <?=$shipment['SHIPMENT_INFO']['currency']?></th> 
                    <th class="p-0"> Сумма</th>                   
                   
                </tr>    
            <? 
            foreach($shipment as $id=>$ItemInfo)
            {
                if ($id=="SHIPMENT_INFO") continue;
                ?>
                     
                   
                   
                 <!--   <div class="row alert  ">        
                     <div class="col-sm-2 p-2   border border-bottom-0 border-light"> <?=$ItemInfo['ItemCode']?></div> 
                     <div class="col-sm-4 "> <?=$ItemInfo['BrandCode']?></div>                     
                    <div class="col-sm-4 "> <?=$ItemInfo['Caption']?></div>
                    <div class="col-sm-2 pl-5 "> <?=$ItemInfo['Quantity']?></div> 
                    <div class="col-sm-2 "> <?=$ItemInfo['Price']?></div>

                     <div class="col-sm-2 border border-light"> <?=$ItemInfo['Order']?></div> 
                     </div>    -->
                <?
                
                  ## <td  ><a href='/autodoc/shipping_detail.php?ID={$ItemInfo['ShipingID']}'> ".$ItemInfo['Shiping1cCode']."</a></td>  
                  #<td >{$ItemInfo['Sum']}</td>"; 
                echo" <tr> ";
                
                      if  ($ItemInfo['Order']!='')                        
                        echo" <td class=\"p-0 pl-1\"><a href=\"/personal/order/index.php?ID=".$ItemInfo['Order']."\"> {$ItemInfo['Order']}</a></td>";
                        else  echo"<td class=\"p-0\"> </td>";
                     
                echo"<td class=\"p-0 pl-1\" >{$ItemInfo['BrandCode']}</td>
                     <td class=\"p-0 pl-1\" >{$ItemInfo['ItemCodeTamlated']}</td>                        
                      <td  class=\"p-0 pl-1\">{$ItemInfo['Caption']}</td> 
                       <td class=\"p-0 pl-1\" >{$ItemInfo['Quantity']}</td>
                       <td  class=\"p-0 pl-1\">{$ItemInfo['Price']}</td>
                         <td  class=\"p-0 pl-1\">{$ItemInfo['Sum']}</td>"; 
                       
                       
               echo "</tr> " ;
              $sum=$sum+$ItemInfo['Sum'];  
            }
          ?>
          </table>
          
          <div class="row mb-0 ">
              <div class='col-sm-8'></div>
              <div class='col-sm-4'>
                  <table class="table table-striped table-bordered mb-0">
                  <tr>
                     <td class="p-0">итого: </td>
                     <td class="p-0"><?=$sum." ".$shipment['SHIPMENT_INFO']['currency']?></td>
                  </tr>    
                 </table>
              </div>
            </div> 
            <?
             if ($shipment['SHIPMENT_INFO']['SHIPMENT_TYPE']=="")
             {
                 $shipment['SHIPMENT_INFO']['SHIPMENT_TYPE']=0;
             }
    
             if ( $shipment['SHIPMENT_INFO']['SHIPMENT_TYPE']==0)
             { 
             $border_1="border  border-top-0 border-left-0 border-right-0";
             $border_2="";
             $row_mb="mb-1" ;
             }
             else
             {
                $border_2="border  border-top-0 border-left-0 border-right-0" ;
             $border_1=""; 
             $row_mb="mb-0";    
             }
             
            ?>
            <div class="row <?=$row_mb?>">
                  <div class='col-sm-6 <?=$border_1?> ' ></div>
                   <div class='col-sm-6 <?=$border_1?>'>
                      <table class="table table-striped table-bordered <?=$row_mb?>">
                       <tr>
                         <td class="p-0">Вид отгрузки:</td>
                         <td class="<?if ($SHIPMENT_TYPE[$shipment['SHIPMENT_INFO']['DELIVERY_ALLOW']]==0) echo "text-danger";?> p-0">    
                        <strong> <?=$SHIPMENT_TYPE[$shipment['SHIPMENT_INFO']['SHIPMENT_TYPE']]?></strong></td>
                       </tr>    
                      </table>   
                   
                   </div>
            </div>
            
             <?
             
            if ( $shipment['SHIPMENT_INFO']['SHIPMENT_TYPE']==0) continue; 
             
             if ($SHIPMENT_TYPE[$shipment['SHIPMENT_INFO']['DELIVERY_ALLOW']]==0)
             {
                 
              $AgreementInfo=GetAgreementInfo($shipment['SHIPMENT_INFO']["AGREEMENT_CODE"],$shipment['SHIPMENT_INFO']["CLIENT_CODE"]);
              $debt=$AgreementInfo['CurrentDebt'];
              
              
              ?>
                       <div class="row mb-1">
                          <div class='col-sm-6 <?=$border_2?>'></div>
                           <div class='col-sm-6 <?=$border_2?>'>
                              <table class="table table-striped table-bordered mb-1">
                               <tr>
                                 <td class="p-0">Примечания:</td>
                                 <td class="text-danger p-0"> <?#=$SHIPMENT_TYPE[$shipment['SHIPMENT_INFO']['SHIPMENT_TYPE']]?> Выдача товара со склада не одобрена!<br> 
                                  <? if ($debt>0)
                                      {         
                                       echo GetBalanceString($debt)." ".$AgreementInfo['CurrencyCode'] ;
                                      }
                                  ?>
                                 
                                 
                                  </td>
                               </tr>    
                              </table>   
                           
                           </div>
                      </div>

              
              
              <?
              
            }
              ?>
             
                  
          <?
          
          
         }    
    
           ?>      
                  
              
          </div>
      
      
      <?
    
    
    


  
#require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");
    
?>