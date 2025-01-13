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
    nft.metadata.id // Token ID required for ERC1155 contracts aquí.
  );

  // Función para seleccionar aleatoriamente uno de los NFTs según las probabilidades
  const selectNFT = () => {
    const rand = Math.random() * 100;
    if (rand < 50) {
      return 0; // ID del NFT 0
    } else if (rand < 80) {
      return 1; // ID del NFT 1
    } else if (rand < 97.5) {
      return 2; // ID del NFT 2
    } else {
      return 3; // ID del NFT 3
    }
  };

  // Acción a realizar cuando se presiona el botón "Mintear"
  const handleMintButtonClick = async () => {
    if (!contract) return;

    const selectedNFT = selectNFT();
    await contract.erc1155.claim(selectedNFT, 1);
  };

  // Renderizar solo el NFT con ID 1 con el botón "Mintear"
  if (nft.metadata.id === "6") {
    return (
      <div className="nft">
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
          <button onClick={handleMintButtonClick}>Mintear</button>
        </div>
      </div>
    );
  }

  // Renderizar los NFTs con ID 5 y 6 con el botón "Buy NFT"
  if (nft.metadata.id === "4" || nft.metadata.id === "5" || nft.metadata.id === "7" ) {
    return (
      <div className="nft">
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

  // No renderizar otros NFTs
  return null;
}