<?php
include('sesame.class.php');
//获取URL
function getUrl($name, $idcard){
	$class = new sesame();
	$result = $class->_init($name, $idcard);

	return $result;
}

//简单地过滤一下那种感觉的
function safe($param){
	return htmlspecialchars(addslashes($param));
}

$name = safe($_POST['name']);
$idcard = safe($_POST['idcard']);
$param['name'] = $name;
$param['idcard'] = $idcard;

$result['url'] = getUrl($name, $idcard);

//写入日志
$file = fopen('getUrl.log', 'a+');
fwrite($file, json_encode($param) . '\n');
fwrite($file, json_encode($result) . '\n');
fclose($file);

die(json_encode($result));

