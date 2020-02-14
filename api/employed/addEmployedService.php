<?php
require_once('../condb.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$name = @$postRequest->name;
$surname = @$postRequest->surname;
$id_card = @$postRequest->id_card;
$tel = @$postRequest->tel;
$email = @$postRequest->email;
$address = @$postRequest->address;
$id = GUID();
$username = $id_card;
$password = md5("1234");
$id_position = 1;

$sql = "INSERT INTO employed 
    (
        `id`,
        `username`,
        `password`,
        `id_card`,
        `name`,
        `surname`,
        `email`,
        `address`,
        `tel`,
        `id_position`
    )
     VALUES 
     (
        '" . $id . "', 
        '" . $username . "',
        '" . $password . "',
        '" . $id_card . "',
        '" . $name . "',
        '" . $surname . "', 
        '" . $email . "',
        '" . $address . "',
        '" . $tel . "',
        '" . $id_position . "'

    )";

$result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());

print_r($result);
