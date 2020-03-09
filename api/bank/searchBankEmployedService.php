
<?php
require_once '../condb.php';
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

$input = file_get_contents('php://input');
$postRequest = json_decode($input);

@$id_employed = $postRequest->id_employed;

$data = array();

try {
    $query = 'SELECT
    bm.id,
    bm.number,
    bm.name_bank,
    bm.id_bank,
    b.bank
    FROM bank_employed AS bm
    INNER JOIN bank AS b ON bm.id_bank = b.id 
    WHERE  1';

    if ($id_employed) {
        $query .= " AND (bm.id_employed LIKE '".$id_employed."') ";
    }

    $result = $condb->query($query) or die($condb->error);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} catch (PDOException $e) {
    echo $e->getMessage();
}
