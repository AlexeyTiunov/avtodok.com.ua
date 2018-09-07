<?
    #if (isset($_POST["USER_LOGIN"])) $_REQUEST["USER_LOGIN"]=$_POST["USER_LOGIN"];
  #  if (isset($_POST["USER_PASSWORD"])) $_REQUEST["USER_PASSWORD"]=$_POST["USER_PASSWORD"]; 
   # var_dump($_REQUEST);
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
   if (isset($_POST["AUTO_AUTH"]) && $_POST["AUTO_AUTH"]=="Y" )
   {
    if ($USER->isAuthorized())
    {
        $USER->SavePasswordHash();
       #echo $cookie_login."done".$cookie_md5pass; 
       echo "1";
       die(); 
    }   
       
    $cookie_login = ${COption::GetOptionString("main", "cookie_name", "BITRIX_SM")."_LOGIN"};
    $cookie_md5pass = ${COption::GetOptionString("main", "cookie_name", "BITRIX_SM")."_UIDH"};
    $mas=$USER->LoginByHash($cookie_login, $cookie_md5pass);
    if ($USER->isAuthorized())
    {
        $USER->SavePasswordHash();
       #echo $cookie_login."done".$cookie_md5pass; 
       echo "1";
       die(); 
    } else
    {
        #var_dump($mas);
        #echo $cookie_login."not".$cookie_md5pass; 
        echo "0";
    }
   }
    
     if (isset($_POST["LOG_OUT"]) )
     {
           if ($USER->isAuthorized())
           {
             $USER->Logout();  
           }
         
     }
   if (isset($_REQUEST["USER_LOGIN"]))
   {
       if (isset($_REQUEST["USER_PASSWORD"]))
       {
           $USER->Login($_REQUEST["USER_LOGIN"],$_REQUEST["USER_PASSWORD"],"Y");
           
           
       }
   }  
   if (isset($_POST["CHECK_AUTH"]) || isset($_GET["CHECK_AUTH"]))
    {
         if ($USER->isAuthorized())
         {
             echo "1"; 
         } else
         {
             echo "0"; 
         }
         
     }  
   /*  $loginID=GetUserIDByLogin($_POST['LOGIN']); 
     $USER->Authorize($loginID,true);
     var_dump($_POST);
     echo $_POST['LOGIN'].$USER->GetID()."check"; */
    
    
    
    
?>