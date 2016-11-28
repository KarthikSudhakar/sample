'use strict';

angular.module('AngularFlask', ['angularFlaskServices'])
	.config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
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