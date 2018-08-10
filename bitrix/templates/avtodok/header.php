 <?
    #header('Expires: Sun, 09 May 2010 06:00:00 GMT');
   # header('Cache-Control: no-cache, must-revalidate');
   # header('Pragma: no-cache');
  # header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
?>

<!doctype html public "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
 <?
   #<!--
#<!DOCTYPE html PUBLIC  "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
 
#<html xmlns="http://www.w3.org/1999/xhtml">  -->  

?>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=<?echo LANG_CHARSET;?>">   
<?#<meta http-equiv="Cache-Control" content="no-cache"> 
#<!--<meta name='yandex-verification' content='4bb9380d20d31a5b' > --> ?>
<meta name='yandex-verification' content='59d9f041c36128f5' >
<meta name='wmail-verification' content='d613cd686287862a6958a1b7690c9f7b' >
<meta name="wot-verification" content="1f557ccd1f08a65ef73c">
<link rel="SHORTCUT ICON" HREF="/logo3.png">
<?$APPLICATION->ShowMeta("keywords","keywords",false)?>
<?$APPLICATION->ShowMeta("description","description",false)?>
<title><?$APPLICATION->ShowTitle()?></title>
<?$APPLICATION->ShowCSS(true,false);?>
<?$APPLICATION->ShowHeadStrings()?>
<?$APPLICATION->ShowHeadScripts()?>

<?
global $LANGUAGE ;
function GetUser1CID( $ID )
{

  global $DB;
  $sql = "SELECT ID_1C FROM b_user WHERE ID='".$ID."'";

  $res = $DB->Query( $sql );

  if( $arRes = $res->Fetch() )
    return $arRes["ID_1C"];
  else
    return false;
} 
function CheckBrowser($HTTPUSERAGENT) 
{
    if (strpos($HTTPUSERAGENT,"Opera") !==false)
   {
     $ua="Opera";
     $uaVers = substr($HTTPUSERAGENT,strpos($HTTPUSERAGENT,"Opera")+6,4);
   }
elseif (strpos($HTTPUSERAGENT,"Gecko") !==false)
   {
     $ua="Netscape";
     $uaVers = substr($HTTPUSERAGENT,strpos($HTTPUSERAGENT,"Mozilla")+8,3);
   }
elseif (strpos($HTTPUSERAGENT,"Windows") !==false)
   {
     $ua="Explorer";
     $uaVers = substr($HTTPUSERAGENT,strpos($HTTPUSERAGENT,"MSIE")+5,3);
   }
else
   {
     $ua=$HTTPUSERAGENT;
     $uaVers=""; 
   }
    
   return  $ua.$uaVers;
    
}      

echo "<script type=\"text/javascript\" src=\"/bitrix/js/itgScript/jquery.min.js\"></script>"; 
$jquery="<script type=\"text/javascript\" src=\"/bitrix/js/itgScript/jquery.min.js\"></script>";   
#<!--<script type="text/javascript" src="/bitrix/js/itgScript/Nivo-Slider-master/scripts/jquery-1.9.0.min.js"></script>  -->         
?>
    
     <script type="text/javascript" src="/bitrix/js/itgScript/Nivo-Slider-master/jquery.nivo.slider.js"></script>

     <link rel="stylesheet" href="/bitrix/js/itgScript/Nivo-Slider-master/themes/default/default.css" type="text/css" media="screen" >
     <link rel="stylesheet" href="/bitrix/js/itgScript/Nivo-Slider-master/themes/light/light.css" type="text/css" media="screen" >
     <link rel="stylesheet" href="/bitrix/js/itgScript/Nivo-Slider-master/themes/dark/dark.css" type="text/css" media="screen" >
     <link rel="stylesheet" href="/bitrix/js/itgScript/Nivo-Slider-master/themes/bar/bar.css" type="text/css" media="screen" >
     <link rel="stylesheet" href="/bitrix/js/itgScript/Nivo-Slider-master/nivo-slider.css" type="text/css" media="screen" >
   
<? 
if(stripos($_SERVER['REQUEST_URI'],'/autodoc/shipmentReadyToDeliver.php') !== false) 
{
   $jquery= "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>";

    ?>
     <!--  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  
       <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> -->
      
      <!--################################## 
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
       
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script> 
       
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
       ################################## -->
       <link rel="stylesheet" href="/bitrix/js/bootstrap.min.css">
       
        <script src="/bitrix/js/popper.min.js"></script> 
       
        <script src="/bitrix/js/bootstrap.min.js"></script>
         
    <?
}
#echo $jquery;

if(stripos($_SERVER['REQUEST_URI'],'/personal/order/radiators/') !== false)
{
	#echo "<script type=\"text/javascript\" src=\"/bitrix/js/itgScript/jquery.min.js\"></script>";
	#echo "<script type=\"text/javascript\" src=\"/bitrix/components/itg/radiators/ajax.js\"></script>";
	#echo "<script type=\"text/javascript\" src=\"/bitrix/components/itg/radiators/jquery-ui-1.8.14.custom.min.js\"></script>";
	#echo "<link type=\"text/css\" href=\"/personal/order/radiators/jquery-ui-1.8.14.custom.css\" rel=\"stylesheet\" />";
    echo "<script type=\"text/javascript\" src=\"/personal/suppload/KOYORAD_CATALOG.js?v=1\"></script>"; 
	echo "<style type=\"text/css\">
			/*demo page css*/
			body{ font: 62.5%;}
			.demoHeaders { margin-top: 2em; }
			.popup {padding: .4em 1em .4em 14px;text-decoration: none;position: relative;}
			.popup span.ui-icon {margin: 0 5px 0 0;position: absolute;left: .2em;top: 50%;margin-top: -8px;}
			ul#icons {margin: 0; padding: 0;}
			ul#icons li {margin: 2px; position: relative; padding: 4px 0; cursor: pointer; float: left;  list-style: none;}
			ul#icons span.ui-icon {float: left; margin: 0 4px;}
		</style>";
}
if(stripos($_SERVER['REQUEST_URI'],'/personal/order/catalog/') !== false)
{
	global $itgCatalogPage;
	$itgCatalogPage = 'insert';
}
if(stripos($_SERVER['REQUEST_URI'],'/personal/order/radiators/') !== false)
{
	global $itgCatalogPage;
	$itgCatalogPage = 'radiators';
}
if(stripos($_SERVER['REQUEST_URI'],'/auth/Registration/') !== false)
{
	#echo "<script type=\"text/javascript\" src=\"/bitrix/js/itgScript/jquery.min.js\"></script>";
	echo "<script type=\"text/javascript\" src=\"/auth/Registration/validateBeforeSend.js\"></script>";
}
if(stripos($_SERVER['REQUEST_URI'],'/autodoc/search') !== false)
{
	#echo "<script type=\"text/javascript\" src=\"/bitrix/js/itgScript/jquery.min.js\"></script>";
	#echo "<script type=\"text/javascript\" src=\"/bitrix/components/itg/Search/ajax.js\"></script>";
}
if(stripos($_SERVER['REQUEST_URI'],'/personal/suppload') !== false)
{
	#echo "<script type=\"text/javascript\" src=\"/bitrix/js/itgScript/jquery.min.js\"></script>";
   # echo "<script type=\"text/javascript\" src=\"http://parts.avtodok.com.ua/personal/suppload/test.js\"></script>";
    #echo "<script type=\"text/javascript\" src=\"/bitrix/components/itg/Search/ajax1.js\"></script>";  
}
if(stripos($_SERVER['REQUEST_URI'],'/index.php') !== false)  
{
    ?>
     <script>
    // alert("check");
     </script>
    <?
}    
#echo "<script type=\"text/javascript\" src=\"/bitrix/js/itgScript/jquery.min.js\"></script>";    
echo "<script type=\"text/javascript\" src=\"/personal/suppload/test.js?v=8\"></script>"; 
echo "<script  type=\"text/javascript\" src=\"/bitrix/components/itg/Search/ajax1.js?v=11\"></script>";   

