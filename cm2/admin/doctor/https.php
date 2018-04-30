<?php

error_reporting(0);
header('Content-Type: text/plain');

/* Direct connection; only IIS sets on/off properly so it's better not to take a risk and
   only check that `$_SERVER['HTTPS']` is set and not equal to `off` */
if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
	exit('OK HTTPS is ON. Connections to CONcrescent are secure.');
}

/* Reverse-proxy in front of web-server that handles PHP interpretation. Sadly, there is no
   standard regarding the header name so checking for both options to see if any of them is
   ok */
if (
	(isset($_SERVER['X_FORWARDED_PROTO']) && $_SERVER['X_FORWARDED_PROTO'] === 'https') ||
	(isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https')
) {
	exit('OK HTTPS is ON on the front-facing reverse proxy. Connections to CONcrescent are secure.');
}

/* This should *never* happen but the webserver may be misconfigured to not set HTTPS param
   and yet have SSL/TLS ON or just to be listening on 443 for whatever reason so it's better
   to throw a warning */
/* `$_SERVER['SERVER_PORT']` can be either an int or a string so strictly parsing to int */
if (isset($_SERVER['SERVER_PORT']) && intval($_SERVER['SERVER_PORT'], 10) === 443) {
	exit('WN HTTPS seems to be OFF but the server is listening on port 443. Please check your webserver\'s configuration. Connections to CONcrescent are NOT secure.');
}

echo 'WN HTTPS is OFF. Connections to CONcrescent are NOT secure.';
