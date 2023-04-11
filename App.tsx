import { useEffect } from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from "native-base";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import Home from "./src/screens/Home/Home";
import ListShop from "./src/screens/ListShop/ListShop";
import MyshoppingCart from "./src/screens/MyShoppingCart/MyShoppingCart";
import Login from "./src/screens/Auth/Login";
import CountdownClock from "./src/screens/CountdownClock/CountdownClock";
import Register from "./src/screens/Auth/Register";

import { CART_ASNYC_STORAGE } from "./src/constants/AsyncStorage";
import store from './src/redux/store';

const Stack = createStackNavigator();

export default function App() {
	const { getItem, setItem } = useAsyncStorage(CART_ASNYC_STORAGE);

	const readItemFromStorage = async () => {
		const jsonValue = await getItem();
		const data = jsonValue != null ? JSON.parse(jsonValue) : null;
		console.log("data", data);
	};

	useEffect(() => {
		readItemFromStorage();
	}, [])

	return (
		<NavigationContainer>
			<NativeBaseProvider>
				<Provider store={store}>
					<SafeAreaView style={{ flex: 1 }}>
						<StatusBar
							backgroundColor="#61dafb"
						/>
						<View style={{ flex: 1 }} className="w-100">
							<Stack.Navigator>
								<Stack.Screen
									name="Home"
									component={Home}
									options={{
										title: 'Trang chủ',
									}} />
								<Stack.Screen
									name="Login"
									component={Login}
									options={{
										title: 'Đăng nhập',
									}} />
								<Stack.Screen
									name="Register"
									component={Register}
									options={{
										title: 'Đăng ký',
									}} />
								<Stack.Screen
									name="ListShop"
									component={ListShop}
									options={{
										title: 'Danh sách sản phẩm',
									}}
								/>
								<Stack.Screen
									name="MyShoppingCart"
									component={MyshoppingCart}
									options={{
										title: 'Giỏ hàng của tôi',
									}}
								/>
								<Stack.Screen
									name="countdownClock"
									component={CountdownClock}
									options={{
										title: 'Đồng hồ đếm ngược',
									}}
								/>
							</Stack.Navigator>
						</View>
					</SafeAreaView>
				</Provider>
			</NativeBaseProvider>
		</NavigationContainer>
	);
}
