<meta charset="utf-8">
<?php
require_once '../condb.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$ID = file_get_contents('php://input');

if ($ID) {
    $sql = "UPDATE `order_handmade` SET `status` = 'ยกเลิก'  WHERE id = '".$ID."' ";
    $result = mysqli_query($condb, $sql);
}
