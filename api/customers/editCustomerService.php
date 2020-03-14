<meta charset="utf-8">
<?php
require_once '../condb.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents('php://input');
$postRequest = json_decode($input);

$id = @$postRequest->id;
$name = @$postRequest->name;
$surname = @$postRequest->surname;
$tel = @$postRequest->tel;
$email = @$postRequest->email;
$address = @$postRequest->address;
$password = @$postRequest->passwordNew;

if ($id) {
    echo  $sql = "UPDATE `customers` SET
        
        `password` = '".$password."',
        `name` = '".$name."',
        `surname` = '".$surname."',
        `email` = '".$email."',
        `address` = '".$address."',
        `tel` = '".$tel."'
    
        WHERE id = '".$id."'
      ";

    $result = mysqli_query($condb, $sql);
    $status = '200';
    print_r($status);
} else {
    $status = '404';
    print_r($status);
}
