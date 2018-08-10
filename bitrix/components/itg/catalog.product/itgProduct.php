<?php

class itgProduct
{
	private $properties;
	function __construct($id)
	{
		global $DB;
		$sql = "SELECT `id`, `BrandCode`, `ItemCode`, `Caption`, `type_item`, `definition` ,`Base64`
					FROM `b_autodoc_items_m` 
					WHERE `id`='{$id}' OR `ItemCode`='{$id}'";
		$res = $DB->Query($sql);
		$result = $res->Fetch();
		$localPath = "/autodoc/imagesItems/{$id}.jpg";
		$imageRealPath = "http://".$_SERVER["SERVER_NAME"].$localPath;
		$imageNonePath = "http://".$_SERVER["SERVER_NAME"]."/autodoc/imagesItems/expected.png";
        if  (is_file($_SERVER["DOCUMENT_ROOT"].$localPath) )
        {
            $result['image']=$imageRealPath;
        } else
        {
            if ($result['Base64']!='')
            {
                $imageUrl="data:image/png;base64,{$result['Base64']}";
               $result['image']=$imageUrl;  
            }  else
            {
                $result['image']=$imageNonePath;
            }
            
        }
		#$result['image'] = is_file($_SERVER["DOCUMENT_ROOT"].$localPath)?$imageRealPath:$imageNonePath;
        
		$this->properties = $result;
	}
	public function getProductProperties()
	{
		return $this->properties;
	}
}
?>