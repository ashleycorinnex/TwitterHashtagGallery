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
    searchTemp: '',
    posts: [],
    showGallery: false,
    timer: null
  };

  render() {
    const { showGallery } = this.state;

    return (
      <Grid container 
            justify={showGallery ? 'flex-start' : 'center'}
            alignItems={showGallery ? 'flex-start' : 'center'}
            direction="column"
            id="grid">
        { showGallery ? this.galleryComponent() : this.formComponent() }
      </Grid>
    );
  }

  formComponent = () => {
    return (
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
    );
  };

  galleryComponent = () => {
    const { event, hashtag, search } = this.state;
    return (
      <Grid direction="column" container>
      <Grid container justify="space-between" alignItems="center" className="pl-2">
        <Grid item>
          <h1 className="header">{event || 'Event Name'}</h1>
          <h2 className="subheader">
            <strong className="xs-block mr-2">#{hashtag || 'Hashtag'}</strong>
            <span className="grey--text">
              <strong>{this.filteredPosts().length}</strong> Posts 
              <span className="ml-2">{'//'}</span>
              <strong className="ml-2">{this.filteredPosts().map(x => x.user.screen_name).filter((value, index, self) => self.indexOf(value) === index).length}</strong> Users
              <br/>
              <small>{search != '' ? `Searching handles with '${search}'` : ''}</small>
            </span>
          </h2>
        </Grid>
        <Grid>
          <form onSubmit={this.handleSearch}>
              <TextField
                label="Search"
                margin="none"
                variant="outlined"
                name="searchTemp"
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
        {this.filteredPosts().map(post =>  
          this.renderGalleryItem(post)
        )}
      </Grid>
      </Grid>
    )
  }

  renderGalleryItem(item, i) {
    return (
      <Card key={item.id} className="post" square elevation={0}>
        <CardMedia
          className="post-image"
          image={item.entities.media[0].media_url}
        />
        <CardContent className="post-overlay">
          <List className="post-user">
          <ListItem>
              <ListItemAvatar className="post-avatar">
                <Avatar src={item.user.profile_image_url} />
              </ListItemAvatar>
              <ListItemText primary={item.user.screen_name} secondary={moment(item.created_at, 'ddd MMM DD HH:mm:ss Z YYYY').fromNow()} />
              <ListItemSecondaryAction>
                <FontAwesomeIcon icon={['fab', 'twitter']} size="lg" className="mr-2"/>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <Button
            className="button outlined"
            size="large"
            onClick={() => { window.open(`https://twitter.com/statuses/${item.id_str}`, '_blank') }}
            variant="outlined">
            View Post
          </Button>
        </CardContent>
      </Card>
    )
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSearch = (event) => {
    event.preventDefault();

    const { searchTemp } = this.state;
    this.setState({search: searchTemp})
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({showGallery: true});
    this.searchTweets();

    var vm = this;
    this.setState({timer: setInterval(function() {
      vm.searchTweets();
    }, 15000)});
  }

  filteredPosts = () => {
    const { search, posts } = this.state;
    return posts.filter(p=>p.search == '' || p.user.screen_name.toLowerCase().indexOf(search.toLowerCase()) > -1);
  }

  searchTweets = () => {
    const { hashtag, posts} = this.state;
    var vm = this;
    fetch(`http://localhost:3001/api/searchTweets?hashtag=${hashtag || 'Hashtag'}&since=${posts.length > 0 ? posts[0].id : ''}`)
    .then(data => data.json())
    .then(function (response) {
      var newPosts = response.statuses.filter(x=> x.entities  && x.entities.media && x.entities.media.length && !posts.find(p=>p.id == x.id)); 
      vm.setState({ posts: [...newPosts, ...posts]});
    }).catch(function (response) {
        console.log(response);
    });
  };
}

export default App;