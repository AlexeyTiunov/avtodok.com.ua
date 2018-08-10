<?php
require_once  ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/timer.php"); 
  ignore_user_abort(false);  
 class ConnectRovenko
 {
   private $url_old='http://b2b.genparts.com.ua/';  
   private $url='http://genparts.com.ua/webservicebb/product';    
   
   
   private $requestPattern_old="<wservice>
            <auth>4c6f6d4a76334d71456c5a6c5971303d</auth>      
            <request>
                <action>product</action>
                <method>info</method>
                <search>hard</search>
                <by>sku</by>
                <limit>30</limit>
            </request>

            <params>
                <product>
                    <sku> #ITEM_CODE# </sku>
                </product>
            </params>
        </wservice>";  
    /*private $requestPattern='<wservice>     
      <auth>5a4f45655454424f4f726b33306a7a6a396832484a47745136734341473465707a70526a49337a49</auth> 
    <params>
      <search_type>soft</search_type>
    </params>
    <request>
      <vendorcode>#ITEM_CODE#</vendorcode> 
    </request>
  </wservice>       
    
    
    ';  */  
      private $requestPattern='<wservice>     
      <auth>48535368474c504b554a4f6c4d3149586f6c746d62706f51574b726b7573656f42516a2f3538646e6b7357612b795a3172794f7970644f4e47673d3d</auth> 
    <params>
      <search_type>soft</search_type>
    </params>
    <request>
      <vendorcode>#ITEM_CODE#</vendorcode> 
    </request>
  </wservice>       
    
    
    ';       
        
        
    private $domDocument;  
    private $itemBlankError;
    private $simpleXMLdom; 
    private $finalArray=array(); 
     
 function  __construct ($itemCode) 
 {     
        //exit();
       // return;
        if ($itemCode=="" or $itemCode==null)
        {
           throw new Exception("");
           exit; 
        }
       # $itemCode="A".$itemCode;
        $itemCode=$itemCode;  
        $this->requestPattern=str_replace("#ITEM_CODE#",$itemCode,$this->requestPattern);
        
        #var_dump($this->requestPattern);
        $timer = new timer();
        $timer->start_timer();   
        $ch = curl_init($this->url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $this->requestPattern);
        curl_setopt($ch, CURLOPT_TIMEOUT, 7);
        curl_setopt($ch,CURLOPT_IPRESOLVE,CURL_IPRESOLVE_V4);
        $result = curl_exec($ch);
        
       $time=$timer->end_timer();
     #  echo $time."<br>"; 
       
        $timer->start_timer();  
        $this->domDocument= new DOMDocument();
        $this->domDocument->loadXML($result);
        
         if (!$this->domDocument) {
                      throw new Exception("");
                       exit; 
         
                    } else
                    {
                        $this->simpleXMLdom = simplexml_import_dom($this->domDocument);
                    }
           
                   $this->makeArrayStrings();
        $time=$timer->end_timer();
    #   echo $time."<br>"; 
     
 }
private function makeArrayStrings()
{
    if ($this->simpleXMLdom===false)
    {
         throw new Exception("");
         exit; 
        
    }
  
    
    foreach($this->simpleXMLdom->product->position as $position)
    {
        $itemArray["NumberR"]=(string)$position->vendorcode;
        $itemArray["NameR"]= (string)$position->name; 
        $itemArray["PriceR"]=(string)$position->price;
        $itemArray["QuantityR"]=intval((string)$position->quantity); 
        $itemArray["CurrencyR"]=(string)$position->name;
        $itemArray["BrandR"]=(string)$position->vendor; 
        
      $this->finalArray[]=$itemArray;  
        
    }
    
    
     
    
} 
public function checkDom()
 {
    echo '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'; 
    var_dump($this->simpleXMLdom); 
    var_dump( $this->finalArray); 
     
 }    
 public function getfinalArray()
{
    
    return  $this->finalArray;
}     
     
     
     
 }   
    
    
    
    
?>