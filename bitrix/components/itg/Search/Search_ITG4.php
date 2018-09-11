<?php
error_reporting(0) ;
require_once ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/IB.property/BrandGroup.php"); 
class Customer
    {
        public $UserName;
        public $Password;
        public $SubCustomerId;
        public $CustomerId;
    }

class Search_ITG
{
   
    private $exact = false;
    private $exactInAbout = false;
    private $containItems = false; 
    private $staticItems = '';
    private $numRows = 0;
    private $tmpRes;
    private $items = array();
    private $brands = array();
    private $brands_group=array();
    private $dbConn;
    private $url = array();
    private $params;
    private $sql;
    public $sqlString;
    private $DBNAME;
    public $CheckItemInfo ;
    private $weight;
    public $supped;
    public $UserGroupArray;
    public $AnalogForOurStock ;
    public $spesialUsers =array();
   
    function __construct($params)
    {
        $this->spesialUsers["Zolotov"]=1979;
        $this->spesialUsers["Prokhorov"]=517;
        $this->spesialUsers ["Tiunov"]=852; 
        $this->spesialUsers ["AnDima"]=2696; 
        
       
      # $ILocalRegions[]=989;
        
       
       $this->AnalogForOurStock=$params['AnalogsForOurStock']; 
       $DB = self::manualConnect();
       # $this->dbConn = $params['DBB'];
         $this->dbConn=$DB;
        $this->params = $params;
        $this->params['warehouse'] = false;
        $this->params['warehouseUSA'] = false;
        $this->params['exactOnly'] = isset($params['exactOnly'])?true:false;
        $this->CheckItemInfo();
        #echo "<pre>";
        #print_r($this->params['region']);
        #echo "</pre>";
        $this->DBNAME='ITG_price_union';
        $this->prepareSql();
        $this->getExactCompare();       
        $this->getArray();
        
        $this->DBNAME='ITG_price_union_JPN';
        $this->prepareSql();
        $this->getExactCompare();
        $this->getArray();
        
         # $this->sqlString=$this->sql['exact'];
         #$this->sqlString=$this->numRows  ;  
        if ($this->numRows == 0 && $this->params['bcode'] == "" && !$this->params['exactOnly'])
        {
          
            #echo "<br />2:condition";
            $this->getCompetitor();
            #$this->numRows
           /* if ($this->numRows == 0)
            {
                $i = 0;
                foreach ($this->params['arBrands'] as $key=>$brand)
                {
                    #echo "SELECT ITG_presence_1c_F({$key},'{$this->params['icode']}') AS brand";
                    #$this->tmpRes = $DB->query("SELECT IFNULL((SELECT ITG_presence_F({$key},'{$this->params['icode']}')),(SELECT ITG_presence_1c_F({$key},'{$this->params['icode']}'))) AS brand");//запрос на приблизительное совпадение
                    
                    #$this->tmpRes = $DB->query("SELECT ITG_presence_Union({$key},' {$this->params['icode']} ') AS brand");//
                     $this->tmpRes = $DB->query ("SELECT id AS brand , ItemCode AS ItemCode FROM `ITG_price_union` WHERE BrandCode={$key} AND ItemCode LIKE '%{$this->params['icode']}%' LIMIT 1");
                    $brandSql = $this->tmpRes->fetch_assoc();
                    if ($brandSql['brand'])
                    {
                        $this->brands[$key] = $brand['FullName'];
                        
                        $this->url[$key] = "?ICODE=".$this->params['icode']."&BCODE=".$key."&REGION=".$_REQUEST["REGION"];
                        $statBrand = $key;
                        #echo $this->url[$brand]."<br />";
                        $this->numRows = ++$i;
                    }   
                }
                if ($i == 1)
                {
                    $this->params['bcode'] = $statBrand;
                    $this->prepareSql();
                    $this->getExactCompare();
                }
            }*/
        }
        elseif ($this->numRows > 0)
        {
            #echo "<br />3:condition";
            #$this->exact = true;
            
            $this->getArray();
            
            #$this->prePrint($this->items);
            if (!$this->params['warehouse'] /*&& $this->exact*/)//
            {
                #
                $this->getCompetitor();
                #$this->prePrint($this->items);
                $this->exact = true;//
            }
        }  elseif($this->numRows<1 && $this->params['bcode'] != "")  
           {
               $this->getCompetitor();  
              $this->exact = true;//
           }
    }
    public static function manualConnect()
    {
             $port=31006;
        $DB = new mysqli("localhost","bitrix","a251d851","avtodok.com.ua",$port);
        $DB->set_charset("utf8");
              $DB->query("SET NAMES 'utf8'");
        return $DB;
    }
    public function getSQLres()
    {
        return $this->tmpRes;
    }
    public function getNumRows()
    {
        return $this->numRows;
    }
    public function getBrans()
    {
        return $this->brands;
    }
    public function getArrItems() 
    {
        $this->items=self::SortBubble($this->items);
        if (in_array(4,$this->params['usergrouparray'],true) )
        {
             return $this->items; 
        } else
        {
           return self::SortBubblePrice($this->GetArrayForLowUser_alldeliverydays($this->items));
        }
        
    }
    public function getUrl()
    {
        if (count($this->url) == 0 && count($this->brands) > 1)
        {
            foreach ($this->brands as $key=>$brand)
            {
                $this->url[$key] = "?ICODE=".$this->params['icode']."&BCODE=".$key."&REGION=".$_REQUEST["REGION"];
            }
        }
        return $this->url;
    }
    public function getExact()
    {
        return $this->exact;
    }
    public function getExactInAbout()
    {
        return $this->exactInAbout;
    }
    public function containItems()
    {
        return $this->containItems;
    }
    public function inOwnWarehouse()
    {
        return $this->params['warehouse'];
    }
    public function inOwnWarehouseUSA()
    {
              return $this->params['warehouseUSA']; 
    }
     public function returnSqlString()
     {
                   return $this->sqlString;
     }
     private function CheckCaption($Caption,$ItemCode)
     {
          $ArrStr=str_split($Caption);
          $StrLenth=Count($ArrStr);
          $Count=0;
          foreach($ArrStr as $Symbol)
          {
               if ( ord($Symbol)>127 || (ord($Symbol)>32 && ord($Symbol)<65  ))  
            {
               $Count++; 
            }
              
          }
          if ($Count>($StrLenth/3))
          { 
           return $Caption;
          }
            else
          {
             $DB = $this->dbConn;
             $sql="SELECT Caption FROM b_autodoc_items_m WHERE ItemCode='{$ItemCode}'" ;
             $result=$DB->query($sql);
             if ($result->num_rows==0) return $Caption; 
             $NewCaptionArray=$result->fetch_assoc();
             return $NewCaptionArray['Caption'] ;
              
          }
         
         
          
         
          
         
         
     }
    private function GetCaptionWebServiceVivat($ItemCode)
        {  # var_dump ($ItemCode) ;   
            require_once $_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/InfoForItem.php";      
            $ArrayInfo=GetInfoFromVivat($ItemCode) ;
               #var_dump ($ArrayInfo);
            if (!isset($ArrayInfo["Caption"]) ) return "";
            return $ArrayInfo["Caption"];   
            
            
            
        }
        private function GetCaptionWebServiceMegaP($ItemCode)
        {  # var_dump ($ItemCode) ;   
            require_once $_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/InfoForItem.php";      
            $ArrayInfo=GetInfoFromMegaPartsMod($ItemCode) ;
               #var_dump ($ArrayInfo);
            if (!isset($ArrayInfo[0]["NameM"]) ) return "";
            return $ArrayInfo[0]["NameM"];   
            
            
            
        }
        
