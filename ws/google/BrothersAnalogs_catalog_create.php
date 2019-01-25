<?  
require_once($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');

 function getBrandName($brandcode)
 {
     return "BROTHER";
 }
 function modifyHeadWithTitleDescription($HTML,$titleWord,$descriptionWord)
 {
   $head=preg_replace("/(.*?)(<head.*?>)(.*?)(<\/head>)(.*)/ms","$3",$HTML);
   
   if (preg_match("/^(.*?)(<title>)(.*?)(<\/title>)(.*)$/s",$head)) 
   {  
      
      $head1=preg_replace("/^(.*?)(<title>)(.*?|\d*?)(<\/title>)(.*)$/s","$1$2",$head) ;
       $head2=preg_replace("/^(.*?)(<title>)(.*?|\d*?)(<\/title>)(.*)$/s","$4",$head) ;
       $head=$head1.$titleWord.$head2;
     
   }else
   {
       $title="<title>{$titleWord}</title>\n";  
       $head.=$title;
   }   
   
  
   $description="<meta name='description' content='{$descriptionWord}' />\n";
   $head.=$description;  
   $file_contents_m=preg_replace("/(.*?)(<head.*?>)(.*?)(<\/head>)(.*)/ms","$1$2".$head."$4$5",$HTML);
   return $file_contents_m; 
 }

 function getAnalogs($ItemCode,$BrandCode,&$InfoArrayCrosses) 
  {
      // $InfoArrayCrosses=array();
      global $DB;
       $sql="SELECT * FROM b_autodoc_analogs_m WHERE B1Code={$BrandCode} AND I1Code='{$ItemCode}' ";
       $result=$DB->query($sql);
       while ($Crosses=$result->Fetch())  
       {
           $sql="SELECT * FROM b_autodoc_items_m WHERE ItemCode='{$Crosses["I2Code"]}' AND BrandCode={$Crosses['B2Code']} LIMIT 1";
           $sub_result=$DB->query($sql);
           if ($item=$sub_result->Fetch() )
           {
              $InfoArrayCrosses[]=$item; 
           }   
            
       }
      
   }
 $server_document_root=$_SERVER["DOCUMENT_ROOT"];
 $catalog_root= $server_document_root."/catalog";
 //$catalog_brand_root=$catalog_root."/".getBrandName(39415105)."/";
 
 $file_contents=file_get_contents($server_document_root."/index.html");

 if (!$file_contents) 
 {   
      echo $server_document_root."/index.html";
      exit("error_1");
 }  
 
 

$sql="SELECT * FROM b_autodoc_items_m WHERE BrandCode=39415105";   
  $result=$DB->Query($sql);
  
  $itemsInfoArray=Array();
  $InfoArrayCrosses=Array();  
   while ($itemRow=$result->Fetch()) 
   {
        $catalog_brand_root=$catalog_root."/".getBrandName(39415105)."/".$itemRow["ItemCode"]."/";
        if (!is_dir($catalog_brand_root))
        {
              $is_dir_made=mkdir($catalog_brand_root);
               if (!$is_dir_made)  
               {     echo  $catalog_brand_root;
                     exit("error_2\n");    
               } 
        }
        
        $InfoArrayCrosses=Array();
        getAnalogs($itemRow["ItemCode"],$itemRow["BrandCode"],$InfoArrayCrosses);
        foreach ($InfoArrayCrosses as $itemAnalogRow)   
        {
            $new_file_root=$catalog_brand_root."/".$itemAnalogRow["ItemCode"]; 
            $file_handle=fopen($new_file_root,"w+");
            if (!$file_handle) exit("error_23n"); 
            $file_contents_m=modifyHeadWithTitleDescription($file_contents,"".$itemAnalogRow["ItemCode"],$itemRow["Caption"]);
            $byte_written=fwrite($file_handle,$file_contents_m);
            if (!$byte_written) exit("error_4\n");
            
        }
       
       
   }
  
  
  
    
?>