<?
IncludeModuleLangFile(__FILE__);

if (!CModule::IncludeModule("bizproc"))
	return;

define("IBLOCK_DOCUMENT_OPERATION_VIEW_WORKFLOW", CBPCanUserOperateOperation::ViewWorkflow);
define("IBLOCK_DOCUMENT_OPERATION_START_WORKFLOW", CBPCanUserOperateOperation::StartWorkflow);
define("IBLOCK_DOCUMENT_OPERATION_CREATE_WORKFLOW", CBPCanUserOperateOperation::CreateWorkflow);
define("IBLOCK_DOCUMENT_OPERATION_WRITE_DOCUMENT", CBPCanUserOperateOperation::WriteDocument);
define("IBLOCK_DOCUMENT_OPERATION_READ_DOCUMENT", CBPCanUserOperateOperation::ReadDocument);

class CIBlockDocument
{
	/**
	* ����� �� ���� ��������� ���������� ������ �� �������� ��������� � ���������������� �����.
	*
	* @param string $documentId - ��� ���������.
	* @return string - ������ �� �������� ��������� � ���������������� �����.
	*/
	public function GetDocumentAdminPage($documentId)
	{
		$documentId = intval($documentId);
		if ($documentId <= 0)
			throw new CBPArgumentNullException("documentId");

		$db = CIBlockElement::GetList(
			array(),
			array("ID" => $documentId, "SHOW_NEW"=>"Y", "SHOW_HISTORY" => "Y"),
			false,
			false,
			array("ID", "IBLOCK_ID", "IBLOCK_TYPE_ID")
		);
		if ($ar = $db->Fetch())
			return "/bitrix/admin/iblock_element_edit.php?ID=".$documentId."&IBLOCK_ID=".$ar["IBLOCK_ID"]."&type=".$ar["IBLOCK_TYPE_ID"];

		return null;
	}

	/**
	* ����� ���������� �������� (����) ��������� � ���� �������������� ������� ���� array(���_�������� => ��������, ...). ���������� ��� ��������, ������� ���������� ����� GetDocumentFields.
	*
	* @param string $documentId - ��� ���������.
	* @return array - ������ ������� ���������.
	*/
	public function GetDocument($documentId)
	{
		$documentId = intval($documentId);
		if ($documentId <= 0)
			throw new CBPArgumentNullException("documentId");

		$arResult = null;

		$dbDocumentList = CIBlockElement::GetList(
			array(),
			array("ID" => $documentId, "SHOW_NEW"=>"Y", "SHOW_HISTORY" => "Y")
		);
		if ($objDocument = $dbDocumentList->GetNextElement())
		{
			$arDocumentFields = $objDocument->GetFields();
			$arDocumentProperties = $objDocument->GetProperties();

			foreach ($arDocumentFields as $fieldKey => $fieldValue)
			{
				if ($fieldKey == "MODIFIED_BY")
				{
					$arResult[$fieldKey] = "user_".$fieldValue;
					$arResult["MODIFIED_BY_PRINTABLE"] = $arDocumentFields["USER_NAME"];
				}
				elseif ($fieldKey == "CREATED_BY")
				{
					$arResult[$fieldKey] = "user_".$fieldValue;
					$arResult["CREATED_BY_PRINTABLE"] = $arDocumentFields["CREATED_USER_NAME"];
				}
				else
				{
					if (substr($fieldKey, 0, 1) != "~")
						$arResult[$fieldKey] = $fieldValue;
				}
			}

			foreach ($arDocumentProperties as $propertyKey => $propertyValue)
			{
				if (strlen($propertyValue["USER_TYPE"]) > 0)
				{
					if ($propertyValue["USER_TYPE"] == "UserID")
					{
						$arPropertyValue = $propertyValue["VALUE"];
						$arPropertyKey = $propertyValue["VALUE_ENUM_ID"];
						if (!is_array($arPropertyValue))
						{
							$db = CUser::GetByID($arPropertyValue);
							if ($ar = $db->GetNext())
							{
								$arResult["PROPERTY_".$propertyKey] = "user_".intval($arPropertyValue);
								$arResult["PROPERTY_".$propertyKey."_PRINTABLE"] = "(".$ar["LOGIN"].")".((strlen($ar["NAME"]) > 0 || strlen($ar["LAST_NAME"]) > 0) ? " " : "").$ar["NAME"].((strlen($ar["NAME"]) > 0 && strlen($ar["LAST_NAME"]) > 0) ? " " : "").$ar["LAST_NAME"];
							}
						}
						else
						{
							for ($i = 0, $cnt = count($arPropertyValue); $i < $cnt; $i++)
							{
								$db = CUser::GetByID($arPropertyValue[$i]);
								if ($ar = $db->GetNext())
								{
									$arResult["PROPERTY_".$propertyKey][$arPropertyKey[$i]] = "user_".intval($arPropertyValue[$i]);
									$arResult["PROPERTY_".$propertyKey."_PRINTABLE"][$arPropertyKey[$i]] = "(".$ar["LOGIN"].")".((strlen($ar["NAME"]) > 0 || strlen($ar["LAST_NAME"]) > 0) ? " " : "").$ar["NAME"].((strlen($ar["NAME"]) > 0 && strlen($ar["LAST_NAME"]) > 0) ? " " : "").$ar["LAST_NAME"];
								}
							}
						}
					}
					else
					{
						$arResult["PROPERTY_".$propertyKey] = $propertyValue["VALUE"];
					}
				}
				elseif ($propertyValue["PROPERTY_TYPE"] == "L")
				{
					$arPropertyValue = $propertyValue["VALUE"];
					$arPropertyKey = $propertyValue["VALUE_ENUM_ID"];
					if (!is_array($arPropertyValue))
					{
						$arPropertyValue = array($arPropertyValue);
						$arPropertyKey = array($arPropertyKey);
					}

					for ($i = 0, $cnt = count($arPropertyValue); $i < $cnt; $i++)
						$arResult["PROPERTY_".$propertyKey][$arPropertyKey[$i]] = $arPropertyValue[$i];
				}
				elseif ($propertyValue["PROPERTY_TYPE"] == "F")
				{
					$arPropertyValue = $propertyValue["VALUE"];
					if (!is_array($arPropertyValue))
						$arPropertyValue = array($arPropertyValue);

					foreach ($arPropertyValue as $v)
					{
						$ar = CFile::GetFileArray($v);
						if ($ar)
							$arResult["PROPERTY_".$propertyKey][intval($v)] = $ar["SRC"];
					}
				}
				else
				{
					$arResult["PROPERTY_".$propertyKey] = $propertyValue["VALUE"];
				}
			}
		}

		return $arResult;
	}

