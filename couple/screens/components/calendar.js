import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const carouselRef = useRef(null);
  const panGestureRef = useRef(null);

  const changeMonth = (offset) => {
    setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + offset)));
  };

  const onGestureEvent = (event) => {
    const offsetX = event.nativeEvent.translationX;
    const direction = offsetX > 0 ? -1 : 1;
    const absOffsetX = Math.abs(offsetX);
    const threshold = styles.calendar.width / 2;
    if (absOffsetX >= threshold) {
      setScrollEnabled(false);
      carouselRef.current.snapToItem(selectedDate.getMonth() + direction, true);
      changeMonth(direction);
      panGestureRef.current.setNativeProps({ enabled: false });
      setTimeout(() => {
        panGestureRef.current.setNativeProps({ enabled: true });
      }, 500);
    }
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === 5) {
      setScrollEnabled(true);
    }
  };

  const renderCalendar = ({ item }) => {
    const date = new Date(selectedDate.getFullYear(), item, 1);
    const firstDay = date.getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const daysArray = [];
    for (let i = 1; i <= (firstDay + daysInMonth); i++) {
      daysArray.push(i - firstDay);
    }

    const weeksArray = [];
    while(daysArray.length) weeksArray.push(daysArray.splice(0,7));

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <View style={styles.calendar} key={item}>
        <Text style={styles.monthHeading}>{months[item]} </Text>
        <Text style={styles.yearHeading}>{date.getFullYear()}</Text>
        <View style={styles.headerRow}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, index) => (
            <Text key={index} style={styles.dayHeading}>{d}</Text>
          ))}
        </View>
        {weeksArray.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.weekRow}>
            {week.map((day, dayIndex) => (
              <TouchableOpacity 
                key={dayIndex} 
                style={styles.dayCell} 
                onPress={() => { if(day > 0) setSelectedDate(new Date(date.getFullYear(), date.getMonth(), day))}}
              >
                <Text style={styles.dayText}>{day > 0 ? day : ''}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <GestureHandlerRootView 
    style={{ 
      flex: 1,
      left: 35
    
    }}>
      <PanGestureHandler
        ref={panGestureRef}
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
        enabled={true}
        activeOffsetX={[-20, 20]}
      >
        <View>
          <Carousel
            ref={carouselRef}
            data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
            renderItem={renderCalendar}
            sliderWidth={styles.calendar.width}
            itemWidth={styles.calendar.width}
            onSnapToItem={(index) => setSelectedDate(new Date(selectedDate.getFullYear(), index, 1))}
          />
          <Pagination
            dotsLength={12}
            activeDotIndex={selectedDate.getMonth()}
            containerStyle={{ paddingVertical: 10 }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.92)'
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  calendar: {
    width: 385, // Adjust width to fit your device's screen
    padding: 15,
    top: 40,
  },
  monthHeading: {
    fontSize: 65,
    fontWeight: 'bold',
    fontFamily: 'Impact',
    textAlign: 'center',
    marginVertical: 8,
    opacity: .35,
    top: -40
  },
  yearHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Impact',
    textAlign: 'center',
    marginVertical: -16,
    opacity: .35,
    top: -40
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 5,
    backgroundColor: '#4b9cd3',
    marginRight: -12
  },
  dayHeading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    padding: 10,
    width: `${100/6.95}%`,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  dayCell: {
    width: `${100/7}%`,
    paddingTop: 40, 
    paddingBottom: 40, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(75, 156, 211, 0.2)',
    borderRadius: 5,
    margin: 1,
    marginBottom: 5,
  },
  dayText: {
    fontSize: 11,
    position: 'absolute',
    color: '#ffffff',
    fontStyle: 'bold',
    bottom: 60,
    left: 33
  },
});

export default CalendarComponent;