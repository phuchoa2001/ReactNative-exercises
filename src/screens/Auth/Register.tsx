import { useState , useEffect } from "react";
import { Alert, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Button } from "native-base";
import {
  Center, Box, Heading,
  VStack, FormControl, Input, Link,
  HStack, Text, Pressable, Icon
} from "native-base";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { auth } from "../../firebase/firebaseConfig";
import { AUTH_FIREBASE } from "../../constants/AsyncStorage";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

type RegisterStateForm = {
  username?: string,
  password?: string,
  confirmPassword?: string
}

type RegisterStateFormTouched = {
  username: boolean,
  password: boolean,
  confirmPassword: boolean
}

export default function Register() {
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false
  });
  const { setItem , getItem } = useAsyncStorage(AUTH_FIREBASE);
  const [form, setForm] = useState<RegisterStateForm>({});
  const [formTouched, setFormTouched] = useState<RegisterStateFormTouched>({
    username: false,
    password: false,
    confirmPassword: false
  })

  const isErrorUserName = formTouched.username && !form.username;
  const isErrorPassword = (formTouched.password && formTouched.confirmPassword)
    && (form.password !== form.confirmPassword)

  const { push } = useNavigation();

  const handleGoToRegister = () => {
    push("Login")
  }

  const handleChange = (name: string, value: string) => {
    setFormTouched(prev => ({
      ...prev,
      [name]: true
    }))
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth , form.username , form.password).then(res => {
      const user = res.user;
      setItem(JSON.stringify(user))
      push("ListShop")
    }).catch(error => {
      console.log(error);
      Alert.alert("Thông báo lỗi" , error.message);
    })
  }

  const readUserFromStorage = async () => {
    const jsonValue = await getItem();
    const data = jsonValue != null ? JSON.parse(jsonValue) : null;
    if(data) {
      push("Home")
		}
  };

  useEffect(() => {
    readUserFromStorage();
  }, [])

  return (
    <View className="flex-1 mt-4 px-3">
      <Center w="100%">
        <Box safeArea py="8" w="100%" maxW="290">
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
            color: "warmGray.50"
          }}>
            Xin chào
          </Heading>
          <Heading mt="1" _dark={{
            color: "warmGray.200"
          }} color="coolGray.600" fontWeight="medium" size="xs">
            Đăng ký để tiếp tục!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                placeholder="Nhập Email"
                onChangeText={(text) => handleChange("username", text)}
                autoCapitalize="none"
              />
              <FormControl.ErrorMessage isInvalid={isErrorUserName}>
                Trường này không được bỏ trống
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl>
              <FormControl.Label>Mật khẩu</FormControl.Label>
              <Input w={{
                base: "100%"
              }}
                type={show.password ? "text" : "password"}
                InputRightElement={<Pressable
                  onPress={() => setShow(prev => ({ ...prev, password: !prev.password }))}>
                  <Icon as={<MaterialIcons name={show.password ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                </Pressable>}
                onChangeText={(text) => handleChange("password", text)}
                autoCapitalize="none"
                placeholder="Nhập mật khẩu"
              />
              <FormControl.ErrorMessage isInvalid={isErrorPassword}>
                Nhập lại mật khẩu và mật khẩu không khợp !
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl>
              <FormControl.Label>Nhập lại mật khẩu</FormControl.Label>
              <Input w={{
                base: "100%"
              }}
                type={show.confirmPassword ? "text" : "password"}
                InputRightElement={<Pressable
                  onPress={() => setShow(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}>
                  <Icon as={<MaterialIcons name={show.confirmPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                </Pressable>}
                onChangeText={(text) => handleChange("confirmPassword", text)}
                autoCapitalize="none"
                placeholder="Nhập lại mất khẩu"
              />
              <FormControl.ErrorMessage isInvalid={isErrorPassword}>
                Nhập lại mật khẩu và mật khẩu không khợp !
              </FormControl.ErrorMessage>

              <HStack mt="6" justifyContent="flex-end">
                <Text fontSize="sm" color="coolGray.600" _dark={{
                  color: "warmGray.200"
                }}>
                  Tôi đã có tài khoản{" "}
                </Text>
                <Link _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm"
                }} onPress={handleGoToRegister}>
                  Đăng nhập
                </Link>
              </HStack>
            </FormControl>

            <Button mt="2" colorScheme="indigo" onPress={handleCreateAccount}>
              Đăng ký
            </Button>
          </VStack>
        </Box>
      </Center>
    </View>
  );
}
