import axiosInstance from "@/library/axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const credentialInstance = CredentialsProvider({
  async authorize(credentials) {
    try {
      const { username, password } = credentials;

      const res = await axiosInstance.post("api/users/login", {
        username,
        password,
      });

      const user = res.data;

      return user;
    } catch (error) {
      throw error.response?.data ? error.response.data : error;
    }
  },
});

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [credentialInstance],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
});
