<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');


$ID = file_get_contents("php://input");

try {

    $sql = "SELECT 
    e.EMPLOYEE_CODE,
    (SELECT DATA_TOPICS FROM data_topics WHERE ID = e.PREFIX_ID) AS PREFIX,
    e.NAME_TH,
    e.PASSWORD,
    e.SURNAME_TH,
    e.DEPARTMENT,
    e.LOCATION,
    e.EMAIL,
    e.NICKNAME,
    e.IPAddress,
    e.TEL
    FROM employees AS e
    
    WHERE e.ID = '" . $ID . "'";
    $result = $condb->query($sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_array($result);
        $response['EMPLOYEE_CODE'] = $row["EMPLOYEE_CODE"];
        $response['PASSWORD_OLD'] = $row["PASSWORD"];
        $response['NAME'] = $row["PREFIX"] . $row["NAME_TH"] . " " . $row["SURNAME_TH"];
        $response['DEPARTMENT'] = $row["DEPARTMENT"];
        $response['LOCATION'] = $row["LOCATION"];
        $response['EMAIL'] = $row["EMAIL"];;
        $response['NICKNAME'] = $row["NICKNAME"];
        $response['IPAddress'] = $row["IPAddress"];
        $response['TEL'] = $row["TEL"];
        $response['status'] = '200';
    } else {
        $response['status'] = '404';
    }

    echo json_encode($response);
} catch (PDOException $e) {

    echo $e->getMessage();
}
