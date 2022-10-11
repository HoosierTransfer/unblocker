const { createClient } = supabase;
const _supabase = createClient(
    'https://hxyegpdslremfvirwunq.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4eWVncGRzbHJlbWZ2aXJ3dW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3NzM0NjEsImV4cCI6MTk3OTM0OTQ2MX0.h0EMF5FCpam2-IpzANEozOv1WOQXzGNwI32QyG1ELjE'
)

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

async function getSecrets() {

  return keys;
}
async function main() {
var refreshToken = getCookie("refToken");
// const { data, error } = _supabase.auth.setSession(refreshToken);
// console.log(data);
// if (!(error == null || error == '')) {
//     console.log(error);
// }
var accessToken = getCookie("data");
const { data: { user } } = await _supabase.auth.getUser(accessToken)
console.log(user.user_metadata.secret_key);
const { data, error } = await _supabase
.from('secret')
.select('secrets')
var keys = [];
for(var i = 0; i < data.length; i++) {
  keys[i] = data[i].secrets;
}
if((keys.indexOf(user.user_metadata.secret_key)==-1)) {
  document.body.innerHTML = '<iframe src="https://www.nationalgeographic.com/science/" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;"> Your browser doesnt support iframes </iframe>';
}
}



main();

