angular.module('App').controller('TourCtrl', function ($scope, $http, $location, $ionicPopup, $ionicSideMenuDelegate, $ionicLoading) {

  $ionicSideMenuDelegate.canDragContent(false);

  $scope.login = function () {
    $ionicPopup.prompt({
      title: 'Login: Choose an username',
      inputPlaceholder: 'Username',
      okText: 'Login',
      okType: 'button-energized'
    }).then(function (code) {
      if(!!code && code.length >= 5){
        var data = {
          userID: code, 
          deviceID: window.device.uuid
        };
        $ionicLoading.show({
          template: '<span class="icon spin ion-loading-d"></span> Trying to log as ' + code
        });
        $http.post("http://devserver-arrpg.rhcloud.com/api/register", data).then(function (res){
          $ionicLoading.hide();
          if(res.data.result == "success"){
            $location.url('/');
            $ionicSideMenuDelegate.canDragContent(true);
            localStorage.setItem('authToken', res.data.token);
            localStorage.setItem('userID', data.userID);
            localStorage.setItem('deviceID', data.deviceID);
            $ionicPopup.alert({
              title: 'Success',
              template: "You are now logged in as " + code,
              okType: 'button-energized'
            });
          }else{
            $ionicPopup.alert({
              title: 'Error',
              template: res.data.message,
              okType: 'button-energized'
            });
          }
        });
      }else{
       $ionicPopup.alert({
         title: 'You need an username!',
         template: 'You must select a name to enter the game. Sorry, no name, no game!',
         okType: 'button-energized'
       });
      }
    });
  }
});
