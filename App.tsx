import { View, SafeAreaView, StatusBar } from "react-native";
// import Home from "./src/screens/Home";
import ListShop from "./src/screens/ListShop/ListShop";

export default function App() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar
				backgroundColor="#61dafb"
			/>
			<View style={{ flex: 1 }} className="w-100">
				<ListShop />
			</View>
		</SafeAreaView>
	);
}
