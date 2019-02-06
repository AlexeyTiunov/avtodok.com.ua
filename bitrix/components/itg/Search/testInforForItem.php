<? error_reporting(E_ALL);
    require_once $_SERVER["DOCUMENT_ROOT"]."/bitrix/components/itg/Search/InfoForItem.php";      
            $ArrayInfo=GetInfoFromMegaPartsMod("0446560230") ;
               #var_dump ($ArrayInfo);
            if (!isset($ArrayInfo[0]["NameM"]) ) echo "ERROR";
            echo $ArrayInfo[0]["NameM"];   
            
            var_dump($ArrayInfo);
    
    
    
?>