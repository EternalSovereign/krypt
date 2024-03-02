require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.24",
    networks: {
        sepolia: {
            url: "https://eth-sepolia.g.alchemy.com/v2/YXYNC4LKLRJboolonk00EaPwPPeR0Qx1",
            accounts: [
                "5a2aef93aed9e172537d5a25865a1b44d94038efcd39189371909d1c522bbaac",
            ],
        },
    },
};
