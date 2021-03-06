import React from 'react';
import Link from '../Link';
import history from '../../core/history';
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "Pf*" }]*/
// without these imports the entire app will produce an error when loaded
import PfBreakpoints from './PfBreakpoints';
import PfVerticalNavigation from './PfVerticalNavigation';

class Navigation extends React.Component {

  componentDidMount() {
    // Initialize the vertical navigation
    $().setupVerticalNavigation(true);
  }

  handleNavClick = (e) => {
    $(e.target).tooltip('hide');
  }

  render() {
    const location = history.getCurrentLocation();
    return (
      <div className="nav-pf-vertical">
        <ul className="list-group">
          <li
            className={`list-group-item ${
              location.pathname === '/home' || location.pathname === '/' ? ' active' : ''}`
            }
          >
            <Link to="/home">
              <span
                className="fa fa-dashboard"
                data-toggle="tooltip"
                title="Overview"
                onClick={(e) => this.handleNavClick(e)}
              >
              </span>
              <span className="list-group-item-value">Overview</span>
            </Link>
          </li>
          <li className={`list-group-item${location.pathname === '/recipes' ? ' active' : ''}`}>
            <Link to="/recipes">
              <span
                className="fa fa-shield"
                data-toggle="tooltip"
                title="Recipes"
                onClick={(e) => this.handleNavClick(e)}
              >
              </span>
              <span className="list-group-item-value">Recipes</span>
            </Link>
          </li>
          <li className={`list-group-item${location.pathname === '/users' ? ' active' : ''}`}>
            <Link to="/users">
              <span
                className="fa fa-space-shuttle"
                data-toggle="tooltip"
                title="Users"
                onClick={(e) => this.handleNavClick(e)}
              >
              </span>
              <span className="list-group-item-value">Users</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }

}

export default Navigation;
