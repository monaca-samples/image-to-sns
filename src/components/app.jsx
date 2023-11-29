import React from 'react';

import {
  App,
  Views,
  View,
  Toolbar,
  Link,
} from 'framework7-react';

import routes from '../js/routes';
import store from '../js/store';

const MyApp = () => {
  // Framework7 Parameters
  const f7params = {
    name: 'framework7-v8-react-tab-view', // App name
      theme: 'auto', // Automatic theme detection
      // App store
      store: store,
      // App routes
      routes: routes,
  };

  return (
    <App { ...f7params }>

        {/* Views/Tabs container */}
        <Views tabs className="safe-areas">
          {/* Tabbar for switching views-tabs */}
          <Toolbar tabbar icons bottom>
            <Link tabLink="#view-home" tabLinkActive iconIos="f7:house_fill" iconMd="material:home" text="Home" />
            <Link tabLink="#view-history" iconIos="f7:square_list_fill" iconMd="material:view_list" text="History" />
          </Toolbar>

          {/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
          <View id="view-home" main tab tabActive url="/" />

          {/* History View */}
          <View id="view-history" name="history" tab url="/history/" />

        </Views>
    </App>
  )
}
export default MyApp;