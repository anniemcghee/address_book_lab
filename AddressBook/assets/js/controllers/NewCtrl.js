app.controller('NewCtrl',['$scope','$http','$modal', '$location','AlertService',function($scope, $http, $modal, $location, AlertService) {

  $scope.addContact = function(){
    $scope.alert=false;

    var data = {
      firstName:$scope.firstName,
      lastName:$scope.lastName,
      email:$scope.email,
      phone:$scope.phone,
      streetAddress:$scope.streetAddress,
      city:$scope.city,
      state:$scope.state,
      zip:$scope.zip,
      notes:$scope.notes
    };

    $http.post('/.api/contact', data).success(function(data){
      $location.path('/');
      AlertService.add('success','Contact has been added');
      // $scope.alert="Your contact has been created.";
      $scope.firstName="";
      $scope.lastName="";
      $scope.email="";
      $scope.phone="";
      $scope.streetAddress="";
      $scope.city="";
      $scope.state="";
      $scope.zip="";
      $scope.notes="";
    }).error(function(err){
      // alert(err);
    })
  }

}]);