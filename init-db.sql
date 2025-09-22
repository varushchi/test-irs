DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;

CREATE TABLE IF NOT EXISTS authors (
  author_id SERIAL PRIMARY KEY,
  royalties NUMERIC(10,2),
  name VARCHAR(100) NOT NULL,
  birth_date DATE,
  awards_count INTEGER
);

CREATE TABLE IF NOT EXISTS books (
  book_id SERIAL PRIMARY KEY,
  author_id INTEGER NOT NULL REFERENCES authors(author_id),
  avg_rating NUMERIC(2,1), 
  name VARCHAR(100) NOT NULL,
  created_at DATE,
  page_count INTEGER
);

INSERT INTO authors (
  royalties, name, birth_date, awards_count
) VALUES  
  (12000.50, 'John Doe', '1975-04-12', 3),
  (8500.00, 'Jane Smith', '1980-09-23', 1),
  (23000.75, 'Robert Brown', '1965-01-30', 5),
  (4500.20, 'Emily Johnson', '1990-07-15', 0),
  (17500.00, 'Michael Davis', '1972-11-05', 2);

INSERT INTO books (
  author_id, name, avg_rating, created_at, page_count
) VALUES
  (1, 'The Life of John Doe', 8.5, '2000-05-10', 230),
  (1, 'Adventures of John Doe', 7.9, '2005-07-22', 310),
  (2, 'Jane Smith: A Journey', 9.1, '2010-03-15', 280),
  (3, 'The Works of Robert Brown', 8.0, '1998-11-01', 450),
  (3, 'Robert Brown: Collected Stories', 7.5, '2002-06-18', 320),
  (3, 'Brown''s Legacy', 8.8, '2015-09-07', 500),
  (4, 'Emily Johnson''s Debut', 7.0, '2018-02-20', 210),
  (4, 'Tales by Emily Johnson', 7.6, '2020-12-10', 190),
  (5, 'Michael Davis: Early Years', 8.2, '1999-08-25', 340),
  (5, 'Michael Davis Complete Works', 9.0, '2008-01-12', 600);

