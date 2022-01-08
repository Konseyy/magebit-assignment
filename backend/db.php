<?php
function connectDB()
{
	$servername = "localhost";
	$username = "root";
	$password = "test12345";
	$db_name = "magebit";
	$db = new mysqli($servername, $username, $password);
	if ($db->connect_error) {
		die("Connection failed: " . $db->connect_error);
	}
	$db_selected = mysqli_select_db($db, $db_name);

	if (!$db_selected) {
		// If we couldn't, then it either doesn't exist, or we can't see it.
		$sql = 'CREATE DATABASE ' . $db_name;

		if (mysqli_query($db, $sql)) {
			echo "Database my_db created successfully\n";
		} else {
			echo 'Error creating database';
		}
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
