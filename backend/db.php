<?php

require __DIR__ . '/envReader.php';

use envReader\DotEnv;

(new DotEnv(__DIR__ . '/../.env'))->load();
function connectDB()
{
	$servername = getenv("DB_SERVERNAME");
	$username = getenv("DB_USERNAME");
	$password = getenv("DB_PASS");
	$db_name = getenv("DB_DB_NAME");
	$db = new mysqli($servername, $username, $password);
	if ($db->connect_error) {
		die("Connection failed: " . $db->connect_error);
	}
	$db_selected = mysqli_select_db($db, $db_name);

	if (!$db_selected) {
		// If we couldn't, then it either doesn't exist, or we can't see it.
		$sql = 'CREATE DATABASE ' . $db_name;
		mysqli_query($db, $sql);
	}
	$query = "select id from emails";
	$result = mysqli_query($db, $query);
	if (empty($result)) {
		$query = "
		CREATE TABLE emails (
			id int not null AUTO_INCREMENT primary key,
			email_string nvarchar(255) not null,
			email_provider nvarchar(30) not null,
			email_added datetime not null
		);
		";
		$result = mysqli_query($db, $query);
	}
	return $db;
}
