<?
  require_once ($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');
  global $USER;  
  function GetUserID_1CByID( $ID )
  {

  global $DB;
  $sql = "SELECT ID_1C FROM b_user WHERE ID='".$ID."'";

  $res = $DB->Query( $sql );

  if( $arRes = $res->Fetch() )
    return $arRes["ID_1C"];
  else
    return false;
 } 
  function getUserTypeDelivery($userID)
  {
        if ($userID==0 || $userID=="" || $userID==null)
        {
            return 0;
        } 
        global $DB;
      $sql="SELECT * FROM b_user WHERE ID={$userID} LIMIT 1"; 
      $result=$DB->Query($sql);
      $arrayUserInfo=$result->fetch();
      if (!isset ($arrayUserInfo["DeliveryType"]) )
      return 0;
      return $arrayUserInfo["DeliveryType"];
        
    } 
  function getUserTypePay($ID)
  {
      global $DB; 
      $sql = "SELECT Agreement_1C FROM b_user WHERE ID='".$ID."'";
      $res = $DB->Query( $sql );
      if( $Agrement = $res->Fetch() )      
      $Agreement_1C= $Agrement["Agreement_1C"];      
      if ($Agreement_1C=="" || $Agreement_1C==null)
      {
         return 0; 
      }
      $ID_1C=GetUserID_1CByID($ID); 
      $sql="SELECT * FROM `b_autodoc_agreements`  WHERE ClientCode='{$ID1C}' AND Code='{$Agreement_1C}' LIMIT 1";
      $result = $DB->Query( $sql );
       
      if ($Aresult=$result->Fetch())  
      {
            if ($Aresult["CurrencyCode"]=="USD")
        {
          
            
            return 0;
           
            
        }elseif($Aresult["CurrencyCode"]=="UAH" && str_replace(" ","",$Aresult["Caption"])=="ДОГОВОРБЕЗНАЛГРН." && $Aresult["Number"]!="")
        {   
            
            return 1;
            
        }  else
        {
            
             return 0; 
        }
           
      }
                                                         
      
      return   0;
     
 } 
 
  if(!$USER->IsAuthorized())                                                                 
  {
      $extraInfo['PAY']=0;
      $extraInfo['DELIVERY']=0; 
   
  } else
  {
      
        
   $extraInfo['PAY']=getUserTypePay($USER->GetID());
   $extraInfo['DELIVERY']=getUserTypeDelivery($USER->GetID());          
  }

  echo (json_encode($extraInfo,JSON_UNESCAPED_UNICODE)); 
  
  
  
    
    
?>