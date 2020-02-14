<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');


$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$ID_STATUS_EM = $postRequest->ID_STATUS_EM;
$ROUTEP = $postRequest->ROUTEP;

try {

    $query = "  SELECT COUNT(m.ID) AS COUNT_ID FROM menu AS m 
    INNER JOIN menu_map AS mm ON m.ID = mm.MENU_ID
    WHERE m.ROUTEP = '" . $ROUTEP . "'
    AND mm.id_position = '" . $ID_STATUS_EM . "'
    AND m.IS_USE = 'true' ";
    $result = $condb->query($query) or die($condb->error);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_array($result);
        $response['COUNT_ID'] = $row["COUNT_ID"];
        $response['status'] = '200';
    } else {
        $response['status'] = '404';
    }

    echo json_encode($response);
} catch (PDOException $e) {

    echo $e->getMessage();
}
