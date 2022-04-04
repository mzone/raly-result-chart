<?php
$competitionName = isset($_GET['cname']) ? htmlspecialchars($_GET['cname'], ENT_QUOTES) : null;
$ssNo = isset($_GET['ssNo']) ? htmlspecialchars($_GET['ssNo'], ENT_QUOTES) : null;

if ( ! $competitionName || ! $ssNo) {
    throw new ErrorException("取得できませんでした cname param not found");
}

$ssList = explode(',', $ssNo);

if ( ! $ssList || count($ssList) < 1) {
    throw new ErrorException("取得できませんでした cname param not found");
}

$sectionData = [];

foreach($ssList as $ssNo) {
    $filePath = __DIR__ . "/../../data/{$competitionName}/SS{$ssNo}.json";
    $json = file_get_contents($filePath);
    $data = json_decode($json, true);

    foreach($data['overalls'] as $item) {
        $item['ssNo'] = $ssNo;
        $sectionData[] = $item;
    }
}

header("Content-Type: application/json; charset=utf-8");
header('Access-Control-Allow-Origin: *');
echo json_encode($sectionData);

