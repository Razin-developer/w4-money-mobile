import { Image, Pressable, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { SignOutButton } from '@/components/SignOutButton'
import { useAuthStore } from '@/store/useAuthStore'

const Refer = () => {
  const { user } = useAuthStore();

  return (
    <View className='flex items-center justify-start mt-16 min-h-screen'>

      {/* Header */}
      <Link href="/" asChild>
        <Pressable className='flex flex-row w-[85%] justify-between items-center bg-[#0f0d23] rounded-full px-16 py-4'>
          <Image source={icons.logo} className='w-16 h-16' />
          <Text className='text-gray-200 text-3xl font-semibold'>W4 Money</Text>
        </Pressable>
      </Link>

      {/* User Info */}
      <View className="w-[85%] h-[420px] bg-[#0f0d23] rounded-2xl px-6 py-4 mt-8 flex-col justify-start items-center relative overflow-hidden shadow-md">
        <Image
          source={images.referral}
          className="w-96 h-80 absolute top-8 right-2"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-white tracking-wide mt-4">Refer And Earn</Text>
        <Text className="text-base text-gray-300 mt-1">Refer Your Friend and Earn</Text>
        <View className='mt-52 w-[90%] bg-white rounded-2xl px-4 py-6 items-center shadow-lg shadow-black/20'>
          <Text className="text-xl font-bold text-gray-800 mb-4 text-center">
            Your Referral Code:
          </Text>
          <View className='bg-[#0f0d23] px-10 py-4 rounded-xl'>
            <Text className='text-2xl font-bold text-white tracking-widest'>
              {user?.referralCode}
            </Text>
          </View>
        </View>
      </View>

      {/* List Content */}
      <View className='w-full h-full flex justify-start items-center bg-white px-6 py-4 mt-4 pb-36'>
        <Text className='text-xl font-bold text-gray-800 mb-4'>
          {'Referral Info'}
        </Text>

        <Text className='text-base text-gray-700'>You referred {user?.refers.length} friends. Earned {user?.refers.length! * 250} coins.</Text>

      </View>
      <SignOutButton />
    </View>
  )
}

export default Refer
