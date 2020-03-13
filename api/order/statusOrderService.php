<meta charset="utf-8">
<?php
require_once '../condb.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents('php://input');
$postRequest = json_decode($input);

$id = @$postRequest->id;
$comment = @$postRequest->comment;
$status = @$postRequest->status;
$is_deposit = @$postRequest->is_deposit;

if ($id) {
    $sql = "UPDATE `order_handmade` SET
            
        `status` = '".$status."',
        `comment` = '".$comment."',
        `is_deposit` = '".$is_deposit."'

        WHERE id = '".$id."' ";
    $result = mysqli_query($condb, $sql);

    $status = '200';
} else {
    $status = '404';
}

print_r(json_encode($status));
