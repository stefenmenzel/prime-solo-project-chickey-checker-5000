import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import {MuiThemeProvider} from "@material-ui/core/styles";
import theme from '../../theme/muiTheme.js';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import Dashboard from '../Dashboard/Dashboard.js';
import Alerts from '../Alerts/Alerts.js';
import NewAlertForm from '../Alerts/NewAlertForm.js';
import HistoricData from '../HistoricData/HistoricData.js';
import Profile from '../Profile/Profile.js';

import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Nav />
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/dashboard" />
              {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
              <Route
                exact
                path="/about"
                component={AboutPage}
              />
              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              <ProtectedRoute
                exact
                path="/home"
                component={UserPage}
              />
              {/* This page will display all the information for the current readings from the chickey checker 5000 */}
              <ProtectedRoute
                exact
                path="/dashboard"
                component={Dashboard}
              />
              {/* This page will show the user all the currently set alerts and will have a button for the user to create new ones. */}
              <ProtectedRoute
                exact
                path="/alerts"
                component={Alerts}
              />
              {/* This page will give the user the opportunity to create a new alert...not accessible from the nav */}
              <ProtectedRoute
                exact
                path="/newAlert"
                component={NewAlertForm}
              />
              {/* This page will show the user historic data...
            will also allow the user to see average data across different intervals of time. */}
              <ProtectedRoute
                exact
                path="/historicData"
                component={HistoricData}
              />
              {/* This page will allow the user to update their contact information...
            and maybe in the future, the coops they're connected to. */}
              <ProtectedRoute
                exact
                path="/profile"
                component={Profile}
              />
              {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
              <ProtectedRoute
                exact
                path="/info"
                component={InfoPage}
              />
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </MuiThemeProvider>
  )}
}

export default connect()(App);
