import { View, TouchableOpacity, Text, Alert } from 'react-native'
import React from 'react'
import ItemShoppingCart from './ItemShoppingCart'
import { useAppSelector } from '../../redux/store'
import { ScrollView , useToast } from 'native-base'

const MyshoppingCart: React.FC = () => {
  const { List } = useAppSelector(state => state.Cart);
  const toast = useToast();

  const getPayAllList: number = List.reduce((a, b) => ((b.quantity * b.price) + a), 0);
  
  return (
    <View className='px-3'>
      <ScrollView >
        <View>
          {List.map((item) => (
            <ItemShoppingCart
              key={item.id}
              id={item.id}
              uri={item.uri}
              price={item.price}
              title={item.title}
              quantity={item.quantity}
            />
          ))}
        </View>
        <TouchableOpacity>
          <Text
            className='font-bold mt-1 p-4 text-center bg-stone-400 text-white rounded-lg'
            onPress={() => Alert.alert("Thanh toán sản phẩm", `Bạn đã thanh toán bộ sản phẩm với giá ${getPayAllList}$`)}
          >
            Thanh toán tất cả
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default MyshoppingCart;