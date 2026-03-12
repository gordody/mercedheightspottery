import { config, collection, fields } from '@keystatic/core';

export default config({
  ui: {
    brand: { name: 'Merced Heights Pottery' },
  },
  storage: {
    kind: 'github',
    repo: 'gordody/mercedheightspottery',
    branchPrefix: 'new-pieces/
  },

  collections: {
    pieces: collection({
      label: 'Pieces',
      slugField: 'title',
      path: 'static/content/pieces/*/',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Bowl', value: 'bowl' },
            { label: 'Vase', value: 'vase' },
            { label: 'Mug', value: 'mug' },
            { label: 'Plate', value: 'plate' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'other',
        }),
        price: fields.number({ label: 'Price (USD)' }),
        dimensions: fields.text({ label: 'Dimensions', description: 'e.g. 6" H × 4" W' }),
        clay: fields.text({ label: 'Clay Body', description: 'e.g. Stoneware, Porcelain' }),
        glaze: fields.text({ label: 'Glaze' }),
        fired: fields.text({ label: 'Firing', description: 'e.g. Cone 6 oxidation' }),
        available: fields.checkbox({ label: 'Available for purchase', defaultValue: true }),
        featured: fields.checkbox({ label: 'Feature on homepage', defaultValue: false }),
        images: fields.array(
          fields.image({ label: 'Image', directory: 'static/images', publicPath: '/images/' }),
          { label: 'Images', 
            itemLabel: (props) => {
              console.log("images=", props);
              return 'Image';
          }
         }
        ),
      },
    }),
  },
});