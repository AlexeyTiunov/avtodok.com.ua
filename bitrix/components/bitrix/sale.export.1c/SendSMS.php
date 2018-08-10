<?
    
    class CheckMailAndSendSMS
    {
      private $Email; 
      private $MobilePhoneNumber;
      public $HasSendSms=false; 
      private $SMSTextReadyForSent=false;
      public $SMSText;  
      public $idSMS;                 
        
      function  __construct($OrderNumber,$Email,$userName,$statusChangedPosition,$statusChangedPosition2)  
      {  #var_dump($statusChangedPosition);
         # $this->SMSText="Автодок-Партс avtodok.com.ua\nУважаемый(ая) {$userName}.\nЗаказа №";
         $this->SMSText="Автодок-Партс\nЗаказ №";
          $this->SMSText.=$OrderNumber."\n" ;
          $this->Email=$Email;
          if  (!$this->CheckEmailForNumber())  #if Email is valid
          {
              $this->HasSendSms ="Valid";
          }
          else
          {  
             # var_dump($this->MobilePhoneNumber);   
               if (is_array($statusChangedPosition))
               {    
                   foreach ($statusChangedPosition as $Value )
                   {
                     # var_dump($Value);   
                      if ($Value['STATUSF']==2) 
                      {
                         #$this->SMSText.="статус ОТКАЗ по {$Value['ICODE']} - {$Value['CAPTION']} -{$Value['STATUSQUANTITY']} шт.\n";
                         $this->SMSText.="{$Value['ICODE']}-{$Value['CAPTION']}-статус ОТКАЗ-{$Value['STATUSQUANTITY']} шт.\n";
                         $this->SMSTextReadyForSent =true;
                      }
                        
                      if ($Value['STATUSF']==3)
                      {
                        # $this->SMSText.= "статус НА СКЛАДЕ-{$Value['ICODE']} - {$Value['CAPTION']} -{$Value['STATUSQUANTITY']} шт.\n"; 
                         $this->SMSText.="{$Value['ICODE']}-{$Value['CAPTION']}-статус НА СКЛАДЕ-{$Value['STATUSQUANTITY']} шт.\n";   
                         $this->SMSTextReadyForSent =true; 
                      }
                      
                       if ($Value['STATUSF']=="NEW_ORDER")
                       {
                         $this->SMSText="Автодок-Партс\nУважаемый клиент.\nВаш Заказ № {$OrderNumber} принят в работу.\n";                        
                          $this->SMSTextReadyForSent =true;    
                       }
                       
                       if ($Value['STATUSF']=="NEW_ORDER_DEFERDED")
                       {
                         $this->SMSText="Автодок-Партс\nУважаемый клиент.\nВаш Заказ № {$OrderNumber} принят, но\nобработка заказа ОТЛОЖЕНА до внесения оплаты.\n";                        
                          $this->SMSTextReadyForSent =true;    
                       }
                       
                       
                        
                       
                   }
               }
               if (is_array($statusChangedPosition2))
               {
                   foreach ($statusChangedPosition2 as $Value )
                   {
                      if ($Value['STATUSF2']==2) 
                      {
                         #$this->SMSText.="статус ОТКАЗ по {$Value['ICODE']} - {$Value['CAPTION']} -{$Value['STATUSQUANTITY2']} шт.\n";
                         $this->SMSText.="{$Value['ICODE']}-{$Value['CAPTION']}-статус ОТКАЗ-{$Value['STATUSQUANTITY2']} шт.\n";
                         $this->SMSTextReadyForSent =true;
                      } 
                      if ($Value['STATUSF2']==3)
                      {
                        #$this->SMSText.= "статус НА СКЛАДЕ-{$Value['ICODE']} - {$Value['CAPTION']} -{$Value['STATUSQUANTITY2']} шт.\n";
                        $this->SMSText.="{$Value['ICODE']}-{$Value['CAPTION']}-статус НА СКЛАДЕ-{$Value['STATUSQUANTITY2']} шт.\n";
                         $this->SMSTextReadyForSent =true; 
                      }                       
                        
                       
                   }
               }
              if  ($this->SMSTextReadyForSent )
              {
                # var_dump($this->MobilePhoneNumber); 
                 $this->SendSMS(); 
                 $this->HasSendSms=true; 
              }
          } 
      }
        
      private function CheckEmailForNumber()     # User can has an unvalid Email of such type 380501234545@380501234545.com.ua . It means that user has no valid email, and will recieve SMS 
      {
        $FirstPart=preg_replace("/(.*)(@{1})(.*)/","$1",$this->Email);
        $SecondPart=preg_replace("/(.*)(@{1})(.*)/","$3",$this->Email);
        $SecondPart=preg_replace("/.com.ua/","",$SecondPart);
        if ($SecondPart==$FirstPart)
        {
             if (preg_match("/[0-9]*/",$FirstPart))
             {
                 $this->MobilePhoneNumber="+".$FirstPart ;
                 return true;
             }
            
        } else
        {
            return false;
        }
          
           
      }  
        
      private function SendSMS()
      {
        require_once($_SERVER['DOCUMENT_ROOT'].'/autodoc/Alphasmsclient.class.php'); 
        $sms = new SMSclient('380508124053', 'T26071980', '7d16cab2c8640c4c11b93d5e122c3a75eabfd9f8');
        
        $this->idSMS = $sms->sendSMS('Avtodok',$this->MobilePhoneNumber, $this->SMSText); 
           
          
      }  
        
        
    }
    
    
?>