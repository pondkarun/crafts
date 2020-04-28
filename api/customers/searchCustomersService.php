<?php

require_once '../condb.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);

@$Name = $postRequest->Name;
@$status = $postRequest->status;
$status = ($status) ? $status : "ปกติ";
$data = array();
try {
    $query = "SELECT * , CONCAT(name , ' ' , surname) AS nameTH  FROM customers WHERE 1 ";


    if ($Name)
        $query .= " AND (CONCAT(name , ' ' , surname) LIKE  '%" . $Name . "%') ";


    if ($status && $status != "all")
        $query .= " AND status = '" . $status . "' ";

    $query .= " ORDER BY name ASC ";

    $result = $condb->query($query) or die($condb->error);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} catch (PDOException $e) {
    echo $e->getMessage();
}