    private function GetArrayForLowUser($arItem)
    
    {
         $lowprice1day=0;
         $lowprice2day=0;
         $checkdelivery1day=true;
         $checkdelivery2day=true;
         $OldItemsRemain=Array();
         $NewItemsArray=Array();
         $CommonNewArray=Array();
         #$priceUSD= $arItem['UserPrice']*$this->PriceKoef($arItem['Currency'],"USD");   
         foreach($arItem as $Id=>$Item)
         {
             $priceUSD= $Item['UserPrice']*$this->PriceKoef($Item['Currency'],"USD");   
             if ($Item['RegionCode']<=4 || 
             $Item['RegionCode']==1000 
             || $Item['RegionCode']==997 
             || $Item['RegionCode']==999 
             || $Item['RegionCode']==995 
             || $Item['RegionCode']==993 
             || $Item['RegionCode']==1187
             || $Item['RegionCode']==992
             || $Item['RegionCode']==991
             || $Item['RegionCode']==990
             || $Item['RegionCode']==989
             || $Item['RegionCode']==988 
             || $Item['RegionCode']==987
             )
             {
               $OldItemsRemain[]= $Item; 
             }
             else
             {
                    if ($Item['DeliveryDays']==1)
                    {   
                         if ($lowprice1day==0)
                                {
                                  $lowprice1day= $priceUSD;   
                                }
                         if ( $priceUSD<=$lowprice1day )
                                {
                                    
                                   $lowprice1day= $priceUSD;
                                   $NewItemsArray[0]= $Item;
                                }
                                
                                
                 
                      }
                       if ($Item['DeliveryDays']==2)
                    {   
                         if ($lowprice2day==0)
                                {
                                  $lowprice2day=$priceUSD;   
                                }
                         if ( $priceUSD<=$lowprice2day )
                                {
                                    
                                   $lowprice2day= $priceUSD;
                                   $NewItemsArray[1]= $Item;
                                }
                         }
                                     
                    
             }
              
             
             
         }
          foreach($OldItemsRemain as $Id=>$Item)
          {
              $CommonNewArray[]=$Item;
          }
          foreach($NewItemsArray as $Id=>$Item)
          {
              $CommonNewArray[]=$Item;
          }
          return  $CommonNewArray;
        
    } 
    
    private function GetArrayForLowUser_alldeliverydays($arItem)
    
    {
         $lowprice1day=0;
         $lowprice2day=0;
         $checkdelivery1day=true;
         $checkdelivery2day=true;
         $OldItemsRemain=Array();
         $NewItemsArray=Array();
         $CommonNewArray=Array();
         $LowPriceArray=Array();
         #$priceUSD= $arItem['UserPrice']*$this->PriceKoef($arItem['Currency'],"USD");   
         foreach($arItem as $Id=>$Item)
         {
              $LowPriceArray[$Item['DeliveryDays']]=0;
             
         } 
         
         
         foreach($arItem as $Id=>$Item)
         {
             $priceUSD= $Item['UserPrice']*$this->PriceKoef($Item['Currency'],"USD");   
             if ($Item['RegionCode']<=4 || 
             $Item['RegionCode']==1000 
             || $Item['RegionCode']==997 
             || $Item['RegionCode']==999 
             || $Item['RegionCode']==995 
             || $Item['RegionCode']==993 
             || $Item['RegionCode']==1187
             || $Item['RegionCode']==992
             || $Item['RegionCode']==991
             || $Item['RegionCode']==990
             || $Item['RegionCode']==989
             || $Item['RegionCode']==988 
             || $Item['RegionCode']==987
             )
             {
               $OldItemsRemain[]= $Item; 
             }
             else
             {               
                     if ($LowPriceArray[$Item['DeliveryDays']]==0)
                     {
                          $LowPriceArray[$Item['DeliveryDays']]=$priceUSD;
                     }
                   if ( $priceUSD<=$LowPriceArray[$Item['DeliveryDays']])
                   {
                        $LowPriceArray[$Item['DeliveryDays']]=$priceUSD;
                        $NewItemsArray[]= $Item;
                        
                   } 
                 
                   ############
                   /*
                    if ($Item['DeliveryDays']==1)
                    {   
                         if ($lowprice1day==0)
                                {
                                  $lowprice1day= $priceUSD;   
                                }
                         if ( $priceUSD<=$lowprice1day )
                                {
                                    
                                   $lowprice1day= $priceUSD;
                                   $NewItemsArray[0]= $Item;
                                }
                                
                                
                 
                      }
                       if ($Item['DeliveryDays']==2)
                    {   
                         if ($lowprice2day==0)
                                {
                                  $lowprice2day=$priceUSD;   
                                }
                         if ( $priceUSD<=$lowprice2day )
                                {
                                    
                                   $lowprice2day= $priceUSD;
                                   $NewItemsArray[1]= $Item;
                                }
                         }
                   */                  
                    
             }
              
             
             
         }
          foreach($OldItemsRemain as $Id=>$Item)
          {
              $CommonNewArray[]=$Item;
          }
          foreach($NewItemsArray as $Id=>$Item)
          {
              $CommonNewArray[]=$Item;
          }
          return  $CommonNewArray;
        
    } 
    public static function SortBubble($arItems)
    {  if (count($arItems)==0 )
          return $arItems;
          
        for($i=0; $i<count($arItems); $i++){
           for($j=$i+1; $j<count($arItems); $j++){
               if($arItems[$i]['RegionCode']>$arItems[$j]['RegionCode']){
                   $temp = $arItems[$j];
                   $arItems[$j] = $arItems[$i];
                   $arItems[$i] = $temp;
               }
          }         
       }  
        
      return $arItems;  
    }
    public static function SortBubblePrice($arItems)
    {  if (count($arItems)==0 )
          return $arItems;
        //  $koef=$this->PriceKoef($Item['Currency'],"USD")
        for($i=0; $i<count($arItems); $i++){
           for($j=$i+1; $j<count($arItems); $j++){
               if( (self::PriceKoef($arItems[$i]['Currency'],"USD")*$arItems[$i]['Price'])>(self::PriceKoef($arItems[$j]['Currency'],"USD")*$arItems[$j]['Price']))
               {
                   $temp = $arItems[$j];
                   $arItems[$j] = $arItems[$i];
                   $arItems[$i] = $temp;
               }
          }         
       }  
        
      return $arItems;  
    }
    