/*<!--<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-25472309-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script> --> */ ?>

<script type="text/javascript">
 
function theRotator() {
    // Устанавливаем прозрачность всех картинок в 0
    $('div#rotator ul li').css({opacity: 0.0});
    $('div#rotator ul li').css("display","none");
    // Берем первую картинку и показываем ее (по пути включаем полную видимость)
    $('div#rotator ul li:first').css({opacity: 1.0});
    $('div#rotator ul li:first').css("display","block");
    // Вызываем функцию rotate для запуска слайдшоу, 5000 = смена картинок происходит раз в 5 секунд
    setInterval('rotate()',10000);
}
 
function rotate() {    
    // Берем первую картинку
    var current = ($('div#rotator ul li.show')?  $('div#rotator ul li.show') : $('div#rotator ul li:first'));
 
    // Берем следующую картинку, когда дойдем до последней начинаем с начала
    var next = ((current.next().length) ? ((current.next().hasClass('show')) ? $('div#rotator ul li:first') :current.next()) : $('div#rotator ul li:first'));    
 
    // Расскомментируйте, чтобы показвать картинки в случайном порядке
    // var sibs = current.siblings();
    // var rndNum = Math.floor(Math.random() * sibs.length );
    // var next = $( sibs[ rndNum ] );
 
    // Подключаем эффект растворения/затухания для показа картинок, css-класс show имеет больший z-index
    next.css({opacity: 0.0})
    next.css("display","block") 
    .addClass('show')
    .animate({opacity: 1.0}, 500);
 
    // Прячем текущую картинку
    current.animate({opacity: 0.0}, 500)
    current.css("display","none")
    .removeClass('show');
};
function rotateBack() {    
    // Берем первую картинку
    var current = ($('div#rotator ul li.show')?  $('div#rotator ul li.show') : $('div#rotator ul li:last'));
 
    // Берем следующую картинку, когда дойдем до последней начинаем с начала
    var next = ((current.prev().length) ? ((current.prev().hasClass('show')) ? $('div#rotator ul li:last') :current.prev()) : $('div#rotator ul li:last'));    
 
    // Расскомментируйте, чтобы показвать картинки в случайном порядке
    // var sibs = current.siblings();
    // var rndNum = Math.floor(Math.random() * sibs.length );
    // var next = $( sibs[ rndNum ] );
 
    // Подключаем эффект растворения/затухания для показа картинок, css-класс show имеет больший z-index
    next.css({opacity: 0.0})
    next.css("display","block") 
    .addClass('show')
    .animate({opacity: 1.0}, 500);
 
    // Прячем текущую картинку
    current.animate({opacity: 0.0}, 500)
    current.css("display","none")
    .removeClass('show');
};
 
$(document).ready(function() {        
    // Запускаем слайдшоу
    theRotator();
});
       $(".filterT").live("click",function(){
         
            var FilterArray={};
           $("input").each(function(){
            
             if ($(this).attr('checked')=='checked')
             {
               FilterArray[$(this).val()]=$(this).val();  
             }
               
                
               
               
               
           }) 
           $.ajax({
           type:"POST",
           url:"/personal/order/oil/oildetails.php",
           dataType:"html",            
           data: FilterArray,
           success: function(data){
                $('#content').html("");
                $('#content').html(data);
                
               },
           error: function(XMLHttpRequest, textStatus, errorThrown)
           { 
             
               
           }   
         
         
       }) 
            
            
            
            
        });  
        $("#WideSearch").live("click",function(){
        if ($("#left_sb").css("display")=="block")  
        {  
         $("#comon").css("width","100%");
         $("#left_sb").css("display","none"); 
         $("#WideSearch").attr("src","/bitrix/templates/avtodok/images/ArrowWideSearchRight.jpg");
         $("#WideSearch").css("width","3%") ; 
        }else
        {
         $("#comon").css("width","72%");
         $("#left_sb").css("display","block");   
         $("#WideSearch").attr("src","/bitrix/templates/avtodok/images/ArrowWideSearchLeft.jpg"); 
         $("#WideSearch").css("width","5%") ;  
        }    
            
        });
       // $(window).resize(function(){
        //  if ($("#left_sb").css("display")=="block")  
        //    {  
        //     $("#comon").css("width","100%");
        //     $("#left_sb").css("display","none");    
        //    }else
        //    {
        //        $("#comon").css("width","74%");
        //     $("#left_sb").css("display","block");    
                
         //   }      
      //  }); 
</script>

<!-- ############################################ -->
              <!-- Chatra {literal}-->
        <script>
            ChatraID = 'iCxbr9nKvtz7wjYtd';
            (function(d, w, c) {
                var n = d.getElementsByTagName('script')[0],
                    s = d.createElement('script');
                w[c] = w[c] || function() {
                    (w[c].q = w[c].q || []).push(arguments);
                };
                s.async = true;
                s.src = (d.location.protocol === 'https:' ? 'https:': 'http:')
                    + '//call.chatra.io/chatra.js';
                n.parentNode.insertBefore(s, n);
            })(document, window, 'Chatra');
        </script>
        <!-- /Chatra {/literal} -->









<!-- ############################################ --> 
  
</head>
<body> <?$APPLICATION->ShowPanel();?>
 <script type="text/javascript">
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//','ga');

  ga('create', 'UA-44421695-1', 'avtodok.com.ua');
  ga('send', 'pageview');

</script>  


          <!-- Код тега ремаркетинга Google -->
      
        <script type="text/javascript">
      
        var google_conversion_id = 922186473;
        var google_custom_params = window.google_tag_params;
        var google_remarketing_only = true;
        
        </script>
        <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
        </script>
        <noscript>
        <div style="display:inline;">
        <img height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/922186473/?value=0&amp;guid=ON&amp;script=0">
        </div>
        </noscript>





<!--<script type="text/javascript">
(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter22225360 = new Ya.Metrika({id:22225360,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true});
        } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc..ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
})(document, window, "yandex_metrika_callbacks");
</script>     -->
<script type="text/javascript"> 

 
$(function(){
    var funct=function() 
   {
  clientwidth=($(window).height())-10;
  
  $("#totalcomon").css("height",""+clientwidth+"px");
   };
  
  setInterval(funct,1000);
 }
 );
   
   
