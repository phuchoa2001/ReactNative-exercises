import { View, TouchableOpacity } from "react-native";
import { AntDesign, Entypo , FontAwesome5 , FontAwesome } from '@expo/vector-icons';
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
      title: "Đồng hồ đếm ngược",
      pathStack: "countdownClock",
      icon: <Entypo name="clock" size={24} color="black" />
    },
    {
      title: "Hồ sơ bản thân",
      pathStack: "Profile",
      icon: <AntDesign name="user" size={24} color="black" />
    },
    {
      title: "Bản đồ",
      pathStack: "Map",
      icon: <FontAwesome5 name="map" size={24} color="black" />
    },
    {
      title: "Bài viết",
      pathStack: "Blog",
      icon: <FontAwesome5 name="blogger-b" size={24} color="black" />
    },
    {
      title: "Trò chơi",
      pathStack: "Game",
      icon: <FontAwesome name="gamepad" size={24} color="black" />
    },
  ]
  return (
    <View className="flex-1 mt-4 flex-row flex-wrap">
      {menu.map((item) => (
        <TouchableOpacity
          key={item.title}
          className='p-4 w-2/4'
          onPress={() => push(item.pathStack)}
        >
          <ItemMenu title={item.title} icon={item.icon} />
        </TouchableOpacity>
      ))}
    </View>
  );
}
