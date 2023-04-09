import { Text, View, Image } from 'react-native'
import React from 'react'

type ItemShopProps = {
  uri: string,
  price: number,
  title: string
}

const ItemShop: React.FC = (props: ItemShopProps) => {
  return (
    <View className='w-full h-[270] p-2 relative mb-2'>
      <View className='bg-gray-200'>
        <Image
          source={{ uri: props.uri }}
          style={{ width: "100%", height: 200 }}
        />
        <View className='bg-zinc-400 absolute top-2 right-2 w-[120] p-3 bg-white rounded-2xl flex flex-row justify-between'>
          <Text className='text-xs text-gray-300'>Price :</Text>
          <Text className='text-xs text-gray-700 font-bold'>{props.price} $</Text>
        </View>
        <View className='h-[70] p-1 flex justify-center items-center w-full'>
          <Text className='font-bold text-xs'>{props.title}</Text>
        </View>
      </View>
    </View>
  )
}

export default ItemShop;