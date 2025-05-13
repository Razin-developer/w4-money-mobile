import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import { icons } from '@/constants/icons'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useAuthStore } from '@/store/useAuthStore'
import { formatDate } from '@/lib/formatDate'
import { useAuth } from '@clerk/clerk-expo'

const Redeem = () => {
  const { redeemCodes, addCode, setUser } = useAuthStore();
  const { userId } = useAuth()

  const router = useRouter();
  const getRedeemCode = () => {
    addCode().then(() => {
      setUser(userId!)
      router.replace("/profile")
    })
  }

  return (
    <ScrollView>
      <View className='flex items-center justify-start mt-16 pb-28 min-h-screen'>

        {/* Header */}
        <Link href="/" asChild>
          <Pressable className='flex flex-row w-[85%] justify-between items-center bg-[#0f0d23] rounded-full px-16 py-4'>
            <Image source={icons.logo} className='w-16 h-16' />
            <Text className='text-gray-200 text-3xl font-semibold'>W4 Money</Text>
          </Pressable>
        </Link>

        <View className='w-full flex justify-start items-center bg-white py-6'>
          <Text className='text-xl font-bold text-gray-800 mb-6'>Redeem Options</Text>

          <View className='flex flex-wrap justify-between gap-y-4 w-[95%]'>
            <View
              className='w-full bg-[#0f0d23] rounded-2xl p-4 justify-between items-center flex'
            >
              {/* Icon */}
              <Icon name='google-play' size={48} color='white' className='mb-2' />

              {/* Info */}
              <View className='items-center'>
                <Text className='text-white text-sm font-semibold text-center'>Google Pay</Text>
                <Text className='text-gray-200 text-sm mt-2'>Earn ₹10</Text>
                <Text className='text-gray-200 text-sm mt-1'>Cost 1000 coins</Text>
              </View>

              {/* Button */}
              <Pressable onPress={getRedeemCode} className='bg-green-600 px-4 py-2 rounded-xl mt-3'>
                <Text className='text-white font-semibold text-sm'>Redeem</Text>
              </Pressable>
            </View>
          </View>
        </View>


        {/* List Content */}
        <View className='w-full flex justify-start items-center bg-white px-6 py-4'>
          <Text className='text-xl font-bold text-gray-800 mb-4'>Recent Redemptions</Text>
          <View className='flex space-y-2'>
            {redeemCodes.length > 0 ?
              redeemCodes.map(redeem => (
                <View key={redeem._id} className='w-[80%] flex flex-row justify-between items-center px-4 py-4 space-x-4 mb-4 bg-gray-100 rounded-lg'>
                  <Text className='text-sm text-gray-700'>{formatDate(redeem.time)}</Text>
                  <Text className='text-lg font-bold text-green-600'>+{redeem.reward}</Text>
                </View>
              )) : (
                <View className='w-[80%] flex flex-row justify-between items-center px-4 py-4 space-x-4 mb-4 bg-gray-100 rounded-lg'>
                  <Text className='text-sm text-gray-700'>No Redemptions yet</Text>
                </View>
              )}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Redeem
