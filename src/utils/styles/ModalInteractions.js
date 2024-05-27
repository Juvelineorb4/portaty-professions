import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
  },
  modalTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  modalText: {
    fontFamily: "regular",
    fontSize: 14,
    marginLeft: 5,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: 310,
    height: 450,
    borderWidth: 1,
    borderColor: "#1f1f1f",
  },
  stars: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  star: { color: "#ffb703" },
  errorInputDescription: {
    position: "absolute",
    left: 0,
    bottom: 3,
    fontFamily: "medium",
    color: "red",
    fontSize: 12,
  },
  labelInput: {
    fontFamily: "bold",
    fontSize: 14,
    color: "#404040",
  },
  inputContainerDescription: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fafafa",
    borderWidth: 0,
    padding: 11,
    borderRadius: 8,
    margin: 3,
    height: 130,
    // width: 333,
  },
  placeholderDescription: {
    marginLeft: 10,
    color: "#1f1f1f",
    fontSize: 12,
    fontFamily: "regular",
    textAlign: "justify",
    height: 130,
    // width: 313,
  },
  textInputDescription: {
    width: "100%",
    padding: "0 10px",
    color: "#1f1f1f",
    fontFamily: "regular",
    textAlign: "justify",
    fontSize: 12,
    height: 130,
  },
});

export default styles;