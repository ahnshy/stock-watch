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
                <>
                    <span>{session.user?.name} 님</span>
                    <button
                        onClick={() => signOut()}
                        className="btn px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        로그아웃
                    </button>
                </>
            ) : (
                <button
                    onClick={() => signIn("google")}
                    className="btn-primary flex items-center px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                >
                    {/* 로고에 cursor-pointer 클래스만 주면 hover 시 포인터로 변합니다 */}
                    <img
                        src="/google_login_logo.svg"
                        alt="Google logo"
                        className="h-5 w-5 mr-2 cursor-pointer"
                    />
                    Google 로그인
                </button>
            )}
        </div>
    );
}
