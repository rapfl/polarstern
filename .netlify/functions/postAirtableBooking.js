const axios = require("axios");
const qs = require("qs");

exports.handler = async function(event, context) {
  // apply our function to the queryStringParameters and assign it to a variable
  const API_PARAMS = qs.stringify(event.queryStringParameters);
  console.log("API_PARAMS", API_PARAMS);
  // Get env var values defined in our Netlify site UI
  // TODO: customize your URL and API keys set in the Netlify Dashboard
  // this is secret too, your frontend won't see this
  const { AIRTABLE_API_KEY, AIRTABLE_BOOKING_URL } = process.env;
  const URL = `${AIRTABLE_BOOKING_URL}?api_key=${AIRTABLE_API_KEY}`;

  const config = {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  console.log('Url: ' + URL)
  console.log(
    'body: ' + event.body
  )

  try {
    const response = await axios.post(URL, event.body, config);
    console.log(response.data);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.log(error);
    const { status, statusText, headers, data } = error.response;
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status, statusText, headers, data }),
    };
  }
};
