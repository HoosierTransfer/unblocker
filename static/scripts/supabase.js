function logon() {
  const { user, session, error } = await supabase.auth.signIn({
    email: document.getElementById("mail").value,
    password: document.getElementById("passwd").value,
  });
  alert(error);
}