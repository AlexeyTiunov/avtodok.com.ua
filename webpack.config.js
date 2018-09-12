 var path = require('path');

var entryArray=[]; 
entryArray.push('./app/js/detect_mobile.js');
//entryArray.push("./app/my.jsx");
entryArray.push("./app/sidebar_li.js");
entryArray.push("./app/sidebar.js");
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
//entryArray.push('bootstrap/dist/js/bootstrap.js');
//entryArray.push('bootstrap/dist/css/bootstrap.min.css');

 
module.exports = {                
  //  entry: "./app/my.jsx", // входная точка - исходный файл
   entry: entryArray,
   // entry:"/\.\/app\/.*\.js.*$/",
    output:{
        path: path.resolve(__dirname, './public'),     // путь к каталогу выходных файлов - папка public
        publicPath: '/public/',
        filename: "bundle.js"       // название создаваемого файла
    },
    module:{
        rules:[   //загрузчик для jsx
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
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }
        
        ]
    },
    mode:"development"
}