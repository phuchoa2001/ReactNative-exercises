import { View, Text , Image} from 'react-native'
import React , {useState , useEffect } from 'react'
import { useRoute } from '@react-navigation/native'

type BlogItemState = {
  title: string,
  excerpt: string,
  coverImage: string
}

const ReadBlog = () => {
  const route = useRoute(); // Sử dụng hook useRoute để lấy đối tượng route
  const { id } = route.params; // Lấy giá trị của ID từ params
  const [data, setData] = useState<BlogItemState>({
    title : "",
    excerpt : "" ,
    coverImage : ""
  });
  const [isloading, setIsloading] = useState(false);
  
  console.log("data" , data);
  
  const { title, excerpt , coverImage } = data;

  const getId = () => {
    setIsloading(true);
    fetch(`https://633fac66d1fcddf69ca7402e.mockapi.io/blog/${id}`, {
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
    if(id) {
      getId();
    }
  }, [])

  if (isloading) {
    return (
      <Text>Loading...</Text>
    )
  }

  return (
    <View className='px-3 pt-2'>
      <Text className="text-lg font-bold">{title}</Text>
      <Text className="text-cyan-700 mb-2">{excerpt}</Text>
      <Image
          source={{ uri : coverImage }}
          style={{ width: "100%", height: 200 }}
        />
    </View>
  )
}

export default ReadBlog