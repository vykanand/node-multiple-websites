<?php
$m = new Memcached();
$m->addServer('localhost', 11211);
if (!$m->get('int')) {
	$m->set('int', 232,10);
}
// $m->set('int', 22,10);
$m->set('string', 'a simple string');
// $m->set('array', array(11, 12));
/* expire 'object' key in 5 minutes */
// $m->set('object', new stdclass, time() + 300);


var_dump($m->get('int'));
var_dump($m->get('string'));
// var_dump($m->get('array'));
// var_dump($m->get('object'));
?>