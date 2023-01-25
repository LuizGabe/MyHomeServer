import Temperature from "./temperature.mjs";

function insertData(data) {
  const jsonData = JSON.parse(data);

  Temperature.create(jsonData).then(() => {
    // TODO: Add code to insert log in to your database
  }).catch(err => {
    // TODO: Add code to insert error log in to your database
  })
}
export default insertData;