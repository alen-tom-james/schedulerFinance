import React, { useState, useContext, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { DateContext } from '../../App';  // Ensure the path is correct

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const WeekView = () => {
  const { selectedDate, setSelectedDate } = useContext(DateContext);

  const getWeek = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return { start, end };
  };

  const [currentWeek, setCurrentWeek] = useState(getWeek(selectedDate));
  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollViewRef.current.scrollTo({ x: SCREEN_WIDTH, animated: false });
  }, [currentWeek]);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    if (offsetX > SCREEN_WIDTH) {
      setCurrentWeek(prevWeek => getWeek(new Date(prevWeek.start.setDate(prevWeek.start.getDate() + 7))));
    } else if (offsetX < SCREEN_WIDTH) {
      setCurrentWeek(prevWeek => getWeek(new Date(prevWeek.start.setDate(prevWeek.start.getDate() - 7))));
    }
  };

  const renderWeek = (weekOffset) => {
    const startDate = new Date(currentWeek.start);
    startDate.setDate(startDate.getDate() + (7 * weekOffset));
    const weekDays = Array.from({ length: 7 }, (_, i) => new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i));

    return (
      <View style={styles.weekContainer} key={weekOffset}>
        {weekDays.map((day, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.dayCell} 
            onPress={() => setSelectedDate(day)}
          >
            <Text style={day.getDate() === selectedDate.getDate() && day.getMonth() === selectedDate.getMonth() && day.getFullYear() === selectedDate.getFullYear() ? styles.selectedDayText : styles.dayText}>
              {day.getDate()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <Text key={index} style={styles.dayHeader}>{day}</Text>
        ))}
      </View>
      {/* Week View content */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={handleScroll}
        showsHorizontalScrollIndicator={false}
        contentOffset={{ x: SCREEN_WIDTH }}
      >
        {[-1, 0, 1].map((weekOffset) => (
          <View style={{ width: SCREEN_WIDTH }} key={weekOffset}>
            {renderWeek(weekOffset)}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 5,
    backgroundColor: '#4b9cd3',
    borderRadius: 10,
    marginTop: 50,
    margin: 22,
    left: 18
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    padding: 6,
  },
  weekContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingLeft: 40,
    paddingRight: 20
  },
  dayCell: {
    width: `${100/7}%`,
    paddingTop: 0,
    paddingBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(75, 156, 211, 0.2)',
    borderRadius: 5,
    margin: 1,
    marginBottom: 5,
  },
  dayText: {
    fontSize: 20,
    color: '#4b9cd3',
  },
  selectedDayText: {
    fontSize: 30,
    color: 'blue',
    opacity: '.45'
  },
});

export default WeekView;
