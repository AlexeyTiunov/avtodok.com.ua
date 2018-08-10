<?php

class Analogs
{
	private $params;
	private $DB;
	private $sql = array();
	private $result = array();
    private $brandConditions;
	function __construct($params)
	{
		$this->params = $params;
		$this->DB = Search_ITG::manualConnect();
        $this->defineBrandGroupId();
		$this->prepareSql2();
      #  var_dump($this->sql['analogs']);
		$res = $this->DB->query($this->sql['analogs']);
		while(($itemAnalog = $res->fetch_assoc()))
		{
			$this->result[] = $itemAnalog;
		}
	}
	public function getArrItems()
	{
		return $this->result;
	}
	private function prepareSql()
	{
         
		$this->sql['analogs'] = "SELECT I2Code as icode, B2Code as bcode FROM b_autodoc_analogs_m WHERE B1Code='{$this->params['bcode']}' AND I1Code='{$this->params['icode']}' GROUP BY I2Code,B2Code";
       #$this->sql['analogs'] = "SELECT I2Code as icode, B2Code as bcode FROM b_autodoc_analogs_m WHERE B1Code='{$this->params['bcode']}' AND I1Code='{$this->params['icode']}' ";
	}
    private function prepareSql2()
    {
         
        $this->sql['analogs'] = "SELECT I2Code as icode, B2Code as bcode FROM b_autodoc_analogs_m WHERE {$this->brandConditions} I1Code='{$this->params['icode']}' GROUP BY I2Code,B2Code";
       #$this->sql['analogs'] = "SELECT I2Code as icode, B2Code as bcode FROM b_autodoc_analogs_m WHERE B1Code='{$this->params['bcode']}' AND I1Code='{$this->params['icode']}' ";
       
      $this->sql['analogs']=" SELECT icode, bcode FROM
                             ( SELECT I2Code as icode, B2Code as bcode FROM b_autodoc_analogs_m WHERE {$this->brandConditions} I1Code='{$this->params['icode']}' GROUP BY I2Code,B2Code
                               UNION  ALL
                              SELECT I2Code as icode, B2Code as bcode FROM b_autodoc_analogs_m_2 WHERE {$this->brandConditions} I1Code='{$this->params['icode']}' GROUP BY I2Code,B2Code
                                ) AS F
                             GROUP BY icode, bcode
       ";  
      /* var_dump($this->sql['analogs']);  */
       
    }
    private function defineBrandGroupId()
    {
        if (strpos($this->params['bcode'],"#")===0 )
           {
            $groupID=str_replace("#","",$this->params['bcode']);
            $this->brandConditions=self::getBrandCodesConditionByGroupId($groupID);
            if ($this->brandConditions=="")
            {
                $this->brandConditions='B1Code='.$this->params['bcode'].' AND ';
            }
            
        }
        else
        {
             $this->brandConditions='B1Code='.$this->params['bcode'].' AND ';  
            
        }
    }
    private static function getBrandCodesConditionByGroupId($groupID)
    {
       require_once ($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/IB.property/BrandGroup.php");
       $brandGroup=BrandGroup::getBrandsByGroupID($groupID);
       if ($brandGroup==false)
       {
          return ""; 
       }
      
      $queryConditionBrandCode="";
       foreach ($brandGroup['BRAND_CODES'] as $key=>$value)
       {
          $queryConditionBrandCode.=" `B1Code`=".$value." OR "; 
       } 
       $queryConditionBrandCode="(".$queryConditionBrandCode.")";
       $queryConditionBrandCode=str_replace("OR )",")",$queryConditionBrandCode);
       $queryConditionBrandCode.=" AND";
         
       return  $queryConditionBrandCode;
    }
}
?>
