<?php
require __DIR__ . './db.php';
$db = connectDB();
header("Content-type: application/json");
if (isset($_GET["id"]) and $_GET["id"] !== "") {
	$toDelete = intval($_GET["id"]);
	$query = "delete from emails where id =" . $toDelete;
	$result = mysqli_query($db, $query);
	if (!$result) {
		echo json_encode(["message" => "fail", "error_message"=>"Failed to delete entry with id ".strval($toDelete)." from database"]);
	} else {
		echo json_encode(["message" => "success"]);
	}
}
