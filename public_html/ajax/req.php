<?php
include 'cfg.php';
$sost = $_GET['sost'];
$result['sost'] = $sost;
$opt = array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
);
$dbh = new PDO($dbn, $user, $pass, $opt);

switch ($sost) {
    case 0:
        foreach ($dbh->query('SELECT  * FROM cars_brand') as $row) {
            $result['data'][] = $row;
        }
        break;

    case 1:
        $year = $_GET['year'];
        $mark = $_GET['id'];

        foreach ($dbh->query("select c.id, c.name, c.start_date, DATE_FORMAT(c.start_date,'%Y') as start_year,
                                if (ISNULL(c.end_date), DATE_FORMAT(NOW(),'%Y') ,DATE_FORMAT(c.end_date,'%Y')) as end_date
                                from cars_models as c
                                where c.brand = $mark
                                and DATE_FORMAT(c.start_date,'%Y') <= $year
                                and $year <=  (if ( ISNULL(c.end_date), DATE_FORMAT(NOW(),'%Y') ,DATE_FORMAT(c.end_date,'%Y')))
                                group by c.name
                                order by c.name") as $row) {
            $result['data'][] = $row;
        }
        break;

    case 2:
        foreach ($dbh->query('SELECT  * FROM cars_modification WHERE model = ' . $_GET['id']) as $row) {
            $result['data'][] = $row;
        }
        break;

    case 3:
        $page = $_GET['page'];
        foreach ($dbh->query('SELECT distinct * FROM cars_modification  WHERE id = ' . $_GET['id']) as $row) {
            $modif = $row;
        }
//        if ($checkprice == 0)
        $checkpricestr = " INNER ";
//        else  $checkpricestr = " left ";

        $polarstr = " AND ( b.polar='$modif[polar_location]') ";

        if ($modif[length_min] == 0) $minLengthstr = "";
        else $minLengthstr = " AND (`b`.`length`>='$modif[length_min]')";

        if ($modif[length_max] == 0) $maxLengthstr = "";
        else $maxLengthstr = " AND (`b`.`length`<='$modif[length_max]')";

        if ($modif[width_min] == 0) $minWidthstr = "";
        else $minWidthstr = " AND (`b`.`width` >='$modif[width_min]')";

        if ($modif[width_max] == 0) $maxWidthstr = "";
        else $maxWidthstr = " AND (`b`.`width` <='$modif[width_max]')";

        if ($modif[heigth_min] == 0) $minHeightstr = "";
        else $minHeightstr = " AND (`b`.`height`>='$modif[heigth_min]')";

        if ($modif[heigth_max] == 0) $maxHeightstr = "";
        else $maxHeightstr = " AND (`b`.`height`<='$modif[heigth_max]')";

        if ($modif[voltage_min] == null) $minVoltagestr = "";
        else $minVoltagestr = " AND (`bv`.`voltage`>='$modif[voltage_min]')";

        if ($modif[voltage_max] == null) $maxVoltagestr = "";
        else $maxVoltagestr = " AND (`bv`.`voltage`<='$modif[voltage_max]')";

        $terminalstr = "";
        $modif[terminal_type_new] = trim($modif[terminal_type_new], '.');
        $array = explode('.', $modif[terminal_type_new]);
        $array = explode('/', $array[0]);   // !!! только одно первое значение без точек и косых

//        if (count($array) > 0) {
//            $terminals = $this->_getrow("SELECT id from battery_terminals WHERE `name` = '$array[0]' ");
//            if ($terminals[id] != null) $terminalstr = "  AND (`b`.`terminal` = '$terminals[id]')";
//        }

//        if ($modif[cold_cranking_amps_min] == 0) $minCurrentstr = "";
//        else $minCurrentstr = " AND (`b`.`cold_cranking_amperage`>='$modif[cold_cranking_amps_min]')";
//
//        if ($modif[cold_cranking_amps_min] == 0) $maxCurrentstr = "";
//        else $maxCurrentstr = " AND (`b`.`cold_cranking_amperage`<='$modif[cold_cranking_amps_min]')";
//
//        if ($modif[capacity_min] == 0) $minCapacitystr = "";
//        else $minCapacitystr = " AND (`b`.`capacity`>='$modif[capacity_min]')";
//
//        if ($modif[capacity_max] == 0) $maxCapacitystr = "";
//        else $maxCapacitystr = " AND (`b`.`capacity`<='$modif[capacity_max]')";

        $offset = ($page - 1) * 24;

        //        `b`.`description`,

        foreach ($dbh->query('SELECT b.id, b.articleSearch, b.article, b.model,  b.title,'
            . ' b.presence, b.batteryUsage, b.polar, b.brand,'
            . ' b.height, b.length, b.width, b.cold_cranking_amperage,'
            . ' bt.name AS terminal, bc.name AS capacity,'
            . ' bm.name AS modelname,'
            . ' bv.name AS voltage, bb.name, bp.minPrice, bp.maxPrice'
            . ' FROM battery b'
            . ' INNER JOIN battery_models bm ON bm.id = b.model'
            . ' INNER JOIN battery_capacity bc ON bc.id = b.capacity'
            . ' INNER JOIN battery_terminals bt ON bt.id = b.terminal'
            . ' INNER JOIN battery_brands bb ON bb.id = b.brand'
            . ' INNER JOIN battery_voltage bv ON bv.id = b.voltage'
            . $checkpricestr . ' join battery_price as bp on bp.battery_id = b.id'
            . ' WHERE bm.enable=1'
            . $polarstr . $terminalstr . $minVoltagestr . $maxVoltagestr
            . $minLengthstr . $maxLengthstr . $minWidthstr . $maxWidthstr . $minHeightstr . $maxHeightstr
            . ' order by b.brand LIMIT 24  OFFSET ' . $offset
        ) as $row) {
            $result['data'][] = $row;
        }

        foreach ($dbh->query('SELECT COUNT(*) '
            . ' FROM battery b'
            . ' INNER JOIN battery_models bm ON bm.id = b.model'
            . ' INNER JOIN battery_capacity bc ON bc.id = b.capacity'
            . ' INNER JOIN battery_terminals bt ON bt.id = b.terminal'
            . ' INNER JOIN battery_brands bb ON bb.id = b.brand'
            . ' INNER JOIN battery_voltage bv ON bv.id = b.voltage'
            . $checkpricestr . ' join battery_price as bp on bp.battery_id = b.id'
            . ' WHERE bm.enable=1'
            . $polarstr . $terminalstr . $minVoltagestr . $maxVoltagestr
            . $minLengthstr . $maxLengthstr . $minWidthstr . $maxWidthstr . $minHeightstr . $maxHeightstr
        ) as $row) {
            $result['count'] = $row['COUNT(*)'];
        }



        break;
    case 4:
        foreach ($dbh->query('SELECT bb.id, bb.name, bb.description from battery_brands bb
                                   INNER JOIN battery b ON bb.id = b.brand
                                   INNER join battery_price as bp on bp.battery_id = b.id
                                   WHERE bb.enable = 1 group by bb.id order by bb.position, bb.id') as $row) {
            $result['data'][] = $row;
        }
        break;

    case 5:
        foreach ($dbh->query('SELECT bm.id, bm.name from battery_models bm
                                   INNER JOIN `battery` `b` ON bm.id = b.model
                                   INNER join battery_price as bp on bp.battery_id = b.id
                                   WHERE bm.enable = 1
                                   AND bm.brand = ' . $_GET['id']
            . ' group by bm.id') as $row) {
            $result['data'][] = $row;
        }
        break;

    case 6:
        $brand = $_GET['brand'];
        $brandbattery = $_GET['model'];

        $appselect = $_GET['appselect'];
        $capacity = $_GET['capacity'];
        $voltage = $_GET['voltage'];
        $polar = $_GET['polar'];
        $terminals = $_GET['terminals'];
        $ttermin = $_GET['ttermin'];
        $current = $_GET['current'];
        $Length = $_GET['length'];
        $Width = $_GET['width'];
        $Height = $_GET['height'];
        $page = $_GET['page'];

        $checkpricestr = " INNER ";


        if ($brand == 0) $brandstr = "";
        else $brandstr = " AND (`b`.`brand`='$brand')";

        if ($appselect == 0) $appselectstr = "";
        else $appselectstr = " AND (`b`.`batteryUsage`='$appselect')";

        if ($capacity == 99999) $capacitystr = "";
        else $capacitystr = " AND (`b`.`capacity`='$capacity')";

        if ($voltage == 0) $voltagestr = "";
        else $voltagestr = " AND (`b`.`voltage`='$voltage')";

        if ($polar == '100') $polarstr = "";
        else $polarstr = " AND ( b.polar='$polar') ";

        if ($terminals == 0) $terminalstr = "";
        else $terminalstr = " AND (`b`.`terminal`='$terminals')";

        if ($ttermin == '100') $tterminstr = "";
        else $tterminstr = " AND (bt.type='$ttermin') ";

        if ($Length == 0) $Lengthstr = "";
        else $Lengthstr = " AND (`b`.`length`='$Length')";

        if ($Width == 0) $Widthstr = "";
        else $Widthstr = " AND (`b`.`width`='$Width')";

        if ($Height == 0) $Heightstr = "";
        else $Heightstr = " AND (`b`.`height`='$Height')";

        if ($brandbattery == 0) $brandbatterystr = "";
        else $brandbatterystr = " AND (`bm`.`id`='$brandbattery')";

        if ($current == 0) $currentstr = "";
        else $currentstr = " AND (`b`.`cold_cranking_amperage` = '$current')";

        $offset = ($page - 1) * 24;

        foreach ($dbh->query('SELECT b.id, b.articleSearch, b.article, b.model,  b.title,'
            . ' b.presence, b.batteryUsage, b.polar, b.brand,'
            . ' b.height, b.length, b.width, b.cold_cranking_amperage,'
            . ' bt.name AS terminal, bc.name AS capacity,'
            . ' bm.name AS modelname,'
            . ' bv.name AS voltage, bb.name, bp.minPrice, bp.maxPrice'
            . ' FROM battery b'
            . ' INNER JOIN battery_models bm ON bm.id = b.model'
            . ' INNER JOIN battery_capacity bc ON bc.id = b.capacity'
            . ' INNER JOIN battery_terminals bt ON bt.id = b.terminal'
            . ' INNER JOIN battery_brands bb ON bb.id = b.brand'
            . ' INNER JOIN battery_voltage bv ON bv.id = b.voltage'
            . $checkpricestr . ' join battery_price as bp on bp.battery_id = b.id'
            . ' WHERE bm.enable=1 '
            . $brandbatterystr . $brandstr . $appselectstr . $capacitystr
            . $polarstr . $currentstr. $voltagestr . $terminalstr
            . $Lengthstr . $Widthstr . $Heightstr //.$tterminstr
            . ' order by b.brand LIMIT 24  OFFSET ' . $offset
        ) as $row) {
            $result['data'][] = $row;
        }

        foreach ($dbh->query('SELECT COUNT(*) '
            . ' FROM battery b'
            . ' INNER JOIN battery_models bm ON bm.id = b.model'
            . ' INNER JOIN battery_capacity bc ON bc.id = b.capacity'
            . ' INNER JOIN battery_terminals bt ON bt.id = b.terminal'
            . ' INNER JOIN battery_brands bb ON bb.id = b.brand'
//            . ' INNER JOIN battery_voltage bv ON bv.id = b.voltage'
            . $checkpricestr . ' join battery_price as bp on bp.battery_id = b.id'
            . ' WHERE bm.enable=1 '
            . $brandbatterystr . $brandstr . $appselectstr . $capacitystr
            . $polarstr . $currentstr. $voltagestr . $terminalstr
            . $Lengthstr . $Widthstr . $Heightstr //.$tterminstr
        ) as $row) {
            $result['count'] = $row['COUNT(*)'];
        }


//        $count = $this->_getquery("SELECT COUNT(*) FROM `battery` `b`
//                           INNER JOIN `battery_models` `bm` ON bm.id = b.model
//                           INNER JOIN `battery_terminals` `bt` ON bt.id = b.terminal
//                           INNER JOIN `battery_brands` `bb` ON bb.id = b.brand"
//            . $checkpricestr . "join battery_price as bp on bp.battery_id = b.id"
//            . " WHERE (`bm`.`enable`='1') and bb.enable = 1 "
        ////                 AND (`b`.`cold_cranking_amperage` >= '$current')"
//            . $brandbatterystr . $currentstr
//            . $voltagestr . $brandstr . $capacitystr . $terminalstr . $appselectstr . $polarstr
//            . $Lengthstr . $Widthstr . $Heightstr .$tterminstr);
//
//        $result['count'] = $count[0]['COUNT(*)'];


        break;


    case 7:
        $brand = $_GET['brand'];
        $brandbattery = $_GET['model'];

        $appselect = $_GET['appselect'];
        $capacity = $_GET['capacity'];
        $voltage = $_GET['voltage'];
        $polar = $_GET['polar'];
        $terminals = $_GET['terminals'];
        $ttermin = $_GET['ttermin'];
        $current = $_GET['current'];
        $Length = $_GET['length'];
        $Width = $_GET['width'];
        $Height = $_GET['height'];

//        $checkpricestr = " left ";
//        $page=1;

        if ($brand == 0) $brandstr = "";
        else $brandstr = " AND (`b`.`brand`='$brand')";

        if ($brandbattery == 0) $brandbatterystr = "";
        else $brandbatterystr = " AND (`bm`.`id`='$brandbattery')";

        if ($appselect == 0) $appselectstr = "";
        else $appselectstr = " AND (`b`.`batteryUsage`='$appselect')";

        if ($capacity == 99999) $capacitystr = "";
        else $capacitystr = " AND (`b`.`capacity`='$capacity')";

        if ($voltage == 0) $voltagestr = "";
        else $voltagestr = " AND (`b`.`voltage`='$voltage')";

        if ($polar == '100') $polarstr = "";
        else $polarstr = " AND ( b.polar='$polar') ";

        if ($terminals == 0) $terminalstr = "";
        else $terminalstr = " AND (b.terminal='$terminals')";

        if ($ttermin == '100') $tterminstr = "";
        else $tterminstr = " AND (bt.type='$ttermin')";

        if ($Length == 0) $Lengthstr = "";
        else $Lengthstr = " AND (`b`.`length`='$Length')";

        if ($Width == 0) $Widthstr = "";
        else $Widthstr = " AND (`b`.`width`='$Width')";

        if ($Height == 0) $Heightstr = "";
        else $Heightstr = " AND (`b`.`height`='$Height')";

        if ($current == 0) $currentstr = "";
        else $currentstr = " AND (`b`.`cold_cranking_amperage` = '$current')";

        $commonstr = ' from battery b INNER JOIN `battery_models` `bm` ON bm.id = b.model'
            . ' join battery_price as bp on bp.battery_id = b.id'
            . ' INNER JOIN `battery_terminals` `bt` ON bt.id = b.terminal'
            . ' WHERE (`bm`.`enable`=1)';

        foreach ($dbh->query("select b.batteryUsage "
            . $commonstr
            . $Lengthstr . $Heightstr . $Widthstr . $brandstr . $capacitystr . $voltagestr . $polarstr . $terminalstr
            . $brandbatterystr . $currentstr . $tterminstr
            . " group by b.batteryUsage"
        ) as $row) {
            $result['applicat'][] = $row;
        }

        foreach ($dbh->query("select b.length"
            . $commonstr
            . $Heightstr . $Widthstr . $brandstr . $appselectstr . $capacitystr . $voltagestr . $polarstr . $terminalstr
            . $brandbatterystr . $currentstr . $tterminstr
            . " group by b.length")
                 as $row) {
            $result['alength'][] = $row;
        }

        foreach ($dbh->query("select b.width"
            . $commonstr
            . $Heightstr . $Lengthstr . $brandstr . $appselectstr . $capacitystr . $voltagestr . $polarstr . $terminalstr
            . $brandbatterystr . $currentstr . $tterminstr
            . " group by b.width")
                 as $row) {
            $result['awidth'][] = $row;
        }

        foreach ($dbh->query("select b.height"
            . $commonstr
            . $Lengthstr . $Widthstr . $brandstr . $appselectstr . $capacitystr . $voltagestr . $polarstr . $terminalstr
            . $brandbatterystr . $currentstr . $tterminstr
            . " group by b.height")
                 as $row) {
            $result['aheight'][] = $row;
        }

        foreach ($dbh->query("select b.cold_cranking_amperage as 'current'"
            . $commonstr
            . $Lengthstr . $Widthstr . $Heightstr . $brandstr . $appselectstr . $capacitystr . $voltagestr . $polarstr . $terminalstr
            . $brandbatterystr . $tterminstr
            . " group by b.cold_cranking_amperage")
                 as $row) {
            $result['current'][] = $row;
        }

        foreach ($dbh->query("select b.capacity, bc.name"
            . " from battery b
               INNER JOIN `battery_capacity` `bc` ON bc.id = b.capacity
               INNER JOIN `battery_terminals` `bt` ON bt.id = b.terminal
               join battery_price as bp on bp.battery_id = b.id
               INNER JOIN `battery_models` `bm` ON bm.id = b.model WHERE (`bm`.`enable`='1')"
            . $Lengthstr . $Widthstr . $Heightstr . $brandstr . $appselectstr . $voltagestr . $polarstr . $terminalstr
            . $brandbatterystr . $currentstr . $tterminstr
            . " group by b.capacity  ORDER BY bc.capacity")
                 as $row) {
            $result['capacity'][] = $row;
        }

        foreach ($dbh->query("select b.terminal, bt.name, bt.type "
            . " from battery b
               join battery_price as bp on bp.battery_id = b.id
               INNER JOIN `battery_terminals` `bt` ON bt.id = b.terminal
               INNER JOIN `battery_models` `bm` ON bm.id = b.model WHERE (`bm`.`enable`='1')"
            . $Lengthstr . $Widthstr . $Heightstr . $brandstr . $appselectstr . $voltagestr . $polarstr
            . $brandbatterystr . $currentstr . $capacitystr . $tterminstr . $terminalstr
            . " group by b.terminal  ORDER BY bt.id")
                 as $row) {
            $result['terminal'][] = $row;
        }

        foreach ($dbh->query("select b.voltage, bv.name"
            . " from battery b
               INNER JOIN `battery_voltage` `bv` ON bv.id = b.voltage
               INNER JOIN `battery_terminals` `bt` ON bt.id = b.terminal
               join battery_price as bp on bp.battery_id = b.id
               INNER JOIN `battery_models` `bm` ON bm.id = b.model WHERE (`bm`.`enable`='1')"
            . $Lengthstr . $Widthstr . $Heightstr . $brandstr . $appselectstr . $polarstr . $terminalstr
            . $brandbatterystr . $currentstr . $capacitystr . $tterminstr
            . " group by b.voltage")
                 as $row) {
            $result['voltage'][] = $row;
        }

        foreach ($dbh->query("select b.polar"
            . " from battery b
               INNER JOIN `battery_voltage` `bv` ON bv.id = b.voltage
               INNER JOIN `battery_terminals` `bt` ON bt.id = b.terminal
               join battery_price as bp on bp.battery_id = b.id
               INNER JOIN `battery_models` `bm` ON bm.id = b.model WHERE (`bm`.`enable`='1')"
            . $Lengthstr . $Widthstr . $Heightstr . $brandstr . $appselectstr . $capacitystr . $voltagestr . $terminalstr
            . $brandbatterystr . $currentstr . $tterminstr
            . " group by b.polar")
                 as $row) {
            $result['pol'][] = $row;
        }
        break;


        case 8:
            $mark = $_GET['id'];
            foreach ($dbh->query("SELECT start_date, end_date, id FROM `cars_models`  WHERE `brand` = $mark and DATE_FORMAT(start_date,'%Y') >= '1950'") as $row) {
                $arr[] = $row;
            }
                foreach ($arr as $value) {
                    if (strtotime($value[start_date])) $sd = date("Y", strtotime($value[start_date])) * 1;
                    else $sd = date("Y") - 1;
                    if (strtotime($value[end_date])) $ed = date("Y", strtotime($value[end_date])) * 1;
                    else $ed = date("Y") - 1;
                    for ($i = $sd; $i <= $ed; $i++) $res[$i] = 1;
                }
                $res = array_keys($res);
                rsort($res);
                reset($res);
                $result['data'] = $res;

            break;

    default:
        $result['data'][] = 'undisclosed sost ' . $sost;
}

$dbh = null;
echo json_encode($result);
exit;
