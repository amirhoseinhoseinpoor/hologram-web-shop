import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: async (credentials) => {
          // Replace with your logic to validate user credentials (e.g., database lookup)
          const validUsername = credentials.username === 'admin'; // Replace with actual validation
          const validPassword = credentials.password === 'password123'; // Replace with actual validation
          return validUsername && validPassword ? null : Promise.reject(new Error('Invalid credentials'));
        },
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET, // Set a secure secret environment variable
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.user.isAdmin = true; // Assuming 'admin' is the username for admin access
        }
        return token;
      },
      async session({ session, token }) {
        session.user.isAdmin = token.user.isAdmin;
        return session;
      },
    },
    pages: {
      signIn: '/login', // Redirect to /login for sign-in
    },
  });