	/**
	* ����� ���������� ������ ������� (�����), ������� ����� �������� ������� ����. ����� GetDocument ���������� �������� ������� ��� ��������� ���������.
	*
	* @param string $documentType - ��� ���������.
	* @return array - ������ ������� ���� array(���_�������� => array("NAME" => ��������_��������, "TYPE" => ���_��������), ...).
	*/
	public function GetDocumentFields($documentType)
	{
		$iblockId = intval(substr($documentType, strlen("iblock_")));
		if ($iblockId <= 0)
			throw new CBPArgumentOutOfRangeException("documentType", $documentType);

		$arResult = array(
			"ID" => array(
				"Name" => GetMessage("IBD_FIELD_ID"),
				"Type" => "int",
				"Filterable" => true,
				"Editable" => false,
				"Required" => false,
			),
			"TIMESTAMP_X" => array(
				"Name" => GetMessage("IBD_FIELD_TIMESTAMP_X"),
				"Type" => "datetime",
				"Filterable" => true,
				"Editable" => true,
				"Required" => false,
			),
			"MODIFIED_BY" => array(
				"Name" => GetMessage("IBD_FIELD_MODYFIED"),
				"Type" => "user",
				"Filterable" => true,
				"Editable" => true,
				"Required" => false,
			),
			"MODIFIED_BY_PRINTABLE" => array(
				"Name" => GetMessage("IBD_FIELD_MODIFIED_BY_USER_PRINTABLE"),
				"Type" => "string",
				"Filterable" => false,
				"Editable" => false,
				"Required" => false,
			),
			"DATE_CREATE" => array(
				"Name" => GetMessage("IBD_FIELD_DATE_CREATE"),
				"Type" => "datetime",
				"Filterable" => true,
				"Editable" => true,
				"Required" => false,
			),
			"CREATED_BY" => array(
				"Name" => GetMessage("IBD_FIELD_CREATED"),
				"Type" => "user",
				"Filterable" => true,
				"Editable" => false,
				"Required" => false,
			),
			"CREATED_BY_PRINTABLE" => array(
				"Name" => GetMessage("IBD_FIELD_CREATED_BY_USER_PRINTABLE"),
				"Type" => "string",
				"Filterable" => false,
				"Editable" => false,
				"Required" => false,
			),
			"IBLOCK_ID" => array(
				"Name" => GetMessage("IBD_FIELD_IBLOCK_ID"),
				"Type" => "int",
				"Filterable" => true,
				"Editable" => true,
				"Required" => false,
			),
			"ACTIVE" => array(
				"Name" => GetMessage("IBD_FIELD_ACTIVE"),
				"Type" => "bool",
				"Filterable" => true,
				"Editable" => true,
				"Required" => false,
			),
			"BP_PUBLISHED" => array(
				"Name" => GetMessage("IBD_FIELD_BP_PUBLISHED"),
				"Type" => "bool",
				"Filterable" => false,
				"Editable" => true,
				"Required" => false,
			),
			"ACTIVE_FROM" => array(
				"Name" => GetMessage("IBD_FIELD_DATE_ACTIVE_FROM"),
				"Type" => "datetime",
				"Filterable" => true,
				"Editable" => true,
				"Required" => false,
			),
			"ACTIVE_TO" => array(
				"Name" => GetMessage("IBD_FIELD_DATE_ACTIVE_TO"),
				"Type" => "datetime",
				"Filterable" => true,
				"Editable" => true,
				"Required" => false,
			),
			"SORT" => array(
				"Name" => GetMessage("IBD_FIELD_SORT"),
				"Type" => "int",
				"Filterable" => true,
				"Editable" => true,
				"Required" => false,
			),
			"NAME" => array(
				"Name" => GetMessage("IBD_FIELD_NAME"),
				"Type" => "string",
				"Filterable" => true,
				"Editable" => true,
				"Required" => true,
			),
			"PREVIEW_PICTURE" => array(
				"Name" => GetMessage("IBD_FIELD_PREVIEW_PICTURE"),
				"Type" => "file",
				"Filterable" => false,
				"Editable" => true,
				"Required" => false,
			),
			"PREVIEW_TEXT" => array(
				"Name" => GetMessage("IBD_FIELD_PREVIEW_TEXT"),
				"Type" => "text",
				"Filterable" => false,
				"Editable" => true,
				"Required" => false,
			),
			"PREVIEW_TEXT_TYPE" => array(
				"Name" => GetMessage("IBD_FIELD_PREVIEW_TEXT_TYPE"),
				"Type" => "select",
				"Options" => array(
					"text" => GetMessage("IBD_DESC_TYPE_TEXT"),
					"html" => "Html",
				),
				"Filterable" => false,
				"Editable" => true,
				"Required" => false,
			),
			"DETAIL_PICTURE" => array(
				"Name" => GetMessage("IBD_FIELD_DETAIL_PICTURE"),
				"Type" => "file",
				"Filterable" => false,
				"Editable" => true,
				"Required" => false,
			),
			"DETAIL_TEXT" => array(
				"Name" => GetMessage("IBD_FIELD_DETAIL_TEXT"),
				"Type" => "text",
				"Filterable" => false,
				"Editable" => true,
				"Required" => false,
			),
			"DETAIL_TEXT_TYPE" => array(
				"Name" => GetMessage("IBD_FIELD_DETAIL_TEXT_TYPE"),
				"Type" => "select",
				"Options" => array(
					"text" => GetMessage("IBD_DESC_TYPE_TEXT"),
					"html" => "Html",
				),
				"Filterable" => false,
				"Editable" => true,
				"Required" => false,
			),
			"CODE" => array(
				"Name" => GetMessage("IBD_FIELD_CODE"),
				"Type" => "string",
				"Filterable" => true,
				"Editable" => true,
				"Required" => false,
			),
			"XML_ID" => array(
				"Name" => GetMessage("IBD_FIELD_XML_ID"),
				"Type" => "string",
				"Filterable" => true,
				"Editable" => true,
				"Required" => false,
			),
		);

		$arKeys = array_keys($arResult);
		foreach ($arKeys as $key)
			$arResult[$key]["Multiple"] = false;

		$dbProperties = CIBlockProperty::GetList(
			array("sort" => "asc", "name" => "asc"),
			array("IBLOCK_ID" => $iblockId)
		);
		while ($arProperty = $dbProperties->Fetch())
		{
			if (strlen(trim($arProperty["CODE"])) > 0)
				$key = "PROPERTY_".$arProperty["CODE"];
			else
				$key = "PROPERTY_".$arProperty["ID"];

			$arResult[$key] = array(
				"Name" => $arProperty["NAME"],
				"Filterable" => ($arProperty["FILTRABLE"] == "Y"),
				"Editable" => true,
				"Required" => ($arProperty["IS_REQUIRED"] == "Y"),
				"Multiple" => ($arProperty["MULTIPLE"] == "Y"),
			);

			if (strlen($arProperty["USER_TYPE"]) > 0)
			{
				if ($arProperty["USER_TYPE"] == "UserID")
				{
					$arResult[$key]["Type"] = "user";
					$arResult[$key."_PRINTABLE"] = array(
						"Name" => $arProperty["NAME"].GetMessage("IBD_FIELD_USERNAME_PROPERTY"),
						"Filterable" => false,
						"Editable" => false,
						"Required" => false,
						"Multiple" => ($arProperty["MULTIPLE"] == "Y"),
						"Type" => "string",
					);
				}
				else
				{
					$arResult[$key]["Type"] = "string";
				}
			}
			elseif ($arProperty["PROPERTY_TYPE"] == "L")
			{
				$arResult[$key]["Type"] = "select";

				$arResult[$key]["Options"] = array();
				$dbPropertyEnums = CIBlockProperty::GetPropertyEnum($arProperty["ID"]);
				while ($arPropertyEnum = $dbPropertyEnums->GetNext())
					$arResult[$key]["Options"][$arPropertyEnum["ID"]] = $arPropertyEnum["VALUE"];
			}
			elseif ($arProperty["PROPERTY_TYPE"] == "N")
			{
				$arResult[$key]["Type"] = "int";
			}
			elseif ($arProperty["PROPERTY_TYPE"] == "F")
			{
				$arResult[$key]["Type"] = "file";
			}
			elseif ($arProperty["PROPERTY_TYPE"] == "S")
			{
				$arResult[$key]["Type"] = "string";
			}
			else
			{
				$arResult[$key]["Type"] = "string";
			}
		}

		return $arResult;
	}

