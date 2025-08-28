-- Create user_favorites table
CREATE TABLE IF NOT EXISTS public.user_favorites (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "userId" TEXT NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    "productId" TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    UNIQUE("userId", "productId")
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON public.user_favorites("userId");
CREATE INDEX IF NOT EXISTS idx_user_favorites_product_id ON public.user_favorites("productId");

-- Enable Row Level Security
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own favorites" ON public.user_favorites
    FOR SELECT USING (auth.uid() = "userId");

CREATE POLICY "Users can insert their own favorites" ON public.user_favorites
    FOR INSERT WITH CHECK (auth.uid() = "userId");

CREATE POLICY "Users can delete their own favorites" ON public.user_favorites
    FOR DELETE USING (auth.uid() = "userId");

-- Grant permissions to authenticated users
GRANT ALL ON public.user_favorites TO authenticated;
