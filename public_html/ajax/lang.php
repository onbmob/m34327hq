<?php
$mas=$_POST["mru"];
$fp = fopen("../locales/ru.json", "w");
fwrite($fp, $mas);
fclose($fp);
$mas=$_POST["men"];
$fp = fopen("../locales/en.json", "w");
fwrite($fp, $mas);
fclose($fp);
$mas=$_POST["mfr"];
$fp = fopen("../locales/fr.json", "w");
fwrite($fp, $mas);
fclose($fp);
echo json_encode('OK');
exit;
