<?php

$competitionName = isset($_GET['cname']) ? htmlspecialchars($_GET['cname'], ENT_QUOTES) : null;

if ( ! $competitionName) {
    throw new ErrorException("取得できませんでした cname param not found");
}

$csvFilePath = __DIR__ . "/../../data/{$competitionName}/entrants.csv";

/**
 * @return array
 */
function getEntrantCsvData($csvFilePath)
{
    $result = array();
    if (($handle = fopen($csvFilePath, "r")) !== false) {
        // 1行ずつfgetcsv()関数を使って読み込む
        while (($data = fgetcsv($handle))) {
            list($no, $className, $drName, $coDrName, $carName, $carModel, $group, $teamName) = $data;
            $result[] = array(
              'no' => $no,
              'className' => $className,
              'drName' => $drName,
              'coDrName' => $coDrName,
              'carName' => $carName,
              'carModel' => $carModel,
              'group' => $group,
              'teamName' => $teamName,
            );
        }
        fclose($handle);
    }
    return $result;
}

/**
 * @param $entrants
 * @return array
 */
function getEntrantClasses($entrants)
{
    if ( ! $entrants || count($entrants) < 1) {
        return array();
    }

    $result = array();
    foreach ($entrants as $val) {
        $result[$val['className']][] = $val['no'];
    }

    return array(array_keys($result), $result);
}

$entrants = getEntrantCsvData($csvFilePath);
list($classes, $entrantClasses) = getEntrantClasses($entrants);

header("Content-Type: application/json; charset=utf-8");
header('Access-Control-Allow-Origin: *');
echo json_encode(array(
  'classes' => $classes,
  'entrants' => $entrants,
  'entrantClasses' => $entrantClasses,
));
