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
    
    $cookie_login = ${COption::GetOptionString("main", "cookie_name", "BITRIX_SM")."_LOGIN"};
    $cookie_md5pass = ${COption::GetOptionString("main", "cookie_name", "BITRIX_SM")."_UIDH"};
    $mas=$USER->LoginByHash($cookie_login, $cookie_md5pass);
    if ($USER->isAuthorized())
    {
        $USER->SavePasswordHash();
       echo $cookie_login."done".$cookie_md5pass; 
       die(); 
    } else
    {
        var_dump($mas);
        echo $cookie_login."not".$cookie_md5pass; 
    }
    
   /*  $loginID=GetUserIDByLogin($_POST['LOGIN']); 
     $USER->Authorize($loginID,true);
     var_dump($_POST);
     echo $_POST['LOGIN'].$USER->GetID()."check"; */
    
    
    
    
?>