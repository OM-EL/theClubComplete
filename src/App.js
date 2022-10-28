import "./scss/index.scss";
import {
  Clients,
  Footer,
  Free,
  Home,
  Navbar,
  ScrollToTop,
  Signup,
  SuperRare,
} from "./components";
import { useEffect, useState } from "react";
import scrollreveal from "scrollreveal";

function App() {
  const [theme, setTheme] = useState("dark");
  const [accounts , setAccounts] = useState([]);
  const [isConnected , setIsConnected] = useState(false);

  const changeTheme = () => {
      console.log(theme);
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  useEffect(() => {
    const registerAnimations = () => {
      const sr = scrollreveal({
        origin: "bottom",
        duration: 2000,
        reset: false,
      });
      sr.reveal(
          `
      nav, .home, .free, .clients, .super-rare, .signup, footer
      `,
          { interval: 500 }
      );
    };
    registerAnimations();
  }, []);

  window.setTimeout(() => {
    const home = document.getElementsByClassName("home");
    home[0].style.transform = "none";

    const nav = document.getElementsByTagName("nav");
    nav[0].style.transform = "none";
  }, 1500);

  return (
      <div className="App" data-theme={theme}>
        <ScrollToTop />
        <Navbar    accounts={accounts} setAccounts={setAccounts}  isConnected ={isConnected} setIsConnected={setIsConnected} changeTheme={changeTheme} currentTheme={theme} />
        <Home />
        <SuperRare accounts={accounts} setAccounts={setAccounts} />
        <Free />
        <Clients />
        <Signup />
        <Footer />
      </div>
  );
}

export default App;
