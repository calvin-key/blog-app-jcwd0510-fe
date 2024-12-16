"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlice";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter(); // kalau mau setelah logout page berubah ke login page
  const user = useAppSelector((state) => state.user);

  const logout = () => {
    localStorage.removeItem("blog-storage");
    dispatch(logoutAction());
    // router.push("/login"); // kalau mau setelah logout page berubah ke login page // dicomment karena pakai AuthGuard
  };

  return (
    <nav className="bg-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <Link href="/" className="text-xl font-bold">
            Logo
          </Link>

          <div className="flex cursor-pointer items-center gap-8 font-medium">
            <Link href="/">Home</Link>
            <Link href="/">Profile</Link>
            {!user.id && <Link href="/login">Sign In</Link>}
            {!!user.id && (
              <>
                <p onClick={() => router.push("/write")}>Write</p>
                <Button onClick={logout} className="hover:bg-red-800">
                  Logout
                </Button>
              </>
            )}

            {/* {user.id ? <p>Logout</p> : <Link href="/">Sign In</Link>} bisa juga seperti ini */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