</script>      
 <?
    ?>
       <div id='basket_duplicate_info_div_background' style='display:none;position: absolute;width:100%;height:100%;left:1px;background-color:rgba(0,0,0,0.6);z-index:9999;'>
       <div id='basket_duplicate_info_div' style='display:none; position: absolute;width:50%;height:30%;left:25%;font-family: Cambria;border-radius: 15px;border: 2px grey solid;box-shadow: 0px 0px 8px black inset;background-color:white;z'>
        
       
           </div>

       </div>    
       <div id='info_div_background' style='display:none;position: absolute;width:100%;height:100%;left:1px;background-color:rgba(0,0,0,0.6);z-index:9999;'> 
       <div id='info_div' style='display:none; position: absolute;width:50%;height:30%;left:25%;font-family: Cambria;border-radius: 15px;border: 2px grey solid;box-shadow: 0px 0px 8px black inset;background-color:white;z'> </div>    </div>
                
    <?
   if (isset($_REQUEST["TYPE"]) && $_REQUEST["TYPE"]=="AUTH" && !$USER->IsAuthorized())
   {
       
       ?>
       
        <div  id="wrong_auth" style="position: absolute;top:0;left:0;width:100%;height:100% ; background-color:RGBA(0,0,0,0.5);z-index: 9998;"> 
        
            <div id="wrong_auth_in" style="width:30%;height:10%;position: absolute; left:35%;top:1%;font-family: Cambria;border-radius: 15px;border: 2px grey solid;box-shadow: 0px 0px 8px black inset;background-color:white;z-index: 9999;">
                   <?
                    if (isset($_REQUEST["captcha_word"]))
                    {
                   ?>
                         <p align="center">НЕВЕРНЫЙ ЛОГИН ИЛИ ПАРОЛЬ ИЛИ ПРОВЕРОЧНОЕ СЛОВО. </p>
                    <?
                    }else
                    {
                     ?>
                         <p align="center">НЕВЕРНЫЙ ЛОГИН ИЛИ ПАРОЛЬ.</p>
                     <?
                    }
                      ?>
                  
                  <p align="center"> <input  type="button" id="wrong_auth_button" title="ОК" Value="OK"></p>
            </div>
        
        </div>
        <script>
         $("#wrong_auth_button").click(function(){
           $("#wrong_auth").css("display","none");
            $("#wrong_auth").css("z-index","0");  
             
             
         });
       </script>
       <?
   }
    function GetBSatusOrderCheckAndArray($userID)
    {
         $optionArray=array("CHECK"=>false,"ORDER_ARRAY"=>false);
         global $DB;
         $sql="SELECT * FROM b_autodoc_user_order_statistic WHERE USER_ID={$userID}  AND USER_STATUS_INFORMED=0";
         $result=$DB->Query($sql);
         if (intval($result->SelectedRowsCount())==0)
         {
             return  $optionArray ;
         } else
         {
             $order_array=array();
             while ($order_array_result=$result->Fetch())
             {
              
                $order_array[$order_array_result['ORDER_ID']]['ID']=$order_array_result['ORDER_ID'] ;
                $order_array[$order_array_result['ORDER_ID']]['SUM']=$order_array_result['SUM'] ; 
                $order_array[$order_array_result['ORDER_ID']]['CURRENCY']=$order_array_result['CURRENCY'] ; 
                $order_array[$order_array_result['ORDER_ID']]['ORDER_DATE_INSERT']=explode(" ",$order_array_result['ORDER_DATE_INSERT'])[0] ;    
                 
             }
           $optionArray["CHECK"]=true;
           $optionArray["ORDER_ARRAY"]=$order_array;
           return  $optionArray;  
             
         }
         
        
    }
    function ShowSatusAndArray($SatusOrderArray)
    {
        global $USER;
        $userID=$USER->GetID();
        $statusOrderString="";
        $statusOrderString.="<table  id='BStatusTable' style='width:97%; margin:auto; margin-top:20px;'>";
       /*  $statusOrderString.="<th>"; 
                     $statusOrderString.="Номер<br> Заказа";
         $statusOrderString.="</th>";
         
         $statusOrderString.="<th>"; 
                             $statusOrderString.="Сумма<br> Заказа"; 
         $statusOrderString.="</th>";
         
         $statusOrderString.="<th>"; 
                              $statusOrderString.="Валюта <br>Заказа"; 
         $statusOrderString.="</th>";
         
         $statusOrderString.="<th>"; 
                               $statusOrderString.="Больше не <br> показывать"; 
         $statusOrderString.="</th>"; */
          $trBackGround="";
          foreach ($SatusOrderArray as $orderID=>$value)
          {
               if  ($trBackGround=="")
               {
                 $trBackGround="#F0F0F0";  
               }else
               {
                   $trBackGround="";
               }
                  $statusOrderString.="<tr style='background:{$trBackGround};'>";
              
                    $statusOrderString.="<td align='center'>";
                             $statusOrderString.= "Заказ № <a  style='color: black;' target='blank' class='b_status_order_noshow_a'
                                                      user_id='{$userID}' order_id='{$SatusOrderArray[$orderID]['ID']}' 
                                                      href='{$_SERVER["SERVER_ROOT"]}/personal/order/index.php?ID= {$SatusOrderArray[$orderID]['ID']} '>
                                                      {$SatusOrderArray[$orderID]['ID']}</a> от {$SatusOrderArray[$orderID]['ORDER_DATE_INSERT']}";
                            # $statusOrderString.="{$SatusOrderArray[$orderID]['ID']}";
                    $statusOrderString.="</td>";
                    
                    $statusOrderString.="<td>";
                                         if ($SatusOrderArray[$orderID]['CURRENCY']=="UAH")
                                         {
                                             $sum=$SatusOrderArray[$orderID]['SUM']." грн.";
                                             
                                         } elseif($SatusOrderArray[$orderID]['CURRENCY']=="EUR")
                                         {
                                             $sum="€ ".$SatusOrderArray[$orderID]['SUM'];   
                                             
                                         } elseif ($SatusOrderArray[$orderID]['CURRENCY']=="USD")
                                         {
                                                $sum="$ ".$SatusOrderArray[$orderID]['SUM'];
                                         }
                                          # $sum=SaleFormatCurrency(floatval($SatusOrderArray[$orderID]['SUM']), $SatusOrderArray[$orderID]['CURRENCY']);
                                        $statusOrderString.="<p>{$sum}</p>";
                    $statusOrderString.="</td>";
                    
              /*      $statusOrderString.="<td>";
                                        $statusOrderString.="{$SatusOrderArray[$orderID]['CURRENCY']}";  
                    $statusOrderString.="</td>";
                    
                    $statusOrderString.="<td>";
                                          $statusOrderString.=" <input type='checkbox' class='b_status_order_noshow' user_id='{$userID}' order_id='{$SatusOrderArray[$orderID]['ID']}'></input>";
                    $statusOrderString.="</td>"; */
              
              $statusOrderString.="</tr>";  
              
          }
        
        
         
         
         
         
        $statusOrderString.="</table>"; 
        return $statusOrderString; 
        
    }
    if ($USER->IsAuthorized()) 
    {
        ?>
        <style>
           table#BStatusTable td{
                text-align: center;
                vertical-align: middle;
                font: 12px/18px Arial;
                color: #201E1E;
                padding: 4px 0px;
                border-bottom: 1px solid #A3ADB5;   
               
               
           } 
           table#BStatusTable th{
                text-align: center;
                vertical-align: middle;
                font: 12px/18px Arial;
                color: #201E1E;
                padding: 4px 0px;
                border-bottom: 1px solid #A3ADB5;
                border-right: 1px solid #A3ADB5;      
                font-weight:600;
               
           } 
        </style>  
        <div  id="user_BSTATUS_attention" style=" display:none; position: absolute;top:0;left:0;width:100%;height:100% ; background-color:RGBA(0,0,0,0.5);z-index: 9998;"> 
        
            <div id="user_BSTATUS_attention_in" style="width:40%;height:60%;position: absolute; left:30%;top:20%;font-family: Cambria;border-radius: 15px;border: 2px grey solid;box-shadow: 0px 0px 8px black inset;background-color:white;z-index: 9999;">
               
                <?
                   $SatusOrderCheckAndArray=GetBSatusOrderCheckAndArray($USER->GetID());
                   $SatusOrderCheck=$SatusOrderCheckAndArray['CHECK'];
                   $SatusOrderArray=$SatusOrderCheckAndArray['ORDER_ARRAY'];  
                  // var_dump($SatusOrderArray); 
                   if ($SatusOrderCheck and count($SatusOrderArray)>0)
                   {
                       echo "<p align='center' style='color:red;font-family:Times New Roman;font-size:25px;'>Внимание !!!</p>";
                       echo "<p align='center' style='color:red;font-family:Times New Roman;font-size:20px;'> 
                       У Вас есть неоплаченные заказы, со статусом \"ОТЛОЖЕН\". </p>" ;
                        echo "<p align='center' style='color:red;font-family:Times New Roman;font-size:20px;'> 
                          </p>" ;
                          
                         
                       echo ShowSatusAndArray($SatusOrderArray); 
                      
                      
                       
                      ?>
                         <script>
                           $("#user_BSTATUS_attention").css("display","block");
                         </script>
                      <? 
                       
                       
                   }
                
                
                ?>
                 <p align='center' style='margin-top:20px;'><input type='checkbox' class='b_status_order_noshow'>Больше не показывать</input></p>
                 <p align='center' style='margin-top:20px;'><input type='submit' id='order_info_done' value='OK'></p>
                 <script>
                      $('#order_info_done').click(function(){
                          
                          $("#user_BSTATUS_attention").css("display","none");
                          
                      });
                     $(".b_status_order_noshow").click(function(){
                         
                         maincheck_box=$(".b_status_order_noshow");
                         
                        $(".b_status_order_noshow_a").each(function(){
                            
                        
                         
                                 USER_ID=$(this).attr("user_id");
                                 ORDER_ID=$(this).attr("order_id"); 
                                 //alert (USER_ID) ;
                                 //alert ( ORDER_ID);
                                 //$(this).attr("disabled","disabled");
                                 if (maincheck_box.attr("checked")=='checked') 
                                 {
                                    NO_SHOW_YET="Y"; 
                                 } else
                                 {
                                   NO_SHOW_YET="N";    
                                 }
                                 params={};
                                 params.NO_SHOW_YET=NO_SHOW_YET;
                                 params.USER_ID=USER_ID ;
                                 params.ORDER_ID=ORDER_ID; 
                                $.ajax({
                                             type:"GET",
                                             url:"/personal/suppload/Debt_Check.php",
                                             dataType:"html", 
                                             data: params,
                                             cache:false,       
                                             success:function(data)
                                             {
                                               //alert(data); 
                                               
                                        
                                        
                                              
                                    
                                                 
                                             },        
                                             error: function(XMLHttpRequest, textStatus, errorThrown)
                                               {
                                                   $("#full_calc_result").html("");
                                                   $("#full_calc_result").html(textStatus);  
                                                   
                                               }   
                                    
                                    });
                         });                  
                         
                     });     
                 </script>
         
            </div>
         
        </div>    
       
        <?
        
    }
  if ($USER->IsAuthorized())
   {
        $http = fsockopen('89.19.98.25', 80);                       // Запускаем этот же скрипт новым процессом и завершаем работу текущего
        fputs($http, "GET /personal/suppload/Debt_Check.php?USER_ID={$USER->GetID()} HTTP/1.0\r\n");
        fputs($http, "Host: 89.19.98.25\r\nConnection: Close\r\n");
        fputs($http, "\r\n");
        fclose($http); 
       
   }
 ?>
