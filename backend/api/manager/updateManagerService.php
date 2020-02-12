<?php
require_once('../condb.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$ID = @$postRequest->ID;

$MANAGER_ID = @$postRequest->MANAGER_ID;
$MANAGER_REMARK = @$postRequest->MANAGER_REMARK;
$MANAGER_STATUS = @$postRequest->MANAGER_STATUS;
$STATUS = "แก้ไขเรียบร้อย";

$sql = "UPDATE `services` SET 

`MANAGER_ID` = '" . $MANAGER_ID . "',
`MANAGER_REMARK` = '" . $MANAGER_REMARK . "',
`MANAGER_STATUS` = '" . $MANAGER_STATUS . "',
`STATUS` = '" . $STATUS . "'

WHERE ID = '" . $ID . "' ";
$result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());

print_r($result);
