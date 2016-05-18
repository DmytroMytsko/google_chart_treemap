<?php
/**
 * Created by PhpStorm.
 * User: dima
 * Date: 18.5.16
 * Time: 17:54
 */
if(($handle = fopen('./data.csv', 'r')) !== FALSE) {
    $data = [];
    while($row = fgetcsv($handle, null, '|')) {
        array_push($data, $row);
    };
    die(json_encode($data));
};
