import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InstagramStories from "@birdwingo/react-native-instagram-stories";

const Promotions = ({ data }) => {
  console.log(data)
  const stories = [
    {
      id: "user1",
      name: "User 1",
      imgUrl:
        "https://s3professions202858-dev.s3.amazonaws.com/assets/avatar.png",
      stories: [
        {
          id: `story1`,
          source: {
            uri: "https://s3professions202858-dev.s3.amazonaws.com/assets/story.png",
          },
        },
      ],
    },
    {
      id: "user2",
      name: "User 1",
      imgUrl:
        "https://s3professions202858-dev.s3.amazonaws.com/assets/avatar.png",
      stories: [
        {
          id: `story1`,
          source: {
            uri: "https://s3professions202858-dev.s3.amazonaws.com/assets/story.png",
          },
        },
      ],
    },
    {
      id: "user3",
      name: "User 1",
      imgUrl:
        "https://s3professions202858-dev.s3.amazonaws.com/assets/avatar.png",
      stories: [
        {
          id: `story1`,
          source: {
            uri: "https://s3professions202858-dev.s3.amazonaws.com/assets/story.png",
          },
        },
      ],
    },
    {
      id: "user4",
      name: "User 1",
      imgUrl:
        "https://s3professions202858-dev.s3.amazonaws.com/assets/avatar.png",
      stories: [
        {
          id: `story1`,
          source: {
            uri: "https://s3professions202858-dev.s3.amazonaws.com/assets/story.png",
          },
        },
      ],
    },
    {
      id: "user5",
      name: "User 1",
      imgUrl:
        "https://s3professions202858-dev.s3.amazonaws.com/assets/avatar.png",
      stories: [
        {
          id: `story1`,
          source: {
            uri: "https://s3professions202858-dev.s3.amazonaws.com/assets/story.png",
          },
        },
      ],
    },
    {
      id: "user6",
      name: "User 1",
      imgUrl:
        "https://s3professions202858-dev.s3.amazonaws.com/assets/avatar.png",
      stories: [
        {
          id: `story1`,
          source: {
            uri: "https://s3professions202858-dev.s3.amazonaws.com/assets/story.png",
          },
        },
      ],
    },
  ];

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
          avatarListContainerProps={{
            showsHorizontalScrollIndicator: false,
            marginRight: 10,
          }}
          storyAnimationDuration={500}
          modalAnimationDuration={500}
          closeIconColor={"#ffffff"}
          storyAvatarSize={45}
        />
      </View>
    );
};

export default Promotions;

const styles = StyleSheet.create({});
