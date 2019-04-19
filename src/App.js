import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons' 
import moment from 'moment';

library.add(faTwitter); 


class App extends Component {
  state = {
    event: '',
    hashtag: '',
    search: '',
    gallery: false,
    posts: [],
    users: []
  };

  searchTweets = () => {
    var vm = this;
    fetch(`http://localhost:3001/api/searchTweets/${vm.state.hashtag || 'Hashtag'}`)
    .then(data => data.json())
    .then(function (response) {
      var posts = response.statuses.filter(x=> 
        x.entities != null && x.entities.media != null && x.entities.media[0] != null   //has image
        && (vm.state.search == '' || x.user.screen_name.toLowerCase().indexOf(vm.state.search.toLowerCase()) > -1)); //searched?
      vm.setState({ posts: posts });
      vm.setState({ users: posts.map(x => x.user.screen_name).filter((value, index, self) => self.indexOf(value) === index)});
    }).catch(function (response) {
        console.log(response);
    });
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.searchTweets();
    this.setState({gallery: true});
  }

  render() {
    const { event, hashtag, gallery, posts, users} = this.state;

    return (
      <Grid container 
            justify={gallery ? 'flex-start' : 'center'}
            alignItems={gallery ? 'flex-start' : 'center'}
            direction="column"
            id="grid">
        {!gallery ? 
        <form onSubmit={this.handleSubmit}>
            <TextField
              label="Event Name"
              margin="normal"
              variant="outlined"
              name="event"
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              label="Hashtag"
              margin="normal"
              variant="outlined"
              name="hashtag"
              fullWidth
              onChange={this.handleChange}
            />
          <Button
            className="button"
            type="submit"
            fullWidth
            variant="contained"
            size="large">
            Start Event
          </Button>
        </form>
        :
        <Grid direction="column" container>
          <Grid container justify="space-between">
            <Grid item>
              <h1 className="header">{event || 'Event Name'}</h1>
              <h2 className="subheader">
                <strong>#{hashtag || 'Hashtag'}</strong>
                <span className="grey--text">
                  <strong className="ml-2">{posts.length}</strong> Posts 
                  <span className="ml-2">{'//'}</span>
                  <strong className="ml-2">{users.length}</strong> Users
                </span>
              </h2>
            </Grid>
            <Grid>
              <form onSubmit={this.handleSubmit}>
                  <TextField
                    label="Search"
                    margin="none"
                    variant="outlined"
                    name="search"
                    onChange={this.handleChange}
                  />
                <Button
                  className="button black ml-2"
                  type="submit"
                  size="large"
                  variant="contained">
                  Search
                </Button>
              </form>     
            </Grid>
          </Grid>
          <Grid container>
            {posts.map(post =>  
              <Card key={post.id} className="post" square elevation={0}>
                  <CardMedia
                    className="post-image"
                    image={post.entities.media[0].media_url}
                  />
                  <CardContent className="post-overlay">
                  <List className="post-user">
                  <ListItem>
                      <ListItemAvatar className="post-avatar">
                        <Avatar src={post.user.profile_image_url} />
                      </ListItemAvatar>
                      <ListItemText primary={post.user.screen_name} secondary={moment(post.created_at, 'ddd MMM DD HH:mm:ss Z YYYY').fromNow()} />
                      <ListItemSecondaryAction>
                        <FontAwesomeIcon icon={['fab', 'twitter']} size="lg" className="mr-2"/>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                  <Button
                      className="button outlined"
                      size="large"
                      onClick={() => { window.open(`https://twitter.com/statuses/${post.id_str}`, '_blank') }}
                      variant="outlined">
                      View Post
                    </Button>
                  </CardContent>
                </Card>
            )}
          </Grid>
          </Grid>
        }
      </Grid>
    );
  }
}

export default App;