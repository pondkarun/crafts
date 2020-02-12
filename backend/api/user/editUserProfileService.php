<?php
require_once('../condb.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');


$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$ID = $postRequest->ID;
$EMAIL = $postRequest->EMAIL;
$NICKNAME = $postRequest->NICKNAME;
$IPAddress = $postRequest->IPAddress;
$TEL = $postRequest->TEL;
$PASSWORD = $condb->real_escape_string($postRequest->PASSWORD);


$sql = " UPDATE employees SET 
    EMAIL = '" . $EMAIL . "',
    NICKNAME = '" . $NICKNAME . "',
    IPAddress = '" . $IPAddress . "',
    TEL = '" . $TEL . "',
    PASSWORD = '" . $PASSWORD . "'
    WHERE ID = '$ID '";

$result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());


print_r($result);
