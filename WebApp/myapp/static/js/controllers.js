'use strict';

/* Controllers */

function LoginController($scope,$location,AuthService) {

	$scope.login = function(){
		AuthService.login($scope.loginForm.username, $scope.loginForm.password)
		.then(function(){
			$location.path('/about');
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
	
}

function AboutController($scope) {
	
}

function LogoutController($scope, $location, $route, AuthService){
	console.log("coming into LogoutController")
	$scope.logout = function(){
		AuthService.logout()
	.then(function(response){
		$location.path('/');
		//$route.reload();		
		});
	};
}

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