	/**
	* ����� ���������� ������ ������������ ���������, ���������� ��� ���������� � ���������. �� ����� ������� �������� ����������������� ������� RecoverDocumentFromHistory.
	*
	* @param string $documentId - ��� ���������.
	* @return array - ������ ���������.
	*/
	public function GetDocumentForHistory($documentId, $historyIndex)
	{
		$documentId = intval($documentId);
		if ($documentId <= 0)
			throw new CBPArgumentNullException("documentId");

		$arResult = null;

		$dbDocumentList = CIBlockElement::GetList(
			array(),
			array("ID" => $documentId, "SHOW_NEW"=>"Y", "SHOW_HISTORY" => "Y")
		);
		if ($objDocument = $dbDocumentList->GetNextElement())
		{
			$arDocumentFields = $objDocument->GetFields();
			$arDocumentProperties = $objDocument->GetProperties();

			$arResult["NAME"] = $arDocumentFields["~NAME"];

			$arResult["FIELDS"] = array();
			foreach ($arDocumentFields as $fieldKey => $fieldValue)
			{
				if ($fieldKey == "~PREVIEW_PICTURE" || $fieldKey == "~DETAIL_PICTURE")
				{
					$arResult["FIELDS"][substr($fieldKey, 1)] = CBPDocument::PrepareFileForHistory(
						array("iblock", "CIBlockDocument", $documentId),
						$fieldValue,
						$historyIndex
					);
				}
				elseif (substr($fieldKey, 0, 1) == "~")
				{
					$arResult["FIELDS"][substr($fieldKey, 1)] = $fieldValue;
				}
			}

			$arResult["PROPERTIES"] = array();
			foreach ($arDocumentProperties as $propertyKey => $propertyValue)
			{
				if (strlen($propertyValue["USER_TYPE"]) > 0)
				{
					$arResult["PROPERTIES"][$propertyKey] = array(
						"VALUE" => $propertyValue["VALUE"],
						"DESCRIPTION" => $propertyValue["DESCRIPTION"]
					);
				}
				elseif ($propertyValue["PROPERTY_TYPE"] == "L")
				{
					$arResult["PROPERTIES"][$propertyKey] = array(
						"VALUE" => $propertyValue["VALUE_ENUM_ID"],
						"DESCRIPTION" => $propertyValue["DESCRIPTION"]
					);
				}
				elseif ($propertyValue["PROPERTY_TYPE"] == "F")
				{
					$arResult["PROPERTIES"][$propertyKey] = array(
						"VALUE" => CBPDocument::PrepareFileForHistory(
							array("iblock", "CIBlockDocument", $documentId),
							$propertyValue["VALUE"],
							$historyIndex
						),
						"DESCRIPTION" => $propertyValue["DESCRIPTION"]
					);
				}
				else
				{
					$arResult["PROPERTIES"][$propertyKey] = array(
						"VALUE" => $propertyValue["VALUE"],
						"DESCRIPTION" => $propertyValue["DESCRIPTION"]
					);
				}
			}
		}

		return $arResult;
	}

	/**
	* ����� ��������������� ��������� �������� �� �������. ������ ��������� ������� RecoverDocumentFromHistory.
	*
	* @param string $documentId - ��� ���������.
	* @param array $arDocument - ������.
	*/
	public function RecoverDocumentFromHistory($documentId, $arDocument)
	{
		$documentId = intval($documentId);
		if ($documentId <= 0)
			throw new CBPArgumentNullException("documentId");

		$arFields = $arDocument["FIELDS"];
		if (strlen($arFields["PREVIEW_PICTURE"]) > 0)
			$arFields["PREVIEW_PICTURE"] = CFile::MakeFileArray($_SERVER["DOCUMENT_ROOT"].$arFields["PREVIEW_PICTURE"]);
		if (strlen($arFields["DETAIL_PICTURE"]) > 0)
			$arFields["DETAIL_PICTURE"] = CFile::MakeFileArray($_SERVER["DOCUMENT_ROOT"].$arFields["DETAIL_PICTURE"]);

		$arFields["PROPERTY_VALUES"] = array();

		$dbProperties = CIBlockProperty::GetList(
			array("sort" => "asc", "name" => "asc"),
			array("IBLOCK_ID" => $arFields["IBLOCK_ID"])
		);
		while ($arProperty = $dbProperties->Fetch())
		{
			if (strlen(trim($arProperty["CODE"])) > 0)
				$key = $arProperty["CODE"];
			else
				$key = $arProperty["ID"];

			if (!array_key_exists($key, $arDocument["PROPERTIES"]))
				continue;

			if (strlen($arProperty["USER_TYPE"]) <= 0 && $arProperty["PROPERTY_TYPE"] == "F")
			{
				if (is_array($arDocument["PROPERTIES"][$key]["VALUE"]))
				{
					foreach ($arDocument["PROPERTIES"][$key]["VALUE"] as $v)
						$arFields["PROPERTY_VALUES"][$key][] = CFile::MakeFileArray($_SERVER["DOCUMENT_ROOT"].$v);
				}
				else
				{
					$arFields["PROPERTY_VALUES"][$key] = Array(CFile::MakeFileArray($_SERVER["DOCUMENT_ROOT"].$arDocument["PROPERTIES"][$key]["VALUE"]));
				}
			}
			else
			{
				$arFields["PROPERTY_VALUES"][$key] = $arDocument["PROPERTIES"][$key]["VALUE"];
			}

			$v = array();
			if (is_array($arFields["PROPERTY_VALUES"][$key]))
			{
				for ($i = 0, $cnt = count($arFields["PROPERTY_VALUES"][$key]); $i < $cnt; $i++)
				{
					$v[] = array(
						"VALUE" => $arFields["PROPERTY_VALUES"][$key][$i],
						"DESCRIPTION" => $arDocument["PROPERTIES"][$key]["DESCRIPTION"][$i]
					);
				}
			}
			else
			{
				$v[] = array(
					"VALUE" => $arFields["PROPERTY_VALUES"][$key],
					"DESCRIPTION" => $arDocument["PROPERTIES"][$key]["DESCRIPTION"]
				);
			}
			$arFields["PROPERTY_VALUES"][$key] = $v;
		}

		$iblockElement = new CIBlockElement();
		$res = $iblockElement->Update($documentId, $arFields);
		if (intVal($arFields["WF_STATUS_ID"]) > 1 && intVal($arFields["WF_PARENT_ELEMENT_ID"]) <= 0)
			CIBlockDocument::UnpublishDocument($documentId);
		if (!$res)
			throw new Exception($iblockElement->LAST_ERROR);

		return true;
	}

