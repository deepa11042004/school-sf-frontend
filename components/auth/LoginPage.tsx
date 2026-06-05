"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthBanner from "@/components/auth/AuthBanner";

const GoogleIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 48 48"
  >
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s12-5.373 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z"
    />
  </svg>
);

export default function LoginPage() {
  const router = useRouter();

  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [keepSignedIn, setKeepSignedIn] = useState<boolean>(true);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    setErrorMsg("");

    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    );
    const email = formData.email as string;
    const password = formData.password as string;

    const validEmail = process.env.NEXT_PUBLIC_VALID_EMAIL;
    const validPassword = process.env.NEXT_PUBLIC_VALID_PASSWORD;

    setTimeout(() => {
      if (email === validEmail && password === validPassword) {
        router.push("/dashboard");
      } else {
        setErrorMsg("Invalid email or password.");
      }
      setFormLoading(false);
    }, 600);
  };

  const handleGoogleSignIn = () => {
    setErrorMsg("Google sign-in is disabled in prototype mode.");
  };

  const handleResetPassword = () => {
    router.push("/auth/forgot");
  };

  return (
    // 1. Standardized wrapper for split-screen layout
    <div className="h-screen flex  ">
      {/* Banner Side (Placed first to appear on the left) */}
      <AuthBanner />

      {/* Form Container Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8  ">
        <div className="w-full max-w-md space-y-6 p-6 sm:p-8    ">
          {/* 2. Mobile-specific header that hides on desktop */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-3">
              <span className="text-zinc-900 font-bold text-xl">C</span>
            </div>
            <h1 className="text-2xl font-bold text-white">CMS Full Form</h1>
          </div>

          {/* Header */}
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight  ">
              Welcome Back
            </h1>
            <p className="text-sm text-zinc-600">
              Access your account and continue your journey with us
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-wider text-zinc-400"
              >
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                className="h-11 rounded-xl  block w-full"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wider text-slate-400"
              >
                Password
              </Label>
              <div className="relative flex items-center">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="h-11 rounded-xl  pr-10 block w-full"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9  "
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  
                  checked={keepSignedIn}
                  onChange={() => setKeepSignedIn(!keepSignedIn)}
                  className="rounded border-transparent  text-slate-700"
                />
                <span className="text-gray-400">Keep me signed in</span>
              </label>
              <button
                type="button"
                onClick={handleResetPassword}
                className="   hover:underline"
              >
                Forgot password
              </button>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <p className="text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg animate-in fade-in-50">
                {errorMsg}
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={formLoading}
              className="w-full h-11 font-medium rounded-xl  mt-2"
            >
              {formLoading ? (
                <span className="flex items-center gap-2 justify-center">
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Separator */}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

          {/* OAuth Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full h-11 border-transparent rounded-xl   gap-2 font-medium"
          >
            <GoogleIcon /> Continue with Google
          </Button>

          {/* Footer */}
          <p className="text-center text-sm text-slate-600  ">
            New to our platform?{" "}
            <Button
              type="button"
              variant="link"
              onClick={() => router.push("/auth/register")}
              className="text-xs font-medium   hover:underline p-0 h-auto inline-flex"
            >
              Create Account
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
