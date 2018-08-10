<?
require_once  ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/timer.php"); 
  ignore_user_abort(false);  
  //error_reporting(E_ALL);
  class Customer1
    {
        public $UserName;
        public $Password;
        public $SubCustomerId;
        public $CustomerId;
    }
  
  
  
 class MegaParts
 {
   private $finalArray=array(); 
   private $soapObjectToCheck;
   private $StockAllowed=array();
   private $MegaPartsStockAllowed= array(
    "OPTA"=>0,
    "EMIR"=>1,
    "FAST"=>1,
    "48H"=>1,
    "EMIS"=>0,
    "EUSA"=>0,
    "EMIN"=>0, //
    "EMIT"=>1,
    "EMIZ"=>0,
    "EURU"=>0, 
    "EMIL"=>0, // 
   );
   private $MegaPartsStockAllowed_JAPAN_EMIN= array(
    "OPTA"=>0,
    "EMIR"=>0,
    "FAST"=>0,
    "48H"=>0,
    "EMIS"=>0,
    "EUSA"=>0,
    "EMIN"=>1, //
    "EMIT"=>0,
    "EMIZ"=>0,
    "EURU"=>0, 
    "EMIL"=>0, // 
   );
   private $MegaPartsStockAllowed_JAPAN_EMIL= array(
    "OPTA"=>0,
    "EMIR"=>0,
    "FAST"=>0,
    "48H"=>0,
    "EMIS"=>0,
    "EUSA"=>0,
    "EMIN"=>0, //
    "EMIT"=>0,
    "EMIZ"=>0,
    "EURU"=>0, 
    "EMIL"=>1, // 
   );
   
   function  __construct ($itemCode,$MegaPartsStockAllowed=false)  
   {
       //exit;
       if (!$MegaPartsStockAllowed)
       {
        $this->StockAllowed=$this->MegaPartsStockAllowed;   
        
       }else
       {
          //return;
             $this->StockAllowed=$this->{$MegaPartsStockAllowed};
        
          
       }
       $this->GetInfoFromMegaP($itemCode);
   }   
   private function GetInfoFromMegaP($ItemCode)
     {
         $host = "http://emexonline.com:3000/";
        // $username = "qdok";
        // $password = "458TYU";
         $username = "qale";
         $password = "251110"; 
         
     
     
         $client = new SoapClient($host."MaximaWS/service.wsdl");
         $customer = new Customer1();
         $customer->UserName = $username;
         $customer->Password = $password;
         //$customerAr['UserName']  == $username;
         //$customerAr['Password']  == $password;
         $params = array("Customer"=>$customer,"DetailNum"=>$ItemCode,"ShowSubsts"=>false);
         $ArrayInfo=array(
                'weight'=> 'N',
                'quantity'=>'>10', 
                'persentsupped'=>'N',
                'PartNameRus'=>''   
                  )   ;
         #$resLogin = $client->Login($params);
        try
      {    
             
             $resLogin=$client->SearchPart($params) ;
           #print_r($resLogin);
           /* if (is_array($resLogin->SearchPartResult->FindByNumber))
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
                        'persentsupped'=>((string)$info->PercentSupped)*1,
                        'PartNameRus'=>(string)$info->PartNameRus    
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
                 'persentsupped'=> ((string)$resLogin->SearchPartResult->FindByNumber->PercentSupped)*1,
                 'PartNameRus'=>(string)$info->PartNameRus 
                  )   ;
              }
                $ArrayInfo['weight']= (((string)$resLogin->SearchPartResult->FindByNumber->WeightGr)*1 )/1000;
                $ArrayInfo['persentsupped']=((string)$resLogin->SearchPartResult->FindByNumber->PercentSupped)*1 ;           
            }
            else
            {
               $ArrayInfo=array(
                'weight'=> 'N' ,
                'quantity'=>'>10',
                'persentsupped'=>'N',
                'PartNameRus'=>''    
                  )   ; 
            } 
            * $itemArray["NumberR"]=(string)$position->vendorcode;
              $itemArray["NameR"]= (string)$position->name; 
              $itemArray["PriceR"]=(string)$position->price;
              $itemArray["QuantityR"]=intval((string)$position->quantity); 
              $itemArray["CurrencyR"]=(string)$position->name;
              $itemArray["BrandR"]=(string)$position->vendor;  
            * 
            * 
            * 
            */
            $this->soapObjectToCheck=$resLogin;
          
           if (is_array($resLogin->SearchPartResult->FindByNumber) && count($resLogin->SearchPartResult->FindByNumber)>0 ) 
           {
             #var_dump($resLogin);
             $priceTocCompare=-1; 
             foreach ($resLogin->SearchPartResult->FindByNumber as $info)
             {
                $priceLogo=(string)$info->PriceLogo;
                if (!array_key_exists($priceLogo,$this->StockAllowed))continue;
                if ($this->StockAllowed[$priceLogo]==0) continue;
                 
                $itemArray= array();
                $itemArray["NumberM"]=(string)$info->DetailNum;
                $itemArray["NameM"]=(string)$info->PartNameRus;
                $itemArray["PriceM"]=($info->Price)*1; 
                $itemArray["QuantityM"]=((((string)$info->Available)*1)==0 )?'>10': ((string)$info->Available)*1;
                 #var_dump($itemArray["QuantityM"]);
                $itemArray["CurrencyM"]="";
                //$itemArray["BrandM"]=explode("/",(string) $info->MakeName)[0];
              //  $itemArray["BrandM"]=$info->MakeName;
                $itemArray["BrandM"]=$this->CorrectBrand((string)$info->MakeName);
                $itemArray["PriceLogo"]=(string)$info->PriceLogo;
                $itemArray["PercentSupped"]=($info->PercentSupped)*1;
                $itemArray['WeightM']=($info->WeightGr)/1000;
                if ($priceTocCompare==-1 || $priceTocCompare>$itemArray["PriceM"])
                {
                  $priceTocCompare=$itemArray["PriceM"];   
                  $this->finalArray[]=$itemArray;
                }
              }
                /*$priceTocCompare=-1;
                foreach ($resLogin->SearchPartResult->FindByNumber as $info)
                {
                     $priceLogo=(string)$info->PriceLogo;
                    if (!array_key_exists($priceLogo,$this->MegaPartsStockAllowed_JAPAN))continue;
                    if ($this->MegaPartsStockAllowed[$priceLogo]==0) continue;
                     
                    $itemArray= array();
                    $itemArray["NumberM"]=(string)$info->DetailNum;
                    $itemArray["NameM"]=(string)$info->PartNameRus;
                    $itemArray["PriceM"]=($info->Price)*1; 
                    $itemArray["QuantityM"]=((((string)$info->Available)*1)==0 )?'>10': ((string)$info->Available)*1;
                    $itemArray["CurrencyM"]="";
                    $itemArray["BrandM"]=(string)$info->MakeName;
                    $itemArray["PriceLogo"]=(string)$info->PriceLogo;
                    $itemArray["PercentSupped"]=($info->PercentSupped)*1;
                    $itemArray['WeightM']=($info->WeightGr)/1000;
                    if ($priceTocCompare==-1 || $priceTocCompare>$itemArray["PriceM"])
                    {
                      $priceTocCompare=$itemArray["PriceM"];   
                   //   $this->finalArray[]=$itemArray;
                    }
                    
                    
                }
                * 
                * atempt for japan
                */  
                 
             
             
              
           }else
           {
             #var_dump($resLogin);
             $priceTocCompare=-1; 
             foreach ($resLogin->SearchPartResult as $info)
             {
                $priceLogo=(string)$info->PriceLogo;
                #var_dump($info);
                if (!array_key_exists($priceLogo,$this->StockAllowed))continue;
                if ($this->StockAllowed[$priceLogo]==0) continue;
                 
                $itemArray= array();
                $itemArray["NumberM"]=(string)$info->DetailNum;
                $itemArray["NameM"]=(string)$info->PartNameRus;
                $itemArray["PriceM"]=($info->Price)*1; 
                $itemArray["QuantityM"]=((((string)$info->Available)*1)==0 )?'>10': ((string)$info->Available)*1;
                 #var_dump($itemArray["QuantityM"]);
                $itemArray["CurrencyM"]="";
                //$itemArray["BrandM"]=explode("/",(string) $info->MakeName)[0];
              //  $itemArray["BrandM"]=$info->MakeName;
                $itemArray["BrandM"]=$this->CorrectBrand((string)$info->MakeName);
                $itemArray["PriceLogo"]=(string)$info->PriceLogo;
                $itemArray["PercentSupped"]=($info->PercentSupped)*1;
                $itemArray['WeightM']=($info->WeightGr)/1000;
                if ($priceTocCompare==-1 || $priceTocCompare>$itemArray["PriceM"])
                {
                  $priceTocCompare=$itemArray["PriceM"];   
                  $this->finalArray[]=$itemArray;
                }
              }
                /*$priceTocCompare=-1;
                foreach ($resLogin->SearchPartResult->FindByNumber as $info)
                {
                     $priceLogo=(string)$info->PriceLogo;
                    if (!array_key_exists($priceLogo,$this->MegaPartsStockAllowed_JAPAN))continue;
                    if ($this->MegaPartsStockAllowed[$priceLogo]==0) continue;
                     
                    $itemArray= array();
                    $itemArray["NumberM"]=(string)$info->DetailNum;
                    $itemArray["NameM"]=(string)$info->PartNameRus;
                    $itemArray["PriceM"]=($info->Price)*1; 
                    $itemArray["QuantityM"]=((((string)$info->Available)*1)==0 )?'>10': ((string)$info->Available)*1;
                    $itemArray["CurrencyM"]="";
                    $itemArray["BrandM"]=(string)$info->MakeName;
                    $itemArray["PriceLogo"]=(string)$info->PriceLogo;
                    $itemArray["PercentSupped"]=($info->PercentSupped)*1;
                    $itemArray['WeightM']=($info->WeightGr)/1000;
                    if ($priceTocCompare==-1 || $priceTocCompare>$itemArray["PriceM"])
                    {
                      $priceTocCompare=$itemArray["PriceM"];   
                   //   $this->finalArray[]=$itemArray;
                    }
                    
                    
                }
                * 
                * atempt for japan
                */  
               
           } 
            
            
     }  
     catch (Exception $e) 
     {
             
     }
         #$res=iconv('utf8','cp1251',(string)$resLogin->SearchPartResult->FindByNumber[0]->PartNameRus);
         #echo $res;
         #var_dump($resLogin);
        
   }   
     
  public function getfinalArray()
  {
    
    return  $this->finalArray;
  }  
  public function check()
  {
    return  $this->StockAllowed;
  } 
 private function CorrectBrand($Brand)
  {
      $BrandCorrectionArray=Array(
      "Hyundai / KIA"=>"HYUNDAI",
      
      );
      if (isset($BrandCorrectionArray[$Brand]))
      return $BrandCorrectionArray[$Brand];
      else return $Brand; 
  }  
  public function SoapObjectToCheck()
  {
      return $this->soapObjectToCheck;
  }      
 }    
    
    
    
?>