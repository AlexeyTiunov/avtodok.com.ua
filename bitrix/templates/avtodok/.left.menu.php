<?
global $USER;
$aMenuLinks = Array(
	Array(
		"ПОИСК ПО КОДУ ДЕТАЛИ", 
		"/search.php", 
		Array(), 
		Array(), 
		"" 
	),
	Array(
		"КАТАЛОГИ ON-LINE", 
		"/ex_catalog/", 
		Array(), 
		Array(), 
		"" 
	),
	Array(
		"ВЗАИМОРАСЧЕТЫ", 
		"/autodoc/settlements.php", 
		Array(), 
		Array(), 
		"false" 
	),
	Array(
		"ЗАКАЗЫ", 
		"/personal/order/", 
		Array(), 
		Array(), 
		"false" 
	),
     
	Array(
		"КОРЗИНА", 
		($USER->IsAuthorized())? "/autodoc/mycart.php" : "/autodoc/mycartR.php", 
		Array(), 
		Array() 
		
	),  #"CSite::InGroup(array(3))"  
	Array(
		"БАЛАНС", 
		"/personal/order/balance/indexnew.php", 
		Array(), 
		Array(), 
		"false" 
	),
	Array(
		"МОЙ ПРОФИЛЬ", 
		"/personal/profile/", 
		Array(), 
		Array(), 
		"false" 
	),
	/**Array(
		"ПРОЦЕНКА", 
		"/autodoc/get_prices.php", 
		Array(), 
		Array(), 
		"CSite::InGroup(array(3))" 
	), **/
	/*Array(
		"ЗАГРУЗКА ПРАЙСОВ", 
		"/bitrix/admin/cat_exec_imp.php?ACT_FILE=csv_auotodoc&ACTION=IMPORT&PROFILE_ID=3&lang=ru", 
		Array(), 
		Array(), 
		"CSite::InGroup(array(1))" 
	),*/
	Array(
		"ИСТОРИЯ ПОЗИЦИЙ", 
		"/personal/order/history_positions", 
		Array(), 
		Array(), 
		"false" 
	),
	/*Array(
		"ПАКЕТ. ЗАГРУЗКА ПРАЙСОВ", 
		"/autodoc/loader/", 
		Array(), 
		Array(), 
		"CSite::InGroup(array(1))" 
	), */
	Array(
		"ЛИЧНЫЙ КАБИНЕТ", 
		"/personal/cabinet", 
		Array(), 
		Array(), 
		"CSite::InGroup(array(3))" 
	),
	Array(
		"ПРАЙС ПОСТАВЩИК", 
		"/personal/suppload/Loadprice.php", 
		Array(), 
		Array(), 
		"CSite::InGroup(array(1,7))" 
	)
);
?>