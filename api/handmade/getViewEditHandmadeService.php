<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');


$ID = file_get_contents("php://input");

try {

    $sql = "SELECT 
     id,
     code_handmade,
     name,
     price,
     color,
     size,
     type_id,
     is_use
    FROM handmade 
    
    WHERE ID = '" . $ID . "'";
    $result = $condb->query($sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_array($result);
        $response['id'] = $row["id"];
        $response['code_handmade'] = $row["code_handmade"];
        $response['name'] = $row["name"];
        $response['price'] = $row["price"];
        $response['type_id'] = $row["type_id"];
        $response['color'] = $row["color"];
        $response['size'] = $row["size"];
        $response['is_use'] = $row["is_use"];;
        $response['status'] = '200';
    } else {
        $response['status'] = '404';
    }

    echo json_encode($response);
} catch (PDOException $e) {

    echo $e->getMessage();
}
