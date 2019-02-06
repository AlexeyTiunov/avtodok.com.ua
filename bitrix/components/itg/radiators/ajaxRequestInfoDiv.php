<?
  require_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php');
  require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/php_interface/include/autodoc_globals.php");
  require_once "{$_SERVER["DOCUMENT_ROOT"]}/bitrix/components/itg/radiators/ProductProps.php"; 
  global $DB;
  function getOptionsArray()
  {
      $optionsArray=array(
      //'BrandName'=>'Марка',
      'ItemCode' =>'Артикул',
     // 'ModelName'=>'Модель',
     // 'OEItemCode'=>'Оригинальный Номер', 
     // 'DateStart' =>'Дата Выпуска Модели',
      //'DateEnd' =>'Дата ',
      'MaterialName'=>'Материал', 
      'CoreFullString' =>'Размеры',
      'PlateFullString' =>'Размеры',
      
      
      
      
      );
      
     return $optionsArray; 
  }
  function formatDateK($date)
  {
       $dateArray=explode("-",$date);
       if (!is_array($dateArray)) return "";
       if (count($dateArray)==1 ) return $dateArray[0];
       if (count($dateArray)==3)
       {  
         if ($dateArray[0]=="0000")return "";
         if ($dateArray[1]=="00")return $dateArray[0];  
         else  
         return  $dateArray[0]."-".$dateArray[1];
       }
       
      
  }
  if (isset($_GET['ItemCode']))
  {
   
      
   $itemCode=preg_replace("/[^A-Z,a-z,0-9]/","",$_GET['ItemCode']) ;
   $sql="SELECT BrandName,ItemCode,ModelName,OEItemCode,DateStart,DateEnd,MaterialName, 
    CoreFullString,PlateFullString,PictureBase64
   FROM b_radiator_koyo  WHERE ItemCode='{$itemCode}'";
   $result=$DB->Query($sql);
   $radArray=$result->Fetch();
   if (!is_array($radArray))
   {        
      exit("<div id=\"button\"><input id=\"done\" type=\"submit\" value=\"Закрыть\" name=\"done\"> </div> "); 
   } 
   
    $brands = GetAllBrandsNameFromID();
    $idBrands = GetAllBrandsPropertiesFromFullName(); 
    $radiator = new ProductProps("b_autodoc_radiator","b_autodoc_items_m",array("id","autodocId"));
    $_SESSION['itgPadiator'] = $radiator->getDependents();   
    $idRad=ProductProps::getIdRadFromItem( $_SESSION['itgPadiator'],$itemCode);     
    $item = ProductProps::getItemFromId($_SESSION['itgPadiator'], $idRad);
    
   ?>
   <style>
    #picture
    {
         position: absolute;
         left:0;
         top:40%;
         width:40%;
         height:80%;
    }
     #picture img
     {
         position: absolute;
         left:0;
         top:0;
         width:100%;
        height: auto;
        
     }
      #button
     {
         position: absolute;
         left:20%;
         top:91%;
        
         
         
     }
     #info
     {    
          position:absolute;      
          width:60%;
          left :40%; 
          height:100%;
          top:40%;
         
     }
      #infoT
      {
       background-color: #D9D9D9;
       border-radius:5px;
       width:98%;
       height:20%; 
      }
     #infoT td
     {
         font-size: 12px;
         font-weight: 700;
         font-family: Helvetica,sans-serif;
         border-radius:5px;
        /* height:20px;
         background-color: grey; */
         text-align: center;
         height:10px;
     }
     #analogs_info
     {
          min-height:50%;
          width:45%;
           background-color: #D9D9D9;
           border-radius:5px;
          font-size: 12px;
           border:solid 1px white;   
         font-family: Helvetica,sans-serif;
         float:left;
         
     }
      #infoA td 
     {
         font-size: 12px;        
         font-family: Helvetica,sans-serif;
         border-radius:5px;
        /* height:20px;
         background-color: grey; */
         text-align: center;
         height:10px;
         
     }
      #infoM td 
     {
         font-size: 12px;        
         font-family: Helvetica,sans-serif;
         border-radius:5px;
        /* height:20px;
         background-color: grey; */
         text-align:center;
         height:10px;
         width:33%;
         
     }
     #infoM th
     {
         width:33%;
         font-size: 12px;        
     }
     
     #models_info
     {
        min-height:50%;
        width:53%;
        background-color: #D9D9D9;
        border-radius:5px;
        font-size: 12px;
          border:solid 1px white;  
        font-family: Helvetica,sans-serif; 
        margin-left:45%; 

       
     }
   </style>
   <div id="picture">
       <img  src="data:image/gif;base64,<?=$radArray['PictureBase64']?>">
   </div>  
   <div id="info">  
     <table  cellspacing="2" id="infoT">
    <? 
     $radArray['PictureBase64']="";
     $radArray['OEItemCode']="";
     $radArray['DateStart']= formatDateK($radArray['DateStart']);
      $radArray['DateEnd']= formatDateK($radArray['DateEnd']);   
     $optionsArray=getOptionsArray();
     foreach ($radArray as $Key=>$Value)
     {
       if (isset($optionsArray [$Key]) && $optionsArray [$Key]!='')
       {   
       echo "<tr style='border-bottom:1px solid white;'>
          
          <td> {$optionsArray [$Key]}</td> <td>:</td> <td style=\"font-weight:100;\">{$Value}</td> 
          
          ";
       echo "</tr>" ;    
       }   
     }    
     ?>
     </table>
      <div id="analogs_info" > 
      <p align="center" style="margin-top:0;"><strong>Является аналогом к:</strong></p>    
              <table align="center" id="infoA" style="width: 100%;">
                        <tr align="center">
                           <th>Бренд</th>
                           <th>Артикул </th>
                        </tr>
                    
                <?
                  $sqlSelectAnalog = "SELECT `B2Code`,`I2Code` FROM `b_autodoc_analogs_m` WHERE `B1Code`='{$item['BrandCode']}' AND `I1Code`='{$item['ItemCode']}'";
                  $result=$DB->Query($sqlSelectAnalog) ;
                  while($sqlAnalogArray=$result->Fetch())
                  {
                           echo "<tr style='border-bottom:1px solid white;'>"      ;
                          echo  "<td > {$brands[$sqlAnalogArray['B2Code']]}</td>
                                 <td > {$sqlAnalogArray['I2Code']}         </td>
                          
                          ";
                          echo"</tr>";
                      
                  }
                  
                  
                 ?>    
                    
                   
                    </table>
      </div>
      <div id="models_info" >
           <p align="center" style="margin-top:0;"><strong>Модели Авто:</strong></p> 
                      <table align="center" id="infoM" style="width: 99%;">  
                           <tr align="center"> 
                               <th>Марка авто</th>
                               <th>Модель Авто</th>
                               <th>Год Начала Выпуска</th>
                               
                           <tr>
                           
    <?                       
             foreach ($_SESSION['itgPadiator'] as $radiatorProps)
                {
                   if ($radiatorProps['autodocId'] == $item['autodocId'])
                      {   
                         echo "<tr align=\"center\" style='border-bottom:1px solid white;'>"  ;
                              echo " <td  >{$brands[$radiatorProps['VendorCode']]}</td>
                             <td style='font-size: 11px;'>{$radiatorProps['ModelRange']}  </td>
                             <td >".substr($radiatorProps['DateBegin'],0,4) ."</td>
                              
                             ";
                         echo"</tr>" ;
                      }
   
                   
                }       
                                         
                        
    ?>                     
                           
                           
                      </table>
      </div>
   </div>
     
   <!--<div id="button"><input id="done" type="submit" value="Закрыть" name="done"> </div> -->
   <script>
      $("#picture").mousedown(function()
      {
          //alert("ww");
      });
   </script>
   <?
       
      
  }
    
?>