import gulp from 'gulp';
import plumber from 'gulp-plumber';
import ejs from 'gulp-ejs';
import frontMatter from 'gulp-front-matter';
import wrapper from 'layout-wrapper';


const path = {
  ejs: {
    layoutDir: './src/ejs/layouts',
    src: [
      './src/ejs/**/*.ejs',
      '!./src/ejs/**/_*.ejs'
    ],
    dist: './htdocs/'
  },
  json: {
    package: './package.json';
    newsList: './src/data/newsList.json'
  }
};


global.jsonData = {};
jsonData.newsListJson = require(path.json.newsList);


gulp.task('ejs', () => {
  var extName = require(path.package);

  gulp.src(path.ejs.src)
    .pipe(plumber())
    .pipe(frontMatter({
      property: 'data'
    }))
    .pipe(ejs())
    .pipe(wrapper({
      layout: path.ejs.layoutDir,
      data: {
        name: 'ホゲのサイト'
      },
      engine: 'ejs',
      frontMatterProp: 'frontMatter'
    }))
    .pipe(ejs(extName, { 'ext': '.html' }))
    .pipe(gulp.dest(path.ejs.dist));
});


gulp.task('default', ['ejs']);