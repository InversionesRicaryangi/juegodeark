import React, { useState } from "react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  /*  const address = useAddress(); */
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="header">
      <div className="desktop">
      <img src="/logo.png" alt="Logo de Dark Age Legends" className="logo" />
        <h2></h2>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`hamburguesa ${isOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link href="/">Play</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <a href="https://home.goksway.com/login" target="_blank">Withdraw</a>
            </li>
            <li>
              <a href="https://dark-age-legends.gitbook.io/dark-age-legends/~/changes/5OiqmHv8aTso8Zttxi2U?r=S4tQb6SS0oKa1qvOE4tA" target="_blank">WHITEPAPER</a>
            </li>
            <li>
              <ConnectWallet className="wallet" btnTitle="wallet" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
