"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./context/UserContext";

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.replace("/searchrides");
    } else {
      router.replace("/login");
    }
  }, [router, user]);


  return (
    <div>
    </div>
  );
}
