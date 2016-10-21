grunt-octave
============
Grunt plugin to start octave as task.

### Usage Examples

```js

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-octave');

	grunt.initConfig({
		octave: {
			options: [],
			target1: {
				src: "#{your_src_path}",
				options: ['--silent']
			},
			target2: {
				src: "#{your_src_path}",
			}
		}
	});
};
```