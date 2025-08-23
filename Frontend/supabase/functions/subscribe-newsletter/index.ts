import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  email: string;
  source?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing newsletter subscription");
    
    const { email, source = "website" }: NewsletterRequest = await req.json();

    // Validate email
    if (!email || !email.includes("@")) {
      console.error("Invalid email provided");
      return new Response(
        JSON.stringify({ error: "Adresse email invalide" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from("newsletter_subscribers")
      .select("email, is_active")
      .eq("email", email)
      .single();

    if (existingSubscriber) {
      if (existingSubscriber.is_active) {
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "Vous êtes déjà abonné(e) à notre newsletter !" 
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      } else {
        // Reactivate subscription
        const { error: updateError } = await supabase
          .from("newsletter_subscribers")
          .update({ is_active: true, subscribed_at: new Date().toISOString() })
          .eq("email", email);

        if (updateError) {
          console.error("Database update error:", updateError);
          throw new Error("Erreur lors de la réactivation de l'abonnement");
        }
      }
    } else {
      // Create new subscription
      const { error: insertError } = await supabase
        .from("newsletter_subscribers")
        .insert({
          email,
          source,
          is_active: true,
        });

      if (insertError) {
        console.error("Database insert error:", insertError);
        throw new Error("Erreur lors de l'enregistrement de l'abonnement");
      }
    }

    // Send welcome email
    const emailResponse = await resend.emails.send({
      from: "Flawless Beauty <newsletter@flawlessbeauty.sn>",
      to: [email],
      subject: "Bienvenue dans notre communauté beauté ! ✨",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d946ef; font-size: 28px; margin-bottom: 10px;">Bienvenue chez Flawless Beauty !</h1>
            <p style="color: #6c757d; font-size: 16px;">Votre abonnement à notre newsletter a été confirmé</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #d946ef, #f97316); padding: 30px; border-radius: 12px; color: white; text-align: center; margin-bottom: 30px;">
            <h2 style="margin: 0 0 15px 0;">🎉 Merci de rejoindre notre communauté !</h2>
            <p style="margin: 0; font-size: 18px;">Vous recevrez désormais nos offres exclusives, nouveautés et conseils beauté.</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #d946ef; margin-top: 0;">Ce que vous allez recevoir :</h3>
            <ul style="color: #495057; line-height: 1.6;">
              <li>🛍️ Offres exclusives et codes promo</li>
              <li>🆕 Avant-premières sur nos nouveaux produits</li>
              <li>💄 Conseils et tutoriels beauté</li>
              <li>🎁 Cadeaux et surprises pour nos abonnés</li>
              <li>📅 Invitations à nos événements spéciaux</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://flawlessbeauty.sn" 
               style="background-color: #d946ef; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Découvrir nos produits
            </a>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e9ecef;">
          
          <div style="text-align: center; color: #6c757d; font-size: 14px;">
            <p>Suivez-nous sur nos réseaux sociaux pour ne rien rater !</p>
            <p style="margin-top: 20px;">
              Vous pouvez vous désabonner à tout moment en nous contactant à 
              <a href="mailto:newsletter@flawlessbeauty.sn" style="color: #d946ef;">newsletter@flawlessbeauty.sn</a>
            </p>
            <p style="margin-top: 15px;">
              © 2024 Flawless Beauty - Votre beauté, notre passion
            </p>
          </div>
        </div>
      `,
    });

    console.log("Newsletter subscription processed successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Inscription réussie ! Vérifiez votre boîte mail pour confirmer votre abonnement." 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in subscribe-newsletter function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Erreur lors de l'inscription. Veuillez réessayer." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);