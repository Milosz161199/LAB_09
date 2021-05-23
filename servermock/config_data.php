<?php 
error_reporting(E_ALL);

class Config {
	public $IP_address;
	public $Sample_time;
	public $Max_number_of_samples;
	public $API_version;
}


$ConfigTestFile = 'config_file.json';

$config = new Config();
$config->IP_address = $_POST['IP_address'];		
$config->Sample_time = $_POST['Sample_time'];		
$config->Max_number_of_samples = $_POST['Max_number_of_samples'];		
$config->API_version = $_POST['API_version'];		


$toJSON = json_encode($config);
file_put_contents($ConfigTestFile, $toJSON);

echo "DONE!";

?>