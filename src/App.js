import React, { Component } from "react";

class App extends Component {
  state = {
    tweets: [],
  };

  componentDidMount() {
    this.getTweetsFromDb();
  }

  componentWillUnmount() {

  }

  getTweetsFromDb = () => {
    fetch("http://localhost:3001/api/getTweets")
      .then(data => data.json())
      .then(res => this.setState({ tweets: res.data }));
  };

  render() {
    const { tweets } = this.state;
    return (
      <div>
        <ul>
          {tweets.length <= 0
            ? "NO DB ENTRIES YET"
            : tweets.map(dat => (
                <li style={{ padding: "10px" }} key={dat.message}>
                  <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
                  <span style={{ color: "gray" }}> data: </span>
                  {dat.message}
                </li>
              ))}
        </ul>
      </div>
    );
  }
}

export default App;