<?php 

/**
* ???????????????? ??? ?????, ??????????? ? ?????????????? (?????) ?????????? ????????? ????????
*
*/

class CStats
{
   public function __construct(  )
     {
     }

   public function StoreLine( $brandCode, $itemCode )
     {
     	global $DB, $USER;

     	$userID_1C = '';
     	if($USER->IsAuthorized())
     	  $userID_1C = GetUserID_1CByID( $USER->GetID()  );


        $sql =  "INSERT INTO `b_autodoc_stats` ( `DateTime` , `BrandCode` , `ItemCode` , `ClientCode1C` ) ";
        $sql .= " VALUES ( Now(),'".$brandCode."', '".$itemCode."', '".$userID_1C."')";

        $DB->Query( $sql );


     }

         //  ??????? ??????, ????????????? ????????? ???

   public function RamoveDateRangeLines( $startDate, $endDate )
     {
     	global $DB;

     	$sql = "DELETE FROM `b_autodoc_stats` ";
     	$sql .= " WHERE `DateTime` >= $startDate ";
     	$sql .= " AND `DateTime` <= $endDate ";
        $DB->Query( $sql );
     }

        //  ?????????? ?????? ? ??????? ??? ??????????? ?? ??????
   public function GetLines( $startDate, $endDate )
     {
        global $DB;
        $sql = " SELECT BrandCode, ItemCode, count( BrandCode ) AS Quantity FROM b_autodoc_stats ";
        $sql .= " GROUP BY BrandCode, ItemCode ORDER BY Quantity DESC ";
        $sql .= " WHERE `DateTime` >= $startDate ";
     	$sql .= " AND `DateTime` <= $endDate ";

     	$res = $DB->Query( $sql );

     	$arRes = Array();

     	while( $ar = $res->Fetch() )
     	  {
     	  	$arRes[] = $ar;
     	  }

     	return $arRes;
     }

        //  ?????????? ?????? ? ??????? ??? ??????????? ?? ?????? ??? ??????????? ?????
   public function GetLinesByUser( $startDate, $endDate, $clientCode1C )
     {
        global $DB;
        $sql = " SELECT BrandCode, ItemCode, count( BrandCode ) AS Quantity FROM b_autodoc_stats ";
        $sql .= " GROUP BY BrandCode, ItemCode ORDER BY Quantity DESC ";
        $sql .= " WHERE `DateTime` >= $startDate ";
     	$sql .= " AND `DateTime` <= $endDate ";
     	$sql .= " AND `ClientCode1C` = '".$clientCode1C."'";

     	$res = $DB->Query( $sql );

     	$arRes = Array();

     	while( $ar = $res->Fetch() )
     	  {
     	  	$arRes[] = $ar;
     	  }

     	return $arRes;
     }


        //  ?????????? ???? ????? ?? 1? ??? ??????? ID
   private function GetUserID_1CByID( $ID )
	{

	  global $DB;
	  $sql = "SELECT ID_1C FROM b_user WHERE ID='".$ID."'";

	  $res = $DB->Query( $sql );

	  if( $arRes = $res->Fetch() )
	    return $arRes["ID_1C"];
	  else
	    return false;
	}


              //   ?????????? ?????? ??????, ?????????? ?? ?????????? ???-???????
   public function GetRemoteXMLData( $URL, $arParams )
     {
        if( ( count($arParams) == 0 ) || ( strlen( $URL ) < 8 ) )
          return false;
        else
          {
            foreach( $arParams as $key => $value )
              {
              	$URL = str_replace( '%%'.$key.'%%', $value, $URL );
              }
            //return file_get_contents( $URL );

            $reader = new XMLReader();
            $reader->open( $URL);

            $arRes = Array();

            while ($reader->read())
              {
				   switch ($reader->nodeType) {
				       case (XMLREADER::ELEMENT):

				       if ($reader->localName == "Detail")
				       {
				       	       $node = $reader->expand();
				               $dom = new DomDocument();
				               $n = $dom->importNode($node,true);
				               $dom->appendChild($n);
				               $xp = new DomXpath($dom);

				               $res = $xp->query("/Detail/Name");
				               $arRes['CAPTION'] = trim( $res->item(0)->nodeValue );
				               $res = $xp->query("/Detail/Weight");
				               $arRes['WEIGHT'] = trim( $res->item(0)->nodeValue );

				       }
				   }
              }

              if( count($arRes) > 0  )
                return $arRes;
              else
                return false;

          }
     }
        //  ?????????, ???? ?? ????????? ? ?????? ( UTF-8 )
   public function IsCyrillic( $str )
     {
        return preg_match("/[?-??-߸?]/", $str) ? true : false;
     }

}

?>