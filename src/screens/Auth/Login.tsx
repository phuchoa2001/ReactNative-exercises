import { useState } from "react";
import { View , Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Button } from "native-base";
import {
  Center, Box, Heading,
  VStack, FormControl, Input, Link,
  HStack, Text, Pressable, Icon
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { AUTH_FIREBASE } from "../../constants/AsyncStorage";

type LoginStateForm = {
  username?: string,
  password?: string
}

export default function Login() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState<LoginStateForm>({});
  const { setItem } = useAsyncStorage(AUTH_FIREBASE);
  const { push } = useNavigation();

  const handleGoToRegister = () => {
    push("Register")
  }

  const handleChange = (name: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSingIn = () => {
    signInWithEmailAndPassword(auth , form.username , form.password).then((res) => {
      const user = res.user;
      setItem(JSON.stringify(user))
      push("ListShop")
    }).catch(error => {
      console.log(error);
      Alert.alert("Thông báo lỗi" , error.message);
    })
  }

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
            Đăng nhập để tiếp tục!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                placeholder="Nhập Email"
                onChangeText={(text) => handleChange("username" , text)}
                autoCapitalize="none"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Mật khẩu</FormControl.Label>
              <Input w={{
                base: "100%"
              }}
                type={show ? "text" : "password"}
                InputRightElement={<Pressable onPress={() => setShow(!show)}>
                  <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                </Pressable>}
                placeholder="Nhập mật khẩu"
                autoCapitalize="none"
                onChangeText={(text) => handleChange("password", text)}
              />
              <HStack mt="6" justifyContent="flex-end">
                <Text fontSize="sm" color="coolGray.600" _dark={{
                  color: "warmGray.200"
                }}>
                  Tôi là người dùng mới.{" "}
                </Text>
                <Link _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm"
                }} onPress={handleGoToRegister}>
                  Đăng ký
                </Link>
              </HStack>
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={handleSingIn}>
              Đăng nhập
            </Button>
          </VStack>
        </Box>
      </Center>
    </View>
  );
}
