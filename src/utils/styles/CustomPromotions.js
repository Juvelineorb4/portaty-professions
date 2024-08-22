import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    marginLeft: 10,
    color: "#1f1f1f",
    fontFamily: "regular",
    height: 55,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 0.8,
    width: 130,
    borderRadius: 8,
    margin: 3,
    height: 40,
  },
  placeholder: {
    flex: 1,
    marginLeft: 10,
    color: "#1f1f1f",
    fontSize: 11,
    fontFamily: "regular",
    height: 55,
  },
  labelInput: {
    fontFamily: "bold",
    fontSize: 12,
    color: "#404040",
  },
  errorInput: {
    fontFamily: "regular",
    fontSize: 12,
    color: "red",
  },
});

export default styles;