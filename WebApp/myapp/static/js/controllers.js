'use strict';

/* Controllers */
angular.module('angularFlask')

.controller('loginController',['$scope','$state','$location','AuthService',function($scope,$state,$location,AuthService) {

	$scope.login = function(){
		AuthService.login($scope.loginForm.username, $scope.loginForm.password)
		.then(function(){

			console.log($location.path());
			$location.path('/home');
		    console.log($location.path());
			
			/*$state.transitionTo('dashboard');*/
			/*if(!$scope.$$phase) $scope.$apply()*/
          	$scope.disabled = false;
          	$scope.loginForm = {};
		   }
		,(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        );
	};
	
}]).controller('sideNavController', function($scope, $mdSidenav) {
        $scope.openLeftMenu = function() {
            $mdSidenav('left').toggle();
        };
    })
.controller('AboutController',function($scope,Post) {
	var postsQuery = Post.get({}, function(posts) {
		console.log(posts.objects);
		$scope.posts = posts.objects;
	});
})

.controller('LogoutController',function($scope, $location, $route, AuthService){
	
	$scope.logout = function(){
		AuthService.logout()
	.then(function(response){
		$location.path('/login');
		//$route.reload();		
		});
	};
});

/*function PostListController($scope, Post) {
	var postsQuery = Post.get({}, function(posts) {
		$scope.posts = posts.objects;
	});
}

function PostDetailController($scope, $routeParams, Post) {
	var postQuery = Post.get({ postId: $routeParams.postId }, function(post) {
		$scope.post = post;
	});
}*/
