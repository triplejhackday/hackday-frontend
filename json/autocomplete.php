<?php

header('Content-type: application/json');

include('common.inc');

$q = @$_GET['q'];
$callback = @$_GET['callback'];

if(strlen($q)>2) {
	$q = "%" . $q . "%";
	$db = new PDO('sqlite:../../hackday-backend/plays.db');
	
	$query = "SELECT DISTINCT artist FROM unearthed WHERE artist like :artist LIMIT 5";
	$params = array(':artist'=>$q);
	$sth = $db->prepare($query);
	$sth->execute($params);
	$output = $sth->fetchAll(PDO::FETCH_COLUMN);
	
	outputJson($output,$callback);
}
?>