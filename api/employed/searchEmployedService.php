
<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);

@$id_card = $postRequest->id_card;
@$Name = $postRequest->Name;
@$status = $postRequest->status;
@$id_position = $postRequest->id_position;

$data = array();

try {


    $query = "SELECT 
    e.id,
    e.id_card,
    CONCAT(e.name  , ' ' ,  e.surname) AS NameTH,
    e.email,
    e.tel,
    e.id_position,
    p.position AS status
    FROM employed AS e
    INNER JOIN position AS p ON e.id_position = p.id
    WHERE 1";
    if ($id_card) {
        $query .= " AND (e.id_card like '%" . $id_card . "%') ";
    }
    if ($Name) {
        $query .= " AND (CONCAT(e.name , ' ' , e.surname) LIKE  '%" . $Name . "%') ";
    }
    if ($status && $status != "all") {
        $query .= " AND (e.status like '" . $status . "') ";
    }

    if ($id_position && $id_position != "all") {
        $query .= " AND e.id_position = '" . $id_position . "' ";
        
    }else if(!$id_position){
        $query .= " AND e.id_position = '1' ";
    }

    $query .= " ORDER BY e.name ASC ";


    $result = $condb->query($query) or die($condb->error);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} catch (PDOException $e) {

    echo $e->getMessage();
}
