<? 

 require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");   
 require_once ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/timer.php"); 
 require ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/Search_ITG4.php"); 
 require ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/IB.property/IBPropertyAdvanced1.php");
 global $USER;
 $APPLICATION->SetTitle("запчасти для иномарок");
 $APPLICATION->SetPageProperty("keywords", "Запчасти поиск Киев Украина"); 
 $APPLICATION->SetPageProperty("description", "Поиск запчастей для всех иномарок");      
 $timer = new timer(); 
 $timer->start_timer();

 
 $regionID = 17;
            $brandID = 14;
            $oRegion = new IBPropertyAdvanced_ITG(array('IB'=>$regionID));
            $arRegions = $oRegion->getArray();
            $oBrand = new IBPropertyAdvanced_ITG(array('IB'=>$brandID));
            $arBrands = $oBrand->getArray();
            $_SESSION['arRegion_ITG'] = $arRegions;
            $_SESSION['arBrands_ITG'] = $arBrands;
            $_SESSION['CountScript'] =0;
            
            
            function CheckCondConfirm($USERID)
    {
        global $DB;
        $sql="SELECT CondConfirm FROM b_user WHERE ID='".$USERID."' LIMIT 1";
        $result = $DB->Query( $sql );
        
        if ($CondConfirm=$result->Fetch()) 
        {
            if ($CondConfirm['CondConfirm']==1 )
            {
               return true;
            }
            else
            {
               return false; 
            }
            
        } else
        {
               return false;
        }
        
        
        
    }  
    $CondConfirm=CheckCondConfirm($USER->GetID());
         if (!$CondConfirm && $USER->IsAuthorized())
         {
           ?>
          

           
           
           <p align="center" style="color: red;">Ув.Клиент.</p>
           <p align="center" style="color: red;">Для дальнейшей работы с системой поиска и подбора </p> 
           <p align="center" style="color: red;">деталей, вам необходимо ознакомится </p> 
           <p align="center" style="color: red;"> <strong>с условиями работы и подтвердить свое согласие.</strong> </p>
            <p align="center" style="color: red;"> Для этого перейдите на <a href="/docc/">страницу с условиями работы</a>.
             </p>  
           <?   
           exit;  
         }   
      ?> 
        <!-- Google Code for &#1055;&#1086;&#1083;&#1086;&#1078;&#1080;&#1083; &#1074; &#1082;&#1086;&#1088;&#1079;&#1080;&#1085;&#1091; Conversion Page -->
          <!--  <script type="text/javascript">
            /* <![CDATA[ */
            var google_conversion_id = 922186473;
            var google_conversion_language = "en";
            var google_conversion_format = "3";
            var google_conversion_color = "ffffff";
            var google_conversion_label = "Yvi6CNLh6mQQ6eXdtwM";
            var google_remarketing_only = false;
            /* ]]> */
            </script>
            <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
            </script>
            <noscript>
            <div style="display:inline;">
            <img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/922186473/?label=Yvi6CNLh6mQQ6eXdtwM&amp;guid=ON&amp;script=0"/>
            </div>
            </noscript>  -->
      <div style=" width:99%; height:50px; "> 
       <img  id="WideSearch" style="width:5%;height:50px;margin-left:10px; margin-top: 10px;" src="/bitrix/templates/avtodok/images/ArrowWideSearchLeft.jpg"> 
      </div>
    <div  id="HeadOfSearch" > 
      <table border="0" cellspacing="1" cellpadding="3" width="100%" class="list-table" >
    <tr class="head">
        <td valign="middle" colspan="2" align="center" nowrap><div id="search_name" style="font-size:20px;">Поиск по коду Детали </div></td>
    </tr>
    <tr class="head">
        <td valign="middle" colspan="2" align="center" nowrap><div id="search_name" style="font-size:14px;">
       <div  style="width:100%">   Ув. Клиенты и Гости нашего сайта.<br>
        Для качественного поиска запчастей MERCEDES-BENZ <br>
        просим Вас подставлять вперед букву A.<br>        
        Пример: A1663200325  = 1663200325.<br>        
        Также при заказе запчастей MERCEDES-BENZ из Германии,<br> 
        возможна замена и изменения цены без уведомления от поставщика.
        </div>
        </td>
    </tr> 
    <tr>
        <td align="right" nowrap valign="top">
            Код (или часть кода) запчасти:
        </td>
        <td align="left" nowrap>
           <input  id="cod" type="text" name="ICODE" size="40" value="<? if( isSet( $_REQUEST["ICODE"] ))  echo htmlspecialchars($_REQUEST["ICODE"]);?>">
        </td>
     </tr>
     
