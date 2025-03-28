'use client'

import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("./LoginForm"), {
  ssr: false,
  loading: () => (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-red-200 rounded"></div>
        </div>
      </div>
    </div>
  ),
});

export default function LoginFormWrapper() {
  return <LoginForm />;
} 