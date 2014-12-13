<?php
	if (isset($_REQUEST['Info'])) {
	
		$var1 = $_REQUEST['Info'];
		$var1 = intval($var1);
		
		$var2 = $_REQUEST['Name'];
		
		$fileContents = file_get_contents("leaders.txt");
		$fileContents = (int) preg_replace('/\D/', '', $fileContents);

		
		if ($var1 > $fileContents) {
		
  			file_put_contents("leaders.txt", $var1);
  			
  			$file = fopen("leaders.txt","a+");
		    echo fwrite($file, $var2);
		    fclose($file);
  			
		}
		
	    
	}
?>