<?
         // заполняем массив "код бренда" -> Название бренда
        //$arBrands = GetBrandCaptionsArray();
       # if (/*Appearance_ITG::isFirstEnter()*/true)
       # {
            
            
            
           # $regionID = 17;
           # $brandID = 14;
           # $oRegion = new IBPropertyAdvanced_ITG(array('IB'=>$regionID));
            #$arRegions = $oRegion->getArray();
           # $oBrand = new IBPropertyAdvanced_ITG(array('IB'=>$brandID));
           # $arBrands = $oBrand->getArray();
            #$_SESSION['arRegion_ITG'] = $arRegions;
           # $_SESSION['arBrands_ITG'] = $arBrands;
       # }
       # else 
      #  {
            $arRegions = $_SESSION['arRegion_ITG'];
            $arBrands = $_SESSION['arBrands_ITG'];
       # }
        
        #echo "<pre>";
        #print_r($arRegions['Code']);
        #echo "</pre>"; 
        #$UID = GetUserID_1CByID($USER->GetID());
        
        $user = ($UID)?$UID:0;
        $pg = isset($_GET["pg"])?$_GET["pg"]:0;
        if(isSet($_GET["pg"]))
        {?>
               <input type="hidden" name="BCODE"  value="<?=$_REQUEST["BCODE"];?>" />
<?        }
        else
        {
            if( isset( $_REQUEST["BCODE"] ) )//&&  ( $lastICode == $_REQUEST["ICODE"] ) && ( $lastBCode == $_REQUEST["BCODE"] )  )
            {?>
                <input type="hidden" name="BCODE"  value="<?=$_REQUEST["BCODE"];?>" >
<?            }
            else
            {?>
                <input type="hidden" name="BCODE"  value="<?=ALL_BRANDS?>" >
<?            }
        }?>
        <input type="hidden" name="REGION" value="<?=ALL_REGIONS?>">
        <input type="hidden" name="USER"  value="<?=$user;?>" />
        <input type="hidden" name="pg"  value="<?=$pg;?>" />

    <tr>
        <td align="right" nowrap valign="top">
            Сортировка результата:
        </td>
        <td align="left" nowrap>
            <select name="CMB_SORT" gtbfieldid="78">
<?  if( !isSet($_REQUEST["CMB_SORT"])) $_REQUEST["CMB_SORT"] = "PRICE";?>
            <option value="REGION" <? if( $_REQUEST["CMB_SORT"] == "REGION" ) echo "selected='selected'"; ?> >По региону</option>
            <option value="PRICE" <? if( $_REQUEST["CMB_SORT"] == "PRICE" ) echo "selected='selected'";?>>По цене</option>
        </td>
    </tr>
    <tr>
        <td align="right" nowrap valign="top">
            Строк на странице:
        </td>
        <td align="left" nowrap>
            <select name="NUM_PAG" gtbfieldid="78">
<?  if( !isSet($_REQUEST["NUM_PAG"])) $_REQUEST["NUM_PAG"] = "25";?>
            <option value="10" <? if( $_REQUEST["NUM_PAG"] == "10" ) echo "selected='selected'"; ?> >10</option>
            <option value="25" <? if( $_REQUEST["NUM_PAG"] == "25" ) echo "selected='selected'";?>>25</option>
            <option value="50" <? if( $_REQUEST["NUM_PAG"] == "50" ) echo "selected='selected'";?>>50</option>
        </td>
    </tr>
    <tr>
        <td align="right" nowrap valign="top">Валюта пересчета:</td>
        <td><select name="CURRENCY">
<?            #$lcur = CCurrency::GetList(($b="name"), ($order1="asc"), LANGUAGE_ID);
            #if(!isSet( $_REQUEST["CURRENCY"]))  
            $_REQUEST["CURRENCY"] = "USD";

            #while($lcur_res = $lcur->Fetch())
            #{
               # $cur = $lcur_res["CURRENCY"];
               # $curName = $cur;//." - ". CCurrencyRates::ConvertCurrency( 1, $cur, "UAH" ) . " грн. ";    // курс
?>
                <option value="USD" <? if( $_REQUEST["CURRENCY"]) echo 'selected="selected"'; ?>>USD</option>
<?            #}?>
            </select>
        </td>
    </tr>
    <tr>
        <td align="right" nowrap valign="top">
            &nbsp;
        </td>
        <td align="left" nowrap>   
          
           
        </td>
    </tr>
</table>
 </div>
      <?      
 
/* require_once ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/Search_ITG4.php"); 
 #global $DB;
 
         $port=31006;
        $DBB = new mysqli("localhost","bitrix","a251d851","bitrix",$port);
        $DBB->set_charset("utf8");
              $DBB->query("SET NAMES 'utf8'");
             $DBS=&$DBB ;
       $customer= new Customer($DBS) ;
       $result= $customer->getSQLres()  ;
        #print_r($result);  
        foreach ($result as $res=>$key)
        {
            foreach($key as $ar=>$ky)
            {
                 echo $ky;
            }
            
        }  */
       # $time =$timer->end_timer();
   
          
        echo '<div align="center"><span > <input   id="bt" class="btt" type="submit" value="Искать" name="submit_btn"></span></div> '     ;
       # echo "<a id='but'>qqq</a>";
      
       # echo "<br> время".$time;
        /* echo " <script>
             $('#bt').click(function() 
             { 
                 var p=$('#but').html();
                  if (p=='qqq')
                  {
                $('#but').html('www') ;
                  }
                  else
                  {
                   $('#but').html('qqq') ; 
                  }
              }
             )
             </script>"; */
     if (isset($_GET['code']))
     {
        $_GET['ItemCode']=$_GET['code']; 
     }        
           
     if (isset($_GET) && $_GET['bttrigger']=="click")
     {
         ?>
          <script>
           $("#cod").val("<?=$_GET['ItemCode']?>");
           $(document).ready(function(){
              $("#bt").trigger('click'); 
               
           });
           
          </script>
          
         <?
         
         
     }       
         
           
           
    if ($platform != "Android Phone" && $platform != "Android Tablet" && $platform != "iPhone" )  
                   {
                       
                   }   else
                   {
                       ?>
                       <script>
                           // $("#WideSearch").trigger("click");
                       
                       </script>
                       <?
                       
                   }            
             
             
             
             
        
 require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");  
?>