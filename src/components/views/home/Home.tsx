import sliderPrincipal from "@img/bg-shop.png";
import Header from "@/components/layout/Header";
import ImgBg from "@/components/nano/ImgBg";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";

import Heroes from "./Heroes";
import Inventary from "./Inventory";
import Equipped from "./Equipped";
import { FARMER_ADDRESS } from "@/constants/contratos";

import ClaimFarmer from "./ClaimFarmer";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const address = useAddress();
  const { contract: farmercontract } = useContract(FARMER_ADDRESS);

  const { data: ownedFarmers } = useOwnedNFTs(farmercontract, address);

  return (
    <ImgBg src={sliderPrincipal} idBg="bgHome">
      <Header />
      <main>
        <div className="content">
          {address !== undefined ? (
            ownedFarmers?.length === 0 ? (
              <div className="container-claimFarmer">
                <ClaimFarmer />
              </div>
            ) : (
              <>
                <div className="container-heroes-inventario">
                  <Heroes />
                  <Inventary />
                </div>
                <div className="container-equipo">
                  <Equipped />
                </div>
              </>
            )
          ) : (
            <>
            <img src="/logo.png" alt="Logo de Dark Age Legends" style={{ width: '400px', height: 'auto' }} />
              <h2>Dark Age LegendS</h2>
              <p>Defend the world with your NFTs</p>
              <ConnectWallet className="wallet" style={{ marginBottom: '20px' }} />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <a href="https://t.me/darkagelegends" target="_blank" rel="noopener noreferrer">
             <img src="/imagen1.png" alt="Telegram" style={{ marginRight: '10px' }} width="50" height="auto"  />
             </a>
            <a href="https://www.anotherexample.com" target="_blank" rel="noopener noreferrer">
            <img src="/imagen2.jpg" alt="Discord" style={{ marginRight: '10px' }} width="50" height="auto" />
            </a>
            </div>
            </>
          )}
        </div>
      </main>
    </ImgBg>
  );
};
export default Home;
