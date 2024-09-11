"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  // extracting data from usesession as session
  const { data: session } = useSession();
  const router = useRouter();
  // checking if sessions exists  
  if (session) {
    <p>Login Successfully!!</p>;
    router.push("/users");
    // return (
    //   <>
    //     <p>Welcome {session.user?.name}. Signed In As</p>
    //     <p>{session.user?.email}</p>
    //     <button onClick={() => signOut()}>Sign out</button>
    //   </>
    // );
  } else {
    router.push("/auth/signin");
  }
}
