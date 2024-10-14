import { useContract, useNFTs } from "@thirdweb-dev/react";
import { TOOLS_ADDRESS } from "@constant/contratos";

import Header from "@/components/layout/Header";
import sliderPrincipal from "@img/bg-shop.png";
import ImgBg from "@/components/nano/ImgBg";
import NFT from "./NFTCard";

interface ShopProps {}

const Shop: React.FC<ShopProps> = () => {
  const { contract } = useContract(TOOLS_ADDRESS);
  const { data: nfts } = useNFTs(contract);

  return (
    <ImgBg src={sliderPrincipal} className="shop">
      <Header />
      <main>
        <div className="titulo">
          <h1>Shop</h1>
          <p>Buy your Herues to earn more $DAL tokens and make more profits.</p>
        </div>
        {!nfts ? (
          <div
            style={{
              height: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Loading...
          </div>
        ) : (
          <div className="nft-container">
            {nfts?.map((nftItem) => (
              <NFT key={nftItem.metadata.id} nft={nftItem} />
            ))}
          </div>
        )}
      </main>
      ;
    </ImgBg>
  );
};

export default Shop;
