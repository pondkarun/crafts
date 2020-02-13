
'use strict';
angular
  .module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
  .config(['$mdIconProvider', function ($mdIconProvider) {
    $mdIconProvider.icon('md-close', 'img/icons/ic_close_24px.svg', 24);
  }])
  .controller('BasicDemoCtrl', DemoCtrl);

function DemoCtrl($timeout, $q, $log, $http) {
  var _this = this;
  this.modelSave = {
    NAME_TH: null,
    COLOR: null
  };

  this.save = () => {
    $http.post("http://localhost/demo/basic-usage/demo.php", _this.modelSave).then((res) => {
      // console.log("res.data", res.data);
      alert("ok")
    }).catch((err) => {
      alert("erro")
    }).finally(() => {
    });
  }
  this.get = () => {
    getTypeInventory()
  }

  const getTypeInventory = () => {
    let ID = "3";
    $http.post("http://localhost/demo/basic-usage/getdemo.php", ID).then((res) => {
      console.log("res.data", typeof res.data[0].COLOR);

      let ssd = JSON.parse(res.data[0].COLOR);
      console.log("ssd", ssd);

      console.log("ssd2", ssd2);
    }).catch((err) => {
      console.log("Error");
    })
  }

}


