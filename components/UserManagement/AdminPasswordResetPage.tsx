"use client";

import { useState } from "react";
import {
  ShieldAlert,
  Eye,
  EyeOff,
  KeyRound,
  AlertTriangle,
  ShieldUser,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CheckCircle2, Circle } from "lucide-react";

function Requirement({ met, label }: { met: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {met ? (
        <CheckCircle2 className="h-4 w-4 text-green-600" />
      ) : (
        <Circle className="h-4 w-4 text-muted-foreground" />
      )}

      <span className={met ? "text-green-700" : "text-muted-foreground"}>
        {label}
      </span>
    </div>
  );
}

export default function AdminPasswordResetPage() {
  const [selectedAdmin, setSelectedAdmin] = useState("");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const getPasswordStrength = (password: string) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const getStrengthLabel = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 3) return "Medium";
    if (passwordStrength === 4) return "Strong";

    return "Very Strong";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      // API Call Here
      console.log({
        admin: selectedAdmin,
        password: formData.password,
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Admin Password Reset</h1>
      </div>

      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            Reset Password
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Securely reset passwords for School Administrators
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Administrator Selection */}
            <div className="space-y-2">
              <Label>
                Select Administrator <span className="text-destructive">*</span>
              </Label>

              <Select value={selectedAdmin} onValueChange={setSelectedAdmin}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an Admin..." />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="principal">
                    John Smith (Principal)
                  </SelectItem>

                  <SelectItem value="vice-principal">
                    Sarah Wilson (Vice Principal)
                  </SelectItem>

                  <SelectItem value="system-admin">
                    Michael Brown (System Admin)
                  </SelectItem>

                  <SelectItem value="accounts-admin">
                    Emma Davis (Accounts Admin)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label>
                New Password <span className="text-destructive">*</span>
              </Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="Enter new password"
                  className="pr-10"
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Password Strength Bar */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all ${
                        passwordStrength <= 1
                          ? "bg-red-500"
                          : passwordStrength <= 2
                            ? "bg-yellow-500"
                            : passwordStrength <= 3
                              ? "bg-blue-500"
                              : "bg-green-500"
                      }`}
                      style={{
                        width: `${(passwordStrength / 5) * 100}%`,
                      }}
                    />
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Password Strength:{" "}
                    <span className="font-medium">{getStrengthLabel()}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label>
                Confirm Password <span className="text-destructive">*</span>
              </Label>

              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  placeholder="Confirm password"
                  className="pr-10"
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-sm text-destructive">
                    Passwords do not match.
                  </p>
                )}
            </div>

            {/* Password Requirements */}

            <div className="rounded-xl border bg-slate-50 p-4">
              <h4 className="mb-3 font-medium text-slate-900">
                Password Requirements
              </h4>

              <div className="space-y-2">
                <Requirement
                  met={formData.password.length >= 8}
                  label="At least 8 characters"
                />

                <Requirement
                  met={/[A-Z]/.test(formData.password)}
                  label="One uppercase letter"
                />

                <Requirement
                  met={/[a-z]/.test(formData.password)}
                  label="One lowercase letter"
                />

                <Requirement
                  met={/[0-9]/.test(formData.password)}
                  label="One number"
                />

                <Requirement
                  met={/[^A-Za-z0-9]/.test(formData.password)}
                  label="One special character"
                />
              </div>
            </div>

            {/* Security Guidelines */}
            <div className="rounded-lg border bg-amber-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <AlertTriangle fill="#F59E0B" className="h-6 w-6 text-white" />

                <h3 className="font-semibold text-amber-900">
                  Security Guidelines
                </h3>
              </div>

              <ul className="space-y-2 text-sm text-amber-800">
                <li>
                  • Administrators have high-level access to the school ERP.
                  Ensure passwords are complex.
                </li>

                <li>
                  • This reset is immediate and will log out the administrator
                  from other sessions.
                </li>

                <li>• The password must be at least 8 characters long.</li>
              </ul>
            </div>

            {/* Administrative Note */}
            <div className="rounded-lg border bg-blue-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <ShieldAlert fill="#2e25dd" className="h-6 w-6 text-white" />

                <h3 className="font-semibold text-blue-800">
                  Administrative Note
                </h3>
              </div>

              <p className="text-sm text-blue-900">
                Resetting a password here does not require the user's old
                password. Use this feature only when an administrator has lost
                access or for security protocol.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-start items-center">
              <Button
                type="submit"
                disabled={
                  !selectedAdmin ||
                  !formData.password ||
                  !formData.confirmPassword ||
                  formData.password !== formData.confirmPassword ||
                  passwordStrength < 2 ||
                  isLoading
                }
              >
                <KeyRound className="mr-2 h-4 w-4" />

                {isLoading ? "Resetting..." : "Reset Admin Password"}
              </Button>

              <Button type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
