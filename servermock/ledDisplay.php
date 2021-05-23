<?php 
error_reporting(E_ALL);

class LED {
	public $number;
	public $R;
	public $G;
	public $B;
}


$ledDispleyTestFile = 'led_display_test_file.json';

for ($x = 0; $x < 64; $x++)
{
	$led[$x] = new LED();
	$led[$x]->number = $x;
	$value = $_POST['LED'.$led[$x]->number];
	$value_int = hexdec($value);
		
	$led[$x]->R = ($value_int & 0xff0000) >> 16;
	$led[$x]->G = ($value_int & 0x00ff00) >> 8;
	$led[$x]->B = ($value_int & 0x0000ff);
}

$toJSON = json_encode($led);
file_put_contents($ledDispleyTestFile, $toJSON);

shell_exec('sudo python3 /home/pi/server/client_LAB_09/HTML/servermock/ledDisplayReadRataFromFile.py');

echo "DONE!";

?>