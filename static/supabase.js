//import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0+esm'
// Create a single _supabase client for interacting with your database
const { createClient } = supabase;

const _supabase = createClient(
  'https://hxyegpdslremfvirwunq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4eWVncGRzbHJlbWZ2aXJ3dW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3NzM0NjEsImV4cCI6MTk3OTM0OTQ2MX0.h0EMF5FCpam2-IpzANEozOv1WOQXzGNwI32QyG1ELjE'
)

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

async function addUUID(key, uuid) {
  const { error } = await _supabase
  .from('secret')
  .update({ udid: uuid })
  .eq('secrets', key)
  return error;
}



export async function signIn() {
  if(!(document.getElementById('main').value == '' || document.getElementById('passwd').value == '')){
    const { data, error } = await _supabase.auth.signInWithPassword({
      email: document.getElementById('main').value,
      password: document.getElementById('passwd').value
    })
    const now = new Date();
    const time = now.getTime() + 3600 * 1000 * 24;
    now.setTime(time);
    document.cookie = "data=" + data.session.access_token + "; expires=" + now.toUTCString() + "; path=/";
    document.cookie = "refToken=" + data.session.refresh_token + "; expires=" + now.toUTCString() + "; path=/";
    window.location.replace('');
    if(error == null || error == '') {
      return '';
    }
  }
  document.getElementById("container").innerHTML = "<div class='container' id='container'> <div class='form-container log-in-container'> <form action='#'> <h1>Login</h1> <!-- <div class='social-container'> <div onclick='signInWithGithub()'> <i class='fa-brands fa-github fa-2xl'></i> </div>				 --> </div> <input type='email' placeholder='Wrong email or password' id='main'/> <input type='password' placeholder='Password' id='passwd'/> <a href='#'>Forgot your password?</a> <button onclick='signIn()'>Log In</button> </form> </div> <div class='overlay-container'> <div class='overlay'> <div class='overlay-panel overlay-right'> <h1>Science Help</h1> <p>Get help with science for free!</p> </div> </div> </div>";
  document.getElementById("main").className = "error";
  console.log("rip");
  replace("sciencehelp2.herokuapp.com");
  return 0;
}


async function keyUsed(key) {
  const { data, error } = await _supabase
  .from('UsedKeys')
  .select('key')
  for(let i = 0; i < data.length; i++) {
    if(data[i].key == key) {
      return true;
    }
  }
  return false;
}

export async function Signup() {
  const { data, error } = await _supabase
  .from('secret')
  .select('secrets')
  var keys = [];
  for(var i = 0; i < data.length; i++) {
    keys[i] = data[i].secrets;
  }
  if(!(document.getElementById('main').value == '' || document.getElementById('passwd').value == '' || document.getElementById('key').value == '') && document.getElementById('passwd').value == document.getElementById('passwdconf').value && !(keys.indexOf(document.getElementById('key').value)==-1) && !keyUsed((document.getElementById('key').value))){
  const { user, session, error } = await _supabase.auth.signUp({
    email: document.getElementById('main').value,
    password: document.getElementById('passwd').value,
    options: {
    data: {
      secret_key: document.getElementById('key').value,
    }
  }
})
if(error == null) {
  if(localStorage.getItem('uuid ') == null || localStorage.getItem('uuid ') == undefined) {
  localStorage.setItem('uuid', uuidv4());
  }
}
try {
  if(localStorage.getItem('uuid ') == null || localStorage.getItem('uuid ') == undefined) {
  addUUID(document.getElementById('key').value,)  
  }
} catch (e) {
  document.innerHTML = e;
}
  console.log(error)
  const now = new Date();
  const time = now.getTime() + 3600 * 1000 * 24;
  now.setTime(time);
  document.cookie = "data=" + session.access_token + "; expires=" + now.toUTCString() + "; path=/";
  document.cookie = "refToken=" + session.refresh_token + "; expires=" + now.toUTCString() + "; path=/";
  window.location.replace('');
  return error;
} else if(!(document.getElementById('passwd').value == document.getElementById('passwdconf').value)) {
  document.getElementById("container").innerHTML = "<div class='form-container log-in-container'> <form action='#'> <h1>Sign Up</h1> <!-- <div class='social-container'> <i class='fa-brands fa-github fa-2xl'></i>				</div> <span>or use your email</span> --> <input type='email' placeholder='Email' id='main'/> <input type='password' placeholder='Passwords do not match!' id='passwd'/> <input type='password' placeholder='Confirm Password' id='passwdconf'/> <input type='secret' placeholder='Secret Key' id='key'/> <button onclick='Signup1()' type='button'>Sign Up</button> </form> </div> <div class='overlay-container'> <div class='overlay'> <div class='overlay-panel overlay-right'> <h1>Science Help</h1> <p>Get help with science for free!</p> </div> </div> </div>"
  document.getElementById("passwd").className = "error";
  console.log("rip bozo")
} else if(document.getElementById('main').value == '' || document.getElementById('passwd').value == '' || document.getElementById('key').value == '') {
  document.getElementById("container").innerHTML = "<div class='form-container log-in-container'> <form action='#'> <h1>Sign Up</h1> <!-- <div class='social-container'> <i class='fa-brands fa-github fa-2xl'></i>				</div> <span>or use your email</span> --> <input type='email' placeholder='Key invalid/Empty box' id='main'/> <input type='password' placeholder='Password' id='passwd'/> <input type='password' placeholder='Confirm Password' id='passwdconf'/> <input type='secret' placeholder='Secret Key' id='key'/> <button onclick='Signup1()' type='button'>Sign Up</button> </form> </div> <div class='overlay-container'> <div class='overlay'> <div class='overlay-panel overlay-right'> <h1>Science Help</h1> <p>Get help with science for free!</p> </div> </div> </div>"
  document.getElementById("main").className = "error";
  console.log("rip");
}
Replace("sciencehelp2.herokuapp.com");
}
keyUsed("test");