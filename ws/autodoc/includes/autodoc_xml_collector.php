<?php

/**
* Определяет ключевую функциональность для базового класса XMLItems
*  @package  auotodoc_xml_items
*/

class XMLItems
{
   public function __construct(  ){}

   public function AddItem( $arIn )
     {

       foreach( $this->nodeNames as $key => $value )
         $this->items[$this->count][$value]= ( trim( $arIn["#"][$value]["0"]["#"]) == "грн" )? "UAH" : trim( $arIn["#"][$value]["0"]["#"]);

       $this->count++;

     }

   public function GetCount()
     {       return $this->count;
     }

   public $nodeNames = Array();

   protected $items;
   protected $count;
}

/**
* Определяет модель данных и поведения класса CurrencyXMLItems
*  @package  auotodoc_xml_items
*/

class CurrencyXMLItems extends XMLItems
{

  function __construct()
    {
       $this->nodeNames[] = "Наименование";
       $this->nodeNames[] = "Курс";
       $this->nodeNames[] = "Кратность";
       $this->count = 0;
    }

  function UpdateCurrRates()
    {       for( $i=0; $i < $this->GetCount(); $i++ )
         {
            $arFields = Array(
                                "CURRENCY" => $this->items[$i]["Наименование"],
                                "RATE_CNT" => $this->items[$i]["Кратность"],
                                "RATE" => $this->items[$i]["Курс"],
                                "DATE_RATE" => date("d.m.Y")
                             );
            CCurrencyRates::Add( $arFields);

         }
    }


}


/**
* Определяет модель данных и поведения класса AddPricesXMLItems
*  @package  auotodoc_xml_items
*/

class AddPricesXMLItems extends XMLItems
{

  function __construct()
    {
       $this->nodeNames[] = "Контрагент";
       $this->nodeNames[] = "Регион";
       $this->nodeNames[] = "Процент";
       $this->count = 0;
    }

  function UpdateUserCoeffs()
    {
       global $DB;
       for( $i=0; $i < $this->GetCount(); $i++ )
         {

             if( is_numeric($this->items[$i]["Процент"]) && is_numeric( $this->items[$i]["Регион"] ) )
               {               	  $k = $this->items[$i]["Процент"];

               	     //  Ищем, есть ли в базе

               	   $sql = "SELECT COUNT(*) as cnt FROM b_autodoc_clients_k " ;
               	   $sql .= " WHERE ID_1C='".trim( $this->items[$i]["Контрагент"] )."'";
               	   $sql .= " AND RegionCode='".trim( $this->items[$i]["Регион"] )."'";

               	   $tmpRes = $DB->Query($sql);
               	   $arRes = $tmpRes->Fetch();
               	   if( $arRes["cnt"] > 0 )    // есть в базе
               	     {               	     	$sql = "UPDATE b_autodoc_clients_k " ;
               	     	$sql .= " SET K='".$k."', Updated=Now()";
	               	    $sql .= " WHERE ID_1C='".trim( $this->items[$i]["Контрагент"] )."'";
	               	    $sql .= " AND RegionCode='".trim( $this->items[$i]["Регион"] )."'";
               	     }
               	   else   //   нет в базе
               	     {               	       $sql = "INSERT INTO `b_autodoc_clients_k` ( `ID_1C`, `RegionCode`, `K`,`Updated`)";
               	       $sql .= " VALUES( '".trim( $this->items[$i]["Контрагент"] )."', ".$this->items[$i]["Регион"]." , ".$k.", Now())";
               	     }

                   $tmpRes = $DB->Query($sql);
               }
             else
               {                  echo "failed/n DB Insertion for step: ".$i;
               }


         }

    }


}

/**
* Определяет модель данных и поведения класса CurrencyXMLItems
*  @package  auotodoc_xml_items
*/

class GoodsXMLItems extends XMLItems
{

  function __construct()
    {
       $this->nodeNames[] = "Артикул";
       $this->nodeNames[] = "Наименование";
       $this->nodeNames[] = "Бренд";
       $this->count = 0;
    }

  function Update()
    {
       for( $i=0; $i < $this->GetCount(); $i++ )
         {

             echo "<br>Товар ".$i." ".$this->items[$i]["Наименование"]." ".$this->items[$i]["Артикул"]." ".$this->items[$i]["Бренд"];



         }

    }


}

/**
* Определяет модель данных и поведения класса PaymentsXMLItems
*  @package  auotodoc_xml_items
*/