    private function GetInternationalRegionAsLocal()
    {
        $InternationalRegionAsLocalArray[]=989;
        $InternationalRegionAsLocalArray[]=988;
        $InternationalRegionAsLocalArray[]=987;
        return $InternationalRegionAsLocalArray;
    }
    private function GetBase64Picture($BrandCode,$ItemCode)
    {
          
          $DBB = self::manualConnect();
          $sql="SELECT `Base64` AS Pic64Base from b_autodoc_items_m WHERE BrandCode={$BrandCode} AND ItemCode='{$ItemCode}' LIMIT 1 ";           
          $result=$DBB->query($sql);
          $base64=$result->fetch_assoc()['Pic64Base']; 
          return  $base64;
        
        
    }
    private function getArray()
    {
        #echo "<br />inside getArray()";
        $DB = $this->dbConn;
        $brands = array();
        //
        $trigger = (count($this->brands)==0)?true:false;
       #if (is_object($this->tmpRes))
      # { 
             
        while ($arItem = $this->tmpRes->fetch_assoc())
        {
            if (in_array($arItem['RegionCode'],$this->GetInternationalRegionAsLocal()))
            {
               $arItem['Price']=$arItem['ILocalPrice'];
               $arItem['UserPrice']=$arItem['ILocalPrice']; 
            }
            if (($arItem['RegionCode']>0 && $arItem['RegionCode']<5) || ($arItem['RegionCode']<1000 && $arItem['RegionCode']>900)  )
            {
              $arItem['Pic64Base']=$this->GetBase64Picture($arItem['BrandCode'] ,$arItem['ItemCode']); 
            }
             else
             {
                 $arItem['Pic64Base']="";
             }
            $arItem['Caption']=$this->CheckCaption($arItem['Caption'],$arItem['ItemCode']);
           // $arItem['Caption']=preg_replace("/[^A-Za-z0-9]*/i","",$arItem['Caption']);  GetCaptionWebServiceMegaP
          #  if ($arItem['Caption']=="" || $arItem['Caption']==null) $arItem['Caption']=$this->GetCaptionWebServiceVivat($arItem['ItemCode']);
            
            if ($arItem['Caption']=="" || $arItem['Caption']==null) $arItem['Caption']=$this->GetCaptionWebServiceMegaP($arItem['ItemCode']);
         
            $arItem['DeliveryDays'] = $this->params['region'][$arItem['RegionCode']]['DeliveryDays'];
            #var_dump($arItem['DeliveryDays']); 
            if ($arItem['ORDER_AFTER_DAY']!="" &&  $arItem['ORDER_AFTER_DAY']!=null) 
            {
              $arItem['DeliveryDate']=$this->DefineDeliveryDate(intval($arItem['ORDER_AFTER_DAY']),$arItem['ORDER_END_TIME'],"");    
            }else
            {
               $arItem['DeliveryDate']=$this->DefineDeliveryDate($arItem['DeliveryDays'],$arItem['ORDER_END_TIME'],"");  
            }
           
            $arItem['RegionShortName'] = $this->params['region'][$arItem['RegionCode']]['ShortName'];
            if (!isset($arItem['RegionFullName']))
            {
             $arItem['RegionFullName'] = $this->params['region'][$arItem['RegionCode']]['FullName'];
            } 
            $arItem['Currency'] = $this->params['region'][$arItem['RegionCode']]['chrCurrencyCode'];
            $brandsFlip = /*array_flip(*/$this->params['arBrands']/*)*/;
            $arItem['BrandName'] = $brandsFlip[$arItem['BrandCode']]['FullName'];
            #echo trim($arItem['RegionShortName'])."<br />";
            if ($this->staticItems == '')//
            {
              #  $this->staticItems = $arItem['ItemCode'].$arItem['BrandCode'];
                $this->staticItems = $arItem['ItemCode'];
                $this->exactInAbout = true;
            }
           # elseif (strtoupper($this->staticItems) != strtoupper($arItem['ItemCode'].$arItem['BrandCode']))//
            elseif (strtoupper($this->staticItems) != strtoupper($arItem['ItemCode']))
            {
                $this->exactInAbout = false;
            }
            if ($arItem['isActive'] == -1)//
            {
                #$this->params['SuppCode'] = $arItem['RegionCode'];
                #$this->prepareSql();
                #$sqlRes = $DB->query($this->sql['getSuppliersCode']);
                #$short = $sqlRes->fetch_assoc();
                #$arItem['RegionShortName'] = $short['ShortSupp'];
                #$arItem['DeliveryDays'] = $short['DeliveryDay'];

                $arItem['Currency'] = $arItem['CurrencyRegion'];
                #$arItem['RegionCode'] = intval($short['RegionCode']);
                
                $arItem['RegionShortName'] = $this->params['regionID'][$arItem['RegionCode']]['ShortName'];
                $arItem['DeliveryDays'] = $this->params['regionID'][$arItem['RegionCode']]['DeliveryDays'];
                if ($arItem['ORDER_AFTER_DAY']!="" &&  $arItem['ORDER_AFTER_DAY']!=null) 
                {
                  $arItem['DeliveryDate']=$this->DefineDeliveryDate(intval($arItem['ORDER_AFTER_DAY']),$arItem['ORDER_END_TIME'],"15.00");    
                }else
                {
                   $arItem['DeliveryDate']=$this->DefineDeliveryDate($arItem['DeliveryDays'],$arItem['ORDER_END_TIME'],"15.00");  
                }
                #$arItem['Currency'] = $this->params['regionID'][$arItem['RegionCode']]['chrCurrencyCode'];
                $arItem['RegionCode'] = $this->params['regionID'][$arItem['RegionCode']]['Code'];
                if (!$arItem['RegionShortName']) $arItem['RegionShortName'] = '-';
            }
          #  if ( ($arItem['RegionShortName'] == 'СКЛАД' && $this->params['userID']!=1979 ) || ($arItem['RegionShortName'] == 'ДОНЕЦК'&& $this->params['userID']!=1979) ) $this->params['warehouse'] = true;
             if ( ($arItem['RegionShortName'] == 'СКЛАД' && !in_array($this->params['userID'],$this->spesialUsers) ) || ($arItem['RegionShortName'] == 'ДОНЕЦК'&& !in_array($this->params['userID'],$this->spesialUsers)) ) $this->params['warehouse'] = true;
            if ($arItem['RegionShortName'] == 'USA' && $this->params['userID']!=1979) $this->params['warehouseUSA'] = true; 
           #if (in_array(4,$this->params['usergrouparray'],true) )
            #{
            $this->items[] = $arItem;     
            
            if ($trigger || $this->params['addBrand']) 
            {
                $brand_group= new BrandGroup(intval($arItem['BrandCode']));
                $group_code= "#".$brand_group->getgroupCode();
              #  $this->brands_group[$group_code]=$brand_group->getgroupName();
               # var_dump($this->brands_group);
                if ($group_code=="#0")
                {
                  $this->brands[$arItem['BrandCode']] = $arItem['BrandName'];  
                }  else
                {
                   $this->brands[$group_code] = $brand_group->getgroupName();    
                }
                
               # var_dump( $this->brands); 
            }
           
           /* }else
            {   
                $priceUSD= $arItem['UserPrice']*$this->PriceKoef($arItem['Currency'],"USD");   
                if ($lowprice==0)
                {
                  $lowprice= $priceUSD;   
                }
               
                if ( $priceUSD<=$lowprice )
                {
                   $lowprice= $priceUSD;
                    $this->items[] = $arItem;
            
                   if ($trigger || $this->params['addBrand']) $this->brands[$arItem['BrandCode']] = $arItem['BrandName'];
                   
                }
                
                
            } */
        } 
      #}   
        #echo "<pre>";
        #print_r($this->items);
        #echo "</pre>";
        
        #echo "<pre>";
        #print_r($this->brands);
        #echo "</pre>";
        #if ($this->params['warehouse']) echo "есть на складе";
        #else echo "нет на складе";
    }
    private function getExactCompare()
    {
         $DB = $this->dbConn;
         $DB-> query("SET NAMES 'utf8'");
        $sqlPartColumnRegion = $DB->query($this->sql['partColumnRegion']);//
        $partColumnRegion  = $sqlPartColumnRegion->fetch_assoc();      
        $this->params['propertyColumn'] = "PROPERTY_".$partColumnRegion['RegionColumn'];//
        
        $this->prepareSql();
        
        #echo "<br/>inside getExactCompare<br/>";
        $DB = $this->dbConn;
        #$this->sqlString=$this->sql['exact'];
       # var_dump($this->sql['exact']);
        $this->tmpRes = $DB->query($this->sql['exact']);
       # var_dump($this->sql['exact']);
        $this->numRows += $this->tmpRes->num_rows;
        $this->exact = true;
        $this->params['addBrand']=true;
        $this->sqlString=$this->sql['exact'];
        $this->containItems = (boolean) $this->tmpRes->num_rows;
        if($this->tmpRes->num_rows == 0 && $this->params['bcode'] != "" && !$this->params['exactOnly'] && $this->DBNAME=='ITG_price_union')
        {
              #$this->sqlString=$this->sql['exact']; 
            $this->exact = false;
            $this->containItems = true;
            #echo "<br /> condition 5";
            #echo "<br />{$this->sql['about']}";
            $this->tmpRes = $DB->query($this->sql['about']);//
           # $this->sqlString=$this->sql['about']; 
            $this->numRows += $this->tmpRes->num_rows;
            $this->containItems = (boolean) $this->tmpRes->num_rows;
            if ($this->numRows > 0)
            {
                $this->getArray();
            } 
        }
    }
    private function getCompetitor()
    {
        $DB = $this->dbConn;
                $DB-> query("SET NAMES 'utf8'");
        $sqlPartColumnRegion = $DB->query($this->sql['partColumnRegion']);//
        $partColumnRegion  = $sqlPartColumnRegion->fetch_assoc();
        #echo $partColumnRegion['RegionColumn']."<br />";
        $this->params['propertyColumn'] = "PROPERTY_".$partColumnRegion['RegionColumn'];//
        #$this->params['descriptionColumn'] = "DESCRIPTION_".$partColumnRegion['RegionColumn'];
        #echo $this->sql['priceColumn1c']."<br />";
        #$sqlPriceColumn1c = $DB->query($this->sql['priceColumn1c']);
        #$priceColumn1c = $sqlPriceColumn1c->fetch_assoc();
        #$this->params['PriceColumn_1C'] = $priceColumn1c['PriceColumn_1C'];
        
        $this->prepareSql();//
        #echo "<br />".$this->sql['suppliers']."<br />";
        #$this->sqlString=$this->sql['suppliers']; 
        $this->tmpRes = $DB->query($this->sql['suppliers']);//
       # var_dump($this->sql['suppliers']);
        $this->numRows += $this->tmpRes->num_rows;
        $this->containItems = (boolean) $this->numRows;
        if ($this->numRows > 0)
        {
            $this->params['addBrand'] = true;
            $this->getArray();
        }
    }
    private function regionKoef()
    {
        $sql="(SELECT IFNULL((SELECT `K` FROM `b_autodoc_clients_k` WHERE `RegionCode`=reg AND `ID_1C`=user),(SELECT `K` FROM `b_autodoc_clients_k` WHERE `RegionCode`=reg AND `ID_1C`='00001')))";
        
    }
    private function defineBrandCodeGroup()
    {
       if (!$this->params['bcode']) 
       {
         $this->params['brandcode'] = "";  
         #var_dump( "WWW");  
       }else
       {
           #var_dump(strpos($this->params['bcode'],"#",0));
           if (strpos($this->params['bcode'],"#")===0 )
           {
              $groupID=str_replace("#","",$this->params['bcode']); 
              # var_dump($this->params['brandcode']);
             #var_dump("www");
            # var_dump($groupID);
              $this->params['brandcode']=self::getBrandCodesConditionByGroupId($groupID);    
               
           }else                        
           {
              
               $this->params['brandcode'] = " `BrandCode`={$this->params['bcode']} AND "; 
           }
           
       }
    #var_dump($this->params['brandcode']);  
         
    }
    private static function getBrandCodesConditionByGroupId($groupID)
    {
       require_once ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/IB.property/BrandGroup.php");
       $brandGroup=BrandGroup::getBrandsByGroupID($groupID);
       if ($brandGroup==false)
       {
          return ""; 
       }
      
      $queryConditionBrandCode="";
       foreach ($brandGroup['BRAND_CODES'] as $key=>$value)
       {
          $queryConditionBrandCode.=" `BrandCode`=".$value." OR "; 
       } 
       $queryConditionBrandCode="(".$queryConditionBrandCode.")";
       $queryConditionBrandCode=str_replace("OR )",")",$queryConditionBrandCode);
       $queryConditionBrandCode.=" AND";
         
       return  $queryConditionBrandCode;
    }
    private function prepareSql()
    {
        #echo "<br/>inside prepare<br/>";
        if (!$this->params['user']) $this->params['user'] = -17;
        if (!$this->params['sort'] || $this->params['sort'] == 'PRICE') $this->params['sort'] = " Price, ";
        else $this->params['sort'] = " RegionCode, ";
        #if (!$this->params['bcode']) $this->params['brandcode'] = "";
        #else $this->params['brandcode'] = " `BrandCode`={$this->params['bcode']} AND ";
       $this->defineBrandCodeGroup();
        $this->params['limit'] = ($this->params['page'] == 0)
                                            ?
                                            " 0,{$this->params['numPage']}"
                                            :
                                            " ".(intval($this->params['page']-1)*intval($this->params['numPage'])).",{$this->params['numPage']}";
        if ($this->AnalogForOurStock!=false)$this->AnalogForOurStockQuerySrting="AND `RegionCode`=1";
        else $this->AnalogForOurStockQuerySrting="";
        //global $DB;
        /*$this->params['fieldsExtern'] = "
                                    `id`, 
                                    `BrandCode`, 
                                    `ItemCode`, 
                                    `Caption`, 
                                    `Weight`, 
                                    `RegionCode`, 
                                    `PriceCode`, 
                                    `Price`*(SELECT ITG_region_koef(ITG.RegionCode,'{$this->params['user']}')) AS Price, 
                                    (`Price`*
                                        (SELECT ITG_region_koef(ITG.RegionCode,'{$this->params['user']}')))*
                                            (SELECT ITG_currency_rate(ITG.RegionCode,'{$this->params['currency']}')) AS UserPrice,
                                    `isActive`
                                    ";
        $this->params['fieldsOwn'] = "
                                    `id`, 
                                    `BrandCode`, 
                                    `ItemCode`, 
                                    `Caption`, 
                                    `Weight`, 
                                    `RegionCode`, 
                                    `PriceCode`, 
                                    `Price`,
                                    `Price`*
                                            (SELECT ITG_currency_rate(ITG.RegionCode,'{$this->params['currency']}')) AS UserPrice, 
                                    `isActive`
                                    ";*/
        $this->params['fieldsUnion'] = " 
                                    `BrandCode`, 
                                    `ItemCode`, 
                                     `ItemCode` AS IC,
                                     (SELECT IF( Caption IS NULL OR Caption='',(SELECT Caption FROM  b_autodoc_items_m WHERE ItemCode=IC LIMIT 1),Caption)) AS Caption,                                     
                                    (SELECT IF (`RegionCode`=1 OR `RegionCode`=1000 OR `RegionCode`=2 OR `RegionCode`=992 ,`Quantity`,10 )) AS Quantity, 
                                    (SELECT IF(`Weight` IS NULL OR `Weight`=0,'{$this->weight}',`Weight` )) AS Weight,
                                    (SELECT ReturnableParts FROM `b_iblock_element_prop_s17` WHERE `PROPERTY_92`=ITG.RegionCode) AS ReturnableParts,
                                    (SELECT ORDER_END_TIME_24F FROM `b_iblock_element_prop_s17` WHERE `PROPERTY_92`=ITG.RegionCode )  AS ORDER_END_TIME,
                                    (SELECT ORDER_AFTER_TIME_24F FROM `b_iblock_element_prop_s17` WHERE `PROPERTY_92`=ITG.RegionCode )  AS ORDER_AFTER_TIME, 
                                    (SELECT ORDER_AFTER_DAY FROM `b_iblock_element_prop_s17` WHERE `PROPERTY_92`=ITG.RegionCode )  AS ORDER_AFTER_DAY,
                                    (SELECT REGION_NAME_DESCRIPTION FROM `b_iblock_element_prop_s17` WHERE `PROPERTY_92`=ITG.RegionCode )  AS REGION_NAME_DESCRIPTION,  
                                    `RegionCode`,    
                                     `RegionCode` AS RC,
                                    `PriceCode`, 
                                    `Price`*(SELECT IF(`RegionCode`=1 OR `RegionCode`=1000,1,(SELECT IFNULL((SELECT `K` FROM `b_autodoc_clients_k` WHERE `RegionCode`=RC AND `ID_1C`='{$this->params['user']}'),(SELECT `K` FROM `b_autodoc_clients_k` WHERE `RegionCode`=RC AND `ID_1C`='00001'))))) AS Price,
                                    (`Price`*
                                        (SELECT IF(`RegionCode`=1 OR `RegionCode`=1000 ,1,(SELECT IFNULL((SELECT `K` FROM `b_autodoc_clients_k` WHERE `RegionCode`=RC AND `ID_1C`='{$this->params['user']}'),(SELECT `K` FROM `b_autodoc_clients_k` WHERE `RegionCode`=RC AND `ID_1C`='00001'))))))
                                             AS UserPrice,
                                     (`Price`*(SELECT ".$this->params['propertyColumn']." FROM `b_iblock_element_prop_s17` 
                                                                WHERE `PROPERTY_92`=ITG.RegionCode)) as ILocalPrice,        
                                    `isActive`
                                    ";
                                    // (`Price`*(SELECT ".$this->params['propertyColumn']." FROM `b_iblock_element_prop_s17` 
                                                               // WHERE `PROPERTY_92`=ITG.RegionCode)) as ILocalPrice,
        /*$this->sql['exact'] = "(SELECT ".$this->params['fieldsOwn']." FROM `ITG_price_own` AS ITG
                                        WHERE ".$this->params['bcode']." 
                                            `PriceCode`=(SELECT ITG_price_koef('{$this->params['user']}'))
                                            AND
                                            `ItemCode`='{$this->params['icode']}')
                    UNION
                        (SELECT ".$this->params['fieldsExtern']." FROM `ITG_price_extern` AS ITG 
                                        WHERE ".$this->params['bcode']." `ItemCode`='{$this->params['icode']}')
                            ORDER BY ItemCode".$this->params['sort']." LIMIT ".$this->params['limit'];
        $this->sql['about'] = "(SELECT ".$this->params['fieldsOwn']." FROM `ITG_price_own` AS ITG 
                                        WHERE ".$this->params['bcode']." 
                                            `PriceCode`=(SELECT ITG_price_koef('{$this->params['user']}')) 
                                            AND 
                                            `ItemCode` LIKE '%{$this->params['icode']}%')
                    UNION
                        (SELECT ".$this->params['fieldsExtern']." FROM `ITG_price_extern` AS ITG 
                                        WHERE ".$this->params['bcode']." `ItemCode` LIKE '%{$this->params['icode']}%')
                            ORDER BY ItemCode".$this->params['sort']." LIMIT ".$this->params['limit'];*/
        $this->sql['exact'] = "SELECT ".$this->params['fieldsUnion']." FROM `{$this->DBNAME}` AS ITG
                                        WHERE ".$this->params['brandcode']." 
                                            (`RegionCode`!=1 OR (`RegionCode`=1 AND `PriceCode`=(SELECT IFNULL((SELECT PriceColumn_1C FROM b_user WHERE ID_1C='{$this->params['user']}' LIMIT 1),10)))) AND (`RegionCode`!=1000 OR(`RegionCode`=1000 AND `PriceCode`=(SELECT IFNULL((SELECT PriceColumn_1C FROM b_user WHERE ID_1C='{$this->params['user']}' LIMIT 1),10))))
                                            AND
                                            `ItemCode`='{$this->params['icode']}'
                                            {$this->AnalogForOurStockQuerySrting}
                             AND (SELECT DESCRIPTION_235 FROM `b_iblock_element_prop_s17` WHERE `PROPERTY_92`=ITG.RegionCode )='YES'               
                            ORDER BY ".$this->params['sort']." ItemCode LIMIT ".$this->params['limit']; 
        $this->sql['about'] = "SELECT ".$this->params['fieldsUnion']." FROM `{$this->DBNAME}` AS ITG
                                        WHERE ".$this->params['brandcode']." 
                                           (`RegionCode`!=1 OR (`RegionCode`=1 AND `PriceCode`=(SELECT ITG_price_koef('{$this->params['user']}')))) AND (`RegionCode`!=1000 OR (`RegionCode`=1000 AND `PriceCode`=(SELECT ITG_price_koef('{$this->params['user']}'))) ) 
                                            AND
                                            `ItemCode` LIKE '%{$this->params['icode']}%'
                                            {$this->AnalogForOurStockQuerySrting}
                              AND (SELECT DESCRIPTION_235 FROM `b_iblock_element_prop_s17` WHERE `PROPERTY_92`=ITG.RegionCode )='YES'              
                            ORDER BY ".$this->params['sort']." ItemCode LIMIT ".$this->params['limit'];
        #$this->sql['priceColumn1c'] = "SELECT ITG_price_koef('{$this->params['user']}') as PriceColumn_1C";
        
       # $this->sql['partColumnRegion'] = "SELECT `RegionColumn` FROM  `b_autodoc_wh_price_types_m` 
              #  WHERE `Code`=(SELECT IFNULL((SELECT PriceColumn_1C FROM b_user WHERE ID_1C='{$this->params['user']}' LIMIT 1),10))";
         $this->sql['partColumnRegion'] = "SELECT `RegionColumn` FROM  `b_autodoc_wh_price_types_m` 
              WHERE `Code`=(SELECT IF((SELECT PriceColumn_1C FROM b_user WHERE ID_1C='{$this->params['user']}' LIMIT 1) IS NULL
               OR (SELECT PriceColumn_1C FROM b_user WHERE ID_1C='{$this->params['user']}' LIMIT 1)=0,10,(SELECT PriceColumn_1C FROM b_user WHERE ID_1C='{$this->params['user']}' LIMIT 1)))";
              
#(SELECT PriceColumn_1C FROM 

#b_user WHERE ID_1C='{$this->params['user']}');
        
        $this->sql['suppliers'] = "SELECT 
                                            CONCAT(`SuppCode`,`BrandCode`,`ItemCode`) as id,
                                            `BrandCode`,
                                            `ItemCode`,
                                            `Caption`,
                                            (SELECT IF(`Quantity`=0,1,`Quantity`)) AS Quantity,
                                            (SELECT PercentSupplied FROM `b_iblock_element_prop_s17` WHERE `IBLOCK_ELEMENT_ID`=SUPP.SuppCode   ) AS PercentSupp,
                                            (SELECT PROPERTY_94 FROM `b_iblock_element_prop_s17` WHERE `IBLOCK_ELEMENT_ID`=SUPP.SuppCode  ) AS RegionFullName,
                                            (SELECT DESCRIPTION_235 FROM `b_iblock_element_prop_s17` WHERE `IBLOCK_ELEMENT_ID`=SUPP.SuppCode )  AS ShowCheck,
                                            (SELECT ReturnableParts FROM `b_iblock_element_prop_s17` WHERE `IBLOCK_ELEMENT_ID`=SUPP.SuppCode) AS ReturnableParts,
                                            (SELECT ORDER_END_TIME_24F FROM `b_iblock_element_prop_s17` WHERE `IBLOCK_ELEMENT_ID`=SUPP.SuppCode )  AS ORDER_END_TIME,
                                            (SELECT ORDER_AFTER_TIME_24F FROM `b_iblock_element_prop_s17` WHERE `IBLOCK_ELEMENT_ID`=SUPP.SuppCode )  AS ORDER_AFTER_TIME,
                                            (SELECT ORDER_AFTER_DAY FROM `b_iblock_element_prop_s17` WHERE `IBLOCK_ELEMENT_ID`=SUPP.SuppCode )  AS ORDER_AFTER_DAY,
                                            (SELECT REGION_NAME_DESCRIPTION FROM `b_iblock_element_prop_s17` WHERE `IBLOCK_ELEMENT_ID`=SUPP.SuppCode )  AS REGION_NAME_DESCRIPTION,    
                                            '{$this->weight}' AS Weight, 
                                            `SuppCode` as RegionCode,
                                            `Currency` as CurrencyRegion,
                                            `Price`*(SELECT ".$this->params['propertyColumn']." FROM `b_iblock_element_prop_s17` 
                                                                WHERE `IBLOCK_ELEMENT_ID`=SUPP.SuppCode) as Price,
                                            (`Price`*(SELECT ".$this->params['propertyColumn']." FROM `b_iblock_element_prop_s17` 
                                                                WHERE `IBLOCK_ELEMENT_ID`=SUPP.SuppCode))
                                                                     AS UserPrice,
                                             (`Price`*(SELECT ".$this->params['propertyColumn']." FROM `b_iblock_element_prop_s17` 
                                                                WHERE `IBLOCK_ELEMENT_ID`=SUPP.SuppCode))
                                                                     AS ILocalPrice,                        
                                            -1 as isActive
                                        FROM  b_autodoc_prices_suppUA AS SUPP
                                            WHERE ";
        $this->sql['suppliers'] .= isset($_GET["BCODE"])?   /* "`BrandCode`={$_GET["BCODE"]} AND "*/$this->params['brandcode']:" ";
       # $this->sql['suppliers'] .=($this->params['bcode']!='')? "`BrandCode`={$this->params['bcode']} AND ":" ";        
        $this->sql['suppliers'] .=                                         "`ItemCode`='{$this->params['icode']}'";
       $this->sql['suppliers'] .="AND (SELECT DESCRIPTION_235 FROM `b_iblock_element_prop_s17` WHERE `IBLOCK_ELEMENT_ID`=SUPP.SuppCode )='YES'";
        $this->sql['suppliers'] .=                                         $this->AnalogForOurStockQuerySrting; 
        #$this->sql['getSuppliersCode'] = "SELECT `PROPERTY_93` AS ShortSupp,`PROPERTY_95` AS DeliveryDay, `PROPERTY_189` AS Currency, `PROPERTY_92` AS RegionCode  FROM b_iblock_element_prop_s17 WHERE IBLOCK_ELEMENT_ID={$this->params['SuppCode']}";
        #echo "<br />".$this->sql['exact']."<br />";
        #echo "<br />".$this->sql['about']."<br />";
        #$this->prePrint($this->sql);
        #var_dump($this->sql) ;
    }
    private function prePrint($var)
    {
        echo "<pre>";
        print_r($var);
        echo "</pre>";
    }
    private function  CheckItemInfo()
    {
         $sql="SELECT  `ItemCode`, `BrandCode`, ( SELECT IF(Weight IS NULL,'N',weight))AS weight ,(SELECT IF(supped IS NULL,'N',supped)) AS supped  
          FROM  b_autodoc_items_m
          WHERE `ItemCode`='{$this->params['icode']}' 
          LIMIT 1";
         $result =$this->dbConn->query($sql);
         $InfoResult=$result->fetch_assoc();
        # if ( $InfoResult['weight']=='N' ||$result->num_rows==0 || $InfoResult['supped']=='N'  ){ $InfoResult['weight']='N' ; $this->CheckItemInfo=false ; $InfoResult['supped']='N'; }
           if ( $InfoResult['weight']=='N' ||$result->num_rows==0 || $InfoResult['supped']=='N' || $InfoResult['supped']!='N'){  $this->CheckItemInfo=false ;  } 
         else{$this->CheckItemInfo=true;}
         $this->weight=$InfoResult['weight'];                          
         $this->supped=$InfoResult['supped'];
    }
     public function GetInfoFromMegaP()
     {
         $host = "http://emexonline.com:3000/";
         $username = "qdok";
         $password = "458TYU";
     
     
         $client = new SoapClient($host."MaximaWS/service.wsdl");
         $customer = new Customer();
         $customer->UserName = $username;
         $customer->Password = $password;
         $customerAr['UserName']  == $username;
         $customerAr['Password']  == $password;
         $params = array("Customer"=>$customer,"DetailNum"=>$this->params['icode'],"ShowSubsts"=>false);
         $ArrayInfo=array(
                'weight'=> 'N',
                'quantity'=>'>10', 
                'persentsupped'=>'N'   
                  )   ;
         #$resLogin = $client->Login($params);
        try
     {    
             
             $resLogin=$client->SearchPart($params) ;
             
            if (is_array($resLogin->SearchPartResult->FindByNumber))
            { 
                
               if (count($resLogin->SearchPartResult->FindByNumber[0])>0)
              {
                  foreach ($resLogin->SearchPartResult->FindByNumber as $info)
                  {
                      if (((string)$info->PriceLogo)=='EMIR')
                      {
                       $ArrayInfo=array(
                       'weight'=> (((string)$info->WeightGr)*1 )/1000,
                       'quantity'=> ((((string)$info->Available)*1)==0 )?'>10': ((string)$info->Available)*1,
                        'persentsupped'=>((string)$info->PercentSupped)*1    
                        )   ;
                        break;
                      }
                      $ArrayInfo['weight']=(((string)$info->WeightGr)*1 )/1000;
                      $ArrayInfo['persentsupped']=((string)$info->PercentSupped)*1 ; 
                       
                  }
             
             
              }
            }
            elseif(is_object($resLogin->SearchPartResult->FindByNumber) )
            {
              if(((string)$resLogin->SearchPartResult->PriceLogo)=='EMIR')
              {
                 $ArrayInfo=array(
                'weight'=> (((string)$resLogin->SearchPartResult->FindByNumber->WeightGr)*1 )/1000,
                'quantity'=> ((((string)$resLogin->SearchPartResult->FindByNumber->Available)*1)==0)?'>10': ((string)$resLogin->SearchPartResult->FindByNumber->Available)*1  ,
                 'persentsupped'=> ((string)$resLogin->SearchPartResult->FindByNumber->PercentSupped)*1 
                  )   ;
              }
                $ArrayInfo['weight']= (((string)$resLogin->SearchPartResult->FindByNumber->WeightGr)*1 )/1000;
                $ArrayInfo['persentsupped']=((string)$resLogin->SearchPartResult->FindByNumber->PercentSupped)*1 ;            }
            else
            {
               $ArrayInfo=array(
                'weight'=> 'N' ,
                'quantity'=>'>10',
                'persentsupped'=>'N'   
                  )   ; 
            }
     }  
     catch (Exception $e) 
     {
              $ArrayInfo=array(
                'weight'=> 'N',
                'quantity'=>'>10' ,
                'persentsupped'=>'N'      
                  )   ;
     }
         #$res=iconv('utf8','cp1251',(string)$resLogin->SearchPartResult->FindByNumber[0]->PartNameRus);
         #echo $res;
         #var_dump($resLogin);
         return $ArrayInfo;
     }
     public static function PriceKoef($Currency , $UserCurrency)      // $Currency-from      $UserCurrency - to currency
     { 
         if ($UserCurrency=="USD")  
         {
             if ($Currency=="USD") return 1;
             elseif ($Currency=="UAH") 
             {
                 $DBB = self::manualConnect();
                 $sql="SELECT RATE AS USDRATE FROM b_catalog_currency_rate  WHERE CURRENCY='USD' ORDER BY ID DESC LIMIT 1";
                 $result=$DBB->query($sql);
                 $rate=$result->fetch_assoc();
                  return 1/$rate['USDRATE'];
               
                 
             }
             elseif ($Currency=="EUR") 
             {
                 $DBB = self::manualConnect();  
                 $sql="SELECT RATE AS USDRATE FROM b_catalog_currency_rate  WHERE CURRENCY='USD' ORDER BY ID DESC LIMIT 1";
                 $result=$DBB->query($sql);
                 $rateusd=$result->fetch_assoc();
                 
                 $sql="SELECT RATE AS EURRATE FROM b_catalog_currency_rate  WHERE CURRENCY='EUR' ORDER BY ID DESC LIMIT 1";
                 $result=$DBB->query($sql);
                 $rateeur=$result->fetch_assoc();
                 
                 return  $rateeur['EURRATE']/ $rateusd['USDRATE'];
                 
             } 
             
         }
         elseif ($UserCurrency=="UAH")
         {
              if ($Currency=="UAH") return 1;
              elseif($Currency=="USD")
              {
                    $DBB = self::manualConnect();
                 $sql="SELECT RATE AS USDRATE FROM b_catalog_currency_rate  WHERE CURRENCY='USD' ORDER BY ID DESC LIMIT 1";
                 $result=$DBB->query($sql);
                 $rate=$result->fetch_assoc();
                  return $rate['USDRATE'];
                  
              } 
              elseif($Currency=="EUR")
              {
                  $DBB = self::manualConnect();
                 $sql="SELECT RATE AS EURRATE FROM b_catalog_currency_rate  WHERE CURRENCY='EUR' ORDER BY ID DESC LIMIT 1";
                 $result=$DBB->query($sql);
                 $rate=$result->fetch_assoc();
                  return $rate['EURRATE'];
                  
              }
             
             
             
         }
         
     } 
    
