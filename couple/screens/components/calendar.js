import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const scrollX = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Whenever the current month changes, scroll to the middle view (without animation) to create an illusion of infinite scrolling
    scrollViewRef.current.scrollTo({ x: SCREEN_WIDTH, animated: false });
  }, [currentMonth]);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;

    if (offsetX > SCREEN_WIDTH) {
      // Swiped to the left, move to the next month
      setCurrentMonth(prevMonth => {
        const newMonth = new Date(prevMonth);
        newMonth.setMonth(prevMonth.getMonth() + 1);
        return newMonth;
      });
    } else if (offsetX < SCREEN_WIDTH) {
      // Swiped to the right, move to the previous month
      setCurrentMonth(prevMonth => {
        const newMonth = new Date(prevMonth);
        newMonth.setMonth(prevMonth.getMonth() - 1);
        return newMonth;
      });
    }
  };

  const renderCalendar = (monthOffset) => {
    const targetDate = new Date(currentMonth);
    targetDate.setMonth(targetDate.getMonth() + monthOffset);
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
        <View style={styles.fullCalendar}>
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
                disabled
              >
                <Text style={(day > 0 && day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) ? styles.todayText : styles.dayText}>
                  {day > 0 ? day : ''}
                </Text>
              </TouchableOpacity>
            ))}
            
          </View>
        ))}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={handleScroll}
        showsHorizontalScrollIndicator={false}
        // Initially, scroll to the middle view
        contentOffset={{ x: SCREEN_WIDTH }}
      >
        {[-1, 0, 1].map((monthOffset) => (
          <View style={{ width: SCREEN_WIDTH }} key={monthOffset}>
            {renderCalendar(monthOffset)}
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  calendar: {
    width: SCREEN_WIDTH,
    top: 40,
    padding: 10,
    transform: [{ scale: .95 }],
    
  },
  fullCalendar: {
    bottom: 40,
    right: 6
    },
  monthHeading: {
    fontSize: 65,
    fontWeight: 'bold',
    fontFamily: 'Impact',
    textAlign: 'center',
    marginVertical: 8,
    opacity: .35,
    top: -67
  },
  yearHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Impact',
    textAlign: 'center',
    marginVertical: -16,
    opacity: .35,
    top: -68
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
