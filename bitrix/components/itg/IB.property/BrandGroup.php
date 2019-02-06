<?
     
    class BrandGroup
    {
    private $brandGroup;
    private $itemToCheck;
    private $groupCodeToReturn;
    private  $groupNameToReturn;    
    function   __construct($itemToCheck)
    {
       #include "BrandGroupInfo.php";
       require ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/IB.property/BrandGroupInfo.php"); 
       $this->brandGroup=$brandGroup;
       
       $this->groupCodeToReturn=0;
      // $this->$groupNameToReturn="";     
       if (is_int($itemToCheck) )  
       {
          $this->itemToCheck=$itemToCheck;  
         $this-> dealWithInt();  
           
       } elseif (is_string($itemToCheck))
        
       { 
        $this->itemToCheck=strtoupper($itemToCheck);   
         $this-> dealWithString() ; 
       } 
        
    }
   
    private function dealWithInt()
    {
       foreach ($this->brandGroup as $firstkey=>$group)
       {
           foreach ($group as $key=>$value)
           {
                if ($key=="NAME") 
               {
                
                 $this->groupNameToReturn=$value; 
                 continue; 
               }
               if ($key=="BRAND_CODES")
               {
                  
                  foreach ($value as $subkey=>$subvalue)
                  {    # var_dump($subvalue);
                        # var_dump($this->itemToCheck);
                      if  ($this->itemToCheck==$subvalue)
                      {
                          $this->groupCodeToReturn=$firstkey;
                          break 3;
                      }
                      
                  } 
                   
                                        
               } 
           }
          
           
           
           
       } 
        
    }    
     private function dealWithString() 
     {
         foreach ($this->brandGroup as $firstkey=>$group)
       {
           foreach ($group as $key=>$value)
           {
               if ($key=="NAME") 
               {
                
                 $this->groupNameToReturn=$value; 
                 continue; 
               }
               if ($key=="BRAND_CODES")
               {
                  foreach ($value as $subkey=>$subvalue)
                  {
                      if  ($this->itemToCheck==$subkey)
                      {
                          $this->groupCodeToReturn=$firstkey;
                          break 3;
                      }
                      
                  } 
                   
                                        
               } 
           }
          
           
           
           
       } 
         
     }   
    public function getgroupCode()
    {
        return $this->groupCodeToReturn;
    }    
    public function getgroupName()
    {
        return $this->groupNameToReturn;        
    }
     public function getbrandGroup()
     {
         return $this-> brandGroup;
     }     
     public static function getBrandsByGroupID($ID)
     {
        # include "BrandGroupInfo.php";
        require ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/IB.property/BrandGroupInfo.php"); 
         foreach($brandGroup as $id_group=>$groups)
          {
              if ($id_group==$ID)
               {
                 return $groups;  
                   
               }
              
              
          }
         
         return false;
         
     }   
        
}
    
    
    
?>