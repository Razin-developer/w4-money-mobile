import { icons } from "@/constants/icons";
import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Image, View } from "react-native";

export default function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  const segments = useSegments();
  const router = useRouter();



  useEffect(() => {
    console.log(segments, isSignedIn, isLoaded);
    if (!isLoaded) return

    const inAuthScreen = segments[0] === "(auth)"

    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)/login")
    } else if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)")
    }
  }, [isLoaded, isSignedIn, segments, router]);

  if (!isLoaded) {
    return (
      <View className="flex items-center justify-center h-screen w-screen">
        <View className="w-[200px] h-[200px] rounded-xl bg-[#0f0d23] flex items-center justify-center">
          <Image source={icons.logo} className='w-[64px] h-[64px]' resizeMode="center" />
        </View>
      </View>
    );
  }

  return <Stack>
    <Stack.Screen
      name="(tabs)"
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="(auth)/login"
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="(ads)/ads"
      options={{
        headerShown: false
      }}
    />
  </Stack>;
}