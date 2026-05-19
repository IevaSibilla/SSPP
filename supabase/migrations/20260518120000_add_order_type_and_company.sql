alter table orders add column if not exists order_type text default 'deck-review';
alter table orders add column if not exists company text;
