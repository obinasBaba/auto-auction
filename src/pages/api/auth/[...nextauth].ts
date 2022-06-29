import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile) {
        console.log('profile -- - -- - - - -- - - ', profile);
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
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    // ...add more providers here
  ],

  pages: {
    signIn: '/auth/sign-in',
    newUser: '/auth/thankyou',
    signOut: 'auth/sign-out',
    error: '/auth/sign-in',
  },
  /* session: {
     // strategy: 'jwt',
   },*/

  callbacks: {
    /*async sign-in({user, account, profile, email, credentials}){

    },*/
    async jwt({ token }) {
      console.log('JWT: ', token);

      return token;
    },
    async redirect({ url, baseUrl }) {
      console.log('redirect: ', url, baseUrl);

      return baseUrl;
    },
  },
});
