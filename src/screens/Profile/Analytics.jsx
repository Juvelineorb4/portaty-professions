import { View, ScrollView } from "react-native";
import React from "react";
import { LineChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import { Circle, G, Line, Text } from "react-native-svg";

const likesData = {
  "2024-02-01": 100,
  "2024-02-02": 120,
  "2024-02-03": 90,
  "2024-02-04": 150,
  "2024-02-05": 150,
  "2024-02-06": 110,
  "2024-02-09": 180,
};
const days = Object.keys(likesData);
const likes = Object.values(likesData);

const Decorator = ({ x, y }) => {
  return likes.map((value, index) => (
    <G key={index}>
      <Line
        x1={x(index)}
        y1={y(value)}
        x2={x(index)}
        y2={y(0)}
        stroke="grey"
        strokeDasharray={[5, 5]}
      />
      <Circle
        cx={x(index)}
        cy={y(value)}
        r={4}
        stroke="rgb(31, 31, 31)"
        fill="#1f1f1f"
      />
      <Text
        x={x(index)}
        y={y(value) - 10}
        fontSize={10}
        fill="black"
        alignmentBaseline="middle"
        textAnchor="middle"
        fontFamily="bold"
      >
        {value}
      </Text>
    </G>
  ));
};

const Analytics = () => {
  const maxValue = Math.max(...likes);
  console.log(maxValue);
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <View
        style={{
          padding: 20,
          marginHorizontal: 10,
        }}
      >
        <View style={{ height: 230, flexDirection: "row" }}>
          <YAxis
            data={likes}
            contentInset={{ top: 25, bottom: 30 }}
            svg={{
              fill: "grey",
              fontSize: 9,
            }}
            numberOfTicks={10}
            formatLabel={(value) => `${value}`}
            min={0}
            max={maxValue}
            style={
              {
                marginRight: 3
              }
            }
          />
          <ScrollView horizontal>
            <View style={{ width: days.length * 60 }}>
              <LineChart
                style={{ flex: 1 }}
                data={likes}
                svg={{ stroke: "rgb(255, 183, 3)" }}
                contentInset={{ top: 25, bottom: 0, left: 20, right: 20 }}
                yMin={0}
              >
                <Grid />
                <Decorator data={likes} />
              </LineChart>
              <XAxis
                style={{ marginHorizontal: -10, height: 15, marginTop: 15 }}
                data={days}
                formatLabel={(value, index) => days[index].substring(5)}
                contentInset={{ left: 30, right: 30 }}
                svg={{ fontSize: 11, fill: "black", fontFamily: "regular" }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default Analytics;
