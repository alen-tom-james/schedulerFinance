import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, PanResponder } from 'react-native';

const BACK_YEARS = 5;
const FORWARD_YEARS = 5;

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthOffset, setMonthOffset] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
    onPanResponderRelease: () => {
      if (pan.x._value > 50) {
        // swipe right
        previousMonth();
      } else if (pan.x._value < -50) {
        // swipe left
        nextMonth();
      }
      Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
    }
  });

  const previousMonth = () => {
    setMonthOffset((prev) => prev - 1);
  };

  const nextMonth = () => {
    setMonthOffset((prev) => prev + 1);
  };

  const renderCalendar = (monthOffset) => {
    const targetDate = new Date();
    targetDate.setMonth(selectedDate.getMonth() + monthOffset);
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = Array.from({ length: firstDay + daysInMonth }, (_, i) => i - firstDay + 1);
    const weeksArray = [];
    while (daysArray.length) weeksArray.push(daysArray.splice(0, 7));
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <View style={styles.calendar} key={monthOffset}>
        <Text style={styles.monthHeading}>{months[month]}</Text>
        <Text style={styles.yearHeading}>{year}</Text>
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
                onPress={() => { if(day > 0) setSelectedDate(new Date(year, month, day)) }}
              >
                <Text style={(day > 0 && day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) ? styles.todayText : styles.dayText}>
                  {day > 0 ? day : ''}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <Animated.View {...panResponder.panHandlers} style={[pan.getLayout(), { flex: 1 }]}>
      {renderCalendar(monthOffset)}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    width: 385,
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
    fontWeight: 'bold',
    bottom: 60,
    left: 33
  },
  todayText: {
    fontSize: 11,
    position: 'absolute',
    color: '#ff0000',
    fontWeight: 'bold',
    bottom: 60,
    left: 33
  },
});

export default CalendarComponent;