class PaymentsXMLItems extends XMLItems
{

  function __construct()
    {
       $this->nodeNames[] = "ТипДокумента";
       $this->nodeNames[] = "Дата";
       $this->nodeNames[] = "Номер";
       $this->nodeNames[] = "Контрагент";
       $this->nodeNames[] = "ДоговорКод";
       $this->nodeNames[] = "Валюта";
       $this->nodeNames[] = "Сумма";

       $this->count = 0;
    }

  function AddPayments()
    {
       $limit = $this->GetCount();
       global $USER;

       for( $i=0; $i < $limit ; $i++ )
         {

            $arSelect = Array("ID", "NAME");


     	    $date = $this->items[$i]["Дата"];

              	         //  Преобразуем формат даты  "2010-03-31" ->  "31.03.2010"
            $arrDate = explode('-',$date);
            $date = $arrDate[2].".".$arrDate[1].".".$arrDate[0];



            $arFilter = Array(
                "IBLOCK_ID" => CAD_IB_PAYMENTS_NUM,
                "ACTIVE"=>"Y",
                "PROPERTY_Code" => $this->items[$i]["Номер"],
                "PROPERTY_DocumentDate" => $this->items[$i]["Дата"]." 00:00:00",
                "PROPERTY_DocumentType" => $this->items[$i]["ТипДокумента"],
                "PROPERTY_Summ" => $this->items[$i]["Сумма"]

              );

            $res = CIBlockElement::GetList(Array(), $arFilter, false, Array(), $arSelect);

            if( $ob = $res->GetNextElement())
              {
                 $arFields = $ob->GetFields();
                 echo "<br>Найден ".$arFields["ID"]." ".$arFields["NAME"];
              }
            else
              {              	//echo "<br>Не найден  "; XML_ID

                $number = $this->items[$i]["Номер"];
                $clientCode = $this->items[$i]["Контрагент"];


              	if( IsUserPresent( $clientCode ) )
              	  {
              	     $el = new CIBlockElement;
              	     $PROP = array();
              	     $PROP["Code"] = $number;
              	     $PROP["ClientCode"] = $clientCode;
              	     $PROP["DocumentType"] = $this->items[$i]["ТипДокумента"];
              	     $PROP["DocumentDate"] = $date;
                     $PROP["AgreementCode"] = $this->items[$i]["ДоговорКод"];
                     $PROP["CurrencyCode"] = $this->items[$i]["Валюта"];
                     $PROP["Summ"] = $this->items[$i]["Сумма"];

              	     $arLoadProductArray = Array(  "MODIFIED_BY"    => $USER->GetID(), // элемент изменен текущим пользователем
              	     "IBLOCK_SECTION_ID" => false,          // элемент лежит в корне раздела
              	     "IBLOCK_ID"      => CAD_IB_PAYMENTS_NUM,
              	     "PROPERTY_VALUES"=> $PROP,
              	     "NAME"           => "Платеж ".$number,
              	     "ACTIVE"         => "Y",            // активен
              	     );



              	     $PRODUCT_ID = $el->Add( $arLoadProductArray );
              	  }
              }






         }

    }


}

/**
* Определяет модель данных и поведения класса CurrencyXMLItems
*  @package  auotodoc_xml_items
*/

class ShippingXMLItems extends XMLItems
{

  function __construct()
    {
       $this->nodeNames[] = "ТипДокумента";
       $this->nodeNames[] = "Дата";
       $this->nodeNames[] = "Номер";
       $this->nodeNames[] = "Контрагент";
       $this->nodeNames[] = "ДоговорКод";
       $this->nodeNames[] = "Валюта";
       $this->nodeNames[] = "Сумма";
       $this->nodeNames[] = "Товары";


       $this->count = 0;
    }

