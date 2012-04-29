<?php

header('Content-type: application/json');

include('common.inc');

$url = @$_GET['url'];
$callback = @$_GET['callback'];

$pre = str_replace(array("gallery.xml","url="),"",$_SERVER['QUERY_STRING']);

$xml = simplexml_load_file($url);
$xml = $xml->eventinfo;

$photos = array();

foreach($xml->photoset as $photoset) {
	$folder = $photoset->attributes()->folder;
	foreach($photoset->photo as $p) {
		$photos[] = $pre . $folder . '/' . $p->attributes()->url;
	}
}

outputJson($photos,$callback);
?>