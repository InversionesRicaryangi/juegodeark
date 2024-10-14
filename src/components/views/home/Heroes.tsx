import {
  MediaRenderer,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
} from "@thirdweb-dev/react";

import { FARMER_ADDRESS, REWARDS_ADDRESS } from "@constant/contratos";
import { ethers } from "ethers";

import Image from "next/image";

interface HeroesProps {}

const Heroes: React.FC<HeroesProps> = () => {
  const address = useAddress();

  const { contract: farmercontract } = useContract(FARMER_ADDRESS);
  const { contract: rewardContract } = useContract(REWARDS_ADDRESS);

  const { data: ownedFarmers } = useOwnedNFTs(farmercontract, address);

  const { data: rewardBalance } = useContractRead(rewardContract, "balanceOf", [
    address,
  ]);

  return (
    <div className="cardHeroes">
      <div className="titulo">
        <h2>Heroes:</h2>
      </div>

      {ownedFarmers?.map((nft) => (
        <div className="img" key={nft.metadata.id}>
          {nft.metadata.image && (
            <Image
              src={nft.metadata.image}
              alt="NFT Image"
              height={360}
              width={360}
              objectFit="cover"
            />
          )}
        </div>
      ))}

      <div className="datos">
        <p>
          $Balance:{" "}
          {rewardBalance && <>{ethers.utils.formatUnits(rewardBalance, 18)}</>}
        </p>
      </div>
    </div>
  );
};

export default Heroes;
