var gulp = require('gulp');
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');

gulp.task('css', function(){
	return gulp.src(['./development/css/*.css'])
		//.pipe(minifyCSS())
		.pipe(gulp.dest('./www/css'));
})

gulp.task('ionicjs', function() {
    gulp.src("./development/js/ionic/ionic.bundle.js")
    .pipe(ngAnnotate())
		   //.pipe(uglify())
		   .pipe(gulp.dest('./www/js/ionic'));
    
});

gulp.task('scripts', function(){
	return gulp.src(['./development/js/app.js',
					 './development/js/controllers/*.js',
					 './development/js/services/*.js'])
		   .pipe(ngAnnotate())
		   //.pipe(uglify())
		   .pipe(gulp.dest('./www/js'))
})

gulp.task('index', function(){
	var opts = {
		empty:true,
		spare:true,
		quotes:true,
		conditionals:true
	};
	gulp.src("./development/index.html")
	.pipe(minifyHTML(opts))
    .pipe(gulp.dest('./www/'));
});


gulp.task('html', function(){
	var opts = {
		empty:true,
		spare:true,
		quotes:true,
		conditionals:true
	};
	gulp.src("./development/templates/*.html")
	.pipe(minifyHTML(opts))
    .pipe(gulp.dest('./www/templates/'));
});

gulp.task('watch', function(){

	gulp.watch(['./development/css/*.css'], ['css']);

	gulp.watch(['./development/js/ionic/ionic.bundle.js'], ['ionicjs']);

	gulp.watch(['./development/js/app.js',
				'./development/js/controllers/*.js',
				'./development/js/services/*.js'], 
				['scripts']);

	gulp.watch(['./development/templates/*.html'], ['html']);

	gulp.watch(['./development/index.html'], ['index']);

	gulp.watch(['./development/js/ionic/ionic.bundle.js'], ['ionicjs']);
});