	/**
	* ����� �������� �������� (����) ���������� ��������� �� ��������� ��������.
	*
	* @param string $documentId - ��� ���������.
	* @param array $arFields - ������ ����� �������� ������� ��������� � ���� array(���_�������� => ��������, ...). ���� ������� ������������� ����� �������, ������������ ������� GetDocumentFields.
	*/
	public function UpdateDocument($documentId, $arFields)
	{
		$documentId = intval($documentId);
		if ($documentId <= 0)
			throw new CBPArgumentNullException("documentId");

		CIBlockElement::WF_CleanUpHistoryCopies($documentId, 0);

		$arFieldsPropertyValues = array();

		$dbResult = CIBlockElement::GetList(array(), array("ID" => $documentId, "SHOW_NEW" => "Y", "SHOW_HISTORY" => "Y"), false, false, array("ID", "IBLOCK_ID"));
		$arResult = $dbResult->Fetch();
		if (!$arResult)
			throw new Exception("Element is not found");

		$ar = CIBlockDocument::GetDocumentFields("iblock_".$arResult["IBLOCK_ID"]);

		$arKeys = array_keys($arFields);
		foreach ($arKeys as $key)
		{
			if (array_key_exists($key, $ar) && !$ar[$key]["Multiple"] && is_array($arFields[$key]))
			{
				if (count($arFields[$key]) > 0)
				{
					$a = array_values($arFields[$key]);
					$arFields[$key] = $a[0];
				}
				else
				{
					$arFields[$key] = null;
				}
			}

			if (array_key_exists($key, $ar) && $ar[$key]["Type"] == "user")
			{
				if (is_array($arFields[$key]))
				{
					$a = array();
					foreach ($arFields[$key] as $k => $v)
					{
						$a[$k] = $v;
						if (substr($v, 0, strlen("user_")) == "user_")
							$a[$k] = substr($v, strlen("user_"));
					}
					$arFields[$key] = $a;
				}
				else
				{
					if (substr($arFields[$key], 0, strlen("user_")) == "user_")
						$arFields[$key] = substr($arFields[$key], strlen("user_"));
				}
			}

			if (substr($key, 0, strlen("PROPERTY_")) == "PROPERTY_")
			{
				$arFieldsPropertyValues[substr($key, strlen("PROPERTY_"))] = is_array($arFields[$key]) ? $arFields[$key] : array($arFields[$key]);
				unset($arFields[$key]);
			}
		}

		if (count($arFieldsPropertyValues) > 0)
			$arFields["PROPERTY_VALUES"] = $arFieldsPropertyValues;
		$iblockElement = new CIBlockElement();
		if (count($arFields["PROPERTY_VALUES"]) > 0)
			$iblockElement->SetPropertyValuesEx($documentId, $arResult["IBLOCK_ID"], $arFields["PROPERTY_VALUES"]);

		UnSet($arFields["PROPERTY_VALUES"]);
		$res = $iblockElement->Update($documentId, $arFields);
		if (!$res)
			throw new Exception($iblockElement->LAST_ERROR);
	}

	/**
	* ����� ��������� ��������� �������� ��� ���������� �������� ������. �������������� �������� ����� ���������� ������ ��������� ������� �������.
	*
	* @param string $documentId - ��� ���������
	* @param string $workflowId - ��� �������� ������
	* @return bool - ���� ������� ������������� ��������, �� ������������ true, ����� - false.
	*/
	public function LockDocument($documentId, $workflowId)
	{
		global $DB;
		$strSql = "
			SELECT * FROM b_iblock_element_lock
			WHERE IBLOCK_ELEMENT_ID = ".intval($documentId)."
			AND LOCKED_BY = '".$DB->ForSQL($workflowId, 32)."'
		";
		$z = $DB->Query($strSql, false, "FILE: ".__FILE__."<br>LINE: ".__LINE__);
		if($z->Fetch())
		{
			//Success lock because documentId already locked by workflowId
			return true;
		}
		else
		{
			$strSql = "
				INSERT INTO b_iblock_element_lock (IBLOCK_ELEMENT_ID, DATE_LOCK, LOCKED_BY)
				SELECT E.ID, ".$DB->GetNowFunction().", '".$DB->ForSQL($workflowId, 32)."'
				FROM b_iblock_element E
				LEFT JOIN b_iblock_element_lock EL on EL.IBLOCK_ELEMENT_ID = E.ID
				WHERE ID = ".intval($documentId)."
				AND EL.IBLOCK_ELEMENT_ID IS NULL
			";
			$z = $DB->Query($strSql, false, "FILE: ".__FILE__."<br>LINE: ".__LINE__);
			return $z->AffectedRowsCount() > 0;
		}
	}

	/**
	* ����� ������������ ��������� ��������. ��� ������������� ���������� ����������� ������� ���� "��������_OnUnlockDocument", ������� �������� ���������� ���������� ��� ���������.
	*
	* @param string $documentId - ��� ���������
	* @param string $workflowId - ��� �������� ������
	* @return bool - ���� ������� �������������� ��������, �� ������������ true, ����� - false.
	*/
	public function UnlockDocument($documentId, $workflowId)
	{
		global $DB;

		$strSql = "
			SELECT * FROM b_iblock_element_lock
			WHERE IBLOCK_ELEMENT_ID = ".intval($documentId)."
		";
		$z = $DB->Query($strSql, false, "FILE: ".__FILE__."<br>LINE: ".__LINE__);
		if($z->Fetch())
		{
			$strSql = "
				DELETE FROM b_iblock_element_lock
				WHERE IBLOCK_ELEMENT_ID = ".intval($documentId)."
				AND (LOCKED_BY = '".$DB->ForSQL($workflowId, 32)."' OR '".$DB->ForSQL($workflowId, 32)."' = '')
			";
			$z = $DB->Query($strSql, false, "FILE: ".__FILE__."<br>LINE: ".__LINE__);
			$result = $z->AffectedRowsCount();
		}
		else
		{//Success unlock when there is no locks at all
			$result = 1;
		}

		if ($result > 0)
		{
			$db_events = GetModuleEvents("iblock", "CIBlockDocument_OnUnlockDocument");
			while ($arEvent = $db_events->Fetch())
				ExecuteModuleEventEx($arEvent, array(array("iblock", "CIBlockDocument", $documentId)));
		}

		return $result > 0;
	}

