import React, {Component} from 'react';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {ThemeProvider} from '@material-ui/styles';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import Routes from './Routes';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {EntityStore} from "./contexts/entity.context";
import {UserStore} from "./contexts/user.context";
import {LoginStore} from "./contexts/login.context";
import {LoadingStore} from "./contexts/loading.context";

const browserHistory = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <LoadingStore>
          <LoginStore>
            <Router history={browserHistory}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <UserStore>
                  <EntityStore>
                    <Routes/>
                  </EntityStore>
                </UserStore>
              </MuiPickersUtilsProvider>
            </Router>
          </LoginStore>
        </LoadingStore>
      </ThemeProvider>
    );
  }
}
