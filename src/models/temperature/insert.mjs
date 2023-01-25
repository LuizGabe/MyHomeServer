import Temperature from "./temperature.mjs";

  const insertData = (data) => {
    Temperature.create(data).then(() => {
      // TODO: Add code to insert log in to your database
    }).catch(err => {
      // TODO: Add code to insert error log in to your database
    })
  }

  export { insertData }