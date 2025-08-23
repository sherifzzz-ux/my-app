-- Insert default shipping methods
INSERT INTO public.shipping_methods (name, description, price, estimated_days_min, estimated_days_max) VALUES
('Livraison Standard', 'Livraison en 3-5 jours ouvrables', 150000, 3, 5),
('Livraison Express', 'Livraison en 1-2 jours ouvrables', 300000, 1, 2),
('Livraison Gratuite', 'Livraison gratuite pour commandes de plus de 50 000 FCFA', 0, 5, 7);