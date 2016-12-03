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

angular.module('AngularFlask')
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
                            console.log("Logout service- resolved to 200");
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
    ]);
