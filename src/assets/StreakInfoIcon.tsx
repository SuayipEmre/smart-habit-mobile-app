import React from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { G, Path } from 'react-native-svg'

const StreakInfoIcon = () => {
  return (
    <View style={styles.iconContainer}>
      <Svg
        width={40}
        height={40}
        viewBox="5 5 60 60" // zoomed in & trimmed
        fill="none"
      >
        <G>
          <Path
            d="M57.7066 39.3333C57.7066 39.3333 57.3566 41.6667 50.1232 51C43.3332 59.7967 53.1567 66.4933 54.3233 67.2633C54.3933 67.31 54.4633 67.31 54.5566 67.2633C56.1433 66.2833 73.8066 54.92 57.7066 39.3333Z"
            fill="#F25D07"
          />
          <Path
            d="M52.1068 34.1767C52.1068 28.81 50.0068 23.91 47.9068 21.11C47.2068 20.41 46.0401 20.6433 45.8067 21.5767C44.8734 25.0767 42.0734 32.5433 35.3067 41.41C26.6734 52.61 34.6068 64.7433 42.7734 67.0767C47.2068 68.2433 41.6068 64.7433 40.9068 57.51C40.2068 48.41 52.1068 41.6433 52.1068 34.1767Z"
            fill="#F25D07"
          />
        </G>
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',

    // 🔹 Gölge efekti (soft orange)
    shadowColor: '#F25D0780', // 50% opacity
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,

    // 🔹 Fazladan margin/padding yok
    margin: 0,
    padding: 0,
  },
})

export default StreakInfoIcon
