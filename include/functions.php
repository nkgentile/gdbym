<?php
/*
 *
 *	Define global helper functions
 *
 *
 */

function print_exception($e, $message){
	echo 	"<p><em>{$e->getFile()}</em> on <strong>Line {$e->getLine()}</strong></p>".
			"<p><strong>{$message}</strong>:</p>".
			"<pre>{$e->getMessage()}</pre>";
}

?>
