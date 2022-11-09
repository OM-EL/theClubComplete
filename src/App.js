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
import {Web3Auth} from "@web3auth/web3auth";
import {OpenloginAdapter} from "@web3auth/openlogin-adapter";
import {CHAIN_NAMESPACES, SafeEventEmitterProvider} from "@web3auth/base";
import RPC from "./components/web3RPC.ts";
import web3 from "web3";

export const Screans = {
  Landing: "Landing",
  MyNfts: "MyNfts",
  MyProfil: "MyProfil",
  QR: "QR",
  About: "About"
}

const clientId = "BFc7ZCJJYLydMKxDtBK2NxtsYutCgPxB2uN7vaDcIUX2bQOU4TcE_yrA6Dy82yFgZpwjeFHAMBC3nQ4Hr1RWC5w";


function App() {
  const [theme, setTheme] = useState("dark");
  const [accounts , setAccounts] = useState([]);
  const [isConnected , setIsConnected] = useState(false);
  const [screen , setScreend] = useState(Screans.Landing);
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);



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
    const initAuth3 = async () => {
      try {

        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: web3.utils.toHex('80001'),
            rpcTarget: "https://polygon-mumbai.g.alchemy.com/v2/8sMz9VAouPOCaKqUXS_3Wck_AODUPbkD", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          uiConfig: {
            theme: "dark",
            loginMethodsOrder: ["facebook", "google"],
            appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg", // Your App Logo Here
          }
        });

        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "mandatory",
          },
          adapterSettings: {
            clientId,
            network: "testnet",
            uxMode: "popup",
            whiteLabel: {
              name: "Your app Name",
              logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
              defaultLanguage: "en",
              dark: true, // whether to enable dark mode. defaultValue: false
            },
          },
        });
        web3auth.configureAdapter(openloginAdapter);

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }

      } catch (error) {
        console.error(error);
      }
    };
    registerAnimations();
    initAuth3();
  }, []);


  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    return address;
  };

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
          <Navbar logout={logout} login={login} getAccounts={getAccounts}  screen={screen} setScreend={setScreend}   accounts={accounts} setAccounts={setAccounts}  isConnected ={isConnected} setIsConnected={setIsConnected} changeTheme={changeTheme} currentTheme={theme} />

          {
            renderScreen(screen)
          }
        <Footer />
      </div>
  );
}

export default App;

