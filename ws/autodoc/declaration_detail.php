<?
  require($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');         
   if(!$USER->IsAuthorized() )
   {
      //require($_SERVER["DOCUMENT_ROOT"]."/personal/profile/index.php");
      exit; 
   }
   
    global $DB ;
    $sql="SELECT * FROM  b_iblock_element_prop_s31 WHERE IBLOCK_ELEMENT_ID=".$_GET['ID']." LIMIT 1 " ;
    $result=$DB->query($sql);
    $DecString=$result->Fetch();
    echo " <div style='font-size:18px; text-decoration: underline; color:#080589;  '>
             <strong> <p align='center'>Декларация Отгрузки №{$DecString['PROPERTY_255']}</p>
              <p align='center'>Перевозчик: {$DecString['PROPERTY_254']} </p> </strong>
           </div><br><br>
    ";
    echo "
         <table id='declaration'>
           <tr style=\"border:solid black 1px;\" >
               <th style='width:170px; font-size:12px; color:#080589;'>Номер По Базе</th>
               <th style='width:170px;font-size:12px; color:#080589;'>Дата Отгрузки</th>
               <th style='width:70px;font-size:12px; color:#080589;'>Получатель</th>
               <th style='width:70px;font-size:12px; color:#080589;'>Количество Мест</th>
               <th style='width:70px;font-size:12px; color:#080589;'>Комментарии</th>
           </tr>

    ";
    
    $sql="SELECT NAME  FROM b_user WHERE ID_1C={$DecString['PROPERTY_256']}";
    $result=$DB->query($sql); 
    $user= $result->Fetch();
    echo "
         <tr>
             <td align='center'>№{$DecString['PROPERTY_252']}</td>
             <td align='center'>{$DecString['PROPERTY_253']}</td>
             <td align='center'>{$user['NAME']}</td>
             <td align='center'>".number_format($DecString['PROPERTY_258'], 0, '.', '')."</td>
             <td align='center'>{$DecString['PROPERTY_259']}</td>
         </tr>
    </table>
    <br>
    
    ";
    $sql="SELECT PROPERTY_197 AS Number, IBLOCK_ELEMENT_ID  AS ID FROM  b_iblock_element_prop_s25 WHERE PROPERTY_260={$_GET['ID']}";
    $result=$DB->query($sql);
    while($shipments=$result->Fetch() )
    {
        echo " <a href='shipping_detail.php?ID={$shipments['ID']}'>
        <p style='font-size:13px; color:#080589; margin-left:2%;'>Реализация товаров и услуг № {$shipments['Number']} </p></a>";
        
    }
    
    
?>

 <?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>