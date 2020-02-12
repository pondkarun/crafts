<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');


$ID = file_get_contents("php://input");

try {

    $sql = "SELECT 
     INVENTORY_CODE,
     TYPE_ID,
     BRAND,
     MODEL,
     SERIAL,
     PurchaseDate,
     DisposedDate,
     STATUS
    FROM inventory 
    
    WHERE ID = '" . $ID . "'";
    $result = $condb->query($sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_array($result);
        $response['INVENTORY_CODE'] = $row["INVENTORY_CODE"];
        $response['TYPE_ID'] = $row["TYPE_ID"];
        $response['BRAND'] = $row["BRAND"];
        $response['MODEL'] = $row["MODEL"];
        $response['SERIAL'] = $row["SERIAL"];;
        $response['PurchaseDate'] = $row["PurchaseDate"];
        $response['DisposedDate'] = $row["DisposedDate"];
        $response['STATUS'] = $row["STATUS"];
        $response['status'] = '200';
    } else {
        $response['status'] = '404';
    }

    echo json_encode($response);
} catch (PDOException $e) {

    echo $e->getMessage();
}
