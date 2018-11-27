var ReactDOM = require('react-dom');
var React = require('react');
import {Extends} from './main_component.js' 
import {handleData} from './data_convert.js'



export class Auth extends Extends
{
     constructor(props)
    {
        super(props);
        
        
        this.state.renderIn="";
        this.state.isAuthed=false;
        
    }  
    auth(request)
    { 
        
         var Prom=this.makeRequestToRecieveData("POST","/ws/auth.php",false,request)
		 
		/* var authRequest_old=function(responseText){              
               if (Number(responseText)>0)               {
                   authComp=<Auth_done />; 
                   isAuthed=true;
               }                                       
               else 
               {
				    var UserLoginCookie=this.getUserLoginCookie();
					
					if (UserLoginCookie=="" || UserLoginCookie==undefined)
				    authComp=<Register_need />;		
                    else
					authComp=<Auth_need />;
				
                    isAuthed=false;
               }
			   var updateAll=this.updateAll.bind(this);
               this.setState({renderIn:React.createElement(authComp.type),
                                      isAuthed:isAuthed
                                     },updateAll);
             
         }.bind(this)*/
		 var authRequest=function(responseText){
			 if (Number(responseText)>0)
			 {
				 this.auth_done();
			 }else
			 {
				  var UserLoginCookie=this.getUserLoginCookie();
				 if (UserLoginCookie=="" || UserLoginCookie==undefined)
				   this.auth_registerNeed();
			     else
			       this.auth_authNeed();
			 }
              this.updateRegions();
		 }.bind(this)
         Prom.then(authRequest)
         
    }
	auth_authNeed()
	{
		var authComp=<Auth_need />;
		isAuthed=false;
		var updateAll=this.updateAll.bind(this);
		this.setState({renderIn:React.createElement(authComp.type),
                                      isAuthed:isAuthed
                                     },updateAll);
	     
	}
	auth_registerNeed()
	{
		 var authComp=<Register_need />;
		isAuthed=false;
		var updateAll=this.updateAll.bind(this);
		this.setState({renderIn:React.createElement(authComp.type),
                                      isAuthed:isAuthed
                                     },updateAll);
		
	}
	auth_done()
	{
		authComp=<Auth_done />; 
                   isAuthed=true;
		var updateAll=this.updateAll.bind(this);
		this.setState({renderIn:React.createElement(authComp.type),
              isAuthed:isAuthed
               },updateAll);
	}
    autoAuth()
    {
      this.auth("AUTO_AUTH=Y&CHECK_AUTH=Y"); 
    }
    
    isAuthed()
    {
        
      this.auth("CHECK_AUTH=Y");  
        
    }
     logOut()
    {
        this.auth("LOG_OUT=Y");  
    }
   
    /////////////////////////////
     componentDidMount()
     {
        super.componentDidMount(); 
       this.autoAuth(); 
     }  
    render(){ 
                 return ( <div id="modal-user-auth" className="modal fade"  role="dialog">
                         
                             {this.state.renderIn} 
                                   
                           </div> 
                      )
            } 
    
}   
export class Auth_done extends Extends      
{
     constructor(props)
    {
        super(props);
        this.logOut=this.logOut.bind(this);
        
    }
    
    logOut()
    {
          Uobject=window.objectReg["Auth"];
          Uobject.auth("LOG_OUT=Y");  
    }
      
    ///////////////////////////////////
    componentDidMount()
    {
       // this.updateAll();
    }
    
    render(){
        
              return (
                       <div className="modal-dialog">                     
                         <div className="modal-content">
                           <div className="modal-header text-center">
                              <h2 className="modal-title"><i className="fa fa-pencil"></i><font><font> Авторизація</font></font></h2>
                           </div>
                           <div className="modal-body">
                             <fieldset>
                                <legend><font><font>Авторизація виконано успішно!</font></font></legend>
                             </fieldset>
                              <div className="form-group form-actions">
                                <div className="col-xs-12 text-right">
                                    <button type="button"  className="btn btn-sm btn-default" data-dismiss="modal"><font><font>Продовжити роботу</font></font></button>
                                    <button type="button" onClick={this.logOut}  className="btn btn-sm btn-primary"><font><font>Вийти з акаунту</font></font></button>
                                 </div>                           
                               </div>
                             </div>    
                          <div className="modal-footer">
                          </div>
                    
                        
                      </div>
                      </div> 
               
               
               
                      )
        
        
            }
    
}
export class Auth_need extends Extends
{
    constructor(props)
    {
        super(props);
        this.onInputChange=this.onInputChange.bind(this);
        this.state.USER_LOGIN="";
        this.state.USER_PASSWORD="";
		 this.state.regStatus="Авторизація";
        
        this.auth=this.auth.bind(this);
        this.onInputChange=this.onInputChange.bind(this);
    }
    
