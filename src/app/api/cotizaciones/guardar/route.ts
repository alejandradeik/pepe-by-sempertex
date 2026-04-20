import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Debes iniciar sesión para guardar cotizaciones." }, { status: 401 });
  }

  const { quote_request_id, quote_option_id } = await req.json();

  if (!quote_request_id || !quote_option_id) {
    return NextResponse.json({ error: "Faltan parámetros." }, { status: 400 });
  }

  const { error } = await supabase.from("saved_quotes").upsert(
    {
      customer_id: user.id,
      quote_request_id,
      quote_option_id,
    },
    { onConflict: "customer_id,quote_option_id" }
  );

  if (error) {
    return NextResponse.json({ error: "Error al guardar." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
