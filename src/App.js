import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Main from './components/main';
import AppBar from './components/appbar';

class App extends Component {



  render() {
    return (
      <MuiThemeProvider>
		<div>
      		<AppBar title={"Brands Dashboard"} />
        	<Main />
      	</div>
      </MuiThemeProvider>
    );
  }
}

export default App;