    auth()
    {
      Uobject=window.objectReg["Auth"];
      Uobject.auth("USER_LOGIN="+this.state.USER_LOGIN+"&USER_PASSWORD="+this.state.USER_PASSWORD+"&CHECK_AUTH=Y");   
        
    }
    registerNeed()
	{
		Uobject=window.objectReg["Auth"];
		 Uobject.auth_registerNeed();
	}
    
    onInputChange(e)
    {
         var input= e.target.name
         var id = e.target.id;
         var inputValue=e.target.value;
         this.state[input]=inputValue;
         this.state[id]=inputValue;
		
         if  (this.state[input]=="")
         {
             delete this.state[input];
         }
         var str= `${id}` ;
         this.setState({ str:inputValue});
        
    }
    /////////////////////////////////////////
	componentDidUpdate()
	{
		//this.updateAll();
	}
     componentDidMount()
    {
       // this.updateAll();
    } 
    render()
    {
        return (
                   <div className="modal-dialog">
                      <div className="modal-content">    
                        <div className="modal-header text-center">
                          <h2 className="modal-title"><i className="fa fa-pencil"></i><font><font> Авторизація</font></font></h2>
                        </div>
                       <div className="modal-body">
                        <form action="index.html" method="post" enctype="multipart/form-data" className="form-horizontal form-bordered" onsubmit="return false;">
                            
                          <fieldset>
                                <legend>
								<div className="row">								  
								  <div className="col-xs-6">
								    <p align="center" ><font>{this.state.regStatus}</font></p>
								  </div>
								  <div className="col-xs-6">
								  <p align="center" ><font><a onClick={this.registerNeed}>В мене немає логіна.</a></font></p>
								  </div>
								</div>
								</legend>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-password"><font><font>Логин</font></font></label>
                                    <div className="col-md-8">
                                        <input type="text" onChange={this.onInputChange} id="user-settings-login" name="USER_LOGIN" className="form-control" placeholder="Введіть Ваш логин..." />
                                    </div>
                                </div>
                                 <div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-password"><font><font>Ваш пароль</font></font></label>
                                    <div className="col-md-8">
                                        <input type="password" onChange={this.onInputChange} id="user-settings-password" name="USER_PASSWORD" className="form-control" placeholder="Введіть Ваш новий пароль..."/>
                                    </div>
                                </div>
        
                        </fieldset>   
         
                         <div className="form-group form-actions">
                                <div className="col-xs-12 text-right">
                                    <button type="button"  className="btn btn-sm btn-default" data-dismiss="modal"><font><font>Відміна</font></font></button>
                                    <button type="button" onClick={this.auth}  className="btn btn-sm btn-primary"><font><font>Авторизация</font></font></button>
                                </div>
                         </div>
                       </form>
                    </div>
                 </div>  
              </div>               
             
              
              )
    }
     
    
    
}
export class Register_need extends Extends
{
	constructor(props)
	{
		super(props);
		this.onInputChange=this.onInputChange.bind(this);
		this.state.capture_sid="";
		this.state.regStatus="Регістрація";
		this.getRegister=this.getRegister.bind(this);
		this.authNeed=this.authNeed.bind(this);
		this.regStatusInfo=
		{
			IncorrectPassword:["",""],
			IncorrectLogin:["",""],
			Success:[""],
			UserID:[""],
		};
	}
	checkAuth()
	{
		 Uobject=window.objectReg["Auth"];
		 Uobject.isAuthed();
	}
	authNeed()
	{
		
		 Uobject=window.objectReg["Auth"];
		 Uobject.auth_authNeed();
	}
	getRegister()
	{
		var Prom=this.makeRequestToRecieveData("POST","/ws/register.php",false,this.makePostDataFromState());
		
		var register=function(responseText)
		{
			 handleAnswer= new  handleData(responseText);
			 var IncorrectPassword=handleAnswer.mapArray.IncorrectPassword;
			 var IncorrectLogin=handleAnswer.mapArray.IncorrectLogin;
			 var UserID=handleAnswer.mapArray.UserID;
			 if (Number(UserID)>0)
			 {
				 this.checkAuth();
			 }else{
				 this.getCaptureSid();
			 }
			 
			 
			 
			  
		}
		register=register.bind(this);
		Prom.then(register);
	}
	getCaptureSid()
	{
		 var Prom=this.makeRequestToRecieveData("POST","/ws/register.php",false,"getCaptchaSid=Y")
		 
		 var capture_sid=function(sid)
		 {
			 this.setState({capture_sid:sid});
		 }
		 capture_sid=capture_sid.bind(this);
		 Prom.then(capture_sid);
		 
	}
	
