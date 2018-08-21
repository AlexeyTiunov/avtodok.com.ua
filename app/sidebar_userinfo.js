var ReactDOM = require('react-dom');
var React = require('react');


export class Sidebar_userinfo extends React.Component
{
   constructor(props) 
     {  
       super(props);      
         
         
     }
     
     
     render ()
     {
         return ( <div className="sidebar-section sidebar-user clearfix">
                                    <div className="sidebar-user-avatar">
                                            <a href="#">
                                                <img src="/app/img/placeholders/avatars/avatar2.jpg" alt="аватар"/>
                                            </a>
                                        </div>
                                        <div className="sidebar-user-name"><font><font>USER 1</font></font></div>
                                        <div className="sidebar-user-links">
                                            <a href="cabinet_profile.html" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Профіль">
                                                <i className="gi gi-user"></i>
                                            </a>
                                          
                                            <a href="#modal-user-settings" data-toggle="modal" class="enable-tooltip" data-placement="bottom" title="" data-original-title="Настройки">
                                                <i className="gi gi-cogwheel"></i>
                                            </a>
                                            <a href="login.html" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Вийти">
                                                <i className="gi gi-exit"></i>
                                            </a>
                                    </div>
                                </div>
         
         
         
                  )
         
         
     }
     
      
}    
export class Sidebar_usersettings extends React.Component   
{
    constructor(props) 
     {  
       super(props);      
         
         
     } 
     
     render ()
     {
        return (  <div id="modal-user-settings" className="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                  
                    <div className="modal-header text-center">
                        <h2 className="modal-title"><i className="fa fa-pencil"></i><font><font> Настройки</font></font></h2>
                    </div>
                 

                
                    <div className="modal-body">
                        <form action="index.html" method="post" enctype="multipart/form-data" className="form-horizontal form-bordered" onsubmit="return false;">
                            <fieldset>
                                <legend><font><font>Загальна інформация</font></font></legend>
                                <div className="form-group">
                                    <label className="col-md-4 control-label"><font><font>Имя пользователя</font></font></label>
                                    <div className="col-md-8">
                                        <p className="form-control-static"><font><font>??????????</font></font></p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-email"><font><font>Ел. адреса</font></font></label>
                                    <div className="col-md-8">
                                        <input type="email" id="user-settings-email" name="user-settings-email" className="form-control" value="admin@example.com"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-notifications"><font><font>Повідомлення на електорнну пошту</font></font></label>
                                    <div className="col-md-8">
                                        <label className="switch switch-primary">
                                            <input type="checkbox" id="user-settings-notifications" name="user-settings-notifications" value="1" checked=""/>
                                            <span></span>
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend><font><font>Зміна паролю</font></font></legend>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-password"><font><font>Новий пароль</font></font></label>
                                    <div className="col-md-8">
                                        <input type="password" id="user-settings-password" name="user-settings-password" className="form-control" placeholder="Введіть Ваш новий пароль..."/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-repassword"><font><font>Підтвердіть новий пароль</font></font></label>
                                    <div className="col-md-8">
                                        <input type="password" id="user-settings-repassword" name="user-settings-repassword" className="form-control" placeholder="...повторіть разочок!"/>
                                    </div>
                                </div>
                            </fieldset>
                            <div className="form-group form-actions">
                                <div className="col-xs-12 text-right">
                                    <button type="button" className="btn btn-sm btn-default" data-dismiss="modal"><font><font>Відміна</font></font></button>
                                    <button type="submit" className="btn btn-sm btn-primary"><font><font>Зберегти зміни</font></font></button>
                                </div>
                            </div>
                        </form>
                    </div>
                  
                </div>
            </div>
        </div>
        
        
        
           
            
             
                ) 
         
         
     }
     
    
    
    
}