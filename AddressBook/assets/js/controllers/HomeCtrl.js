app.controller('HomeCtrl',['$scope','$http','$modal', 'AlertService', '$location',function($scope, $http, $modal, AlertService, $location) {

  $scope.contacts = [];

  var queryData = $location.search();
  var searchTerm = queryData.q || false;

  var req = {
    url:'/.api/contact',
    params:{
      'sort':'createdAt desc'
    }
  }

  if(searchTerm){
    req.params.firstName='%'+searchTerm+'%';
  }

  $http(req).success(function(data){
    $scope.contacts = data;
  })

  $scope.deleteContact = function(idx) {
    var contactId = $scope.contacts[idx].id;

    $http.delete('/.api/contact/'+contactId).success(function(data){
      AlertService.add('danger','Contact has been removed');
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