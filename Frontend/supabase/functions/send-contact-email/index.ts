import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing contact form submission");
    
    const { name, email, phone, subject, message }: ContactRequest = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Tous les champs obligatoires doivent être remplis" }),
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

    // Save contact message to database
    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        phone,
        subject,
        message,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Erreur lors de l'enregistrement du message" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "Flawless Beauty <contact@flawlessbeauty.sn>",
      to: [email],
      subject: "Confirmation de réception - Flawless Beauty",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #d946ef;">Bonjour ${name},</h1>
          <p>Nous avons bien reçu votre message concernant : <strong>${subject}</strong></p>
          <p>Notre équipe vous répondra dans les plus brefs délais, généralement sous 24h.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Récapitulatif de votre message :</h3>
            <p><strong>Sujet :</strong> ${subject}</p>
            <p><strong>Message :</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 4px;">${message}</p>
          </div>
          
          <p>En attendant, n'hésitez pas à parcourir notre catalogue de produits de beauté premium.</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e9ecef;">
          <p style="color: #6c757d; font-size: 14px;">
            Merci de votre confiance,<br>
            L'équipe Flawless Beauty<br>
            <a href="mailto:contact@flawlessbeauty.sn">contact@flawlessbeauty.sn</a>
          </p>
        </div>
      `,
    });

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Flawless Beauty <contact@flawlessbeauty.sn>",
      to: ["admin@flawlessbeauty.sn"],
      subject: `Nouveau message de contact - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #d946ef;">Nouveau message de contact</h1>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <p><strong>De :</strong> ${name} (${email})</p>
            ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ''}
            <p><strong>Sujet :</strong> ${subject}</p>
            <p><strong>Message :</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 4px;">${message}</p>
          </div>
          
          <p style="margin-top: 20px;">
            <a href="mailto:${email}?subject=Re: ${subject}" 
               style="background-color: #d946ef; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
              Répondre directement
            </a>
          </p>
        </div>
      `,
    });

    console.log("Contact form processed successfully:", {
      userEmail: userEmailResponse,
      adminEmail: adminEmailResponse
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Message envoyé avec succès. Vous recevrez une confirmation par email." 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: "Erreur lors de l'envoi du message. Veuillez réessayer." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);