<?php
require_once('condb.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$NAME_TH = @$postRequest->NAME_TH;
$COLOR = @$postRequest->COLOR;
$COLOR = json_encode($COLOR, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

$sql = "INSERT INTO demo 
    (
        `NAME_TH`,
        `COLOR`
    )
     VALUES 
     (
        '" . $NAME_TH . "',
        '" . $COLOR . "'
    )";

$result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());




print_r($result);
