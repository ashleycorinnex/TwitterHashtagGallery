const express = require("express");
const Twit = require('twit');
const cors = require("cors");
const path = require('path');

const API_PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
//const router = express.Router();
 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}
else{
  require('dotenv').config()
}

//app.use("/api", router);
var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

app.get("/api/searchTweets", (req, res) => {
  var params = {
    q: `#${req.query.hashtag} filter:images`,
    since_id: req.query.since,
    include_entities: true,
    count: 500,
  };
  T.get(`search/tweets`, params, function(error, data, response) {
    if(!error){
      return res.send(data);
    } else {
      console.log(error);
    }
  });
});


app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));