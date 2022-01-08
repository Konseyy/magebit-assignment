<?php
require __DIR__ . './db.php';
$db = connectDB();
$query = "select distinct email_provider from emails";
$results = mysqli_query($db, $query);
$return = [];
if ($results) {
	$return = mysqli_fetch_all($results, MYSQLI_ASSOC);
}
$providers = [];
foreach ($return as $provider) {
	$providers[] = $provider["email_provider"];
}
echo json_encode(["data" => ["providers" => $providers]]);
