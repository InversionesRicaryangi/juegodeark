import { STAKING_ADDRESS, TOOLS_ADDRESS } from "@/constants/contratos";
import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useNFT,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

import Image from "next/image";

interface EquippedNFTProps {
  tokenId: number;
}

const EquippedNFT: React.FC<EquippedNFTProps> = ({ tokenId }) => {
  const address = useAddress();

  const { contract: toolContract } = useContract(TOOLS_ADDRESS);
  const { data: nft } = useNFT(toolContract, tokenId);

  const { contract: stakingContract } = useContract(STAKING_ADDRESS);

  const { data: claimableRewards } = useContractRead(
    stakingContract,
    "getStakeInfoForToken",
    [tokenId, address]
  );

  return (
    <>
      {nft && (
        <div className="nft-comprado">
          <div className="img">
            {nft.metadata.image && (
              <Image
                src={nft.metadata.image}
                alt="NFT Image"
                width={360}
                height={360}
                objectFit="cover"
              />
            )}
          </div>
          <div className="container-btns-titulos">
            <div>
              <h3 className="titulo">{nft.metadata.name}</h3>
              <p>Equipped:{ethers.utils.formatUnits(claimableRewards[0], 0)}</p>
            </div>

            <div>
              <h3>
                Claimable:{" "}
                {ethers.utils
                  .formatUnits(claimableRewards[1], 18)
                  .substring(0, 5)}
              </h3>
            </div>
          </div>

          <div className="container-btns">
            <Web3Button
              contractAddress={STAKING_ADDRESS}
              action={(contract) => contract.call("withdraw", [tokenId, 1])}
              className="nft-btn"
            >
              Unequip
            </Web3Button>
            <Web3Button
              contractAddress={STAKING_ADDRESS}
              action={(contract) => contract.call("claimRewards", [tokenId])}
              className="nft-btn"
            >
              Claim $DW
            </Web3Button>
          </div>
        </div>
      )}
    </>
  );
};

export default EquippedNFT;