    function DefineDeliveryDate($region_fixed_delivery_time,$order_end_time,$six_day_order_end_time)
     {
         if ($six_day_order_end_time=="" or $six_day_order_end_time==null) $six_day_order_end_time="11.00";
         if ($order_end_time==null or $order_end_time=="") return date("Y-m-d",time()+($region_fixed_delivery_time*86400)); 
         $NowDate_NoTime=date("d-m-Y");
        
         $NowDate_NoTime_Array=explode("-",$NowDate_NoTime);
          
         $nowTimeStamp=time();         
         $weekday_st=date("N",$nowTimeStamp);
         $weekday=intval($weekday_st);
        // var_dump($weekday);
        // $weekday=7; 
        $delivery_time=0;
         if ($weekday<6)
         {  
            $order_end_time_Array=explode(".",$order_end_time);
           # $delivery_time_add=0;
         }  elseif($weekday==6)
         {
             $six_day_now_hours=date("G",$nowTimeStamp); 
             if ($six_day_now_hours>"15.00")
             {           # переходим сразу на воскресенье.
                 $NowDate_NoTime=date("d-m-Y",$nowTimeStamp+86400);
                 $NowDate_NoTime_Array=explode("-",$NowDate_NoTime); 
                 $order_end_time_Array=explode(".","0.01");
                 $nowTimeStamp=time()+86400;
                 $weekday=7;
                 $delivery_time+=1;
             } else
             {
                $order_end_time_Array=explode(".",$six_day_order_end_time); 
             }
              
             
            # $delivery_time_add=2;
         } elseif($weekday==7)
         {   
              $order_end_time_Array=explode(".","0.01"); 
              
             # $delivery_time_add=1;
             
         }
         
         
         $day_fixed=$NowDate_NoTime_Array[0];
         $month_fixed=$NowDate_NoTime_Array[1];
         $year_fixed= $NowDate_NoTime_Array[2];
         $hours_fixed= $order_end_time_Array[0];
         $minutes_fixed=$order_end_time_Array[1];         
         //var_dump($year_fixed);
         
         $timeStampFixed=mktime($hours_fixed,$minutes_fixed,0,$month_fixed,$day_fixed,$year_fixed) ;
        
            # var_dump(date('Y-m-d',$timeStampFixed));
          
          
         
         
         if ($nowTimeStamp>$timeStampFixed && $weekday<6)          
         {
         
           # var_dump($delivery_time);     
           $delivery_time+=$region_fixed_delivery_time+1;
           # var_dump($delivery_time);  
         }elseif($nowTimeStamp>$timeStampFixed && $weekday==6)
         {
            $delivery_time+=$region_fixed_delivery_time+1;   
         }
         elseif($nowTimeStamp>$timeStampFixed && $weekday==7)
         {
             $delivery_time+=$region_fixed_delivery_time+1; 
         }
         else
         {
           # var_dump($delivery_time);  
           $delivery_time+=$region_fixed_delivery_time; 
           # var_dump($delivery_time); 
         }
         $newDeliveryDay=date("N",$nowTimeStamp+($delivery_time*86400));
         if ($newDeliveryDay==7)
         {
            $newDeliveryDate=date("d-m-Y",$nowTimeStamp+($delivery_time*86400)+86400);  
         }
         else
         {
            $newDeliveryDate=date("d-m-Y",$nowTimeStamp+($delivery_time*86400)); 
         }
         
          
         
         
       return     $newDeliveryDate;
         
     }  

