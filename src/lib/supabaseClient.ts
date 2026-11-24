import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "../storeConfig";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export interface OrderInsertPayload {
  customer_name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  country: string;
  product_name: string;
  product_variant: string;
  quantity: number;
  notes: string;
  status: "pending";
}

/**
 * Inserts a single order row into the "orders" table.
 * Strictly INSERT-only (no .select(), no update, no delete).
 */
export async function submitCodOrder(payload: OrderInsertPayload) {
  const { error } = await supabase.from("orders").insert([payload]);
  if (error) {
    throw error;
  }
}
