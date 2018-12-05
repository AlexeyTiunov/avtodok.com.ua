<?
   require($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php'); 
   
        

    function createUrlElement($arrTextNodes)
    {
        $url= new DOMElement("url");
        
        $loc= new DomElemnt("loc");
        $locTextNode= new DOMText($arrTextNodes['LOC_TEXT']);
        $loc->appendChild($locTextNode); 
        
        $img=createImageElement($arrTextNodes['IMG_PATH'],$arrTextNodes['IMG_CAPTION']);
        
        $url->appendChild($loc);
        $url->appendChild($img);
        
    }
    function createImageElement($path,$caption)
    {
        $img=new DOMElement("image:image");
        
        $imgLock= new DOMElement("image:loc"); 
        $locTextNode= new DOMText($path);
        $imgLock->appendChild($locTextNode);
        
        $imgCaption= new DOMElement("image:caption"); 
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
    
   
     foreach ($itemInfoArray as $key=>$value)
     {
         
         
     } 
    
    
    
      
    
    
    
    
    
    
    
    
?>