import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Navigation from './Navigation';
import Notification from '../../components/Notifications/Notification';
import NotificationsApi from '../../data/NotificationsApi';
import utils from '../../core/utils';

class Layout extends React.Component {
  constructor() {
    super();
    this.setNotifications = this.setNotifications.bind(this);
  }

  state = { notifications: [] }

  componentWillMount() {
    this.setNotifications();
  }

  setNotifications = () => {
    this.setState({ notifications: NotificationsApi.getNotifications() });
  }

  headerClass() {
    if (utils.inCockpit) { return 'hidden-nav'; }
    return '';
  }

  render() {
    return (
      <div className={this.headerClass()}>
        <Header />
        <Navigation />
        {this.state.notifications &&
          <div className="toast-notifications-list-pf">
            {this.state.notifications.map((notification, i) =>
              <Notification
                notification={notification}
                id={i}
                key={i}
                setNotifications={this.setNotifications}
              />
            )}
          </div>
        }
        <div className={this.props.className}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  className: PropTypes.string,
  notifications: PropTypes.array,
  children: PropTypes.node,
};

export default Layout;
