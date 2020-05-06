'use strict'

var app = angular.module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngRoute', 'kendo.directives', 'vAccordion', 'ngAnimate', 'ui.bootstrap' , 'flow']);
var loading = new loadingTopJS();

app.constant('msgSettings', {
    msgDelConfirm: "ยืนยันการลบข้อมูล",
    msgCancelConfirm: "ยืนยันการยกเลิก",
    msgDelSucc: "ลบข้อมูลสำเร็จ",
    msgDelFail: "ลบข้อมูลไม่สำเร็จ",
    msgDelMasterFail: "ไม่สามารถลบข้อมูลที่เลือกได้ กรุณาลบข้อมูลที่เชื่อมโยงกับข้อมูลที่เลือกก่อน",
    msgSaveMasterFail: "ข้อมูลนี้มีในระบบแล้ว",
    msgSaveConfirm: "ยืนยันการบันทึกข้อมูล",
    msgUnSaveConfirm: "ยืนยันไม่บันทึกข้อมูล",
    msgSaveSucc: "บันทึกข้อมูลสำเร็จ",
    msgNotSave: "ไม่สามารถบันทึกข้อมูลได้",
    msgAttFile: "กรุณาแนบบไฟล์",
    msgValidForm: "กรุณากรอกข้อมูลให้ครบถ้วน",
    msgRequireText: "กรุณากรอกข้อมูล",
    msgRequireSelect: "กรุณาเลือกข้อมูล",
    msgFromSystem: "ข้อความจากระบบ",
    msgAutoCompleteNotFound: "ไม่พบข้อมูล",
    msgselectInThailand: 'กรุณาเลือกตำแหน่งในประเทศไทย',
    msgCancelAddData: 'ต้องการยกเลิกการแก้ไขข้อมูล',
    msgCancelAddDataModeAdd: 'ต้องการยกเลิกการเพิ่มข้อมูล',
    msgSelectYear: 'กรุณาเลือกปี',
    msgConfirmsendData: 'ยืนยันการส่งข้อมูล',
    msgsendComplete: 'ส่งข้อมูลสำเร็จ',
    msgTryAgain: 'กรุณาลองใหม่อีกครั้ง',
    msgAlert: 'แจ้งเตือน',
    msgShared: 'ต้องการแชร์ข้อมูล?',
    msgSharedSucc: "แชร์ข้อมูลสำเร็จ",
    msgLogInFail: 'กรุณาตรวจสอบข้อมูลที่ระบบกำลังพล',
    msgTextSearch: 'กรุณากรอกข้อมูลที่ต้องการค้นหา',
    msgUnlikePassword: 'รหัสผ่านไม่ตรงกัน',
    msgErrPassword: 'รหัสผ่านไม่ถูกต้อง',
    msgErrUserRepeat: 'ชื่อผู้ใช้นี้ได้ลงทะเบียนแล้ว',
    msgErrUserNot: 'Username หรือ Password ไม่ถูกต้อง',
    msgErrorApi: 'มีบางอย่างผิดพลาด! กรุณาลองใหม่อีกครั้ง',
    msgRepeatedlyData: 'มีข้อมูลซ้ำกัน กรุณาลองทำรายการใหม่',
    msgLogin: 'กรุณาเข้าสู่ระบบ',
    msgWelcomeLogin: 'ยินดีต้อนรับ',
    msglogOut: 'ยืนยันการออกจากระบบ',
});

app.factory('PaginationService', function PaginationService() {
    // service definition 
    var service = {};

    service.GetPager = GetPager;

    return service;

    // service implementation
    function GetPager(totalItems, currentPage, pageSize) {
        // default to page 1
        currentPage = currentPage || 1;

        // default page size will be 10
        pageSize = pageSize || 21;

        // calc total pages 
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
});