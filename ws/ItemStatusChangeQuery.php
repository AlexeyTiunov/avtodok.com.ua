<?
    require($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php'); 
    global $DB;
    
    $BASKET_ID=preg_replace("/[^0-9]*/i","",$_REQUEST["BASKET_ID"] );
    if ($BASKET_ID=="") exit("ERROR_BASKET_ID");
    
    $STATUS_CODE= preg_replace("/[^0-9]*/","",$_REQUEST["STATUS_CODE"] );   
     if ($STATUS_CODE=="") exit("ERROR_STATUS_CODE");
     
     $STATUS_CODE.="#?";
    // echo $STATUS_CODE;
     if (!detectPreviousStatusChangeQuery($BASKET_ID)) 
     {   
     $sql="INSERT INTO b_sale_basket_props (BASKET_ID,NAME,VALUE,CODE,SORT) 
     VALUES({$BASKET_ID},'Запрос на изменение статуса','{$STATUS_CODE}','ItemStatusChangeQuery',100)     
     ";
         $DB->query($sql);
        echo (updateOrderDate($BASKET_ID)==true)?1:0;
     } else
     {
        $sql="UPDATE b_sale_basket_props SET VALUE='{$STATUS_CODE}' WHERE BASKET_ID={$BASKET_ID} AND CODE='ItemStatusChangeQuery' " ;  
         $DB->query($sql);
         echo (updateOrderDate($BASKET_ID)==true)?1:0;
     }
     
    
     
     function updateOrderDate($BASKET_ID)
     {
          global $DB;
          $sql ="SELECT ORDER_ID FROM b_sale_basket WHERE ID={$BASKET_ID} LIMIT 1";
          $result= $DB->query($sql); 
          $ORDER_ID_ARRAY=$result->Fetch();
          if (isset($ORDER_ID_ARRAY['ORDER_ID']) && $ORDER_ID_ARRAY['ORDER_ID']!="" )
          {
              
            $date=date("Y-m-d H:i:s");
            $sql="UPDATE b_sale_order SET DATE_UPDATE='{$date}' WHERE ID={$ORDER_ID_ARRAY['ORDER_ID']}";
           $result=$DB->query($sql); 
           if ($result->AffectedRowsCount()>0)
           {
               return true;
           }else
           {
               return false;
           }
             
          }  
          
          return false ; 
         
     }
    
    
     function detectPreviousStatusChangeQuery($BASKET_ID)
    {
        global $DB;
        $sql="SELECT * FROM b_sale_basket_props WHERE BASKET_ID={$BASKET_ID} AND CODE='ItemStatusChangeQuery' LIMIT 1" ;
        $result=$DB->query($sql);
        $row=$result->Fetch();
        if ($row["CODE"]==='ItemStatusChangeQuery')
        {
            return true;
        }else
        {
            return false;
        }
        
    }
    
    
    
?>