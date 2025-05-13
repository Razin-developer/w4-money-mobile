import { ClerkProvider } from '@clerk/clerk-expo'
import "./globals.css";
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import InitialLayout from '@/components/InitialLayout';

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

  console.log("publishableKey", publishableKey);


  if (!publishableKey) {
    throw new Error('Missing Publishable Key')

  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <InitialLayout />
    </ClerkProvider>
  );
}
