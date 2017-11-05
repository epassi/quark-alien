// README
// http://ericnish.io/blog/compile-less-files-with-grunt
// http://www.sitepoint.com/writing-awesome-build-script-grunt/
// http://www.smashingmagazine.com/2013/10/29/get-up-running-grunt/

module.exports = function(grunt) {
	require('jit-grunt')(grunt);

	grunt.initConfig({
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'resources/css',
					src: ['*.scss'],
					dest: 'resources/css',
					ext: '.min.css'
				}],
				options: {
					style: 'compressed'
				}
			}
		},
		jshint: {
			files: ['resources/js/**/*.js', '!resources/js/all.min.js']
		},
		uglify: {
			my_target: {
				files: {
					'resources/js/all.min.js': [
					'vendor/jquery/dist/jquery.min.js', 
					'vendor/gsap/src/minified/TweenMax.min.js', 
					'vendor/gsap/src/minified/TimelineMax.min.js', 
					'vendor/gsap/src/minified/jquery.gsap.min.js', 
					'vendor/gsap/src/minified/easing/EasePack.min.js', 
					'vendor/gsap/src/minified/plugins/CSSPlugin.min.js', 
					'vendor/Snap.svg/dist/snap.svg-min.js', 
					'resources/js/**/*.js', 
					'!resources/js/all.min.js']
				}
			}
		},
		copy: {
			build: {
				cwd: ".",			// Source folder
				src: [	"./*.html", 
						"./resources/css/**/*.css", 
						"./resources/img/**/*.{png,jpg,gif,svg}",
						"./resources/data/**", 
						"./resources/js/**/*.min.js"
						],		// The files to copy
				dest: "./dist",		// Destination folder
				expand: true		// Enables these options. Required when using cwd.
			},
		},
		clean: {
			build: {
				src: [ './dist' ],
				options: {
					force: true
				}
			},
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [	"./dist/**/*.html",
							"./dist/resources/css/**",
							"./dist/resources/js/**/*.js",
							"./dist/resources/img/**/*.{png,jpg,gif,svg}",
							"./dist/resources/data/**"
							]
				},
				options: {
					server: {
						// baseDir: "./" // src build
						baseDir: "./dist/" // dist build
					},
					watchTask: true
				}
			}
		},
		watch: {
			sass: {
				files: ['resources/css/**/*.scss'], // which files to watch
				tasks: ['sass', 'clean', 'copy'],
				options: {
					nospawn: true
				}
			},
			html: {
				files: ['**/*.html'], // which files to watch
				tasks: ['clean', 'copy'],
				options: {
					nospawn: true
				}
			},
			js: {
				files: ["resources/js/**/*.js", "Gruntfile.js"],
				tasks: ["jshint", "uglify", "clean", "copy"],
				options: {
					nospawn: true
				}
			},
			img: {
				files: ["resources/img/**/*.{png,jpg,gif,svg}"],
				tasks: ["clean", "copy"],
				options: {
					nospawn: true
				}
			},
			data: {
				files: ["resources/data/**"],
				tasks: ["clean", "copy"],
				options: {
					nospawn: true
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-browser-sync");

	grunt.registerTask('default', ['sass', 'jshint', 'uglify', 'clean', 'copy', 'browserSync', 'watch']);
};
