import { useState } from "react";
import { useNavigate } from "react-router";
import { useContentStore } from "../store/contentStore";
import { DocumentHead } from "../components/DocumentHead";
import { motion } from "motion/react";
import { Lock, Eye, EyeOff, Mail, ArrowRight } from "lucide-react";
import ssocialsWhite from "../../assests/ssocials-white-transparent.svg";
import fluidBg from "../../assests/fluid-bg.jpg";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { loginWithEmail } = useContentStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await loginWithEmail(email, password);
    if (result.ok) {
      navigate("/admin");
    } else {
      setError("Invalid credentials. Please try again.");
      setPassword("");
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col md:flex-row overflow-auto"
      style={{
        backgroundImage: `url(${fluidBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <DocumentHead title="Admin Login — S.Socials" description="Login to admin panel" />

      {/* ── Left panel — transparent, logo floats over background ── */}
      <div className="flex-shrink-0 w-full md:w-[55%] min-h-[130px] md:min-h-0 flex flex-col items-center justify-center px-6 md:px-10 py-8 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center gap-5"
        >
          <img
            src={ssocialsWhite}
            alt="S.Socials"
            className="w-28 sm:w-36 md:w-48 xl:w-56 object-contain"
          />
          <div className="h-[1px] w-24" style={{ background: "rgba(196,203,214,0.4)" }} />
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/60">
            Admin Portal
          </p>
        </motion.div>
      </div>

      {/* ── Right panel — transparent, form floats over background ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-8 md:py-0">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="w-full max-w-[380px]"
        >
          <h1 className="text-[22px] md:text-[28px] font-light tracking-tight text-white leading-tight mb-1">
            Welcome back
          </h1>
          <p className="text-[13px] text-white/50 mb-8 tracking-wide">
            Sign in to your admin account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-widest text-white/50 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className="w-full pl-11 py-3.5 bg-white/10 border border-white/20 focus:border-white/50 focus:outline-none transition-all text-[14px] text-white placeholder:text-white/30 backdrop-blur-sm"
                  placeholder="admin@ssocials.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-widest text-white/50 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className="w-full pl-11 pr-11 py-3.5 bg-white/10 border border-white/20 focus:border-white/50 focus:outline-none transition-all text-[14px] text-white placeholder:text-white/30 backdrop-blur-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-[12px] text-red-400">{error}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 mt-2 border border-white/30 bg-white/10 text-white text-[11px] tracking-[0.2em] uppercase hover:bg-white hover:text-[#03234d] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 backdrop-blur-sm"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-[11px] text-white/30 tracking-wide">
            Contact your administrator if you need access.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
