<?
    include "BrandGroup.php";
    
   $brandGroup=new BrandGroup(916);
    
   $groupCode =$brandGroup->getgroupCode();
    
    echo  $groupCode;
    
    $brandGroup=new BrandGroup("Mobis");  
    
    echo $brandGroup->getgroupCode();
    echo $brandGroup->getgroupName();   
    
     # $brandGrou=new BrandGroup();   
     # var_dump($brandGrou);
    
   #  var_dump($brandGroup->getbrandGroup()) ;
    
?>