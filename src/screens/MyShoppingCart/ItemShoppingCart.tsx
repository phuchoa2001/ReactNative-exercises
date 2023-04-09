import { Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useAppDispatch } from '../../redux/store'

import { deleteCart } from '../../redux/card/slice'

type ItemShoppingCartProps = {
  id: number,
  uri: string,
  price: number,
  title: string,
  quantity: number
}

const ItemShoppingCart: React.FC = (props: ItemShoppingCartProps) => {
  const { uri, price, title, quantity, id } = props;
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteCart(id))
  }
  return (
    <View className='w-full py-4 bg-white'>
      <View className='min-h-[200]'>
        <View className='flex flex-row'>
          <View className='w-1/2 px-1'>
            <Image
              source={{ uri }}
              style={{ width: "100%", height: 200 }}
            />
          </View>
          <View className='w-1/2 px-1'>
            <Text className='text-2xl font-bold' numberOfLines={3}>{title}</Text>
            <Text className='text-green-400 mt-2 font-semibold' numberOfLines={1}>@mehmetozsoy</Text>
            <View className='mt-2'>
              <View>
                <Text className='font-bold text-xs' numberOfLines={1}>Số lượng : {quantity}</Text>
              </View>
            </View>
            <Text className='font-bold text-3xl mt-2'>{price}$</Text>
            <TouchableOpacity
              onPress={() => Alert.alert(`Thanh toán sản phẩm`, `Bạn đã thanh toán ${title} với giá ${quantity * price}$`)}
            >
              <Text className='font-bold mt-1 p-2 text-center bg-stone-400 text-white rounded-lg'>Thanh toán</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Text className='font-bold mt-1 p-2 text-center bg-red-500 text-white rounded-lg'>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ItemShoppingCart;