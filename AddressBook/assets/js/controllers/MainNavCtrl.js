app.controller('MainNavCtrl',['$scope','$location',function($scope, $location){

  $scope.navCollapsed = true;

  $scope.isActive = function(url){
    return url == $location.path();
  //location is directly related to ngRoute that we loaded into our app - it helps get the url - or can set it with path('/whatever')
  }

  $scope.search = function(){
    // alert('search term' + $scope.searchTerm)
    $location.path('/');
    $location.search('q',$scope.searchTerm);
  }



}])