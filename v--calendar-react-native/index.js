import * as NativeBase from 'native-base';
 import PropTypes from 'prop-types'
import React, {Component, PureComponent} from 'react';
import {
  View,
  Dimensions,
} from 'react-native';
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const WINDOW_WIDTH = Dimensions.get('window').width;
class VCalendar extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeDate: new Date(),
      currentDate:  new Date(),
      matrix: [],
      firstDay:0,
    };
  }

  generateMatrix = () => {
    let { activeDate } = this.state;
    var matrix = [];
    // Create header
    if (this.props.weekDays) {
       matrix[0] = this.props.weekDays;
    }else
      matrix[0] = weekDays;
    //console.log(matrix);


    // More code here
    var year = activeDate.getFullYear();
    var month = activeDate.getMonth();
    // get ngay dau trong tuan dau tien
    var firstDay = new Date(year, month, 1).getDay();

    var maxDays = nDays[month];
    var maxDayPrevious = nDays[month - 1];
    let startDayNextNumber = 42 - maxDays - firstDay
   
    if (month == 1) {
      // February
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }
    var counter = 1;
    var counterPrevious = maxDayPrevious - firstDay;
    console.log(firstDay);
    
    var counterNext = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = 0;
        if (row == 1 && col < firstDay && maxDayPrevious) {
       
          
          matrix[row][col] = "-" + counterPrevious++;
        }
        
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          matrix[row][col] = counter++;
        }
        if (counter > maxDays) {
                  matrix[row][col] = "+"+counterNext++;
                }

      }
    }
    this.setState({
      matrix,
      firstDay,
      startDayNextNumber,
    });
  };
  componentDidMount() {
    this.generateMatrix();
  }
  changeMonth = n => {
     
    this.state.activeDate.setMonth(this.state.activeDate.getMonth() + n)
    this.setState(this.state);
    this.generateMatrix();
  };
  next = () => {
    this.changeMonth(+1);
  };
  previous = () => {
    this.changeMonth(-1);
  };
  onPressItem = (d) => {
    
       this.state.activeDate.setDate(d);
       this.setState(this.state);
       this.generateMatrix();
    
  }
  render() {
    let { activeDate, matrix, firstDay, startDayNextNumber } = this.state;
  
    return (
      <View style={this.props.style}>
        {this.props.renderView(
          matrix,
          activeDate,
        )}
      </View>
    );
  }
}
VCalendar.propTypes = {
  renderView: PropTypes.func.isRequired

};


export default VCalendar;
