<meta charset="utf-8">
<?php
require_once '../condb.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents('php://input');
$postRequest = json_decode($input);

$id = @$postRequest->id;
$id_bank = @$postRequest->id_bank;
$name_bank = @$postRequest->name_bank;
$number = @$postRequest->number;
$id_employed = @$postRequest->id_employed;

if ($id) {
    $sql = "UPDATE `bank_employed` SET
        
        `id_employed` = '".$id_employed."',
        `id_bank` = '".$id_bank."',
        `name_bank` = '".$name_bank."',
        `number` = '".$number."'

        WHERE id = '".$id."'
      ";

    $result = mysqli_query($condb, $sql);
    $status = '200';
    print_r($status);
} else {
    $id = GUID();
    $sql = "INSERT INTO bank_employed 
        (
            `id`,
            `id_employed`,
            `id_bank`,
            `name_bank`,
            `number`

        )
         VALUES 
         (
            '".$id."', 
            '".$id_employed."',
            '".$id_bank."',
            '".$name_bank."',
            '".$number."' 
        )";

    $result = mysqli_query($condb, $sql);
    $status = '200';
    print_r($status);
}
