(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (root['CsvFileGenerator'] = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['CsvFileGenerator'] = factory();
  }
}(this, function () {

'use strict'

function CsvFileGenerator (options) {
  this.options = options || {}
  this.options.headers = this.options.headers || []
  this.options.rows = this.options.rows || []
  this.options.filename = this.options.filename || 'data.csv'
  this.fileObject = null
}

CsvFileGenerator.prototype = {
  setHeaders: function (headers) {
    this.options.headers = headers
  },
  addRow: function (row) {
    this.options.rows.push(row)
  },
  clearRows: function () {
    this.options.rows = []
  },
  hasData: function () {
    return this.options.rows.length > 0
  },
  generateFile: function () {
    if (!this.fileObject) {
      // add BOM character so file can be recognized with Unicode characters
      var csvString = '\uFEFF',
        rowSep = '\r\n'

      if (this.options.headers.length) {
        csvString += this.options.headers.join(',') + rowSep
      }
      csvString += this.options.rows.join(rowSep)

      if (window.navigator.msSaveOrOpenBlob) {
        // for IE
        this.fileObject = new Blob([decodeURIComponent(encodeURI(csvString))], {
          type: 'text/csv;charset=utf-8;'
        })
      } else {
        // for other cool browsers
        this.fileObject = document.createElement('a')
        this.fileObject.href = 'data:attachment/csv;charset=utf-8,' + encodeURIComponent(csvString)
        this.fileObject.target = '_blank'
        document.body.appendChild(this.fileObject)
      }
    }

    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(this.fileObject, this.options.filename)
    } else {
      this.fileObject.download = this.options.filename
      this.fileObject.click()
    }
  }
}

return CsvFileGenerator;

}));
