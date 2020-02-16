<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);

@$code_handmade = $postRequest->id_card;
@$Name = $postRequest->Name;
@$status = $postRequest->status;

$data = array();

try {


    $query = "SELECT 
    h.id,
    h.code_handmade,
    h.name,
    h.price,
    t.type,
    h.is_use

    FROM handmade AS h
    INNER JOIN type AS t ON t.id = h.type_id 
    WHERE  1";
    if ($code_handmade) {
        $query .= " AND (h.code_handmade like '%" . $code_handmade . "%') ";
    }
    if ($Name) {
        $query .= " AND (CONCAT(e.name , ' ' , e.surname) LIKE  '%" . $Name . "%') ";
    }
    if ($status && $status != "all") {
        $query .= " AND (e.status like '" . $status . "') ";
    }

    $query .= " ORDER BY h.code_handmade ASC ";


    $result = $condb->query($query) or die($condb->error);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} catch (PDOException $e) {

    echo $e->getMessage();
}
