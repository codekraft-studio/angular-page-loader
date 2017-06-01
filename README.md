# angular-page-loader
quick app integration for your favourite loaders

### [DEMO](http://www.codekraft.it/demos/angular-page-loader/)

### Getting started
Download it via github, npm or via bower:

```bash
npm install angular-page-loader
bower install --save angular-page-loader
```

Or use it directly from the GitHub CDN:
```html
<link rel="stylesheet" href="https://cdn.rawgit.com/codekraft-studio/angular-page-loader/master/dist/angular-page-loader.css">
<script type="text/javascript" src="https://cdn.rawgit.com/codekraft-studio/angular-page-loader/master/dist/angular-page-loader.min.js"></script>
```

Add the module name to your application dependencies:
```javascript
angular.module('app', ['angular-page-loader'])
```

And optionally add the module directive to your page DOM, inside the body:
```html
<body ng-cloak>
    <page-loader></page-loader>
</body>
```

Anyway is a best practice to add in your page **head**, as descripted in the Angular documentation, the following style:
```css
[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
    display: none !important;
}
```
To hide all the Angular elements that have **ng-cloack** attribute until the app is loaded, in our case in better to add ng-cloak to the whole body element.

---

### Basic usage

##### with ngRoute:
If you **are using** Angular Routes (ngRoute), add the **page-loader** directive and you are ready to go, reload your application and you will see the loader on pages that takes more than **250ms** to load.

##### with ui.router:
If you **are using** ui.router, simply add the **page-loader** directive and you are ready to go.

##### without ngRoute or ui.router:
If you **are NOT using** Angular Routes (ngRoute) or ui.router you must add a **flag** attribute to the element in order to be able to determine when you want to hide the loader, otherwise it will not show.
Follow this example:

```html
<body ng-cloak>
    <page-loader flag="isLoading"></page-loader>
</body>
```

And in your application:
```javascript
angular.module('app')
.run(function($timeout, $rootScope) {

  // Use a root scope flag to access everywhere in your app
  $rootScope.isLoading = true;

  // simulate long page loading
  $timeout(function() {

    // turn "off" the flag
    $rootScope.isLoading = false;

  }, 3000)

})
```

If you have some doubt check the example or the index page inside the repository.

---

### Examples

##### How to use a custom loader?
You can use any loader you prefer in the module simply by adding it inside the directive element, like in this example:
**Note:** the loader used in this example is made by [_massimo](http://codepen.io/_massimo/) on codepen and it was taken from [here](http://codepen.io/_massimo/pen/JXELvz).

```html
<page-loader>
    <div class="pacman"></div>
    <div class="dot"></div>
</page-loader>
```

**Obviously** you need to add the related loader CSS style too.


##### How to change the page-loader background?
If you want to specify a custom background color for the page-loader, add the attribute **bg-color** and pass to it a HEX,RGB or RGBA color code or just a normal color string, like you will do in css.
```html
<!-- some examples -->
<page-loader bg-color="whitesmoke"></page-loader>
<page-loader bg-color="#7986CB"></page-loader>
<page-loader bg-color="rgb(160, 25, 120)"></page-loader>
<page-loader bg-color="rgba(120, 20, 20, 0.8)"></page-loader>
```


##### How to change the page-loader latency time?
You can also customize the loader latency using the **latency** attribute, the value is expressed in milliseconds.
```html
<page-loader latency="500"></page-loader>
```
