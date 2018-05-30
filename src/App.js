import React, {Component} from 'react';
import './App.css';
import netlifyIdentity from "netlify-identity-widget"

class LambdaDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: false, msg: null};
  }


  handleClick = (e) => {
    e.preventDefault();

    this.setState({loading: true});
    fetch('/.netlify/functions/hello')
        .then(response => response.json())
        .then(json => this.setState({loading: false, msg: json.msg}));
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
    console.log("HERE DAVE")
    e.preventDefault();
    netlifyIdentity.open();
  }

  render() {
    console.log('current_user is',netlifyIdentity.currentUser())
    return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p><a href="#" onClick={this.handleIdentity}>User Login</a></p>
          <LambdaDemo/>
        </div>
    );
  }
}

export default App;