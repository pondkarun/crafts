
<?php
require_once '../condb.php';
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

$input = file_get_contents('php://input');
$postRequest = json_decode($input);

@$code_handmade = $postRequest->code_handmade;
@$order_code = $postRequest->order_code;
@$name = $postRequest->name;
@$type_id = $postRequest->type_id;
@$price1 = $postRequest->price1;
@$price2 = $postRequest->price2;
@$employed_id = $postRequest->employed_id;
@$id_customers = $postRequest->id_customers;
@$is_use = $postRequest->is_use;
@$status = $postRequest->status;
@$status_type = $postRequest->status_type;

$data = array();

try {
    $query = "SELECT 
	o.id,
    o.order_code,
    o.id_handmade,
    h.name,
    h.price,
    t.type,
    h.is_use,
    h.datetime,
    o.unit,
    o.status_type,
    h.employed_id,
    o.status,
    o.is_deposit,
    CONCAT(e.name  , ' ' ,  e.surname) AS NameTH,
    (SELECT image FROM handmade_image WHERE id_handmade = h.id LIMIT 1) AS path
    FROM order_handmade AS o
    INNER JOIN handmade AS h ON o.id_handmade = h.id
    INNER JOIN employed AS e ON h.employed_id = e.id
    INNER JOIN type AS t ON t.id = h.type_id 
    WHERE 1";

    if ($name) {
        $query .= " AND (h.name LIKE  '%".$name."%') ";
    }
    if ($type_id && $type_id != 'all') {
        $query .= " AND (h.type_id LIKE  '%".$type_id."%') ";
    }

    if ($price1 && $price2) {
        $query .= " AND (h.price BETWEEN '".$price1."' AND  '".$price2."') ";
    } elseif ($price1) {
        $query .= " AND (h.price LIKE  '%".$price1."%') ";
    }

    if ($is_use && $is_use != 'all') {
        $query .= " AND (h.is_use LIKE '".$is_use."') ";
    }

    if ($employed_id) {
        $query .= " AND (h.employed_id LIKE '".$employed_id."') ";
    }

    if ($id_customers) {
        $query .= " AND (o.id_customers  LIKE '".$id_customers."') ";
    }

    if ($status && $status != 'all') {
        $query .= " AND (o.status  LIKE '".$status."') ";
    }

    if ($status_type) {
        $query .= " AND (o.status_type  LIKE '".$status_type."') ";
    }

    if ($order_code) {
        $query .= " AND (o.order_code  LIKE '%".$order_code."%') ";
    }

    $query .= '  ORDER BY o.datetime DESC ';

    $result = $condb->query($query) or die($condb->error);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} catch (PDOException $e) {
    echo $e->getMessage();
}
