"use strict";

var gulp = require('gulp');
var elixir = require('laravel-elixir');
var wrap = require('gulp-wrap');
var concat = require('gulp-concat');
var declare = require('gulp-declare');
var handlebars = require('gulp-handlebars');
var notify = require('gulp-notify');
var path = require('path');

// var templatePath = 'resources/views/';
elixir.extend("handlebars", function(src, namespace, output) {
    var onError = function(err) {
        notify.onError({
            title: 'Laravel Elixir',
            subtitle: 'Handlebar Templates Compilation Failed!',
            message: '<%= error.message %>',
            icon: path.join(__dirname, '../laravel-elixir/icons/fail.png')
        })(err);

        this.emit('end');
    };

    gulp.task('handlebars', function() {
        return gulp.src(src)
            .on('error', onError)
            .pipe(handlebars())

            // Wrap each template function in a call to Handlebars.template
            .pipe(wrap('Handlebars.template(<%= contents %>)'))

            // Declare template functions as properties and sub-properties of exports
            .pipe(declare({
                namespace: namespace,
                noRedeclare: true // Avoid duplicate declarations
            }))

            // Concatenate down to a single file
            .pipe(concat('templates.js'))

            // Add the Handlebars module in the final output
            .pipe(gulp.dest(output))
            .pipe(notify({
                title: 'Laravel Elixir',
                message: 'Handlebar Templates Compiled',
                icon: path.join(__dirname, '../laravel-elixir/icons/pass.png'),
                onLast: true
            }));
    });
    
    this.registerWatcher('handlebars', src);
    
    return this.queueTask('handlebars');
});
