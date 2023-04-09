import { View, SafeAreaView, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "./src/screens/Home/Home";
import ListShop from "./src/screens/ListShop/ListShop";
import MyshoppingCart from "./src/screens/MyShoppingCart/MyShoppingCart";

import store from './src/redux/store';

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
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
					</Stack.Navigator>
				</View>
			</SafeAreaView>
			</Provider>
		</NavigationContainer>
	);
}
