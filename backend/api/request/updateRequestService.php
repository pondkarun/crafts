<?php
require_once('../condb.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$ID = @$postRequest->ID;
$STAF_ID = @$postRequest->STAF_ID;
$REMARK = @$postRequest->REMARK;
$ANALYZE = @$postRequest->ANALYZE;
$STATUS = @$postRequest->STATUS;


$sql = "UPDATE `services` SET
    
    `REMARK` = '" . $REMARK . "',
    `ANALYZE` = '" . $ANALYZE . "',
    `STAF_ID` = '" . $STAF_ID . "',
    `STATUS` = '" . $STATUS . "'

    WHERE ID = '" . $ID . "'
    
  ";

$result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());




print_r($result);
