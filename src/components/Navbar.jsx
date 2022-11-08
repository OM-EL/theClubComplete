import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { ImSun } from "react-icons/im";
import { BsFillMoonFill } from "react-icons/bs";
import logo from "../assets/logo.png";
import {Screans} from "../App";



const Navbar = ({screen , setScreend,accounts, setAccounts, changeTheme, currentTheme, isConnected, setIsConnected }) => {
  const [navState, setNavState] = useState(false);
  const connectAccount = async () => {
    if(isConnected) {
      setIsConnected(false);
      setAccounts([]);
      return;
    }
    if(window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setIsConnected(true);
      setAccounts(accounts);
    }
  }

  function tabsOnScreen()
  {
    if(screen === Screans.Landing) {
      return <ul className="links">
              <li>
                <a href="#freebies" onClick={() => setScreend(Screans.QR)}>
                  Enter the club
                </a>
              </li>
              <li>
                <a href="#super-rare" onClick={() => setScreend(Screans.Landing)}>
                  Home
                </a>
              </li>
              <li>
                <a href="#super-rare" onClick={() => setScreend(Screans.MyNfts)}>
                  My Cards
                </a>
              </li>
              <li>
                <a href="#footer" onClick={() => setNavState(false)}>
                  Contact
                </a>
              </li>
           </ul>
    }

    if(screen === Screans.MyNfts || screen === Screans.QR )
    {
     return <ul className="links">
       <li>
         <a href="#super-rare" onClick={() => setScreend(Screans.Landing)}>
           Home
         </a>
       </li>
     </ul>


    }
  }


  return (
    <nav>
      <div className="brand-container">
        <div className="brand">
          <img src={logo} alt="logo" />
        </div>
        <div className="toggle-container">
          <div className="toggle">
            {navState ? (
              <MdClose onClick={() => setNavState(false)} />
            ) : (
              <GiHamburgerMenu onClick={() => setNavState(true)} />
            )}
          </div>
          <div className="mode">
            {currentTheme === "dark" ? (
              <ImSun className="light" onClick={changeTheme} />
            ) : (
              <BsFillMoonFill className="dark" onClick={changeTheme} />
            )}
          </div>
        </div>
      </div>
      <div className={`links-container ${navState ? "nav-visible" : ""}`}>
        <ul className="links">
          {
            tabsOnScreen()
          }
            {
              isConnected ? (
                  <div>
                    <li>
                      <a onClick={connectAccount}> Disconnect </a>
                    </li>
                  </div>)
                  :
                  ( <li>
                    <a onClick={connectAccount}> Connect </a>
                  </li>)

            }

          <li onClick={changeTheme}>
            {currentTheme === "dark" ? (
              <ImSun className="light" />
            ) : (
              <BsFillMoonFill className="dark" />
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
