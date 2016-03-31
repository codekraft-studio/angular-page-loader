/* angular-page-loader - v1.0.0 by codekraft-studio - 2016-03-31 */

angular.module('angular-page-loader', [])

angular.module('angular-page-loader', [])
.directive('pageLoader', pageLoader)

pageLoader.$inject = ['$timeout', '$templateCache', '$injector']

function pageLoader($timeout, $templateCache, $injector) {

  var directive = {
    restrict: 'EA',
    replace: false,
    scope: { isLoading: '=?flag' },
    transclude: true,
    template: '<div ng-transclude></div>',
    link: _link
  }

  return directive;

  function _link(scope, elem, attr) {

    var promise, inner = elem.children().eq(0);

    // the time to wait before show the loader
    var latency = attr.latency || 250;

    var hexReg = /^#[0-9A-F]{6}$/i;
    var rgbReg = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
    var rgbaReg = /rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), (\d+(\.\d+))\)/;

    // the background color
    var color = ( hexReg.test(attr.bgColor) || rgbReg.test(attr.bgColor) || rgbaReg.test(attr.bgColor) ) ? attr.bgColor : 'white';

    scope.isLoading = true; // init flag variable to true

    // if a flag is specified
    // use this as loading status
    if( attr.flag ) {

      scope.$watch('isLoading', function(n) {
        return n ? elem.removeClass('ng-hide') : elem.addClass('ng-hide');
      })

    }

    // set element fullscreen
    elem.css({
      'position': 'absolute',
      'width': '100%',
      'height': '100%',
      'z-index': '10000',
      'background-color': color
    });

    // add the default loader
    // if nothing is transcluded
    if( !inner.children().length ) {
      var loader = document.createElement('div');
      loader.className = attr.loaderClass || 'loader';
      inner.append( loader );
    }

    // try if route module is defined
    // and bind the routechange events callbacks
    try {

      window.angular.module('ngRoute');

      scope.$on('$routeChangeStart', function() {
        promise = $timeout(function() {
          elem.removeClass('ng-hide');
        }, latency);
      });

      scope.$on('$routeChangeSuccess', function() {
        $timeout.cancel(promise);
        elem.addClass('ng-hide');
      });

      scope.$on('$routeChangeError', function() {
        $timeout.cancel(promise);
        elem.addClass('ng-hide');
      });

    } catch(e) {
      return false;
    }

  }

}
