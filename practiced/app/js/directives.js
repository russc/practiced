'use strict';
/* Directives */
angular.module('myApp.directives', []).directive('appVersion', ['version',
    function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }
]).directive('assignments', ['$firebase',
    function($firebase) {
        return {
            restrict: 'A',
            scope: {
                group: '@',
            },
            link: function(scope, el, attr) {
                scope.assignList = $firebase(new Firebase("https://practiced.firebaseio.com/groups/" + scope.group + "/assignments"));
            },
            templateUrl: 'partials/group.assignments.html',
        };
    }
]).directive('dateformat', function() {
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            date: '@'
        },
        link: function(scope, el, attr) {
            scope.dateform = moment(scope.date).format("ddd, MMM Do");
        },
        template: "{{dateform}}"
    };
}).directive('practicepercentage', function() {
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            student: '@',
            week: '@',
            group: '@'
        },
        link: function(scope, el, attr) {
            
            scope.$watch('week', function(newValue, oldValue) {
                if(newValue) {
                    var ref = new Firebase("https://practiced.firebaseio.com/groups/" + scope.group + "/practice/" + scope.week + "/" + scope.student);
                    ref.on("value", function(snapshot) {
                        var count = 0;
                        snapshot.forEach(function() {
                            count++;
                            scope.sessionCount = count;
                            switch(scope.sessionCount) {
                                case 0:
                                    scope.percentage = "0%";
                                    break;
                                case 1:
                                    scope.percentage = "60%";
                                    break;
                                case 2:
                                    scope.percentage = "70%";
                                    break;
                                case 3:
                                    scope.percentage = "80%";
                                    break;
                                case 4:
                                    scope.percentage = "90%";
                                    break;
                                case 5:
                                    scope.percentage = "100%";
                                    break;
                            }
                            if(scope.sessionCount > 5) {
                                scope.percentage = "105%";
                            }
                        });
                    });
                }
            }, true);
            scope.$watch('group', function(newValue, oldValue) {
                if(newValue) {
                    
                    var ref = new Firebase("https://practiced.firebaseio.com/groups/" + scope.group + "/practice/" + scope.week + "/" + scope.student);
                    ref.on("value", function(snapshot) {
                        var count = 0;
                        snapshot.forEach(function() {
                            count++;
                            scope.sessionCount = count;
                            switch(scope.sessionCount) {
                                case 0:
                                    scope.percentage = "0%";
                                    break;
                                case 1:
                                    scope.percentage = "60%";
                                    break;
                                case 2:
                                    scope.percentage = "70%";
                                    break;
                                case 3:
                                    scope.percentage = "80%";
                                    break;
                                case 4:
                                    scope.percentage = "90%";
                                    break;
                                case 5:
                                    scope.percentage = "100%";
                                    break;
                            }
                            if(scope.sessionCount > 5) {
                                scope.percentage = "105%";
                            }
                        });
                    });
                }
            }, true);
        },
        template: "{{percentage}}"
    };
}).directive('practicetime', ['$firebase',
    function($firebase) {
        return {
            restrict: 'A',
            transclude: true,
            scope: {
                student: '@',
                week: '@',
               
            },
            link: function(scope, el, attr) {
                var ref = new Firebase("https://practiced.firebaseio.com/sessions/"+ scope.week + "/" + scope.student);
                
                ref.on("value",function(snapshot){
                    scope.grade = snapshot.val();
                });
                
            },
            template: "{{grade}}"
        };
    }
]);