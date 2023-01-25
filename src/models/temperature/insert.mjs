import Temperature from "./temperature.mjs";

function select() {

  const insertData = (data) => {
    const jsonData = JSON.parse(data)

    Temperature.create(jsonData).then(() => {
      // TODO: Add code to insert log in to your database
    }).catch(err => {
      // TODO: Add code to insert error log in to your database
    })
  }

  return { insertData }
}
export default select