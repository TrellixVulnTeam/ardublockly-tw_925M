'use strict';

var childProcess = require('child_process');
var electron = require('electron');
var gulp = require('gulp');


gulp.task('start', ['build', 'watch'], function () {
    childProcess.spawn(electron, ['./build'], {
        stdio: 'inherit'
    })
    .on('close', function () {
        // User closed the app. Kill the host process.
        process.exit();
    });
});

/*
gulp.task('start', gulp.series('build', 'watch',), function () {
    childProcess.spawn(electron, ['./build'], {
        stdio: 'inherit'
    })
        .on('close', function () {
            // User closed the app. Kill the host process.
            process.exit();
        });
});
*/