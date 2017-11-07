var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var express = require('express');
var app = express();
var serveAPI = function(){
  	responseData = [ ];
  	responseAttrs = [ ];
  	responseApi = [ ];
  	let api = [ ];
    let apiLoc = "http://45.55.13.138:1337/marketing";
    request(apiLoc, function (error, response, data) {
  // ship the data to our responseData variable
  responseData.push(data);
  // start cheerio DOM, and get ready to manipulate elements/attributes in the response
  var $ = cheerio.load(data);
  // var pLength = [ ]; // goes along with the loop theory for later use toDo
  var responseScope = $('body').map(function(index, element) {
    // toDo loop through Paragraphs, and fetch separately.
    // p = responseScope.p;
    // for(i=0;i<p.length;i++) {
    //   pLength.push(p[i]);
    //   console.log(pLength);
    // }
        return {
            body: $(element).find('body').text(),
            p: $(element).find('p').text(),
            link: $(element).find('a').attr('href'),
            img: $(element).find('img').attr('src'),
            // image_full: [ ],
        };
    }).get();
    ;
    // push our responseAttrs the raw JSON data received from responseScope
    responseAttrs.push(responseScope);
    console.log("responseScope: ");
    console.log(responseScope);
    console.log("\n");
    console.log("Data: ");
    console.log(data);
    let sensitive = JSON.parse(data);
    responseApi.push(sensitive);
        fs.writeFile(
                  "api/api.json",
                  responseApi,
                  "utf-8",
                  function(err) {
                    if (err) throw err;  
                  }
                ); 
    // these are here if we need to parse, or send to a string. optional.
    // var strproductAttrs = JSON.stringify(productAttrs);
    // var jsproductAttrs = JSON.parse(strproductAttrs);
    // console.log(jsproductAttrs);
});
   

    // reading users from API converted to json
fs.readFile("./api/api.json", "utf-8", function(err, data) {
  if (data) {
      var arrayOfApi = data;
      api.push(arrayOfApi);
    }
     if (err) console.log(err);
});
  }
setTimeout(serveAPI, 3000);

app.get('/api', function (req, res) {
    res.status(200).json(api);
});