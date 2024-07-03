<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lavanderia";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(array("status" => "error", "message" => "Conexión fallida: " . $conn->connect_error)));
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!empty($_POST['nombre']) && !empty($_POST['apellido']) && !empty($_POST['correo']) && !empty($_POST['telefono']) && !empty($_POST['calle']) && !empty($_POST['numeroext']) && !empty($_POST['cp']) && !empty($_POST['delegacion']) && !empty($_POST['colonia'])) {
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $correo = $_POST['correo'];
        $telefono = $_POST['telefono'];
        $calle = $_POST['calle'];
        $numeroext = $_POST['numeroext'];
        $numeroint = isset($_POST['numeroint']) ? $_POST['numeroint'] : null; 
        $cp = $_POST['cp'];
        $delegacion = $_POST['delegacion'];
        $colonia = $_POST['colonia'];

        $stmt = $conn->prepare("INSERT INTO clientes (nombre, apellido, correo, telefono, calle, numeroext, numeroint, cp, delegacion, colonia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        if ($stmt === false) {
            $response["message"] = "Error en la preparación de la declaración: " . $conn->error;
        } else {
            $stmt->bind_param("ssssssssss", $nombre, $apellido, $correo, $telefono, $calle, $numeroext, $numeroint, $cp, $delegacion, $colonia);

            if ($stmt->execute()) {
                header("Location: index.html");
    exit();
            } else {
                
            }
            
        }
    } else {
    }
}

$conn->close();

header('Content-Type: application/json');
?>
