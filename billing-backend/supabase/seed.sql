-- Seed data for local development.

begin;

insert into public.customers (id, email)
values
  ('11111111-1111-1111-1111-111111111111', 'alice@example.com'),
  ('22222222-2222-2222-2222-222222222222', 'bob@example.com'),
  ('33333333-3333-3333-3333-333333333333', 'carol@example.com');

insert into public.products (id, name, price)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Coffee Monthly', 15.00),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Tea Weekly', 7.99),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Chocolate Quarterly', 39.00);

-- Active/paused/cancelled subscriptions plus soft-deleted rows (deleted_at is set).
insert into public.subscriptions (id, product_id, customer_id, price, status, created_at, updated_at, deleted_at)
values
  ('00000000-0000-0000-0000-000000000001', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 15.00, 'active',   now() - interval '20 days', now() - interval '1 day',  null),
  ('00000000-0000-0000-0000-000000000002', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 7.99,  'paused',   now() - interval '45 days', now() - interval '2 days', null),
  ('00000000-0000-0000-0000-000000000003', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 39.00, 'cancelled', now() - interval '90 days', now() - interval '10 days', null),
  ('00000000-0000-0000-0000-000000000004', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 7.99,  'active',   now() - interval '10 days', now() - interval '5 days',  now() - interval '1 day'),
  ('00000000-0000-0000-0000-000000000005', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 15.00, 'paused',   now() - interval '60 days', now() - interval '30 days', now() - interval '25 days');

commit;
