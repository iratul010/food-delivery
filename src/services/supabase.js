
import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://yvbxnvpalhjrtsfelzww.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2YnhudnBhbGhqcnRzZmVsend3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMzExNzEsImV4cCI6MjAxNTYwNzE3MX0.y7DpacYHD2QyGt5Fy0wEubSs-BqFzHCPe_62kS4_a0k";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
 
 
 
 

 