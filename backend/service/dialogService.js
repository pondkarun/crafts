app.service("customDialog", function ($mdDialog) {

    var objTxt;

    this.alert = function (callback, objTxt) {

        objTxt = this.defaultObj(objTxt);

        objTxt.title = defaultTxt(objTxt.title, "แจ้งเตือน");
        objTxt.content = defaultTxt(objTxt.content, "แจ้งเตือน");
        objTxt.okBtn = defaultTxt(objTxt.okBtn, "ตกลง");
        objTxt.isConfirm = false;

        setObjTxt(objTxt);

        customDialog('service/dialogTemplate/customDialog.html', callback);
    }
    this.confirm = function (okCallback, noCallback, objTxt) {

        objTxt = this.defaultObj(objTxt);

        objTxt.title = defaultTxt(objTxt.title, "แจ้งเตือน");
        objTxt.content = defaultTxt(objTxt.content, "แจ้งเตือน");
        objTxt.okBtn = defaultTxt(objTxt.okBtn, "ตกลง");
        objTxt.cancelBtn = defaultTxt(objTxt.cancelBtn, "ยกเลิก");
        objTxt.isConfirm = true;

        setObjTxt(objTxt);

        customDialog('service/dialogTemplate/customDialog.html', okCallback, noCallback);
    }

    this.getObjTxt = function () {
        return objTxt;
    }
    this.defaultObj = function (objTxt) {
        if (objTxt == undefined) {
            objTxt = {
                'title': "",
                'content': "",
                'okBtn': "",
                'cancelBtn': "",
                'isConfirm': ""
            }
        }
        return objTxt;
    }

    function setObjTxt(value) {
        objTxt = value;
    }

    function customDialog(template, okCallback, noCallback) {

        $mdDialog.show({
            controller: DialogController,
            templateUrl: template,
            parent: angular.element(document.body),
        })
    .then(function () {
        if (okCallback) {
            okCallback();
        }
    }
    , function () {
        if (noCallback) {
            noCallback();
        }
    });

    }

    function defaultTxt(txt, setTxt) {
        if (txt == undefined || txt == null || txt == "") {
            txt = setTxt;
        }

        return txt;
    }

    function DialogController($scope, $mdDialog, customDialog) {

        $scope.model = customDialog.getObjTxt();

        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.submit = function () {
            $mdDialog.hide();
        };
    }

});
