import { STAKING_ADDRESS } from "@/constants/contratos";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";

import { BigNumber } from "ethers";
import EquippedNFT from "./components/EquippedNFT";

interface EquippedProps {}

const Equipped: React.FC<EquippedProps> = () => {
  const address = useAddress();
  const { contract: stakingContract } = useContract(STAKING_ADDRESS);
  const { data: equippedTools } = useContractRead(
    stakingContract,
    "getStakeInfo",
    [address]
  );

  return (
    <div className="equipo">
      <h2>Monsters to attack:</h2>
      <div className="container-nft-equipados">
        {equippedTools &&
          equippedTools[0].map((nft: BigNumber) => (
            <EquippedNFT key={nft.toNumber()} tokenId={nft.toNumber()} />
          ))}
      </div>
    </div>
  );
};

export default Equipped;
