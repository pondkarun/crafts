'use strict'

var app = angular.module('crafts', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngRoute', 'kendo.directives', 'vAccordion', 'ngAnimate']);
var loading = new loadingTopJS();

var webURL = {
    webApi: "http://127.0.0.1/crafts/api/"
}


app.constant('msgSettings', {
    msgDelConfirm: "ยืนยันการลบข้อมูล",
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
    msgErrorApi: 'มีบางอย่างผิดพลาด! กรุณาลองใหม่อีกครั้ง',
    msgRepeatedlyData: 'มีข้อมูลซ้ำกัน กรุณาลองทำรายการใหม่',

});