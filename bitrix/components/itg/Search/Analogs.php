<?php

class Analogs
{
	private $params;
	private $DB;
	private $sql = array();
	private $result = array();
	function __construct($params)
	{
		$this->params = $params;
		$this->DB = Search_ITG::manualConnect();
		$this->prepareSql();
		$res = $this->DB->query($this->sql['analogs3']);
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
	   $this->sql['analogs2'] = "SELECT I2Code as icode, B2Code as bcode FROM b_autodoc_analogs_m_2 WHERE B1Code='{$this->params['bcode']}' AND I1Code='{$this->params['icode']}' GROUP BY I2Code,B2Code";
     
     
       $this->sql['analogs3']="(SELECT I2Code as icode, B2Code as bcode FROM b_autodoc_analogs_m WHERE B1Code='{$this->params['bcode']}' AND I1Code='{$this->params['icode']}' GROUP BY I2Code,B2Code)
                               UNION
                               (SELECT I2Code as icode, B2Code as bcode FROM b_autodoc_analogs_m_2 WHERE B1Code='{$this->params['bcode']}' AND I1Code='{$this->params['icode']}' GROUP BY I2Code,B2Code) 
                               ORDER BY  I2Code,B2Code
       
       ";
    }  
    
    private function modifyItemCode()
    {
        foreach ($this->result as $item)
        {
            
        }
        
    }
    
    private function getCorrectionArray()
    {
        $correctionArray=array(
        
        
        
        
        );
    }
}
?>
