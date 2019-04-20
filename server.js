const express = require("express");
const Twit = require('twit');
const cors = require("cors");
const path = require('path');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();


var T = new Twit({
  consumer_key: 'EOhSiU8UxzMHA8kxTSeiB8DM1',
  consumer_secret: 'MWBQrTHOJlU9YiXxVjOYEw18eE2QmkSk2biLDWWsLZ9Sxudvan',
  access_token: '1117217843672543232-ogNNzGiZ3eY6YuAfEWu7eudf6a87JZ',
  access_token_secret: '9ptbrNPewHKCZl6fwTLkgi7NmCwAqUZwBAk7HkhDIumpj'
});
 

//if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
//}
app.use("/api", router);
router.get("/searchTweets", (req, res) => {
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