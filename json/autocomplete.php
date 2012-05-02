<?php

header('Content-type: application/json');

include('common.inc');

$q = @$_GET['q'];
$callback = @$_GET['callback'];

if(strlen($q)>2) {
	$term = "%" . $q . "%";
	$db = new PDO('sqlite:../../hackday-backend/plays.db');
	
	$query = "SELECT DISTINCT artist FROM unearthed WHERE artist like :artist LIMIT 5";
	$params = array(':artist'=>$term);
	$sth = $db->prepare($query);
	$sth->execute($params);
	$output = $sth->fetchAll(PDO::FETCH_COLUMN);
	/*
	foreach($output as &$item) {
		$item = wrapTerm($item,$q);
	}
	*/
	outputJson($output,$callback);
}

function wrapTerm($s,$q) {
	$length = strlen($q);
	$pos = stripos($s,$q);
	return substr($s,0,$pos) . "<b>" . substr($s,$pos,$length) . "</b>" . substr($s,$pos + $length);
}
?>