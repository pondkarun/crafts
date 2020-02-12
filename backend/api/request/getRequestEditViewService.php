<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');


$ID = file_get_contents("php://input");
$START_DATE = date("Y-m-d");
try {

    $sql3 = "SELECT STATUS_READ  FROM `services` WHERE ID = '" . $ID . "' ";
    $result3 = mysqli_query($condb, $sql3);
    $row = mysqli_fetch_array($result3);
    if ($row['STATUS_READ'] == 'false') {

        $sql2 = "UPDATE `services` SET  `STATUS_READ` = 'true' , START_DATE = '" . $START_DATE . "'  WHERE ID = '" . $ID . "' ";
        $result = mysqli_query($condb, $sql2) or die("Error in query: $sql2" . mysqli_error());
    }

    $sql = "SELECT 
    s.ID,
    s.SERVICES_CODE,
    s.CreateDate,
    p.TYPE_ID,
    CONCAT(p.PERIPETEIA , ' ' ,  s.DETAIL) AS DETAIL,
    s.REMARK,
    s.STATUS,
    s.ANALYZE,
    s.MANAGER_STATUS,
    s.MANAGER_REMARK,
    s.PERIPETEIA_ID
    FROM services AS s 
    INNER JOIN peripeteias AS p ON s.PERIPETEIA_ID = p.ID
    INNER JOIN data_topics AS d ON p.TYPE_ID = d.ID
    
    WHERE s.ID = '" . $ID . "'";
    $result = $condb->query($sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_array($result);
        $response['ID'] = $row["ID"];
        $response['SERVICES_CODE'] = $row["SERVICES_CODE"];
        $response['CreateDate'] = $row["CreateDate"];
        $response['TYPE_ID'] = $row["TYPE_ID"];
        $response['DETAIL'] = $row["DETAIL"];
        $response['REMARK'] = $row["REMARK"];
        $response['STATUS'] = $row["STATUS"];
        $response['ANALYZE'] = $row["ANALYZE"];
        $response['MANAGER_STATUS'] = $row["MANAGER_STATUS"];
        $response['MANAGER_REMARK'] = $row["MANAGER_REMARK"];
        $response['status'] = '200';
    } else {
        $response['status'] = '404';
    }

    echo json_encode($response);
} catch (PDOException $e) {

    echo $e->getMessage();
}