<div id="totalcomon">
  <?#<a href="http://unitedcountry.com.ua"><img style="border: 0; position: absolute; right:15px; top: 0;" src="http://unitedcountry.com.ua/img/3" alt="Єдина Країна! Единая Страна!"></a> ?>
    
  <div id="comon"> 
<div id="header"> 		 
  <div id="logo1"> 		 		</div>
 
<!-- #logo1-->
 		 
  <div id="logo2"> 
   <? if ($USER->IsAuthorized())
  {
         global $USER;
         global $DB;
         $ONECID=GetUser1CID($USER->GetID());
         $sql="SELECT `BalanceOnDate`,`Caption` AS Caption, `MinPercent` AS MinPercent, `CreditSum` as CreditSum, `OrdersAllSumm`,`OrdersWorkSumm`,`CurrentDebt`,`CurrentDelayDebt` FROM `b_autodoc_agreements`
                                            WHERE
                                                   REPLACE (`Caption`,' ','')='ДОГОВОРНАЛИЧНЫЙДОЛЛАР' 
                                                AND `ClientCode`='{$ONECID}'
                                                OR REPLACE (`Caption`,' ','')='ДОГОВОРБЕЗНАЛГРН.' 
                                                AND `ClientCode`='{$ONECID}' ";
          $res = $DB->Query($sql);
          
         while( $UserInfo=$res->Fetch())
     {
          if($UserInfo['CurrentDebt']>0) 
          {
             $Debt=number_format($UserInfo['CurrentDebt'],2,',',' ') ;      
              $DebtName= ($LANGUAGE=="RUS") ?'Долг':'Борг';
          } 
          else
          {
              if ($UserInfo['CurrentDebt']==0)
             {
                 $Debt=number_format($UserInfo['CurrentDebt'],2,',',' ') ;      
              $DebtName='Баланс';
              } else
              {
              
               $Debt=number_format($UserInfo['CurrentDebt']*-1,2,',',' ') ;      
              $DebtName='Баланс';
              }
          } 
           
          if ($UserInfo['CreditSum']==-1) 
          {
              $CreditSum="";
              #$freefunds="Неограниченно";
          } 
          else
          {
               $CreditSum=($LANGUAGE=="RUS")?"Отгрузка при 100% предоплате.":"Відвантаження при 100% передоплаті.";
              #$freefunds= ($CreditSum-$UserInfo['CurrentDebt']<0)? 0: $CreditSum-$UserInfo['CurrentDebt'];                           
          } 
          if (str_replace(' ','',$UserInfo['Caption'])=='ДОГОВОРБЕЗНАЛГРН.')
          { 
          $Currency='UAH' ;
          }
          elseif(str_replace(' ','',$UserInfo['Caption'])=='ДОГОВОРНАЛИЧНЫЙДОЛЛАР') {$Currency='USD' ;}
          
          $CalDebt= number_format($UserInfo['CurrentDebt']+ 
          ($UserInfo['OrdersAllSumm']*($UserInfo['MinPercent']/100)) ,2,',',' ') ; 
          
          $CurrentDelayDebt=number_format($UserInfo['CurrentDelayDebt'] ,2,',',' ') ; 
          
          
          #$freefunds= ($Debt+$CreditSum<0)? 0: $Debt+$CreditSum;                           
    /*echo"    Дополнительная Информация</br>  
             Пользователь: {$USER->GetFirstName()}
              <table>                 
                 <tr>
                  <td >{$DebtName}:</td> <td  style='width:100px;'> {$Debt} USD</td>
                </tr>
                 <tr>
                    <td >Сумма установленного  кредита:</td> <td style='width:100px;'>{$CreditSum} USD</td>
                 </tr> 
                 <tr>
                    <td>Свободных средств для покупки товара:</td> <td style='width:100px;'>{$freefunds} USD</td>
                 </tr>  
                  

                   
              </table>"; */
              echo $Currency."<br>";
              echo " {$DebtName}: {$Debt} {$Currency} <br> " ; 
              if  ($CreditSum!="") echo  $CreditSum."<br>" ;
              if ($LANGUAGE=="RUS")
              {
              if ($CalDebt>0 && str_replace(' ','',$UserInfo['Caption'])!='ДОГОВОРБЕЗНАЛГРН.' ) echo "Требуется доплата: ". $CalDebt. " ".$Currency."<br>";    
              if ($CurrentDelayDebt>0 ) echo "Просроченная- <br>дебиторская задолженность: ".$CurrentDelayDebt." ".$Currency."<br>";                                                   
              }else
              {
                  if ($CalDebt>0 && str_replace(' ','',$UserInfo['Caption'])!='ДОГОВОРБЕЗНАЛГРН.' ) echo "Потрібна доплата: ". $CalDebt. " ".$Currency."<br>";    
              if ($CurrentDelayDebt>0 ) echo "Прострочена-<br> дебіторська заборгованість: ".$CurrentDelayDebt." ".$Currency."<br>"; 
              }
          echo"<br><br>" ;
          
     }       
  }?>            
                 </div>
   
