import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default Pill = ({text, toggleState, onChange}) => {
    const [isToggled, setIsToggled] = useState(toggleState);

    const handleToggleSwitch = () => {
      const newState = !isToggled;
      setIsToggled(newState);
      onChange(newState);
    };

    return (
      <View style={styles.bubble}>
        <Text style={styles.bubbleText}>{text}</Text>
        <Switch value={isToggled} onValueChange={handleToggleSwitch} />
      </View>
    );
}

const styles = StyleSheet.create({
    bubble: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        backgroundColor: '#1F1F1F',
        borderRadius: 20,
        padding: 15,
        margin: 7,
        maxWidth: '80%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 6,
    },
    bubbleText: {
        color: '#FFF',
        fontSize: 25
    },
})