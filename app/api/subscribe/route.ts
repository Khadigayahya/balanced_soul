import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { subscription, userId } = await req.json();
  
  await supabase.from("push_subscriptions").upsert({
    user_id: userId,
    subscription: JSON.stringify(subscription),
  });

  return NextResponse.json({ success: true });
}