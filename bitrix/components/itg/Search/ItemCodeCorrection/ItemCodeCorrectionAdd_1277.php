<?
error_reporting(E_ALL);
include ("ItemCodeCorrection.php");
 class ItemCodeCorrectionAdd_1277 extends ItemCodeCorrectionAdd
 {
    public function __construct($itemCode,$ar1,$ar2,$ar3,$ar4)
     {
         $AddToBeginningAr[]="FP";
         $AddToBeginningAr[]="FPS";             
         $RemoveFromBeginningAr=Array();
         $RemoveFromBeginningAr[]="FP";
         $AddToEndAr=Array();  
         $RemoveFromEndAr=Array();  

         parent::__construct($itemCode,$AddToBeginningAr,$RemoveFromBeginningAr,$AddToEndAr,$RemoveFromEndAr);
         
     }
      
     
     
     
     
     
 }   
    
    
    
?>