<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$id = @$postRequest->id;
$name = @$postRequest->name;
$price = @$postRequest->price;
$type_id = @$postRequest->type_id;
$employed_id = @$postRequest->employed_id;

$color = @$postRequest->color;
$color = json_encode($color, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

$size = @$postRequest->size;
$size = json_encode($size, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

$imageStrings = $postRequest->imageStrings;

$imageStringsDel = $postRequest->imageStringsDel;
// echo "<pre>";
// print_r($imageStringsDel);
// echo "</pre>";
// exit;

if ($name) {
    if (!$id) {


        $sql = "SELECT COUNT(code_handmade) AS COUNT_CODE FROM `handmade`";
        $result = mysqli_query($condb, $sql);
        $row = mysqli_fetch_array($result);
        $COUNT_CODE = $row['COUNT_CODE'] + 1;

        $code_handmade = sprintf("HM1%04d", $COUNT_CODE);
        $id = GUID();



        $sql = "INSERT INTO handmade 
    (
        `id`,
        `code_handmade`,
        `name`,
        `price`,
        `type_id`,
        `color`,
        `size`,
        `employed_id`
    )
     VALUES 
     (
        '" . $id . "',
        '" . $code_handmade . "',
        '" . $name . "',
        '" . $price . "',
        '" . $type_id . "',
        '" . $color . "',
        '" . $size . "',
        '" . $employed_id . "'
    )";

        $result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());


        for ($i = 0; $i < count($imageStrings); $i++) {

            $statement = array(
                $imageStrings[$i]->image,
                $imageStrings[$i]->name
            );

            $date1 = date("Ymd_His");
            $numrand = (mt_rand());
            $type = strrchr($statement[1], ".");
            $newname = "crafts_" . $numrand . $date1 . $type;
            $path = "../../images/" . $newname;

            $data = $statement[0];
            list($type, $data) = explode(';', $data);
            list(, $data)      = explode(',', $data);
            $data = base64_decode($data);
            file_put_contents($path, $data);


            $sql = 'INSERT INTO handmade_image 
        (
            `id_handmade`,
            `image`
        )
        VALUES 
        (
            "' . $id . '",
            "' . $newname . '"

        )';

            $result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());
        }
    } else {

        $sql = "UPDATE `handmade` SET
            
        `name` = '" . $name . "',
        `price` = '" . $price . "',
        `type_id` = '" . $type_id . "',
        `color` = '" . $color . "',
        `size` = '" . $size . "'

        WHERE id = '" . $id . "' ";
        $result = mysqli_query($condb, $sql);


        for ($i = 0; $i < count($imageStrings); $i++) {

            $statement = array(
                @$imageStrings[$i]->image,
                @$imageStrings[$i]->name,
                @$imageStrings[$i]->id
            );

            if (!$statement[2]) {
                $date1 = date("Ymd_His");
                $numrand = (mt_rand());
                $type = strrchr($statement[1], ".");
                $newname = "crafts_" . $numrand . $date1 . $type;
                $path = "../../images/" . $newname;

                $data = $statement[0];
                list($type, $data) = explode(';', $data);
                list(, $data)      = explode(',', $data);
                $data = base64_decode($data);
                file_put_contents($path, $data);


                $sql = 'INSERT INTO handmade_image 
            (
                `id_handmade`,
                `image`
            )
            VALUES 
            (
                "' . $id . '",
                "' . $newname . '"

            )';

                $result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());
            }
        }

        for ($i = 0; $i < count($imageStringsDel); $i++) {

            $statement = array(
                $imageStringsDel[$i]->id
            );

            $sql = 'DELETE FROM `handmade_image` WHERE id =  "' . $statement[0] . '"';

            $result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());
        }
    }



    $status = '200';
} else {
    $status = '404';
}


print_r(json_encode($status));
