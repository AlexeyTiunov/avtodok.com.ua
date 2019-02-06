<?
  ignore_user_abort(false); 
  $encoding=$_GET['$encoding'];
  $url=$_GET['url']; 
  try
  { 
      #sleep(3);
     
  $SoapClient = @new SoapClient($url, array('encoding'=>$encoding,'connection_timeout'=>5,'exceptions=>true')); 
  }
  catch (SoapFault $ex)
                {
                  echo "<a>0</a>";
                  exit();                    
                }                                                                                
  echo "<a>1</a>"; 
   
    
    
?>