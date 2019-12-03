# v--calendar-react-native



[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)


The V calendar is a library that gives full control over it, meaning you can customize the details.

# Install

    npm install v--calendar-react-native --save

# Usage


```javascript
  import VCalendar from "v--calendar-react-native";
  
const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  <VCalendar
          weekDays={weekDays}
          ref={"calendar"}
          renderView={(matrix,activeDate,) =>
          this.renderView(matrix,activeDate)
          }
        />
		
```
* RenderView Example:

```javascript
  renderView = (matrix, activeDate) => {
    let calendar = matrix.map((row, rowIndex) => {
      var rowItems = row.map((item, colIndex) => {
        let color = "black";
        let bgColor = null;
        let fontWeight = "normal"
        let fontsize = 16;
        let borderWidth = 0;
        let borderColor = null;
        if (rowIndex >= 1) {
          if (typeof item === "string") {
                 item = item.substring(1, item.length);
            color = "#cecece";
          } else {
                 if (item == activeDate.getDate()) {
                   fontWeight = "bold";
                   fontsize = 18;
                   bgColor = "#f7b382";
                 } else if (item === new Date().getDate() && activeDate.getMonth() === new Date().getMonth()) {
                   borderWidth = 1;
                   borderColor = "black";
                 }
          }
        } else {
          fontWeight = "bold"
               fontsize = 20;
        }
        return (
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 40,
              justifyContent: "center",
              backgroundColor: bgColor,
              borderWidth: borderWidth,
              borderColor:borderColor
            }}
          >
            <Text
              onPress={() => {
                if (typeof item !== "string") {
                  this.refs.calendar.onPressItem(item);
                }
              }}
              style={{
                textAlign: "center",
                justifyContent: "center",
                color: color,
                fontSize: fontsize,
                fontWeight: fontWeight,
                borderRadius: item == activeDate.getDate() ? 200 : 0,
              }}
            >
              {item != 0 ? item : ""}
            </Text>
          </View>
        );
        });
```
*  Update when press Item Calendar: 
```javascript
  this.refs.calendar.onPressItem(item);
```
* Previous and next  calendar:

```javascript
   this.refs.calendar.next();
   this.refs.calendar.previous();
```
![alt text](https://firebasestorage.googleapis.com/v0/b/nhacsongnao-a1cff.appspot.com/o/1575010814898.JPEG?alt=media&token=fe8bf344-47d7-4b95-a5aa-13609697217d)
Create by: Vuong Nguyen


