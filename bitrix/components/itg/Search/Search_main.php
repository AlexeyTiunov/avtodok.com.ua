
<?
error_reporting(E_ALL);
 #require_once ($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');
require_once  ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/Search_ITG5.php");
function my_autoloader($class) {
    include 'ItemCodeCorrection/' . $class . '.php';
}

class Search_main
{
    private $items;
    private $brands = array();
    private $numRows = 0;
    private $exact = true;
    private $warehouse =false;
    private $warehouseUSA=false;
    private $classDir;   
    private $exactInAbout = false;  
    function __construct($params)
    {
       spl_autoload_register('my_autoloader'); 
       $this->classDir=$_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/ItemCodeCorrection/";    
       $ItemCode=$params['icode'];      
        #var_dump($ItemCode);   
       $items = new Search_ITG($params);  
       
       if ($items->getNumRows() > 0)
        {
               #var_dump("TEST");  
            $products = $items->getArrItems();
            $BrandsArray=$this->GetArrayToModifyItemCodeForBrands();
            $RegionsArray=$this->GetArrayToModifyItemCodeForRegions();
            foreach ($products as $product)
            {
                $this->items[]= $product;
                #var_dump($product["ItemCode"]);
            }
             $this->makeAfterSearchOptions($items );
           # var_dump($this->items);  
            foreach ($products as $product)
            {
              
                if (array_key_exists($product['RegionCode'],$RegionsArray))
                {
                    $ItemCodeCorrectionClassName="ItemCodeCorrectionAdd_".$product['RegionCode'];
                    $newobject= new $ItemCodeCorrectionClassName($product['ItemCode'],Array(),Array(),Array(),Array());
                    #var_dump($newobject);
                    foreach ($newobject->GetModifyItemCodesAr()as $ItemCodeMod)
                    {
                         var_dump($ItemCodeMod); 
                         $params['icode']=$ItemCodeMod;
                       $newsearch=new Search_ITG($params);
                    /*   foreach ($newsearch->getArrItems() as $newitem)
                       {
                          $this->items[]= $newitem; 
                       }
                       foreach ($newsearch->getBrans() as $key=>$brands)
                       {
                           $this->brands[$key]=$brands;
                       }
                       
                        $this->numRows+=$newsearch->getNumRows();
                        if ($this->exactInAbout===false )
                        {
                           $this->exactInAbout=$newsearch->getExactInAbout(); 
                        } 
                        if ($this->warehouse===false)
                        {
                            $this->warehouse=$newsearch->inOwnWarehouse();
                        }
                         if ($this->warehouseUSA===false)
                        {
                            $this->warehouseUSA=$newsearch->inOwnWarehouseUSA();
                        }*/
                        $this->makeAfterSearchOptions($newsearch);
                        
                    }
            
                    
                }
                if (array_key_exists($product['BrandCode'],$BrandsArray))
                {
                    $ItemCodeCorrectionClassName="ItemCodeCorrectionAdd_".$product['BrandCode'];
                    $newobject= new $ItemCodeCorrectionClassName($product['ItemCode'],Array(),Array(),Array(),Array());
                    foreach ($newobject->GetModifyItemCodesAr()as $ItemCodeMod)
                    {
                        $params['icode']=$ItemCodeMod;
                       $newsearch=new Search_ITG($params);
                       foreach ($newsearch->getArrItems() as $newitem)
                       {
                          $this->items[]= $newitem; 
                       }
                       $this->makeAfterSearchOptions($newsearch);
                     } 
                     /*
                     foreach ($newsearch->getBrans() as $key=>$brands)
                       {
                           $this->brands[$key]=$brands;
                       }
                     $this->numRows+=$newsearch->getNumRows();
                      if ($this->exactInAbout===false )
                      {
                        $this->exactInAbout=$newsearch->getExactInAbout(); 
                      } */ 
                   }  
                       
                
            }
            
            
            
            $brands = $items->getBrans();
            
        }
        else
        {
           $dir=opendir($this->classDir);
            while (($file = readdir($dir)) !== false) 
            {  
                 $file_search_pattern="/(^.*?)(\.php)$/";
                 if (!preg_match($file_search_pattern,$file)) continue;
                 
                 # var_dump($file);
                    $ItemCodeCorrectionClassName=preg_replace($file_search_pattern,"$1",$file);
                    $newobject= new $ItemCodeCorrectionClassName($ItemCode,Array(),Array(),Array(),Array());
                    foreach ($newobject->GetModifyItemCodesAr()as $ItemCodeMod)
                    {
                        #var_dump($ItemCode) ;
                       # var_dump($ItemCodeMod);
                         $params['icode']=$ItemCodeMod;  
                         $newsearch=new Search_ITG($params); 
                         $this->makeAfterSearchOptions($newsearch);   
                    }
                
                
            }
            
            
            
        }
        
        
     spl_autoload_unregister('my_autoloader');   
    }
   private function makeAfterSearchOptions($searchObject)
   {
        foreach ($searchObject->getArrItems() as $newitem)
                       {
                          $this->items[]= $newitem; 
                       }
                       foreach ($searchObject->getBrans() as $key=>$brands)
                       {
                           $this->brands[$key]=$brands;
                       }
                       
                        $this->numRows+=$searchObject->getNumRows();
                        if ($this->exactInAbout===false )
                        {
                           $this->exactInAbout=$searchObject->getExactInAbout(); 
                        } 
                        if ($this->warehouse===false)
                        {
                            $this->warehouse=$searchObject->inOwnWarehouse();
                        }
                         if ($this->warehouseUSA===false)
                        {
                            $this->warehouseUSA=$searchObject->inOwnWarehouseUSA();
                        }
       
   } 
   private function GetAarayToModifyItemCodeForItemCode($ItemCode)
   {
       
       
       
   }     
   private function GetArrayToModifyItemCodeForRegions()
    {
      $RegionsArray[1277]="Форма партс";  
        
        
       return $RegionsArray; 
    }
    private function GetArrayToModifyItemCodeForBrands()
    {
      $BrandsArray[20828]="MB";  
        
        
       return $BrandsArray; 
    }        
    public function getArrItems() 
    {
       
             return $this->items; 
        
        
    }    
   public function getNumRows()
    {
        return $this->numRows;
    } 
    public function getBrans()
    {
         return $this->brands;
    }  
    public function getExactInAbout()
    {
        return $this->exactInAbout;
    }  
    public function getExact()
    {
        return $this->exact;
    }
    public function inOwnWarehouse()
    {
        return $this->params['warehouse'];
    }
    public function inOwnWarehouseUSA()
    {
              return $this->params['warehouseUSA']; 
    }
        
}
    
    
    
    
?>