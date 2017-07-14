var path = require('path');

module.exports = {
    // TODO(lnw): write dependencies.js file to load deps and split into separate bundle
    entry: './app/static/app/app.js',
    output: {
        filename: 'app-bundle.js',
        path: path.resolve(__dirname, 'app/static/dist')
    }
}