"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
    const { data: session, status } = useSession();

    return (
        <div className="flex justify-end p-4 space-x-4">
            {status === "loading" ? (
                <span>로딩중...</span>
            ) : session ? (
                <>
                    <span>{session.user?.name} 님</span>
                    <button onClick={() => signOut()} className="btn">
                        로그아웃
                    </button>
                </>
            ) : (
                <button onClick={() => signIn("google")} className="btn-primary">
                    Google 로그인
                </button>
            )}
        </div>
    );
}
