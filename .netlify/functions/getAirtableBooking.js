const axios = require("axios");
const qs = require("qs");

exports.handler = async function(event, context) {
  // apply our function to the queryStringParameters and assign it to a variable
  const API_PARAMS = qs.stringify(event.queryStringParameters);
  console.log("API_PARAMS", API_PARAMS);
  const { AIRTABLE_API_KEY, AIRTABLE_BOOKING_URL } = process.env;
  const URL = `${AIRTABLE_BOOKING_URL}?api_key=${AIRTABLE_API_KEY}`;

  console.log("Constructed URL is ...", URL);

  try {
    const { data } = await axios.get(URL);
    // refer to axios docs for other methods if you need them
    // for example if you want to POST data:
    //    axios.post('/user', { firstName: 'Fred' })
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    const { status, statusText, headers, data } = error.response;
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status, statusText, headers, data }),
    };
  }
};
