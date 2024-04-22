import NextAuth from 'next-auth'

import Google from 'next-auth/providers/google'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: process.env.Google_id!,
      clientSecret: process.env.Google_secret!,
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
