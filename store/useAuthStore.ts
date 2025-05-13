import { axiosInstance } from "@/lib/axios";
import { ToastAndroid } from "react-native";
import { create } from "zustand";

interface Ad {
  time: string;
  _id: string;
  reward: number;
}

interface Refer {
  user: string;
  points: 250;
}

interface RedeemCode {
  _id: string;
  code: string;
  reward: number;
  time: string;
}

interface User {
  _id: string
  name: string;
  email: string;
  role: string;
  profileImage: string;
  googleId: string;
  clerkId: string;
  points: number;
  referralCode: string;
  redeemCodes: RedeemCode[]
  refers: Refer[]
  ads: Ad[]
}

interface AuthStore {
  user: User | null;
  ads: Ad[];
  refers: Refer[];
  redeemCodes: RedeemCode[];
  isLoading: boolean;

  setUser: (userId: string) => void;
  addAdsReward: () => Promise<void>;
  referCode: (code: string) => Promise<void>;
  addCode: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  ads: [],
  redeemCodes: [],
  refers: [],
  isLoading: false,

  setUser: async (userId) => {
    set({ isLoading: true })
    try {
      const res = await axiosInstance.get<{ user: User }>(`/webhooks/get/${userId}`);
      set({ user: res.data.user, ads: res.data.user.ads, redeemCodes: res.data.user.redeemCodes, refers: res.data.user.refers });
    } catch (error) {
      console.log('Error in useUser:', JSON.stringify(error));
    } finally {
      set({ isLoading: false })
    }
  },

  addAdsReward: async () => {
    try {
      await axiosInstance.get(`/webhooks/adsReward/${get().user?._id}`);
    } catch (error) {
      console.log('Error in addAdsReward:', JSON.stringify(error));
    }
  },

  referCode: async (code: string) => {
    try {
      await axiosInstance.get(`/webhooks/refer/${code}`);
    } catch (error) {
      console.log('Error in referCode:', JSON.stringify(error))
    }
  },

  addCode: async () => {
    try {
      if (get().user?.points! < 1000) {
        ToastAndroid.show("Insufficient points", ToastAndroid.SHORT)
      }

      await axiosInstance.get(`/webhooks/redeem/get/${get().user?._id}`);
    } catch (error) {
      console.log('Error in referCode:', JSON.stringify(error))
      ToastAndroid.show((error as any).response.data.message || "Something went Wrong", ToastAndroid.SHORT);
    }
  }
}))