<meta charset="utf-8">
<?php
require_once('../condb.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$username = @$postRequest->username;
$password = @$postRequest->password;
$name = @$postRequest->name;
$surname = @$postRequest->surname;
$email = @$postRequest->email;
$address = @$postRequest->address;
$tel = @$postRequest->tel;


if ($username) {

    $sql = "SELECT COUNT(id) AS chkUser  FROM customers WHERE username = '" . $username . "' ";
    $result = mysqli_query($condb, $sql);
    $row = mysqli_fetch_array($result);
    $chkUser = $row['chkUser'];

    if ($chkUser == 0) {
        $id = GUID();

        $sql = "INSERT INTO customers 
        (
            `id`,
            `username`,
            `password`,
            `name`,
            `surname`,
            `email`,
            `address`,
            `tel`
        )
         VALUES 
         (
            '" . $id . "', 
            '" . $username . "',
            '" . $password . "',
            '" . $name . "',
            '" . $surname . "', 
            '" . $email . "',
            '" . $address . "',
            '" . $tel . "'
    
        )";

        $result = mysqli_query($condb, $sql);
        $status = '200';
        print_r($status);
    } else {

        $status = '404';
        print_r($status);
    }
} else {
    $status = '500';
    print_r($status);
}
