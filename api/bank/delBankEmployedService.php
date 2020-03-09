<meta charset="utf-8">
<?php
require_once '../condb.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$id = file_get_contents('php://input');

if ($id) {
    $sql = "DELETE FROM bank_employed WHERE id = '".$id."' ";
    $result = mysqli_query($condb, $sql);
    $status = '200';
    print_r($status);
}
