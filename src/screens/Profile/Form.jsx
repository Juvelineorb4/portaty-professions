import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "@/utils/styles/RegisterForm.module.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/CustomInput";
import CustomTags from "@/components/CustomTags";
import * as ImagePicker from "expo-image-picker";
import { Auth, API, Storage } from "aws-amplify";
import * as queries from "@/graphql/queries";
import * as customProfile from "@/graphql/CustomQueries/Profile";
import * as mutations from "@/graphql/mutations";
import CustomActivities from "@/components/CustomActivities";
import { useRecoilState, useRecoilValue } from "recoil";
import { activitySelect, mapBusiness, profileState, tagsList } from "@/atoms";
import * as MediaLibrary from "expo-media-library";
import MapMarketBusiness from "@/components/MapMarketBusiness";
import * as Location from "expo-location";

const Form = ({ navigation, route }) => {
  const global = require("@/utils/styles/global.js");
  const { user } = route.params;
  const { control, handleSubmit } = useForm();
  const [image, setImage] = useState(null);
  const [blobImage, setBlobImage] = useState(null);
  const [activitiesList, setActivitiesList] = useState([]);
  const activity = useRecoilValue(activitySelect);
  const tags = useRecoilValue(tagsList);
  const map = useRecoilValue(mapBusiness);
  const [userLocation, setUserLocation] = useState(null);

  /* Para limpiar */
  const [selectTagsList, setSelectTagsList] = useRecoilState(tagsList);
  const [selectActivity, setSelectActivity] = useRecoilState(activitySelect);
  const [selectMapBusiness, setSelectMapBusiness] = useRecoilState(mapBusiness);
  const [stateProfile, setStateProfile] = useRecoilState(profileState);

  function urlToBlob(url) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };
      xhr.open("GET", url);
      xhr.responseType = "blob"; // convert type
      xhr.send();
    });
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 4],
      quality: 1,
    });
    if (!result.canceled) {
      const { uri } = result.assets[0];
      const blobData = await urlToBlob(uri);
      setBlobImage(blobData);
      setImage(uri);
    }
  };
  const BlankInputs = () => {
    setSelectTagsList([]);
    setSelectActivity({});
    setSelectMapBusiness({});
  };
  const onRegisterBusiness = async (data) => {
    const { company, email, phone, wsme } = data;

    const storageFolder = company.replace(/ /g, "");

    const { key } = await Storage.put(
      `business/${storageFolder}/profile.jpg`,
      blobImage,
      {
        level: "protected",
        contentType: "image/jpeg",
      }
    );
    const business = await API.graphql({
      query: mutations.createBusiness,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        input: {
          userID: user,
          name: company,
          email: email,
          phone: phone,
          whatsapp: wsme,
          image: key,
          coordinates: {
            lat: map.latitude,
            lon: map.longitude,
          },
          activity: activity.name,
          tags: tags,
        },
      },
    });
    console.log(business);
    BlankInputs();
    setStateProfile(true);
    navigation.goBack();
  };
  const MultipleData = async () => {
    const activities = await API.graphql({
      query: customProfile.listActivities,
    });
    setActivitiesList(activities.data.listActivities.items);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      setUserLocation(location.coords);
    })();
    MultipleData();
    BlankInputs();
  }, []);
  /*  */
  return (
    <ScrollView style={[global.bgWhite, styles.container]}>
      <CustomInput
        control={control}
        name={`company`}
        placeholder={`Portaty C.A.`}
        styled={{
          text: styles.textInput,
          label: [styles.labelInput],
          error: styles.errorInput,
          input: [styles.inputContainer],
          placeholder: styles.placeholder,
        }}
        text={`Razon social`}
      />
      <CustomInput
        control={control}
        name={`email`}
        placeholder={`soporte@portaty.com`}
        styled={{
          text: styles.textInput,
          label: [styles.labelInput],
          error: styles.errorInput,
          input: [styles.inputContainer],
          placeholder: styles.placeholder,
        }}
        text={`Correo electronico`}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CustomInput
          control={control}
          name={`phone`}
          placeholder={`+58 123 4567`}
          styled={{
            text: styles.textInputBot,
            label: [styles.labelInputBot],
            error: styles.errorInputBot,
            input: [styles.inputContainerBot],
            placeholder: styles.placeholderBot,
          }}
          text={`Telefono`}
        />
        <CustomInput
          control={control}
          name={`wsme`}
          placeholder={`ws.yourlink.me`}
          styled={{
            text: styles.textInputBot,
            label: [styles.labelInputBot],
            error: styles.errorInputBot,
            input: [styles.inputContainerBot],
            placeholder: styles.placeholderBot,
          }}
          text={`Whats App Me`}
        />
      </View>

      {activitiesList.length !== 0 ? (
        <CustomActivities data={activitiesList} />
      ) : (
        <CustomInput
          control={control}
          name={`activity`}
          placeholder={`Selecciona tu actividad laboral`}
          styled={{
            text: styles.textInput,
            label: [styles.labelInput],
            error: styles.errorInput,
            input: [styles.inputContainer],
            placeholder: styles.placeholder,
          }}
          text={`Actividad Laboral`}
        />
      )}

      {activity.name ? (
        <CustomTags data={activity} />
      ) : (
        <CustomInput
          control={control}
          name={`tags`}
          placeholder={`Selecciona tus tags`}
          styled={{
            text: styles.textInput,
            label: [styles.labelInput],
            error: styles.errorInput,
            input: [styles.inputContainer],
            placeholder: styles.placeholder,
          }}
          text={`Tags`}
        />
      )}
      {userLocation ? (
        <MapMarketBusiness initialLocation={userLocation} />
      ) : (
        <ActivityIndicator />
      )}

      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          position: "relative",
        }}
        onPress={pickImage}
      >
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            marginRight: 5,
          }}
          source={require("@/utils/images/cameraadd.png")}
        />
        {image && (
          <Image
            style={{
              width: 95,
              height: 95,
              borderRadius: 8,
              position: "absolute",
              left: 110,
            }}
            // resizeMethod={`resize`}
            source={{ uri: image }}
          />
        )}
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "light",
          fontSize: 14,
          textAlign: "center",
          marginVertical: 10,
        }}
      >
        Sube una imagen de tu negocio
      </Text>
      <TouchableOpacity
        style={[
          global.mainBgColor,
          {
            borderRadius: 8,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: 55,
            marginTop: 10,
            marginBottom: 125,
          },
        ]}
        onPress={handleSubmit(onRegisterBusiness)}
      >
        <Text style={[global.white, { fontFamily: "medium", fontSize: 14 }]}>
          {`Registrar`}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Form;
