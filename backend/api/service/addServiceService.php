<?php
require_once('../condb.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$PERIPETEIA_ID = @$postRequest->PERIPETEIA_ID;
$USER_ID = @$postRequest->USER_ID;
$DETAIL = @$postRequest->DETAIL;


$sql = "SELECT COUNT(SERVICES_CODE) AS COUNT_CODE FROM `services`";
$result = mysqli_query($condb, $sql);
$row = mysqli_fetch_array($result);
$COUNT_CODE = $row['COUNT_CODE'] + 1;

$ID = GUID();
$SERVICES_CODE = sprintf("ITHW%04d", $COUNT_CODE);
$LOCATION_ID = "A47625CABFE643A1AED0CEA2A0D8D75B";


$sql = "INSERT INTO services 
    (
        `ID`,
        `SERVICES_CODE`,
        `USER_ID`,
        `PERIPETEIA_ID`,
        `LOCATION_ID`,
        `DETAIL`
    )
     VALUES 
     (
        '" . $ID . "', 
        '" . $SERVICES_CODE . "',
        '" . $USER_ID . "',
        '" . $PERIPETEIA_ID . "',
        '" . $LOCATION_ID . "',
        '" . $DETAIL . "'
    )";

$result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());




print_r($result);
