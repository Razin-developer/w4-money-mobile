import { Image, Pressable, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { icons } from '@/constants/icons'; // adjust if needed
import { useAuthStore } from '@/store/useAuthStore';
import { formatDate } from '@/lib/formatDate';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Ads');
  const { user, ads, redeemCodes, refers } = useAuthStore();

  return (
    <ScrollView>
      <View className='flex items-center justify-start mt-16 min-h-screen'>

        {/* Header */}
        <Link href="/" asChild>
          <Pressable className='flex flex-row w-[85%] justify-between items-center bg-[#0f0d23] rounded-full px-16 py-4'>
            <Image source={icons.logo} className='w-16 h-16' />
            <Text className='text-gray-200 text-3xl font-semibold'>W4 Money</Text>
          </Pressable>
        </Link>

        {/* User Info */}
        <View className='flex w-full justify-start items-center bg-[#0f0d23] px-16 py-8 mt-10'>
          <View className='flex flex-row w-full justify-start items-center bg-white px-10 py-4 space-x-4 rounded-xl'>
            <Image src={user?.profileImage} className='w-14 h-14 rounded-full mr-6' />
            <View>
              <Text className='text-black text-2xl font-semibold'>{user?.name}</Text>
              <Text className='text-gray-600 text-lg'>Points: {user?.points}</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className='w-full flex-row justify-center items-center space-x-4 mt-8'>
          {['Ads', 'Referral', 'Redeem'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full min-w-24 ${activeTab === tab ? 'bg-blue-600' : 'bg-gray-200'} ${tab !== 'Redeem' ? 'mr-4' : ''}`}
            >
              <Text className={`text-base text-center ${activeTab === tab ? 'text-white' : 'text-black'}`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        <View className='w-full flex justify-start items-center bg-white px-6 py-4 mt-4 pb-36'>
          <Text className='text-xl font-bold text-gray-800 mb-4'>
            {activeTab === 'Ads' ? 'Ads Watched' : activeTab === 'Referral' ? 'Referral Info' : 'Redeemed Codes'}
          </Text>

          {activeTab === 'Referral' ? (
            <Text className='text-base text-gray-700'>
              You referred {refers.length} friends. Earned {refers.length * 250} coins.
            </Text>
          ) : activeTab === 'Ads' ? (
            ads.length === 0 ? (
              <Text className='text-gray-500 text-base'>No ads watched yet.</Text>
            ) : (
              <View className='flex space-y-2'>
                {ads.map((ad) => (
                  <View
                    key={ad._id}
                    className='w-[80%] flex flex-row justify-between items-center px-4 py-4 mb-4 bg-gray-100 rounded-lg'
                  >
                    <Text className='text-sm text-gray-700'>{ad.time.toLocaleString()}</Text>
                    <Text className='text-lg font-bold text-green-600'>+{ad.reward}</Text>
                  </View>
                ))}
              </View>
            )
          ) : (
            redeemCodes.length === 0 ? (
              <Text className='text-gray-500 text-base'>No redeemed codes yet.</Text>
            ) : (
              <View className='flex space-y-2 w-[85%] items-center justify-center'>
                {redeemCodes.map((redeem) => (
                  <TouchableOpacity
                    key={redeem._id}
                    className='w-[85%] flex flex-col bg-gray-100 px-4 py-4 rounded-xl mb-3'
                  >
                    <Text className='text-gray-700 text-sm mb-1'>{formatDate(redeem.time)}</Text>
                    <View className='flex flex-row justify-between items-center'>
                      <Text className='text-lg font-semibold text-black'>Code: {redeem.code}</Text>
                      <Text className='text-green-600 font-bold'>+{redeem.reward}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
