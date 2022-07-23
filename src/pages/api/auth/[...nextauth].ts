import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

const prisma = new PrismaClient();

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile) {
        console.log('yourProfile: ', profile);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          first_name: profile.given_name,
          last_name: profile.family_name,

          // emailVerified: profile.email_verified,
        };
      },
    }),
    // ...add more providers here
  ],

  pages: {
    signIn: '/auth/sign-in',
    newUser: '/auth/thankyou',
    signOut: 'auth/sign-out',
    // error: '/auth/sign-in',
  },
  /* session: {
     // strategy: 'jwt',

   },*/

  cookies: {
    // this customization enables to access the cookie with code
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: false,
        // sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },

  callbacks: {
    /*async ,*/

    async signIn(arg) {
      console.log('args ----', arg);
      // window.close()
      return true;
    },

    async jwt({ token }) {
      console.log('JWT: ', token);

      return token;
    },
    async redirect({ url, baseUrl }) {
      console.log('i redirect u --: ', url, baseUrl);

      return url;
    },
  },
});
