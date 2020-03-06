<?php

require_once '../condb.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$ID = file_get_contents('php://input');

try {
    $sql = "SELECT 
     h.id,
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
    INNER JOIN type AS t ON h.type_id = t.id
    INNER JOIN employed AS e ON h.employed_id = e.id
    WHERE h.ID = '".$ID."'";
    $result = $condb->query($sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_array($result);
        $response['id'] = $row['id'];
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
