import { Text, View, TouchableOpacity, Alert } from 'react-native'
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

import { AUTH_FIREBASE } from '../../constants/AsyncStorage';

const Profile = () => {
  const [user, setUser] = useState<any>();
  const { getItem , removeItem } = useAsyncStorage(AUTH_FIREBASE);
  const { push } = useNavigation();

  const readUserFromStorage = async () => {
    const jsonValue = await getItem();
    const data = jsonValue != null ? JSON.parse(jsonValue) : null;
    setUser(data);
  };

  const handlesignOut = () => {
    signOut(auth).then(() => {
      removeItem()
      push("Login")
    }).catch((error) => {
      console.log(error);
      Alert.alert("Thông báo lỗi", error.message);
    });
  }

  useEffect(() => {
    readUserFromStorage();
  }, [])

  return (
    <View>
      <Text className='text-center font-bold my-3 text-2xl'>{user?.email}</Text>
      <TouchableOpacity onPress={handlesignOut}>
        <Text className='text-center my-3'>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile