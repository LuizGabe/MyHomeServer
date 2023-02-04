import Device from "./device.mjs";

const findByMacAdress = async (adress) => {
  return Device.findOne({
    where: { 
      macAdress: adress 
    }
  });
}

export { findByMacAdress }