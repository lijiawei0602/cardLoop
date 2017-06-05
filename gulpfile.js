var gulp = require("gulp");
var minifycss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var less = require("gulp-less");

gulp.task("minifyCss",function(){
	gulp.src("less/*.less")
		.pipe(less())
		.pipe(minifycss())
		.pipe(rename({
			suffix:".min"
		}))
		.pipe(gulp.dest("css"));
});

gulp.task("minifyJS",function(){
	gulp.src("js/*.js")
		.pipe(uglify())
		.pipe(rename({
			suffix:".min"
		}))
		.pipe(gulp.dest("jsmin"));
});

gulp.task("watch",function(){
	gulp.watch("less/*.less",["minifyCss"]);
	gulp.watch("js/*.js",["minifyJS"]);
});

gulp.task("default",["watch"],function(){
	gulp.start("minifyCss");
});