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

  $scope.demo = () => {
    console.log("$scope.imageStrings", $scope.imageStrings);

    $http.post("http://localhost/demo/php/dist/db.php", $scope.imageStrings).then((res) => {
      console.log("res.data", res.data);
    })
  }
});