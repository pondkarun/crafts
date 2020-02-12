<?php
require_once('../condb.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');


$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$ID = $postRequest->ID;
$EXPIRED_DATE = $postRequest->EXPIRED_DATE;

$sql = " UPDATE equipments SET 
    STATUS = 'เลิกใช้งาน',
    EXPIRED_DATE = '" . $EXPIRED_DATE . "'
    WHERE ID = '$ID '";

$result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());


print_r($result);
