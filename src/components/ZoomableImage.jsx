import React from "react";
import { StyleSheet } from "react-native";
import {
  PinchGestureHandler,
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ZoomableImage = ({ uri, imageHeight = 360 }) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = Math.max(1, event.scale);
    },
    onEnd: () => {
      if (scale.value < 1.1) {
        scale.value = withTiming(1, { duration: 300 });
        translateX.value = withTiming(0, { duration: 300 });
        translateY.value = withTiming(0, { duration: 300 });
      }
    },
  });

  const panHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      if (scale.value > 1) {
        translateX.value = event.translationX / 2;
        translateY.value = event.translationY / 2;
      }
    },
    onEnd: () => {
      if (scale.value <= 1) {
        translateX.value = withTiming(0, { duration: 300 });
        translateY.value = withTiming(0, { duration: 300 });
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panHandler}>
      <Animated.View style={styles.container}>
        <PinchGestureHandler onGestureEvent={pinchHandler}>
          <Animated.Image
            style={[styles.image, animatedStyle, { height: imageHeight }]}
            source={{ uri }}
          />
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 5,
    borderWidth: 0.7,
    borderColor: "#1f1f1f",
  },
  image: {
    width: "100%",
    resizeMode: "contain",
  },
});

export default ZoomableImage;
