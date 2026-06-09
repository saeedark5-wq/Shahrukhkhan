"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast.error("Please enter the admin password");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("admin_token", data.token);
        toast.success("Welcome back!");
        router.push("/admin");
      } else {
        toast.error("Invalid password");
      }
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mx-auto mb-4">
            <span className="text-black font-bold text-2xl">S</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-white">
            Admin Login
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Pyramid Star Real Estate Brokerage
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-card border border-card-border rounded-sm p-8 space-y-5"
        >
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
              placeholder="Enter admin password"
              autoFocus
            />
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gold text-black font-semibold rounded-sm hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        <p className="text-center mt-6 text-gray-500 text-xs">
          Secure admin access only. Unauthorized access is prohibited.
        </p>
      </motion.div>
    </div>
  );
}
