import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Pill from './Pill';
import { DateTime } from 'luxon';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App() {
  const [selectedWeek, setSelectedWeek] = useState(DateTime.local());
  const [savedDays, setSavedDays] = useState([selectedWeek.toFormat('M/dd/yyyy')]);
  
  // Adjust the start of the week to be Sunday
  let startOfWeek = selectedWeek.startOf('week');
  if (selectedWeek.weekday === 7) { // If today is Sunday
    startOfWeek = selectedWeek; // Set start of week to today
  } else {
    startOfWeek = startOfWeek.minus({ days: 1 }); // Otherwise, ensure week starts on Sunday
  }
  const endOfWeek = startOfWeek.plus({ days: 6 });

  // Create an array for the days of the week
  const daysOfWeek = Array.from({ length: 7 }).map((_, index) => startOfWeek.plus({ days: index }).toFormat('M/dd/yyyy'));

  const previousWeek = () => {
    setSelectedWeek(selectedWeek.minus({ weeks: 1 }));
  };

  const nextWeek = () => {
    setSelectedWeek(selectedWeek.plus({ weeks: 1 }));
  };

  const handlePillStateChange = (day, value) => {
    if(value && !savedDays.includes(day)) {
      setSavedDays([...savedDays, day]);
    }else if (!value && savedDays.includes(day)){
      setSavedDays(savedDays.filter(item => item !== day));
    }
  };

  return (
    <View>
      <View style={styles.dateSelector}>
        <TouchableOpacity onPress={previousWeek}>
          <Icon name="arrow-back-ios" size={24} />
        </TouchableOpacity>

        <Text style={{fontWeight: 'bold', fontSize: 20}}>
          {startOfWeek.toFormat('LLL d')} - {endOfWeek.toFormat('LLL d')}
        </Text>

        <TouchableOpacity onPress={nextWeek}>
          <Icon name="arrow-forward-ios" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.pillContainer}>
        {daysOfWeek.map((day) => 
          <Pill text={day} 
                key={`${day}`}
                toggleState={savedDays.includes(day)}
                onChange={(newState) => handlePillStateChange(day, newState)} />)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dateSelector: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 60,
    paddingLeft: 25,
    paddingRight: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pillContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30
  },
});
