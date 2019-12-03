import PropTypes from 'prop-types';
import React, {Component, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
class VScrollPicker extends PureComponent {
  static navigationOptions = {
    header: null,
  };
  static propTypes = {
    style: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
    let {itemShowNumber, height} = this.props;

    this.state = {
      selectedIndex: Math.round(itemShowNumber / 2) - 1,
      arrOffset: [],
    };
  }

  onLayout = (e, index) => {
    let {arrOffset} = this.state;
    arrOffset[index] = e.nativeEvent.layout.y;
    this.setState({
      arrOffset,
    });
  };

  scrollToIndex = index => {
    let {itemShowNumber} = this.props;
    let {arrOffset} = this.state;

    let numberItemEmpty = Math.round(itemShowNumber / 2);

    this.refs.vScrollPicker.scrollTo({
      x: 0,
      y: arrOffset[index - (numberItemEmpty - 1)],
      animated: true,
    });

    this.setState({selectedIndex: index});
    if (this.props.onValueChange) {
      const selectedValue = this.props.data[index - (numberItemEmpty - 1)];
      this.props.onValueChange(selectedValue, index - (numberItemEmpty - 1));
    }
  };
  onMomentumScrollEnd = e => {
    let {itemShowNumber, height} = this.props;
    let offset = 0;
    if (e.nativeEvent.contentOffset) {
      //console.log('offfset: ' + e.nativeEvent.contentOffset.y);
      offset = e.nativeEvent.contentOffset.y;
    }
    let itemHeight = height / itemShowNumber;
    let numberItemEmpty = Math.round(itemShowNumber / 2);
    let selectedIndex = Math.round(offset / itemHeight);
    this.setState({
      selectedIndex: selectedIndex + numberItemEmpty - 1,
    });
    if (this.props.onValueChange) {
      const selectedValue = this.props.data[selectedIndex];
      this.props.onValueChange(selectedValue, selectedIndex);
    }
  };
  renderItem = offset => {
    let {selectedIndex} = this.state;
    let {data, itemShowNumber} = this.props;
    let empty = [];
    for (var i = 0; i < itemShowNumber / 2 - 1; i++) {
      empty.push(null);
    }
    if (data.length > 0) {
      if (offset === 1) {
        data = empty
          .concat(data)
          .concat(empty)
          .concat([null]);
      } else {
        data = empty.concat(data).concat(empty);
      }
      return data.map((e, index) => {
        let isSelected = selectedIndex === index;

        var style = {
          color: '#cecece',
          fontSize: 20,
          fontWeight: 'bold',
        };

        if (isSelected) {
          if (this.props.activeStyle) {
            style = this.props.activeStyle;
          } else {
            style = {
              color: 'black',
              fontSize: 25,
            };
          }
        } else {
          if (this.props.notActiveStyle) {
            style = this.props.notActiveStyle;
          }
        }
        return (
          <TouchableOpacity
            onPress={() => {
              this.scrollToIndex(index);
            }}
            onLayout={e => this.onLayout(e, index)}
            style={[
              styles.defaultContainerStyle,
              {height: this.props.height / this.props.itemShowNumber},
              this.props.containerItemStyle,
            ]}>
            <Text style={[{textAlign: 'center'}, style]}>{e}</Text>
          </TouchableOpacity>
        );
      });
    }
    return <Text style={{textAlign: 'center'}}>empty</Text>;
  };

  render() {
    let {itemShowNumber, height} = this.props;
    let heightItem = height / itemShowNumber;
    let offset = 0;
    if (itemShowNumber % 2 === 0) {
      offset = 1;
    }
    return (
      <View>
        <ScrollView
  	  showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          scrollEventThrottle={16}
          ref={'vScrollPicker'}
          snapToInterval={heightItem}
          snapToAlignment={'center'}
          style={[
            styles.styleScrollview,
            {height: this.props.height},
            this.props.style,
          ]}>
          {this.renderItem(offset)}
        </ScrollView>
        <View style={styles.overlayContainer}>
          <View
            style={[
              styles.lineOverlay,
              {top: Math.round(itemShowNumber / 2) * heightItem},
              this.props.styleLine,
            ]}
          />
          <View
            style={[
              styles.lineOverlay,
              {
                bottom: (Math.round(itemShowNumber / 2) + offset) * heightItem,
              },
              this.props.styleLine,
            ]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lineOverlay: {
    width: '100%',
    position: 'absolute',
    height: 0.5,
    backgroundColor: 'black',
  },
  overlayContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  styleScrollview: {
    height: 150,
  },
  defaultContainerStyle: {
    justifyContent: 'center',
  },
});

export default VScrollPicker;

