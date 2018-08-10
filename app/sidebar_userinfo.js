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