<?php
session_start();
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$username = $postRequest->username;
$password = $condb->real_escape_string($postRequest->password);

$sql = "SELECT 
e.id,
e.username,
e.name,
e.surname,
e.id_card,
e.id_position, 
p.position
FROM employed AS e 
INNER JOIN position AS p ON p.id = e.id_position 
WHERE username = '" . $username . "' AND password = '" . $password . "' ";
$result = $condb->query($sql);

if (mysqli_num_rows($result) == 1) {
    $row = mysqli_fetch_array($result);
    $response['id'] = $row["id"];
    $response['username'] = $row["username"];
    $response['nameTH'] = $row["name"] . " " . $row["surname"];
    $response['id_card'] = $row["id_card"];
    $response['id_position'] = $row["id_position"];
    $response['position'] = $row["position"];
    $response['loginStatus'] = '200';
} else {
    $response['loginStatus'] = '404';
}

echo json_encode($response);
