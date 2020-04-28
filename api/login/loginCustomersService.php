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
CONCAT(name , ' ' , surname) AS nameTH
FROM customers AS e 
WHERE e.username = '" . $username . "' AND e.password = '" . $password . "' AND status = 'ปกติ'";
$result = $condb->query($sql);

if (mysqli_num_rows($result) == 1) {
    $row = mysqli_fetch_array($result);
    $response['id'] = $row["id"];
    $response['nameTH'] = $row["nameTH"];
    $response['username'] = $row["username"];
    $response['loginCustomersStatus'] = '200';
} else {
    $response['loginCustomersStatus'] = '404';
}

echo json_encode($response);
