module.exports = {
  lib: {
    template: 'umd',
    indent: '  ',
    src: 'lib/main.js',
    dest: 'dist/main.js',
    returnExportsGlobal: '<%= pkg.name %>',
    objectToExport: 'CsvFileGenerator',
    deps: {
      default: [],
      amd: [],
      cjs: [],
      global: []
    }
  }
}
