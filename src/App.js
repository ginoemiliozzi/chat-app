import React from 'react';
import './App.css';
import { Dashboard } from "./components/Dashboard";
import  Store from "./Store";
import theme from './ThemeProvider';
import { ThemeProvider } from '@material-ui/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Store>
        <Dashboard/>
      </Store>
    </div>
    </ThemeProvider>
  );
}

export default App;
