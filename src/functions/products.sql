create table products (
	id uuid primary key default uuid_generate_v4(),
	title text not null,
	description text,
	price integer,
  cover text
)

create extension if not exists "uuid-ossp"

create table stocks (
	count integer,
	product_id uuid primary key,
	foreign key ("product_id") references "products" ("id")
)

insert into products (title, description, price, cover) values
('Metallica', 'Metallica ', 2, 'https://upload.wikimedia.org/wikipedia/en/f/f4/Ridetl.png'),
('Linkin Park', 'Linkin Park ', 4, 'https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg'),
('Rammstein', 'Rammstein', 6, 'https://upload.wikimedia.org/wikipedia/en/1/1f/Rammstein_Herzeleid_cover.jpg'),
('Limp Bizkit', 'Limp Bizkit ', 8, 'https://upload.wikimedia.org/wikipedia/en/3/38/Limp_Bizkit_Chocolate_Starfish_and_the_Hotdog_Flavored_Water.jpg'),
('The Offspring', 'The Offspring ', 10, 'https://upload.wikimedia.org/wikipedia/en/f/f5/TheOffspringAmericanaalbumcover.jpg'),
('Blink 182', 'Blink 182 ', 12, 'https://upload.wikimedia.org/wikipedia/en/d/de/Blink-182_-_Take_Off_Your_Pants_and_Jacket_cover.jpg'),
('AC/DC', 'AC/DC ', 14, 'https://upload.wikimedia.org/wikipedia/en/f/fc/Acdc_high_voltage_international_album.jpg'),
('Aerosmith', 'Aerosmith ', 16, 'https://upload.wikimedia.org/wikipedia/en/5/57/Aerosmith_-_Night_In_The_Ruts.JPG')

insert into stocks (count, product_id) values
(2, '76ae7532-8f5d-4ee7-8ffe-dfaf077925af'),
(4, '2f3b3df9-401d-4bf0-a468-54d91dc9c282'),
(6, 'de0ef7e1-52f8-419f-9b36-c1c8d64fc947'),
(8, '40d55d80-79b0-42aa-91f6-e0279822b889'),
(10, '94f369ee-91db-4423-814b-83e800e380e0'),
(12, '92a03461-e6fa-4bda-a157-d78205c6f055'),
(14, '4e558c3b-5467-4dc5-976a-5e29827d7e81'),
(16, '6042236f-1452-425f-9c03-cc12ff51dbaf')
