import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
} from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { STAKING_ADDRESS, TOOLS_ADDRESS } from "@/constants/contratos";
import Link from "next/link";

import Image from "next/image";

type InventaryNFTProps = {
  nft: NFT[] | undefined;
};

const InventaryNFT: React.FC<InventaryNFTProps> = ({ nft }) => {
  const address = useAddress();
  const { contract: toolContract } = useContract(TOOLS_ADDRESS);
  const { contract: stakingContract } = useContract(STAKING_ADDRESS);

  async function stakeNFT(id: string) {
    if (!address) {
      return;
    }

    const isApproved = await toolContract?.erc1155.isApproved(
      address,
      STAKING_ADDRESS
    );

    if (!isApproved) {
      await toolContract?.erc1155.setApprovalForAll(STAKING_ADDRESS, true);
    }
    await stakingContract?.call("stake", [id, 1]);
  }

  if (nft?.length === 0) {
    return (
      <div>
        <p>No hero.</p>
        <Link href="/shop">
          <button>Buy heroes</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-nft-comprados">
      {nft?.map((nft) => (
        <div key={nft.metadata.id} className="nft-comprado">
          {nft.metadata.image && (
            <div className="img">
              <Image
                src={nft.metadata.image}
                alt="NFT Image"
                height={200}
                width={200}
              />
            </div>
          )}

          <p className="titulo">{nft.metadata.name}</p>
          <Web3Button
            contractAddress={STAKING_ADDRESS}
            action={() => stakeNFT(nft.metadata.id)}
            className="nft-btn"
          >
            Equip
          </Web3Button>
        </div>
      ))}
    </div>
  );
};

export default InventaryNFT;
