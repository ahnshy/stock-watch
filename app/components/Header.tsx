// app/components/Header.tsx
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
    const { data: session, status } = useSession();

    return (
        <div className="flex justify-end p-4 space-x-4 items-center">
            {status === "loading" ? (
                <span>로딩중...</span>
            ) : session ? (
                <button
                    onClick={() => signOut()}
                    className="cursor-pointer"
                >
                    <img
                        src={session.user?.image ?? "/default-profile.png"}
                        alt={session.user?.name ?? "Profile"}
                        className="h-10 w-10 rounded-full object-cover hover:ring-2 hover:ring-gray-400 transition"
                    />
                </button>
            ) : (
                <button
                    onClick={() => signIn("google")}
                    className="
            cursor-pointer
            flex items-center
            px-4 py-2 rounded
            bg-black hover:bg-gray-800
            text-white
            transition-colors duration-200
          "
                >
                    <img
                        src="/google_login_logo.svg"
                        alt="Google logo"
                        className="h-5 w-5 mr-2"
                    />
                    Google 로그인
                </button>
            )}
        </div>
    );
}
