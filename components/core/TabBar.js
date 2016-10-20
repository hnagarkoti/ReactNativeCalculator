import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';


/**
 * TabBar
 *
 * TabBar component
 * Can have any no of childrens also
 *
 * @param {Style} style - Style of container View Component
 * @returns {undefined}
 */
export default class TabBar extends Component {

  static defaultProps = {
    items: [],
  }

  renderItem( item ){

    if( React.isValidElement(item) ){
      return item;
    }
    let out = [];
    if( item.icon ){
      out.push(<Icon key="tab-icon" {...item.icon} />);
    }
    if( item.text ){

      out.push(<Text key="tab-text" {...item.textParams} style={item.style} >{item.text}</Text>);
    }
    return out;
  }

  renderBody(){
    return this.props.items.map((v, i) => {
      return (
        <View key={'aatabbar-tabitem-' + i} style={[styles.item, ( React.isValidElement(v) ? v.props.containerStyle : v.containerStyle ) ]} >
          {this.renderItem(v)}
        </View>
        );
    });
  }

  render(){
    let props = this.props;
    console.log('props:-- ', this.props);
    return (
      <View style={ [ styles.tabBar, props.style ] }>
        {this.renderBody()}
      </View>
      );
  }

}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#F47920',
    height: 55,
  },
  item:{
    padding: 15,
    alignSelf: 'center',
  }
});
