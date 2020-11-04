// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios')

module.exports = function (api) {
  api.chainWebpack((config, { isServer }) => {
    if (isServer) {
      config.externals([
        nodeExternals({
          allowlist: [/^vuetify/]
        })
      ])
    }
  })

  api.loadSource(async actions => {
    const { data } = await axios.get('http://localhost:1337/events')

    const collection = actions.addCollection({
      typeName: 'Event',
      path:'/events/:id'
    })

    for (const each_event of data) {
      collection.addNode({
        id: each_event.id,
        path:'/events/' + each_event.id,
        title: each_event.title,
        description: each_event.description,
        price: each_event.price,
        date: each_event.date,
        duration: each_event.duration,
        thumbnail: each_event.image.formats.thumbnail.url,
        image: each_event.image.formats.medium.url,
        category: each_event.categories[0].id
      })
    }
  })


}
