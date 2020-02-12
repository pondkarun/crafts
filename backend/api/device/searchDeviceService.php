<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);

@$INVENTORY_CODE = $postRequest->INVENTORY_CODE;
@$Name = $postRequest->Name;
@$TYPE_ID = $postRequest->TYPE_ID;
@$EMPLOYEE_CODE = $postRequest->EMPLOYEE_CODE;
@$STATUS = $postRequest->STATUS;



$data = array();

try {


    $query = "SELECT 
    eq.ID,
    i.INVENTORY_CODE,
    i.TYPE_ID,
    (SELECT data_topics FROM data_topics WHERE ID = i.TYPE_ID) AS TYPE,
    CONCAT((SELECT DATA_TOPICS FROM data_topics WHERE ID = e.PREFIX_ID) ,e.NAME_TH  , ' ' ,  e.SURNAME_TH) AS Name,
    e.DEPARTMENT,
    e.EMPLOYEE_CODE,
    eq.CREATE_DATE,
    eq.STATUS
    FROM equipments AS eq 
    INNER JOIN employees AS e ON eq.USER_ID = e.ID
    INNER JOIN inventory AS i ON eq.INVENTORY_ID = i.ID 
    LEFT JOIN data_topics AS d ON e.PREFIX_ID = d.ID
    Where 1";
    if ($INVENTORY_CODE) {
        $query .= " AND (i.INVENTORY_CODE like '%" . $INVENTORY_CODE . "%') ";
    }
    if ($Name) {
        $query .= " AND (CONCAT(d.DATA_TOPICS , e.NAME_TH , ' ' , e.SURNAME_TH) LIKE  '%" . $Name . "%') ";
    }
    if ($EMPLOYEE_CODE) {
        $query .= " AND (e.EMPLOYEE_CODE like '%" . $EMPLOYEE_CODE . "%') ";
    }
    if ($TYPE_ID) {
        $query .= " AND (i.TYPE_ID like '" . $TYPE_ID . "') ";
    }
    if ($STATUS && $STATUS != "all") {
        $query .= " AND (eq.STATUS like '" . $STATUS . "') ";
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
