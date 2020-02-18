<?php
// echo "<pre>";
// print_r($postRequest);
// echo "</pre>";
// exit;
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$imageStrings = $postRequest->imageStrings;


for ($i = 0; $i < count($imageStrings); $i++) {

    $statement = array(
        $imageStrings[$i]->uri,
        $imageStrings[$i]->name,
    );

    $date1 = date("Ymd_His");
    $numrand = (mt_rand());
    $type = strrchr($statement[1], ".");
    $newname = "crafts_" . $numrand . $date1 . $type;
    $path = "img/" . $newname;

    $data = $statement[0];
    list($type, $data) = explode(';', $data);
    list(, $data)      = explode(',', $data);
    $data = base64_decode($data);
    file_put_contents($path, $data);
}
