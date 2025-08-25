-- Insert sample products for testing
insert into public.products (name, description, price_cents, old_price_cents, image_url, is_featured, stock, category_id, brand_id) values 
  ('Crème hydratante visage', 'Crème hydratante intense pour tous types de peau', 2500, 3000, '/images/creme-hydratante.jpg', true, 50, 
   (select id from public.categories where slug = 'soin-du-visage' limit 1),
   (select id from public.brands where slug = 'loreal' limit 1)),
   
  ('Rouge à lèvres mat', 'Rouge à lèvres longue tenue, fini mat', 1800, null, '/images/rouge-levres.jpg', false, 30,
   (select id from public.categories where slug = 'maquillage' limit 1),
   (select id from public.brands where slug = 'garnier' limit 1)),
   
  ('Gel douche parfumé', 'Gel douche hydratant avec parfum frais', 1200, 1500, '/images/gel-douche.jpg', true, 75,
   (select id from public.categories where slug = 'corps-et-bain' limit 1),
   (select id from public.brands where slug = 'nivea' limit 1)),
   
  ('Shampoing anti-pellicules', 'Shampoing traitant contre les pellicules', 2200, null, '/images/shampoing.jpg', false, 40,
   (select id from public.categories where slug = 'cheveux' limit 1),
   (select id from public.brands where slug = 'loreal' limit 1))
on conflict (id) do nothing;
