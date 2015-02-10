app.controller('ShowCtrl',['$scope','$http','$routeParams', '$modal', function($scope, $http, $routeParams, $modal) {

 var contactId = $routeParams.id

  $http.get('/.api/contact/'+contactId).success(function(data){
    $scope.contact = data;
  }).error(function(err){
    alert('ERROR!');
  })

  $scope.editContact = function() {
    // alert('Clicked edit'+contactId)
  //   //the above is needed for the resolve post function inside the modal
  //   // alert("edit post:"+idx)
    $modal.open({
      templateUrl:'/views/editModal.html',
      controller:'EditModalCtrl',
      resolve:{
        contact:function(){
          return $scope.contact
        }
      }
    }).result.then(function(updatedContact){
      $scope.contact=updatedContact
    },function(){
      // alert('modal closed with cancel')
    })
  }

}]);