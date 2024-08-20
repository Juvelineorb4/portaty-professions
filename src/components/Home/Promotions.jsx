import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import InstagramStories from "@birdwingo/react-native-instagram-stories";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isFocusPromotion } from "@/atoms";

const Promotions = ({ data, showPromotion, setShowPromotion, isAll }) => {
  const ref = useRef(null);
  const [isFocus, setIsFocus] = useRecoilState(isFocusPromotion);

  const onShowPromotion = (id) => {
    ref.current?.show(id);
  };
  const [storiesData, setStoriesData] = useState(data);
  useEffect(() => {
    setStoriesData(data);
    setTimeout(() => {
      if (showPromotion && ref) onShowPromotion(showPromotion);
    }, 1000);
  }, [ref, isAll, data, showPromotion]);

  if (storiesData.length !== 0)
    return (
      <View
        style={{
          marginBottom: 15,
        }}
      >
        <InstagramStories
          ref={ref}
          stories={storiesData}
          animationDuration={30500}
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
          storyAnimationDuration={500}
          modalAnimationDuration={500}
          closeIconColor={"#ffffff"}
          storyAvatarSize={45}
          onShow={setShowPromotion}
          onHide={() => setIsFocus(false)}
        ></InstagramStories>
      </View>
    );
};

export default Promotions;

const styles = StyleSheet.create({});
