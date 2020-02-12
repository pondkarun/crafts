<?php
require_once('../condb.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$ID = @$postRequest->ID;
$TYPE_ID = @$postRequest->TYPE_ID;
$BRAND = @$postRequest->BRAND;
$MODEL = @$postRequest->MODEL;
$SERIAL = @$postRequest->SERIAL;
$PurchaseDate = @$postRequest->PurchaseDate;
$DisposedDate = @$postRequest->DisposedDate;
$STATUS = @$postRequest->STATUS;


$sql = "UPDATE `inventory` SET
    
    `TYPE_ID` = '" . $TYPE_ID . "',
    `BRAND` = '" . $BRAND . "',
    `MODEL` = '" . $MODEL . "',
    `SERIAL` = '" . $SERIAL . "',
    `PurchaseDate` = '" . $PurchaseDate . "',
    `DisposedDate` = '" . $DisposedDate . "',
    `STATUS` = '" . $STATUS . "'

    WHERE ID = '" . $ID . "'
  ";

$result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());




print_r($result);
