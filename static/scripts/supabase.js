const { user, session, error } = await supabase.auth.signIn({
    email: 'example@email.com',
    password: 'example-password',
  })