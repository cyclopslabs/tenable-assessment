<?php

$host = isset($_GET["host"]) ? $_GET["host"] : 2;
$configs = array();
for ($i=0; $i < $host; $i++){
	$conf1 = array('name'=>'host'.$i,'hostname'=>'nessus-ntp.lab.com','port'=>1241+$i,'username'=>'admin'.$i);
	array_push($configs, $conf1);
}

 $arr = array ('configurations'=>$configs);
 header('Content-type: application/json');
 // echo json_encode(array_slice($data, $page*$pageSize, $pageSize));
 echo json_encode($arr);
?>
