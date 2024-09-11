import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in with Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        let userdata: any = await fetch(
          "https://66cec214901aab24841f6d28.mockapi.io/userdata/usersdetails"
        )
          .then((res) => res.json())
          .then((data) => data)
          .catch((err) => console.log("Err from authentication process", err));

        console.log("My data", userdata);

        let authorizeUser = userdata?.find(
          (data: any) =>
            data?.email === credentials?.email &&
            data?.password === credentials?.password
        );
        if (authorizeUser) {
          return {
            id: authorizeUser?.id,
            email: authorizeUser?.email,
            password: authorizeUser?.password,
          }; //aa n/w section ma session ma "preview ma hase"
        } else {
          throw new Error("Email Id or Password is wrong!!");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", //Aa signin page na loca. mate
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      //Ahi user ni id,email,name token  ma assign thase,atle te token user ne identify kari shake.
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      //Ahi token na data session ma pass thase.
      session.user = token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions); //Upar apel options ae handler ma assign thase,ae mujab get & post ni req. jase.
export { handler as GET, handler as POST };
