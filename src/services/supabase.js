import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://wxmctetpufhyxhknirsi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bWN0ZXRwdWZoeXhoa25pcnNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI0MzMxNjksImV4cCI6MjAzODAwOTE2OX0.HsUUaFwyrnIwYwdelb0_06SJCoAN48FnTHn9jOxelXw";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
