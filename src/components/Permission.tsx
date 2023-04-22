import React, { useEffect  } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { AUTH_FIREBASE } from '../constants/AsyncStorage';

type PermissionProps = {
  children : JSX.Element
}
const Permission = ({ children } : PermissionProps) => {
  const { getItem  } = useAsyncStorage(AUTH_FIREBASE);
  const { push } = useNavigation();

  const readUserFromStorage = async () => {
    const jsonValue = await getItem();
    const data = jsonValue != null ? JSON.parse(jsonValue) : null;
    if(!data) {
      push("Login")
		}
  };

  useEffect(() => {
    readUserFromStorage();
  }, [])

  return children;
}

export default Permission