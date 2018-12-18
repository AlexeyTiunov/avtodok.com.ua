<?  
require_once($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');

 function getBrandName($brandcode)
 {
     return "BROTHER";
 }

 $server_document_root=$_SERVER["DOCUMENT_ROOT"];
 $catalog_root= $server_document_root."/catalog";
 $catalog_brand_root=$catalog_root."/".getBrandName(39415105)."/";
 
 $file_contents=file_get_contents($server_document_root."/index.html");

 if (!$file_contents) 
 {   
      echo $server_document_root."/index.html";
      exit("error_1");
 }              
 

$sql="SELECT * FROM b_autodoc_items_m WHERE BrandCode=39415105";   
  $result=$DB->Query($sql);
  
  $itemsInfoArray=Array();
  
  if (!is_dir($catalog_brand_root))
  {
      $is_dir_made=mkdir($catalog_brand_root);
       if (!$is_dir_made)  
       {     echo  $catalog_brand_root;
             exit("error_2\n");    
       } 
  }
  
  
  while ($itemRow=$result->Fetch())
  {
           $new_file_root=$catalog_brand_root."/".$itemRow["ItemCode"];
            
            $file_handle=fopen($new_file_root,"w+");
            if (!$file_handle) exit("error_23n"); 
            $byte_written=fwrite($file_handle,$file_contents);
            if (!$byte_written) exit("error_4\n");   
      
  }
    
    
?>