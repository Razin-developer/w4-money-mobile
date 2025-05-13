import { View, Text, ImageBackground, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Link, Tabs } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import { useAuth } from '@clerk/clerk-expo'
import { useAuthStore } from '@/store/useAuthStore'

const TabIcon = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className='flex flex-row w-full flex-1 min-w-[100px] min-h-16 mt-[18px] justify-center items-center rounded-full overflow-hidden'
      >
        <Image source={icon} className={title === "Redeem" || title === "Referral" ? "size-8" : "size-5"} tintColor={"#151312"} />
        <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
      </ImageBackground>
    )
  } else {
    return (
      <View className='size-full justify-center items-center mt-4 rounded-full'>
        <Image source={icon} tintColor={"#A8B5DB"} className={title === "Redeem" || title === "Referral" ? "size-8" : "size-5"} />
      </View>
    )
  }
}

const Layout = () => {
  const { userId } = useAuth();
  const { setUser, user, isLoading } = useAuthStore();
  console.log(userId);
  useEffect(() => {
    if (userId && !user) {
      setUser(userId);
      console.log(user);
    }
  }, [userId, setUser, user]);

  if (isLoading) {
    return (
      <View className="flex items-center justify-center h-screen w-screen">
        <View className="w-[200px] h-[200px] rounded-xl bg-[#0f0d23] flex items-center justify-center">
          <Image source={icons.logo} className='w-[64px] h-[64px]' resizeMode="center" />
        </View>
      </View>
    );
  }

  if (!user) {
    return (
      <View className='flex items-center justify-center h-screen w-screen'>
        <View className='w-80 h-80 rounded-xl px-12 py-12 bg-[#070d23] flex items-center justify-center'>
          <Text className='text-xl font-medium text-gray-200 mb-10'>You are not authenticated to use this app</Text>
          <Link href={"/login"} className='text-blue-500 underline-offset-2'>Try Login. Click Me</Link>
        </View>
      </View>
    )
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        },
        tabBarStyle: {
          backgroundColor: "#0f0d23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 60,
          height: 55,
          position: "absolute",
          overflow: "hidden",
          borderColor: "#070d23"
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.home}
              title="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name='redeem'
        options={{
          title: "Redeem",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.redeem}
              title="Redeem"
            />
          )
        }}
      />
      <Tabs.Screen
        name='referralCode'
        options={{
          title: "Referral Code",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.referrel}
              title="Referral"
            />
          )
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.person}
              title="Profile"
            />
          )
        }}
      />
    </Tabs>
  )
}

export default Layout