	onInputChange(e)
    {
		if (e.target.name=="LOGIN")this.checkInput(e);
         var input= e.target.name
         var id = e.target.id;
         var inputValue=e.target.value;
         this.state[input]=inputValue;
         this.state[id]=inputValue;
         if  (this.state[input]=="")
         {
             delete this.state[input];
         }
         var str= `${id}` ;
         this.setState({ str:inputValue});
        
    }
	checkInput(e)
	{
		var phoneNumber=e.target.value;
		if (phoneNumber!="")
       {
         if (phoneNumber.match(/^.*[\+\-\D]+/)) 
         {
            phoneMod= phoneNumber.replace(/[\+\-\D]/g,''); 
           e.target.value=phoneMod;
           return;
         } 
		 if  (!phoneNumber.match(/^(38)([0-9]*)/g ) && !phoneNumber.match(/^(3)([0-9]*)/g ) )
         {
           phoneMod="38"+phoneNumber;
          
          phoneMod= phoneMod.replace(/[\+\-\D]+/g,''); 
           e.target.value=phoneMod;
         }
		
	   }
	   if (phoneNumber.match(/^(39)([0-9]*)/g ) ||
           phoneNumber.match(/^(37)([0-9]*)/g )  ||
           phoneNumber.match(/^(34)([0-9]*)/g ) ||
           phoneNumber.match(/^(35)([0-9]*)/g ) ||
           phoneNumber.match(/^(36)([0-9]*)/g )
       
       )
       {
         shortFoneNumber=phoneNumber.replace(/^(38|39|36|35|34|37)([0-9]*)/g,'38$2'); 
         shortFoneNumber= shortFoneNumber.replace(/[\+\-\D]+/g,'');
         e.target.value=shortFoneNumber; 
        // alert(shortFoneNumber);  
       }
	}
	
	
	///////////////////////////////////////////////////////
	
	componentDidMount()
	{
		super.componentDidMount();
		this.getCaptureSid();
	}
	render()
	{
		return (
                   <div className="modal-dialog">
                      <div className="modal-content">    
                        <div className="modal-header text-center">
                          <h2 className="modal-title"><i className="fa fa-pencil"></i><font><font> Регістрація</font></font></h2>
                        </div>
                       <div className="modal-body">
                        <form action="index.html" method="post" enctype="multipart/form-data" className="form-horizontal form-bordered" onsubmit="return false;">
                            
                          <fieldset>
                                <legend>
								<div className="row">								  
								  <div className="col-xs-6">
								    <p align="center" ><font>{this.state.regStatus}</font></p>
								  </div>
								  <div className="col-xs-6">
								  <p align="center" ><font><a onClick={this.authNeed}>В мене вже є логін.</a></font></p>
								  </div>
								</div>
								
								
								</legend>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-password"><font><font>Логін(моб. номер)</font></font></label>
                                    <div className="col-md-8">
                                        <input type="text" onChange ={this.onInputChange} id="login" name="LOGIN" className="form-control" placeholder="Введіть Ваш логин..."/>
                                    </div>
                                </div>
                                 <div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-password"><font><font>Новий пароль</font></font></label>
                                    <div className="col-md-8">
                                        <input type="password" onChange={this.onInputChange} id="password" name="PASSWORD" className="form-control" placeholder="Введіть Ваш новий пароль..."/>
                                    </div>
                                </div>
								<div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-password"><font><font>Підтвердження паролю</font></font></label>
                                    <div className="col-md-8">
                                        <input type="password" onChange={this.onInputChange} id="password_confirm" name="PASSWORD_CONFIRM" className="form-control" placeholder="Введіть Ваш новий пароль..."/>
                                    </div>
                                </div>
								<div className="form-group">
                                    <label className="col-md-2 control-label" for="user-settings-password"><font><font>Введіть слово</font></font></label>
                                    <div className="col-md-4">
                                        <input type="text" onChange={this.onInputChange} id="captcha_word" name="CAPTCHA_WORD" className="form-control" placeholder="Введіть слово..."/>
                                    </div>
									<div className="col-md-4 control-label"> 
									    <img src={"/bitrix/tools/captcha.php?captcha_sid="+this.state.capture_sid} />
									</div>
                                </div>
        
                        </fieldset>   
         
                         <div className="form-group form-actions">
                                <div className="col-xs-12 text-right">
                                    <button type="button"  className="btn btn-sm btn-default" data-dismiss="modal"><font><font>Відміна</font></font></button>
                                    <button type="button" onClick={this.getRegister}  className="btn btn-sm btn-primary"><font><font>Регістрація</font></font></button>
                                </div>
                         </div>
                       </form>
                    </div>
                 </div>  
              </div>               
             
              
              )
		
		
	}
	
	
}