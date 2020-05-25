/*eslint-disable*/
module.exports = {
  name: 'Push Ups Counter',
  // Dictionary object is used to generate xml dictionary and template in src/task/layouts
  package: {
    name: 'Push Ups Counter',
    exportName: 'PUC_V', // filename used to generate package
    indexable: false, // Set true to remove meta robots
    ssr: false,
    // spa-pre rendering configuration
    pages: [
      {
        name: 'home',
        filename: '',
        path: '/',
        output: 'index'
      }
    ]
  }
}
