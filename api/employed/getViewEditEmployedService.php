<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');


$ID = file_get_contents("php://input");

try {

    $sql = "SELECT 
     id,
     id_card,
     name,
     surname,
     email,
     address,
     tel,
     id_position,
     status
    FROM employed 
    
    WHERE ID = '" . $ID . "'";
    $result = $condb->query($sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_array($result);
        $response['id'] = $row["id"];
        $response['id_card'] = $row["id_card"];
        $response['name'] = $row["name"];
        $response['surname'] = $row["surname"];
        $response['email'] = $row["email"];
        $response['address'] = $row["address"];;
        $response['tel'] = $row["tel"];
        $response['STATUS'] = $row["status"];
        $response['status'] = '200';
    } else {
        $response['status'] = '404';
    }

    echo json_encode($response);
} catch (PDOException $e) {

    echo $e->getMessage();
}
