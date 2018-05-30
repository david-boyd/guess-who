import React, {Component} from 'react';
import './App.css';
import netlifyIdentity from "netlify-identity-widget"

class LambdaDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: false, msg: null};
  }


  generateHeaders() {
    const headers = {"Content-Type": "application/json"};
    if (netlifyIdentity.currentUser()) {
      return netlifyIdentity.currentUser().jwt().then((token) => {
        return {...headers, Authorization: `Bearer ${token}`};
      })
    }
    return Promise.resolve(headers);
  }

  handleClick = (e) => {
    e.preventDefault();

    this.setState({loading: true});
    this.generateHeaders().then((headers) => {
      console.log('dave')
      fetch('/.netlify/functions/hello', {
        method: "POST",
        headers,
        body: JSON.stringify({
          text: this.state
        })
      })
      .then(response => {
        if (!response.ok) {
          response.text().then(err => {
            throw (err)
          });
        }
      })
      .then(() => this.setState({loading: false, text: null, success: true, error: null}))
      .catch(err => this.setState({loading: false, success: false, error: err.toString()}))
    })
  }


  render() {
    const {loading, msg} = this.state;
    return <p>
      <button onClick={this.handleClick}>{loading ? 'Loading...' : 'Call Lambda'}</button>
      <br/>
      <span>{msg}</span>
    </p>
  }
}

class App extends Component {
  componentDidMount() {
    netlifyIdentity.init();
  }

  handleIdentity = (e) => {
    console.log("HERE DAVE", netlifyIdentity.currentUser())
    e.preventDefault();
    netlifyIdentity.open();
  }


  render() {
    return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p><a href="#" onClick={this.handleIdentity}>User Stats</a></p>
          <LambdaDemo/>
        </div>
    );
  }
}

export default App;