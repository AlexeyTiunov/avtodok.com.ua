function loadNeedModule2(moduleWebPath,func)
  {
	  var modulePath=this.findModulePath(moduleWebPath);
	  if (modulePath=="") return;
	  
	 // require.ensure([modulePath],(require)=>
	 // {
		  var module=require("bundle-loader!./app/"+modulePath); 
		 // var module=require("./"+modulePath); 
		 // var module=require.context("bundle-loader!./",false,/\.js?$/);
		  func();
	 // })
	  
  }
  loadNeedModule2();