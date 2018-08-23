<?php

/**
* Определяет ключевую функциональность для базового класса ATemplate
*  @package  auotodoc_templator
*/

class TemplatedString
{
   public function __construct( $inStr )
     {
        $this->str = $inStr;
        $this->template = "";
        $this->startPos = strlen($inStr);
        $this->endPos = strlen($inStr);
     }

   public function SetTemplate( $brandID )
     {
        global $DB;
        $len = strlen( $this->str );
        if( $len > 0 )
          {
             $sql = "SELECT template FROM b_autodoc_templates";
             $sql .= " WHERE BCode='".$brandID."'";
             $sql .= " AND length='".$len."'";

             $res = $DB->Query( $sql );

             if( $arRes = $res->Fetch()  )
               $this->template = $arRes['template'];
             else
               for( $i=0; $i < $len; $i++ )
                 $this->template .= 'X';

          }

     }

   public function GetTemplate()
     {
         return $template;
     }

  public function SetColor( $col )
    {
       $this->color = $col;
    }

  public function SetSelection( $selStr )
    {
       $this->startPos = Strpos( " ".$this->str, $selStr);

       if( !$this->startPos  )
         $this->startPos = strlen( $this->str );
       else
         {
           $this->endPos = $this->startPos + strlen($selStr) - 2;
           $this->startPos-- ;
         }

    }

  public function GetTemplated()
    {
        $outStr = "";
        $cnt = 0;

        for( $i=0; $i < strlen( $this->str ); $i++ )
          {
             if( $i == $this->startPos )
               $outStr .= "<font color='".$this->color."'><strong>";


             if( $this->template[$cnt] != 'X' )
               {
                 while( ( $this->template[$cnt] != 'X' )  )
                   {
                        $outStr .= $this->template[$cnt];
                        $cnt++;
                   }


               }
             $outStr .= $this->str[$i];
             $cnt++;

             if( $i == $this->endPos )
               $outStr .= "</strong></font>";

          }

        return $outStr;
    }

   private $template;
   private $str;
   private $color;
   private $startPos;
   private $endPos;
}



?>