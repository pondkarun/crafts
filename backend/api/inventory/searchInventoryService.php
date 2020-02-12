<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);

@$INVENTORY_CODE = $postRequest->INVENTORY_CODE;
@$BRAND = $postRequest->BRAND;
@$TYPE_ID = $postRequest->TYPE_ID;
@$MODEL = $postRequest->MODEL;
@$SERIAL = $postRequest->SERIAL;
@$STATUS = $postRequest->STATUS;


$data = array();

try {

    $query = "SELECT 
    i.ID,
    i.INVENTORY_CODE,
    i.BRAND,
    d.DATA_TOPICS AS TYPE,
    i.MODEL,
    i.SERIAL,
    i.PurchaseDate,
    i.DisposedDate,
    i.STATUS
    FROM inventory AS i
    INNER JOIN data_topics AS d ON d.ID = i.TYPE_ID Where 1";
    if ($INVENTORY_CODE) {
        $query .= " AND (i.INVENTORY_CODE like '%" . $INVENTORY_CODE . "%') ";
    }
    if ($BRAND) {
        $query .= " AND (i.BRAND like '%" . $BRAND . "%') ";
    }
    if ($TYPE_ID) {
        $query .= " AND (i.TYPE_ID like '" . $TYPE_ID . "') ";
    }
    if ($MODEL) {
        $query .= " AND (i.MODEL like '%" . $MODEL . "%') ";
    }
    if ($SERIAL) {
        $query .= " AND (i.SERIAL like '%" . $SERIAL . "%') ";
    }
    if ($STATUS && $STATUS != "all") {
        $query .= " AND (i.STATUS like '" . $STATUS . "') ";
    }


    $query .= " ORDER BY i.INVENTORY_CODE ASC ";


    $result = $condb->query($query) or die($condb->error);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} catch (PDOException $e) {

    echo $e->getMessage();
}
