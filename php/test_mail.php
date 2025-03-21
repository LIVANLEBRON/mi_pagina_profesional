<?php
// Archivo de prueba para verificar la configuración de correo
header('Content-Type: text/html; charset=UTF-8');

// Información de depuración de PHP
echo '<h1>Información de PHP</h1>';
echo '<p>Versión de PHP: ' . phpversion() . '</p>';

// Verificar si la función mail está disponible
echo '<h2>Verificación de la función mail()</h2>';
if (function_exists('mail')) {
    echo '<p style="color: green;">La función mail() está disponible en este servidor.</p>';
} else {
    echo '<p style="color: red;">La función mail() NO está disponible en este servidor.</p>';
}

// Verificar la configuración de correo en php.ini
echo '<h2>Configuración de correo en php.ini</h2>';
echo '<pre>';
echo 'SMTP: ' . ini_get('SMTP') . "\n";
echo 'smtp_port: ' . ini_get('smtp_port') . "\n";
echo 'sendmail_path: ' . ini_get('sendmail_path') . "\n";
echo 'sendmail_from: ' . ini_get('sendmail_from') . "\n";
echo '</pre>';

// Probar envío de correo si se solicita
if (isset($_GET['test']) && $_GET['test'] == 1) {
    echo '<h2>Prueba de envío de correo</h2>';
    
    $to = "andreslivancon@gmail.com";
    $subject = "Prueba de correo desde PHP";
    $message = "<html><body><h1>Prueba de correo</h1><p>Este es un mensaje de prueba enviado desde PHP.</p></body></html>";
    
    $headers = "From: Test <test@example.com>\r\n";
    $headers .= "Reply-To: test@example.com\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    $success = mail($to, $subject, $message, $headers);
    
    if ($success) {
        echo '<p style="color: green;">El correo de prueba se ha enviado correctamente.</p>';
    } else {
        echo '<p style="color: red;">Error al enviar el correo de prueba.</p>';
        
        $error_info = error_get_last();
        if ($error_info) {
            echo '<p>Detalles del error:</p>';
            echo '<pre>' . print_r($error_info, true) . '</pre>';
        }
    }
} else {
    echo '<p><a href="?test=1" style="background-color: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px;">Enviar correo de prueba</a></p>';
}
?>