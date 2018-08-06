$(document).ready(function() {
 $("#type_auto").change(function() {
   var typeOfAuto == $("#type_auto :selected").val(),
       formOftype == $("#config_auto");
       
   /* Обнуляем общую и сумму с НДС в поле вывода */
   $("#summ span").text("0");
   $("#summ_nds span").text("0");
   
   /* Выбираем соответствующую форму из файла */
   formOftype.load("fullform.php",{option:typeOfAuto});
   /* Выбираем все чекбоксы которые были подгружены, в этом нам поможет функция live */
formOftype.live("change",function() {
 /* При проведении действий пересчитываем сумму в зависимости от выбраных чекбоксов */
 var totalSum = 0, /* Полную сумму сначала приравниваем к нулю */
     totalSumNDS = 0,
     choiceCMS = parseInt($("#cms_radio :selected").val());
     
 /* Приплюсовываем сумму стоимости CMS */
 totalSum += choiceCMS;
 
 /* Каждое поле ввода проверяем на введеное значение, если больше нуля то считаем его */
 $("#inputCell").each(function() {
       var inputCell = parseInt($("#inputCell").val()) * parseInt($("#inputCell").attr("name"));
       totalSum += inputCell;});
       /* Пересчитываем все чекбоксы которые отмечены галочкой*/
$(this + "input[name=''] :checked").each(function() {
 totalSum += parseInt($(this).val());
});
/* Подсчет и вывод итоговой суммы с НДС и без */
  totalSumNDS = totalSum * 1.18 ;
  $("#summ span").text(totalSum);
  $("#summ_nds span").text(totalSumNDS);
  });
 });
});