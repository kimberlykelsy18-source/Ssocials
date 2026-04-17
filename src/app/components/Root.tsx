import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useContentStore } from "../store/contentStore";
import { getSession } from "@backend/db";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export function Root() {
  const { loadFromSupabase } = useContentStore();

  // On mount: restore Supabase auth session + load latest content from DB
  useEffect(() => {
    async function init() {
      const session = await getSession();
      if (session) {
        useContentStore.setState({ isAuthenticated: true });
      }
      // Always load latest CMS content from Supabase on first render
      await loadFromSupabase();
    }
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
