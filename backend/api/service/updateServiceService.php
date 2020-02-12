<?php
require_once('../condb.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$ID = @$postRequest->ID;
$SATISFACTION = @$postRequest->SATISFACTION;
$STATUS = "จบงาน";
$END_DATE = date("Y-m-d");

$sql = "UPDATE `services` SET 

`SATISFACTION` = '" . $SATISFACTION . "',
`END_DATE` = '" . $END_DATE . "',
`STATUS` = '" . $STATUS . "'

WHERE ID = '" . $ID . "' ";
$result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());

print_r($result);