	/**
	* ����� ���������, ������������ �� ��������� �������� ��� ���������� �������� ������. �.�. ���� ��� ������� �������� ������ �������� �� �������� ��� ������ ��-�� ����, ��� �� ������������ ������ ������� �������, �� ����� ������ ������� true, ����� - false.
	*
	* @param string $documentId - ��� ���������
	* @param string $workflowId - ��� �������� ������
	* @return bool
	*/
	public function IsDocumentLocked($documentId, $workflowId)
	{
		global $DB;
		$strSql = "
			SELECT * FROM b_iblock_element_lock
			WHERE IBLOCK_ELEMENT_ID = ".intval($documentId)."
			AND LOCKED_BY <> '".$DB->ForSQL($workflowId, 32)."'
		";
		$z = $DB->Query($strSql, false, "FILE: ".__FILE__."<br>LINE: ".__LINE__);
		if($z->Fetch())
			return true;
		else
			return false;
	}

	/**
	* ����� ��������� ����� �� ���������� �������� ��� �������� ����������. ����������� �������� 0 - �������� ������ �������� ������, 1 - ������ �������� ������, 2 - ����� �������� ��������, 3 - ����� �������� ��������.
	*
	* @param int $operation - ��������.
	* @param int $userId - ��� ������������, ��� �������� ����������� ����� �� ���������� ��������.
	* @param string $documentId - ��� ���������, � �������� ����������� ��������.
	* @param array $arParameters - ������������� ������ ��������������� ����������. ������������ ��� ����, ����� �� ������������ ������ �� ����������� ��������, ������� ��� �������� �� ������ ������ ������. ������������ �������� ����� ������� DocumentStates - ������ ��������� ������� ������� ������� ���������, WorkflowId - ��� �������� ������ (���� ��������� ��������� �������� �� ����� ������� ������). ������ ����� ���� �������� ������� ������������� �������.
	* @return bool
	*/
	function CanUserOperateDocument($operation, $userId, $documentId, $arParameters = array())
	{
		$documentId = trim($documentId);
		if (strlen($documentId) <= 0)
			return false;

		// ���� ��� ���� �� �������, � ��� �����, �� ������ ��� ��������� � ������ ��������
		if (!array_key_exists("IBlockId", $arParameters)
			&& (!array_key_exists("IBlockPermission", $arParameters) || !array_key_exists("DocumentStates", $arParameters))
			||
			!array_key_exists("CreatedBy", $arParameters) && !array_key_exists("AllUserGroups", $arParameters))
		{
			$dbElementList = CIBlockElement::GetList(
				array(),
				array("ID" => $documentId, "SHOW_NEW"=>"Y", "SHOW_HISTORY" => "Y"),
				false,
				false,
				array("ID", "IBLOCK_ID", "CREATED_BY")
			);
			$arElement = $dbElementList->Fetch();

			if (!$arElement)
				return false;

			$arParameters["IBlockId"] = $arElement["IBLOCK_ID"];
			$arParameters["CreatedBy"] = $arElement["CREATED_BY"];
		}

		// ���� ��� ���� �� �������, �� ������ ����������� �����
		if (!array_key_exists("IBlockPermission", $arParameters))
		{
			//lists check
			if(CModule::IncludeModule('lists'))
				$arParameters["IBlockPermission"] = CLists::GetIBlockPermission($arParameters["IBlockId"], $userId);
			else
				$arParameters["IBlockPermission"] = CIBlock::GetPermission($arParameters["IBlockId"], $userId);
		}

		if ($arParameters["IBlockPermission"] <= "R")
			return false;
		elseif ($arParameters["IBlockPermission"] >= "W")
			return true;

		// ���� �� ���, �� ����������� ����� ����� U

		// ���� ��� ���� �� �������, �� ������ ������ ������������
		$userId = intval($userId);
		if (!array_key_exists("AllUserGroups", $arParameters))
		{
			if (!array_key_exists("UserGroups", $arParameters))
				$arParameters["UserGroups"] = CUser::GetUserGroup($userId);

			$arParameters["AllUserGroups"] = $arParameters["UserGroups"];
			if ($userId == $arParameters["CreatedBy"])
				$arParameters["AllUserGroups"][] = "Author";
		}

		// ���� ��� ���� �� �������, �� ������ ������� ������� ���������
		if (!array_key_exists("DocumentStates", $arParameters))
		{
			$arParameters["DocumentStates"] = CBPDocument::GetDocumentStates(
				array("iblock", "CIBlockDocument", "iblock_".$arParameters["IBlockId"]),
				array("iblock", "CIBlockDocument", $documentId)
			);
		}

		// ���� ����� ��������� ������ ��� ������ �������� ������
		if (array_key_exists("WorkflowId", $arParameters))
		{
			if (array_key_exists($arParameters["WorkflowId"], $arParameters["DocumentStates"]))
				$arParameters["DocumentStates"] = array($arParameters["WorkflowId"] => $arParameters["DocumentStates"][$arParameters["WorkflowId"]]);
			else
				return false;
		}

		$arAllowableOperations = CBPDocument::GetAllowableOperations(
			$userId,
			$arParameters["AllUserGroups"],
			$arParameters["DocumentStates"]
		);

		// $arAllowableOperations == null - ����� �� �������� ���������
		// $arAllowableOperations == array() - � �������� ��� ���������� ��������
		// $arAllowableOperations == array("read", ...) - ���������� ��������
		if (!is_array($arAllowableOperations))
			return false;

		$r = false;
		switch ($operation)
		{
			case IBLOCK_DOCUMENT_OPERATION_VIEW_WORKFLOW:
				$r = in_array("read", $arAllowableOperations);
				break;
			case IBLOCK_DOCUMENT_OPERATION_START_WORKFLOW:
				$r = in_array("write", $arAllowableOperations);
				break;
			case IBLOCK_DOCUMENT_OPERATION_CREATE_WORKFLOW:
				$r = false;
				break;
			case IBLOCK_DOCUMENT_OPERATION_WRITE_DOCUMENT:
				$r = in_array("write", $arAllowableOperations);
				break;
			case IBLOCK_DOCUMENT_OPERATION_READ_DOCUMENT:
				$r = in_array("read", $arAllowableOperations) || in_array("write", $arAllowableOperations);
				break;
			default:
				$r = false;
		}

		return $r;
	}

