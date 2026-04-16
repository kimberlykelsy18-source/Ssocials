import { useState } from "react";
import { useNavigate } from "react-router";
import { useContentStore } from "../store/contentStore";
import { DocumentHead } from "../components/DocumentHead";
import { Button } from "../components/Button";
import { motion } from "motion/react";
import { Lock } from "lucide-react";

export function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContentStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    
    if (success) {
      navigate("/admin");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <DocumentHead title="Admin Login — S.Socials" description="Login to admin panel" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[400px]"
      >
        <div className="mb-24 text-center">
          <div className="inline-flex items-center justify-center w-48 h-48 mb-16 bg-primary/10 border border-primary/20">
            <Lock className="w-20 h-20 text-primary" />
          </div>
          <h1 className="text-[20px] md:text-[24px] tracking-[-0.01em] mb-8">
            Admin Login
          </h1>
          <p className="text-[12px] md:text-[13px] opacity-60">
            Enter your password to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-16">
          <div>
            <label htmlFor="password" className="block mb-8 text-[12px] tracking-[0.05em]">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full px-16 py-12 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter password"
              autoFocus
            />
            {error && (
              <p className="mt-8 text-[12px] text-destructive">{error}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <div className="mt-24 p-16 bg-secondary border border-border">
          <p className="text-[11px] opacity-60 text-center">
            Default password: <span className="font-medium">yourpassword</span>
          </p>
          <p className="mt-4 text-[10px] opacity-40 text-center">
            Change this in /src/app/store/contentStore.ts
          </p>
        </div>
      </motion.div>
    </div>
  );
}
