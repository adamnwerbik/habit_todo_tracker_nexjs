import { createClient } from "@/utils/supabase/server";

import Header from "@/components/Header";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return <div>Protected</div>;
}
