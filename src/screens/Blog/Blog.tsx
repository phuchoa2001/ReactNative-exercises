import { useEffect, useState } from "react";
import { ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";

type BlogItemProps = {
  title: string,
  content: string,
  uri: string,
  id: string
}

const BlogItem = (props: BlogItemProps) => {
  const { title, content, uri, id } = props;
  const { push } = useNavigation();
  const handleReadBlog = () => {
    push("ReadBlog" , { id});
  }
  return (
    <TouchableOpacity className="bg-white p-3 flex w-100 flex-row my-1" onPress={handleReadBlog}>
      <View className="w-2/5 mr-2">
        <Image
          source={{ uri }}
          style={{ width: "100%", height: 200 }}
        />
      </View>
      <View className="w-3/5">
        <Text className="text-lg font-bold">{title}</Text>
        <Text className="text-cyan-700">{content}</Text>
      </View>
    </TouchableOpacity>
  )
}
export default function Blog() {

  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(false);

  const getData = () => {
    setIsloading(true);
    fetch('https://633fac66d1fcddf69ca7402e.mockapi.io/blog', {
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

  useEffect(() => {
    getData()
  }, [])

  if (isloading) {
    return (
      <Text>Loading...</Text>
    )
  }

  return (
    <View className="px-3 pt-2 flex-1">
      <ScrollView className="flex-1">
        {data.map((item) => (
          <BlogItem
            title={item.title}
            content={item.excerpt}
            uri={item.coverImage}
            id={item.id}
          />
        ))}
      </ScrollView>
    </View>
  );
}
