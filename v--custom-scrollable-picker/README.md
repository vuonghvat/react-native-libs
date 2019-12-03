# v--calendar-react-native



[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)


This is a library that allows you to customize a scrollable picker
Use on both android and ios

# Install

    npm install v--custom-scrollable-picker --save

# Usage


```javascript
  import VScrollPicker from 'v--custom-scrollable-picker';
  


  <VScrollPicker
          activeStyle={{
            color: 'red',
            fontSize: 30,
            fontWeight: 'bold',
          }}
          notActiveStyle={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
          }}
          onValueChange={(value, index) => {
             console.log(value + '-' + index);
          }}
          data={[1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20]}
          height={700}
          itemShowNumber={10}
 	  styleLine = {{backgroundColor:"blue", height:5}}
        />
		
```
* Props Example:
 - activeStyle: Customize the selected item style.
 - notActiveStyle: Custom item style is not selected.
 - onValueChange: Returns index and value.
 - data: A list of data.
 - height: The height of the picker.
 - itemShowNumber: The number of items to display in the picker.
 - styleLine: Customize twos line

![alt text](https://firebasestorage.googleapis.com/v0/b/nhacsongnao-a1cff.appspot.com/o/ezgif.com-video-to-gif.gif?alt=media&token=e6494438-3ae5-49a3-bc54-5180ba9ed7b7)
Create by: Vuong Nguyen - 2019