<!-- #logo2-->

  <? if($LANGUAGE=="RUS") {?>
  <!--<div id ="cinfo" style="margin-right: -150px;color:white; font-size: 12px;">  
   
       добавочные номера:
       <br>104-главный бухгалтер.        
       <br>105-иностранные заказы.
       <br>107-бухгалтер.
       <br>111-заказы по Украине.
 
       
     
  </div> -->
  <div id ="cinfo">
  
      <div id="cinfoin"> </div> 
      <div id="cinfoint"> office@parts.avtodok.com.ua
      <br>  (044)545-70-17 
      <br>(097) 025-11-10     
      <br> г.Киев<br> ул.Деревообрабатывающая,5
      <br> </div>                         
    
  
   </div>
  <?
    }
        else
        {
            ?>
   <div id ="cinfo">
  
      <div id="cinfoin"> </div> 
      <div id="cinfoint"> office@parts.avtodok.com.ua<br>  (044)545-70-17<br> (097) 025-11-10<br> м.Київ<br> ул.Деревообробна,5<br> </div>                         
    
  
   </div>
       <?     
        }
 ?>     
  <div id="kurs"> Курс валют <?$APPLICATION->IncludeComponent("bitrix:currency.rates", "template1", array(
	"CACHE_TYPE" => "A",
	"CACHE_TIME" => "86400",
	"arrCURRENCY_FROM" => array(
		0 => "USD",
		1 => "EUR",
	),
	"CURRENCY_BASE" => "UAH",
	"RATE_DAY" => "",
	"SHOW_CB" => "N"
	),
	false
);?> </div>
   
  <div id="logo3"> 		 		 </div> 
 
 		 
<!-- #search-->
 		 
  <div id="top_menu"> 
       <div id="top_menu_bar">			
  <?
  if (trim(strtolower(CheckBrowser($HTTP_USER_AGENT)))=="explorer6.0")
  {
     echo  "<p align=\"centert\"><h3>Вы используйте устаревший браузер.
     <br> Возможно не корректное отображение данных.</h3>
      
     </p> 
          
     ";
     exit;
  } else
  {
    # echo $HTTP_USER_AGENT; 
      #echo   CheckBrowser($HTTP_USER_AGENT);
  $APPLICATION->IncludeComponent("bitrix:menu", "horizontal_multilevel1", array(
	"ROOT_MENU_TYPE" => "top",
	"MENU_CACHE_TYPE" => "Y",
	"MENU_CACHE_TIME" => "3600",
	"MENU_CACHE_USE_GROUPS" => "Y",
	"MENU_CACHE_GET_VARS" => array(
	),
	"MAX_LEVEL" => "1",
	"CHILD_MENU_TYPE" => "left",
	"USE_EXT" => "Y",
	"DELAY" => "N",
	"ALLOW_MULTI_SELECT" => "N"
	),
	false,
	array(
	"ACTIVE_COMPONENT" => "Y"
	)
);
  }
?>  
        </div> 
       <div id="topmenuform"> <p  style="margin-top:8px;"></p> 
         <? # <form name="datasearch" enctype="multipart/form-data" action="/autodoc/search.php?lang=s1" method="POST">  ?>
             <input style="border: solid 1px white; margin-left:7%; width:70%; font-family:Arial; font-size:13.3px;line-height:normal;"  id="forminput" type="text" name="ICODE" size="20" value="" >  
            <? #  <input  id="forminputcode"type="image" src="http://<?=$_SERVER['SERVER_NAME']/bitrix/templates/avtodok/images/button.gif"  name="button.gif" /> ?>  
           <? # </form>  ?>
           <a id="forminputcdA" style="margin-left: 1px;" href='#AcSearch'> <input  id="forminputcd" type="image" src="http://<?=$_SERVER['SERVER_NAME']?>/bitrix/templates/avtodok/images/button.gif"  name="button.gif" ></a>  
        </div>
       		

   </div>
 
