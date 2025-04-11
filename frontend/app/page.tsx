"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.replace("/searchrides");
    } else {
      router.replace("/login");
    }
  }, [router]);


  return (
    <div>
    </div>
  );
}
