create table if not exists produtos (
	id integer primary key auto_increment,
  	name varchar(255) not null,
  	description text,
  	created_at timestamp default current_timestamp
);