	/**
	* ����� ��������� ����� �� ���������� �������� ��� ����������� ��������� ����. ����������� �������� 4 - ����� �������� ������� ������� ������� ��� ������� ���� ���������.
	*
	* @param int $operation - ��������.
	* @param int $userId - ��� ������������, ��� �������� ����������� ����� �� ���������� ��������.
	* @param string $documentId - ��� ���� ���������, � �������� ����������� ��������.
	* @param array $arParameters - ������������� ������ ��������������� ����������. ������������ ��� ����, ����� �� ������������ ������ �� ����������� ��������, ������� ��� �������� �� ������ ������ ������. ������������ �������� ����� ������� DocumentStates - ������ ��������� ������� ������� ������� ���������, WorkflowId - ��� �������� ������ (���� ��������� ��������� �������� �� ����� ������� ������). ������ ����� ���� �������� ������� ������������� �������.
	* @return bool
	*/
	function CanUserOperateDocumentType($operation, $userId, $documentType, $arParameters = array())
	{
		$documentType = trim($documentType);
		if (strlen($documentType) <= 0)
			return false;

		$arParameters["IBlockId"] = intval(substr($documentType, strlen("iblock_")));

		// ���� ��� ���� �� �������, �� ������ ����������� �����
		if (!array_key_exists("IBlockPermission", $arParameters))
		{
			//lists check
			if(CModule::IncludeModule('lists'))
				$arParameters["IBlockPermission"] = CLists::GetIBlockPermission($arParameters["IBlockId"], $userId);
			else
				$arParameters["IBlockPermission"] = CIBlock::GetPermission($arParameters["IBlockId"], $userId);
		}

		if ($arParameters["IBlockPermission"] <= "R")
			return false;
		elseif ($arParameters["IBlockPermission"] >= "W")
			return true;

		// ���� �� ���, �� ����������� ����� ����� U

		// ���� ��� ���� �� �������, �� ������ ������ ������������
		$userId = intval($userId);
		if (!array_key_exists("AllUserGroups", $arParameters))
		{
			if (!array_key_exists("UserGroups", $arParameters))
				$arParameters["UserGroups"] = CUser::GetUserGroup($userId);

			$arParameters["AllUserGroups"] = $arParameters["UserGroups"];
			$arParameters["AllUserGroups"][] = "Author";
		}

		// ���� ��� ���� �� �������, �� ������ ������� ������� ���������
		if (!array_key_exists("DocumentStates", $arParameters))
		{
			$arParameters["DocumentStates"] = CBPDocument::GetDocumentStates(
				array("iblock", "CIBlockDocument", "iblock_".$arParameters["IBlockId"]),
				null
			);
		}

		// ���� ����� ��������� ������ ��� ������ �������� ������
		if (array_key_exists("WorkflowId", $arParameters))
		{
			if (array_key_exists($arParameters["WorkflowId"], $arParameters["DocumentStates"]))
				$arParameters["DocumentStates"] = array($arParameters["WorkflowId"] => $arParameters["DocumentStates"][$arParameters["WorkflowId"]]);
			else
				return false;
		}

		$arAllowableOperations = CBPDocument::GetAllowableOperations(
			$userId,
			$arParameters["AllUserGroups"],
			$arParameters["DocumentStates"]
		);

		// $arAllowableOperations == null - ����� �� �������� ���������
		// $arAllowableOperations == array() - � �������� ��� ���������� ��������
		// $arAllowableOperations == array("read", ...) - ���������� ��������
		if (!is_array($arAllowableOperations))
			return false;

		$r = false;
		switch ($operation)
		{
			case IBLOCK_DOCUMENT_OPERATION_VIEW_WORKFLOW:
				$r = false;
				break;
			case IBLOCK_DOCUMENT_OPERATION_START_WORKFLOW:
				$r = false;
				break;
			case IBLOCK_DOCUMENT_OPERATION_CREATE_WORKFLOW:
				$r = in_array("write", $arAllowableOperations);
				break;
			case IBLOCK_DOCUMENT_OPERATION_WRITE_DOCUMENT:
				$r = in_array("write", $arAllowableOperations);
				break;
			case IBLOCK_DOCUMENT_OPERATION_READ_DOCUMENT:
				$r = false;
				break;
			default:
				$r = false;
		}

		return $r;
	}

	/**
	* ����� ������� ����� �������� � ���������� ���������� (������).
	*
	* @param array $arFields - ������ �������� ������� ��������� � ���� array(���_�������� => ��������, ...). ���� ������� ������������� ����� �������, ������������ ������� GetDocumentFields.
	* @return int - ��� ���������� ���������.
	*/
	public function CreateDocument($parentDocumentId, $arFields)
	{
		if (!array_key_exists("IBLOCK_ID", $arFields) || intval($arFields["IBLOCK_ID"]) <= 0)
			throw new Exception("IBlock ID is not found");

		$arFieldsPropertyValues = array();

		$ar = CIBlockDocument::GetDocumentFields("iblock_".$arFields["IBLOCK_ID"]);

		$arKeys = array_keys($arFields);
		foreach ($arKeys as $key)
		{
			if (array_key_exists($key, $ar) && !$ar[$key]["Multiple"] && is_array($arFields[$key]))
			{
				if (count($arFields[$key]) > 0)
				{
					$a = array_values($arFields[$key]);
					$arFields[$key] = $a[0];
				}
				else
				{
					$arFields[$key] = null;
				}
			}

			if (array_key_exists($key, $ar) && $ar[$key]["Type"] == "user")
			{
				if (is_array($arFields[$key]))
				{
					$a = array();
					foreach ($arFields[$key] as $k => $v)
					{
						$a[$k] = $v;
						if (substr($v, 0, strlen("user_")) == "user_")
							$a[$k] = substr($v, strlen("user_"));
					}
					$arFields[$key] = $a;
				}
				else
				{
					if (substr($arFields[$key], 0, strlen("user_")) == "user_")
						$arFields[$key] = substr($arFields[$key], strlen("user_"));
				}
			}

			if (substr($key, 0, strlen("PROPERTY_")) == "PROPERTY_")
			{
				$arFieldsPropertyValues[substr($key, strlen("PROPERTY_"))] = is_array($arFields[$key]) ? $arFields[$key] : array($arFields[$key]);
				unset($arFields[$key]);
			}
		}
		if (count($arFieldsPropertyValues) > 0)
			$arFields["PROPERTY_VALUES"] = $arFieldsPropertyValues;

		$iblockElement = new CIBlockElement();
		$id = $iblockElement->Add($arFields);
		if (!$id || $id <= 0)
			throw new Exception($iblockElement->LAST_ERROR);
		return $id;
	}

