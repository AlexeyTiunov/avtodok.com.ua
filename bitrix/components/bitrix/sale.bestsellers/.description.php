<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

$arComponentDescription = array(
	"NAME" => GetMessage("SB_DEFAULT_TEMPLATE_NAME"),
	"DESCRIPTION" => GetMessage("SB_DEFAULT_TEMPLATE_DESCRIPTION"),
	"ICON" => "/images/sale.gif",
	"PATH" => array(
		"ID" => "content",
		"CHILD" => array(
			"ID" => "catalog",
			"NAME" => GetMessage("T_IBLOCK_DESC_CATALOG"),
			"SORT" => 350,
			"CHILD" => array(
				"ID" => "sale_bestsellers",
			),
		),
	),
);
?>