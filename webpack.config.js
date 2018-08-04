var path = require('path');

var entryArray=[];
//entryArray.push("./app/my.jsx");
entryArray.push("./app/sidebar_li.js");
entryArray.push("./app/sidebar.js");



 
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
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    presets:["env", "react"]    // используемые плагины
                }
            },
            {
                test: /\.js?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    presets:["env", "react"]    // используемые плагины
                }
            },
            {
               test: /\.css$/,
                loader: "style-loader!css-loader" //<--(short for style-loader!css-loader)
             }
        ]
    },
    mode:"development"
}