	/**
	* ����� ������� ��������� ��������.
	*
	* @param string $documentId - ��� ���������.
	*/
	public function DeleteDocument($documentId)
	{
		$documentId = intval($documentId);
		if ($documentId <= 0)
			throw new CBPArgumentNullException("documentId");

		CIBlockElement::Delete($documentId);
	}

	/**
	* ����� ��������� ��������. �� ���� ������ ��� ��������� � ��������� ����� �����.
	*
	* @param string $documentId - ��� ���������.
	*/
	public function PublishDocument($documentId)
	{
		global $DB;
		$ID = intval($documentId);

		$db_element = CIBlockElement::GetList(array(), array("ID"=>$ID, "SHOW_HISTORY"=>"Y"), false, false,
			array(
				"ID",
				"TIMESTAMP_X",
				"MODIFIED_BY",
				"DATE_CREATE",
				"CREATED_BY",
				"IBLOCK_ID",
				"ACTIVE",
				"ACTIVE_FROM",
				"ACTIVE_TO",
				"SORT",
				"NAME",
				"PREVIEW_PICTURE",
				"PREVIEW_TEXT",
				"PREVIEW_TEXT_TYPE",
				"DETAIL_PICTURE",
				"DETAIL_TEXT",
				"DETAIL_TEXT_TYPE",
				"WF_STATUS_ID",
				"WF_PARENT_ELEMENT_ID",
				"WF_NEW",
				"WF_COMMENTS",
				"IN_SECTIONS",
				"CODE",
				"TAGS",
				"XML_ID",
				"TMP_ID",
			)
		);
		if($ar_element = $db_element->Fetch())
		{
			$PARENT_ID = intval($ar_element["WF_PARENT_ELEMENT_ID"]);
			if($PARENT_ID)
			{
				// TODO: ���� � ��������� $documentId ���� WF_PARENT_ELEMENT_ID �� NULL, �� ��� ���������� ����� ��������� ������
				// (����������� ��������) �� ��������� $documentId � �������� WF_PARENT_ELEMENT_ID,
				$obElement = new CIBlockElement;
				$ar_element["WF_PARENT_ELEMENT_ID"] = false;

				if($ar_element["PREVIEW_PICTURE"])
					$ar_element["PREVIEW_PICTURE"] = CFile::MakeFileArray($ar_element["PREVIEW_PICTURE"]);
				else
					$ar_element["PREVIEW_PICTURE"] = array("tmp_name" => "", "del" => "Y");

				if($ar_element["DETAIL_PICTURE"])
					$ar_element["DETAIL_PICTURE"] = CFile::MakeFileArray($ar_element["DETAIL_PICTURE"]);
				else
					$ar_element["DETAIL_PICTURE"] = array("tmp_name" => "", "del" => "Y");

				$ar_element["IBLOCK_SECTION"] = array();
				if($ar_element["IN_SECTIONS"] == "Y")
				{
					$rsSections = CIBlockElement::GetElementGroups($ar_element["ID"], true);
					while($arSection = $rsSections->Fetch())
						$ar_element["IBLOCK_SECTION"][] = $arSection["ID"];
				}

				$ar_element["PROPERTY_VALUES"] = array();
				$arProps = &$ar_element["PROPERTY_VALUES"];

				//Delete old files
				$rsProps = CIBlockElement::GetProperty($ar_element["IBLOCK_ID"], $PARENT_ID, array("value_id" => "asc"), array("PROPERTY_TYPE" => "F", "EMPTY" => "N"));
				while($arProp = $rsProps->Fetch())
				{
					if(!array_key_exists($arProp["ID"], $arProps))
						$arProps[$arProp["ID"]] = array();
					$arProps[$arProp["ID"]][$arProp["PROPERTY_VALUE_ID"]] = array(
						"VALUE" => array("tmp_name" => "", "del" => "Y"),
						"DESCRIPTION" => false,
					);
				}

				//Add new proiperty values
				$rsProps = CIBlockElement::GetProperty($ar_element["IBLOCK_ID"], $ar_element["ID"], array("value_id" => "asc"));
				$i = 0;
				while($arProp = $rsProps->Fetch())
				{
					$i++;
					if(!array_key_exists($arProp["ID"], $arProps))
						$arProps[$arProp["ID"]] = array();

					if($arProp["PROPERTY_VALUE_ID"])
					{
						if($arProp["PROPERTY_TYPE"] == "F")
							$arProps[$arProp["ID"]]["n".$i] = array(
								"VALUE" => CFile::MakeFileArray($arProp["VALUE"]),
								"DESCRIPTION" => $arProp["DESCRIPTION"],
							);
						else
							$arProps[$arProp["ID"]]["n".$i] = array(
								"VALUE" => $arProp["VALUE"],
								"DESCRIPTION" => $arProp["DESCRIPTION"],
							);
					}
				}

				$obElement->Update($PARENT_ID, $ar_element);
				// ������� CBPDocument::MergeDocuments(WF_PARENT_ELEMENT_ID, $documentId) ��� �������� ��������� � ������� ��,
				CBPDocument::MergeDocuments(
					array("iblock", "CIBlockDocument", $PARENT_ID),
					array("iblock", "CIBlockDocument", $documentId)
				);
				// �������� �������� $documentId,
				CIBlockElement::Delete($ID);
				// ������������ �������� WF_PARENT_ELEMENT_ID
				CIBlockElement::WF_CleanUpHistoryCopies($PARENT_ID, 0);
				$strSql = "update b_iblock_element set WF_STATUS_ID='1', WF_NEW=NULL WHERE ID=".$PARENT_ID." AND WF_PARENT_ELEMENT_ID IS NULL";
				$DB->Query($strSql, false, "FILE: ".__FILE__."<br>LINE: ".__LINE__);
				CIBlockElement::UpdateSearch($PARENT_ID);
				return $PARENT_ID; 
			}
			else
			{
				// ���� WF_PARENT_ELEMENT_ID ����� NULL, �� ��� ��� ������.
				CIBlockElement::WF_CleanUpHistoryCopies($ID, 0);
				$strSql = "update b_iblock_element set WF_STATUS_ID='1', WF_NEW=NULL WHERE ID=".$ID." AND WF_PARENT_ELEMENT_ID IS NULL";
				$DB->Query($strSql, false, "FILE: ".__FILE__."<br>LINE: ".__LINE__);
				CIBlockElement::UpdateSearch($ID);
				return $ID; 
			}
		}
		return false; 
	}

