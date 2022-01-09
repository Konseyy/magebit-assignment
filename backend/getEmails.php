<?php
require __DIR__ . './db.php';
$db = connectDB();
header("Content-type: application/json");
if (isset($_GET["page"]) and $_GET["page"] !== "") {
	$page = "";
	if ($_GET["page"] !== "all") {
		$page = intval($_GET["page"]);
	} else {
		$page = "all";
	}
	$sort = "default";
	$search = "";
	if (isset($_GET["sort"]) and $_GET["sort"] !== "") {
		$sort = $_GET["sort"];
	}
	if (isset($_GET["search"]) and $_GET["search"] !== "") {
		$search = $_GET["search"];
	}
	$provider = "";
	if (isset($_GET["provider"]) and $_GET["provider"] !== "") {
		$provider = $_GET["provider"];
	}
	$selectQuery = "select * from emails";
	if ($provider !== "") {
		$selectQuery = $selectQuery . " where email_provider='" . $provider . "'";
	}
	if ($search !== "") {
		if ($provider !== "") {
			$selectQuery = $selectQuery . " and email_string like '%" . $search . "%'";
		} else {
			$selectQuery = $selectQuery . " where email_string like '%" . $search . "%'";
		}
	}
	$sortQuery = "";
	switch ($sort) {
		case "default":
			$sortQuery = "order by email_string desc";
			break;
		case "email_desc":
			$sortQuery = "order by email_string desc";
			break;
		case "email_asc":
			$sortQuery = "order by email_string asc";
			break;
		case "date_desc":
			$sortQuery = "order by email_added desc";
			break;
		case "date_asc":
			$sortQuery = "order by email_added asc";
			break;
		default:
			$sortQuery = "order by email_string desc";
			break;
	}
	$selectQuery = $selectQuery . " " . $sortQuery;
	$pagerQuery = $selectQuery;
	if ($page !== "all") {
		$selectQuery = $selectQuery . " limit " . strval($page * 10) . ", 10";
	}
	$selected = mysqli_query($db, $selectQuery);
	$pagerResults = mysqli_query($db, $pagerQuery);
	$result = [];
	$pages = 0;
	if ($selected) {
		$result = mysqli_fetch_all($selected, MYSQLI_ASSOC);
		$rows = count(mysqli_fetch_all($pagerResults, MYSQLI_ASSOC));
		if ($rows !== 0) {
			$pages = (($rows - $rows % 10) / 10) + 1;
		}
	}
	$pager = ["current_page" => $page, "total_pages" => $pages, "rows"=>$rows];
	echo json_encode(["data" => $result, "pager" => $pager]);
}
