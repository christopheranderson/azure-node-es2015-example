# Deploying a Node App with an ES2015 build step

Easily use Gulp to babelify code on deployment to Azure. Seemlessly ties into Continuous Integration with GitHub/Visual Studio Team Services.

## Deploy sample

The simplest way to deploy is to press this button below to deploy this sample into an Azure Web App.

[![Deploy to Azure](http://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/)

If you'd like to experiment with this sample, just create a fork and click the button from your forked repo.

You can also just clone this repository and deploy via the Local Git option. FTP deployment won't trigger the `deploy.cmd` command (which is half the magic of this demo), thus you need to run `gulp build` locally and then deploy only the contents of the `site` folder.

## Running locally

1. Clone the repo
2. Run npm install
3. Run npm start
    - This will start nodemon and run the `build` gulp task.

## How it works

### Gulp

In the `gulpfile.js`, we've set up a babel workflow like so:

```
gulp.task('babel', function () {
    return gulp.src(paths.src)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.', { sourceRoot: paths.sourceRoot }))
        .pipe(gulp.dest(paths.dest));
});
```

This is piping the contents of our site folder into babel (with the ES2015 preset), into the sourcemap generator, and then piped back out to our destination (which is also our source in this case, since I use `.es6` extensions).

### Deploy.cmd

In the deploy.cmd file, we have 6 steps.

1. Select appropriate node/npm versions based on our Build app's package.json or env settings.
2. Install build dependencies (gulp, gulp tasks, and babel plugins)
3. Run the npm build command
4. Sync the contents of the `./site` folder to our `%DEPLOYMENT_TARGET%` which will probably be `wwwroot`.
5. Selecct the appropriate node/npm versions based on our Node app's package.json or env settings.
6. Install npm packages for main site

Optionally, we could also run commands like bower install after step 6.

When Kudu (your Azure App Service's `.scm` endpoint) sees the `.deployment` file, it will run the custom `deploy.cmd` file we gave.

## LICENSE
[MIT](LICENSE)