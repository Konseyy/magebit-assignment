<?php
require __DIR__ . './db.php';
function extractProvider($emailString)
{
	$startProvider = 0;
	$endProvider = 0;
	for ($i = strlen($emailString); $i > 0; $i--) {
		$current = substr($emailString, -$i, 1);
		$chars[] = $current;
		if ($current === ".") {
			$endProvider = $i;
		}
		if ($current === "@") {
			$startProvider = $i;
		}
	}
	$providerLen = $startProvider - $endProvider;
	$provider = substr($emailString, -$startProvider + 1, $providerLen - 1);
	return $provider;
}
$db = connectDB();
if (isset($_GET["email"]) and $_GET["email"] !== "") {
	$email = $_GET["email"];
	$provider = extractProvider($email);
	$time = date('Y-m-d H:i:s');
	$insertQuery = "insert into emails (email_string, email_provider, email_added) values ('" . $email . "','" . $provider . "','" . $time . "')";
	$result = mysqli_query($db, $insertQuery);
	if ($result) {
		header("Content-type: application/json");
		echo json_encode(["result" => "success", "data" => ["email_string" => $email, "email_provider" => $provider, "email_added" => $time]]);
	} else {
		header("Content-type: application/json");
		echo json_encode(["result" => "fail"]);
	}
}
