<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');


$id_handmade = file_get_contents("php://input");
$data = array();
try {
    $query = "SELECT * FROM handmade_image WHERE id_handmade = '" . $id_handmade . "' ";
    $result = $condb->query($query) or die($condb->error);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} catch (PDOException $e) {

    echo $e->getMessage();
}
