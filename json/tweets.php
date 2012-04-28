<?php
header('Content-type: application/json');

include('keys.inc');

$artist = @$_GET['artist'];
$callback = @$_GET['callback'];
$good_words = array('good','#nowplaying','excellent','liked','fantastic','great','gr8','awesome','sick','amazing','wicked','wickid','grouse','choice','mad','stoked','excited','epic',':)','excitement','killer','brilliant','pumped','best','must hear','amped','dope','omg','omfg','magical','owned','rocking','wild','hot','top');
$bad_words = array('terrible','bad','awful','late','crap','dissapointing','disapointing','dissappointing','shithouse','mingin');

$output = array();

if($artist) {
	$twitter_handle = getTwitterHandle($keys['echonest'],$artist);
	$output['handle'] = $twitter_handle;
	
	$twitter_search = array($artist);
	if($twitter_handle) {
		$twitter_search[] = $twitter_handle; 
	}
	
	$tweets = getTweets($twitter_search);
	$output['tweets'] = $tweets;
	
	$sentiment = getSentiment($tweets);
	$output['sentiment'] = $sentiment;
}

outputJson($output,$callback);



function getTweets($search) {
    $url = 'http://search.twitter.com/search.atom?result_type=recent&rpp=50&q='.urlencode('"' . implode('" OR "',$search) . '" lang:en');
   	$xml = simplexml_load_file($url);
   	$tweets = array();
    foreach ($xml->entry as $entry) {
    	if(count($tweets)>16) {
    		break;
    	}
    	$id = str_replace('tag:search.twitter.com,2005:', '', $entry->id);
        $text = trim($entry->title);
        $authorImg = (string) $entry->link[1]->attributes()->href;
        $authorName = (string) $entry->author->name;
        $authorId = trim(str_replace("http://twitter.com/","",$entry->author->uri));
        $tweets[] = array('id'=>$id,'text'=>$text, 'author'=>array('id'=>$authorId,'name'=>$authorName,'img'=>$authorImg));
    }
    return $tweets;
}

function getTwitterHandle($key,$artist) {
	$url = 'http://developer.echonest.com/api/v4/artist/twitter?api_key=' . $key . '&name=' . urldecode($artist) . '&format=xml';
	$xml = simplexml_load_file($url);
	$twitter_handle = (string) @$xml->artist->twitter;
	return $twitter_handle;
}

function outputJson($data,$callback) {
	$data = json_encode($data);
	if($callback) {
		echo $callback . '(' . $data . ')';
	} else {
		echo $data;
	}
	exit;
}

function getSentiment($tweets) {
	global $good_words, $bad_words;
	$good = 0;
	$bad = 0;
	foreach($tweets as $tweet) {
		$words = explode(" ",$tweet['text']);
		foreach($words as $word) {
			if(in_array($word,$good_words)) {
				$good++;
			}
			if(in_array($word,$bad_words)) {
				$bad++;
			}
		}
	}
	
	$sentiment = "neutral";
	if($good>$bad) {
		$sentiment = "positive";
	} else if($good<$bad) {
		$sentiment = "negative";
	}
	
	return array("sentiment"=>$sentiment,"positive"=>$good,"negative"=>$bad);
}


?>