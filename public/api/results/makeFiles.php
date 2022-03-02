<?php
$key = isset($_GET['key']) ? htmlspecialchars($_GET['key'], ENT_QUOTES) : null;

if ( ! $key) {
    throw new ErrorException("取得できませんでした key param not found");
}

define('FILE_DIR', dirname(__FILE__) . '/../../data/rallyTango2021');
define('RESULT_PAGE_BASE_URL', 'https://trics.web.fc2.com/21/j/');

function makePageUrlList($lastSSNo)
{
    $list = array();

    for ($ssNo = 1; $ssNo < $lastSSNo + 1; $ssNo++) {
        $list[] = array("SS{$ssNo}ms", RESULT_PAGE_BASE_URL . "SS{$ssNo}ms.htm");
        $list[] = array("SS{$ssNo}m", RESULT_PAGE_BASE_URL . "SS{$ssNo}m.htm");
    }

    return $list;
}

function saveJsonData($fileName, $url)
{
    $html = file_get_contents($url);
    $html = mb_convert_encoding($html, "HTML-ENTITIES", 'SJIS');
    $html = str_replace(array("\r", "\n"), "\n", $html);
    $htmlLines = explode("\n", $html);

    $data = array();
    $hideStartLine = null;
    if ($htmlLines) {
        foreach ($htmlLines as $key => $line) {
            if ($line == '<BR><A href="http://trics.fiw-web.net/trics/m/">TRICS</A>') {
                $hideStartLine = $key;
            }

            if ($key > 6 && is_null($hideStartLine) || $key < $hideStartLine) {
                list($nameData, $time) = explode("<BR>", $line);
                $params = explode(" ", $nameData);
                $carNo = current($params);
                $time = preg_replace("/( |　|&#12288;)/", "", $time );
                $data[] = array('car_no' => trim($carNo), 'time' => $time, 'sec' => hour_to_sec($time));
            }
        }
    }

    file_put_contents(FILE_DIR . "/{$fileName}.json", json_encode($data));
}

function hour_to_sec($str)
{
    $h = 0;
    $t = explode(":", $str);
    if (count($t) > 2 ) {
        list($h, $m, $s) = $t;
    } else {
        list($m, $s) = $t;
    }
    $h = (int)$h;
    $m = (int)$m;
    $s = (float)$s;
    return ($h * 60 * 60) + ($m * 60) + $s;
}

function makeResultDataFiles($lastSSNo)
{
    $list = makePageUrlList($lastSSNo);
    foreach ($list as $line) {
        saveJsonData($line[0], $line[1]);
        echo "Done {$line[0]} <BR>";
    }
}

makeResultDataFiles(12);


