'use strict';

angular.module('angularFlaskServices', ['ngResource'])
    .factory('Post', function($resource) {
        return $resource('api/customer/:postId', {}, {
            query: {
                method: 'GET',
                params: { postId: '' },
                isArray: true
            }
        });
    });  

angular.module('angularFlask')
    .factory('AuthService', ['$q', '$timeout', '$http',
        function($q, $timeout, $http) {

            function login(username, password) {

                var deferred = $q.defer();

                $http.post('/api/login', { username: username, password: password })
                    // handle success
                    .success(function(data, status) {
                        if (status === 200 && data.result) {
                            deferred.resolve(data);
                        } else {
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function(data) {
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;
            };

            function logout(){
                var deferred = $q.defer();
                $http.get('/api/logout')
                    .success(function(data, status){
                        if (status === 200 && data.success) {                            
                            deferred.resolve(data);
                        } else {
                            deferred.reject();
                        }
                    })
                    .error(function(data){
                        console.log("Logout service- resolved to error");
                        deferred.reject();
                    });
                return deferred.promise;

            };

            function isLoggedIn() {
                //var user = {};
                $http.get('api/authenticated')
                    .success(
                        function(data, status, headers, config) {
                            console.log(data);
                            if (data.success) {
                            	
                                return true;
                            } else {
                            	
                                return false;
                            }
                        })
                    .error(
                        function(data, status, headers, config) {
                        	
                            return false;
                        });

            }
            return ({
                login: login,
                isLoggedIn: isLoggedIn,
                logout: logout
            });
        }
    ])
    .factory('DataService',['$q', '$timeout', '$http',
        function($q, $timeout, $http) {
            function getOccupiedRooms(){
                var deferred = $q.defer();
                $http.get('/api/roomoccupancy')
                    .success(function(data, status){
                        if (status === 200) {                            
                            deferred.resolve(data);
                        } else {
                            deferred.reject();
                        }
                    })
                    .error(function(data){
                        console.log("getOccupied Room service- resolved to error");
                        deferred.reject();
                    });
                return deferred.promise;
            };

            function getAvailableRooms(){
                 var deferred = $q.defer();
                 var q = '?q={"filters":[{"name":"status","op":"eq","val":"Available"}]}';
                $http.get('/api/room' + q)
                    .success(function(data, status){
                        if (status === 200) {                            
                            deferred.resolve(data);
                        } else {
                            deferred.reject();
                        }
                    })
                    .error(function(data){
                        console.log("getAvailableRoom  service- resolved to error");
                        deferred.reject();
                    });
                return deferred.promise;

            }
            return ({
                getOccupiedRooms: getOccupiedRooms,
                getAvailableRooms: getAvailableRooms
            });
        }
        

        ]);
