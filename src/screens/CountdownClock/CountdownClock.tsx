import { View } from "react-native";
import { Text, InputGroup, InputRightAddon, Input, Button } from "native-base";
import React from "react";

export default function CountdownClock() {

  return (
    <View className="flex-1 mt-4 px-3 ">
      <View className="p-10 mb-10 bg-white rounded-lg">
        <Text fontSize="5xl" className="text-center"> 00:00:00</Text>
      </View>
      <View className="mb-3">
        <InputGroup w={{
          base: "100%",
        }}
        >
          <Input w={{
            base: "90%",
            md: "100%"
          }} placeholder="Nhập thời gian bằng mili giây"
          
          />
          <InputRightAddon children={"ms"} />
        </InputGroup>
      </View>
      <Button variant="subtle" colorScheme="secondary">
        Bắt đầu
      </Button>
    </View>
  );
}
