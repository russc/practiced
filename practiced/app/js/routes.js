"use strict";
angular.module('myApp.routes', ['ngRoute'])
// configure views; the authRequired parameter is used for specifying pages
// which should only be available while logged in
.config(['$routeProvider',
    function($routeProvider) {
      
        $routeProvider.when('/groups', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/groups.html',
            controller: 'HomeCtrl'
        });
        $routeProvider.when('/students', {
            authRequired: false, // must authenticate before viewing this page
            templateUrl: 'partials/students.html',
            controller: 'StudentCtrl'
        });
        
//         $routeProvider.when('/practice', {
//             authRequired: false, // must authenticate before viewing this page
//             templateUrl: 'partials/practice.html',
//             controller: 'StudentCtrl'
//         });
        $routeProvider.when('/practice2', {
            authRequired: false, // must authenticate before viewing this page
            templateUrl: 'partials/practice2.html',
            controller: 'StudentCtrl'
        });
        $routeProvider.when('/practicetime', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/practicetime.html',
            controller: 'AssignmentCtrl',
            
        });
        $routeProvider.when('/grades', {
            authRequired: false, // must authenticate before viewing this page
            templateUrl: 'partials/grades.html',
            controller: 'StudentCtrl'
        });
        $routeProvider.when('/practicelog', {
            authRequired: false, // must authenticate before viewing this page
            templateUrl: 'partials/practicelog.html',
            controller: 'WeeksCtrl'
        });
        $routeProvider.when('/account', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/account.html',
            controller: 'AccountCtrl',
            
        });
        $routeProvider.when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        });
        $routeProvider.when('/assignments', {
            authRequired: true,
            templateUrl: 'partials/assignments.html',
            controller: 'AssignmentCtrl'
        });
        
        $routeProvider.otherwise({
            redirectTo: '/practice2'
        });
    }
]);