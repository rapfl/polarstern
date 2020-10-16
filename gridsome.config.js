// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Polarstern',
  titleTemplate: '%s - Polarstern',
  siteUrl: 'https://www.polarstern.me',
  icon: './src/assets/img/Polarstern_Logo.png',
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        // ...global plugins
      ]
    }
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'posts/**/*.md',
        typeName: 'Post',
        remark: {
          plugins: [
            // ...local plugins
          ]
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'workshops/**/*.md',
        typeName: 'Workshop',
        remark: {
          plugins: [
            // ...local plugins
          ]
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'company-offers/**/*.md',
        typeName: 'Company_offer',
        remark: {
          plugins: [
            // ...local plugins
          ]
        }
      }
    },
    {
      use: 'gridsome-plugin-netlify-cms',
      options: {
        publicPath: '/admin',
        modulePath: 'src/admin/index.js'
      }
    },
    {
      use: "@gridsome/source-airtable",
      options: {
        // Add these to a .env file
        // Details on finding these values can be found at:
        // https://gridsome.org/plugins/@gridsome/source-airtable
        apiKey: process.env.AIRTABLE_API_KEY, //required
        baseId: process.env.AIRTABLE_BASE_ID, //required
        tables: [{
            name: "Verf%C3%BCgbarkeiten",
            typeName: "Availability", //required - needs to match template name
            select: {}, //optional
            links: [], //optional
          },
          // Comment in this section and the line in `templates` for multiple tables!
          // {
          //   name: "Parties",
          //   typeName: "Parties", //required - needs to match template name
          //   select: {}, //optional
          //   links: [], //optional
          // },
        ],
      },
    },
  ],
  templates: {
    Availability: "/Verf%C3%BCgbarkeiten/:id", //optional
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  }
}
