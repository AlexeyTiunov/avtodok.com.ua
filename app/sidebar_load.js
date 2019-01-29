var moment=require('moment');
window.moment=moment;
require.ensure(["./sidebar_nav.js"],function (require)
{
	require.ensure(["./sidebar.js"],function (require)
	  {
		    var SBN=require("./sidebar_nav.js");
		 window.Sidebar_nav=SBN.Sidebar_nav;
	    window.ITEMS=SBN.items;
	
	     var module=require("./sidebar.js");
	  });
    	
	
	
	
})

/*require.ensure(["./sidebar.js"],function (require)
{
	var module=require("./sidebar.js");
	
	
})*/