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
import NftList from "./components/NftList";
import EnterTheClub from "./components/EnterTheClub";

export const Screans = {
  Landing: "Landing",
  MyNfts: "MyNfts",
  MyProfil: "MyProfil",
  QR: "QR",
  About: "About"
}

function App() {
  const [theme, setTheme] = useState("dark");
  const [accounts , setAccounts] = useState([]);
  const [isConnected , setIsConnected] = useState(false);
  const [screen , setScreend] = useState(Screans.Landing);


  const changeTheme = () => {
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

    const nav = document.getElementsByTagName("nav");
    nav[0].style.transform = "none";
  }, 1500);


  function renderScreen(screen) {
    switch(screen) {
      case Screans.Landing:
        return <div>
                      <Home />
                      <SuperRare accounts={accounts} setAccounts={setAccounts} isConnected ={isConnected}  />
                      <Free />
                      <Clients />
                      <Signup />
               </div>;
      case Screans.MyNfts:
        return <div>
          { isConnected ? <NftList accounts={accounts} setAccounts={setAccounts} isConnected ={isConnected}   /> : <div>  <br/> <br/> <h3 style={{color : 'white'}}> You need to connect your wallet to see yout NFT's </h3> </div>}
               </div>;
      case Screans.QR:
        return <div>
          { isConnected ? <EnterTheClub accounts={accounts} setAccounts={setAccounts} isConnected ={isConnected}   /> : <div>  <br/> <br/> <h3 style={{color : 'white'}}> You need to connect your wallet to enter the club </h3> </div>}
        </div>;
      default:
        return <div></div>;
    }
  }

  return (
      <div className="App" data-theme={theme}>
        <ScrollToTop />
          <Navbar screen={screen} setScreend={setScreend}   accounts={accounts} setAccounts={setAccounts}  isConnected ={isConnected} setIsConnected={setIsConnected} changeTheme={changeTheme} currentTheme={theme} />

          {
            renderScreen(screen)
          }
        <Footer />
      </div>
  );
}

export default App;

