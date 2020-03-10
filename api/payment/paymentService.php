<meta charset="utf-8">
<?php
require_once '../condb.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents('php://input');
$postRequest = json_decode($input);

$id_order_handmade = @$postRequest->id_order_handmade;
$id_bank_employed = @$postRequest->id_bank_employed;
$reference = @$postRequest->reference;
$imageStrings = $postRequest->imageStrings;

if ($id_order_handmade) {
    $id = GUID();
    for ($i = 0; $i < count($imageStrings); ++$i) {
        $statement = array(
                $imageStrings[$i]->image,
                $imageStrings[$i]->name,
            );

        $date1 = date('Ymd_His');
        $numrand = (mt_rand());
        $type = strrchr($statement[1], '.');
        $newname = 'slip_'.$numrand.$date1.$type;
        $path = '../../images/'.$newname;

        $data = $statement[0];
        list($type, $data) = explode(';', $data);
        list(, $data) = explode(',', $data);
        $data = base64_decode($data);
        file_put_contents($path, $data);

        $sql = 'INSERT INTO order_map_slip 
        (
            `id`,
            `id_order_handmade`,
            `id_bank_employed`,
            `reference`,
            `image_slip`
        )
        VALUES 
        (
            "'.$id.'",
            "'.$id_order_handmade.'",
            "'.$id_bank_employed.'",
            "'.$reference.'",
            "'.$newname.'"

        )';

        $result = mysqli_query($condb, $sql) or die("Error in query: $sql".mysqli_error());

        $sql = "UPDATE `order_handmade` SET `status` = 'รอการตรวจสอบการชำระเงิน' WHERE id = '".$id_order_handmade."' ";
        $result = mysqli_query($condb, $sql);
    }

    $status = '200';
} else {
    $status = '404';
}

print_r(json_encode($status));
