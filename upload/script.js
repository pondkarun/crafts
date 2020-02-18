var myApp = angular.module('app', [
  "flow"
]);

myApp.controller('UploadCtrl', function ($scope, $http) {
  $scope.imageStrings = [];
  $scope.processFiles = function (files) {
    angular.forEach(files, function (flowFile, i) {
      var fileReader = new FileReader();
      fileReader.onload = function (event) {
        var uri = event.target.result;
        $scope.imageStrings[i] = uri;
      };
      fileReader.readAsDataURL(flowFile.file);
    });
  };
  $scope.modelSave = {
    name: null,
    imageStrings: null
  }
  $scope.demo = () => {
    // console.log("$scope.imageStrings", $scope.imageStrings);
    $scope.modelSave.imageStrings = $scope.imageStrings
    console.log("$scope.modelSave", $scope.modelSave);
    $http.post("http://localhost/demo/php/upload/db.php", $scope.modelSave).then((res) => {
      console.log("res.data", res.data);
    })
  }
});