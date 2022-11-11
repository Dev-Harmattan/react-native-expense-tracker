import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const IconButton = ({ icon, size, color, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => pressed && styles.pressed}
    >
      <View style={styles.butttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  butttonContainer: {
    borderRadius: 24,
    marginHorizontal: 8,
    marginVertical: 2,
    padding: 6,
  },
  pressed: {
    opacity: 0.75,
  },
});
