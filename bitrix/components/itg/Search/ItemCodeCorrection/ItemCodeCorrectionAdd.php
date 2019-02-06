<?
error_reporting(E_ALL); 
 class ItemCodeCorrectionAdd
 {
  protected  $AddToBeginningAr=Array();
  protected  $RemoveFromBeginningAr=Array();
  protected  $AddToEndAr=Array();
  protected  $RemoveFromEndAr=Array();
  protected  $ItemCode; 
  protected  $ModifyItemCodesAr= Array(); 
 
 function __construct($ItemCode,$AddToBeginningAr,$RemoveFromBeginningAr,$AddToEndAr,$RemoveFromEndAr)
  {
      $this->AddToBeginningAr=$AddToBeginningAr;  
      $this->RemoveFromBeginningAr=$RemoveFromBeginningAr;
      $this->AddToEndAr=$AddToEndAr;
      $this->RemoveFromEndAr=$RemoveFromEndAr;
      $this->ItemCode=$ItemCode;
      foreach ($this->AddToBeginningAr as $addprefix)
      {
           
           if ($this->IsAddingToBeeginningNeed($addprefix)) $this->AddToBeginning($addprefix);            
          
      }
      foreach ($this->RemoveFromBeginningAr as $remprefix)
      {
           if ($this->IsRemovingFromBeginningNeed($remprefix)) $this->RemoveFromBeginning($remprefix);            
          
      }
      foreach ($this->AddToEndAr as $addsuffix)
      {
          
          if ($this->IsAddingToEndNeed($addsuffix)) $this->AddToEnd($addsuffix);
      }
      foreach ($this->RemoveFromEndAr as $remsuffix)
      {      
       if  ($this->IsRemovingFromEndNeed($remsuffix)) $this->RemoveFromEnd($remsuffix);
      }
      
      
       foreach ($this->AddToBeginningAr as $addprefix)
       {
         $AddingToBeeginningNeed=$this->IsAddingToBeeginningNeed($addprefix);
         foreach ($this->AddToEndAr as $addsuffix)
         {
             if ($AddingToBeeginningNeed && $this->IsAddingToEndNeed($addsuffix))
             {
                 $this->AddToBeginningAndToEnd($addprefix,$addsuffix);  
                 
             } 
         } 
                     
          
      }
      
      foreach ($this->RemoveFromBeginningAr as $remprefix)
      {
        $RemovingFromBeginning=$this->IsRemovingFromBeginningNeed($remprefix); 
        foreach ($this->RemoveFromEndAr as $remsuffix)
        {
            if ($RemovingFromBeginning && $this->IsRemovingFromEndNeed($remsuffix))
            {
                $this->RemoveFromBeginningAndFromEnd($remprefix,$remsuffix);
            }
            
        }         
          
      }
      
      
  }  
   
      protected function IsAddingToBeeginningNeed($Prefix)
      {
        $PrefixPattern="/^{$Prefix}.*$/";
        if (preg_match($PrefixPattern,$this->ItemCode))
        {
          return false;     
        }   
            
          return true;
      }
  protected  function AddToBeginning($Prefix)
  {
       $this->ModifyItemCodesAr[]="".$Prefix.$this->ItemCode;
      
      
  }
  protected  function AddToBeginningAndToEnd($Prefix,$Suffix) 
  {
       $this->ModifyItemCodesAr[]="".$Prefix.$this->ItemCode.$Suffix;
      
      
  }
      protected function IsRemovingFromBeginningNeed($Prefix)
      {
        $PrefixPattern="/^{$Prefix}.*$/";
        if (preg_match($PrefixPattern,$this->ItemCode))
        {
          return true;     
        }   
           
          return false;
         
      }
  protected function RemoveFromBeginning($Prefix) 
  {   
      $PrefixPattern="/^({$Prefix})(.*)$/";
      $this->ModifyItemCodesAr[]=preg_replace($PrefixPattern,"$2",$this->ItemCode);
       
  }
  protected function RemoveFromBeginningAndFromEnd($Prefix,$Suffix) 
  {   
      $PrefixPattern="/^({$Prefix})(.*?)({$Suffix})$/";
      $this->ModifyItemCodesAr[]=preg_replace($PrefixPattern,"$2",$this->ItemCode);
       
  }  
      protected function IsAddingToEndNeed($Suffix)
      {
         $SuffixPattern="/^.*?{$Suffix}$/";
        if (preg_match($SuffixPattern,$this->ItemCode))
        {
          return false;     
        }   
           
          return true; 
      }
  protected function AddToEnd($suffix)
  {
       $this->ModifyItemCodesAr[]="".$this->ItemCode.$suffix;  
      
  }
      protected function IsRemovingFromEndNeed($Prefix)
      {
         $PrefixPattern="/^.*{$Prefix}$/";
        if (preg_match($PrefixPattern,$this->ItemCode))
        {
          return true;     
        }   
           
          return false;  
      }
   protected function RemoveFromEnd($Prefix)
   {
        $PrefixPattern="/^(.*)({$Prefix})$/";
      $this->ModifyItemCodesAr[]=preg_replace($PrefixPattern,"$1",$this->ItemCode);
       
   }  
   public function GetModifyItemCodesAr()
     {
         return $this->ModifyItemCodesAr;
     }   
     
 }   
    
    
    
?>