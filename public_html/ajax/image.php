<?php
include 'cfg.php';
$id = $_GET['id'];
$dbh = new PDO($dbn, $user, $pass);
header("Content-type: image/jpg");
foreach($dbh->query('SELECT distinct `image` from  battery_photo WHERE `battery` = '.$id) as $row) {
    echo $row['image'];
}
$dbh = null;

