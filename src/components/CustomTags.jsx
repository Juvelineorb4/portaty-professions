import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import styles from "@/assets/styles/Tags.module.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { es } from "@/assets/constants/lenguage";
import { useRecoilValue } from "recoil";
import { tagsList } from "@/atoms";
import Tag from "./Tag";

const CustomTags = ({ data }) => {
  const global = require("@/assets/styles/global.js");
  const [modalVisible, setModalVisible] = useState(false);
  const { control } = useForm();
    const tags = useRecoilValue(tagsList)
  const tagsFilter = tags.filter((item, index) => {
    return tags.indexOf(item) === index;
  });
  useEffect(() => {
    console.log(tagsFilter);
  }, [tagsFilter]);

  return (
    <ScrollView
      style={[global.bgWhite, { flex: 1 }]}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Text style={styles.labelInput}>Tags</Text>
        <TouchableOpacity
          style={[styles.inputContainer]}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.textInput}>Selecciona tus tags</Text>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.modalTop}>
                  <Pressable
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        resizeMode: "contain",
                      }}
                      source={require("@/assets/images/arrow_back.png")}
                    />
                  </Pressable>
                  <Text style={styles.modalText}>{`Selecciona tus tags`}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={[{ flex: 1 }]}>
                    <FlatList
                      data={data}
                      renderItem={({ item }) => (
                        <Tag item={item}/>
                      )}
                      numColumns={3}
                      keyExtractor={(item, index) => index}
                      showsVerticalScrollIndicator={false}
                      columnWrapperStyle={{ justifyContent: "space-between" }}
                    />
                  </View>
                  <TouchableOpacity
                    style={[
                      global.mainBgColor,
                      {
                        borderRadius: 8,
                        // flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        height: 49,
                        marginTop: 10,
                      },
                    ]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text
                      style={[
                        global.white,
                        { fontFamily: "medium", fontSize: 14 },
                      ]}
                    >
                      {`Agregar tags`}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CustomTags;
