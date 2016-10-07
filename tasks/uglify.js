module.exports = {
  options: {
    banner: '<%= banner %>'
  },
  dist: {
    src: '<%= concat.dist.dest %>',
    dest: 'dist/csvfilegenerator.min.js'
  }
}
