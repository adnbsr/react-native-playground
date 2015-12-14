'use strict'


var React = require('react-native')
var ItemCell = require('./ItemCell')
var Data = require('./data.json')
var moment = require('moment')
var _ = require('lodash')

var {
  Text,
  View,
  Image,
  StyleSheet,
  ListView,
  Platform
} = React

var DeliveryScreen = React.createClass({

  getInitialState : function(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      dataSource: ds.cloneWithRows(Data),
      selected : 0,
      price    : 0
    }
  },

  _onItemAdded : function(item){

    this.setState({
      selected : this.state.selected + 1,
      price : this.state.price + item.price
    })

  },

  _onItemRemoved : function(item : Object){
    this.setState({
      selected : this.state.selected <= 1 ? 0 : this.state.selected - 1,
      price : this.state.price <= item.price ? 0 : this.state.price - item.price
    })
  },

  _filter : function(item,rowId){
    var index = this.state.selectedItems.filter(function(i){
      i === item;
    }).length;

    var items = this.state.selectedNumber;
    items[rowId] = index;
    console.log(items);
    return items;
  },

  _getNumber : function(rowId: number){
    console.log(rowId);
    return this.state.lastIndex
  },

  _renderRow : function(row : Object, sectionId : number, rowId : number){


    return (
      <ItemCell
        onItemAdded = {() => this._onItemAdded(row)}
        onItemRemoved = {() => this._onItemRemoved(row)}
        title={row.title}
        thumbnail={row.thumbnail}
        unit = {row.unit}
        price = {row.price}
        />
    )
  },

  render : function(){

    var marginTop = 0

    if(Platform.OS === 'ios'){
      marginTop = 60
    }

    return (
        <View style={{flexDirection : 'column', marginTop : marginTop}}>
          <ResultView selected={this.state.selected} price={this.state.price}/>
          <View style={{height : 1,backgroundColor : 'black'}}></View>
          <ListView
            automaticallyAdjustContentInsets={false}
            vertical = {true}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            />
        </View>
    )
  }
})

var ResultView = React.createClass({


  render : function(){

    var date = moment().format('ddd, h a')

    return (
      <View style={styles.result}>
      <View style={styles.resultItem}>
        <Image
          style = {styles.resultIcon}
          source = {require('image!ic_shopping_cart_black')}
          />
        <Text style={{textAlign : 'center'}}> {this.props.selected} Items</Text>
      </View>
        <View style={styles.resultItem}>
          <Image
            style = {styles.resultIcon}
            source = {require('image!ic_account_balance_black')}
            />
          <Text style={{textAlign : 'center'}}>Rs. {this.props.price}</Text>
        </View>

        <View style={styles.resultItem}>
          <Image
            style = {styles.resultIcon}
            source = {require('image!ic_date_black')}
            />
          <Text style={{textAlign : 'center'}}>{date}</Text>
        </View>

      </View>
    )
  }
})

var styles = StyleSheet.create({
  menuItem : {
    color : 'black'
  },
  result : {
    flexDirection : 'row',
    padding : 30
  },
  resultItem : {
    flex : 0.33
  },
  resultIcon : {
    alignSelf : 'center',
    height : 40,
    width  : 40
  }
})

module.exports = DeliveryScreen
