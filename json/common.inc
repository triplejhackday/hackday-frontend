<?php

function outputJson($data,$callback) {
	$data = json_encode($data);
	if($callback) {
		echo $callback . '(' . $data . ')';
	} else {
		echo $data;
	}
	exit;
}

?>