  function AddShippings()
    {


       for( $i=0; $i < $this->GetCount(); $i++ )
         {





	       $limit = $this->GetCount();
	       global $USER;

	       for( $i=0; $i < $limit ; $i++ )
	         {

	            $arSelect = Array("ID", "NAME");


	     	    $date = $this->items[$i]["Дата"];

	              	         //  Преобразуем формат даты  "2010-03-31" ->  "31.03.2010"
	            $arrDate = explode('-',$date);
	            $date = $arrDate[2].".".$arrDate[1].".".$arrDate[0];



	            $arFilter = Array(
	                "IBLOCK_ID" => CAD_IB_SHIPPINGS_NUM,
	                "ACTIVE"=>"Y",
	                "PROPERTY_Code" => $this->items[$i]["Номер"],
	                //"PROPERTY_DocumentDate" => $date,
	                "PROPERTY_DocumentType" => $this->items[$i]["ТипДокумента"],
	                "PROPERTY_Summ" => $this->items[$i]["Сумма"]

	              );

	            $res = CIBlockElement::GetList(Array(), $arFilter, false, Array(), $arSelect);


                            //  Проверяем, есть ли эта отгрузка в базе

	            if( $ob = $res->GetNextElement())
	              {
	                 $arFields = $ob->GetFields();
	                 echo "<br>Найден ".$arFields["ID"]." ".$arFields["NAME"];
	              }
	            else
	              {
	              	echo "<br>Не найден  ";

	                $number = $this->items[$i]["Номер"];
	                $clientCode = $this->items[$i]["Контрагент"];


	              	if( IsUserPresent( $clientCode ) )
	              	  {

	              	     $el = new CIBlockElement;
	              	     $PROP = array();
	              	     $PROP["Code"] = $number;
	              	     $PROP["ClientCode"] = $clientCode;
	              	     $PROP["DocumentType"] = $this->items[$i]["ТипДокумента"];
	              	     $PROP["DocumentDate"] = $date;
	                     $PROP["AgreementCode"] = $this->items[$i]["ДоговорКод"];
	                     $PROP["CurrencyCode"] = $this->items[$i]["Валюта"];
	                     $PROP["Summ"] = $this->items[$i]["Сумма"];

	              	     $arLoadProductArray = Array(  "MODIFIED_BY"    => $USER->GetID(), // элемент изменен текущим пользователем
	              	     "IBLOCK_SECTION_ID" => false,          // элемент лежит в корне раздела
	              	     "IBLOCK_ID"      => CAD_IB_SHIPPINGS_NUM,
	              	     "PROPERTY_VALUES"=> $PROP,
	              	     "NAME"           => "Отгрузка ".$number,
	              	     "ACTIVE"         => "Y",            // активен
	              	     );



	              	     echo "<br>Added # ".$shippingID = $el->Add( $arLoadProductArray );




	              	         //    Добавляем товары из отгрузки

                           $count = 0;
  				           foreach($this->items[$i]["Товары"] as $v  )
					         {
                                 //echo "<br><pre>";
                                 //print_r($v);
                                 //echo "<br></pre>";

								 $el = new CIBlockElement;
			              	     $PROP = array();
			              	     $PROP["ShippingID"] = $shippingID;
			              	     $PROP["BCode"] = $v["#"]["Бренд"]["0"]["#"];
			              	     $PROP["ICode"] = $v["#"]["Артикул"]["0"]["#"];
			              	     $PROP["Quantity"] = $v["#"]["Количество"]["0"]["#"];
			                     $PROP["Price"] = $v["#"]["Цена"]["0"]["#"];
			                     $PROP["Summ"] = $v["#"]["Сумма"]["0"]["#"];
			                     $PROP["Caption"] = $v["#"]["Наименование"]["0"]["#"];

			              	     $arLoadProductArray = Array(  "MODIFIED_BY"    => $USER->GetID(), // элемент изменен текущим пользователем
			              	     "IBLOCK_SECTION_ID" => false,          // элемент лежит в корне раздела
			              	     "IBLOCK_ID"      => CAD_IB_SHIPPING_LINES_NUM,
			              	     "PROPERTY_VALUES"=> $PROP,
			              	     "NAME"           => "Отгрузка ".$number,
			              	     "ACTIVE"         => "Y",            // активен
			              	     );


                                 $count++;
			              	     echo "<br>Added # ".$count." : ".$LineID = $el->Add( $arLoadProductArray );






                             }

	              	  }

	              }


	         }


         }

    }

 public function AddItem( $arIn )
     {

       //echo "<br><pre>"."</pre>";

       foreach( $this->nodeNames as $key => $value )
         {
           if( !is_array( $arIn["#"][$value]["0"]["#"] ) )
             {
               $this->items[$this->count][$value]= ( trim( $arIn["#"][$value]["0"]["#"]) == "грн" )? "UAH" : trim( $arIn["#"][$value]["0"]["#"]);
             }
           else
             $this->items[$this->count][$value]= $arIn["#"][$value]["0"]["#"]["Товар"];

         }


        $this->count++;

     }

}



?>