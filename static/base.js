import { createClient } from '@supabase/supabase-js'

// async function logon() {
//   const { user, session, error } = await supabase.auth.signIn({
//     email: document.getElementById("mail").value,
//     password: document.getElementById("passwd").value,
//   });
//   alert(error);
// }

// async function signInWithGithub() {
//   const { user, session, error } = await supabase.auth.signIn({
//     provider: 'github',
//   })
// }

function signup() {
  alert("etest");
}


// Create a single supabase client for interacting with your database
const supabase = createClient('https://hxyegpdslremfvirwunq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4eWVncGRzbHJlbWZ2aXJ3dW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3NzM0NjEsImV4cCI6MTk3OTM0OTQ2MX0.h0EMF5FCpam2-IpzANEozOv1WOQXzGNwI32QyG1ELjE');