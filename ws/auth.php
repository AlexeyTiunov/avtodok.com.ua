<?
    require_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php');   
    global  $USER;
    function GetUserIDByLogin ($Login) 
    {
        global $DB;
        
        $sql="SELECT ID FROM b_user WHERE LOGIN='{$Login}' LIMIT 1" ;
        
          $ID=$DB->Query($sql)->Fetch()['ID']; 
          if ($ID==null || $ID=="")
          {
             return 0; 
          }else
          {
            return $ID; 
          }
        
         
    }
    if ($USER->isAuthorized())
    {
       echo $_POST['LOGIN'].$USER->GetID()."done";
       die(); 
    }
    
     $loginID=GetUserIDByLogin($_POST['LOGIN']); 
     $USER->Authorize($loginID,true);
     var_dump($_POST);
     echo $_POST['LOGIN'].$USER->GetID()."check";
    
    
    
    
?>