'use strict';
angular
    .module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
    .config(['$mdIconProvider', function($mdIconProvider) {
        $mdIconProvider.icon('md-close', 'img/icons/ic_close_24px.svg', 24);
    }])
    .controller('BasicDemoCtrl', DemoCtrl);

function DemoCtrl($timeout, $q, $log, $http) {
    var _this = this;
    this.modelSave = {
        NAME_TH: null,
        COLOR: []
    };

    this.save = () => {
        $http.post("http://localhost/crafts/basic-usage/demo.php", _this.modelSave).then((res) => {
            // console.log("res.data", res.data);
            alert("ok")
        }).catch((err) => {
            alert("erro")
        }).finally(() => {
            this.modelSave = {
                NAME_TH: null,
                COLOR: []
            };
        });
    }
    this.get = () => {
        getTypeInventory()
    }

    const getTypeInventory = () => {
        let ID = "1";
        $http.post("http://localhost/crafts/basic-usage/getdemo.php", ID).then((res) => {
            console.log("res.data", typeof res.data[0].COLOR);
            res.data[0].COLOR = JSON.parse(res.data[0].COLOR);
            this.modelSave = res.data[0]
        }).catch((err) => {
            console.log("Error");
        })
    }

}