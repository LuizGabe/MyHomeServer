import Device from "./device.mjs";

function Operations() {
  const searchByMac = async (adress) => {
    return Device.findOne({
      where: { 
        macAdress: adress 
      }
    });
  }

  const all = async () => {
    return Device.findAll()
  }

  const create = (data) => Device.create(data)

  return {
    all,
    searchByMac,
    create
  }
}
  
export default Operations