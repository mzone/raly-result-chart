<?php

define('HTML_SLICE_LINES', 16);
//define('FILE_DIR', dirname(__FILE__) . '/../../data/rallyTango2021');
define('FILE_DIR', dirname(__FILE__) . '/../../data/karatsu2022');
//define('RESULT_PAGE_BASE_URL', 'https://trics.web.fc2.com/21/j/');
define('RESULT_PAGE_BASE_URL', 'http://ww21.tiki.ne.jp/~gravel-msc/sokuho/');
define('LAST_SS_NO', 10);


header("Content-type: text/html; charset=SJIS");


$key = isset($_GET['key']) ? htmlspecialchars($_GET['key'], ENT_QUOTES) : null;

if ( ! $key) {
    throw new ErrorException("取得できませんでした key param not found");
}


function makePageUrlList()
{
    $list = [];

    for ($ssNo = 1; $ssNo <= LAST_SS_NO; $ssNo++) {
        $list[] = ["SS{$ssNo}.json", RESULT_PAGE_BASE_URL . "SS{$ssNo}a.htm"];
    }
    return $list;
}

function saveJsonData($fileName, $url)
{
    $html = file_get_contents($url);
    $html = str_replace(["\r\n", "\r", "\n"], '', $html);
    $pattern = '@<TD.*?>(.*?)</TD>@';
    preg_match_all($pattern, $html, $matches);
    $data = array_slice($matches[1], HTML_SLICE_LINES);
    $data = array_map(function ($line) {
        return str_replace(['<FONT SIZE=2>'], '', $line);
    }, $data);
    $chunks = array_chunk($data, 7);
    $formattedData = array_map(function ($line) {
        return [
          'pos' => (int) str_replace(["="], '', $line[0]),
          'car_no' => trim($line[1]),
          'time' => $line[4],
          'sec' => hour_to_sec($line[4]),
          'class_pos' => (int) str_replace(["="], '', $line[5]),
        ];
    }, $chunks);

    $sections = [];
    $overalls = [];

    foreach ($formattedData as $key => $val) {
        if ($val['car_no'] === '-') {
            continue;
        }

        if ($key % 2 === 0) {
            $sections[] = $val;
        } else {
            $overalls[] = $val;
        }
    }

    //    echo json_encode($sections);
    //    echo json_encode($overalls);

    $fileData = [
      'sections' => $sections,
      'overalls' => $overalls,
    ];

    file_put_contents(FILE_DIR . "/{$fileName}", json_encode($fileData));
}

function hour_to_sec($str)
{
    if ( ! $str || $str == '-') {
        return null;
    }
    $h = 0;
    $t = explode(":", $str);
    if (count($t) > 2) {
        list($h, $m, $s) = $t;
    } else {
        list($m, $s) = $t;
    }
    $h = (int)$h;
    $m = (int)$m;
    $s = (float)$s;
    return ($h * 60 * 60) + ($m * 60) + $s;
}

function makeResultDataFiles()
{
    $list = makePageUrlList();
    foreach ($list as $line) {
        saveJsonData($line[0], $line[1]);
        echo "Done {$line[0]} <BR>";
    }
}

makeResultDataFiles();


