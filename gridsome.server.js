// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async actions => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const { data } = await axios.get(`${process.env.AIRTABLE_AVAILABILITY_URL}?api_key=${process.env.AIRTABLE_API_KEY}`)

    const collection = actions.addCollection('Availability')

    for (const item of data.records) {
      collection.addNode({
        id: item.id,
        name: item.fields.Name,
        tag: item.fields.Tag,
        person: item.fields.Person
      })
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
