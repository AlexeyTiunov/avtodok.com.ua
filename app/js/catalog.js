$(function(){
   var totalsum; 
   function dump(obj) {
    var out = "";
    if(obj && typeof(obj) == "object"){
        for (var i in obj) {
            out += i + ": " + obj[i] + "\n";
        }
    } else {
        out = obj;
    }
    alert(out);
}
  $("#type_auto").change(function()
  {
              $("#catalog_list").html("");
             $("#type_modeltype").html("<option value='0'></option>");
             $("#type_model").html("<option value='0'></option>");
             $("#catalog_show_items").html("");
      
      id=$(this).attr("id");
      params={};
      params.typeAutoId=$("#"+id+" option:selected").val();       
          
        $.ajax({
                 type:"POST",
                 url:"/tocalc_findmodels.php",
                 dataType:"html", 
                 data: params,
                 cache:false,       
                 success:function(data)
                 {
                    
                    // alert(data); 
                     $("#type_model").html("");                     
                     $("#type_model").html("<option value='0'>Выберите модель</option>"+data); 
                     if (typeof(MODEL_ID_LOAD_VALUE)!='undefined')
                     {
                        $("#type_model option[value='"+MODEL_ID_LOAD_VALUE+"']").attr("selected","selected");
                        $("#type_model").change(); 
                     }         
                     
                     
                     
                 },        
                 error: function(XMLHttpRequest, textStatus, errorThrown)
                   {
                       $("#PictureSlide").html("");
                       $("#PictureSlide").html(textStatus);  
                       
                   }   
        
        });
         
      
      
      
      
      
      
      
  }); 
    
  $("#type_model").change(function()
  {
      
    id=$(this).attr("id");
      params={};
      params.ModelId=$("#"+id+" option:selected").val();   
      
       $.ajax({
                 type:"POST",
                 url:"/catalog_findcarmodelstypes.php",
                 dataType:"html", 
                 data: params,
                 cache:false,       
                 success:function(data)
                 {
                    $("#type_modeltype").html("");                     
                    $("#type_modeltype").html("<option value='0'>Выберите модель</option>"+data); 
                    
                     if (typeof(MODEL_TYPE_ID_LOAD_VALUE)!='undefined')
                     {
                        $("#type_modeltype option[value='"+MODEL_TYPE_ID_LOAD_VALUE+"']").attr("selected","selected");
                        $("#type_modeltype").change(); 
                     }           
                     
                 },        
                 error: function(XMLHttpRequest, textStatus, errorThrown)
                   {
                       $("#type_modeltype").html("");
                       $("#type_modeltype").html(textStatus);  
                       
                   }   
                 
                 
       })
      
      
      
      
      
      
      
      
      
      
  });
  
    $("select").change(function(){
             $("#catalog_show_items").html(""); 
               //alert("success")
            brandValue=$("#type_auto").val();   
            modelValue= $("#type_model").val();    
            modelTypeValue= $("#type_modeltype").val();
            language=$("#type_auto").attr("lang");  
            if (brandValue=='0' || modelValue=='0' || modelTypeValue=='0')
            {
                return false;
            } 
             params={};
             params.BrandID=brandValue;
             params.ModelID=modelValue ;
             params.modelTypeID=modelTypeValue; 
             params.LNG=language;
            $.ajax({
                         type:"POST",
                         url:"/catalog_showlist.php",
                         dataType:"html", 
                         data: params,
                         cache:false,       
                         success:function(data)
                         {
                            $("#catalog_list").html("");
                            $("#catalog_list").html(data);
                             
                         },        
                         error: function(XMLHttpRequest, textStatus, errorThrown)
                           {
                               $("#full_calc_result").html("");
                               $("#full_calc_result").html(textStatus);  
                               
                           }   
                
                });
        
  
      }) ;
  
  
   $(".catalog_group_type").live("click",function(){
       
      brandID=$(this).attr("brand_id");
      modelID=$(this).attr("model_id");
      modelTypeID=$(this).attr("model_type_id");
      groupTypeID=$(this).attr("group_type_id");
      language=$("#type_auto").attr("lang");
      
       params={};
       params.BrandID=brandID;
       params.ModelID=modelID;
       params.modelTypeID=modelTypeID;
       params.groupTypeID=groupTypeID;
       params.LNG=language; 
       
         $("#catalog_show_items").html("");
       $("#catalog_show_items").html("<img src='/images/load_icon.gif' style='margin-left:50%; border:none;background:none;'/>");
       
       $.ajax({
                         type:"POST",
                         url:"/catalog_showitems.php",
                         dataType:"html", 
                         data: params,
                         cache:false,       
                         success:function(data)
                         {
                           // alert(data); 
                            $("#catalog_show_items").html("");
                            $("#catalog_show_items").html(data);
                             
                         },        
                         error: function(XMLHttpRequest, textStatus, errorThrown)
                           {
                               $("#catalog_show_items").html("");
                               $("#catalog_show_items").html(textStatus);  
                               
                           }   
                
                })
          
       
       
       
       
   }) ;
   $(".catalog_group_a").live("click",function(){
      brandID=$(this).attr("brand_id");
      modelID=$(this).attr("model_id");
      modelTypeID=$(this).attr("model_type_id");
      groupID=$(this).attr("group_id");
     
      
       params={};
       params.BrandID=brandID;
       params.ModelID=modelID;
       params.modelTypeID=modelTypeID;
       params.groupID=groupID; 
       
       $("#catalog_show_items").html("");
       $("#catalog_show_items").html("<img src='/images/load_icon.gif' style='margin-left:50%; border:none;background:none;'/>");
       
       $.ajax({
                         type:"POST",
                         url:"/catalog_showitems.php",
                         dataType:"html", 
                         data: params,
                         cache:false,       
                         success:function(data)
                         {
                           // alert(data); 
                            $("#catalog_show_items").html("");
                            $("#catalog_show_items").html(data);
                             
                         },        
                         error: function(XMLHttpRequest, textStatus, errorThrown)
                           {
                               $("#catalog_show_items").html("");
                               $("#catalog_show_items").html(textStatus);  
                               
                           }   
                
                })
          
        
       
       
   });
  
    /*$("#catalog_show_items#").click(function(e){
      
     
      $(this).css("position","absolute"); 
      div=$(this); 
      div.css('left',e.pageX + "px") ;
      div.css("top",e.pageY + "px") ;
      
      $(document).bind('mousemove',function(e) {
               div.css("left",e.pageX + "px") ;
               div.css("top",e.pageY + "px") ; 
              
             })  
       
        
    }); */
    
  /*  $(".add_to_basket_from_catalog").live('click',function(){
        
     price=$(this).attr('price'); 
     currency=$(this).attr('currency'); 
     itemcode=$(this).attr('itemcode'); 
     brandcode=$(this).attr('brandcode'); 
     quantity=$(this).attr('quantity'); 
     caption=$(this).attr('caption'); 
     isservice=$(this).attr('isservice'); 
     isitem=$(this).attr('isitem'); 
       
     params={};   
     params.PRICE=price; 
     params.CURRENCY=currency;
     params.ITEMCODE=itemcode; 
     params.BRANDCODE=brandcode;
     params.QUANTITY=quantity;
     params.CAPTION=caption;
     params.isService='0'; 
     params.isItem='1'; 
     params.RECIEVE_INFO="Y"; 
     
     
     $.ajax({
             type:"GET",
             url:"/add_to_basket.php",
             dataType:"html", 
             data: params,
             cache:false,       
             success:function(data)
             {
                 //alert(data);
               // $("#catalog_list").html("");
                //$("#catalog_list").html(data);
                if (Number(data)>0)
                {
                  $("#show_info_back_ground").css("display","block");
                 // $("#show_info_back_ground").css("height","5000px");  
                  $("body").css("overflow","hidden");
                  $("html").css("overflow","hidden"); 
                  
                  info_local=$("#show_info_local").html(); 
                  $("#show_info").html(info_local);
                  $("#show_info").css("display","block");    
                }
                 
             },        
             error: function(XMLHttpRequest, textStatus, errorThrown)
               {
                   $("#full_calc_result").html("");
                   $("#full_calc_result").html(textStatus);  
                   
               }   
                
                });
        
  
      }) ; */
     $(".add_to_basket_from_catalog").live('click',function(event)
     {
        params={};
         Add_to_basket($(this),params,event);  
         
     })   
     function UpdateBasketCounter()
     {
         params={};
                      
            params.BASKET_USER_ID_COUNT="Y";
           $.ajax({
                     type:"POST",
                     url:"/basket_check.php",
                     dataType:"html", 
                     data: params,
                     cache:false,       
                     success:function(data)
                     {
                        $("#basket_count").html("<img src='images/korzina.png' width='60px' alt=''/> ("+data+")"); 
                        //alert(data); 
                     },        
                     error: function(XMLHttpRequest, textStatus, errorThrown)
                       {
                           $("#basket_count").html("");
                           $("#basket_count").html(textStatus);  
                           
                       }   

                  }) 

     }
   $(".add_to_basket_item").live('click',function(event)
   {
     params={};
     params.CHECK_AUTH="Y";
       
     Add_to_basket($(this),params,event);  
       
       
       
       
   }) 
   function Add_to_basket(element,params,event)
   {
      price=element.attr('price'); 
     currency=element.attr('currency'); 
     itemcode=element.attr('itemcode'); 
     brandcode=element.attr('brandcode'); 
     quantity_warehouse=element.attr('quantity'); 
     quantity=$("#"+itemcode+"_"+brandcode+"_quantity").val();
     caption=element.attr('caption'); 
     isservice=element.attr('isservice'); 
     isitem=element.attr('isitem'); 
     /*if (element.is('[uid]'))
     {
         
       alert("uid");
       uid=element.attr('uid');
       if (Number(uid)==0 )
       {
        document.location.href="/SimpleAuth/index.php?BACKURLSA=/basket_check.php?BASKET_SHOW=Y";    // get не работает корректно.
         
       }
     }*/
       
    // params={};   
     params.PRICE=price; 
     params.CURRENCY=currency;
     params.ITEMCODE=itemcode; 
     params.BRANDCODE=brandcode;
     params.QUANTITY=quantity;
     params.CAPTION=caption;
     params.isService='0'; 
     params.isItem='1'; 
     params.RECIEVE_INFO="Y"; 
     
     
     $.ajax({
             type:"GET",
             url:"/add_to_basket.php",
             dataType:"html", 
             data: params,
             cache:false,       
             success:function(data)
             {
                 //alert(data);
               // $("#catalog_list").html("");
                //$("#catalog_list").html(data);
                if (Number(data)>0)
                {
                  $("#show_info_back_ground").css("display","block");
                  $("#show_info_back_ground").css("height",""+$("body").height()+"") 
                  $("body").css("overflow","hidden");
                  //$("body").scrollTop(0);
                  $("html").css("overflow","hidden"); 
                  
                  info_local=$("#show_info_local").html(); 
                  $("#show_info").html(info_local);
                  $("#show_info").css("display","block"); 
                 // alert(event.pageY);
                  $("#show_info").css("top",""+event.pageY+"px");   
                } else
                {
                    if (params.CHECK_AUTH=="Y" && Number(data)==0)
                    {
                         
                       document.location.href="/SimpleAuth/index.php?BACKURLSA="+window.location.pathname;    // get не работает корректно. 
                    }
                }
                 
             },        
             error: function(XMLHttpRequest, textStatus, errorThrown)
               {
                   $("#full_calc_result").html("");
                   $("#full_calc_result").html(textStatus);  
                   
               }   
                
                });
        
        
       
   }    
   $("#show_info_ok").live('click' ,function()
   {
       
      $("#show_info_back_ground").css("display","none"); 
      $("body").css("overflow","auto");
      $("html").css("overflow","auto"); 
        
       $("#show_info").html(""); 
       $("#show_info").css("display","none"); 
       UpdateBasketCounter() ;   
   })     
        
   $(".catalog_change_item_image").live('click',function()
   {
       
       file_select=$(this).parent().find(':input[type="file"]');
       //file_select.css("display","block");
       file_select.click();
      // dump(new FormData().getAll());
       
       
   })
   $(".catalog_change_item_image_file").live('change',function()
   {
       
       ChangeItemImageInDB($(this));  
      // ChangeItemImage($(this));
   })
   function ChangeItemImageInDB(element)
   {
       form= new FormData();
       files=element[0].files;
       
       item_code=element.attr('itemcode');
       brand_code=element.attr('brandcode');
       
       //fileD={};
       // console.log(files); 
        $.each(files, function(key, value)
        {
          form.append(key, value);
        //  console.log(key);
        // console.log(value);
        
        }); 
         //dump (form);
        form.append("LOAD_IMAGE", 'Y');
        form.append ("ITEM_CODE",item_code);
        form.append ("BRAND_CODE",brand_code);
         image_ID=item_code+"_"+brand_code+"_img";  
         $.ajax({
             url: '/catalog_item_property_set.php',
             type: 'POST',
             data: form,
             cache: false,
            // dataType: 'json',
             processData: false, // Don't process the files
             contentType: false, // Set content type to false as jQuery will tell the server its a query string request
              success: function(data, textStatus, jqXHR)
              {
                   //$("#show_items_list").html(data);                    
                     $('#'+image_ID).attr("src","data:image/png;base64,"+data);
              }
        
         
         })
       
   }
   function ChangeItemImage(element)   //do not used
   {
      item_code=element.attr('itemcode');
      brand_code=element.attr('brandcode'); 
      
      image_ID=item_code+"_"+brand_code+"_img";
      params={};
      params.RECIEVE_IMAGE_BASE64="Y";
      params.ITEM_CODE=item_code;
      params.BRAND_CODE=brand_code;
      
      $.ajax({
                         type:"POST",
                         url: '/catalog_item_property_set.php',
                         dataType:"html", 
                         data: params,
                         cache:false,       
                         success:function(data)
                          {
                             //alert(data); 
                            // $('#'+image_ID).attr("src","");
                             $('#'+image_ID).attr("src","data:image/png;base64,"+data);
                          },
                          error: function(XMLHttpRequest, textStatus, errorThrown)
                           {
                               $("#catalog_show_items").html("");
                               $("#catalog_show_items").html(textStatus);  
                               
                           }   
                         
      })           
       
   }
   
   $(".img_part img").live('mouseover',function(event){
       
        $("body").append("<div id='img_zoom' style=''></div>");
        $("#img_zoom").html($(this).parent().html());
        $("#img_zoom").css('position','absolute');
        $("#img_zoom").css('left','50%');
        $("#img_zoom").css('top','50%');
        $("#img_zoom").css('z-index','100');
        $("#img_zoom").css('width','30%');
        $("#img_zoom").css('height','60%');
        $("#img_zoom img").css('width','100%');
        $("#img_zoom img").css('height','100%');  
       
   })
   $(".img_part img").live('mouseout',function(event){
       
        $("#img_zoom").remove();
       
       
   })
   $(".img_part img").live('mousemove',function(event){
       
       $("#img_zoom"). css("top",""+(event.pageY-60)+"px");
        $("#img_zoom"). css("left",""+(event.pageX+100)+"px"); 
         
       
       
   }) 
   
})
