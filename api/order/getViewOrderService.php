<?php

require_once '../condb.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$ID = file_get_contents('php://input');

try {
    $sql = "SELECT 
    oh.id,
    h.name AS name_handmade,
    h.price AS price_handmade,
    h.employed_id,
    oh.unit,
    oh.color,
    oh.size,
    oh.detail,
    oh.status,
    oh.is_deposit,
    oh.status_type,
    oms.reference,
    CONCAT(c.name , ' ', c.surname) AS nameTH,
    c.tel,
    c.address,
    (SELECT bm.id FROM bank_employed  AS bm WHERE bm.id = oms.id_bank_employed ) AS id_bank

    FROM order_handmade AS oh 
    INNER JOIN handmade AS h ON oh.id_handmade = h.id
    LEFT JOIN order_map_slip AS oms ON oh.id = oms.id_order_handmade
    INNER JOIN customers AS c ON c.id = oh.id_customers
    WHERE oh.id = '".$ID."'";
    $result = $condb->query($sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_array($result);
        $response['id'] = $row['id'];
        $response['name_handmade'] = $row['name_handmade'];
        $response['price_handmade'] = $row['price_handmade'];
        $response['employed_id'] = $row['employed_id'];
        $response['unit'] = $row['unit'];
        $response['color'] = $row['color'];
        $response['size'] = $row['size'];
        $response['detail'] = $row['detail'];
        $response['status'] = $row['status'];
        $response['status_type'] = $row['status_type'];
        $response['is_deposit'] = $row['is_deposit'];
        $response['reference'] = $row['reference'];
        $response['nameTH'] = $row['nameTH'];
        $response['tel'] = $row['tel'];
        $response['address'] = $row['address'];
        $response['id_bank'] = $row['id_bank'];
    } else {
        $response['status'] = '404';
    }
    echo json_encode($response);
} catch (PDOException $e) {
    echo $e->getMessage();
}
