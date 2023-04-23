import React, { useRef } from 'react';
import { View, Animated, PanResponder } from 'react-native';

const Game = () => {
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: position.x, dy: position.y }
      ]),
      onPanResponderRelease: () => {
        Animated.spring(position, { toValue: { x: 0, y: 0 } }).start();
      }
    })
  ).current;

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          { width: 50, height: 50, backgroundColor: 'red' },
          position.getLayout()
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

export default Game;
