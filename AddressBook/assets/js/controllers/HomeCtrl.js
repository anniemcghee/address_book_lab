app.controller('HomeCtrl',['$scope','$http','$modal',function($scope, $http, $modal) {

  $scope.contacts = [];

  $http.get('/.api/contact').success(function(data){
    $scope.contacts = data;
  })

  $scope.deleteContact = function(idx) {
    var contactId = $scope.contacts[idx].id;

    $http.delete('/.api/contact/'+contactId).success(function(data){
      $scope.contacts.splice(idx,1);
    }).error(function(err){
      alert(err);
    })
  }

  $scope.editContact = function(idx) {
    var contactIdx = idx;
    //the above is needed for the resolve post function inside the modal
    // alert("edit post:"+idx)
    $modal.open({
      templateUrl:'/views/editModal.html',
      controller:'EditModalCtrl',
      resolve:{
        contact:function(){
          return $scope.contacts[contactIdx]
        }
      }
    }).result.then(function(updatedContact){
      $scope.contacts[contactIdx]=updatedContact
    },function(){
      alert('modal closed with cancel')
    })
  }

}]);