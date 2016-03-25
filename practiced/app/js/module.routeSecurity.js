(function(angular) {
    angular.module('routeSecurity', []).run(['$injector', '$location', '$rootScope', 'loginRedirectPath',
        function($injector, $location, $rootScope, loginRedirectPath) {
            if($injector.has('$route')) {
                new RouteSecurityManager($location, $rootScope, $injector.get('$route'), loginRedirectPath);
            }
        }
    ]);

    function RouteSecurityManager($location, $rootScope, $route, path) {
        this._route = $route;
        this._location = $location;
        this._rootScope = $rootScope;
        this._user = localStorage.getItem("userId");
        this._loginPath = path;
        this._redirectTo = null;
        this._authenticated = !! ($rootScope.auth && $rootScope.auth.user);
        this._init();
//         this._admin = $rootScope.admin;
    }
    RouteSecurityManager.prototype = {
        _init: function() {
            var self = this;
            this._checkCurrent();
//             this._checkAdminStatus();
            // Set up a handler for all future route changes, so we can check
            // if authentication is required.
            self._rootScope.$on("$routeChangeStart", function(e, next) {
                //                 console.log(this._rootScope.auth.user);
                self._authRequiredRedirect(next, self._loginPath);
//                 if(next && next.$$route && next.$$route.admin) {
//                     if(!this._admin) {
//                         console.log("admin attempted");
//                         self._location.path('/');
//                     }
//                 }
            });
            self._rootScope.$on('$firebaseSimpleLogin:login', angular.bind(this, this._login));
            self._rootScope.$on('$firebaseSimpleLogin:logout', angular.bind(this, this._logout));
            self._rootScope.$on('$firebaseSimpleLogin:error', angular.bind(this, this._error));
        },
        _checkCurrent: function() {
            // Check if the current page requires authentication.
            if(this._route.current) {
                this._authRequiredRedirect(this._route.current, this._loginPath);
            }
        },
//         _checkAdminStatus: function() {
//             console.log(this._user);
//             var ref = new Firebase("https://practiced.firebaseio.com/admin/" + this._user);
//             ref.on('value', function(snapshot) {
//                 this._admin = snapshot.val();
//                 console.log(this._admin);
//             })
//         },
        _login: function() {
            this._authenticated = true;
            if(this._redirectTo) {
                this._redirect(this._redirectTo);
                this._redirectTo = null;
            } else if(this._location.path() === this._loginPath) {
                this._location.replace();
                this._location.path('/');
            }
        },
        _logout: function() {
            this._authenticated = false;
            this._checkCurrent();
        },
        _error: function() {
            if(!this._rootScope.auth || !this._rootScope.auth.user) {
                this._authenticated = false;
            }
            this._checkCurrent();
        },
        _redirect: function(path) {
            this._location.replace();
            this._location.path(path);
        },
        // A function to check whether the current path requires authentication,
        // and if so, whether a redirect to a login page is needed.
        _authRequiredRedirect: function(route, path) {
            //if the route requires authentication and the user is not authenticated...
            if(route.authRequired && !this._authenticated) {
                if(route.pathTo === undefined) {
                    this._redirectTo = this._location.path();
                } else {
                    this._redirectTo = route.pathTo === path ? "/" : route.pathTo;
                }
                this._redirect(path);
            }
            //if the user is authenticated redirect away from login page
            else if(this._authenticated && this._location.path() === this._loginPath) {
                this._redirect('/');
            }
        }
    };
})(angular);