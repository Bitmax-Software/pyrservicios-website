<?php
	$owner_email = "ventas@pyrservicios.com";
	$data = json_decode(file_get_contents('php://input'), true);
	$header = "MIME-Version: 1.0\r\n";
	$header.= "Content-type:text/html;charset=UTF-8" . "\r\n"; ;
	$header.= "X-Priority: 1\r\n";
	$headers.= '<From:' . $data["email"] .'>';
	$subject = 'Mensaje desde la Pagina Web: ' . $data["name"];
	$messageBody = "";
	
	if($data['name']!='nope'){
		$messageBody .= '<p>Nombre : ' . $data["name"] . '</p>' . "\n";
		$messageBody .= '<br>' . "\n";
	}
	if($data['email']!='nope'){
		$messageBody .= '<p>Email : ' . $data['email'] . '</p>' . "\n";
		$messageBody .= '<br>' . "\n";
	}
	
	if($data['phone']!='nope'){		
		$messageBody .= '<p>Telefono : ' . $data['phone'] . '</p>' . "\n";
		$messageBody .= '<br>' . "\n";
	}	
	if($data['message']!='nope'){
		$messageBody .= '<p>Mensaje: ' . $data['message'] . '</p>' . "\n";
	}
	$messageBody = strip_tags($messageBody);
	/* if($data["stripHTML"] == 'true'){
		$messageBody = strip_tags($messageBody);
	} */
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