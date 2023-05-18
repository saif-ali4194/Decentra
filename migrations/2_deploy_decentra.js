// import Decentra from "../contracts/Decentra.sol";
const Decentra = artifacts.require("Decentra");
module.exports = function(deployer) {
  deployer.deploy(Decentra);
}