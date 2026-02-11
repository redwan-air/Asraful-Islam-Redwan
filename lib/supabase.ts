
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const supabaseUrl = 'https://qyqoxghqobeosssrgtyh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5cW94Z2hxb2Jlb3Nzc3JndHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTM0MjgsImV4cCI6MjA4NjM4OTQyOH0.9tffyg8vSKFzqL-65Gc90pL-IEToLgiZAyO3BxCQsm4';

export const supabase = createClient(supabaseUrl, supabaseKey);
