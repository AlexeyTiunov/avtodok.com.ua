<?  
#header("Pragma: no-cache");
require_once  ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/timer.php");

 #$timer = new timer();
        #$timer->start_timer();  
 require_once ($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');
 $APPLICATION->SetTitle("Поиск по коду");       
#require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
#$APPLICATION->SetTitle("Поиск по каталогу"); 
#require("/media/Vol/www/bitrix/php_interface/include/autodoc_globals.php");
#require("/media/Vol/www/autodoc/includes/autodoc_templaytor.php");
#require("/media/Vol/www/autodoc/includes/autodoc_stats.php");
require_once  ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/Search_ITG4.php");
require_once ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/IB.property/BrandGroup.php");
    
#require ("/media/Vol/www/bitrix/components/itg/IB.property/IBPropertyAdvanced1.php");
#require ("/media/Vol/www/bitrix/components/itg/Appearance/Appearance.php"); 
session_start(); 
#set_time_limit(15);
global $USER;
#error_reporting(0) ;
$_SESSION['GLUSERMASS'] =$USER->GetUserGroupArray();
  #$_SESSION['GLUSERMASS'][]=4;

      /*$port=31006;
        $DBB = new mysqli("localhost","bitrix","a251d851","bitrix",$port);
        $DBB->set_charset("utf8");
        $DBB->query("SET NAMES 'utf8'");
        $DBS=&$DBB ; */
        
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
              
?>
<table width="100%">
<tr>
<td align="left">
<p align="left" id='addition_status'>
<?
    if (!$USER->IsAuthorized())
    {
       echo "
           <script>
                                PR={
                                    Code: 1,
                                    }
                             urlQuery = \"/bitrix/components/itg/Search/auth.php\";
                         
                             \$.get(urlQuery, PR, function(data)
                                {
                                               
                                    \$('#authin').html(data) ;    
                                             
                                             
                                               
                                             
                                });
       
       
       
       
          </script>
       "; 
    }
 
    if(isSet( $_REQUEST["ICODE"]))
      {
          $_REQUEST["ICODE"]=$_GET['icode']  ;
               //  Приводим к стандартному виду ( верхний регистр, удалены "левые символы" )
      	#$_REQUEST["ICODE"] = PrepareICode( $_REQUEST["ICODE"] );
           $_REQUEST["ICODE"] = preg_replace("/[^A-Za-z0-9]*/i", "",$_REQUEST["ICODE"]);
                 //  разруливаем ситуации с новым поиском и пересчетом текущих результаттов ( сортировка, пересчет цен в валюту и т.п.
        if( isset($_SESSION["LASTICODE"]) )
          $lastICode = $_SESSION["LASTICODE"];
        else
          $lastICode = false;
        $_SESSION["LASTICODE"] = $_REQUEST["ICODE"];
	    if( isSet( $_REQUEST["BCODE"]) )
	      {
              
	        if( $lastICode != $_REQUEST["ICODE"] )
           $_REQUEST["BCODE"]= ALL_BRANDS;
	      }
      } else
      {
        $_REQUEST["ICODE"]=$_GET['icode']  ;
               //  Приводим к стандартному виду ( верхний регистр, удалены "левые символы" )
           $_REQUEST["ICODE"] = preg_replace("/[^A-Za-z0-9]*/i", "",$_REQUEST["ICODE"]);     
      }
	#$cartItemsCnt = Appearance_ITG::getCountOfItems();
     $cartItemsCnt =0;
     CModule::IncludeModule("sale"); CModule::IncludeModule('iblock');
?>
</p>
</td>
<td align="right">

</td>
</tr>
</table>
<?php 
if ($cartItemsCnt && $cartItemsCnt != -1)
{
	echo "<SCRIPT>
			var basketCount={$cartItemsCnt};
		</SCRIPT>";
}
?>


<?#=bitrix_sessid_post();?>


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
      <div id="WideSearch" style="width:100%"> Ув. Клиенты и Гости нашего сайта.<br>
        Для качественного поиска запчастей MERCEDES-BENZ <br>
        просим Вас подставлять вперед букву A.<br>        
        Пример: A1663200325  = 1663200325.<br>        
        Также при заказе запчастей MERCEDES-BENZ из Германии,<br> 
        возможна замена и изменения цены без уведомления от поставщика.
        </div></td>
    </tr> <br>
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
           if (isset($_SESSION['arBrands_ITG']) && isset ($_SESSION['arRegion_ITG']))
           {
                $arRegions = $_SESSION['arRegion_ITG'];
                $arBrands = $_SESSION['arBrands_ITG'];
               
           } else
           {
                require ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/IB.property/IBPropertyAdvanced1.php"); 
        	     $regionID = 17;
                 $brandID = 14;
                 $oRegion = new IBPropertyAdvanced_ITG(array('IB'=>$regionID));
                 $arRegions = $oRegion->getArray();
                 $oBrand = new IBPropertyAdvanced_ITG(array('IB'=>$brandID));
                 $arBrands = $oBrand->getArray();
                  $_SESSION['arRegion_ITG'] = $arRegions;
                 $_SESSION['arBrands_ITG'] = $arBrands;
           }
           
       # }
        
        #echo "<pre>";
        #print_r($arRegions['Code']);
        #echo "</pre>"; 
		$UID = GetUserID_1CByID($USER->GetID());
       
        
        if(!$UID && $USER->IsAuthorized())
        {
            
        ?>
         <p align="center" style="color: red;">Ув.Клиент.</p> 
         <p align="center"  style="color: red;"> Процесс активаций еще не закончен.</p> 
         <p align="center"  style="color: red;">В течении 10 минут активация завершится.</p> 
         <p align="center"  style="color: red;">И у вас будет возможность работать с прайсом.</p>
        <?
            exit;
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
        
		$user = ($UID)?$UID:0;
		$pg = isset($_GET["pg"])?$_GET["pg"]:0;
		if(isSet($_GET["pg"]))
		{?>
               <input type="hidden" name="BCODE"  value="<?=$_REQUEST["BCODE"];?>" />
<?		}
		else
		{
			if( isset( $_REQUEST["BCODE"] ) )//&&  ( $lastICode == $_REQUEST["ICODE"] ) && ( $lastBCode == $_REQUEST["BCODE"] )  )
			{?>
				<input type="hidden" name="BCODE"  value="<?=$_REQUEST["BCODE"];?>" >
<?			}
			else
			{?>
				<input type="hidden" name="BCODE"  value="<?=ALL_BRANDS?>" >
<?			}
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
<?  if( !isSet($_REQUEST["NUM_PAG"])) $_REQUEST["NUM_PAG"] = "1000";?>
            <option value="10" <? if( $_REQUEST["NUM_PAG"] == "10" ) echo "selected='selected'"; ?> >10</option>
            <option value="25" <? if( $_REQUEST["NUM_PAG"] == "25" ) echo "selected='selected'";?>>25</option>
            <option value="50" <? if( $_REQUEST["NUM_PAG"] == "50" ) echo "selected='selected'";?>>50</option>
        </td>
    </tr>
    <tr>
		<td align="right" nowrap valign="top">Валюта пересчета:</td>
		<td><select name="CURRENCY">
<?			#$lcur = CCurrency::GetList(($b="name"), ($order1="asc"), LANGUAGE_ID);
			#if(!isSet( $_REQUEST["CURRENCY"]))  
            $_REQUEST["CURRENCY"] = "USD";

			#while($lcur_res = $lcur->Fetch())
			#{
			   # $cur = $lcur_res["CURRENCY"];
			   # $curName = $cur;//." - ". CCurrencyRates::ConvertCurrency( 1, $cur, "UAH" ) . " грн. ";    // курс
?>
			    <option value="USD" <? if( $_REQUEST["CURRENCY"]) echo 'selected="selected"'; ?>>USD</option>
<?			#}?>
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

<div align="center"><span > <input   id="bt" class="btt" type="submit" value="Идет Поиск" name="submit_btn" disabled="disabled"></span></div> 
    </div>
    <script>
          $('#cod').keyup(
        
        function(event)
        {   
                 if (event.keyCode == '13')
                 {
                        if( $('#cod').val()!=''   )   
                         {
                
                               paramssITG =     {
                                            icode:     $('#cod').val(),
                                            web:        'connect',   
                                           };
               
                                  urlQueryAjax = '/personal/suppload/search.php';
                             $.get(urlQueryAjax, paramssITG, function(data)
                            {
                              
                              $('div#content').html(data);
                                
                            } 
                           )  ;
        
                      }
                     
                     
                 }
        
        
        
         
         
    
       });     
    </script>
    <a name="tablesearch"> </a>
                            <a  id="tablesearchA" href="#tablesearch"> <p id="tablesearchP"></p>  </a>
                            <a  id="tablesearchAc" href="#AcSearch"> <p id="tablesearchPc"></p>  </a>  
<br /><br />
<?
	#echo 'HTTP_REFERER'.$_SERVER['HTTP_REFERER']."<br />";
	#echo 'REQUEST_URI'.$_SERVER['REQUEST_URI']."<br />";
	#echo 'SERVER_NAME'.$_SERVER['SERVER_NAME']."<br />";
	#echo 'REMOTE_HOST'.$_SERVER['REMOTE_HOST']."<br />";
	#if (Appearance_ITG::isFirstEnter())
	#{
	#	echo "<pre>";
	#	print_r($_SERVER);
	#	echo "</pre>";
	#}
	
	$_SESSION['arUser_ITG'] = array('user'=>$UID,'currency'=>$_REQUEST["CURRENCY"]);
	if ($USER->IsAuthorized()) $_SESSION['arUser_ITG']['auth'] = 'yes';
	$printParams = false;
	if(isset($_REQUEST["ICODE"]))
    {
		//$UID = GetUserID_1CByID($USER->GetID());
        
		#$itemCodeGAF = str_replace(array(' ','-','.',',','*'),'',trim($_REQUEST['ICODE']));
         $itemCodeGAF= $_REQUEST["ICODE"];
        
		//echo $UID."<br />".$_REQUEST["CURRENCY"]."<br />".$itemCodeGAF."<br />".$_REQUEST["BCODE"]."<br />".$_GET["pg"]."<br />".$_REQUEST["NUM_PAG"]."<br />".$_REQUEST["CMB_SORT"];
		 # var_dump($_GET["BCODE"]);
 		$items = new Search_ITG(array(	'user'=>$UID,
                                        'userID'=>$USER->GetID(),
                                        'usergrouparray'=>$USER->GetUserGroupArray(),
 										'currency'=>$_REQUEST["CURRENCY"], 
 										'icode'=>$itemCodeGAF, 
 										'bcode'=>$_GET["BCODE"], 
 										'page'=>$_GET["pg"], 
 										'numPage'=>$_REQUEST["NUM_PAG"], 
 										'sort'=>$_REQUEST["CMB_SORT"],
 										'arBrands'=>$arBrands['id'],
 										'region'=>$arRegions['Code'],
 										'regionID'=>$arRegions['id'],
                                        'DBB'=>$DBS));


		#echo "<pre>";
		#print_r($items);
		#echo "</pre>";
       #$time=$timer->end_timer();
       #echo $time; 
       
       #$timer = new timer();
       # $timer->start_timer(); 
		if ($items->getNumRows() > 0)
		{
			##echo "<br /> 1 <br />";
			$products = $items->getArrItems();
             $timer = new timer();
             $timer->start_timer(); 
            #$infoArray=$items ->GetInfoFromMegaP() ;
            $time=$timer->end_timer();
			#echo "<pre>";
			#print_r($products);
			#echo "</pre>";
			#if ($items->getExact())
			#{
			#	$statObj = new CStats();
	        #    $statObj->StoreLine($products[0]['BrandCode'],$products[0]['ItemCode']);
			#}
			$brands = $items->getBrans();
            #echo "<pre>";
           # print_r($brands);
           # echo "</pre>";
			$url = $items->getUrl();
            $sqlstring=$items->returnSqlString();
           #echo  $sqlstring;
			//echo "<pre>";
			//print_r($url);
			//echo "</pre>";

			#echo "<br/>brands ".$countBrand."<br/>";
			#echo "<pre>";
			#print_r($brands);
			#echo "</pre>";
			$triggerPrintHeaderBrand = false;
			$j = 0;
			$countBrand = count($brands);
            #echo   $countBrand;
            if($countBrand == 0 )
            {
                    echo "По Вашему запросу ничего не найдено..." ;
                     echo "<script> \$('span > input.btt').val('Искать') ; \$('span > input.btt').removeAttr('disabled');</script>"; 
            }
			foreach ($brands as $keyBr=>$brand)
			{

				#echo "<br/>exact ".$items->getExact()."<br/>";
                
				if ($countBrand > 1 /*&& !$items->containItems()*/)
				{
					//$styleToHide = " style='display:none;' ";
					//echo print_r($arBrands);					
					#echo $brand;	
                    
                    
					if ($j == 0) echo "<div id='brandSearchT'> <a name='brandS'>";
					echo "<div><a  href='#BrandS' style=\"text-decoration:none;color: rgb(50, 50, 50);font-size: 11pt;font-family: Arial;font-style: normal;\"  id=\"swithbrand\" ><strong>&nbsp;{$brand}</strong>
                         <input type=\"hidden\" name=\"ItemCode\" value=\"".$itemCodeGAF."\">
                         <input type=\"hidden\" name=\"BrandCode\" value=\"".$keyBr."\"> </a>
                         </div>";
					if ($countBrand == ($j+1)) echo "</div>
                    <script> \$('span > input.btt').val('Искать') ; \$('span > input.btt').removeAttr('disabled');</script>";
				}
                

				elseif($countBrand == 1 /*|| $items->containItems()*/)
				{
					if ($j == 0) 
					{
						echo "<div align='center' id='itemSearchITG' style='width:100%'>
                            
							<table id='tableFindedItemsITG'>
							     <tr id ='toremove'>
									<th style='width:30px;'>№</th>
									<th style='width:80px;'>Бренд</th>
									<th style='width:100px;'>Код позиции</th>
									<th style='width:90px; '>Наименование</th>
									<th style='width:30px;'>Срок <br>пост-<br>авки<br>(Дни)</th>
                                    <th style='width:80px;'>Кол---во</th>
									<th style='width:50px;'>Регион</th>
                                    <th style='width:20px;'>%<br>выпо-<br>лне-<br>ния</th>  
									<th style='width:50px;'>Вес</th>
									<th style='width:80px;'>Цена&nbsp;&nbsp;Гривна</th>
									<th style='width:100px;'>Справочная<br>Инф.<br>Цена <br>в {$_REQUEST['CURRENCY']}</th>";
						#if($USER->IsAuthorized())
						#{
							echo "<th style='width:120px;border:solid 1px #8b8b8b;color:white;'>Действие</th>";
						#}
						echo "</tr>";
					}
					if(!isset($_GET["pg"]) || $_GET["pg"] == 0) $nextPage = 2;
					else $nextPage = intval($_GET["pg"] + 1);
					$i = (($nextPage - 1)*intval($_REQUEST["NUM_PAG"])) - intval($_REQUEST["NUM_PAG"]);
	
					$triggerItem = '';
					$counItems = count($products);

					foreach ($products as $product)
					{
						#echo "<pre>";
						#print_r($product);
						#echo "</pre>";
						if ($product['RegionCode'] > 4) 
                        {
                            
                             $idgr=$USER->GetUserGroupArray();
                              #$idgr[]=4;
                                #print_r($idgr)    ;
                              foreach ($idgr as $id=>$i)
                              {
   
                                  if ($i==4)
                                 {  #echo'www';
                                   $idgrch=true; 
                                    break;   
                                  } else
                                    {
                                      $idgrch=false ;
                                     }
                               }
                              if(!$USER->IsAuthorized()|| $idgrch!=true) 
                               {  
                                 $product['RegionShortName'] = 'УКРАИНА';
                               } else
                                {
                                $product['RegionShortName'] = "<a href='#' title='{$product['RegionFullName']}'>УКРАИНА<br>{$product['RegionFullName']}</a>";//по просьбе идиотов
                                $cssStyle = 'background-color:#eed5d5;';
                                }
                        }
						if ($product['RegionCode'] ==1000) $product['RegionShortName'] = 'ДОНЕЦК';//
                        if ($product['RegionCode'] ==999) $product['RegionShortName'] = 'PL';
                         if ($product['RegionCode'] ==997) $product['RegionShortName'] = 'JPN'; 
                         if ($product['RegionCode'] ==995) $product['RegionShortName'] = 'EU'; 
                         if ($product['RegionCode'] ==994) $product['RegionShortName'] = 'Б/У запчасти';
                          if ($product['RegionCode'] ==993) $product['RegionShortName'] = 'EU';
                          if ($product['RegionCode'] ==992) $product['RegionShortName'] = 'UAE';
                          if ($product['RegionCode'] ==991) $product['RegionShortName'] = 'UAE';
                         if ($product['RegionCode'] ==990) $product['RegionShortName'] = 'UA';
                          if ($product['RegionCode'] ==989) $product['RegionShortName'] = 'DE';
                           if ($product['RegionCode'] ==988) $product['RegionShortName'] = 'DE';
                            if ($product['RegionCode'] ==987) $product['RegionShortName'] = 'DE';
                             if ($product['RegionCode'] ==986) $product['RegionShortName'] = 'DE';
                             if ($product['RegionCode'] ==985) $product['RegionShortName'] = 'DE'; 
                              if ($product['RegionCode'] ==984) $product['RegionShortName'] = 'DE';        
                        #if ($product['RegionCode'] ==1000) $product['RegionCode'] =1;//
                        //пишем только выбранный бренд
						#if ($product['BrandName'] != $brand) continue;
						
						if ($triggerItem !== '' && $triggerItem != $product["ItemCode"])
						{
							$triggerItem = $product["ItemCode"];
						}
						
						$i++;
						// выделяем цветом строку, если она отсутствовала в предыдущем прайсе
						$cssStyle = '';
			    		switch ($product['RegionShortName'])
			    		{
			    			case 'УКРАИНА':
			    				$cssStyle = 'background-color:#eed5d5;';
			    				break;
                            case  "<a href='#' title='{$product['RegionFullName']}'>УКРАИНА<br>{$product['RegionFullName']}</a>":   
                                $cssStyle = 'background-color:#eed5d5;';  
                                break;
			    			case 'СКЛАД':
			    				$cssStyle = 'background-color:#fefedc;';
			    				break;
                                case 'ДОНЕЦК':
                                $cssStyle = 'background-color:#fefedc;';
                                break;
			    			default:
			    				$cssStyle = 'background-color:#e3e3e3;';
			    		}

						echo "<tr style='{$cssStyle}' id='{$product['BrandName']}{$i}'>";
						echo "<td style='width:30px; '><span class='counterFor'></span><input type='hidden' name='BrandShortCode' value='".$arBrands['id'][$product['BrandCode']]['ShortName']."' /></td>";
						echo"	<td style='width:80px;'>" ;
                            echo "
                            <script>
                               function defPosition(event) {
                                var x = y = 0;
                                  if (document.attachEvent != null) {
                                    x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
                                    y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
                                        }
                                if (!document.attachEvent && document.addEventListener) {
                                 x = event.clientX + window.scrollX;
                                 y = event.clientY + window.scrollY;
                                }
                                 return {x:x, y:y};
      
                                 }
                             </script>  
                            ";
                           if  ($product['BrandName']=="KOYORAD")    $product['BrandName'].="<br> 
                                                                                                <a href=\"#\" class=\"info-style\">INFO</a> <br>
                                                                                                
                                                                                                 ";
                           #<div class='search_table_item_icon'><img src='data:image/png;base64,{$product['Pic64Base']}' style='width:30px;height:30px'></div> 
                           #echo $product['BrandName']."<br>
                           # <a href=\"#\" onclick=\"window.open('http://{$_SERVER["SERVER_NAME"]}/bitrix/components/itg/radiators/ajaxRequestInfo.php?ItemCode=".$product["ItemCode"]."','".$product["ItemCode"]."','width=630,height=620,left='+defPosition(event).x+',top='+defPosition(event).y); return false\" >INFO</a>
                          # " ; 
                           elseif(($product['BrandName']=="GSP" && $product["RegionCode"] == 1) ||($product['BrandName']=="GSP" && $product["RegionCode"] ==1000) )  $product['BrandName'].="<br>
                            <a href=\"#\" onclick=\"window.open('/personal/order/chassis/GspInfo.php?ItemCode=".$product["ItemCode"]."&BrandCode=".$product["BrandCode"]."','".$product["ItemCode"]."','width=490,height=430,left='+defPosition(event).x+',top='+defPosition(event).y); return false\" >INFO</a>
                           " ;
                           elseif(($product['BrandName']=="AP" && $product["RegionCode"] == 1) ||($product['BrandName']=="AP" && $product["RegionCode"] ==1000) )  $product['BrandName'].="<br>
                            <a href=\"#\" onclick=\"window.open('/personal/order/DiskBrake/DiskBrakeInfo.php?ItemCode=".$product["ItemCode"]."&BrandCode=".$product["BrandCode"]."','".$product["ItemCode"]."','width=490,height=480,left='+defPosition(event).x+',top='+defPosition(event).y); return false\" >INFO</a>
                           " ; 
                            elseif(($product['BrandName']=="RTI" && $product["RegionCode"] == 1) ||($product['BrandName']=="RTI" && $product["RegionCode"] ==1000) )  $product['BrandName'].="<br> 
                            <a href=\"#\" onclick=\"window.open('/personal/order/RTI/RTIinfo.php?ItemCode=".$product["ItemCode"]."&BrandCode=".$product["BrandCode"]."','".$product["ItemCode"]."','width=490,height=480,left='+defPosition(event).x+',top='+defPosition(event).y); return false\" >INFO</a>
                            
                           " ;  
                         # elseif(($product['BrandName']=="RTI" && $product["RegionCode"] == 1) ||($product['BrandName']=="RTI" && $product["RegionCode"] ==1000) ) echo $product['BrandName']."<br> 
                         #                                                                       <a href=\"#\" class=\"info-style\">INFO</a> <br>
                        #                                                                        <div class='search_table_item_icon'><img src='data:image/png;base64,{$product['Pic64Base']}' style='width:30px;height:30px'></div>
                         #                                                                        ";
                            elseif(($product['BrandName']=="BROTHER" && $product["RegionCode"] == 1) ||($product['BrandName']=="BROTHER" && $product["RegionCode"] ==1000) )  $product['BrandName'].="<br>
                            <a href=\"#\" onclick=\"window.open('/personal/order/BROTHERS/BROTHERSinfo.php?ItemCode=".$product["ItemCode"]."&BrandCode=".$product["BrandCode"]."','".$product["ItemCode"]."','width=510,height=480,left='+defPosition(event).x+',top='+defPosition(event).y); return false\" >INFO</a>
                           " ; 
                          if ($product['Pic64Base']!="")
                           { 
                              if ($product['BrandName']!="DOLPHIN" )
                              { 
                                $product['BrandName'].="<br> <div class='search_table_item_icon'><img src='data:image/png;base64,{$product['Pic64Base']}' style='width:30px;height:30px'></div>";                      
                              }
                              else 
                              {  
                                $product['BrandName'].="<br> <div class='search_table_item_icon'><img src='data:image/png;base64,{$product['Pic64Base']}' style='width:30px;height:30px'></div>";
                                $product['BrandName'].="<div class='search_table_item_icon'><img src='/bitrix/templates/avtodok/images/1_garant.png' style='width:30px;height:30px'></div>";
                              }
                           } 
                            echo $product['BrandName'];  
                        echo "<input type='hidden' name='BrandCode' value='{$product['BrandCode']}' />";
                         echo "<input type='hidden' name='BrandGroup' value='{$keyBr}'/></td> ";
						echo	"<td style='width:90px;text-align:left; font-size:11px'>";
						// если цена она отсутствовала в предыдущем прайсе, то без болда &nbsp;";  
						#$objTStr = new TemplatedString($product["ItemCode"]);
						#$objTStr->SetTemplate($product["BrandCode"]);
						#$objTStr->SetColor("black");
						#$objTStr->SetSelection($itemCodeGAF);
						#$codeTemplate = $objTStr->GetTemplated();
                          $codeTemplate= $product['ItemCode'];
						if($product["isActive"] == '0') $codeTemplate = "<strong>".$codeTemplate."</strong>";
						echo $codeTemplate."<input type='hidden' name='ItemCode' value='{$product['ItemCode']}' /></td>";
						echo "<td style='width:90px;text-align:left;'><font>{$product['Caption']}</font><input type='hidden' name='Caption' value='{$product['Caption']}' /></td>
							<td style='width:30px;font-size:10px;'>";
						if($product["RegionCode"] == 1 or $product["RegionCode"] == 1000 ) 
                         {
                              if ($product["Quantity"]>0)
                              {
                                echo "<font style='font-size:10px;text-align:left;'><strong>Есть<br>в<br>нал-и</strong></font>";  
                              } else
                              {
                                    echo "<font style='font-size:10px;text-align:left;color:red;'><strong>НЕТ<br>в<br>нал-и</strong></font>";
                              } 
                             
                         } elseif( $product["RegionCode"] == 1187 )
                               {
                                   echo "<font style='font-size:10px;text-align:left;'><strong>Есть<br>в<br>нал-и</strong></font>";
                               }
                        
                       # echo "<font style='font-size:10px;text-align:left;'><strong>Есть<br>в<br>нал-и</strong></font>";
                                
                         
						else 
                        {
                          if ($product['ORDER_AFTER_DAY']!="" or $product['ORDER_AFTER_DAY']!=null ) 
                          {
                            if ($product['ORDER_AFTER_TIME']=="" or $product['ORDER_AFTER_TIME']==null )
                                {
                                    $deliveryDateMassage="Отримання приблизно {$product["DeliveryDate"]}";
                                }else
                                {
                                      $deliveryDateMassage="Отримання приблизно {$product["DeliveryDate"]} після {$product['ORDER_AFTER_TIME']}.";
                                }
                             if ($product['ORDER_END_TIME']=="" or $product['ORDER_END_TIME']==null)
                             {
                               echo "<strong>".intval($product["DeliveryDays"])."</strong>";   
                             }else
                             {  
                              echo "<strong><a href='#' title='{$deliveryDateMassage}'>".intval($product["DeliveryDays"])."</a></strong>";
                             }
                          } else
                          {
                              echo "<strong>".intval($product["DeliveryDays"])."</strong>"; 
                          }
                        }
                        echo"</td>"  ;
                        echo "<td style='width:80px;text-align:left;font-size:11px'> ";
                               if($product["RegionCode"] == 1 or $product["RegionCode"] == 1000 ) echo "<strong>".$product["Quantity"]." шт.</strong>" ;
                               elseif( $product["RegionCode"] == 3 )    echo "<strong>>".$product["Quantity"]." шт.</strong>" ;
                               elseif( $product["RegionCode"] == 2 )
                               {  
                                 if   ($product["Quantity"]==0) 
                                 {
                                      echo "<strong>>2 шт.</strong>" ; 
                                 }else
                                 {
                                  echo "<p style=\"color:red; \"><strong>".$product["Quantity"]." шт.</strong></p>" ;
                                 } 
                               } 
                               # elseif( $product["RegionCode"] == 2 )    echo "<strong>>1 шт.</strong>" ;                               
                               #elseif($product["RegionCode"] == 2  )    echo "<strong>".$infoArray["quantity"]." шт.</strong>" ;
                               else echo "<strong>".$product["Quantity"]." шт.</strong>" ;
                        echo"</td>";
						echo "<input type='hidden' name='RegionCode' value='{$product['RegionCode']}' /></td>
							<td style='width:50px; font-size:10px;'><strong>";
                            if (!isset($product["REGION_NAME_DESCRIPTION"]))
                            {
                               # $product["RegionShortName"].="W";
                               #var_dump($product);
                            }
                         if ($product["REGION_NAME_DESCRIPTION"]!="" && $product["REGION_NAME_DESCRIPTION"]!=null) 
                         {
                           $product["RegionShortName"]="<a href='#' title='{$product["REGION_NAME_DESCRIPTION"]}'>{$product["RegionShortName"]}</a>";  
                         }  
                         if (isset($product["ReturnableParts"]) && $product["ReturnableParts"]==1)
                         {
                            echo $product["RegionShortName"]; 
                            echo "<br><img title='Возвратная позиция (по согласованию!)' src='/personal/order/images/is_returnable.png'>";
                         }  else
                         {
                             echo $product["RegionShortName"];
                             echo "<br><img  title='Не возвратная позиция' src='/personal/order/images/isnot_returnable.png'>";     
                         }  
						 echo "<input type='hidden' name='ReturnableParts' value='{$product['ReturnableParts']}' /> ";
						echo "</strong><input type='hidden' name='DeliveryDays' value='".intval($product["DeliveryDays"])."' /></td>";
                        echo    "  <td style='width:20px; font-size:11px;'>";          //PercentSupped
                                  if($product["RegionCode"] == 1 or $product["RegionCode"] == 1000) echo "100%";
                                  elseif  ( $product["RegionCode"] == 3 ) echo "100%" ;
                                 elseif( $product["RegionCode"] == 2 )
                                 {
                                   if ($items->supped>25  )echo $items->supped.'%'  ;
                                   #elseif ($items->supped<25 )  echo "25%";
                                   elseif ( $items->supped=="N") echo "100%";
                                    elseif ( $items->supped=="") echo "100%";
                                   else echo "25%" ;
                                 }
                                   #elseif( $product["RegionCode"] == 2 ) echo '100%'  ;
                                   elseif  ( $product["RegionCode"] == 997 ) echo "100%" ;
                                    elseif  ( $product["RegionCode"] == 998 ) echo "100%" ; 
                                    elseif  ( $product["RegionCode"] == 985 ) echo "100%" ;
                                    elseif  ( $product["RegionCode"] == 987 ) echo "100%" ;
                                    elseif  ( $product["RegionCode"] == 4 ) echo "100%" ;     
                                  else echo ($product['PercentSupp']==0)?"":$product['PercentSupp']."%";
                        
                        echo "</td>";
						echo	"<td style='width:50px; font-size:11px;'>{$product['Weight']}<input type='hidden' name='Weight' value='{$infoArray['weight']}' /></td>
							<td style='width:80px;font-size:11px;text-align:center'>";
						#$prices = "&nbsp;".CurrencyFormat($product["Price"],$product["Currency"])."&nbsp;";
                        $prices = "&nbsp;".CurrencyFormat( $product["Price"]* (Search_ITG::PriceKoef($product["Currency"],"UAH")) ,"UAH")."&nbsp;";
                        $pricesUAH= $product["Price"]* (Search_ITG::PriceKoef($product["Currency"],"UAH"));
                        $pricesnew= CurrencyFormat($product["Price"],$product["Currency"]);
						// если цена отсутствовала в предыдущем прайсе, то без болда
						if($product["isActive"] != '0') $prices = '<div id="table_search_cena">'.$prices.'</div>';
						echo $prices."
                            <input type='hidden' name='Prices' value='{$pricesnew}' />
							<input type='hidden' name='CurrencyCode' value='UAH' /></td>
							<td style='width:80px;font-size:11px;text-align:center'>".CurrencyFormat($product["UserPrice"]*(Search_ITG::PriceKoef($product["Currency"],$_REQUEST["CURRENCY"])),$_REQUEST["CURRENCY"])."&nbsp;<input type='hidden' name='Price' value='{$pricesUAH}' /></td>";
					   if (($product["Quantity"]==0&&$product['RegionCode']!=1) || ($product["Quantity"]>0) )
                       {
                        if($USER->IsAuthorized())
						{
                            if ($USER->GetID()==852 )
                            {
                                echo"
                            <td style='width:120px;'>&nbsp;
                                <input name='Quantity' type='text' size='1' value='1' id='qty_{$i}_{$product['BrandCode']}'/> шт.&nbsp;&nbsp;
                                <a     class='itg-basket-style' style='border-width:0px;'
                                    href='#' 
                                    ><img style='width:30px;float:right;' title='Добавить в корзину' src=\"/bitrix/components/itg/Search/basket.png\" />
                                </a>
                                <span id='pic_{$i}_{$product['BrandCode']}'>&nbsp;</span>
                            </td>";
                                
                                
                            }else
                            {
							echo"
							<td style='width:120px;'>&nbsp;
								<input name='Quantity' type='text' size='1' value='1' id='qty_{$i}_{$product['BrandCode']}'/> шт.&nbsp;&nbsp;
								<a 	class='itg-basket-style' style='border-width:0px;'
									href='#' 
									><img style='width:30px;float:right;' title='Добавить в корзину' src=\"/bitrix/components/itg/Search/basket.png\" />
								</a>
								<span id='pic_{$i}_{$product['BrandCode']}'>&nbsp;</span>
							</td>";
                            }
						}
                        else
                        {
                            echo"
                            <td style='width:120px;'>&nbsp;
                                <input name='Quantity' type='text' size='1' value='1' id='qty_{$i}_{$product['BrandCode']}'/> шт.&nbsp;&nbsp;
                                <a  class='itg-basketR-style' style='border-width:0px;'
                                    href='#' 
                                    ><img style='width:30px;float:right;' title='Быстрый Заказ,Розничная цена' src=\"/bitrix/components/itg/Search/Basket.gif\" />
                                </a>
                                <span id='pic_{$i}_{$product['BrandCode']}'>&nbsp;</span>
                            </td>";
                            
                        }
                      } else
                      {
                          echo"
                            <td style='width:120px;'>&nbsp; </td>
                            
                            
                            ";
                            
                      }
						echo "</tr>";
                                                # require_once $_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/ajaxRequest.php";
						$triggerItem = $product["ItemCode"];//триггер для вставки аналогов
						$triggerBrand = $product["BrandCode"];
						$triggerSpan = "analogs_{$i}_{$product['BrandCode']}";
					}
					if ($items->getExactInAbout())
					{
						#$statObj = new CStats();//вводим данные статистики
						#$statObj->StoreLine($triggerBrand,$triggerItem);
						echo"<tr class='searchAnalogITG'>
						<td id='analogsp' colspan='12' align='center'>
							<span  id='{$triggerSpan}'>
								<a id='BSearchAnolog'href='#'class='itg-basket-style'  ><input type='button' value='Показать аналоги' style='display: inline-block;text-align: center;vertical-align: middle;cursor: pointer;border: 1px solid #8c0101;padding: 6px 12px;font-size: 14px;line-height: 1.42857143;
border-radius: 4px;
background-color: #eed5d5;
color: #060000;
font-weight: unset;
'></a>
							</span>
						</td>
						</tr>";
						   //Показать аналоги
						$triggerItem = $product["ItemCode"];
					}
                    #echo $items->returnSqlString();   
                    if ($items->getExact() && !$printParams)
                    {
                       echo "<script>
                               jqxhr.abort(); 
                               var ParamsAnalog = {
                                     bcode:         \$('div#content input[type=\"hidden\"]').filter('[name=\"BrandCode\"]').val(),                                  
                                    icode:         \$('div#content input[type=\"hidden\"]').filter('[name=\"ItemCode\"]').val(),
                                    bgroup:     \$('div#content input[type=\"hidden\"]').filter('[name=\"BrandGroup\"]').val(),  
                                    AnalogsForOurStock: 'YES',
                                                  }; 
                               \$.get(\"/bitrix/components/itg/Search/ajaxRequestAnalog1.php\", ParamsAnalog, function(data)
                                {
                                   
                                    if (data)
                                    {
                                     \$('table#tableFindedItemsITG tr:last').before(data);
                                    
                                    }
                                    
                                });  
                              /*  jqxhr= \$.ajax({
                                                     type:'GET',
                                                     url:\"/bitrix/components/itg/Search/ajaxRequestAnalog1.php\",
                                                     dataType:'html', 
                                                     data: ParamsAnalog,
                                                     cache:false, 
                                                     async:true,      
                                                     success:function(data)
                                                     {
                                                     alert('test');
                                                          if (data)
                                                            {
                                                             \$('table#tableFindedItemsITG tr:last').before(data);
                                                            
                                                            }
                                                     
                                                     }
                                                     
                                           })  */          
                                       
                                \$('span > input.btt').val('Искать');
                                \$('span > input.btt').removeAttr('disabled');
                                </script>
                                    "; 
                    }   
                             
					if ($items->getExact() && !$printParams && !$items->inOwnWarehouse()) 
					{
                     #echo "<script type=\"text/javascript\" src=\"/bitrix/components/itg/Search/ajax1.js\"></script>"; 
                     #bcode:         \$('div#content input[type=\"hidden\"]').filter('[name=\"BrandCode\"]').val(),     
						   /*   echo "<script>
                               jqxhr.abort(); 
                               var ParamsAnalog = {
                                     bcode:         \$('div#content input[type=\"hidden\"]').filter('[name=\"BrandCode\"]').val(),                                  
                                    icode:         \$('div#content input[type=\"hidden\"]').filter('[name=\"ItemCode\"]').val(),
                                    bgroup:     \$('div#content input[type=\"hidden\"]').filter('[name=\"BrandGroup\"]').val(),  
                                    AnalogsForOurStock: 'YES',
                                                  }; 
                               \$.get(\"/bitrix/components/itg/Search/ajaxRequestAnalog1.php\", ParamsAnalog, function(data)
                                {
                                   
                                    if (data)
                                    {
                                     \$('table#tableFindedItemsITG tr:last').before(data);
                                    
                                    }
                                    
                                });
                                \$('span > input.btt').val('Искать');
                                \$('span > input.btt').removeAttr('disabled');
                                </script>
                                    ";  */
                        
                               if (!$items->inOwnWarehouseUSA()) 
                              {
                                        echo "
						                <script>
                                         jqxhr.abort(); 
							                paramsITG = 	{
                                                            OnlyUsa:   'N' ,
											                icode:		'{$itemCodeGAF}',
											                user:		'{$UID}',
											                currency:	'{$_REQUEST['CURRENCY']}',
											                web:		'connect',
											                iterator:	'{$i}',";
						                    if($USER->IsAuthorized())
						                    {
							                    echo "			auth:		'yes'";
						                    }
							                
						                    echo "				};
                                            </script> ";
                                }else
                                {
                                              echo "
                                            <script>
                                             jqxhr.abort(); 
                                                paramsITG =     {
                                                                OnlyUsa:   'W' ,
                                                                icode:        '{$itemCodeGAF}',
                                                                user:        '{$UID}',
                                                                currency:    '{$_REQUEST['CURRENCY']}',
                                                                web:        'connect',
                                                                iterator:    '{$i}',";
                                                if($USER->IsAuthorized())
                                                {
                                                    echo "            auth:        'yes'";
                                                }
                                                
                                                echo "                };
                                                </script> ";
                                    
                                } 
                         $printParams = true; 
                       } else
                    {    
                               // показали аналоги при наличии оригинала на нашем складе
                                echo "<script>
                                 jqxhr.abort(); 
                               var ParamsAnalog = {
                                     bcode:         \$('div#content input[type=\"hidden\"]').filter('[name=\"BrandCode\"]').val(),                                  
                                    icode:         \$('div#content input[type=\"hidden\"]').filter('[name=\"ItemCode\"]').val(),
                                    bgroup:     \$('div#content input[type=\"hidden\"]').filter('[name=\"BrandGroup\"]').val(),  
                                    AnalogsForOurStock: 'YES',
                                                  }; 
                               \$.get(\"/bitrix/components/itg/Search/ajaxRequestAnalog1.php\", ParamsAnalog, function(data)
                                {
                                   
                                    if (data)
                                    {
                                     \$('table#tableFindedItemsITG tr:last').before(data);
                                    
                                    }
                                    
                                });  
                                
                               /* jqxhr= \$.ajax({
                                                     type:'GET',
                                                     url:\"/bitrix/components/itg/Search/ajaxRequestAnalog1.php\",
                                                     dataType:'html', 
                                                     data: ParamsAnalog,
                                                     cache:false, 
                                                     async:true,      
                                                     success:function(data)
                                                     {
                                                     alert('test');
                                                          if (data)
                                                            {
                                                             \$('table#tableFindedItemsITG tr:last').before(data);
                                                            
                                                            }
                                                     
                                                     }
                                                     
                                           })  */          
                                
                                    
                                
                                \$('span > input.btt').val('Искать');
                                \$('span > input.btt').removeAttr('disabled');
                                </script>
                                    ";    
                                    //  OnlyUsa:   'Y' ,  
                               if (!$items->inOwnWarehouseUSA()) 
                               {
                                          echo "
                                        <script>
                                         jqxhr.abort(); 
                                            paramsITG =     {
                                                            OnlyUsa:   'Y' ,
                                                            icode:        '{$itemCodeGAF}',
                                                            user:        '{$UID}',
                                                            currency:    '{$_REQUEST['CURRENCY']}',
                                                            web:        'connect',
                                                            iterator:    '{$i}',";
                                        if($USER->IsAuthorized())
                                        {
                                            echo "            auth:        'yes'";
                                        }
                                            
                                        echo "                };
                                        </script> ";
                                }else
                                {
                                    echo" <script> 
                                    paramsITG = { };                           
                                     \$('span > input.btt').val('Искать');
                                     \$('span > input.btt').removeAttr('disabled'); 
                                     
                                      </script>
                                    ";
                                    
                                    
                                }   
                                      
                                         $printParams = true; 
                       }
                       $ajax=true ;
                       if ($ajax)
                       {
                           
                           
                           echo     "   <script>  
                                       wait_for_curl=\"<tr id='wait_for_curl'><td style='background-color:white;' id='analogsp' colspan='12' align='center'><img style='margin-left: 5%;' src='/images/loadIcon2.gif'></td></tr>\";                   
                                                         
                                                       
                                       // alert(wait_for_curl);   
                                       \$('tr.searchAnalogITG').before(wait_for_curl);           
                                        jqxhr.abort();
                                     if (window.paramsITG)
                                        {
                                           var urlQueryAjax = '';
                                           if(location.pathname == '/autodoc/search_14112011.php') urlQueryAjax = \"/bitrix/components/itg/Search/ajaxRequest2.php\";
                                           else urlQueryAjax = \"/bitrix/components/itg/Search/ajaxRequest.php\";
                                          jqxhr= \$.ajax({
                                                     type:'GET',
                                                     url:urlQueryAjax,
                                                     dataType:'html', 
                                                     data: paramsITG,
                                                     cache:false, 
                                                     async:true,      
                                                     success:function(data)
                                                     {   
                                                             //alert(data);
                                                            // \$('tr.searchAnalogITG').before(wait_for_curl); 
                                                            \$('#wait_for_curl').remove();
                                                              \$('tr.searchAnalogITG').before(data);
                                                              var htmltxt = \"<div align='center' id='itemSearchITG'>\";
                                                              htmltxt += \"<table id='tableFindedItemsITG'>\";
                                                              htmltxt += \"<tr>\";
                                                              htmltxt += \"<th style='width:30px;'>№</th>\";
                                                              htmltxt += \"<th style='width:80px;'>Бренд</th>\";
                                                              htmltxt += \"<th style='width:100px;'>Код позиции</th>\";
                                                              htmltxt += \"<th style='width:90px;'>Наименование</th>\";
                                                              htmltxt += \"<th style='width:30px;'>Срок <br>пост-<br>авки<br>(Дни)</th>\";
                                                              htmltxt += \"<th style='width:30px;'>Кол-во</th>\";  
                                                              htmltxt += \"<th style='width:80px;'>Регион</th>\";
                                                              htmltxt += \"<th style='width:80px;'>%<br>выпо-<br>лне-<br>ния</th>\"; 
                                                              htmltxt += \"<th style='width:50px;'>Вес</th>\";
                                                              htmltxt += \"<th style='width:80px;'>Цена&nbsp;&nbsp;Гривна</th>\";
                                                              htmltxt += \"<th style='width:100px;'>Справочная<br>Инф.<br>Цена <br>в USD</th>\";
                                                              if(paramsITG.auth) htmltxt += \"<th style='width:120px;border:solid 1px #8b8b8b;color:white;'>Действие</th></tr>\";
                                                              if(data)
                                                  {htmltxt += data;
                                                   htmltxt += \"<tr class='searchAnalogITG'> <td id='analogsp' colspan='12' align='center'><span><a id='BSearchAnolog'href='#'class='itg-basket-style'  ><input type='button' value='Показать аналоги' style='display: inline-block;text-align: center;vertical-align: middle;cursor: pointer;border: 1px solid #8c0101;padding: 6px 12px;font-size: 14px;line-height: 1.42857143;border-radius: 4px;background-color: #eed5d5;color: #060000;font-weight: unset;'></a></span></td></tr>\";
                                                   }
                                                              else htmltxt = \"По Вашему запросу ничего не найдено...\";
                                                              \$('#notFind').html(htmltxt);
                                                              \$('span > input.btt').val('Искать');
                                                             \$('span > input.btt').removeAttr('disabled'); 
                                                     },
                                                      error: function(XMLHttpRequest, textStatus, errorThrown)
                                                         {}
                                           
                                           
                                           });
                                          
                                          
                                           
                                        }
                                        /*setTimeout(function() 
                                          { 
                                       
                                             jqxhr.abort();
                                             \$('#wait_for_curl').remove();
                                        //    alert('stop1') 
                                          }, 8000);*/
                        
                        </script>"; 
                       } else
                       {
                          echo     "   <script>
                          jqxhr.abort();   
                                     if (window.paramsITG)
                                        {
                                           var urlQueryAjax = '';
                                           if(location.pathname == '/autodoc/search_14112011.php') urlQueryAjax = \"/bitrix/components/itg/Search/ajaxRequest2.php\";
                                           else urlQueryAjax = \"/bitrix/components/itg/Search/ajaxRequest.php\";
                                           jqxhr= \$.ajax({
                                                     type:'GET',
                                                     url:urlQueryAjax,
                                                     dataType:'html', 
                                                     data: paramsITG,
                                                     cache:false, 
                                                     async:true,      
                                                     success:function(data)
                                                     {   
                                                             //alert(data);
                                                              \$('tr.searchAnalogITG').before(data);
                                                              var htmltxt = \"<div align='center' id='itemSearchITG'>\";
                                                              htmltxt += \"<table id='tableFindedItemsITG'>\";
                                                              htmltxt += \"<tr>\";
                                                              htmltxt += \"<th style='width:30px;'>№</th>\";
                                                              htmltxt += \"<th style='width:80px;'>Бренд</th>\";
                                                              htmltxt += \"<th style='width:100px;'>Код позиции</th>\";
                                                              htmltxt += \"<th style='width:90px;'>Наименование</th>\";
                                                              htmltxt += \"<th style='width:30px;'>Срок <br>пост-<br>авки<br>(Дни)</th>\";
                                                              htmltxt += \"<th style='width:30px;'>Кол-во</th>\";  
                                                              htmltxt += \"<th style='width:80px;'>Регион</th>\";
                                                              htmltxt += \"<th style='width:80px;'>%<br>выпо-<br>лне-<br>ния</th>\"; 
                                                              htmltxt += \"<th style='width:50px;'>Вес</th>\";
                                                              htmltxt += \"<th style='width:80px;'>Цена&nbsp;&nbsp;Гривна</th>\";
                                                              htmltxt += \"<th style='width:100px;'>Справочная<br>Инф.<br>Цена <br>в USD</th>\";
                                                              if(paramsITG.auth) htmltxt += \"<th style='width:120px;border:solid 1px #8b8b8b;color:white;'>Действие</th></tr>\";
                                                              if(data)
                                                  {htmltxt += data;
                                                   htmltxt += \"<tr class='searchAnalogITG'> <td id='analogsp' colspan='12' align='center'><span><a id='BSearchAnolog'href='#'class='itg-basket-style'  ><input type='button' value='Показать аналоги' style='display: inline-block;text-align: center;vertical-align: middle;cursor: pointer;border: 1px solid #8c0101;padding: 6px 12px;font-size: 14px;line-height: 1.42857143;border-radius: 4px;background-color: #eed5d5;color: #060000;font-weight: unset;'></a></span></td></tr>\";
                                                   }
                                                              else htmltxt = \"По Вашему запросу ничего не найдено...\";
                                                              \$('#notFind').html(htmltxt);
                                                              \$('span > input.btt').val('Искать');
                                                             \$('span > input.btt').removeAttr('disabled'); 
                                                     },
                                                      error: function(XMLHttpRequest, textStatus, errorThrown)
                                                         {}
                                           
                                           
                                           });             
                                          }
                                           setTimeout(function() 
                                          { 
                                       
                                             jqxhr.abort();
                                          //   alert('stop2') 
                                          }, 8000);
                        
                        </script>"; 
                       }
                         
                       
						#$printParams = true;
					#}
                    
                    #else{ echo "<script> \$('span > input.btt').val('Искать'); \$('span > input.btt').removeAttr('disabled');</script>"; }
                     #echo "<script type=\"text/javascript\" src=\"/bitrix/components/itg/Search/ajax1.js\"></script>";
                     
                  //Vivat block here    
              /**     if (!$items->CheckItemInfo)  
                   {
                      echo"
                         <script>
                            params={
                                    ItemCode: '{$itemCodeGAF}',
                                    }
                             urlQuery = \"/bitrix/components/itg/Search/InfoForItem.php\";
                              \$.ajax({
                                      type:'GET',
                                      url:urlQuery,
                                      dataType:'html', 
                                      data: params,
                                      cache:false, 
                                      async:true,      
                                       success:function(data)
                                       {}
                                       error: function(XMLHttpRequest, textStatus, errorThrown)
                                       {}
                              }) ;
                            
                         
                         
                         
                         
                         
                         </script>
                      
                      
                      
                      
                      "; 
                       
                   }   
                 **/    
                     
                     
                     
					$triggerItem = $product["ItemCode"];
					#echo "$j<br />";
					#echo "$countBrand<br />";
					if ($countBrand == ($j+1)) echo "</table></div>";
					if((($nextPage - 1)*intval($_REQUEST["NUM_PAG"]))%$items->getNumRows() == 0 && $items->getNumRows() >= $_REQUEST["NUM_PAG"])
					{
						$link = "ICODE=".$_REQUEST["ICODE"]."&BCODE=".$_REQUEST["BCODE"]."&REGION=".$_REQUEST["REGION"]."&CMB_SORT=".$_REQUEST["CMB_SORT"]."&NUM_PAG=".$_REQUEST["NUM_PAG"]."&CURRENCY=".$_REQUEST["CURRENCY"]."&pg=";
						$linkNext = $link.$nextPage;
						$linkPrev = $link.intval($nextPage-2);
						echo "<center>";
						if(intval($nextPage) > 2)
						{
							echo "<a href='?".$linkPrev."'> Предыдущая страница</a> | ";
						}
						echo "<a href='?".$linkNext."'>Следующая страница </a></center>";
					}
					elseif($nextPage > 2)
					{
						$link = "ICODE=".$_REQUEST["ICODE"]."&BCODE=".$_REQUEST["BCODE"]."&REGION=".$_REQUEST["REGION"]."&CMB_SORT=".$_REQUEST["CMB_SORT"]."&NUM_PAG=".$_REQUEST["NUM_PAG"]."&CURRENCY=".$_REQUEST["CURRENCY"]."&pg=";
						$linkPrev = $link.intval($nextPage-2);
						echo "<center><a href='?".$linkPrev."'> Предыдущая страница</a></center>";
					}
				}
               
				++$j;
                  
			}
            
         if (isset($_SESSION['CountScript'])&& $_SESSION['CountScript']==0)
         {
        # echo "<script type=\"text/javascript\" src=\"/bitrix/components/itg/Search/ajax1.js\"></script>";
         $_SESSION['CountScript']=$_SESSION['CountScript']+1;
         }
         elseif (!isset($_SESSION['CountScript']))
         {
           $_SESSION['CountScript']=0;  
          # echo "<script  type=\"text/javascript\" src=\"/bitrix/components/itg/Search/ajax1.js\"></script>";   
         }    
	  }
		else 
		{
            
            
            
			echo "<span id='notFind'></span>";
			
			echo "
			<script>
				paramsITG = 	{
                                OnlyUsa:   'N' ,
								icode:		'{$itemCodeGAF}',
								user:		'{$UID}',
								currency:	'{$_REQUEST['CURRENCY']}',
								web:		'connect',
								iterator:	'{$i}',";
				if($USER->IsAuthorized())
				{
					echo "			auth:		'yes'";
				}
				
				echo "				}; 
                 
                  wait_for_curl=\"<br><img  id='wait_for_curl' style='' src='/images/loadIcon2.gif'>\";                   
                                                                    
                                                       
                                       // alert(wait_for_curl);   
                                       \$('#bt').after(wait_for_curl); 
                 jqxhr.abort();    
                  if (window.paramsITG)
                                        {
                                           var urlQueryAjax = '';
                                           if(location.pathname == '/autodoc/search_14112011.php') urlQueryAjax = \"/bitrix/components/itg/Search/ajaxRequest2.php\";
                                           else urlQueryAjax = \"/bitrix/components/itg/Search/ajaxRequest.php\";
                                            jqxhr= \$.ajax({
                                                     type:'GET',
                                                     url:urlQueryAjax,
                                                     dataType:'html', 
                                                     data: paramsITG,
                                                     cache:false, 
                                                     async:true,
                                                     check_my:false,      
                                                     success:function(data)
                                                     {   
                                                             //alert(data);
                                                             \$('#wait_for_curl').remove();
                                                              \$('tr.searchAnalogITG').before(data);
                                                              var htmltxt = \"<div align='center' id='itemSearchITG'>\";
                                                              htmltxt += \"<table id='tableFindedItemsITG'>\";
                                                              htmltxt += \"<tr>\";
                                                              htmltxt += \"<th style='width:30px;'>№</th>\";
                                                              htmltxt += \"<th style='width:80px;'>Бренд</th>\";
                                                              htmltxt += \"<th style='width:100px;'>Код позиции</th>\";
                                                              htmltxt += \"<th style='width:90px;'>Наименование</th>\";
                                                              htmltxt += \"<th style='width:30px;'>Срок <br>пост-<br>авки<br>(Дни)</th>\";
                                                              htmltxt += \"<th style='width:30px;'>Кол-во</th>\";  
                                                              htmltxt += \"<th style='width:80px;'>Регион</th>\";
                                                              htmltxt += \"<th style='width:80px;'>%<br>выпо-<br>лне-<br>ния</th>\"; 
                                                              htmltxt += \"<th style='width:50px;'>Вес</th>\";
                                                              htmltxt += \"<th style='width:80px;'>Цена&nbsp;&nbsp;Гривна</th>\";
                                                              htmltxt += \"<th style='width:100px;'>Справочная<br>Инф.<br>Цена <br>в USD</th>\";
                                                              if(paramsITG.auth) htmltxt += \"<th style='width:120px;border:solid 1px #8b8b8b;color:white;'>Действие</th></tr>\";
                                                              if(data)
                                                  {htmltxt += data;
                                                   htmltxt += \"<tr class='searchAnalogITG'> <td id='analogsp' colspan='12' align='center'><span><a id='BSearchAnolog'href='#'class='itg-basket-style'  ><input type='button' value='Показать аналоги' style='display: inline-block;text-align: center;vertical-align: middle;cursor: pointer;border: 1px solid #8c0101;padding: 6px 12px;font-size: 14px;line-height: 1.42857143;border-radius: 4px;background-color: #eed5d5;color: #060000;font-weight: unset;'></a></span></td></tr>\";
                                                    jqxhr.check_my=true;      
                                                   }
                                                   else
                                                   { 
                                                   htmltxt = \"По Вашему запросу ничего не найдено...\";   
                                                   jqxhr.check_my=false; 
                                                   }
                                                              \$('#notFind').html(htmltxt);
                                                              \$('span > input.btt').val('Искать');
                                                             \$('span > input.btt').removeAttr('disabled'); 
                                                          
                                                     },
                                                      error: function(XMLHttpRequest, textStatus, errorThrown)
                                                         {}
                                           
                                           
                                           });
                                          
                                          }
                                          setTimeout(function() 
                                          { 
                                            // alert(jqxhr.check_my);
                                             jqxhr.abort();
                                              \$('#wait_for_curl').remove();
                                             
                                             
                                             if  (!jqxhr.check_my) 
                                             {
                                                htmltxt = \"По Вашему запросу ничего не найдено....\";
                                                              \$('#notFind').html(htmltxt);  
                                              \$('span > input.btt').val('Искать');
                                              \$('span > input.btt').removeAttr('disabled');   
                                             } 
                                              
                                            // alert('stop3') 
                                          }, 8000);
                        
			</script>";
			
            
		}
     # $time=$timer->end_timer();
       #echo $time."<br>";
      # echo $countBrand .'brand<br>' ;
      # echo $sqlstring.'st';
       #print_r($brands );
    }
    else 
    {
print <<<HERE
<center>
 <b>Уважаемые клиенты!</b><br />

Просим обращать внимание на указанный срок поставки запчастей:<br /> 

<b>0 дней-</b> поставка с нашего склада (ул. Деревообрабатывающая,5),<br />

<b>1-2 дня-</b>     поставка с удалённых складов-партнёров.<br>
Цены на заказ из UAE и USA указаны без доставки.<br>
Стоимость доставки Вы можете уточнить у наших сотрудников.<br /><br />
<div style="max-width:700px;margin:100px 20px 0px 20px;text-align:left;opacity:0.7; padding:20px;color: #323232;">
 Среди множества компаний, поставляющих запчасти для автомобилей иностранного производства в Киеве и на территории Украины, Автодок Партс http://parts.avtodok.com.ua/ является безусловным лидером. Здесь в любое время Вы сможете найти необходимые автозапчасти для японских автомобилей, в том числе для машин таких брендов как Toyota, Lexus, Mitsubishi, Ford, Mazda, Honda, Nissan, Subaru, Suzuki и многих других. Автодок Партс занимает одно из ведущих мест на рынке автозапчастей Киева и Украины.

Автодок Партс имеет партнерские отношения с компаней KOYORAD (Япония), которая уже более пятидесяти лет производит радиаторы и автозапчасти для японских авто , а также авто ведущих мировых производителей. KOYORAD завоевал известность и признание во всем мире, что является гарантией надежности и качества тех автозапчастей, распространением которых в Киеве занимается Автодок Партс.

Используя для изготовления автозапчастей только самые лучшие материалы, KOYORAD не завышает цены, что делает его продукцию доступной для покупателей Киева и регионов Украины. Доступные цены и высокое качество – вот главные принципы работы KOYORAD.

Кроме товаров японского производителя KOYORAD, Автодок Партс предлагает автозапчасти и других ведущих брендов со склада в Киеве и под заказ, которые зарекомендовали себя на мировых рынках высоким качеством своей продукции.

Множество СТО Киева, магазинов автозапчастей по Киеву и регионам, а также розничных покупателей смогли ощутить сервис предоставляемый компанией Автодок Партс и вряд ли будут искать другую компанию в Киеве или на Украине, в качестве партнера.

Высокое качество автозапчастей, приемлемые цены (не только для Киева, но и для регионов), наличие на складе в Киеве – это отличительная черта компании Автодок. И даже если в настоящий момент какой-то нужной детали нет в наличии, ее Вам доставят в максимально короткие сроки (доставка из ОАЭ и Германии – 14 дней, из США – 25-30 дней).

В каталоге компании Автодок Партс Вы сможете найти все необходимые автозапчасти: радиаторы охлаждения двигателя, кондиционеры, масла ведущих мировых брендов, специальные жидкости для автомобилей японского и европейского производства, а так же многое другое. На складах компании в Киеве постоянно обновляется и поддерживается наличие автозапчастей для автомобилей Toyota, Mitsubishi, Honda, Nissan, Subaru, Suzuki.

Каталог компании Автодок содержит более 10 млн наименований товаров высочайшего качества. Вряд ли в Киеве найдется еще одна фирма, которая сможет предложить Вам такой широкий выбор автозапчастей.

Компания Автодок продает автозапчасти оптом и в розницу. В каталоге компании помимо товара который присутствует на складе в Киеве можно найти автозапчасти поставляемые прямо из ОАЕ, Америки и Европы.

Компания Автодок привлекает не только качеством и конкурентными по Киеву ценами на автозапчасти для японских автомобилей и автомобилей западных производителей, но и гибкой системой скидок для постоянных клиентов, оптовых покупателей и станций технического обслуживания.

Где бы Вы не находились (Киев, или любой другой регион Украины), заказанные Вами автозапчасти будут доставлены в оговоренный срок. А благодаря уникальной системе оповещения клиентов, Вы в любой момент сможете узнать, где в данный момент находится Ваш заказ и когда он будет доставлен в Киев.

Сайт компании Автодок Партс предлагает пользователям ознакомиться с ассортиментом имеющихся автозапчастей, которые находятся на складах в Киеве и по Украине, а также возможно заказать в Европе, США и ОАЕ. С помощью удобного сервиса поиска, можно найти необходимую Вам автозапчасть за считанные мгновения. Квалифицированные менеджеры компании Автодок Партс помогут Вам подобрать необходимые автозапчасти для машины по самым выгодным в Киеве ценам.

Уверены, Вы останетесь довольны работой компании Автодок Партс. Наши цена и качество позволят Вам наслаждаться работой Вашего авто.

На сайте Автодок Партс Вы найдете огромное количество автозапчастей для иномарок.

</div>

</center>
HERE;
    }

#require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");
#echo "<div id='animatedIcon' style='display:none;'><img src=\"http://parts.avtodok.com.ua/bitrix/components/itg/Search/animated_loading.gif\" /><br />Загрузка...</div>";
#echo "<div id='animatedIcon2' style='display:none;'><img src=\"http://parts.avtodok.com.ua/bitrix/components/itg/Search/comin.png\" /></div>";
?>
