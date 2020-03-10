<?php

require_once '../condb.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$ID = file_get_contents('php://input');

try {
    $sql = "SELECT 
     o.id,
     o.id_handmade AS id_handmade_o,
    o.id_customers AS id_customers_o,
    o.unit AS unit_o,
    o.color AS color_o,
    o.size AS size_o,
    o.detail AS detail_o,
    o.status AS status_o,
    o.status_type AS status_type_o,
    o.comment AS comment_o, 
     h.code_handmade,
     h.name,
     h.price,
     h.color,
     h.size,
     h.type_id,
     h.is_use,
     t.type,
     CONCAT(e.name  , ' ' ,  e.surname) AS employed_name
    FROM handmade AS h
    INNER JOIN order_handmade AS o ON o.id_handmade = h.id
    INNER JOIN type AS t ON h.type_id = t.id
    INNER JOIN employed AS e ON h.employed_id = e.id
    WHERE o.ID = '".$ID."'";
    $result = $condb->query($sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_array($result);
        $response['id'] = $row['id'];
        $response['id_handmade_o'] = $row['id_handmade_o'];
        $response['id_customers_o'] = $row['id_customers_o'];
        $response['unit_o'] = $row['unit_o'];
        $response['color_o'] = $row['color_o'];
        $response['size_o'] = $row['size_o'];
        $response['detail_o'] = $row['detail_o'];
        $response['status_o'] = $row['status_o'];
        $response['status_type_o'] = $row['status_type_o'];
        $response['comment_o'] = $row['comment_o'];
        $response['code_handmade'] = $row['code_handmade'];
        $response['name'] = $row['name'];
        $response['price'] = $row['price'];
        $response['type'] = $row['type'];
        $response['type_id'] = $row['type_id'];
        $response['color'] = $row['color'];
        $response['size'] = $row['size'];
        $response['employed_name'] = $row['employed_name'];
        $response['is_use'] = $row['is_use'];
        $response['status'] = '200';
    } else {
        $response['status'] = '404';
    }

    echo json_encode($response);
} catch (PDOException $e) {
    echo $e->getMessage();
}
