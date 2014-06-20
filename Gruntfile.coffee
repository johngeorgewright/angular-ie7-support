module.exports = (grunt) ->

  grunt.initConfig
    http:
      closure:
        options:
          url: 'http://closure-compiler.appspot.com/compile'
          method: 'POST'
          form:
            output_info: 'compiled_code'
            output_format: 'text'
            compilation_level: 'SIMPLE_OPTIMIZATIONS'
            warning_level: 'default'
          sourceField: 'form.js_code'
        files:
          'angular-ie7-support.min.js': 'angular-ie7-support.js'

  grunt.loadNpmTasks 'grunt-http'
  grunt.registerTask 'compile', ['http:closure']
  grunt.registerTask 'default', ['compile']

