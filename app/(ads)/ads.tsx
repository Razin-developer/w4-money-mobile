import { Pressable, Text, View, ScrollView, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'expo-router'
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '@clerk/clerk-expo';
import { useAuthStore } from '@/store/useAuthStore';
import { icons } from '@/constants/icons';
import { RewardedAd, RewardedAdEventType, TestIds } from "react-native-google-mobile-ads"
import { formatDate } from '@/lib/formatDate';

const Ads = () => {
  const [rewarded, setRewarded] = useState<RewardedAd | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { userId } = useAuth();
  const { setUser, user, ads, isLoading, addAdsReward } = useAuthStore();
  console.log(userId);

  const initRewardedAd = useCallback(() => {
    setLoading(true);
    const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED);
    rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setRewarded(rewarded);
      console.log("Rewarded loaded");
    })

    rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
      addAdsReward().then(() => setUser(userId!));
    })
    rewarded.load();
    setLoading(false);
  }, [setRewarded, addAdsReward, setUser, userId]);

  useEffect(() => {
    initRewardedAd();
  }, [initRewardedAd]);

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



  const showRewardedAd = () => {
    if (rewarded) {
      rewarded.show();
    }
    initRewardedAd();
    rewarded?.show();
  };


  return (
    <ScrollView>
      <View className='flex items-center justify-start mt-16 min-h-screen'>
        {/* Header */}
        <Link href=".." asChild>
          <Pressable className='flex items-start justify-start w-[95%] '>
            <Icon name="arrow-back" size={30} color="#000" />
          </Pressable>
        </Link>

        {/* Watch Ad Button */}
        <View className='flex w-full justify-start items-center bg-[#0f0d23] px-16 py-8 mt-4'>
          <Pressable disabled={loading} onPress={showRewardedAd} className='flex flex-row w-[85%] justify-center items-center bg-white rounded-full px-16 py-4'>
            <Text className='text-black text-3xl font-semibold'>Watch Ad</Text>
          </Pressable>
        </View>

        {/* Recent Ads List */}
        <View className='w-full flex justify-start items-center bg-white px-6 py-4'>
          <Text className='text-xl font-bold text-gray-800 mb-4'>Recent Ads Watched</Text>
          <View className='flex space-y-2'>
            {ads.length > 0 ?
              ads.map(ad => (
                <View key={ad._id} className='w-[80%] flex flex-row justify-between items-center px-4 py-4 space-x-4 mb-4 bg-gray-100 rounded-lg'>
                  <Text className='text-sm text-gray-700'>{formatDate(ad.time)}</Text>
                  <Text className='text-lg font-bold text-green-600'>+{ad.reward}</Text>
                </View>
              )) : (
                <View className='w-[80%] flex flex-row justify-between items-center px-4 py-4 space-x-4 mb-4 bg-gray-100 rounded-lg'>
                  <Text className='text-sm text-gray-700'>No ads watched yet</Text>
                </View>
              )}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Ads
