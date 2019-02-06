// var brandConfigCounts;
// var SupplierFileName; 
 var brandConfigObject={};
 var SupplierFileNameObject={}; 
 var pattern_for_new_list_columns=''; 
 var new_list_name_object={};
 var patter_for_branddefine_common=''; 
 var pattern_for_ColumnString_ExtraOption=''; 
 var pattern_for_ExtraOption_Array=[];
 var pattern_for_ExtraOption_Array_add={}; 
 var pattern_for_ColumnString_ExtraOption_add=''; 
 var pattern_for_ColumnColumn_ExtraOption='';
 var pattern_for_ColumnColumn_ExtraOption_add='';

 var elementBuffer;
 var duplicate_count;
 var showInfoMassage;
var  fillInfoDiv;
var closeInfoMassage;     
$(function()
{

	var paramTostr = '';
	var triggerToSend = false;
	var sameTime = false;
   
	//for (x in paramsITG)
	//{
	//	paramTostr += (paramsITG[x] + " ");
	//}
	//alert(paramTostr);
	/*if (window.paramsITG)
	{
		var urlQueryAjax = '';
		if(location.pathname == '/autodoc/search_14112011.php') urlQueryAjax = "/bitrix/components/itg/Search/ajaxRequest2.php";
		else urlQueryAjax = "/bitrix/components/itg/Search/ajaxRequest.php";
		$.get(urlQueryAjax, paramsITG, function(data)
		{
			//alert(data);
			$('tr.searchAnalogITG').before(data);
			var htmltxt = "<div align='center' id='itemSearchITG'>";
			htmltxt += "<table id='tableFindedItemsITG'>";
			htmltxt += "<tr>";
			htmltxt += "<th style='width:30px;'>№<\/th>";
			htmltxt += "<th style='width:80px;'>Бренд</th>";
			htmltxt += "<th style='width:100px;'>Код позиции<\/th>";
			htmltxt += "<th style='width:90px;'>Наименование<\/th>";
			htmltxt += "<th style='width:30px;'>Срок <br>пост-<br>авки<br>(Дни)<\/th>";
            htmltxt += "<th style='width:30px;'>Кол-во<\/th>";  
			htmltxt += "<th style='width:80px;'>Регион<\/th>";
            htmltxt += "<th style='width:80px;'>%<\/th>"; 
			htmltxt += "<th style='width:50px;'>Вес<\/th>";
			htmltxt += "<th style='width:80px;'>Цена<\/th>";
			htmltxt += "<th style='width:100px;'>Цена <br>"+paramsITG.currency+"<\/th>";
			if(paramsITG.auth) htmltxt += "<th style='width:120px;border:solid 1px #8b8b8b;color:white;'>Действие<\/th><\/tr>";
			if(data)htmltxt += data;
			else htmltxt = "По Вашему запросу ничего не найдено...";
			$('#notFind').html(htmltxt);
			
		});
	}  */
	$('body').keyup(function(event) 
	{
		//alert(event.keyCode);
		if (event.keyCode == '13' && triggerToSend) 
		{
			/*showCicle();*/
			return false;
		}
		if(event.keyCode == '13' && !triggerToSend)
		{
			/*showCicle();*/ 
			triggerToSend = true;
		}
	});
	$('form[name="datasearch"]').one(
	'submit', function(e)
	{
		if(!triggerToSend)
		{
			showCicle();
		}
		else
		{
			return false;
		}
		
	});
	$('div#brandSearchITG a').click(function()
	{
		if(!triggerToSend)
		{
			showCicle();
			triggerToSend = true;
		}
		else
		{
			return false;
		}
	}
	)
    function dump(obj) {
    var out = "";
    if(obj && typeof(obj) == "object"){
        for (var i in obj) {
            out += i + ": " + obj[i] + "n";
        }
    } else {
        out = obj;
    }
    alert(out);
}
    function CheckForDuplicateBasketItem(element)   //donot used
    {
        var ParamBasket = {
                    bcode:        element.parent().parent().find(':input[type="hidden"]').filter('[name="BrandCode"]').val(),
                    bscode:     element.parent().parent().find(':input[type="hidden"]').filter('[name="BrandShortCode"]').val(),
                    icode:         element.parent().parent().find(':input[type="hidden"]').filter('[name="ItemCode"]').val(),
                    caption:     element.parent().parent().find(':input[type="hidden"]').filter('[name="Caption"]').val(),
                    rcode:         element.parent().parent().find(':input[type="hidden"]').filter('[name="RegionCode"]').val(),
                    delivery:     element.parent().parent().find(':input[type="hidden"]').filter('[name="DeliveryDays"]').val(),
                    currency:     element.parent().parent().find(':input[type="hidden"]').filter('[name="CurrencyCode"]').val(),
                    price:         element.parent().parent().find(':input[type="hidden"]').filter('[name="Price"]').val(),
                    quantity:    element.parent().parent().find(':input[type="text"]').filter('[name="Quantity"]').val(),//BrandShortCode
                    is_returnable:   element.parent().parent().find(':input[type="hidden"]').filter('[name="ReturnableParts"]').val(),
                    item_duplicate_check:"Y",
            };
            
          $.get("/bitrix/components/itg/Basket/Add1.php", ParamBasket, function(data) 
           {    //alert(data);
            //count=Number(data);
              $("#duplicate_info_count").val(""+data+""); 
             // alert($("#duplicate_info_count").val() )
               
           } ) ;
       return $("#duplicate_info_count").val();  
    };  //return quantity of duplicate position
    function AddItemToBasket (element,quantity)
    {
        var ParamBasket = {
                    bcode:      element.parent().parent().find(':input[type="hidden"]').filter('[name="BrandCode"]').val(),
                    bscode:     element.parent().parent().find(':input[type="hidden"]').filter('[name="BrandShortCode"]').val(),
                    icode:      element.parent().parent().find(':input[type="hidden"]').filter('[name="ItemCode"]').val(),
                    caption:    element.parent().parent().find(':input[type="hidden"]').filter('[name="Caption"]').val(),
                    rcode:      element.parent().parent().find(':input[type="hidden"]').filter('[name="RegionCode"]').val(),
                    delivery:   element.parent().parent().find(':input[type="hidden"]').filter('[name="DeliveryDays"]').val(),
                    currency:   element.parent().parent().find(':input[type="hidden"]').filter('[name="CurrencyCode"]').val(),
                    price:      element.parent().parent().find(':input[type="hidden"]').filter('[name="Price"]').val(),
                   // quantity:    element.parent().parent().find(':input[type="text"]').filter('[name="Quantity"]').val(),//BrandShortCode
                    quantity:   quantity, 
               is_returnable:   element.parent().parent().find(':input[type="hidden"]').filter('[name="ReturnableParts"]').val(),
                   
            };
          var paramTostr = '';
            //for (x in ParamBasket)
            //{
            //    paramTostr += (ParamBasket[x] + " ");
            //}
            //alert(paramTostr);
            $.get("/bitrix/components/itg/Basket/Add1.php", ParamBasket, function(data)
            {
                //alert(data);
                var arData = data.split('|');
                $('#addition_status').html(arData[1]);
                $("ul#vertical-multilevel-menu li a[href='/autodoc/mycart.php']").html("КОРЗИНА ( "+arData[0]+" ) ");
                $("ul#vertical-multilevel-menu li a[href='/autodoc/mycartR.php']").html("КОРЗИНА ( "+arData[0]+" ) "); 
            });
            element.next('span').html("<img src='/images/ok2.gif'>");
            return false;
        
    }
    function getItemDuplicateMassage(firstQuantity,secondQuantity,ParamBasket)
    {
        
        thirdQuantity=Number(firstQuantity)+Number(secondQuantity);
        massege=""; 
        massege+="<p align='center'>Ув. Пользователь.<\/p>" ;
        massege+="<p align='center'>В корзине уже имеется аналогичный товар.<\/p>" ;
        massege+="<p align='center' style='margin-bottom:20px;'>"+ParamBasket.icode+" - "+ParamBasket.caption+"  в количестве-"+firstQuantity+"шт.<\/p>";   
        if (Number(firstQuantity)==Number(secondQuantity) )
        {
            massege+="<div align='center'><input type='button' style='margin-bottom:10px;' class='item_duplicate_quantity' count='"+firstQuantity+"' value='Оставить предыдущее значение-"+firstQuantity+" шт.'><\/input><br>";
          //  massege+="<input type='button' class='item_duplicate_quantity' count='"+secondQuantity+"' value='Установить новое значение -"+secondQuantity+" шт.'><\/input><br>";
            massege+="<input type='button' style='margin-bottom:10px;' class='item_duplicate_quantity' count='"+thirdQuantity+"' value='Сложить -"+thirdQuantity+" шт.'><\/input><br><\/div>"; 
         //  massege+="<input type='button' class='item_duplicate_cancel'  value='Отмена'><\/input><\/div>"; 
            
        } else
        {
            
            massege+="<div align='center'><input type='button' style='margin-bottom:10px;' class='item_duplicate_quantity' count='"+firstQuantity+"' value='Оставить предыдущее значение-"+firstQuantity+" шт.'><\/input><br>";
            massege+="<input type='button' style='margin-bottom:10px;' class='item_duplicate_quantity' count='"+secondQuantity+"' value='Установить новое значение -"+secondQuantity+" шт.'><\/input><br>";
            massege+="<input type='button' style='margin-bottom:10px;'  class='item_duplicate_quantity' count='"+thirdQuantity+"' value='Сложить -"+thirdQuantity+" шт.'><\/input><br><\/div>"; 
            //massege+="<input type='button' class='item_duplicate_cancel'  value='Отмена'><\/input><\/div>";   
        } 
        
        return massege; 
    }
    $(".item_duplicate_quantity").live({
      click : function()
      {
          quantity=$(this).attr("count");
          AddItemToBasket (elementBuffer,quantity); 
         // $("#duplicate_info_count").val(quantity);   
          $("#basket_duplicate_info_div").css("display","none");
          $("#basket_duplicate_info_div_background").css("display","none"); 
      }  
        
    })
    $('td > a.itg-basket-style').live('click',function(){
          jqxhr.abort(); 
         var ParamBasket = {
                    bcode:        $(this).parent().parent().find(':input[type="hidden"]').filter('[name="BrandCode"]').val(),
                    bscode:     $(this).parent().parent().find(':input[type="hidden"]').filter('[name="BrandShortCode"]').val(),
                    icode:         $(this).parent().parent().find(':input[type="hidden"]').filter('[name="ItemCode"]').val(),
                    caption:     $(this).parent().parent().find(':input[type="hidden"]').filter('[name="Caption"]').val(),
                    rcode:         $(this).parent().parent().find(':input[type="hidden"]').filter('[name="RegionCode"]').val(),
                    delivery:     $(this).parent().parent().find(':input[type="hidden"]').filter('[name="DeliveryDays"]').val(),
                    currency:     $(this).parent().parent().find(':input[type="hidden"]').filter('[name="CurrencyCode"]').val(),
                    price:         $(this).parent().parent().find(':input[type="hidden"]').filter('[name="Price"]').val(),
                    quantity:    $(this).parent().parent().find(':input[type="text"]').filter('[name="Quantity"]').val(),//BrandShortCode
                    is_returnable:   $(this).parent().parent().find(':input[type="hidden"]').filter('[name="ReturnableParts"]').val(),
                    item_duplicate_check:"Y",
            };
          elementBuffer=$(this);  
          $.get("/bitrix/components/itg/Basket/Add1.php", ParamBasket, function(data) 
           {    
               firstQuantity=Number(data); 
               secondQuantity=ParamBasket.quantity;
                      if ( firstQuantity>0)
                      {
                           
                           $("#basket_duplicate_info_div").html("");
                           $("#basket_duplicate_info_div").html(getItemDuplicateMassage(firstQuantity,secondQuantity,ParamBasket));
                           $("#basket_duplicate_info_div").css("display","block");
                           $("#basket_duplicate_info_div_background").css("display","block"); 
                      } else
                      {
                         AddItemToBasket (elementBuffer,secondQuantity);
                         //$("#duplicate_info_count").val(secondQuantity); 
                      }
                
               
               
           } ) ;
        
        
        
        
    }) 
   
     $('td > a.itg-basketR-style').live('click',function(){
        
         var ParamBasket = {
                    bcode:        $(this).parent().parent().find(':input[type="hidden"]').filter('[name="BrandCode"]').val(),
                    bscode:     $(this).parent().parent().find(':input[type="hidden"]').filter('[name="BrandShortCode"]').val(),
                    icode:         $(this).parent().parent().find(':input[type="hidden"]').filter('[name="ItemCode"]').val(),
                    caption:     $(this).parent().parent().find(':input[type="hidden"]').filter('[name="Caption"]').val(),
                    rcode:         $(this).parent().parent().find(':input[type="hidden"]').filter('[name="RegionCode"]').val(),
                    delivery:     $(this).parent().parent().find(':input[type="hidden"]').filter('[name="DeliveryDays"]').val(),
                    currency:     $(this).parent().parent().find(':input[type="hidden"]').filter('[name="CurrencyCode"]').val(),
                    price:         $(this).parent().parent().find(':input[type="hidden"]').filter('[name="Price"]').val(),
                    quantity:    $(this).parent().parent().find(':input[type="text"]').filter('[name="Quantity"]').val(),//BrandShortCode
                    is_returnable:   $(this).parent().parent().find(':input[type="hidden"]').filter('[name="ReturnableParts"]').val(),
                    item_duplicate_check:"Y",
            };
          elementBuffer=$(this);  
          $.get("/bitrix/components/itg/Basket/Add1.php", ParamBasket, function(data) 
           {    
               firstQuantity=Number(data); 
               secondQuantity=ParamBasket.quantity;
                      if ( firstQuantity>0)
                      {
                           
                           $("#basket_duplicate_info_div").html("");
                           $("#basket_duplicate_info_div").html(getItemDuplicateMassage(firstQuantity,secondQuantity,ParamBasket));
                           $("#basket_duplicate_info_div").css("display","block");
                           $("#basket_duplicate_info_div_background").css("display","block"); 
                      } else
                      {
                         AddItemToBasket (elementBuffer,secondQuantity);
                         //$("#duplicate_info_count").val(secondQuantity); 
                      }
                
               
               
           } ) ;
        
        
        
        
    }) 
   /* $('td > a.itg-basket-style_test_test_test').live(
    {
       click : function()
       {
          elementBuffer="";
          quantity=$(this).parent().parent().find(':input[type="text"]').filter('[name="Quantity"]').val();
          
          
          
          
         //firstQuantity=$("#duplicate_info_count").val();
          firstQuantity=CheckForDuplicateBasketItem($(this)); 
          secondQuantity=quantity;
         element=$(this); 
         alert(CheckForDuplicateBasketItem(element));
          if ( Number(firstQuantity)>0)
          {
               elementBuffer=$(this);
               $("#basket_duplicate_info_div").html("");
               $("#basket_duplicate_info_div").html(getItemDuplicateMassage(firstQuantity,secondQuantity));
               $("#basket_duplicate_info_div").css("display","block");
               $("#basket_duplicate_info_div_background").css("display","block"); 
          } else
          {
             AddItemToBasket ($(this),secondQuantity);
             //$("#duplicate_info_count").val(secondQuantity); 
          }
           
           
       }
    }) */
	 /**
     * 
     */
   /* $('td > a.itg-basket-style').live(
	{
		click : function()
		{
			//var txt = $(this).parent().parent().find(':input[type="hidden"]').filter('[name="BrandCode"]').val();//
			//alert(txt);
			var ParamBasket = {
					bcode: 		$(this).parent().parent().find(':input[type="hidden"]').filter('[name="BrandCode"]').val(),
					bscode: 	$(this).parent().parent().find(':input[type="hidden"]').filter('[name="BrandShortCode"]').val(),
					icode: 		$(this).parent().parent().find(':input[type="hidden"]').filter('[name="ItemCode"]').val(),
					caption: 	$(this).parent().parent().find(':input[type="hidden"]').filter('[name="Caption"]').val(),
					rcode: 		$(this).parent().parent().find(':input[type="hidden"]').filter('[name="RegionCode"]').val(),
					delivery: 	$(this).parent().parent().find(':input[type="hidden"]').filter('[name="DeliveryDays"]').val(),
					currency: 	$(this).parent().parent().find(':input[type="hidden"]').filter('[name="CurrencyCode"]').val(),
					price: 		$(this).parent().parent().find(':input[type="hidden"]').filter('[name="Price"]').val(),
					quantity:	$(this).parent().parent().find(':input[type="text"]').filter('[name="Quantity"]').val(),//BrandShortCode
                    is_returnable:   $(this).parent().parent().find(':input[type="hidden"]').filter('[name="ReturnableParts"]').val()
			};
			var paramTostr = '';
			//for (x in ParamBasket)
			//{
			//	paramTostr += (ParamBasket[x] + " ");
			//}
			//alert(paramTostr);
			$.get("/bitrix/components/itg/Basket/Add1.php", ParamBasket, function(data)
			{
				//alert(data);
				var arData = data.split('|');
				$('#addition_status').html(arData[1]);
				$("ul#vertical-multilevel-menu li a[href='/autodoc/mycart.php']").html("КОРЗИНА ( "+arData[0]+" ) ");
				
			});
			$(this).next('span').html("<img src='/images/ok2.gif'>");
			return false;
		}
		//mouseover: function(){$(this).find('img').replaceWith("<img style='width:30px;float:right;' title='Добавить в корзину' src=\"http://parts.avtodok.com.ua/bitrix/components/itg/Search/basketActive.png\" />")},
		//mouseout: function(){$(this).find('img').replaceWith("<img style='width:30px;float:right;' title='Добавить в корзину' src=\"http://parts.avtodok.com.ua/bitrix/components/itg/Search/basket.png\" />")}
	}); 
    $('td > a.itg-basketR-style').live(
    {
        click : function()
        {
            //var txt = $(this).parent().parent().find(':input[type="hidden"]').filter('[name="BrandCode"]').val();//
            //alert(txt);
            var ParamBasket = {
                    bcode:         $(this).parent().parent().find(':input[type="hidden"]').filter('[name="BrandCode"]').val(),
                    bscode:     $(this).parent().parent().find(':input[type="hidden"]').filter('[name="BrandShortCode"]').val(),
                    icode:         $(this).parent().parent().find(':input[type="hidden"]').filter('[name="ItemCode"]').val(),
                    caption:     $(this).parent().parent().find(':input[type="hidden"]').filter('[name="Caption"]').val(),
                    rcode:         $(this).parent().parent().find(':input[type="hidden"]').filter('[name="RegionCode"]').val(),
                    delivery:     $(this).parent().parent().find(':input[type="hidden"]').filter('[name="DeliveryDays"]').val(),
                    currency:     $(this).parent().parent().find(':input[type="hidden"]').filter('[name="CurrencyCode"]').val(),
                    price:         $(this).parent().parent().find(':input[type="hidden"]').filter('[name="Price"]').val(),
                    quantity:     $(this).parent().parent().find(':input[type="text"]').filter('[name="Quantity"]').val(),//BrandShortCode
                 is_returnable:   $(this).parent().parent().find(':input[type="hidden"]').filter('[name="ReturnableParts"]').val()
            };
            var paramTostr = '';
            //for (x in ParamBasket)
            //{
            //    paramTostr += (ParamBasket[x] + " ");
            //}
            //alert(paramTostr);
            $.get("/bitrix/components/itg/Basket/Add1.php", ParamBasket, function(data)
            {
                //alert(data);
                var arData = data.split('|');
                $('#addition_status').html(arData[1]);
                $("ul#vertical-multilevel-menu li a[href='/autodoc/mycartR.php']").html("КОРЗИНА ( "+arData[0]+" ) ");
                
            });
            $(this).next('span').html("<img src='/images/ok2.gif'>");
            return false;
        }
        //mouseover: function(){$(this).find('img').replaceWith("<img style='width:30px;float:right;' title='Добавить в корзину' src=\"http://parts.avtodok.com.ua/bitrix/components/itg/Search/basketActive.png\" />")},
        //mouseout: function(){$(this).find('img').replaceWith("<img style='width:30px;float:right;' title='Добавить в корзину' src=\"http://parts.avtodok.com.ua/bitrix/components/itg/Search/basket.png\" />")}
    }); */ 
    $("input.deliveryMethodToUAChange").change(function(){
        if ($(this).attr("checked")!="checked")
        {
            return false;
        }
        id=$(this).attr("id");
        basketID=id.replace(/(.*?)(\_{1})(.*)/,"$3",id);
        //alert(basketID);
        VALUE=$(this).attr("value");
        var arrayM={};
       
        $.ajax({
           type:"POST",
           url:"/bitrix/components/itg/Basket/Add1.php",
           data:{basket_ID:basketID,VALUE:VALUE},
           cache:false,
           success: function(msg){
                     //alert(msg);
                     basketid=msg.split("#");
                     $("input#deliveryDays_"+basketid[0]).val(""+basketid[1]);  
                      basketID=0; 
                      }
            
            
            
        });
        $.ajax({});
         //alert(arrayM[basketID]);
      
        
    });
    
    $('td > a.info-style').live(
    { 
      click : function()
      {
        
         var ItemCode=$(this).parent().parent().find(':input[type="hidden"]').filter('[name="ItemCode"]').val();
        
         
        window.open('/bitrix/components/itg/radiators/ajaxRequestInfo.php?ItemCode='+ItemCode+'',ItemCode,'width=620,height=600,left=30%,top=10%');
          
      }  
        
    });
    
	$('span > a.itg-basket-style').live(
    {
	 click:function()
	{
        jqxhr.abort();
         $('#wait_for_curl').remove(); 
        //alert("www");
		var ParamsAnalog = {
				bcode: 		$('div#content input[type="hidden"]').filter('[name="BrandCode"]').val(),
				icode: 		$('div#content input[type="hidden"]').filter('[name="ItemCode"]').val(),
                bgroup:     $('div#content input[type="hidden"]').filter('[name="BrandGroup"]').val(),
		};
		//var paramTostr = '';
		//for (x in ParamsAnalog)
		//{
		//	paramTostr += (ParamsAnalog[x] + " ");
		//}
		//alert(paramTostr);
		$('table#tableFindedItemsITG tr:last td').html('Ведется поиск...');
     /*   jqxhr= $.ajax({ 
          type:'GET',
           url:"/bitrix/components/itg/Search/ajaxRequestAnalog2.php",
           data:ParamsAnalog,
           cache:false,
           async:true,
           success: function(data){
                    if (data)
                    {
                        $('table#tableFindedItemsITG tr:last td#analogsp').html('Аналоги:');
                        $('table#tableFindedItemsITG tr:last').after(data);
                    }
                    else
                    {
                        $('table#tableFindedItemsITG tr:last td#analogsp').html('Аналоги не найдены...');
                    } 
               
               
           }
            
            
            
        }); */
		$.get( "/bitrix/components/itg/Search/ajaxRequestAnalog2.php" , ParamsAnalog, function(data)
		{
			//alert(data);
			//var arData = data.split('|');
			if (data)
			{
				$('table#tableFindedItemsITG tr:last td#analogsp').html('Аналоги:');
				$('table#tableFindedItemsITG tr:last').after(data);
			}
			else
			{
				$('table#tableFindedItemsITG tr:last td#analogsp').html('Аналоги не найдены...');
			}
		}); 
		return false;
	}
    });
     $('a#tablesearchP').live(
  {
  
  click:function(){ 
  
    /*$('#but').html('RRR') ; */   
      
      
  }
  });
    
    $('div#brandSearchT  a#swithbrand').live(
    {
      click:function()
      {
           jqxhr.abort();
         /* $('#content').html(''); */
          /*$('#ajaxs').remove();*/ 
           $('#tableFindedItemsITG').remove(); 
            $('#brandSearchT').remove(); 
           $('#but').html('RRR') ;
          // $('span > input.btt').attr('disabled','disabled'); 
                  $('span > input.btt').val('Идет Поиск') ; 
          paramssITG =     {
                                           icode:     $(this).find(':input[type="hidden"]').filter('[name="ItemCode"]').val(), 
                                            web:        'connect',
                                            BCODE:      $(this).find(':input[type="hidden"]').filter('[name="BrandCode"]').val(), 
                                           /* bcode:      $(this).find(':input[type="hidden"]').filter('[name="BrandCode"]').val(), */
                                           };
                                           
                    urlQueryAjax = '/personal/suppload/search.php';
                   $.get(urlQueryAjax, paramssITG, function(data)
                   {

                     $('div#content').html(data);
                    /* $('#HeadOfSearch').show();*/ 
                    $('#tablesearchP').trigger('click');          
                   } 
                   );
          
          
      } 
    }  );    

     
    
  
	
	function showCicle()
	{
		if(!triggerToSend)
		{
			var x = ''+$(window).width()/2+'px';
			var y = ''+$(window).height()/2+'px';
			$('form').hide('slow');
			$('#animatedIcon').show().css({'position':'absolute','top':y,'left':x});
			$('#header').wrap("<div style='opacity:0.7;background-color:black;z-index:10000;' />");
			$('#middle').wrap("<div style='opacity:0.7;background-color:black;z-index:10000;' />");
		}
		else
		{
			var x = ''+(($(window).width()/2) - 250)+'px';
			var y = ''+(($(window).height()/2) - 175)+'px';
			$('#animatedIcon2').show('slow').css({'position':'absolute','top':y,'left':x});
		}
		
	}
	if(window.basketCount)
	{
		$("ul#vertical-multilevel-menu li a[href='/autodoc/mycart.php']").html("КОРЗИНА ( "+basketCount+" ) ");
	}
    
    
    $(".brandConfig").click(function(){
        
       id= $(this).attr("id"); 
        
    
       
      openBrandConfigurationDiv(id) 
    
    });
    $(".fileConfig").click(function(){
        
       id= $(this).attr("id");        
    
       
      openBrandConfigurationDiv(id) 
    
    });
    
    
    $(".brandConfigClose").click(function(){
        
       id= $(this).attr("id");   
       
      openBrandConfigurationDiv(id); 
    
    });    
    
    $(".brandConfigAdd").click(function(){
        id= $(this).attr("id");
       // alert(id);
        brandConfigCounts= brandConfigObject[id+"_counts"];
        brandConfigCountsN=brandConfigCounts+1;
        //alert(brandConfigCountsN);
        supplierFileName= brandConfigObject[id+"_SupplierFileName"];
        
        child="<p><input type='text' name='brand_to_change_"+supplierFileName+"["+brandConfigCountsN+"]' value='"+brandConfigCountsN+"' style='background-color:rgba(0,0,0,0.2);border-radius:5px; height:25px; border:solid 1px grey; margin-top:20px;'>==<input type='text' name='right_brand_"+supplierFileName+"["+brandConfigCountsN+"]' value='' style='background-color:rgba(0,0,0,0.2);border-radius:5px; height:25px; border:solid 1px grey; margin-top:20px;'>  <\/p>" ;
          
       // id= $(this).attr("id");   
        $(this).before(child);
        brandConfigObject[id+"_counts"]= brandConfigCountsN;
        //brandConfigCounts+=1;
    
    }); 
    $(".fileConfig_add_new_list_columns").click(function()
    {
      id=$(this).attr("id"); 
      //alert(pattern_for_new_list_columns); 
      //pattern_for_new_list_m=pattern_for_new_list_columns; 
      new_list_name=$("select#"+id+"_new_listName option:selected").val();
     // alert(new_list_name);
      if (new_list_name!="") 
      {
       new_list_name_m=new_list_name.replace(/\s/g,"_");   
       pattern_for_new_list_m=pattern_for_new_list_columns.replace(/\#NEW_LIST_NAME\#/g,new_list_name_m);   
      // alert(pattern_for_new_list_m);
       $("div#"+id+"_new_listName").before(pattern_for_new_list_m);
        //id.parent().before(pattern_for_new_list_m); 
          
      } 
    })
    $(".brandDefineConfig").live('change',function(){
        
          id=$(this).attr("name"); 
          newid=id.replace(/(.*)(\[)(.*?)(\])/g,'$1_$3');
          listName=id.replace(/(.*?)(\[)(.*?)(\])/g,'$3'); 
          itemSelect=$(this).find("option:selected").val();          
          textHTML=pattern_for_ExtraOption_Array[itemSelect].replace(/\#NEW_LIST_NAME\#/g,listName); 
          
          //alert(newid);
          //alert(pattern_for_ColumnString_ExtraOption); 
          
         //alert(pattern_for_ExtraOption_Array[itemSelect]);
          
          
          
          // textHTMLPreviuos=$("div#extra_"+newid).html();
         
          $("div#extra_"+newid).html("");
          $("div#extra_"+newid).html(textHTML);
         
    
        // $(this).after(patter_for_branddefine_common);
    
        
        
    });
    $(".brandDefineConfig").click(function(){
        
        id=$(this).attr("name");
       // alert(id);
        $(this).trigger('change');
        
    })
    $(".brandDefineConfig_extraOptions").live('click',function(){
        
       id=$(this).attr("id");
      //alert(id); 
       listName=id.replace(/(.*?\_{1})(.*?\_{1})(.*?\_{1})(.*?\_{1})(.*)/g,'$5');
       typeName=id.replace(/(.*?\_{1})(.*?\_{1})(.*?)\_{1}(.*?\_{1})(.*)/g,'$3'); 
       
       
       //alert(listName);
       //pattern_for_ExtraOption_Array_add;
       textHTML=pattern_for_ExtraOption_Array_add[typeName].replace(/\#NEW_LIST_NAME\#/g,listName);;
       $(this).before(textHTML);
       
       needHeight= parseInt($(this).parent().parent().css("height"))+35; 
       $(this).parent().parent().css("height",needHeight+"px"); 
        
    })
    $(".brandDefineConfig_extraOptions_select_column").live('change',function(){
        
       name=$(this).attr("name");
       val=$(this).val();
       $("select[name='"+name+"'] option[value="+val+"]").attr("selected","selected");
        
        
    });

    function openBrandConfigurationDiv(idd)
    {
        if ($("div#"+idd+"").css("display")=="none")
        { 
             
          $("#content").css("position","static"); 
           $("#beforecontent").css("position","static");
          $("div#"+idd+"").css("display","block");
        } else
        {
            $("#content").css("position","relative");
            $("#beforecontent").css("position","static");  
            $("div#"+idd+"").css("display","none"); 
        }
    
    
    }  
   ////////////////////////////////////////////// 
     $(".search_table_item_icon").live('mouseover',function(event){
       
        $("body").append("<div id='img_zoom' style=''></div>");
        $("#img_zoom").html($(this).html());
        $("#img_zoom").css('background-color','white');
       // $("#img_zoom").css('border','1px solid black');
        $("#img_zoom").css('position','absolute');
        $("#img_zoom").css('left','50%');
        $("#img_zoom").css('top','50%');
        $("#img_zoom").css('z-index','100');
     //   $("#img_zoom").css('width','300px');
      //  $("#img_zoom").css('height','300px');
        $("#img_zoom img").css('width','100%');
        $("#img_zoom img").css('height','100%');  
       
   })
   $(".search_table_item_icon").live('mouseout',function(event){
       
        $("#img_zoom").remove();
       
       
   })
   $(".search_table_item_icon").live('mousemove',function(event){
       
       $("#img_zoom"). css("top",""+(event.pageY-60)+"px");
        $("#img_zoom"). css("left",""+(event.pageX+100)+"px"); 
         
       
       
   }) 
    
  showInfoMassage = function (infoDiv,BackgroundDiv)
   {
       $("#"+infoDiv).css("display","block");
       $("#"+BackgroundDiv).css("display","block"); 
       
       
   } 
   closeInfoMassage = function (infoDiv,BackgroundDiv)
   {
       $("#"+infoDiv).css("display","none");
       $("#"+BackgroundDiv).css("display","none"); 
       
       
   }   
   
   fillInfoDiv= function(htmlcode,div,OK_BUTTON_VALUE)
   {
       infoButton="<div  align='center'><input type='button' id='OK_BUTTON' align='center' value='"+OK_BUTTON_VALUE+"'></input></div>";
       $("#"+div).html(htmlcode+infoButton);
       
   }   
   //////
  //////////////////////////////////////////////  
});

$.fn.makeNotification= function( )
{
    
    
}