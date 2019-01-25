<?
   require_once($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php'); 
   
        

    function createUrlElement($arrTextNodes,$doc)
    {
        $url= $doc->createElement("url");
        
        $loc= new DOMElement("loc");  
        $url->appendChild($loc);        
        $locTextNode= new DOMText($arrTextNodes['LOC_TEXT']);
       
        $loc->appendChild($locTextNode); 
        
        $img=createImageElement($arrTextNodes['IMG_PATH'],$arrTextNodes['IMG_CAPTION'],$doc);
        
       
        $url->appendChild($img);
        
        return $url;
        
    }
    function createImageElement($path,$caption,$doc)
    {
        $img=$doc->createElementNS("http://www.google.com/schemas/sitemap-image/1.1","image:image");
        
        $imgLock= $doc->createElementNS("http://www.google.com/schemas/sitemap-image/1.1","image:loc"); 
        $locTextNode= new DOMText($path);
        $imgLock->appendChild($locTextNode);
        
        $imgCaption= $doc->createElementNS("http://www.google.com/schemas/sitemap-image/1.1","image:caption"); 
        $locTextNode= new DOMText($caption);
        $imgCaption->appendChild($locTextNode);
        
        $img->appendChild($imgLock);
        $img->appendChild($imgCaption);
           
        return  $img;
    }
    
    $doc = new DOMDocument('1.0',"UTF-8");
    $doc->formatOutput = true;
    
    $urlSet=$doc->createElement("urlset");
    $urlSetAtrXmlns=$urlSet->setAttribute("xmlns","http://www.sitemaps.org/schemas/sitemap/0.9");
    $urlSetAtrXmlnsXsi=$urlSet->setAttribute("xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance");
    $urlSetAtrXsiSchemaLocation=$urlSet->setAttribute("xsi:schemaLocation","http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd");
    $urlSetAtrXmlnsImage=$urlSet->setAttribute("xmlns:image","http://www.google.com/schemas/sitemap-image/1.1");
    $urlSetAtrXmlnsVideo=$urlSet->setAttribute("xmlns:video","http://www.google.com/schemas/sitemap-video/1.1");
    
   
     foreach ($itemsInfoArray as $itemInfoArray)
     {
         $url=createUrlElement($itemInfoArray,$doc);
         $urlSet->appendChild($url);
     } 
    
    echo $doc->saveXML($urlSet);
    
      
    
    
    
    
    
    
    
    
?>