   public function DefineOrderEndTime($RegionShortName)
   {
        $DBB = self::manualConnect();    
        $sql="SELECT ORDER_END_TIME_24F  AS ORDER_END_TIME FROM `b_iblock_element_prop_s17` WHERE `PROPERTY_93`='{$RegionShortName}' LIMIT 1 ";
        $result=$DBB->query($sql);
        $ORDER_END_TIME_ARRAY=$result->fetch_assoc();
        
        return  $ORDER_END_TIME_ARRAY['ORDER_END_TIME'];
        
        
        
   } 
    public function DefineOrderAfterTime($RegionShortName)
   {
        $DBB = self::manualConnect();    
        $sql="SELECT ORDER_AFTER_TIME_24F  AS ORDER_AFTER_TIME FROM `b_iblock_element_prop_s17` WHERE `PROPERTY_93`='{$RegionShortName}' LIMIT 1 ";
        $result=$DBB->query($sql);
        $ORDER_END_TIME_ARRAY=$result->fetch_assoc();
        
        return  $ORDER_END_TIME_ARRAY['ORDER_AFTER_TIME'];
        
        
        
   } 
    public function DefineOrderAfterDay($RegionShortName)
   {
        $DBB = self::manualConnect();    
        $sql="SELECT ORDER_AFTER_DAY  AS ORDER_AFTER_DAY FROM `b_iblock_element_prop_s17` WHERE `PROPERTY_93`='{$RegionShortName}' LIMIT 1 ";
        $result=$DBB->query($sql);
        $ORDER_END_TIME_ARRAY=$result->fetch_assoc();
        
        return  $ORDER_END_TIME_ARRAY['ORDER_AFTER_DAY'];
        
        
        
   } 
    public function DefineRegionDescription($RegionShortName)
   {
        $DBB = self::manualConnect();    
        $sql="SELECT REGION_NAME_DESCRIPTION  AS REGION_NAME_DESCRIPTION FROM `b_iblock_element_prop_s17` WHERE `PROPERTY_93`='{$RegionShortName}' LIMIT 1 ";
        $result=$DBB->query($sql);
        $REGION_NAME_DESCRIPTION=$result->fetch_assoc();
        
        return  $ORDER_END_TIME_ARRAY['REGION_NAME_DESCRIPTION'];
        
        
        
   }             

}
?>