<!-- #top_menu-->

           <div id ="hedpic"> 
             <?
               $showNewBanner="YES";
                $ua = $_SERVER['HTTP_USER_AGENT'];
                if (eregi('Android', $ua) && eregi('Mobile', $ua)) $platform = "Android Phone";
                elseif (eregi('Android', $ua) && !eregi('Mobile', $ua)) $platform = "Android Tablet";
                 elseif (eregi('iPhone', $ua) ) $platform = "iPhone"; 
               # if ($USER->IsAuthorized() && $USER->GetID()==852) 
             if ($platform != "Android Phone" && $platform != "Android Tablet" && $platform != "iPhone" )
              {  
               if  ($showNewBanner=="YES" && $USER->GetID()!=852)
                {
                     if(stripos($_SERVER['REQUEST_URI'],'/OUTLANDER_KOYORAD.php') !== false)
                     {    
                          ?>
                            <!-- <div style='background :; position:absolute; left:0;top:0; width:98%;height:20%; box-shadow: 0px 0px 8px black inset,5px 5px 20px -1px rgba(82, 37, 37, 0.77); border-radius:5px; z-index: 5;' ></div> -->
                             <div id="headin"  class="" style='background :white; position:absolute; left:0;top:0; width:98%;height:100%; box-shadow: 0px 0px 8px black inset; border-radius:5px;'>
                               <div class="theme-light"> 
                                  <div id="slider_1" class="nivoSlider" style='position:absolute; width:45% ;height: 195px; left:1%;top:10%;'>
                                      <a  href="#AcSearch" id='OfferA'> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/PZ32160123A1.png?v_2"> <input type="hidden" name="ItemCode" value='PZ32160123A1'>  </a>   
                                     <img   style='position: absolute; left:0;top:0;'  src="/bitrix/templates/avtodok/images/rcompany/1.png"> 
                                    <img   style='position: absolute; left:0;top:0;'  src="/bitrix/templates/avtodok/images/rcompany/1.png"> 
                                   </div>
                                 </div>
                                 <div class="theme-light"> 
                                   <div id="slider_2" class="nivoSlider" style='position:absolute;width:45% ;height: 195px; left:50%;top:10%;'>
                                      <img   style='position: absolute; left:0;top:0;'  src="/bitrix/templates/avtodok/images/rcompany/2.png"> 
                                      <img   style='position: absolute; left:0;top:0;'  src="/bitrix/templates/avtodok/images/rcompany/3.png">  
                                  </div>
                                 </div>
                             </div>
                                   <script type="text/javascript">
                                    $(window).load(function() {  
                                        $('#slider_1').nivoSlider({effect:'boxRainGrow',pauseTime:5000,directionNav:0,controlNav:0});
                                        $('#slider_2').nivoSlider({effect:'random',pauseTime:5000,directionNav:0,controlNav:0});
                                    });
                                    </script>

                            <?
                         
                     }else
                     { 
                            # main banner div
                            ?>
                            <!-- <div style='background :; position:absolute; left:0;top:0; width:98%;height:20%; box-shadow: 0px 0px 8px black inset,5px 5px 20px -1px rgba(82, 37, 37, 0.77); border-radius:5px; z-index: 5;' ></div> -->
                             <div id="headin"  class="" style='background :white; position:absolute; left:0;top:0; width:98%;height:100%; box-shadow: 0px 0px 8px black inset; border-radius:5px;'>
                               <div class="theme-light"> 
                               
                                  <div id="slider_1" class="nivoSlider" style='position:absolute; width:386px ;height:175px; left:1%;top:10%;'>
                                         <!--  <a  href="#AcSearch" id='OfferA'> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/40F2012.png"> <input type="hidden" name="ItemCode" value='40F2012'>  </a> -->
                                            <a  href="#AcSearch" id='OfferA'> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/PZ32160123C1.png"> <input type="hidden" name="ItemCode" value='PZ32160123C1'>  </a>     
                                           <a  href="#AcSearch" id='OfferA'> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/PZ32160123A1.png?v_2"> <input type="hidden" name="ItemCode" value='PZ32160123A1'>  </a>   
                                           <a  href="#AcSearch" id='OfferA'> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/PZ49CZ0350AG.png"> <input type="hidden" name="ItemCode" value='PZ49CZ0350AG'>  </a>
                                           <a  href="#AcSearch" id='OfferA'> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/14.png"> <input type="hidden" name="ItemCode" value='4865533050'>  </a> 
                                           <a  href="#AcSearch" id='OfferA'> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/27.png"> <input type="hidden" name="ItemCode" value='PZ410j2356BB'>  </a> 
                                           <a  href="#AcSearch" id='OfferA'> <img  style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/28.png"> <input type="hidden" name="ItemCode" value='PZ4030063000'>  </a>                                                                    
                                           <a  href="#AcSearch" id='OfferA'> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/29.png"> <input type="hidden" name="ItemCode" value='0861112850'>  </a>
                                           <a  href="#AcSearch" id='OfferA'> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/30.png"> <input type="hidden" name="ItemCode" value='PZ4620020800'>  </a>       
                                          
                                           
                                     <!--     <a  href="http://avtodok.com.ua/publication/detail.php?ELEMENT_ID=51836373" target="blank"> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/dolphin.png?rnd=<?php print time(); ?>">  </a>  
                                          <a  href="http://koyorad.com.ua" target="blank"> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/koyo.png">   </a>
                                       -->      
                                  </div> 
                                   
                                 </div>
                               <div class="theme-light">                                                                                                                                      
                                 <div id="slider_2" class="nivoSlider" style='position:absolute;width:386px ;height: 175px; right:1%;top:10%;'>  
                                 
                              <!--  <a  href="#AcSearch" id='OfferA'> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/PZ32260047A1_V2.png "> <input type="hidden" name="ItemCode" value='PZ32260047A1'>  </a>   -->
                                           <a  href="#AcSearch" id='OfferA'> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/PZ32260047A1.png?v_2"> <input type="hidden" name="ItemCode" value='PZ32260047A1'>  </a> 
                                          <a  href="#AcSearch" id='OfferA'> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/0815460810A1_V2.png"> <input type="hidden" name="ItemCode" value='0815460810A1'>  </a> 
                                         <a href="#AcSearch" id='OfferA'> <img  style='width:386px;height:175px' alt=''  src="/bitrix/templates/avtodok/images/rcompany/0853860040.png"> <input type="hidden" name="ItemCode" value='0853860040'>  </a>                       
                                                         
                                          <a  href="#AcSearch" id='OfferA'> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/31.png"> <input type="hidden" name="ItemCode" value='PZ438K018100'>  </a>
                                        
                                           <a  href="#AcSearch" id='OfferA'> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/33.png"> <input type="hidden" name="ItemCode" value='PZ438B018200'>  </a>  
                                           <!-- <a  href="#AcSearch" id='OfferA'> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/34.png"> <input type="hidden" name="ItemCode" value='PZ434X2306PJ'>  </a>  
                                           -->
                                          <a  href="#AcSearch" id='OfferA'> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/xdk171_2.png"> <input type="hidden" name="ItemCode" value='xdk171'>  </a>  
                                        <!-- <a  href="http://koyorad.com.ua" target="blank"> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/koyo.png">   </a>  -->
                                         <a  href="http://avtodok.com.ua/publication/detail.php?ELEMENT_ID=51836373" target="blank"> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/dolphin.png?rnd=<?php print time(); ?>">   </a> 
                                           
                                   </div>  
                                 </div>
                             </div>  
                             
                                   <script type="text/javascript">
                                    $(window).load(function() {  
                                        $('#slider_1').nivoSlider({effect:'sliceUpDownLeft',pauseTime:6000,directionNav:0,controlNav:1});
                                        $('#slider_2').nivoSlider({effect:'sliceUpDownLeft',pauseTime:5000,directionNav:0,controlNav:1});
                                    });
                                    </script>

                            <?
                     }  
                } else 
                {
             ?>
               <a  id="ArrowsPrev" href="#" onclick="rotateBack()"></a>
               <a href="#" style="border:none;"  onclick="rotateBack()">
               <? if ($LANGUAGE=="RUS"):?> 
               <img  style="border:none;" id="hedpicin" src="http://<?=$_SERVER['SERVER_NAME']?>/bitrix/templates/avtodok/images/HeadPicDiv.png">
               <? else:?>
               <img  style="border:none;" id="hedpicin" src="http://<?=$_SERVER['SERVER_NAME']?>/bitrix/templates/avtodok/images/HeadPicDivUkr.png">
               <?endif?>
               </a>
                <div style=" margin-left: 10px; position:absolute; margin-top: 0px; width:100%; display:; height:100%">
                   
                  <?
                   require($_SERVER['DOCUMENT_ROOT'].'/movedpic/main.php');
                   
                  ?> 
                
                
                
                </div> 
                
                 <a  id="ArrowsNext" href="#" onclick="rotate()"></a>   
                 
               <?
                }
              } else  #ANDROID
              {
                  ?>
                      <div id="headin"  class="" style='background :white; position:absolute; left:0;top:0; width:98%;height:100%; box-shadow: 0px 0px 8px black inset; border-radius:5px;'>
                               <div class="theme-light"> 
                                  <div id="slider_1" class="" style='position:absolute; width:45% ;height: 195px; left:1%;top:10%;'>
                                   <a  href="#AcSearch" id='OfferA'> <img   style='width:386px;height:175px;absolute; left:0;top:0;' alt='' src="/bitrix/templates/avtodok/images/rcompany/PZ32160123A1.png?v_2"> <input type="hidden" name="ItemCode" value='PZ32160123A1'>  </a>   
                                     <img   style='position: absolute; left:0;top:0;'  src="/bitrix/templates/avtodok/images/rcompany/1.jpg"> 
                                    <img   style='position: absolute; left:0;top:0;'  src="/bitrix/templates/avtodok/images/rcompany/1.jpg"> 
                                   </div>
                                 </div>
                                 <div class="theme-light"> 
                                   <div id="slider_2" class="" style='position:absolute;width:45% ;height: 195px; left:50%;top:10%;'>
                                      <img   style='position: absolute; left:0;top:0;'  src="/bitrix/templates/avtodok/images/rcompany/2.jpg"> 
                                      <img   style='position: absolute; left:0;top:0;'  src="/bitrix/templates/avtodok/images/rcompany/3.jpg">  
                                  </div>
                                 </div>
                             </div>
                             
                                   <script type="text/javascript">
                                    $(window).load(function() {  
                                        $('#slider_1').nivoSlider({effect:'sliceUpDownLeft',pauseTime:6000,directionNav:0,controlNav:1});
                                        $('#slider_2').nivoSlider({effect:'sliceUpDownLeft',pauseTime:5000,directionNav:0,controlNav:1});
                                    });
                                    </script>
                  <?
                  
              }   
              
               ?> 
               <!-- <div id="headin"  class="" style='background :white; position:absolute; left:0;top:0; width:98%;height:100%; box-shadow: 0px 0px 8px black inset; border-radius:5px;'>    
                    <img   style='position: absolute; left:0;top:0; width:100%;height:100%;border-radius:10px;'  src="/bitrix/templates/avtodok/images/rcompany/23.png"> 
                </div>  -->
          </div>
          <!-- <div id ="underpic">   </div> --> 
 	 	</div> 
  
