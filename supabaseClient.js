const { createClient } = require('@supabase/supabase-js');
// const { create } = require('domain');
require('dotenv').config();

const supabaseUrl = process.env.SUPABAS_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
module.exports = supabase;