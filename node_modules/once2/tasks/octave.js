'use strict';

module.exports = function(grunt) {
	
	grunt.registerMultiTask('octave', function() {
		var options = this.options();
		var done = this.async();
		var async = grunt.util.async;

		var octaveProc = function(src, callback) {
			var args = options.args || [];
			var command = {
				cmd:  'octave',
				args: args.concat([src])
			};
			grunt.util.spawn(command, function(error, result, code) {
				if (error) {
					grunt.log.errorlns(error);
					callback(error);
				} else {
					grunt.log.writeln(result);
					callback();
				}
			});
		};

		async.forEach(this.filesSrc, octaveProc, function(error) {
			if (error) {
				done(error);
			} else {
				done();
			}
		});

	});

};