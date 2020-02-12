<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);

@$SERVICES_CODE = $postRequest->SERVICES_CODE;
@$USER_ID = $postRequest->USER_ID;
@$NAME_TH = $postRequest->NAME_TH;
@$STATUS = $postRequest->STATUS;
@$STATUS_ID_USER = $postRequest->STATUS_ID_USER;
@$MANAGER_ID = $postRequest->MANAGER_ID;


$data = array();

try {


    $query = "SELECT 
    s.ID,
    s.SERVICES_CODE,
    CONCAT((SELECT DATA_TOPICS FROM data_topics WHERE ID = e.PREFIX_ID) ,e.NAME_TH  , ' ' ,  e.SURNAME_TH) AS NAME_TH,
    e.DEPARTMENT,
    e.EMAIL,
    s.CreateDate,
    s.STATUS,
    (SELECT DATA_TOPICS FROM data_topics WHERE ID = s.LOCATION_ID) AS LOCATION
    FROM services AS s 
    INNER JOIN employees AS e ON s.USER_ID = e.ID
    INNER JOIN peripeteias AS p ON s.PERIPETEIA_ID = p.ID
    LEFT JOIN data_topics AS d ON e.PREFIX_ID = d.ID
    WHERE 1 ";
    if ($SERVICES_CODE) {
        $query .= " AND (s.SERVICES_CODE like '%" . $SERVICES_CODE . "%') ";
    }
    if ($NAME_TH) {
        $query .= " AND (CONCAT(d.DATA_TOPICS , e.NAME_TH , ' ' , e.SURNAME_TH) LIKE  '%" . $NAME_TH . "%') ";
    }
    if ($STATUS && $STATUS != "all") {
        $query .= " AND (s.STATUS like '" . $STATUS . "') ";
    }

    if ($STATUS_ID_USER == 'DF4EA7139B204A0D81EF06EADB40FA05' && $STATUS == "แก้ไขเรียบร้อย") {
        $query .= " AND (s.MANAGER_ID = '" . $MANAGER_ID . "') ";
    }

    $query .= " ORDER BY s.SERVICES_CODE ASC ";


    $result = $condb->query($query) or die($condb->error);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} catch (PDOException $e) {

    echo $e->getMessage();
}
