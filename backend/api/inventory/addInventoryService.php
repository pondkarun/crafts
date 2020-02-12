<?php
require_once('../condb.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);
$countPostRequest = count($postRequest);



for ($i = 0; $i < $countPostRequest; $i++) {

    $ID = GUID();
    $sql = "SELECT COUNT(INVENTORY_CODE) AS COUNT_CODE FROM `inventory`";
    $result = mysqli_query($condb, $sql) or die("Error in query: $sql " . mysqli_error());
    $row = mysqli_fetch_array($result);
    $COUNT_CODE = $row['COUNT_CODE'] + 1;
    $INVENTORY_CODE = sprintf("PC%04d", $COUNT_CODE);

    $statement = array(
        @$postRequest[$i]->TYPE_ID,
        @$postRequest[$i]->BRAND,
        @$postRequest[$i]->MODEL,
        @$postRequest[$i]->SERIAL,
        @$postRequest[$i]->PurchaseDate,
        @$postRequest[$i]->DisposedDate,
        @$postRequest[$i]->STATUS
    );

    $sql = "INSERT INTO inventory 
    (
        `ID`,
        `INVENTORY_CODE`,
        `TYPE_ID`,
        `BRAND`,
        `MODEL`,
        `SERIAL`,
        `PurchaseDate`,
        `DisposedDate`,
        `STATUS`
    )
     VALUES 
     (
        '" . $ID . "',
        '" . $INVENTORY_CODE . "',
        '" . $statement[0] . "',
        '" . $statement[1] . "',
        '" . $statement[2] . "',
        '" . $statement[3] . "',
        '" . $statement[4] . "',
        '" . $statement[5] . "',
        '" . $statement[6] . "' 
    )";

    $result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());
}



print_r($result);