<!-- #header-->
 	 
<div id="middle"> 		 
  <div id="middle_up"> 
    <div id="empty"> </div>
	
<!-- #left_sb-->   
    <div id="left_sb"> 
  <!--  <div id="auth_up">АВТОРИЗАЦИЯ
      </div>-->
       <!-- #auth_up--> 
      <div id="auth">
       <img id="hedpicin" alt="" src="http://<?=$_SERVER['SERVER_NAME']?>/bitrix/templates/avtodok/images/AuthDivBack.png"  > 
      <!-- <p align="center" style="font-family: Cambria; font-style: Italic; color: #910303; font-size: 15pt; margin-top: 10px;" >Авторизация: </p> -->       
      <div id="authin">
        
      
       <?$APPLICATION->IncludeComponent("bitrix:system.auth.form", "template1", array(
    "REGISTER_URL" => "/personal/profile/index.php",
    "PROFILE_URL" => "/personal/profile/",
    "SHOW_ERRORS" => "N"
    ),
    false
);?> 
  </div>
</div> <!-- #auth--> 

      <div id="left_menu"> <?$APPLICATION->IncludeComponent("bitrix:menu", "vertical_multilevel1", array(
	"ROOT_MENU_TYPE" => "left",
	"MENU_CACHE_TYPE" => "Y",
	"MENU_CACHE_TIME" => "3600",
	"MENU_CACHE_USE_GROUPS" => "Y",
	"MENU_CACHE_GET_VARS" => array(
	),
	"MAX_LEVEL" => "1",
	"CHILD_MENU_TYPE" => "left",
	"USE_EXT" => "N",
	"DELAY" => "N",
	"ALLOW_MULTI_SELECT" => "N",
    "DIRTOFINDFROM"=>"/"
	),
	false,
	array(
	"ACTIVE_COMPONENT" => "Y"
	)
);?> </div>
     
<!-- #left_menu-->
<!--    <div id="empty1"> </div> -->

   <!--   <div id="auth_up">АВТОРИЗАЦИЯ
      </div>--> <!-- #auth_up-->
   <!--   <div id="auth"> 		 <?#$APPLICATION->IncludeComponent("bitrix:system.auth.form", "template1", array(
	#"REGISTER_URL" => "/personal/profile/index.php",
	#"PROFILE_URL" => "/personal/profile/",
	#"SHOW_ERRORS" => "N"
	#),
	#false
#);?> 

</div>--> <!-- #auth--> 
    
 <div id="beforpayment"> </div> 
 <div id="payment"> 
  <p style="">
   </p>
  
  <!--<a href="/personal/privatbank/liqpay.php"><img src="/personal/privatbank/logo.png" style="border:none;margin-top: 20px; margin-left:15%;width:70%"/></a>--> <br>  
  <a href="/personal/privatbank/privat24.php"><img    src="/personal/privatbank/logoprivat24.png" style="border:none; margin-left:15%;width:70%"/></a> 
   
 </div>
 <div id="left_menu_news_title" > </div> 
 <div id ="left_menu_news">
  
      <div id="left_sb_news">
      <!--<div style=" border-bottom:solid 2px #afb0b2; margin-top: -5px;  ;"> <p style=" height:20px; ; font-size:12pt;  /*font-family: Arial;*/  font-weight: ;  text-align:center;">Новости </p></div><br> -->
	   <?$APPLICATION->IncludeComponent("bitrix:news.list", "left_sb_news_list", array(
	"IBLOCK_TYPE" => "news",
	"IBLOCK_ID" => ($LANGUAGE=="UKR")?27:3,
	"NEWS_COUNT" => "20",
	"SORT_BY1" => "ACTIVE_FROM",
	"SORT_ORDER1" => "DESC",
	"SORT_BY2" => "SORT",
	"SORT_ORDER2" => "ASC",
	"FILTER_NAME" => "",
	"FIELD_CODE" => array(
		0 => "",
		1 => "",
	),
	"PROPERTY_CODE" => array(
		0 => "",
		1 => "",
	),
	"CHECK_DATES" => "Y",
	"DETAIL_URL" => "",
	"AJAX_MODE" => "N",
	"AJAX_OPTION_SHADOW" => "Y",
	"AJAX_OPTION_JUMP" => "N",
	"AJAX_OPTION_STYLE" => "Y",
	"AJAX_OPTION_HISTORY" => "N",
	"CACHE_TYPE" => "Y",
	"CACHE_TIME" => "3600",
	"CACHE_FILTER" => "N",
	"CACHE_GROUPS" => "Y",
	"PREVIEW_TRUNCATE_LEN" => "",
	"ACTIVE_DATE_FORMAT" => "d.m.Y",
	"DISPLAY_PANEL" => "N",
	"SET_TITLE" => "Y",
	"SET_STATUS_404" => "Y",
	"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
	"ADD_SECTIONS_CHAIN" => "Y",
	"HIDE_LINK_WHEN_NO_DETAIL" => "N",
	"PARENT_SECTION" => "",
	"PARENT_SECTION_CODE" => "",
	"DISPLAY_TOP_PAGER" => "N",
	"DISPLAY_BOTTOM_PAGER" => "N",
	"PAGER_TITLE" => "Новости",
	"PAGER_SHOW_ALWAYS" => "N",
	"PAGER_TEMPLATE" => "",
	"PAGER_DESC_NUMBERING" => "N",
	"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
	"PAGER_SHOW_ALL" => "N",
	"DISPLAY_DATE" => "Y",
	"DISPLAY_NAME" => "Y",
	"DISPLAY_PICTURE" => "N",
	"DISPLAY_PREVIEW_TEXT" => "N",
	"AJAX_OPTION_ADDITIONAL" => ""
	),
	false
);?>
      </div> <!-- #left_sb_news-->
  </div>   <!-- #left_menu_news-->    
