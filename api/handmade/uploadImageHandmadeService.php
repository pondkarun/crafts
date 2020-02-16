<?php
require_once('../condb.php');

$id_handmade = $_POST['formdata'];
foreach ($_FILES['file']['name'] as $key => $val) {

    $date1 = date("Ymd_His");
    $numrand = (mt_rand());
    $path = "../../images/";
    $type = strrchr($_FILES['file']['name'][$key], ".");
    $newname = "crafts_" . $numrand . $date1 . $type;
    $path_copy = $path . $newname;
    $path_link = "../../images/" . $newname;
    move_uploaded_file($_FILES['file']['tmp_name'][$key], $path_copy);

    $sql = 'INSERT INTO handmade_image 
    (
        `id_handmade`,
        `image`
    )
     VALUES 
     (
        ' . $id_handmade . ',
        "' . $newname . '"
    )';

    $result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());
}

$status = '200';
print_r(json_encode($status));
