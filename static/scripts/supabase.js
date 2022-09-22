async function logon() {
  const { user, session, error } = await supabase.auth.signIn({
    email: document.getElementById("mail").value,
    password: document.getElementById("passwd").value,
  });
  alert(error);
}

async function signInWithGithub() {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'github',
  })
}

async function Signup() {
  document.cookie = `key=${encodeURIComponent(document.getElementById("key").value)} path=/; secure`
  const { user, session, error } = await supabase.auth.signUp({
    email: document.getElementById("mail").value,
    password: document.getElementById("passwd").value
  },
  {
    data: {
      secretKey: document.getElementById("key").value
    }
  })
}