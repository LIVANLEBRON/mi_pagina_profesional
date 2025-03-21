<?php
// Configuración de cabeceras para evitar problemas con caracteres especiales
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Verificar si se recibió una solicitud POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger datos del formulario
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name']), ENT_QUOTES, 'UTF-8') : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $subject = isset($_POST['subject']) ? htmlspecialchars(trim($_POST['subject']), ENT_QUOTES, 'UTF-8') : '';
    $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message']), ENT_QUOTES, 'UTF-8') : '';
    
    // Validar datos
    $errors = [];
    
    if (empty($name)) {
        $errors[] = 'El campo nombre es obligatorio';
    } elseif (strlen($name) > 100) {
        $errors[] = 'El nombre no puede exceder los 100 caracteres';
    }
    
    if (empty($email)) {
        $errors[] = 'El campo email es obligatorio';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Por favor, ingrese un email válido';
    }
    
    if (empty($subject)) {
        $errors[] = 'El campo asunto es obligatorio';
    } elseif (strlen($subject) > 150) {
        $errors[] = 'El asunto no puede exceder los 150 caracteres';
    }
    
    if (empty($message)) {
        $errors[] = 'El campo mensaje es obligatorio';
    }
    
    // Si hay errores, devolver respuesta de error
    if (!empty($errors)) {
        echo json_encode([
            'success' => false, 
            'message' => $errors[0],
            'errors' => $errors
        ]);
        exit;
    }
    
    // Configurar destinatario (tu correo electrónico)
    $to = "andreslivancon@gmail.com";
    
    // Configurar cabeceras del correo
    $headers = "From: =?UTF-8?B?".base64_encode($name)."?= <$email>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    // Crear el cuerpo del mensaje
    $email_message = "<html><body>";
    $email_message .= "<h2>Nuevo mensaje desde el formulario de contacto</h2>";
    $email_message .= "<p><strong>Nombre:</strong> $name</p>";
    $email_message .= "<p><strong>Email:</strong> $email</p>";
    $email_message .= "<p><strong>Asunto:</strong> $subject</p>";
    $email_message .= "<p><strong>Mensaje:</strong></p>";
    $email_message .= "<p>" . nl2br($message) . "</p>";
    $email_message .= "</body></html>";
    
    // Codificar el asunto en Base64 para evitar problemas con caracteres especiales
    $encoded_subject = "=?UTF-8?B?".base64_encode("Formulario de contacto: $subject")."?=";
    
    // Guardar información de depuración
    error_log("Intentando enviar correo a: {$to} desde: {$email}");
    error_log("Asunto: {$encoded_subject}");
    
    // Enviar el correo
    $success = mail($to, $encoded_subject, $email_message, $headers);
    
    // Obtener información adicional en caso de error
    $error_info = error_get_last();
    
    // Responder al cliente
    if ($success) {
        // Registro de éxito
        error_log("Correo enviado exitosamente a: {$to} desde: {$email}");
        echo json_encode(['success' => true, 'message' => '¡Mensaje enviado con éxito!']);
    } else {
        // Registro de error detallado
        error_log("Error al enviar correo a: {$to} desde: {$email}");
        if ($error_info) {
            error_log("Detalles del error: " . print_r($error_info, true));
        }
        echo json_encode(['success' => false, 'message' => 'Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.']);
    }
} else {
    // Si no es una solicitud POST, redirigir a la página principal
    header("Location: ../index.html");
    exit;
}
?>