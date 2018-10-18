<?
  require($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');         
   if(!$USER->IsAuthorized() )
   {
      //require($_SERVER["DOCUMENT_ROOT"]."/personal/profile/index.php");
      exit; 
   }
   
    global $DB ;
    $decDetailArr=array();
    $sql="SELECT * FROM  b_iblock_element_prop_s31 WHERE IBLOCK_ELEMENT_ID=".$_REQUEST['ID']." LIMIT 1 " ;
    $result=$DB->query($sql);
    $DecString=$result->Fetch();
    $decDetailArr["ID"]= $DecString['IBLOCK_ELEMENT_ID'];
    $decDetailArr["NUMBER"]= $DecString['PROPERTY_255'];
    $decDetailArr["DELIVER"]= $DecString['PROPERTY_254']; 
    $decDetailArr["NUMBERBASE"]= $DecString['PROPERTY_252'];
    $decDetailArr["DATE"]= $DecString['PROPERTY_253'];   
    $decDetailArr["PLACES"]=$DecString['PROPERTY_258'] ;
    $decDetailArr["COMMENTS"]=$DecString['PROPERTY_259'];
    
   
    
    $sql="SELECT NAME  FROM b_user WHERE ID_1C={$DecString['PROPERTY_256']}";
    $result=$DB->query($sql); 
    $user= $result->Fetch();
    $decDetailArr["USERNAME"]= $user['NAME'];
    
    $decDetail["DECDETAIL"][]=$decDetailArr;
    
   
    $sql="SELECT PROPERTY_201 AS DATE, PROPERTY_197 AS NUMBER, IBLOCK_ELEMENT_ID  AS ID FROM  b_iblock_element_prop_s25 WHERE PROPERTY_260={$_REQUEST['ID']}";
    $result=$DB->query($sql);
    while($shipments=$result->Fetch() )
    {
        $decDetail["SHIPMENTS"][]=$shipments;
        
        
    }
    
    echo (json_encode($decDetail ,JSON_UNESCAPED_UNICODE));  
?>

 <??>