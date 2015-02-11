app.controller('EditModalCtrl', ['$scope','$http','$modalInstance','contact', 'AlertService', function($scope, $http, $modalInstance, contact, AlertService) {

  $scope.firstName = contact.firstName; //from the home ctrl modal instance
  $scope.lastName = contact.lastName;
  $scope.email = contact.email;
  $scope.phone = contact.phone;
  $scope.streetAddress = contact.streetAddress;
  $scope.city = contact.city;
  $scope.state = contact.state,
  $scope.zip = contact.zip,
  $scope.notes = contact.notes


  $scope.save = function(){
    var contactData = {
      firstName: $scope.firstName,//from the home ctrl modal instance
      lastName: $scope.lastName,
      email: $scope.email,
      phone: $scope.phone,
      streetAddress: $scope.streetAddress,
      city: $scope.city,
      state: $scope.state,
      zip: $scope.zip,
      notes: $scope.notes
    }

    $http.put('/.api/contact/'+contact.id, contactData)
      .success(function(data){
        AlertService.add('success','Contact has been updated');
        $modalInstance.close(data);
      })
      .error(function(err){
        alert(err);
      });
    }

    $scope.cancel = function(){
      $modalInstance.dismiss();
    }

}]);