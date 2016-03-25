'use strict';
/* Controllers */
angular.module('myApp.controllers', []).controller('MainCtrl', ['$scope', '$rootScope', '$firebase', '$routeParams', 'FBURL',
    function($scope, $rootScope, $firebase, $routeParams, FBURL) {
        //        $rootScope.adminRole = true;               
    }
]).controller('HomeCtrl', ['$scope', 'syncData', '$routeParams', '$firebase', 'FBURL', '$rootScope',
    function($scope, syncData, $routeParams, $firebase, FBURL, $rootScope) {
        //         $rootScope.whatever = "Shoot me";
        //        console.log($rootScope.auth.user.uid);
        //        
        $scope.syncAccount = function() {
            $scope.user = {};
            syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user').then(function(unBind) {
                $scope.unBindAccount = unBind;
            });
        };
        //         var paper = Raphael("canvas", 640, 480);
        //         paper.circle(320, 240, 60).animate({
        //             fill: "#223fa3",
        //             stroke: "#000",
        //             "stroke-width": 80,
        //             "stroke-opacity": 0.5
        //         }, 2000);
        //         paper.path("M24.132,7.971c-2.203-2.205-5.916-2.098-8.25,0.235L15.5,8.588l-0.382-0.382c-2.334-2.333-6.047-2.44-8.25-0.235c-2.204,2.203-2.098,5.916,0.235,8.249l8.396,8.396l8.396-8.396C26.229,13.887,26.336,10.174,24.132,7.971z").attr({fill: "#000", stroke: "none"});
        //         $scope.notify = function() {};
        //         $scope.over = function(first, last, grade) {
        //             $scope.overFirst = first;
        //             $scope.overLast = last;
        //             $scope.overGrade = grade;
        //             $rootScope.toggle('myOverlay', 'on');
        //         };
        //         $scope.media = $firebase(new Firebase("https://practiced.firebaseio.com/media"));
        //         $scope.listened = $firebase(new Firebase("https://practiced.firebaseio.com/listening"));
        $scope.zero = 0;
        // set initial binding
        $scope.syncAccount();
        $scope.listOfKids = $firebase(new Firebase('https://practiced.firebaseio.com/users'));
        $scope.groupList = $firebase(new Firebase('https://practiced.firebaseio.com/groups'));
        var userBase = $firebase(new Firebase(FBURL + '/users/' + $scope.auth.user.uid));
        var groups = userBase.$child('groups');
        var values = {};
        ///
        //
        $scope.select = function(id) {
            $scope.selected = id;
            $scope.person = $firebase(new Firebase(FBURL + "/users/" + id));
        };
        ///
        $scope.groupSelect = function(id) {
            $scope.group = id;
            $scope.groupSelected = $firebase(new Firebase(FBURL + "/groups/" + $scope.group));
            //instantiate for the tabs in group view page
            $scope.groupStudents = $firebase(new Firebase(FBURL + "/groups/" + $scope.group + "/students"));
            $scope.assigns = $firebase(new Firebase(FBURL + "/groups/" + $scope.group + "/assignments"));
            $scope.practiceRecords = $firebase(new Firebase(FBURL + "/groups/" + $scope.group + "/practice"));
            //             $scope.assignment = {};
            //             syncData(['groups/' + id, "assignments/"+$scope.assignment.title]).$bind($scope, 'assignment').then(function(unBind) {
            //                 $scope.unBindAccount = unBind;
            //             });
        };
        //         $firebase(new Firebase(FBURL + "/groups/" + $routeParams.group + "/students"));
        //        
        //         $scope.validChar = /^[a-zA-Z0-9._-]+$/;
        //         $scope.addAssignment = function() {
        //             var ref = new Firebase('https://practiced.firebaseio.com/groups/' + $scope.group + "/assignments");
        //             ref.push({
        //                 title: $scope.assignment.title,
        //                 type: $scope.assignment.type,
        //                 due: $scope.assignment.due
        //             });
        //             $scope.assignment.title = "";
        //             $scope.assignment.type = "";
        //             $scope.assignment.due = "";
        //             $scope.addMode = false;
        //         };
        $scope.addStudent = function() {
            var ref = new Firebase("https://practiced.firebaseio.com");
            ref.child("groups/" + $scope.group + "/students/" + $scope.student.id).set({
                first: $scope.student.first,
                last: $scope.student.last,
                instrument: $scope.student.instrument
            });
            $scope.student.id = "";
            $scope.student.first = "";
            $scope.student.last = "";
            $scope.student.instrument = "";
            $scope.studentAddMode = false;
        };
        
        //         $scope.thisAssignment = $routeParams.id;
        //         $scope.thistype = $routeParams.type;
        //         var studentList = $firebase(new Firebase(FBURL + "/groups/" + $routeParams.group + "/students"));
        //$scope.gradeVal = $firebase(new Firebase(FBURL + "/groups/" + $routeParams.group + "/grades/" + $routeParams.id));
        $scope.retest = false;
        //         $scope.grading = function(stu, asn) {
        //             var ref = new Firebase(FBURL + "/groups/" + $routeParams.group + "/grades/" + asn + "/" + stu);
        //             var val = document.getElementById(stu).value;
        //             ref.set(val);
        //             //             console.log($scope.retest);
        //             //             if($scope.retest == true){
        //             //                 console.log(stu+"- "+val+" (retest)");
        //             //             }
        //         }
        //         $scope.studentList = studentList;
        $scope.assignId = $routeParams.id;
        $scope.groupName = $routeParams.group;
        $scope.assignmentType = $routeParams.type;
        $scope.assignListy = $firebase(new Firebase(FBURL + "/groups/" + $routeParams.group + "/assignments"));
        $scope.change = function(key, group) {
            var ref = new Firebase(FBURL + "/groups/" + group + "/assignments/" + key + "/show");
            console.log("REF: " + ref);
            console.log("KEY:  " + key);
            //             ref.set(value);
        }
        //         $scope.deleteMedia = function(val) {
        //             //var ref = new Firebase("https://practiced.firebaseio.com");
        //             alert(val);
        //         };
    }
]).controller('LoginCtrl', ['$scope', 'loginService', '$location',
    function($scope, loginService, $location) {
        $scope.email = null;
        $scope.pass = null;
        $scope.confirm = null;
        $scope.createMode = false;
        $scope.login = function(cb) {
            $scope.err = null;
            if(!$scope.email) {
                $scope.err = 'Please enter an email address';
            } else if(!$scope.pass) {
                $scope.err = 'Please enter a password';
            } else {
                loginService.login($scope.email, $scope.pass, function(err, user) {
                    $scope.err = err ? err + '' : null;
                    if(!err) {
                        cb && cb(user);
                    }
                });
            }
        };
        $scope.createAccount = function() {
            $scope.err = null;
            if(assertValidLoginAttempt()) {
                loginService.createAccount($scope.email, $scope.pass, function(err, user) {
                    if(err) {
                        $scope.err = err ? err + '' : null;
                    } else {
                        // must be logged in before I can write to my profile
                        $scope.login(function() {
                            loginService.createProfile(user.uid, user.email);
                            $location.path('/account');
                        });
                    }
                });
            }
        };

        function assertValidLoginAttempt() {
            if(!$scope.email) {
                $scope.err = 'Please enter an email address';
            } else if(!$scope.pass) {
                $scope.err = 'Please enter a password';
            } else if($scope.pass !== $scope.confirm) {
                $scope.err = 'Passwords do not match';
            }
            return !$scope.err;
        }
    }
]).controller('AccountCtrl', ['$scope', '$firebase', 'loginService', 'changeEmailService', 'firebaseRef', 'syncData', '$location', 'FBURL',
    function($scope, $firebase, loginService, changeEmailService, firebaseRef, syncData, $location, FBURL) {
        $scope.syncAccount = function() {
            $scope.user = {};
            syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user').then(function(unBind) {
                $scope.unBindAccount = unBind;
            });
        };
        var thisGuy = new Firebase('https://practiced.firebaseio.com/users/' + $scope.auth.user.uid);
        var root = thisGuy.root();
        // set initial binding
        $scope.syncAccount();
        // 		
        $scope.addGroup = function() {
            //             thisGuy.child('groups/' + $scope.group).set(true);
            root.child('groups/' + $scope.group + '/users/' + $scope.auth.user.uid).set({
                creator: $scope.user.name
            });
            $scope.group = "";
        };
        $scope.logout = function() {
            loginService.logout();
        };
        $scope.oldpass = null;
        $scope.newpass = null;
        $scope.confirm = null;
        $scope.reset = function() {
            $scope.err = null;
            $scope.msg = null;
            $scope.emailerr = null;
            $scope.emailmsg = null;
        };
        $scope.updatePassword = function() {
            $scope.reset();
            loginService.changePassword(buildPwdParms());
        };
        $scope.updateEmail = function() {
            $scope.reset();
            // disable bind to prevent junk data being left in firebase
            $scope.unBindAccount();
            changeEmailService(buildEmailParms());
        };

        function buildPwdParms() {
            return {
                email: $scope.auth.user.email,
                oldpass: $scope.oldpass,
                newpass: $scope.newpass,
                confirm: $scope.confirm,
                callback: function(err) {
                    if(err) {
                        $scope.err = err;
                    } else {
                        $scope.oldpass = null;
                        $scope.newpass = null;
                        $scope.confirm = null;
                        $scope.msg = 'Password updated!';
                    }
                }
            };
        }

        function buildEmailParms() {
            return {
                newEmail: $scope.newemail,
                pass: $scope.pass,
                callback: function(err) {
                    if(err) {
                        $scope.emailerr = err;
                        // reinstate binding
                        $scope.syncAccount();
                    } else {
                        // reinstate binding
                        $scope.syncAccount();
                        $scope.newemail = null;
                        $scope.pass = null;
                        $scope.emailmsg = 'Email updated!';
                    }
                }
            };
        }
    }
]).controller('AssignmentCtrl', ['$scope', '$firebase', '$routeParams', 'FBURL', '$rootScope',
    function($scope, $firebase, $routeParams, FBURL, $rootScope) {
        //         $scope.person = $firebase(new Firebase(FBURL + "/users/" + $routeParams.student));
        //         $scope.listOfKids = $firebase(new Firebase('https://practiced.firebaseio.com/users/'));
        $scope.loading = true;
        $scope.gradeLoader = false;
        $scope.deleteConfirm = false;
        $scope.assignmentGroupSelect = function(group) {
            $scope.assignmentGroup = group;
            //             $scope.studentList = $firebase(new Firebase(FBURL + "/groups/" + group + "/students"));
        };
        $scope.assignments = $firebase(new Firebase(FBURL + "/groups/" + $scope.assignmentGroup + "/assignments"));
        $scope.listOfOptions = ['KMS Beginner', 'KMS Beginner Percussion', 'KMS Concert & Symphonic', 'KMS Concert & Symphonic Percussion', 'KMS Wind Ensemble', 'KMS Wind Ensemble Percussion'];
        if(localStorage.getItem('lastGroupSelected') === null) {
            $scope.selectedItem = $scope.listOfOptions[0];
            localStorage.setItem('lastGroupSelected', $scope.selectedItem);
        } else {
            $scope.selectedItem = localStorage.getItem('lastGroupSelected');
        }
        $scope.selectedItemChanged = function(load) {
            $scope.loading = true;
            $scope.gradeLoader = true;
            setTimeout(function() {
                $scope.loading = false;
                $scope.gradeLoader = false
                $scope.$apply();
            }, load);
            //             console.log($scope.selectedItem);
            localStorage.setItem('lastGroupSelected', $scope.selectedItem);
            $scope.studentList = $firebase(new Firebase(FBURL + "/groups/" + $scope.selectedItem + "/students"));
            var ref = new Firebase(FBURL + "/groups/" + $scope.selectedItem + "/assignments");
            $scope.assignment = {};
            $scope.assignmentList = $firebase(ref);
            ref.limitToFirst(1).once('child_added', function(snapshot) {
                //child_added returns assignmentswhereas 'value' returns the child id
                $scope.thisAssignment = snapshot.val().title;
                $scope.thisAssignmentId = snapshot.key();
                console.log($scope.thisAssignmentId);
                $scope.gradeVal = $firebase(new Firebase(FBURL + "/groups/" + $scope.selectedItem + "/grades/" + $scope.thisAssignment));
                //                Eventually save state of app...
                //                  if(localStorage.getItem('lastAssignmentSelected') === null) {
                //                     $scope.thisAssignment = snapshot.val().title;
                //                     localStorage.setItem('lastAssignmentSelected', $scope.thisAssignment);
                //                     $scope.gradeVal = $firebase(new Firebase(FBURL + "/groups/" + $scope.selectedItem + "/grades/" + $scope.thisAssignment));
                //                 } else {
                //                     $scope.thisAssignment = localStorage.getItem('lastAssignmentSelected');
                //                     $scope.gradeVal = $firebase(new Firebase(FBURL + "/groups/" + $scope.selectedItem + "/grades/" + $scope.thisAssignment));
                //                 }
            });
        };;
        $scope.selectedItemChanged(210);
        $scope.changedValue = function(sel) {
            console.log(sel);
        };
        $scope.selectAssignment = function(thisTitle) {
            $scope.gradeLoader = true;
            $scope.hideTrash = false;
            setTimeout(function() {
                $scope.gradeLoader = false;
                $scope.$apply();
            }, 100);
            $scope.thisAssignment = thisTitle.title;
            var ref = new Firebase(FBURL + "/groups/" + $scope.selectedItem + "/assignments");
            ref.orderByChild("title").equalTo(thisTitle.title).on("child_added", function(snapshot) {
                $scope.thisAssignmentId = snapshot.key();
            });
            //             console.log($scope.thisAssignmentId);
            //             more eventual state saving...
            //             localStorage.setItem('lastAssignmentSelected', $scope.thisAssignment);
            //             console.log(localStorage.getItem('lastAssignmentSelected'));
            $scope.gradeVal = $firebase(new Firebase(FBURL + "/groups/" + $scope.selectedItem + "/grades/" + $scope.thisAssignment));
        };
        $scope.grading = function(stu, asn) {
            var ref = new Firebase(FBURL + "/groups/" + $scope.selectedItem + "/grades/" + asn + "/" + stu);
            var element = document.getElementById(stu);
            ref.set(element.value);
            element.value = "";
            //             console.log($scope.retest);
            //             if($scope.retest == true){
            //                 console.log(stu+"- "+val+" (retest)");
            //             }
        };
        $scope.over = function(first, last, grade) {
            $scope.overFirst = first;
            $scope.overLast = last;
            $scope.overGrade = grade;
            $rootScope.toggle('myOverlay', 'on');
        };
        $scope.validChar = /^[A-Za-z0-9 _-]*[A-Za-z0-9-][A-Za-z0-9 _-]*$/i;
        $scope.addAssignment = function() {
            var ref = new Firebase('https://practiced.firebaseio.com/groups/' + $scope.selectedItem + "/assignments");
            ref.push({
                title: $scope.assignment.title,
                type: $scope.assignment.type,
                due: $scope.assignment.due
            });
            $scope.assignment.title = "";
            $scope.assignment.type = "";
            $scope.assignment.due = "";
            $scope.addMode = false;
        };
        $scope.deleteAssignment = function(id) {
            var ref = new Firebase('https://practiced.firebaseio.com/groups/' + $scope.selectedItem + "/assignments/" + id);
            ref.remove();
            $scope.thisAssignment = 'Select an assignment on the left.';
            $scope.hideTrash = true;
            $scope.thisAssignmentId = '';
        };
        $scope.editStudentInfo = function(id) {
            $scope.editStudentMode = true;
        };
    }
]).controller('WeeksCtrl', ['$scope', 'syncData', '$firebase', '$routeParams', 'FBURL', '$location', '$rootScope',
    function($scope, syncData, $firebase, $routeParams, FBURL, $location, $rootScope) {
        //         $scope.userPractices = $firebase(new Firebase("https://practiced.firebaseio.com/groups/KMS%20Beginner/practice/1/123456"));
        var i = 0;
        var now = moment().week();
        var today = moment().day();
        var todayForm = moment().format("YYYY-MM-DD");
        var thisStudent = localStorage.getItem('studentId');
        var thisGroup = localStorage.getItem('studentGroup');
        $scope.logShow = false;
        $scope.w = now;
        $scope.week = function(weekNum, val) {
            $scope.year = moment().week(weekNum + val).format("YYYY");
            $scope.month = moment().week(weekNum + val).format("MMM");
            $scope.mon = moment().day("Monday").week(weekNum + val).format("Do");
            $scope.monForm = moment().day("Monday").week(weekNum + val).format("YYYY-MM-DD");
            $scope.tue = moment().day("Tuesday").week(weekNum + val).format("Do");
            $scope.tueForm = moment().day("Tuesday").week(weekNum + val).format("YYYY-MM-DD");
            $scope.wed = moment().day("Wednesday").week(weekNum + val).format("Do");
            $scope.wedForm = moment().day("Wednesday").week(weekNum + val).format("YYYY-MM-DD");
            $scope.thu = moment().day("Thursday").week(weekNum + val).format("Do");
            $scope.thuForm = moment().day("Thursday").week(weekNum + val).format("YYYY-MM-DD");
            $scope.fri = moment().day("Friday").week(weekNum + val).format("Do");
            $scope.friForm = moment().day("Friday").week(weekNum + val).format("YYYY-MM-DD");
            $scope.sat = moment().day("Saturday").week(weekNum + val).format("Do");
            $scope.satForm = moment().day("Saturday").week(weekNum + val).format("YYYY-MM-DD");
            $scope.sun = moment().day("Sunday").week(weekNum + val + 1).format("Do");
            $scope.sunForm = moment().day("Sunday").week(weekNum + val + 1).format("YYYY-MM-DD");
            var weekVal = weekNum + val;
            $scope.weekNumber = weekVal;
            $scope.practiceGrades = $firebase(new Firebase("https://practiced.firebaseio.com/sessions/" + $scope.weekNumber));
            //Week number will currently -march 1st 2015- continue past 52.
            $scope.sessionCount = 0;
            $scope.percentage = "0%";
            var ref = new Firebase("https://practiced.firebaseio.com/groups/" + thisGroup + "/practice/" + weekVal + "/" + thisStudent);
            $scope.sessions = $firebase(ref);
            ref.on('value', function(snapshot) {
                console.log(snapshot.val());
                if(snapshot.val() != null) {
                    //                     $scope.sessionCount = 0;
                    var count = 0;
                    snapshot.forEach(function() {
                        count++;
                        $scope.sessionCount = count;
                        switch($scope.sessionCount) {
                            case 0:
                                $scope.percentage = "0%";
                                break;
                            case 1:
                                $scope.percentage = "60%"
                                break;
                            case 2:
                                $scope.percentage = "70%"
                                break;
                            case 3:
                                $scope.percentage = "80%"
                                break;
                            case 4:
                                $scope.percentage = "90%"
                                break;
                            case 5:
                                $scope.percentage = "100%"
                                break;
                        }
                        if($scope.sessionCount > 5) {
                            $scope.percentage = "105%"
                        }
                    });
                }
            });
        }
        $scope.addWeek = function() {
            i++;
            $scope.week(now, i);
            console.log('plus');
        };
        $scope.subWeek = function() {
            i--;
            $scope.week(now, i);
            console.log('minus');
        };
        $scope.thisWeek = function() {
            i = 0;
            if(today == 0) {
                $scope.week(now, 0);
                $scope.subWeek();
            } else {
                $scope.week(now, 0);
            }
        };
        //Make adjustment for Sundays so that the current week displays correctly.
        if(today == 0) {
            $scope.week(now, 0);
        } else {
            $scope.week(now, 0);
        }
        $scope.showLog = function() {
            $scope.thisWeek();
            $scope.logShow = true;
        };
        $scope.thisDate = "";
        $scope.newSession = function(date, month, day, num, year) {
            $scope.addSession = true;
            $scope.thisDate = date;
            $scope.prettyDate = day + ", " + month + " " + num + ", " + year;
        };
        $scope.cancelSession = function() {
            $scope.thisDate = "";
            $scope.session.practiced = "";
            $scope.session.comments = "";
            $scope.errmsg = "";
            $scope.prettyDate = "";
            $scope.addSession = false;
        };
        $scope.saveSession = function() {
            if(moment($scope.thisDate) > moment(todayForm)) {
                $scope.errmsg = "We can't save this.  You can't enter dates in the future without first inventing time machine.";
            } else {
                var ref = new Firebase(FBURL + "/groups/" + thisGroup + "/practice/" + $scope.weekNumber + "/" + thisStudent);
                ref.push({
                    studentName: $scope.session.studentName,
                    date: $scope.thisDate,
                    practiced: $scope.session.practiced,
                    comments: $scope.session.comments
                });
                ref.on('value', function(snapshot) {
                    if(snapshot.val() != null) {
                        var count = 0;
                        snapshot.forEach(function() {
                            count++;
                            $scope.sessionCount = count;
                            switch($scope.sessionCount) {
                                case 0:
                                    $scope.percentage = "0%";
                                    break;
                                case 1:
                                    $scope.percentage = "60%"
                                    break;
                                case 2:
                                    $scope.percentage = "70%"
                                    break;
                                case 3:
                                    $scope.percentage = "80%"
                                    break;
                                case 4:
                                    $scope.percentage = "90%"
                                    break;
                                case 5:
                                    $scope.percentage = "100%"
                                    break;
                            }
                            if($scope.sessionCount > 5) {
                                $scope.percentage = "105%"
                            }
                        });
                    }
                });
                var practiceSessions = new Firebase(FBURL + "/sessions/" + $scope.weekNumber + "/" + thisStudent);
                practiceSessions.set($scope.percentage);
                $scope.thisDate = "";
                $scope.prettyDate = "";
                $scope.session.practiced = "";
                $scope.session.comments = "";
                $scope.errmsg = "";
                $scope.addSession = false;
            }
        };
    }
]).controller('StudentCtrl', ['$scope', 'syncData', '$firebase', '$routeParams', 'FBURL', '$location', '$rootScope',
    function($scope, syncData, $firebase, $routeParams, FBURL, $location, $rootScope) {
        //         $scope.groupOptions = ['KMS Beginner', 'KMS Beginner Percussion', 'KMS Concert & Symphonic', 'KMS Concert & Symphonic Percussion', 'KMS Wind Ensemble', 'KMS Wind Ensemble Percussion'];
        $scope.selectedGroup = '';
        $scope.session = {};
        $scope.resetStudentMode = function() {
            //             localStorage.setItem('studentMode', false);   
            //             console.log(localStorage.getItem('studentMode'));
            console.log($scope.selectedGroup);
            console.log($scope.passw);
            localStorage.clear();
            $scope.assigned = '';
            $scope.selectedGroup = '';
            $scope.passw = '';
            $scope.studentMode = false;
            $scope.session.thisGroup = '';
            $scope.session.thisUser = '';
            $scope.session.studentName = '';
            $scope.session.studentInst = '';
            $scope.session.studentLastNameFirst = '';
            $scope.myGrade = '';
            document.getElementById("studentLoginForm").reset();
            $location.path('/');
        };
        $scope.commentsPage = $firebase(new Firebase(FBURL + "/groups/" + $routeParams.group + "/practice/" + $routeParams.week));
        //week based on todays date
        $scope.today = moment().day();
        //         console.log($scope.today);
        if($scope.today == 0) {
            var thisWeek = moment().week() - 1;
            console.log("day " + $scope.today);
            //             console.log(thisWeek);
        } else {
            var thisWeek = moment().week()
            //             console.log(thisWeek);
        }
        $scope.loginError = '';
        $scope.setStudentMode = function(group, password) {
            if((!group) || (!password)) {
                $scope.loginError = "You need to select a group and enter your id.";
                $scope.studentMode = false;
            }
            var ref = new Firebase(FBURL + "/groups/" + group + "/students/" + password);
            ref.on('value', function(dataSnapshot) {
                //                 console.log(dataSnapshot.val());
                if(dataSnapshot.val() !== null) {
                    localStorage.setItem('studentId', password);
                    localStorage.setItem('studentGroup', group);
                    console.log(dataSnapshot.val());
                    $scope.assigned = $firebase(new Firebase(FBURL + "/groups/" + group + "/assignments"));
                    $scope.studentMode = true;
                    $scope.session.thisGroup = group;
                    $scope.session.thisUser = password;
                    $scope.session.studentName = dataSnapshot.val().first + " " + dataSnapshot.val().last;
                    $scope.session.studentInst = dataSnapshot.val().instrument;
                    $scope.session.studentLastNameFirst = dataSnapshot.val().last + ", " + dataSnapshot.val().first;
                    $scope.myGrade = $firebase(new Firebase("https://practiced.firebaseio.com/groups/" + $scope.session.thisGroup + "/grades"));
                }
                //                 if(dataSnapshot.val() === null) {
                //                     $scope.loginError = "You entered the wrong id."
                //                 }
            });
            ///this week
            var curCountRef = new Firebase(FBURL + "/groups/" + $scope.session.thisGroup + "/practice/" + thisWeek + "/" + $scope.session.thisUser);
            curCountRef.on('value', function(snapshot) {
                var count = 0;
                snapshot.forEach(function() {
                    count++;
                });
                switch(count) {
                    case 0:
                        var grade = "0%";
                        break;
                    case 1:
                        var grade = "60%"
                        break;
                    case 2:
                        var grade = "70%"
                        break;
                    case 3:
                        var grade = "80%"
                        break;
                    case 4:
                        var grade = "90%"
                        break;
                    case 5:
                        var grade = "100%"
                        break;
                    case 6:
                        var grade = "105%"
                        break;
                }
                $scope.curCount = {
                    total: count,
                    grade: grade
                }
                //                 console.log($scope.curCount);
            });
            var lastWeek = thisWeek - 1;
            //last week
            var lastCountRef = new Firebase(FBURL + "/groups/" + $scope.session.thisGroup + "/practice/" + lastWeek + "/" + $scope.session.thisUser);
            lastCountRef.on('value', function(snapshot) {
                var count = 0;
                snapshot.forEach(function() {
                    count++;
                });
                switch(count) {
                    case 0:
                        var grade = "0%";
                        break;
                    case 1:
                        var grade = "60%"
                        break;
                    case 2:
                        var grade = "70%"
                        break;
                    case 3:
                        var grade = "80%"
                        break;
                    case 4:
                        var grade = "90%"
                        break;
                    case 5:
                        var grade = "100%"
                        break;
                    case 6:
                        var grade = "105%"
                        break;
                }
                $scope.lastCount = {
                    total: count,
                    grade: grade
                };
                //                 if(localStorage.getItem('studentMode') == true){
                //                     console.log(localStorage.getItem('studentMode'));
                //                     localStorage.setItem('studentMode', true);
                //                     location.reload();
                //                 }
                //                 location.reload();
                if($scope.studentMode) {
                    $scope.loginError = '';
                    if(window.location.href.indexOf('reload') == -1) {
                        window.location.replace(window.location.href + '?reload');
                    }
                }
                var ref2 = new Firebase(FBURL + "/groups/" + group + "/practice/");
                ref2.on("value", function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        console.log(childSnapshot.hasChild(password));
                        if(childSnapshot.hasChild(password)) {
                            console.log(childSnapshot.key() + ": " + childSnapshot.child(password).numChildren());
                            var sessionCount = childSnapshot.child(password).numChildren();
                            switch(sessionCount) {
                                case null:
                                    var grade = "0%";
                                    break;
                                case 0:
                                    var grade = "0%";
                                    break;
                                case 1:
                                    var grade = "60%"
                                    break;
                                case 2:
                                    var grade = "70%"
                                    break;
                                case 3:
                                    var grade = "80%"
                                    break;
                                case 4:
                                    var grade = "90%"
                                    break;
                                case 5:
                                    var grade = "100%"
                                    break;
                                case 6:
                                    var grade = "105%"
                                    break;
                            }
                            if(sessionCount > 5) {
                                var grade = "105%"
                            }
                            if(group !== undefined) {
                                var studentSessions = new Firebase(FBURL + "/groups/" + group + "/students/" + password + "/sessions/" + childSnapshot.key());
                                studentSessions.set(grade);
                            } else {
                                $scope.studentMode = false;
                            }
                        }
                    });
                });
            });
        }; //end setStudentMode
        //         $scope.groupListFire = $firebase(new Firebase("https://practiced.firebaseio.com/groups"));
        //         $scope.groupListFire = $firebase(new Firebase("https://practiced.firebaseio.com/groupList"));
        //$scope.groupArray = ["KMS Beginner", "KMS Beginner Percussion", "KMS Concert & Symphonic", "KMS Concert & Symphonic Percussion", "KMS Wind Ensemble", "KMS Wind Ensemble Percussion"];
        //         $scope.selectedGroup = $scope.groupArray[0];
        //
        // console.log($scope.groupListFire);
        // 
        var thisStudent = localStorage.getItem('studentId');
        var thisGroup = localStorage.getItem('studentGroup');
        if(thisStudent && thisGroup) {
            $scope.setStudentMode(thisGroup, thisStudent);
        } else {
            console.log('student not set');
        }
        $scope.day = new Date("2014-09-07").getDay();
        $scope.nextMon = moment().weekday(8).format("YYYY-MM-DD");
        $scope.sun = moment().weekday(0).format("YYYY-MM-DD");
        $scope.savePractice = function() {
            var dayEntered = moment($scope.session.date).day();
            var dayOfYearEnt = moment($scope.session.date).dayOfYear();
            var todayDayOfYear = moment().dayOfYear();
            var today = moment().day();
            var diff = todayDayOfYear - dayOfYearEnt;
            console.log("diff =" + diff);
            if(dayOfYearEnt > todayDayOfYear) {
                $scope.errmsg = "We can't save this.  You can't enter dates in the future without first inventing time machine.";
            } else if(diff > 8) {
                $scope.errmsg = "We can't save this.  If you are trying to log late practice time from last week, you need to fill out the late practice form.";
                if(today == 1) {
                    $scope.errmsg = "Remember this is the last day to log practice time for last week before it is considered late.  After Monday you must use the late practice form or it will be a zero.";
                }
            } else {
                $scope.errmsg = "";
                if(dayEntered == 0) {
                    var weekNum = moment($scope.session.date).week() - 1;
                    console.log(weekNum);
                } else {
                    var weekNum = moment($scope.session.date).week();
                    console.log(weekNum);
                }
                var ref = new Firebase("https://practiced.firebaseio.com");
                if(weekNum > 36) {
                    ref.child("groups/" + $scope.session.thisGroup + "/practice/" + weekNum + "/" + $scope.session.thisUser).push({
                        studentName: $scope.session.studentLastNameFirst,
                        date: $scope.session.date,
                        practiced: $scope.session.practiced,
                        comments: $scope.session.comments
                    });
                    //                     alert('Practice time saved');
                    //                     ref.child("media/" + $scope.session.studentName).push({
                    //                         studentId: $scope.session.thisUser,
                    //                         media: $scope.session.media,
                    //                         date: $scope.session.date
                    //                     });
                } else {
                    ref.child("groups/" + $scope.session.thisGroup + "/practice/" + weekNum + "/" + $scope.session.thisUser).push({
                        studentName: $scope.session.studentName,
                        date: $scope.session.date,
                        practiced: $scope.session.practiced,
                        comments: $scope.session.comments
                    });
                    //                     alert('Practice time saved');
                    //                     ref.child("media/" + $scope.session.studentName).push({
                    //                         studentId: $scope.session.thisUser,
                    //                         media: $scope.session.media,
                    //                         date: $scope.session.date
                    //                     });
                }
                $scope.session.date = '';
                $scope.session.practiced = '';
                $scope.session.comments = '';
                //                 $scope.session.media = '';
            }
            //             
            //             
        };
    }
]).controller('PracticeTimeCtrl', ['$scope', '$firebase', 'FBURL',
    function($scope, $firebase, FBURL) {
        //pretend to write yourself a note. hmmmm.  you were going to setup a listener for this crap below...
    }
]);