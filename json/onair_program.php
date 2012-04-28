<?php

header('Content-type: application/json');

include('keys.inc');
include('common.inc');

$callback = @$_GET['callback'];

$xml = simplexml_load_file('http://www.abc.net.au/triplej/includes/nowon_radio.xml');

$output = array();
$output['program'] = (string) $xml->name;
$output['img'] = (string) $xml->presenter_image_url; 


outputJson($output,$callback);
?>