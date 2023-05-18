// import Migrations from "../contracts/Migrations.sol";
const Migrations = artifacts.require("Migrations");
module.exports =  function(deployer) {
  deployer.deploy(Migrations);
}