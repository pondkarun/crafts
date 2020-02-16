<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$data = array();
$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$name = @$postRequest->name;
$price = @$postRequest->price;
$type_id = @$postRequest->type_id;
$employed_id = @$postRequest->employed_id;

$color = @$postRequest->color;
$color = json_encode($color, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

$size = @$postRequest->size;
$size = json_encode($size, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);


$sql = "SELECT COUNT(code_handmade) AS COUNT_CODE FROM `handmade`";
$result = mysqli_query($condb, $sql);
$row = mysqli_fetch_array($result);
$COUNT_CODE = $row['COUNT_CODE'] + 1;

$code_handmade = sprintf("HM1%04d", $COUNT_CODE);
$id = GUID();

if ($name) {

    $sql = "INSERT INTO handmade 
    (
        `id`,
        `code_handmade`,
        `name`,
        `price`,
        `type_id`,
        `color`,
        `size`,
        `employed_id`
    )
     VALUES 
     (
        '" . $id . "',
        '" . $code_handmade . "',
        '" . $name . "',
        '" . $price . "',
        '" . $type_id . "',
        '" . $color . "',
        '" . $size . "',
        '" . $employed_id . "'
    )";

    $result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());

    $data["status"] = '200';
    $data["id"] = $id;
} else {
    $data["status"] = '404';
    $data["id"] = null;
}


print_r(json_encode($data));
