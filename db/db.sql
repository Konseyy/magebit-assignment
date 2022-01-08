CREATE TABLE emails (
	email_id int not null AUTO_INCREMENT primary key,
	email_string nvarchar(255) not null,
	email_provider nvarchar(30) not null,
	email_added datetime not null
);