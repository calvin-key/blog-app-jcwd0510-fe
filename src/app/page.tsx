"use client";

import { useAppSelector } from "@/redux/hooks";

export default function Home() {
  const user = useAppSelector((state) => state.user);
  return <h1>Welcome back {user.name}</h1>;
}
