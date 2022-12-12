// const { createClient } = supabase;
// const _supabase = createClient(
//     'https://hxyegpdslremfvirwunq.supabase.co',
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4eWVncGRzbHJlbWZ2aXJ3dW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3NzM0NjEsImV4cCI6MTk3OTM0OTQ2MX0.h0EMF5FCpam2-IpzANEozOv1WOQXzGNwI32QyG1ELjE'
// )

// async function setPage() {
//     for(var i = 0; i < pages.length; i++) {
//         if(pages[i] == (window.location.pathname).split('/')[(window.location.pathname).split('/').length - 1]) {
//             var client = new XMLHttpRequest();
//                 client.open('GET', '/' + real[i]);
//             client.onreadystatechange = function() {
//                 document.innerHTML = client.responseText;
//             }
// client.send();
//         }
//     }
// }

// function getCookie(cname) {
//     let name = cname + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(';');
//     for(let i = 0; i <ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
// }

// async function keyUsed(key) {
//     const { data, error } = await _supabase
//     .from('UsedKeys')
//     .select()
//     for(let i = 0; i < data.length; i++) {
//       if(data[i].key == key) {
//         return true;
//       }
//     }
//     return false;
//   }

//   async function compareUUID(key) {
//     const { data, error } = await _supabase
//     .from('secret')
//     .select().eq('secrets', key);
//     if(localStorage.getItem('uuid') == null) {
//         return false;
//     }
//     if (data.uuid = localStorage.getItem('uuid')) {
//       return true;
//     }
//     return false;
//   }

//   async function keyExists(key) {
//     const { data, error } = await _supabase
//     .from('secret')
//     .select()
//     for(var i = 0; i < data.length; i++) {
//       if(key === data[i].secrets) {
//         return true;
//       }
//     }
//     return false;
//   }

// async function getSecrets() {

//   return keys;
// }

// async function getLevelFromKey_VerifyUDID(key) {
//   const { data, error } = await _supabase
//   .from('secret')
//   .select()
//   var keys = [];

//   for(var i = 0; i < data.length; i++) {
//       if(data[i].secrets == key){
//           return data[i].level;
//       }
//   }
//   return 0;
// }

// async function main() {
// //   try{
// // // var refreshToken = getCookie("refToken");
// // // const { data, error } = _supabase.auth.setSession(refreshToken);
// // // console.log(data);
// // // if (!(error == null || error == '')) {
// // //     console.log(error);
// // // }
// // let errors = ["727 wysi", 'owo whats this', 'uwu', ':3', ':(', 'there was supposed to be an error message here but i forgot it', 'balls', 'uh oh this wasnt supposed to happen', 'press ctrl+shift+q+q to continue', 'error 69420', 'running cpuset failed', 'starting gpu failed', 'printer broken']
// // var accessToken = getCookie("data");
// // const { data: { user } } = await _supabase.auth.getUser(accessToken)
// // if(accessToken == null || accessToken == '' || accessToken == undefined) {
// //   document.body.innerHTML = 'fatal error <a href="' + window.location.hostname + 'logon.html">you should log in</a>';
// // }
// // // const { data, error } = await _supabase
// // // .from('secret')
// // // .select()
// // // var keys = [];
// // // var udid = [];
// // // if(error !== null) {
// // //   document.body.innerHTML = 'segmentation fault (omg c reference)';
// // // }
// // // for(var i = 0; i < data.length; i++) {
// // //   keys[i] = data[i].secrets;
// // //   udid[i] = data[i].udid;
// // // }
// // // console.log(localStorage.getItem('uuid'));
// // // if((keys.indexOf(user.user_metadata.secret_key)==-1) && udid.indexOf(localStorage.getItem('uuid'))!=-1) {
// // //   document.body.innerHTML = errors[randomNumber(0, error.length-1)];
// // // }
// //   } catch (e) {
// //     document.body.innerHTML = e + '<br><br><br><a href="' + window.location.hostname + 'logon.html">you should log in</a>';
// //   }
//     try {
//         var accessToken = getCookie("data");

//         if(accessToken == null || accessToken == '' || accessToken == undefined) {
//             document.body.innerHTML = 'fatal error <a href="' + window.location.hostname + 'logon.html">you should log in</a>';
//         }

//         let errors = ["727 wysi", 'owo whats this', 'uwu', ':3', ':(', 'there was supposed to be an error message here but i forgot it', 'balls', 'uh oh this wasnt supposed to happen', 'press ctrl+shift+q+q to continue', 'error 69420', 'running cpuset failed', 'starting gpu failed', 'printer broken']
//         // document.body.innerHTML = errors[randomNumber(0, errors.length-1)];

//         const { data: { user } } = await _supabase.auth.getUser(accessToken)

//         const key = user.user_metadata.secret_key;
//         document.innerHTML = errors[randomNumber(0, errors.length-1)];
//         if(!keyExists(key) || !compareUUID(key)) {
//             var client = new XMLHttpRequest();
//             client.open('GET', '/sciencemainpage.html');
//             client.onreadystatechange = function() {
//                document.body.innerHTML = client.responseText;
//             }
//             client.send();
//             document.body.innerHTML = errors[randomNumber(0, errors.length-1)];
//         }
//         const elements = document.getElementsByClassName('imagebutton');
//         if(await getLevelFromKey_VerifyUDID(key) == 2) {
//           for(var i = 0; i < elements.length; i++) {
//             if(elements[i].classList.contains("level3")) {
//               elements[i].style.display = 'none';
//             }
//           }
//         } else if(await getLevelFromKey_VerifyUDID(key) == 1) {
//           for(var i = 0; i < elements.length; i++) {
//             if(elements[i].classList.contains("level2") || elements[i].classList.contains("level3")) {
//               elements[i].style.display = 'none';
//             }
//           }
//         }

        
//     } catch(e) {
//         document.body.innerHTML = e + '<br><br><br><a href="' + window.location.hostname + 'logon.html">you should log in</a>';
//     }
// }


// function randomNumber(min, max) { 
//   return Math.floor(Math.random() * (max - min) + min);
// } 
// main();