	public function CloneElement($ID, $arFields = array())
	{
		global $DB;
		$ID = intval($ID);

		$db_element = CIBlockElement::GetList(array(), array("ID"=>$ID, "SHOW_HISTORY"=>"Y"), false, false,
			array(
				"ID",
				"TIMESTAMP_X",
				"MODIFIED_BY",
				"DATE_CREATE",
				"CREATED_BY",
				"IBLOCK_ID",
				"ACTIVE",
				"ACTIVE_FROM",
				"ACTIVE_TO",
				"SORT",
				"NAME",
				"PREVIEW_PICTURE",
				"PREVIEW_TEXT",
				"PREVIEW_TEXT_TYPE",
				"DETAIL_PICTURE",
				"DETAIL_TEXT",
				"DETAIL_TEXT_TYPE",
				"WF_STATUS_ID",
				"WF_PARENT_ELEMENT_ID",
				"WF_COMMENTS",
				"IN_SECTIONS",
				"CODE",
				"TAGS",
				"XML_ID",
				"TMP_ID",
			)
		);
		if($ar_element = $db_element->Fetch())
		{
			$IBLOCK_ID = $ar_element["IBLOCK_ID"];
			if($ar_element["WF_PARENT_ELEMENT_ID"] > 0)
			{
				throw new Exception(GetMessage("IBD_ELEMENT_NOT_FOUND"));
			}
			else
			{
				if($ar_element["PREVIEW_PICTURE"])
					$ar_element["PREVIEW_PICTURE"] = CFile::MakeFileArray($ar_element["PREVIEW_PICTURE"]);

				if($ar_element["DETAIL_PICTURE"])
					$ar_element["DETAIL_PICTURE"] = CFile::MakeFileArray($ar_element["DETAIL_PICTURE"]);

				$ar_element["IBLOCK_SECTION"] = array();
				if($ar_element["IN_SECTIONS"] == "Y")
				{
					$rsSections = CIBlockElement::GetElementGroups($ar_element["ID"], true);
					while($arSection = $rsSections->Fetch())
						$ar_element["IBLOCK_SECTION"][] = $arSection["ID"];
				}

				$ar_element["PROPERTY_VALUES"] = array();

				foreach($arFields as $field_id => $value)
					if(array_key_exists($field_id, $ar_element))
						$ar_element[$field_id] = $value;

				$ar_element["WF_PARENT_ELEMENT_ID"] = $ID;
				$ar_element["IBLOCK_ID"] = $IBLOCK_ID;

				$arProps = &$ar_element["PROPERTY_VALUES"];

				//Add new proiperty values
				$rsProps = CIBlockElement::GetProperty($ar_element["IBLOCK_ID"], $ar_element["ID"], array("value_id" => "asc"));
				$i = 0;
				while($arProp = $rsProps->Fetch())
				{
					if(array_key_exists($arProp["CODE"], $ar_element["PROPERTY_VALUES"]))
						continue; 

					$i++;
					if(!array_key_exists($arProp["ID"], $arProps))
						$arProps[$arProp["ID"]] = array();

					if($arProp["PROPERTY_VALUE_ID"])
					{
						if($arProp["PROPERTY_TYPE"] == "F")
							$arProps[$arProp["ID"]]["n".$i] = array(
								"VALUE" => CFile::MakeFileArray($arProp["VALUE"]),
								"DESCRIPTION" => $arProp["DESCRIPTION"],
							);
						else
							$arProps[$arProp["ID"]]["n".$i] = array(
								"VALUE" => $arProp["VALUE"],
								"DESCRIPTION" => $arProp["DESCRIPTION"],
							);
					}
				}

				$obElement = new CIBlockElement;
				$NEW_ID = $obElement->Add($ar_element);
				if(!$NEW_ID)
					throw new Exception($obElement->LAST_ERROR);
				else
					return $NEW_ID;
			}
		}
		else
		{
			throw new Exception(GetMessage("IBD_ELEMENT_NOT_FOUND"));
		}
	}

	/**
	* ����� ������� �������� � ����������. �� ���� ������ ��� ����������� � ��������� ����� �����.
	*
	* @param string $documentId - ��� ���������.
	*/
	public function UnpublishDocument($documentId)
	{
		global $DB;
		CIBlockElement::WF_CleanUpHistoryCopies($documentId, 0);
		$strSql = "update b_iblock_element set WF_STATUS_ID='2', WF_NEW='Y' WHERE ID=".intval($documentId)." AND WF_PARENT_ELEMENT_ID IS NULL";
		$z = $DB->Query($strSql, false, "FILE: ".__FILE__."<br>LINE: ".__LINE__);
		CIBlockElement::UpdateSearch($documentId);
	}

	// array("read" => "��� ������", "write" => "��� ������")
	public function GetAllowableOperations($documentType)
	{
		return array("read" => GetMessage("IBD_OPERATION_READ"), "write" => GetMessage("IBD_OPERATION_WRITE"));
	}

	// array("1" => "������", 2 => "�����", 3 => ..., "Author" => "�����")
	public function GetAllowableUserGroups($documentType)
	{
		$documentType = trim($documentType);
		if (strlen($documentType) <= 0)
			return false;

		$iblockId = intval(substr($documentType, strlen("iblock_")));

		$arResult = array("Author" => GetMessage("IBD_DOCUMENT_AUTHOR"));

		$arRes = array(1);
		$arGroups = CIBlock::GetGroupPermissions($iblockId);
		foreach ($arGroups as $groupId => $perm)
		{
			if ($perm > "R")
				$arRes[] = $groupId;
		}

		$dbGroupsList = CGroup::GetListEx(array("NAME" => "ASC"), array("ID" => $arRes));
		while ($arGroup = $dbGroupsList->Fetch())
			$arResult[$arGroup["ID"]] = $arGroup["NAME"];

		return $arResult;
	}

	public function GetUsersFromUserGroup($group, $documentId)
	{
		if (strtolower($group) == "author")
		{
			$documentId = intval($documentId);
			if ($documentId <= 0)
				return array();

			$db = CIBlockElement::GetList(array(), array("ID" => $documentId, "SHOW_NEW"=>"Y", "SHOW_HISTORY" => "Y"), false, false, array("ID", "IBLOCK_ID", "CREATED_BY"));
			if ($ar = $db->Fetch())
				return array($ar["CREATED_BY"]);

			return array();
		}

		$group = intval($group);
		if ($group <= 0)
			return array();

		$arResult = array();

		$dbUsersList = CUser::GetList(($b = "ID"), ($o = "ASC"), array("GROUPS_ID" => $group, "ACTIVE" => "Y"));
		while ($arUser = $dbUsersList->Fetch())
			$arResult[] = $arUser["ID"];

		return $arResult;
	}

	public function GetDocumentType($documentId)
	{
		$documentId = intval($documentId);
		if ($documentId <= 0)
			throw new CBPArgumentNullException("documentId");

		$dbResult = CIBlockElement::GetList(array(), array("ID" => $documentId, "SHOW_NEW" => "Y", "SHOW_HISTORY" => "Y"), false, false, array("ID", "IBLOCK_ID"));
		$arResult = $dbResult->Fetch();
		if (!$arResult)
			throw new Exception("Element is not found");

		return "iblock_".$arResult["IBLOCK_ID"];
	}
}
?>