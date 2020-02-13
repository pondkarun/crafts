<?php
require_once('condb.php');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');


$ID = file_get_contents("php://input");
$data = array();
try {

    $query = "SELECT

     *
    
    FROM demo 
    WHERE ID = '" . $ID . "' ";

    $result = $condb->query($query) or die($condb->error);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} catch (PDOException $e) {

    echo $e->getMessage();
}
