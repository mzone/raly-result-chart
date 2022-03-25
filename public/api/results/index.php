<?php

$competitionName = isset($_GET['cname']) ? htmlspecialchars($_GET['cname'], ENT_QUOTES) : null;
$ssNo = isset($_GET['ssNo']) ? htmlspecialchars($_GET['ssNo'], ENT_QUOTES) : null;

if ( ! $competitionName) {
    throw new ErrorException("取得できませんでした cname param not found");
}


$filePath = __DIR__ . "/../../data/{$competitionName}/SS{$ssNo}m.json";
$filePath2 = __DIR__ . "/../../data/{$competitionName}/SS{$ssNo}ms.json";

function getData($filePath)
{
    $json = file_get_contents($filePath);
    return json_decode($json, true);
}

header("Content-Type: application/json; charset=utf-8");
header('Access-Control-Allow-Origin: *');
echo json_encode(array(
  'm' => getData($filePath),
  'ms' => getData($filePath2)
));
