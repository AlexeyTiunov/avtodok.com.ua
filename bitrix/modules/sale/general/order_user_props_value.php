<?
class CAllSaleOrderUserPropsValue
{
	function GetByID($ID)
	{
		global $DB;

		$ID = IntVal($ID);
		$strSql =
			"SELECT * ".
			"FROM b_sale_user_props_value ".
			"WHERE ID = ".$ID."";
		$db_res = $DB->Query($strSql, false, "File: ".__FILE__."<br>Line: ".__LINE__);

		if ($res = $db_res->Fetch())
		{
			return $res;
		}
		return False;
	}

	function Delete($ID)
	{
		global $DB;
		$ID = IntVal($ID);
		return $DB->Query("DELETE FROM b_sale_user_props_value WHERE ID = ".$ID."", true);
	}

	function DeleteAll($ID)
	{
		global $DB;
		$ID = IntVal($ID);
		return $DB->Query("DELETE FROM b_sale_user_props_value WHERE USER_PROPS_ID = ".$ID."", true);
	}
}
?>