<?php

require_once '../condb.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$ID = file_get_contents('php://input');

try {
    $sql = "SELECT 
     id,
     password,
     name,
     surname,
     email,
     address,
     tel
    FROM customers 
    
    WHERE ID = '".$ID."'";
    $result = $condb->query($sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_array($result);
        $response['id'] = $row['id'];
        $response['password'] = $row['password'];
        $response['name'] = $row['name'];
        $response['surname'] = $row['surname'];
        $response['email'] = $row['email'];
        $response['address'] = $row['address'];
        $response['tel'] = $row['tel'];
        $response['status'] = '200';
    } else {
        $response['status'] = '404';
    }

    echo json_encode($response);
} catch (PDOException $e) {
    echo $e->getMessage();
}
