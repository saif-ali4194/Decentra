const DecentraModules = artifacts.require("DecentraModules");
module.exports =  function(deployer) {
  deployer.deploy(DecentraModules);
}