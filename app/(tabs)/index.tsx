import { View, Image, Text, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import { useAuthStore } from '@/store/useAuthStore'

const Index = () => {
  const { user } = useAuthStore();

  return (
    <ScrollView>
      <View className='flex items-center justify-start mt-16 mb-48 h-screen'>
        <Link href="/" asChild>
          <Pressable className='flex flex-row w-[85%] justify-between items-center bg-[#0f0d23] rounded-full px-16 py-4'>
            <Image source={icons.logo} className='w-16 h-16' />
            <Text className='text-gray-200 text-3xl font-semibold'>W4 Money</Text>
          </Pressable>
        </Link>

        {/* Ads Section */}
        <Link href="/ads" asChild>
          <Pressable className="w-[85%] h-56 bg-[#0f0d23] rounded-2xl px-6 py-4 mt-12 flex-col flex justify-center items-center relative overflow-hidden shadow-md">
            <Image
              source={images.ads}
              className="w-96 h-64 absolute -top-8 right-24"
              resizeMode="contain"
            />
            <Text className="text-3xl font-bold text-white tracking-wide ml-48">Watch Ads</Text>
            <Text className="text-base text-gray-300 mt-1 ml-48">See Ads, And Earn</Text>
          </Pressable>
        </Link>

        {/* Wallet and Redeem Section */}
        <View className="w-[85%] bg-transparent h-44 rounded-2xl mt-8 flex flex-row justify-between items-center overflow-hidden space-x-12">
          <Link href="/profile" asChild>
            <Pressable className='bg-[#0f0d23] rounded-2xl px-6 flex-1/2 flex justify-end items-center relative overflow-hidden shadow-md h-44 w-[48%]'>
              <Image
                source={images.wallet}
                className="w-48 h-48 absolute -top-10"
                resizeMode="contain"
              />
              <Text className="text-2xl font-semibold text-white tracking-wide mb-4">Wallet</Text>
            </Pressable>
          </Link>
          <Link href="/redeem" asChild>
            <Pressable className='bg-[#0f0d23] rounded-2xl px-6 flex-1/2 flex justify-end items-center relative overflow-hidden shadow-md h-44 w-[48%]'>
              <Image
                source={images.redeemNow}
                className="w-48 h-48 absolute -top-8"
                resizeMode="contain"
              />
              <Text className="text-2xl font-semibold text-white tracking-wide mb-4">Redeem</Text>
            </Pressable>
          </Link>
        </View>

        {/* Referral Section */}
        <Link href="/referralCode" asChild>
          <Pressable className="w-[85%] h-[420px] bg-[#0f0d23] rounded-2xl px-6 py-4 mt-8 flex-col justify-start items-center relative overflow-hidden shadow-md">
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
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  )
}

export default Index
