<?php
require_once('../condb.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);
$countPostRequest = count($postRequest);



for ($i = 0; $i < $countPostRequest; $i++) {

    $ID = GUID();


    $statement = array(
        @$postRequest[$i]->USER_ID,
        @$postRequest[$i]->INVENTORY_ID,

    );

    $sql = "INSERT INTO equipments 
    (
        `ID`,
        `USER_ID`,
        `INVENTORY_ID`
    )
     VALUES 
     (
        '" . $ID . "',
        '" . $statement[0] . "',
        '" . $statement[1] . "'
    )";

    $result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());
}



print_r($result);
