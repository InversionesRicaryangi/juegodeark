import { MediaRenderer, Web3Button, useContract, useContractMetadata } from "@thirdweb-dev/react";
import { FARMER_ADDRESS } from "@/constants/contratos";

const ClaimFarmer = () => {
  const { contract } = useContract(FARMER_ADDRESS);
  const { data: metadata } = useContractMetadata(contract);

  return (
    <div
      style={{
        maxWidth: "1200px",
        backgroundImage: `url('/images/Slider_principal.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <h1 style={{ color: "white",borderRadius: "-150px", marginTop: "100px",
          marginBottom: "-400px",}} >
        Claim your DARK AGE LEGENDS to start generating
      </h1>
      <div
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          marginTop: "-150px",
          marginBottom: "-150px",
          
        }}
      >
        <MediaRenderer src={metadata?.image} height="500px" width="500px" />
      </div>

      <Web3Button
        contractAddress={FARMER_ADDRESS}
        action={(contract) => contract.erc1155.claim(0, 1)}
        className="wallet" style={{ marginBottom: '-50px' , marginTop: "100px"}}
        
      >
        Claim DARK AGE LEGENDS 
      </Web3Button>
    </div>
  );
};

export default ClaimFarmer;
