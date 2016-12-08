'use strict';

/* Controllers */
angular.module('angularFlask')

.controller('loginController',['$scope','$state','$location','AuthService','$mdToast',function($scope,$state,$location,AuthService,$mdToast) {

	$scope.login = function(){
		AuthService.login($scope.loginForm.username, $scope.loginForm.password)
		.then(function(){

			console.log($location.path());
			$location.path('/home/dashboard');
		    console.log($location.path());
			
			$state.transitionTo('dashboard');
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
	// line chart 
	$scope.chartOptions = {
                    title: {
                        text: 'Booking Across the Month'
                    },
                    xAxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },

                    series: [{
                        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                    }]
                };

	//****** activity gauge *******//
   $scope.solidGaugeData = [{
      name: 'Rooms Available',
      borderColor: Highcharts.getOptions().colors[0],
      data: [{
        color: Highcharts.getOptions().colors[0],
        radius: '100%',
        innerRadius: '100%',
        y: 80
      }]
    }, {
      name: 'Rooms Occupied',
      borderColor: Highcharts.getOptions().colors[1],
      data: [{
        color: Highcharts.getOptions().colors[1],
        radius: '75%',
        innerRadius: '75%',
        y: 65
      }]
    }];
})

.controller('LogoutController',function($scope, $location, $route, AuthService){
	
	$scope.logout = function(){
		AuthService.logout()
	.then(function(response){
		$location.path('/login');
		$route.reload();		
		});
	};
})
.controller('roomController',function($scope,$mdToast,DataService){
	
	DataService.getOccupiedRooms().then(function(response){	
		$scope.rooms = {};	
		$scope.rooms.numresults = response.num_results;
		$scope.rooms.occupancy = response.objects;
		console.log(response);
	});	
	DataService.getAvailableRooms().then(function(data){	
		
		$scope.rooms.available = data.num_results;
		$scope.rooms.availableRooms = data.objects;
		console.log(data);
	});	
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
