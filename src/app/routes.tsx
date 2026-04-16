import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { PackagesPage } from "./pages/PackagesPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { PersonalBrandingPage } from "./pages/PersonalBrandingPage";
import { ProcessPage } from "./pages/ProcessPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminPage } from "./pages/AdminPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "services", Component: ServicesPage },
      { path: "packages", Component: PackagesPage },
      { path: "portfolio", Component: PortfolioPage },
      { path: "personal-branding", Component: PersonalBrandingPage },
      { path: "process", Component: ProcessPage },
      { path: "contact", Component: ContactPage },
      { path: "login", Component: LoginPage },
      { path: "admin", Component: AdminPage },
      { path: "*", Component: NotFound },
    ],
  },
]);