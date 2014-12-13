<?php
	if (isset($_REQUEST['Info'])) {
	
		$var1 = $_REQUEST['Info'];
		$var1 = (int) $var1;
		
		$var2 = $_REQUEST['Name'];
	
		$fileContents = fopen("leaders.txt", "r");
		$fileContents = (int) $$fileContents;
		
		
		if ($var1 > $fileContents) {
		
		    $file = fopen("leaders.txt","w");
		    echo fwrite($file, $var1);
		    fclose($file);
		    
		    $file = fopen("leaders.txt","a+");
		    echo fwrite($file, $var2);
		    fclose($file);
		    
	    }
	    
	}
?>
