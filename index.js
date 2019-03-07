var express = require('express')
var app = express();
var request = require('request');
var path = require('path');

app.use(express.urlencoded());
app.use(express.json());
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'k1085317',
  database : 'kisapay'
});
 

 

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/index',function(req,res){
    res.render('home');
})

app.get('/signup',function(req,res){
    res.render('signup');
})


app.get('/authResult',function(req,res){
   var auth_code = req.query.code;
   var getTokenUrl = "https://testapi.open-platform.or.kr/oauth/2.0/token"
   var option = {
       method : "POST",
       url : getTokenUrl,
       headers : {
           "Content-Type" : "application/x-www-form-urlencoded;charset=UTF-8"
       },
       form : {
            code : auth_code,
            client_id : "l7xx8ad483752dcd4a1997613f36ce1f4562",
            client_secret : "6f39ff2a30db48d695e27ef6959eb29e",
            redirect_uri : "http://localhost:3000/authResult",
            grant_type : "authorization_code"

       }
   };
   request(option,function(err,response,body){
       if(err)throw err;
       else{
           console.log(body);
           var accessRequesetResult= JSON.parse(body);
           res.render('resultChild',{data : accessRequesetResult});
       }
   })
   console.log(auth_code);

})

app.post('/join', function(req, res){
    var name = req.body.name;
    var id = req.body.id;
    var password = req.body.password;
    var accessToken =req.body.accessToken;
    var refreshToken = req.body.refreshToken;
    var userseqnum = req.body.userseqnum;
    connection.connect();
    connection.query('INSERT into user(userid,username,userpassword,accessToken,refreshToken,userseqnum) values(?,?,?,?,?,?) ',[id,name,password,accessToken,refreshToken,userseqnum], function (error, results, fields) {
    if (error){ 
        throw error;
    }
    else{
         res.json(1);
        
    }
  });
  connection.end();
})

app.get('/user',function(req,res){
    var accessToken = "191b2bf1-1d87-45d2-a8ae-387b372b814a";
    var requestURL = "https://testapi.open-platform.or.kr/user/me?user_seq_no=1100034850";
    var option = {
        method :"GET",
        url : requestURL,
        headers : {
            "Authorization" : "Bearer " + accessToken   
        }
    }
    request(option,function(err,response,body){
        res.send(body);
    })
})

app.get('/balance',function(req,res){
    var accessToken = "191b2bf1-1d87-45d2-a8ae-387b372b814a";
    var requestURL = "https://testapi.open-platform.or.kr/v1.0/account/balance?fintech_use_num=199004072057725907018697&tran_dtime=20190307040000";

    var option = {
        method :"GET",
        url : requestURL,
        headers : {
            "Authorization" : "Bearer " + accessToken   
        }
    }
    request(option,function(err,response,body){
        var data = JSON.parse(body);
        res.json(data);
    })
})
app.get('/list',function(req,res){
    var accessToken = "191b2bf1-1d87-45d2-a8ae-387b372b814a";
    var qs = "?fintech_use_num=199004072057725907018697"+
    "&inquiry_type=A"+
    "&from_date=20160101"+
    "&to_date=20190307"+
    "&sort_order=D"+
    "&page_index=1"+
    "&tran_dtime=20190307043500"
   
    var requestURL = "https://testapi.open-platform.or.kr/v1.0/account/transaction_list"
    var option = {
        method : "GET",
        url : requestURL+qs,
        headers : {
         "Authorization" : "Bearer " + accessToken   
        }
    }
    request(option,function(err,response,body){
        var data = JSON.parse(body);
        res.json(data);
    })
})


app.listen(3000);
