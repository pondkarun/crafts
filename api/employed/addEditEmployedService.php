<meta charset="utf-8">
<?php
require_once('../condb.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$id = @$postRequest->id;
$name = @$postRequest->name;
$surname = @$postRequest->surname;
$id_card = @$postRequest->id_card;
$tel = @$postRequest->tel;
$email = @$postRequest->email;
$address = @$postRequest->address;
$passwordNew = @$postRequest->passwordNew;
$id_position = @$postRequest->id_position;
$username = $id_card;
$id_position = ($id_position) ? $id_position : 1;
$password = ($passwordNew) ? $passwordNew : md5("1234");
if ($id) {

    $sql = "SELECT COUNT(id) AS chkUser  FROM employed WHERE (username = '" . $username . "' OR id_card = '" . $username . "') AND id != '" . $id . "'";
    $result = mysqli_query($condb, $sql);
    $row = mysqli_fetch_array($result);
    $chkUser = $row['chkUser'];

    if ($chkUser == 0 && $id_card) {
        $STATUS = @$postRequest->STATUS;
        $sql = "UPDATE `employed` SET
        
        `username` = '" . $username . "',
        `password` = '" . $password . "',
        `id_card` = '" . $id_card . "',
        `name` = '" . $name . "',
        `surname` = '" . $surname . "',
        `email` = '" . $email . "',
        `address` = '" . $address . "',
        `id_position` = '" . $id_position . "',
        `tel` = '" . $tel . "',
        `STATUS` = '" . $STATUS . "'
    
        WHERE id = '" . $id . "'
      ";
        $result = mysqli_query($condb, $sql);
        $status = '200';
        print_r($status);
    } else {

        $status = '404';
        print_r($status);
    }
} else {

    $sql = "SELECT COUNT(id) AS chkUser  FROM employed WHERE username = '" . $username . "' OR id_card = '" . $username . "'";
    $result = mysqli_query($condb, $sql);
    $row = mysqli_fetch_array($result);
    $chkUser = $row['chkUser'];

    if ($chkUser == 0 && $id_card) {
        $id = GUID();

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

        $result = mysqli_query($condb, $sql);
        $status = '200';
        print_r($status);
    } else {

        $status = '404';
        print_r($status);
    }
}
