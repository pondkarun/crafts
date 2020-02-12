<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');


$ID_STATUS_EM = file_get_contents("php://input");

try {

    $query = "SELECT 
    MENU_ICON,
    MENU_NAME,
    ROUTEP
    FROM menu AS a
    INNER JOIN menu_map AS b ON a.ID = b.MENU_ID
    WHERE b.ID_STATUS_EM = '" . $ID_STATUS_EM . "'
    AND a.IS_USE = 'true'";
    $result = $condb->query($query) or die($condb->error);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} catch (PDOException $e) {

    echo $e->getMessage();
}
