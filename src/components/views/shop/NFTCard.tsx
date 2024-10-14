import {
  MediaRenderer,
  Web3Button,
  useActiveClaimCondition,
  useContract,
} from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { TOOLS_ADDRESS } from "@constant/contratos";
import { ethers } from "ethers";

import Image from "next/image";

type Props = {
  nft: NFT;
};

export default function NFTComponent({ nft }: Props) {
  const { contract } = useContract(TOOLS_ADDRESS);
  const { data, isLoading } = useActiveClaimCondition(
    contract,
    nft.metadata.id // Token ID required for ERC1155 contracts here.
  );

  return (
    <div className="nft">
      {/* <MediaRenderer src={nft.metadata.image} height="100%" width="100%" /> */}

      <div className="img">
        {nft.metadata.image && (
          <Image
            src={nft.metadata.image}
            alt="Descripción de la imagen"
            objectFit="cover"
            height={360}
            width={360}
          />
        )}
      </div>
      <div className="nombre">
        <h2>{nft.metadata.name}</h2>
      </div>

      {!isLoading && data ? (
        <p className="costo">
          Cost: {ethers.utils.formatEther(data?.price)}
          {" " + data?.currencyMetadata.symbol}
        </p>
      ) : (
        <p className="costo">Loading...</p>
      )}
      <div className="btn">
        <Web3Button
          contractAddress={TOOLS_ADDRESS}
          action={(contract) => contract.erc1155.claim(nft.metadata.id, 1)}
        >
          Buy NFT
        </Web3Button>
      </div>
    </div>
  );
}
