<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

try {

    $query = "SELECT 
    e.ID,
    e.EMPLOYEE_CODE,
    CONCAT(e.EMPLOYEE_CODE , ' - ' , (SELECT DATA_TOPICS FROM data_topics WHERE ID = e.PREFIX_ID) ,e.NAME_TH  , ' ' ,  e.SURNAME_TH) AS Name,
    CONCAT((SELECT DATA_TOPICS FROM data_topics WHERE ID = e.PREFIX_ID) ,e.NAME_TH  , ' ' ,  e.SURNAME_TH) AS NAME_TH,
    e.PASSWORD,
    e.SURNAME_TH,
    e.DEPARTMENT,
    e.LOCATION,
    e.EMAIL,
    e.NICKNAME,
    e.IPAddress,
    e.TEL
    FROM employees AS e
    
    WHERE e.IS_USES = 'true' 
    ORDER BY e.EMPLOYEE_CODE ";
    $result = $condb->query($query) or die($condb->error);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} catch (PDOException $e) {

    echo $e->getMessage();
}
