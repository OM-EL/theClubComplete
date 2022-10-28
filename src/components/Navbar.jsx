import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { ImSun } from "react-icons/im";
import { BsFillMoonFill } from "react-icons/bs";
import logo from "../assets/logo.png";
import {ethers} from "ethers";



const Navbar = ({accounts, setAccounts, changeTheme, currentTheme, isConnected, setIsConnected }) => {
  const [navState, setNavState] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  async function connectAccount() {

    const walletResponse = await connectWallet();

  }

  async function requestAccount() {
    console.log('Requesting account...');

    // ❌ Check if Meta Mask Extension exists
    if(window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }


  async function connectWallet() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
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
          <li>
            <a href="#freebies" onClick={() => setNavState(false)}>
              Freebies
            </a>
          </li>
          <li>
            <a href="#super-rare" onClick={() => setNavState(false)}>
              Super Rare Auctions
            </a>
          </li>
          <li>
            <a href="#footer" onClick={() => setNavState(false)}>
              Contact
            </a>
          </li>
          <li>
            {
              !isConnected ? <a onClick={requestAccount}> Connect </a>
                  : <a onClick={ () => connectAccount()}> Disconnect </a>
            }
          </li>
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
