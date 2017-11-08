<?php
include('sesame.class.php');
//简单地过滤一下那种感觉的
function safe($param){

	return htmlspecialchars(addslashes($param));
}
$params = safe($_GET['params']);
$sign = safe($_GET['sign']);

$class = new sesame();
$authResult = $class->zhimaAuthInfo($params, $sign);
$authResult = urldecode($authResult);

$url = 'https://www.xinyongjinku.com/wechat/index.html#shenhez?' . $authResult;
header("Location: " . $url);

die;