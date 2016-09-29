'use strict';

angular.module('angular-page-loader', [])
.directive('pageLoader', pageLoader)

pageLoader.$inject = ['$timeout', '$templateCache', '$injector']

function pageLoader($timeout, $templateCache, $injector, $location) {

    var directive = {
        restrict: 'EA',
        replace: false,
        scope: { isLoading: '=?flag' },
        transclude: true,
        template: '<div class="loader-container" ng-transclude></div>',
        link: _link
    }

    return directive;

    function _link(scope, elem, attr) {

        var promise, inner = elem.children().eq(0);
        // the time to wait before show the loader
        var latency = attr.latency || 250;
        // the background-color regexps
        var hexReg = /^#[0-9A-F]{6}$/i;
        var rgbReg = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
        var rgbaReg = /rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), (\d+(\.\d+))\)/;
        // get/set the background color
        var color = ( hexReg.test(attr.bgColor) || rgbReg.test(attr.bgColor) || rgbaReg.test(attr.bgColor) )
        ? attr.bgColor : angular.isString(attr.bgColor) ? attr.bgColor : 'white';

        // set element default style
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

        scope.isLoading = true; // init flag variable to true

        // if a flag is specified
        // use this as loading status
        if( attr.flag ) {

            scope.$watch('isLoading', function(n) {
                return n ? elem.removeClass('ng-hide') : elem.addClass('ng-hide');
            });

        } else {

            function _start(e) {
                // cancel any previous promise
                $timeout.cancel(promise);
                // check if location change has been prevented
                scope.$evalAsync(function() {
                    if( !e.defaultPrevented ) {
                        promise = $timeout(function() {
                            elem.removeClass('ng-hide');
                        }, latency);
                    }
                });
            }

            function _stop() {
                $timeout.cancel(promise);
                elem.addClass('ng-hide');
            }

            // try if route module is defined
            // and bind the routechange events callbacks
            try {

                window.angular.module('ngRoute');

                scope.$on( '$locationChangeStart', _start )

                scope.$on( '$routeChangeSuccess', _stop );

                scope.$on( '$routeChangeError', _stop );

            } catch(e) {

                // try if ui.router module exist
                // and bind the state change events
                try {

                    window.angular.module('ui.router');

                    scope.$on( '$stateChangeStart', _start )

                    scope.$on( '$stateChangeSuccess', _stop );

                    scope.$on( '$stateChangeError', _stop );

                } catch(e) { } finally { }

            }

        }


    }

}
