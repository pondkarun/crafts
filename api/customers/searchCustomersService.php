<?php

require_once '../condb.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$data = array();
try {
    $query = "SELECT * , CONCAT(name , ' ' , surname) AS nameTH  FROM customers WHERE status = 'ปกติ' ";
    $result = $condb->query($query) or die($condb->error);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} catch (PDOException $e) {
    echo $e->getMessage();
}
