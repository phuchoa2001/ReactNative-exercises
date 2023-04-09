import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import ItemShop from './ItemShop';
import { useAppDispatch } from '../../redux/store';
import { addCart } from '../../redux/card/slice';
import _ from "lodash";

function ListShop() {
	const { push } = useNavigation();
	const dispatch = useAppDispatch();
	const [data, setData] = useState([]);
	const [isloading, setIsloading] = useState(false);
	const [search, setSearch] = useState("");
	const [searchLodash, setSearchLodash] = useState("");

	const getData = () => {
		setIsloading(true);
		fetch('https://fakestoreapi.com/products', {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((responseJson) => {
				setData(responseJson)
				setIsloading(false);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	const debounceFn = useCallback(_.debounce((value) => {
		setSearchLodash(value);
	}, 300), []);

	const dataFilter = useMemo(() => {
		if (!searchLodash) {
			return data;
		}

		return data.filter(item => item.title.includes(searchLodash));
	}, [searchLodash, data])

	useEffect(() => {
		getData()
	}, [])

	if (isloading) {
		return (
			<Text>Loading...</Text>
		)
	}

	return (
		<View className='px-3 flex-1'>
			<View className='flex flex-row items-center justify-between'>
				<Text className='font-bold my-3 text-center text-2xl'>Danh sách sản phẩm</Text>
				<TouchableOpacity
					onPress={() => push("MyShoppingCart")}
				>
					<AntDesign name="shoppingcart" size={24} color="black" />
				</TouchableOpacity>
			</View>
			<TextInput
				onChangeText={(value) => {
					setSearch(value);
					debounceFn(value);
				}}
				value={search}
				className='h-12 w-full p-2 border-black border-2 mb-2'
				placeholder='Search...'
			/>
			<ScrollView className=' flex-1'>
				<View className='flex flex-row flex-wrap w-100'>
					{dataFilter.map((item) =>
						<TouchableOpacity
							key={item.id}
							className='w-1/2'
							onPress={() => {
								Alert.alert("Thêm sản phẩm", `Bạn đã thêm ${item.title} vào giỏ hàng`)
								dispatch(addCart({
									id : item.id,
									uri: item.image,
									price: item.price,
									title: item.title
								}))
							}}
						>
							<ItemShop
								uri={item.image}
								price={item.price}
								title={item.title}
							/>
						</TouchableOpacity>
					)}
				</View>
			</ScrollView >
		</View >
	);
}

export default ListShop;