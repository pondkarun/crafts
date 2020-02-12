<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

try {

    $query = "SELECT 
    i.ID,
    CONCAT(i.INVENTORY_CODE , ' - ' , i.BRAND , ' ' , i.MODEL , '' , i.SERIAL) AS Name,
    d.DATA_TOPICS AS TYPE,
    i.INVENTORY_CODE,
    i.TYPE_ID,
    i.BRAND,
    i.MODEL,
    i.SERIAL,
    i.PurchaseDate,
    i.DisposedDate,
    i.STATUS,
    i.CREATE_DATE
    FROM inventory AS i
    LEFT JOIN equipments AS e ON e.INVENTORY_ID = i.ID
    LEFT JOIN data_topics AS d ON d.ID = i.TYPE_ID
    WHERE i.STATUS = 'ใช้งาน'
    AND (e.STATUS IS  NULL OR e.STATUS != 'ใช้งาน' )
    GROUP BY i.ID
    ORDER BY i.INVENTORY_CODE 
   ";


    $result = $condb->query($query) or die($condb->error);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} catch (PDOException $e) {

    echo $e->getMessage();
}
