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
              <Link href="/withdraw">Withdraw</Link>
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
