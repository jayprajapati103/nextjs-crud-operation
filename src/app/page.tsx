"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  // extracting data from usesession as session
  const { data: session } = useSession();

  // checking if sessions exists
  if (session) {
    <p>Login Successfully!!</p>;
    return (
      <>
        <p>Welcome {session.user?.name}. Signed In As</p>
        <p>{session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return <p>Not Login</p>;
}
