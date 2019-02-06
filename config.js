var configObject={}

 configObject.Action_td={
                        bClasses:{"0-7":"text-center" }
                       };
configObject.Status_td={
                        bClasses:{"0-7":"text-center" }
                       }
                          
                          
  window.configObject=configObject;                      

  window.componentModulesPathes=
  {
	 Start_page:["/","start_page.js",""],
     Basket:["/basket","./basket_items.js",""],
     Order_list:["/order_list","order_list.js",""],	 
	 Balance:["/balance","balance.js",""],
	 Search_table_v2:[new RegExp("(\/search)(.*)"),"search_content_v2.js","/:id?"],
	 Contacts:["/contacts","contacts.js",""],
	 Basket:["/basket","basket_items.js",""],
	 Catalogs_auto:["/catalogs_auto","catalogs_auto.js",""],
	 Order_detail:[new RegExp("(\/order_detail)(.*)"),"order_detail.js","/:id"],
  }