<?php 
	if (/*$USER->IsAuthorized() && ($USER->GetID() == 188 || $USER->IsAdmin())*/true)
	{
        ?>
       <div id="left_menu_news_pub" > </div>     
       <div id="left_menu_news">
       
        
        <div id="left_sb_news">
           
        <?
		#echo '<div id="left_sb_news">
			#<div style=" border-bottom:solid 2px #afb0b2; margin-top: -5px;  background-color: #e5e5e5;"><p style="color:#181818;font-weight: ;font-size:12pt; text-align:center;">Публикации</p></div><br>';
		$APPLICATION->IncludeComponent("bitrix:news.list", "left_sb_news_list1", array(
	"IBLOCK_TYPE" => "news",
	"IBLOCK_ID" => "30",
	"NEWS_COUNT" => "0",
	"SORT_BY1" => "ACTIVE_FROM",
	"SORT_ORDER1" => "DESC",
	"SORT_BY2" => "SORT",
	"SORT_ORDER2" => "ASC",
	"FILTER_NAME" => "",
	"FIELD_CODE" => array(
		0 => "",
		1 => "",
	),
	"PROPERTY_CODE" => array(
		0 => "",
		1 => "",
	),
	"CHECK_DATES" => "Y",
	"DETAIL_URL" => "",
	"AJAX_MODE" => "N",
	"AJAX_OPTION_SHADOW" => "Y",
	"AJAX_OPTION_JUMP" => "N",
	"AJAX_OPTION_STYLE" => "Y",
	"AJAX_OPTION_HISTORY" => "N",
	"CACHE_TYPE" => "N",
	"CACHE_TIME" => "3600",
	"CACHE_FILTER" => "N",
	"CACHE_GROUPS" => "Y",
	"PREVIEW_TRUNCATE_LEN" => "",
	"ACTIVE_DATE_FORMAT" => "d.m.Y",
	"DISPLAY_PANEL" => "N",
	"SET_TITLE" => "Y",
	"SET_STATUS_404" => "N",
	"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
	"ADD_SECTIONS_CHAIN" => "Y",
	"HIDE_LINK_WHEN_NO_DETAIL" => "N",
	"PARENT_SECTION" => "",
	"PARENT_SECTION_CODE" => "",
	"DISPLAY_TOP_PAGER" => "N",
	"DISPLAY_BOTTOM_PAGER" => "Y",
	"PAGER_TITLE" => "Публикации",
	"PAGER_SHOW_ALWAYS" => "Y",
	"PAGER_TEMPLATE" => "",
	"PAGER_DESC_NUMBERING" => "N",
	"PAGER_DESC_NUMBERING_CACHE_TIME" => "3600",
	"PAGER_SHOW_ALL" => "Y",
	"DISPLAY_DATE" => "Y",
	"DISPLAY_NAME" => "Y",
	"DISPLAY_PICTURE" => "Y",
	"DISPLAY_PREVIEW_TEXT" => "Y",
	"AJAX_OPTION_ADDITIONAL" => ""
	),
	false
);		
		echo "</div>";
		
	}
?>
    </div> <!-- #left_menu_newsP-->   
     <a href="http://www.koyoradracing.com/" target="_blank" rel="nofollow">
      <div id="left_sb_link">
        <img style="height:100%; width:100%;border:none;" src="http://<?=$_SERVER['SERVER_NAME']?>/bitrix/templates/avtodok/images/fp_racing.jpg"/>
      </div>  
     </a>
     <a href="http://autodoc.in.ua/" target="_blank" rel="nofollow">
      <div id="left_sb_link">
        <img style="height:100%; width:100%;border:none;" src="http://<?=$_SERVER['SERVER_NAME']?>/bitrix/templates/avtodok/images/rcompany/9.png"/>
      </div>  
     </a>
     <a href="http://autodoc.in.ua/" target="_blank" rel="nofollow"> 
     <div id="left_sb_link"> 
         
      </div> 
     </a>
<?php
if(stripos($_SERVER['REQUEST_URI'],'/personal/order/oil') !== false)
{
  ?>
 <script>
  
        $("#left_sb").html("");  
  
 
 </script> 
  
  <?
   include ($_SERVER["DOCUMENT_ROOT"].'/personal/order/oil/oilfilters.php'); 
  ?>
  
  
  
  <script>
      
     
        
          
          
          
      
      
      
  </script>
  
 
  <?  
    
    
}
if(stripos($_SERVER['REQUEST_URI'],'/personal/order/index_new.php') !== false) 
{
  ?>
   <script>
     $(document).ready(function() { 
         
         
       $("#comon").css("width","85%");   
       $("#logo2").css("margin-left","-100px");  
         
         
     });
   
   
   </script>
  
  
  
  <?  
    
}
 ?>
 <!-- #left_sb   </div>-->
 </div>
 <?
/*require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/catalog.product/itgProduct.php");
global $DB;
//выбираем нужные нам продукты для отображения
$bestProducts = $DB->Query("SELECT `id` FROM `b_autodoc_items_m` WHERE `id` IN (7240843,7240868,7241505,5544563,5544564,5545469)");
echo "<div class='itgBest' style='position:absolute; right:0px;'>";
while ($arId=$bestProducts->Fetch())
{
		echo "<div style = 'width:200px; background-color:#000;opacity:0.9;filter:alpha(opacity=90);padding:10px;'>";
		$product = new itgProduct($arId['id']);
		$props = $product->getProductProperties();
		echo "<img style = 'float:none; width:90px; margin:0px 10px 0px 2px;' src={$props['image']}>";

			echo "<div style = 'display:block; margin:0px 0px 0px 10px;'></div>";
				echo "<span style = 'font-style:italic;font-size:12px;'>Наименование:</span>";
				echo "<div style = 'margin-left:10px;color:#EDAF1F;font-size: 12px;'><a href='http://".$_SERVER["SERVER_NAME"]."/personal/order/catalog/index.php?itg_more_info={$arId['id']}'>{$props['Caption']}</a></div>";
			echo "</div>";
	echo "<br/>";
}
echo "</div>";
*/
$time = microtime();
$time = explode(' ', $time);
$time = $time[1] + $time[0];
$finish = $time;
$total_time = round(($finish - $start), 4); 
?> 
   <a name="AcSearch"></a>
   <div id="beforecontent">
   <input type='hidden' id='duplicate_info_count'></input> 
   
      <!--<img id="hedpicin" src="http://<?=$_SERVER['SERVER_NAME']?>/bitrix/templates/avtodok/images/ContentBack.png" / >   -->
       <div id="content" style="-moz-border-radius-topright: 10px;"> 
         <?#echo $total_time?>