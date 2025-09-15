CREATE TABLE business(
id int(11) primary key auto_increment,
name varchar(255) not null,
description text,
phone varchar(100) not null,
price decimal(10,2) not null,
address text,
city text,
state text,
country text,
image text,
refrence varchar(255) not null,
apikey varchar(255) not null,
upload varchar(255) not null,
created_at timestamp default now(),
updated_at timestamp
);

CREATE TABLE users(
id int(11) primary key auto_increment,
username varchar(255) not null,
password varchar(255) not null,
email varchar(255) not null,
phone varchar(255) not null,
apikey varchar(255) not null,
loginstatus varchar(255) not null,
created_at timestamp default now(),
updated_at timestamp
);

CREATE TABLE clientcustomer(
id int(11) primary key auto_increment,
name varchar(255) not null,
phone varchar(255) not null,
dob varchar(255) not null,
anniv varchar(255) not null,
email varchar(255) not null,
address varchar(255) not null,
created_at timestamp default now(),
updated_at timestamp
);