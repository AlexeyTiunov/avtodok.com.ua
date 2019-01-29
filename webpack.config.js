 var path = require('path');
 const webpack= require('webpack');
 const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var entryArray=[];
var entryArray_2=[];
var entryArrayCss=[]; 
var entryArrayExtJs=[];

/*entryArray.push('babel-polyfill'); 
entryArrayExtJs.push('./app/js/detect_mobile.js');
//entryArray.push("./app/my.jsx");
entryArray_2.push("./app/sidebar_li.js");
entryArray_2.push("./app/sidebar.js");
entryArray.push("./app/sidebar_header.js"); 
entryArrayCss.push('./app/css/plugins.css');
entryArrayCss.push('./app/css/plugins_xs.css'); 
entryArrayExtJs.push('./app/js/plugins.js'); 
entryArrayExtJs.push('./app/js/app.js');

//entryArray.push('./app/js/modernizr-2.7.1-respond-1.4.2.min.js');
//entryArray.push('./app/js/request.js');    
entryArrayExtJs.push('./app/js/pages/index.js');
entryArrayExtJs.push('./app/js/pages/tablesDatatables.js');
entryArrayCss.push('./app/css/main.css');
entryArrayCss.push('./app/css/themes.css');
entryArrayCss.push('./app/css/themes/fire.css'); 
entryArrayExtJs.push('bootstrap/dist/js/bootstrap.js');
entryArrayExtJs.push('bootstrap/dist/css/bootstrap.min.css');*/

entryArray.push('babel-polyfill'); 
//entryArray.push('./cheat.js')
entryArray.push('./app/componentModulesPathes.js')
entryArray.push('./app/js/detect_mobile.js');
//entryArray.push("./app/my.jsx");
entryArray.push("./app/sidebar_li.js");
entryArray.push("./app/sidebar_load.js");
entryArray.push("./app/sidebar_header.js"); 
entryArray.push('./app/css/plugins.css');
entryArray.push('./app/css/plugins_xs.css'); 
entryArray.push('./app/js/plugins.js'); 
entryArray.push('./app/js/app.js');

//entryArray.push('./app/js/modernizr-2.7.1-respond-1.4.2.min.js');
//entryArray.push('./app/js/request.js');    
entryArray.push('./app/js/pages/index.js');
entryArray.push('./app/js/pages/tablesDatatables.js');
entryArray.push('./app/css/main.css');
entryArray.push('./app/css/themes.css');
entryArray.push('./app/css/themes/fire.css'); 
entryArray.push('bootstrap/dist/js/bootstrap.js');
entryArray.push('bootstrap/dist/css/bootstrap.min.css');

const NODE_ENV=process.env.NODE_ENV||"development";

module.exports = {                
  //  entry: "./app/my.jsx", // входная точка - исходный файл
   entry: {bundle:entryArray},
   // entry:"/\.\/app\/.*\.js.*$/",
  /*entry:{ appJs:entryArray,
           appJs_2:entryArray_2,
           appExtJs:entryArrayExtJs,
	       css:entryArrayCss,
         },*/
   
    output:{
        path: path.resolve(__dirname, './public'),     // путь к каталогу выходных файлов - папка public
        publicPath: '/public/',
        filename: "[name].js",       // название создаваемого файла
		 chunkFilename: '[name].[id].js',
    },
    module:{
       rules:[   
		     {
        test: /\/app\/.+\.js$/,		
        use: {
          loader: 'bundle-loader',
          options: {
            name: 'my-chunk'
          }
        }
      },
		//загрузчик для jsx
            {
                test: /\.jsx?$/, // определяем тип файлов
               // exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                exclude: [/node_modules/,path.resolve(__dirname, 'app/js/'),path.resolve(__dirname, 'app/js/vendor/'),/app\/js\//], 
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    presets:["env", "react"],    // используемые плагины
                    plugins: ["babel-plugin-transform-remove-strict-mode"]
                }
            },
            {
                test: /\.js?$/, // определяем тип файлов
               // exclude: /(.*?)(node_modules|plugins\.js|app\.js)$/,  // исключаем из обработки папку node_modules
                exclude: [/node_modules/,path.resolve(__dirname, 'app/js/'),path.resolve(__dirname, 'app/js/vendor/'),/app\/js\//],
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    presets:["env", "react"],    // используемые плагины
                    plugins: ["babel-plugin-transform-remove-strict-mode"]
                }
            },
            {
               test: /\.css$/,
                loader: "style-loader!css-loader" //<--(short for style-loader!css-loader)
             },
             {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
              /*  options: {
                      name: '[name].[ext]?[hash]'
                       }*/
               
             },
             
             { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
	   
        
        ]
    },
	/*plugins:[ new webpack.optimize.SplitChunksPlugin({
		cacheGroups: {
        appJs: {
          test: /[\\/](react|react-dom)[\\/]/,
          name: 'vendors',
          chunks: 'all'
	      },
		  default:false,
		  }
	})
	
	]*/
	/*optimization: {
    splitChunks: {
      cacheGroups: {
        comm: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
		jscom:
		  {
			  test:/\/app\/js\//,
			  name: 'ven',
			   chunks: 'all',
		  }
      },
	  
    }
	
	
  },*/
  /*optimization: {
	  minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        
      }),
    ],
  },*/    
   // mode:"production",
	//devtool: NODE_ENV=="development"?"source-map":"cheap-source-map",

	
}