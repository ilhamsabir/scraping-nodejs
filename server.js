var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'http://www.imdb.com/title/tt1229340/';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", release : "", rating : ""};

      $('.title_wrapper').filter(function(){
        var data = $(this);
        title = data.children().first().text().trim();
        release = data.children().last().children().last().text().trim();

        json.title = title;
        json.release = release;
      })

      $('.ratingValue').filter(function(){
        var data = $(this);
        rating = data.text().trim();

        json.rating = rating;
      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
});

app.get('/kompas', function(req, res){
  // Let's scrape Anchorman 2
  url = 'http://indeks.kompas.com/';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var judul, tanggal, isi;
      var json = { judul : "", tanggal : "", isi : ""};

       var judul_b = $('h3').text().trim();
       var tanggal_b = $('grey small').text().trim();
       var isi_b = $('p').text().trim();

        json.judul = judul_b;
        json.tanggal = tanggal_b;
        json.isi = isi_b;

    } 

    fs.writeFile('kompasnews.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
});

app.get('/kompasdetail/', function(req, res){
  // Let's scrape Anchorman 2
  url = 'http://nasional.kompas.com/read/2016/11/05/12390911/karena.kondisi.tanah.air.saat.ini.jokowi.tunda.kepergian.ke.australia';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var judul, tanggal, isi;
      var json = { judul : "", isi : ""};

       var judul_b = $('h2').text().trim();
      
       var isi_b = $('p').text().trim();

        json.judul = judul_b;    
        json.isi = isi_b;

    } 

    fs.writeFile('kompasnewsdetail.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
});

app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
});

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;