const axios = require('axios')
const qs = require('qs')

exports.handler = async function(event, context) {
  // apply our function to the queryStringParameters and assign it to a variable
  const API_PARAMS = qs.stringify(event.queryStringParameters)
  console.log('API_PARAMS', API_PARAMS)
  // Get env var values defined in our Netlify site UI

  // TODO: customize your URL and API keys set in the Netlify Dashboard
  // this is secret too, your frontend won't see this
  const { GRIDSOME_API_SECRET, GRIDSOME_API_URL } = process.env;
  const URL  = `${GRIDSOME_API_URL}?api_key=${GRIDSOME_API_SECRET}`;


 /* const callObject = {
   data: {
     records: [
       {
         fields: {
           "Art der Organisation": "Schule",
           Klassenname: "1B",
           Herzkiste: true,
           Status: "Ausstehend",
           Start: "2020-09-24T11:30:00.000Z",
         },
       },
     ],
   },
 }; */
 /*const URL =
   process.env.GRIDSOME_API_URL +
   "?api_key=" +
   process.env.GRIDSOME_API_SECRET;

*/

const config = {
  headers: {
    "Authorization": `Bearer ${GRIDSOME_API_KEY}`,
    "Content-Type": "application/json"
  }
}
   
   await axios.post(URL, event.data, config)
   .then((result) => {
   return {
     statusCode: 200,
     body: JSON.stringify(result.data)
   }
 });

  console.log('Constructed URL is ...', URL)
}

 
