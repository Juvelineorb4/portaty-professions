import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import InstagramStories from "@birdwingo/react-native-instagram-stories";
import { useEffect } from "react";

const Promotions = ({ data, showPromotion }) => {
  console.log(data);
  const ref = useRef(null);
  const onShowPromotion = (id) => {
    ref.current?.show(id);
  };

  if (data)
    useEffect(() => {
      setTimeout(() => {
        if (showPromotion && ref) onShowPromotion(showPromotion);
      }, 1000);
    }, [ref]);
  return (
    <View
      style={{
        marginBottom: 15,
      }}
    >
      <InstagramStories
        ref={ref}
        stories={data}
        animationDuration={3500}
        backgroundColor={"#1f1f1fe9"}
        avatarBorderColors={["#ffb703"]}
        avatarSeenBorderColors={["#9d9d9d"]}
        avatarListContainerStyle={{
          gap: 5,
        }}
        textStyle={{
          color: "white",
          fontFamily: "medium",
          fontSize: 16,
        }}
        avatarListContainerProps={{
          showsHorizontalScrollIndicator: false,
          marginRight: 10,
        }}
        showName={true}
        nameTextStyle={{
          fontFamily: "medium",
          textAlign: "center",
          marginTop: 4,
        }}
        footerComponent={() => (
          <View
            style={{
              backgroundColor: "red",
            }}
          >
            <Text>Heyeeeeeeeeeee</Text>
          </View>
        )}
        storyAnimationDuration={500}
        modalAnimationDuration={500}
        closeIconColor={"#ffffff"}
        storyAvatarSize={45}
      >
        <Text>hey</Text>
      </InstagramStories>
    </View>
  );
};

export default Promotions;

const styles = StyleSheet.create({});
