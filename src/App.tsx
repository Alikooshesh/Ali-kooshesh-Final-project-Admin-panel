import React from 'react';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import './App.css';
import {RtopLevelRoutes} from "./Routes/RtopLevelRoutes";
import CustomRoute from "./Component/routerMaker/customRoute";
import {createTheme, MuiThemeProvider} from "@material-ui/core";
import {green} from "@material-ui/core/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: '#10B981',
        },
        secondary:{
            main: '#EF4444'
        }
    },
});

function App() {
  return (
      <MuiThemeProvider theme={theme}>
          <Router>
              <Switch>
                  {RtopLevelRoutes.map((item , index) => {
                      return <CustomRoute key={`${item.path} + ${index}`} path={item.path} exact={item.exact} Component={item.Component} adminLoginReq={item.adminLoginReq}/>
                  })}
              </Switch>
          </Router>
      </MuiThemeProvider>
  );
}

export default App;
