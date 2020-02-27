<meta charset="utf-8">
<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$id = @$postRequest->id;
$order_code = @$postRequest->order_code;
$unit = @$postRequest->unit;
$color = @$postRequest->color;
$size = @$postRequest->size;
$detail = @$postRequest->detail;
$id_handmade = @$postRequest->id_handmade;
$id_customers = @$postRequest->id_customers;
$status_type = @$postRequest->status_type;


if ($status_type) {
    if (!$id) {
        $id = GUID();
        if ($status_type == 'handmadeMade') {
            $status = 'รอการยืนยันจากผู้รับจ้าง';
            $sql = "SELECT COUNT(order_code) AS COUNT_CODE FROM `order_handmade` WHERE status_type = 'handmadeMade'";
            $result = mysqli_query($condb, $sql);
            $row = mysqli_fetch_array($result);
            $COUNT_CODE = $row['COUNT_CODE'] + 1;
            $order_code  = sprintf("D42%04d", $COUNT_CODE);
        } else {
            $status = 'รอการชำระเงิน';
            $sql = "SELECT COUNT(order_code) AS COUNT_CODE FROM `order_handmade` WHERE status_type = 'handmade'";
            $result = mysqli_query($condb, $sql);
            $row = mysqli_fetch_array($result);
            $COUNT_CODE = $row['COUNT_CODE'] + 1;
            $order_code  = sprintf("D41%04d", $COUNT_CODE);
        }
        $sql = "INSERT INTO order_handmade 
    (
        `id`,
        `order_code`,
        `id_handmade`,
        `id_customers`,
        `unit`,
        `color`,
        `size`,
        `detail`,
        `status`,
        `status_type`
    )
     VALUES 
     (
        '" . $id . "',
        '" . $order_code . "',
        '" . $id_handmade . "',
        '" . $id_customers . "',
        '" . $unit . "',
        '" . $color . "',
        '" . $size . "',
        '" . $detail . "',
        '" . $status . "',
        '" . $status_type . "'
    )";

        $result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());
    } else {

        $sql = "UPDATE `handmade` SET
            
        `name` = '" . $name . "',
        `price` = '" . $price . "',
        `type_id` = '" . $type_id . "',
        `color` = '" . $color . "',
        `size` = '" . $size . "'

        WHERE id = '" . $id . "' ";
        $result = mysqli_query($condb, $sql);
    }

    $status = '200';
} else {
    $status = '404';
}


print_r(json_encode($status));
