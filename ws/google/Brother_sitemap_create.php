<?
  require($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');  
  global $DB;
  function getMainPicDrectorySite()
  {
      return "/ws/";
  }
  function getPicturePath($item_code,$suffix,$pictureBase64)
  {
       
       $main_pic_derectory_site=getMainPicDrectorySite();
       $main_pic_derectory=$_SERVER["DOCUMENT_ROOT"].$main_pic_derectory_site;
       
       $default_path=$main_pic_derectory_site."default_foto.jpeg";       
      
       $new_full_file_path=$main_pic_derectory.$item_code.$suffix.".jpeg";
       $new_file_path=$main_pic_derectory_site.$item_code.$suffix.".jpeg";
        
       
       if (file_exists($new_full_file_path))
       {            
           return $new_file_path;
       }
       if ($item_code==null || $item_code=="") 
       return $default_path;
      
       $PictureBase64=$pictureBase64;
       
        if ($PictureBase64=='')
       {
        return $default_path."1";      
       }
       $PictureBase64Decoded=base64_decode($PictureBase64);
       
        $im=imagecreatefromstring($PictureBase64Decoded);
        
        if (imagejpeg($im,$new_full_file_path))
        {
             return $new_file_path;
        } else
        {  
          
         return $default_path."3"; 
          
       }            
       
      ///////////////////////////////////////////////
    
      
      
  }
  
  $sql="SELECT * FROM b_autodoc_items_m WHERE BrandCode=39415105";   
  $result->Query($sql);
  
  
  
  while ($itemRow=$result->Fetch())
  {
      
      
  }
  
     
    
    
    
?>