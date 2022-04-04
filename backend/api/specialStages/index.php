<?php

$competitionName = isset($_GET['cname']) ? htmlspecialchars($_GET['cname'], ENT_QUOTES) : null;

if ( ! $competitionName) {
    throw new ErrorException("取得できませんでした cname param not found");
}

$csvFilePath = __DIR__ . "/../../data/{$competitionName}/specialStages.csv";

/**
 * @return array
 */
function getCsvData($csvFilePath)
{
    $result = array();
    if (($handle = fopen($csvFilePath, "r")) !== false) {
        // 1行ずつfgetcsv()関数を使って読み込む
        while (($data = fgetcsv($handle))) {
            list($day, $no, $name, $dist) = $data;
            $result[] = array(
              'day' => (int)$day,
              'no' => (int)$no,
              'name' => htmlspecialchars($name, ENT_QUOTES),
              'dist' => (float)$dist,
            );
        }
        fclose($handle);
    }
    return $result;
}

$ssList = getCsvData($csvFilePath);

$result = array();

if (count($ssList) > 0) {
    $tmpSSArray = array();
    foreach ($ssList as $ss) {
        $tmpSSArray[$ss['day']][] = $ss;
    }

    foreach ($tmpSSArray as $days) {
        $result[] = $days;
    }
}

header("Content-Type: application/json; charset=utf-8");
header('Access-Control-Allow-Origin: *');
echo json_encode($result);
