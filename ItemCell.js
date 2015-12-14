var React = require('react-native');


var {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback
} =  React

var ItemCell = React.createClass({

  getInitialState : function(){
    return {
      count : 0
    }
  },

  _onItemAdded : function(){

    this.setState({
      count : this.state.count + 1
    })

    this.props.onItemAdded()
  },

  _onItemRemoved : function(){

    if(this.state.count == 0){
      return;
    }

    this.setState({
      count : this.state.count <= 1 ? 0 : this.state.count - 1
    })

    this.props.onItemRemoved()
  },


  render : function(){

    var TouchableElement = TouchableHighlight;

    if(Platform.OS === 'android'){
      TouchableElement = TouchableNativeFeedback
    }

    return(
      <View style={{padding : 8, flexDirection : 'row'}}>
        <Image
          style={{height : 64, width : 64}}
          source={{uri : this.props.thumbnail}}
          />
        <View style={{flexDirection : 'column',flex : 0.8 }}>
            <Text style={{marginLeft : 10,fontWeight:'400',color : 'black', fontSize: 14}}>
              {this.props.title}
            </Text>
            <Text style={{marginLeft : 10,fontWeight:'100',fontSize: 10}}>
              {this.props.unit}
            </Text>
            <Text style={{marginLeft : 10,fontWeight:'300',color : 'black',fontSize: 12}}>
              Rs. {this.props.price}
            </Text>
        </View>
        <View style={styles.quantity}>
          <TouchableElement
            onPress={this._onItemRemoved}>
            <View style={styles.circle} >
              <Text style={styles.circleText}>-</Text>
            </View>
          </TouchableElement>
          <Text style={{textAlign : 'center', paddingRight : 4, paddingLeft : 4,color : 'black'}}>
            {this.state.count}
          </Text>
          <TouchableElement
            onPress={this._onItemAdded}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>+</Text>
            </View>
          </TouchableElement>
        </View>
      </View>
    )
  }
})

var styles = StyleSheet.create({
  quantity : {
    flex : 0.2,
    flexDirection : 'row',
    alignSelf : 'center',
    justifyContent : 'center',
    marginRight : 5

  },
  circle : {
    height : 30 ,
    width  : 30 ,
    borderRadius : 15,
    borderWidth : 0.5,
    justifyContent : 'center'
  },
  circleText : {
    textAlign : 'center',
    color : 'black'
  }
});

module.exports = ItemCell
