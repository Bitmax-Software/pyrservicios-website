<?php
	$owner_email = "josemoraleswatanabe@gmail.com";
	$headers = 'From:' . $_POST["email"];
	$subject = 'Mensaje desde la Pagina Web: ' . $_POST["name"];
	$messageBody = "";
	
	if($_POST['name']!='nope'){
		$messageBody .= '<p>Nombre : ' . $_POST["name"] . '</p>' . "\n";
		$messageBody .= '<br>' . "\n";
	}
	if($_POST['email']!='nope'){
		$messageBody .= '<p>Email : ' . $_POST['email'] . '</p>' . "\n";
		$messageBody .= '<br>' . "\n";
	}
	
	if($_POST['phone']!='nope'){		
		$messageBody .= '<p>Telefono : ' . $_POST['phone'] . '</p>' . "\n";
		$messageBody .= '<br>' . "\n";
	}	
	if($_POST['message']!='nope'){
		$messageBody .= '<p>Mensaje: ' . $_POST['message'] . '</p>' . "\n";
	}
	
	if($_POST["stripHTML"] == 'true'){
		$messageBody = strip_tags($messageBody);
	}
	try{
		if(!mail($owner_email, $subject, $messageBody, $headers)){
			throw new Exception('mail failed');
		}else{
			echo 'mail sent';
		}
	}catch(Exception $e){
		echo $e->getMessage() ."\n";
	}
?>