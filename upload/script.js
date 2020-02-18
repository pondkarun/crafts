var myApp = angular.module('app', [
  "flow"
]);

myApp.controller('UploadCtrl', function ($scope, $http) {
  $scope.modelSave = {
    name: null,
    imageStrings: []
  }
  $scope.processFiles = function (files) {
    angular.forEach(files, function (flowFile, i) {
      var fileReader = new FileReader();
      fileReader.onload = function (event) {
        var uri = event.target.result;
        let item = {
          uri: event.target.result,
          name: flowFile.name
        }
        $scope.modelSave.imageStrings.push(item);
      };
      fileReader.readAsDataURL(flowFile.file);
    });
  };

  $scope.demo = () => {
    console.log("$scope.modelSave", $scope.modelSave);
    $http.post("http://localhost/crafts/upload/db.php", $scope.modelSave).then((res) => {
      console.log("res.data", res.data);
    })
  }

  $scope.del = (item) => {
    console.log("item", item);
    console.log("uploader.flow.files", $scope.uploader.flow.files);

  }
});