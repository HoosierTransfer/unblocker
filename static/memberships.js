const { createClient } = supabase;
const _supabase = createClient(
    'https://hxyegpdslremfvirwunq.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4eWVncGRzbHJlbWZ2aXJ3dW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3NzM0NjEsImV4cCI6MTk3OTM0OTQ2MX0.h0EMF5FCpam2-IpzANEozOv1WOQXzGNwI32QyG1ELjE'
)

async function getLevelFromKey_VerifyUDID(key) {
    const { data, error } = await _supabase
    .from('secret')
    .select()
    var keys = [];

    var udid = localStorage.getItem("uuid");

    for(var i = 0; i < data.length; i++) {
        if(data[i].secrets == key && data[i].udid == udid){
            return data[i].level;
        }
    }
    return 0;
}

async function main() {
    // try {

    // let errors = ["727 wysi", 'owo whats this', 'uwu', ':3', ':(', 'there was supposed to be an error message here but i forgot it', 'balls', 'uh oh this wasnt supposed to happen', 'press ctrl+shift+q+q to continue', 'error 69420', 'running cpuset failed', 'starting gpu failed', 'printer broken']
    // var accessToken = getCookie("data");
    // const { data: { user } } = await _supabase.auth.getUser(accessToken)
    // if(accessToken == null || accessToken == '' || accessToken == undefined) {
    //     document.body.innerHTML = 'fatal error <a href="' + window.location.hostname + 'logon.html">you should log in</a>';
    // }

    // const level = 'level' + await getLevelFromKey('test');

    // const elements = document.getElementsByClassName('imagebutton');

    // for (var i = 0; i < elements.length; i++) {
    //     if (!elements[i].className.includes(level)) {
    //         elements[i].style.display = 'none';
    //     }
    // }

    // if(error !== null) {
    //     document.body.innerHTML = 'segmentation fault (omg c reference)';
    //   }
    //   for(var i = 0; i < data.length; i++) {
    //     keys[i] = data[i].secrets;
    //     udid[i] = data[i].udid;
    //   }
    //   console.log(localStorage.getItem('uuid'));
    //   if((keys.indexOf(user.user_metadata.secret_key)==-1) && udid.indexOf(localStorage.getItem('uuid'))!=-1) {
    //     document.body.innerHTML = errors[randomNumber(0, error.length-1)];
    //   }
    //     } catch (e) {
    //       document.body.innerHTML = e + '<br><br><br><a href="' + window.location.hostname + 'logon.html">you should log in</a>';
    //     }
}

main();