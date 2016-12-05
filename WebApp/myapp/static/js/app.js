'use strict';

angular.module('angularFlask', ['angularFlaskServices', 'ngRoute','ui.router', 'ngAnimate', 'ngMaterial', 'ngMdIcons', 'mdDataTable'])
	.constant('TPL_PATH', 'static/partials')

	.config(/*['$routeProvider', '$locationProvider','$stateProvider', '$urlRouterProvider',*/
		function( $locationProvider,$routeProvider, $stateProvider, $urlRouterProvider, TPL_PATH, $mdThemingProvider) {

			$locationProvider.html5Mode({
				enabled: true,
	  			requireBase: false
	  		});	

	  		/*var loginstate = {name:'login',
	            url: '/login',
	            controller : 'loginController',
	            templateUrl: TPL_PATH + '/login.html',
	            access: {
    		  			isFree: true
  				}
	         };*/

	         /*var homestate = {
	         	name: 'home',
	            url: '/home',	            
	            templateUrl: TPL_PATH + '/landing.html',
	            access: {
    		  			isFree: false
  				}
	         };*/


			/*var dashboardState = {
                name: 'home.dashboard',
                url: '/dashboard',
                controller: 'HomeCtrl',
                templateUrl: TPL_PATH + '/home.html',
                access: {
    		  		isFree: false
  				}
            };

			var extensionState = {
	                name: 'home.extensions',
	                url: '/extensions',
	                templateUrl: TPL_PATH + '/home.html',
	                access: {
    		  			isFree: false
  					}
	            };*/

	        /*var roomsState = {
	            name: 'home.rooms',
	            url: '/rooms',
	            controller : 'RoomCtrl',
	            templateUrl: TPL_PATH + '/rooms.html',
	            access: {
    		  			isFree: false
  				}
	        };*/

	         /*var billState = {
	            name: 'home.bills',
	            url: '/bills',
	            
	            templateUrl: TPL_PATH + '/bills.html',
	            access: {
    		  			isFree: false
  				}
	         };*/

	         	$urlRouterProvider.otherwise('/home');
	         	$stateProvider.state("home",{
	         		url: "/home",	            
	           		templateUrl: TPL_PATH + '/landing.html',
	            	access: {
    		  			isFree: false
  					}			
	         	});
	         	$stateProvider.state("login",{
	         		url: '/login',
		            controller : 'loginController',
		            templateUrl: TPL_PATH + '/login.html',
		            access: {
	    		  			isFree: true
	  				}
	         	});
	            $stateProvider.state("dashboard",{
	                url: '/dashboard',
	                parent: 'home',
	                templateUrl: TPL_PATH + '/about.html',
	                access: {
	    		  		isFree: false
	  				}
	            });
	            $stateProvider.state("extension",{
	                url: '/extension',
	                parent: 'home',
	                templateUrl: TPL_PATH + '/home.html',
	                access: {
    		  			isFree: false
  					}
	            });
	            $stateProvider.state("rooms",{
	            	url: '/rooms',
	            	parent: 'home',
		            templateUrl: TPL_PATH + '/rooms.html',
		            access: {
	    		  			isFree: false
	  				}
	            });
	            $stateProvider.state("bill",{
	            	url: '/bill',
	            	parent: 'home',
		            templateUrl: TPL_PATH + '/bills.html',
		            access: {
	    		  			isFree: false
	  				}
	            });


		$routeProvider
		.when('/',{
			templateUrl:TPL_PATH +'/landing.html',
			/*controller: */
			access: {
    		  isFree: false
  			}
		})
		/*.when('/login', {
			templateUrl: TPL_PATH +'/login.html',
			controller: 'loginController',
			access: {
    		  isFree: true
  			}
		})*/
		.when('/logout', {			
			controller: 'LogoutController',
			access: {
    		  isFree: false
  			}
		});		
		/*.otherwise({
			redirectTo: '/'
		});		


            /*$urlRouterProvider.otherwise('/');*/
         $mdThemingProvider.theme('default')
                .primaryPalette('teal',{'default': '500', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
                .accentPalette('pink',{'default': '500'});
	})
;

angular.module('angularFlask').run(function ($rootScope,$location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
  	if(!next.access.isFree && !AuthService.isLoggedIn()){
  		$location.path("/login");
  		/*$state.transitionTo('login');*/
  		$route.reload();
  	}	
  });
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});