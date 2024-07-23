import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InstagramStories from "@birdwingo/react-native-instagram-stories";

const Promotions = ({ data }) => {
  if (data)
    return (
      <View
        style={{
          marginBottom: 15,
        }}
      >
        <InstagramStories
          stories={data}
          animationDuration={3500}
          backgroundColor={"#1f1f1fe9"}
          avatarBorderColors={["#ffb703"]}
          avatarSeenBorderColors={["#9d9d9d"]}
          saveProgress
          onShow={(e) => console.log("show", e)}
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
