<?php
  $getIp= '182.18.19.162';
  echo 'IP:',$getIp;
  echo '<br/>';
  $content = file_get_contents("http://api.map.baidu.com/location/ip?ak=EAc9690e060a06cfe50a260d491afd15&ip={$getIp}&coor=bd09ll");
  $json = json_decode($content);
 
  echo 'log:',$json->{'content'}->{'point'}->{'x'};//按层级关系提取经度数据
  echo '<br/>';
  echo 'lat:',$json->{'content'}->{'point'}->{'y'};//按层级关系提取纬度数据
  echo '<br/>';
  print $json->{'content'}->{'address'};//按层级关系提取address数据
  