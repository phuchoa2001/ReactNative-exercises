import { View, TouchableOpacity } from "react-native";
import { AntDesign, Entypo } from '@expo/vector-icons';
import React from "react";
import { useNavigation } from '@react-navigation/native';

import ItemMenu from "./ItemMenu";

export default function Home() {
  const { push } = useNavigation();

  const menu = [
    {
      title: "ListShop",
      pathStack: "ListShop",
      icon: <AntDesign name="shoppingcart" size={24} color="black" />
    },
    {
      title: "TodoList",
      pathStack: "TodoList",
      icon: <Entypo name="list" size={24} color="black" />
    },
  ]
  return (
    <View className="flex-1 mt-4 flex-row flex-wrap">
      {menu.map((item) => (
        <TouchableOpacity
          key={item.title}
          className='p-4 w-1/4'
          onPress={() => push(item.pathStack)}
        >
          <ItemMenu title={item.title} icon={item.icon} />
        </TouchableOpacity>
      ))}
    </View>
  );
}
