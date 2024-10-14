import { TOOLS_ADDRESS } from "@/constants/contratos";
import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";

import InventaryNFT from "./components/InventoryNFt";

interface InventaryProps {}

const Inventary: React.FC<InventaryProps> = () => {
  const address = useAddress();

  const { contract: toolsContract } = useContract(TOOLS_ADDRESS);

  const { data: ownedTools, isLoading: loadingOwnedTools } = useOwnedNFTs(
    toolsContract,
    address
  );

  return (
    <div className="cardInventary">
      <h2>Inventory:</h2>
      {!loadingOwnedTools && <InventaryNFT nft={ownedTools} />}
    </div>
  );
};

export default Inventary;
