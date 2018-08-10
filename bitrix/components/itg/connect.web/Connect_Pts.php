<?php
ignore_user_abort(false);
 class ConnectPts 
 {
     
    private $url="http://pts.in.ua/price4.php";   //http://pts.in.ua/price4.php?oem=11126aa000&h=Cj3wRlCo
   # private $requestPattern =$this->url."?oem=#ITEM_CODE#";
    private $requestPattern;
     
    private $recievedResult; 
    private $finalArray=array(); 
    
    function  __construct ($itemCode) 
    {     
        //exit();
       // return;
       # var_dump("wwwwwwwwwwwwwww") ; 
        $this->requestPattern=$this->url."?oem=#ITEM_CODE#&h=Cj3wRlCo"; 
        if ($itemCode=="" or $itemCode==null)
        {
           throw new Exception("");
            #var_dump("eeeeeeeeeee") ;
           exit; 
        }
       # $itemCode="A".$itemCode;
        $itemCode=$itemCode;  
        $this->requestPattern=str_replace("#ITEM_CODE#",$itemCode,$this->requestPattern);
        
        #var_dump($this->requestPattern);
         
        $ch = curl_init($this->requestPattern);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        #curl_setopt($ch, CURLOPT_POST, 1);
       # curl_setopt($ch, CURLOPT_POSTFIELDS, $this->requestPattern);
        curl_setopt($ch, CURLOPT_TIMEOUT, 7);
        $result = curl_exec($ch);
       #var_dump("wwwwwwwwwwwwwww".$result) ;
        $this->recievedResult= $result;
        $this->makeArrayStrings();
        
        
      } 
     
      public function getfinalArray()
        {
            
            return  $this->finalArray;
        }     
             
      private function makeArrayStrings()
        {
            if ($this->recievedResult=="") exit();
            
            $resultArray=explode("<br/>",$this->recievedResult);
            if (count($resultArray)==1 )
            {
                $infoItem=$resultArray[0];
                $infoItemArray=explode(";",$infoItem);
                if (count ($infoItemArray)>=6)
                {
                       $itemArray["NumberP"]= $infoItemArray[2];
                       $itemArray["NameP"]=  $infoItemArray[3];
                       $itemArray["PriceP"]= floatval($infoItemArray[5]);
                       $itemArray["QuantityP"]= preg_replace("/[\<,\>]/","",$infoItemArray[4]); 
                       $itemArray["CurrencyP"]="UAH";
                       $itemArray["BrandP"]= $infoItemArray[1] ;
                      $this->finalArray[]=$itemArray;  
                         #var_dump($itemArray);
                }
                
                
                
            }            
            
            
        }
     
        public function checkDom()
         {
            echo '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'; 
           # var_dump($this->simpleXMLdom); 
           # var_dump( $this->finalArray); 
             
         }    
     
       
     
     
 }  
    
    
    
    
    
    
?>