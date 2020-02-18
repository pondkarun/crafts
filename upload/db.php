<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);
// echo "<pre>";
// print_r($postRequest);
// echo "</pre>";

$imageStrings = $postRequest->imageStrings;
// print_r($imageStrings);
// exit;
for ($i = 0; $i < count($imageStrings); $i++) {
    $date1 = date("Ymd_His");
    $numrand = (mt_rand());
    $newname = "crafts_" . $numrand . $date1 . ".jpg";
    $path = "img/" . $newname;

    $data = $imageStrings[$i];
    list($type, $data) = explode(';', $data);
    list(, $data)      = explode(',', $data);
    $data = base64_decode($data);
    file_put_contents($path, $data);
}
