import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/styles/auth.style'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSSO } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { useAuthStore } from '@/store/useAuthStore'


const Login = () => {
  const { startSSOFlow } = useSSO();
  const [code, setCode] = useState('')
  const router = useRouter();
  const { referCode } = useAuthStore();
  const handleGoogleSignin = async () => {
    try {
      console.log(code)

      if (code.trim()) {
        referCode(code);
      }

      const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_google" });

      if (setActive && createdSessionId) {
        await setActive({ session: createdSessionId });


        router.replace('/(tabs)');
      }
    } catch (error) {
      console.log("OAuth Error: ", error);
    }
  }

  return (
    <View style={styles.container}>

      {/* Brand Section */}
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Image source={icons.logo} className='w-10 h-10 p-4' />
        </View>
        <Text style={styles.appName}>W4 Money</Text>
        <Text style={styles.tagline}>Watch ads and Earn</Text>
      </View>

      {/* ILLUSTRATION */}
      <View style={styles.illustrationContainer}>
        <Image
          source={images.moneyBanner}
          resizeMode='cover'
          style={styles.illustration}
        />
      </View>

      {/* LOGIN SECTION */}
      <View style={styles.loginSection}>
        <TextInput className='w-[85%] bg-gray-100 rounded-2xl px-8 py-4 mb-4 mx-12 shadow-xl' placeholder='Enter Referral Code' onChangeText={setCode} />
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignin}
          activeOpacity={0.9}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={20} color="dark" />
          </View>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          By continuing, you agree to our Terms of Service and acknowledge you have read and understand our Privacy Policy.
        </Text>
      </View>
    </View>
  )
}

export default Login