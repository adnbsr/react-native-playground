
'use strict';

var React = require('react-native');
var { DrawerLayoutAndroid,
  ProgressBarAndroid,
  AppRegistry,
  Text,
  ToolbarAndroid,
  StyleSheet,
  View
} = React;

//Screens
var DeliveryScreen = require('./DeliveryScreen');

var App = React.createClass({
  render: function() {
    return (
      <View>
        <ToolbarAndroid
          navIcon = {require('image!ic_menu_black')}
          title="Upcoming Delivery"
          titleColor = "black"
          style = {styles.toolbar}
          actions={[{title: 'Settings', icon: require('image!ic_settings_black'), show: 'always'}]}
          onActionSelected={this.onActionSelected} />
        <DeliveryScreen/>
      </View>
    )
  },
  onActionSelected: function(position) {
    if (position === 0) { // index of 'Settings'
      console.log("hey from menu");
    }
  },
});


var styles = StyleSheet.create({
  toolbar : {
    backgroundColor : '#E0E0E0',
    height : 56,
  },
})


AppRegistry.registerComponent('GrofersSubscription', () => App);
