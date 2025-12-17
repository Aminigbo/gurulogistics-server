require("dotenv").config();
let { createClient } = require('@supabase/supabase-js')
let supabase = createClient(process.env.supabaseUrl, process.env.supabaseKey)
module.exports = {
    supabase,
    Port:process.env.PORT,
}