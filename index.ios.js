/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} = React;

var DeliveryScreen = require('./DeliveryScreen')

var GrofersSubscription = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Upcoming Delivery',
          component: DeliveryScreen,
        }}
        />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : 'white'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GrofersSubscription', () => GrofersSubscription);
