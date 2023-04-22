import { View } from "react-native";
import { Text, InputGroup, InputRightAddon, Input, Button } from "native-base";
import React, { useEffect, useState } from "react";


type TextClockProps = {
  time: number,
  onStop: () => void
}
const TextClock = ({ time, onStop }: TextClockProps) => {
  const [value, setValue] = useState<number>(60);

  useEffect(() => {
    let id = setInterval(() => {
      setValue(prev => prev - 1);
    }, 1000);
  
    if (value === 0) {
      clearInterval(id);
      onStop();
    }
  
    return () => clearTimeout(id);
  }, []);

  return (
    <View className="p-10 mb-10 bg-white rounded-lg">
      <Text fontSize="5xl" className="text-center">{value}</Text>
    </View>
  )
}

export default function CountdownClock() {
  const [time, setTime] = useState<number>(0);
  const [start, setStart] = useState(false);

  return (
    <View className="flex-1 mt-4 px-3 ">
      {start && (
        <TextClock time={time} onStop={() => setStart(false)} />
      )}
      <View className="mb-3">
        <InputGroup w={{
          base: "100%",
        }}
        >
          <Input w={{
            base: "90%",
            md: "100%"
          }} placeholder="Nhập thời gian bằng giây"
            keyboardType='numeric'
            value={time.toString() || "0"}
            onChangeText={value => setTime(+value)}
          />
          <InputRightAddon children={"s"} />
        </InputGroup>
      </View>
      <Button variant="subtle" colorScheme="secondary" onPress={() => setStart(prev => !prev)}>
        {start ? "Dừng lại" : "Bắt đầu"}
      </Button>
    </View>
  );
}
