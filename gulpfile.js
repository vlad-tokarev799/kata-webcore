const {src, dest, parallel, series, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const del = require('del');

function syncBrowsers() {
	browserSync.init({
		server: {
			baseDir: './docs'
		},
		port: 3000,
		notify: false
	})
}

function html() {
	return src('./src/**/*.html')
		.pipe(dest('./docs'))
		.pipe(browserSync.stream())
}

function scss() {
	return src('./src/scss/*.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(dest('./docs/css'))
		.pipe(browserSync.stream())
}

function img() {
	return src('./src/img/**/*.*')
		.pipe(dest('./docs/img'))
		.pipe(browserSync.stream())
}

function fonts() {
	return src('./src/fonts/**/*.*')
		.pipe(dest('./docs/fonts'))
}

function watchFiles() {
	watch('./src/**/*.html', html);
	watch('./src/scss/**/*.scss', scss);
	watch('./src/img/**/*.*', img);
}

function clearDist() {
	return del('./docs')
}

module.exports = {
	default: series(clearDist, parallel(watchFiles, syncBrowsers, html, scss, img, fonts))
}