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
    // {
    //   use: '@gridsome/source-filesystem',
    //   options: {
    //     path: 'posts/**/*.md',
    //     typeName: 'Post',
    //     remark: {
    //       plugins: [
    //         // ...local plugins
    //       ]
    //     }
    //   }
    // },
    // {
    //   use: '@gridsome/source-filesystem',
    //   options: {
    //     path: 'workshops/**/*.md',
    //     typeName: 'Workshop',
    //     remark: {
    //       plugins: [
    //         // ...local plugins
    //       ]
    //     }
    //   }
    // },
    // {
    //   use: '@gridsome/source-filesystem',
    //   options: {
    //     path: 'company-offers/**/*.md',
    //     typeName: 'Company_offer',
    //     remark: {
    //       plugins: [
    //         // ...local plugins
    //       ]
    //     }
    //   }
    // },
    {
      use: 'gridsome-plugin-netlify-cms',
      options: {
        publicPath: '/admin',
        modulePath: 'src/admin/index.js'
      }
    },
    {
      use: 'gridsome-source-storyblok',
      options: {
        client: {
          accessToken: process.env.STORYBLOK_API_KEY
        }
      }
    },
    {
      use: 'klaro-gridsome',
      options: {
        acceptAll: true,
        privacyPolicy: '/datenschutz',
        cookieName: 'consent',
        lang: 'de',
        translations: {
          de: {
            acceptSelected: "Nur ausgewählte zustimmen",
            consentModal: {
              description: 'Hier können Sie die Informationen, die wir über Sie sammeln, einsehen und anpassen.',
            },
            googleAnalytics: {
              description: 'Website-Analysen mit Google Analytics, die es uns ermöglichen zu sehen, wie Besucher unsere Website nutzen.'
            },
            purposes: {
              analytics: 'Analysen'
            },
          },
        },
        apps: [{
          name: 'googleAnalytics',
          default: false,
          title: 'Google Analytics',
          purposes: ['analytics'],
          cookies: [
            '_ga',
            '_gcl_au',
            '_gid',
            '_gat'
          ],
          required: false,
          optOut: true,
          onlyOnce: false
        }]
      }
    }
  ],
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  }
}
