angular.module('myApp.service.student', ['firebase'])
// a simple utility to create references to Firebase paths
.factory('Student', function() {
    var user;
    return {
        setUser: function(aUser) {
            user = aUser;
        },
        isLoggedIn: function() {
            return(user) ? user : false;
        }
    }
})