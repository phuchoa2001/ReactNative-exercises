import { View, Text } from "react-native";
import React from "react";

type ItemMenuProps = {
	title: string,
	icon: JSX.Element
}

export default function ItemMenu(props : ItemMenuProps) {
  return (
    <View className="flex justify-center items-center w-full">
          {props.icon}
       <Text className="mt-1">{props.title}</Text>
    </View>
  );
}
