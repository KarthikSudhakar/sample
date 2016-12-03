'use strict';

angular.module('AngularFlask', ['angularFlaskServices','ui.router', 'ngAnimate', 'ngMaterial', 'ngMdIcons', 'mdDataTable', 'app.homePages'])
	.constant('TPL_PATH', '/partials')

	.config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider,$stateProvider/*, $urlRouterProvider*/, TPL_PATH, $mdThemingProvider) {
		$routeProvider
		.when('/',{
			templateUrl: 'tepmlates/home.html'
		})
		.when('/login', {
			//templateUrl: 'static/partials/landing.html',
			templateUrl: 'static/partials/login.html',
			controller: LoginController,
			access: {
    		  isFree: true
  			}
		})
		.when('/about', {
			templateUrl: 'static/partials/about.html',
			controller: AboutController,
			access: {
    		  isFree: false
  			}
		})
		.when('/logout', {			
			controller: LogoutController,
			access: {
    		  isFree: false
  			}
		})
		/*
		.when('/post/:postId', {
			templateUrl: '/static/partials/post-detail.html',
			controller: PostDetailController
		})
		/* Create a "/blog" route that takes the user to the same place as "/post" *\/
		.when('/blog', {
			templateUrl: 'static/partials/post-list.html',
			controller: PostListController
		})*/
		.otherwise({
			redirectTo: '/'
		})
		;

		$locationProvider.html5Mode(true);

		var extensionState = {
                name: 'extensions',
                url: '/exreqs',
                controller: 'HomeCtrl',
                templateUrl: TPL_PATH + '/home.html'
            };

            var roomsState = {
                name: 'rooms',
                url: '/rooms',
                /*controller : 'RoomCtrl',*/
                templateUrl: TPL_PATH + '/rooms.html'
            };

             var billState = {
                name: 'bills',
                url: '/bills',
                /*controller : 'RoomCtrl',*/
                templateUrl: TPL_PATH + '/bills.html'
             };

            $stateProvider.state(extensionState);
            $stateProvider.state(roomsState);
            $stateProvider.state(billState);
            /*$urlRouterProvider.otherwise('/');*/
            $mdThemingProvider.theme('default')
                .primaryPalette('teal',{'default': '500', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
                .accentPalette('pink',{'default': '500'});
	}])
;

angular.module('AngularFlask').run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
  	
  		console.log( next)
  		console.log(current)
	    if (!next.access.isFree && AuthService.isLoggedIn() === false) {
	    	console.log("logged in is false")
	      $location.path('/login');
	      $route.reload();
	    }
	
  });
});