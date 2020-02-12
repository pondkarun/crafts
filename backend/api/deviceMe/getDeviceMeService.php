<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');


$USER_ID = file_get_contents("php://input");
$data = array();
try {

    $query = "SELECT

    i.TYPE_ID,
    i.INVENTORY_CODE,
    d.DATA_TOPICS,
    i.BRAND,
    i.MODEL,
    i.SERIAL,
    i.PurchaseDate
    
    FROM equipments AS eq
    INNER JOIN inventory AS i ON eq.INVENTORY_ID = i.ID
    INNER JOIN data_topics AS d ON i.TYPE_ID = d.ID
    WHERE eq.USER_ID = '" . $USER_ID . "'
    AND eq.STATUS = 'ใช้งาน'";

    $result = $condb->query($query) or die($condb->error);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} catch (PDOException $e) {

    echo $e->getMessage();
}
