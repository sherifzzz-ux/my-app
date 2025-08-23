import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CreateOrderRequest {
  items: {
    product_id: string;
    product_name: string;
    product_brand?: string;
    product_image?: string;
    quantity: number;
    unit_price: number; // in cents
  }[];
  shipping_address: {
    first_name: string;
    last_name: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    postal_code: string;
    country: string;
    phone?: string;
  };
  billing_address?: {
    first_name: string;
    last_name: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    postal_code: string;
    country: string;
  };
  shipping_method_id: string;
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing order creation");

    // Create Supabase client with anon key for user authentication
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Authentication required");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData.user) {
      throw new Error("Invalid authentication");
    }

    const user = userData.user;
    console.log("User authenticated:", user.id);

    const orderData: CreateOrderRequest = await req.json();

    // Validate order data
    if (!orderData.items || orderData.items.length === 0) {
      throw new Error("Order must contain at least one item");
    }

    if (!orderData.shipping_address || !orderData.shipping_method_id) {
      throw new Error("Shipping address and method are required");
    }

    // Create Supabase client with service role for database operations
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get shipping method
    const { data: shippingMethod, error: shippingError } = await supabaseService
      .from("shipping_methods")
      .select("*")
      .eq("id", orderData.shipping_method_id)
      .eq("is_active", true)
      .single();

    if (shippingError || !shippingMethod) {
      throw new Error("Invalid shipping method");
    }

    // Calculate total
    const itemsTotal = orderData.items.reduce((sum, item) => {
      return sum + (item.unit_price * item.quantity);
    }, 0);

    const shippingTotal = shippingMethod.price;
    const grandTotal = itemsTotal + shippingTotal;

    // Generate order number
    const { data: orderNumberData, error: orderNumberError } = await supabaseService
      .rpc("generate_order_number");

    if (orderNumberError) {
      throw new Error("Failed to generate order number");
    }

    const orderNumber = orderNumberData;
    console.log("Generated order number:", orderNumber);

    // Create order in database
    const { data: order, error: orderError } = await supabaseService
      .from("orders")
      .insert({
        user_id: user.id,
        order_number: orderNumber,
        status: "pending",
        total_amount: grandTotal,
        shipping_address: orderData.shipping_address,
        billing_address: orderData.billing_address || orderData.shipping_address,
        notes: orderData.notes,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order creation error:", orderError);
      throw new Error("Failed to create order");
    }

    console.log("Order created:", order.id);

    // Create order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      product_brand: item.product_brand,
      product_image: item.product_image,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.unit_price * item.quantity,
    }));

    const { error: itemsError } = await supabaseService
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Order items creation error:", itemsError);
      throw new Error("Failed to create order items");
    }

    console.log("Order items created");

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Check if user has existing Stripe customer
    const customers = await stripe.customers.list({ 
      email: user.email || "",
      limit: 1 
    });

    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: user.email || "",
        metadata: {
          user_id: user.id,
        },
      });
      customerId = customer.id;
    }

    // Create Stripe checkout session
    const lineItems = orderData.items.map(item => ({
      price_data: {
        currency: "xof", // West African CFA franc
        product_data: {
          name: item.product_name,
          images: item.product_image ? [item.product_image] : [],
          metadata: {
            brand: item.product_brand || "",
          },
        },
        unit_amount: item.unit_price,
      },
      quantity: item.quantity,
    }));

    // Add shipping as a line item if there's a cost
    if (shippingTotal > 0) {
      lineItems.push({
        price_data: {
          currency: "xof",
          product_data: {
            name: shippingMethod.name,
            description: shippingMethod.description || "",
          },
          unit_amount: shippingTotal,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/commande/success?order_id=${order.id}`,
      cancel_url: `${req.headers.get("origin")}/panier`,
      metadata: {
        order_id: order.id,
        order_number: orderNumber,
        user_id: user.id,
      },
      shipping_address_collection: {
        allowed_countries: ["SN"], // Senegal
      },
      payment_intent_data: {
        metadata: {
          order_id: order.id,
          order_number: orderNumber,
        },
      },
    });

    // Update order with Stripe session ID
    await supabaseService
      .from("orders")
      .update({ 
        stripe_session_id: session.id,
        payment_method: "stripe"
      })
      .eq("id", order.id);

    console.log("Stripe session created:", session.id);

    return new Response(
      JSON.stringify({ 
        success: true,
        order_id: order.id,
        order_number: orderNumber,
        checkout_url: session.url,
        total_amount: grandTotal
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in create-order function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Erreur lors de la création de la commande" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);