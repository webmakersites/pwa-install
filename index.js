// UPDATE v1.0.1
// Register service worker to control making site work offline

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then(() => { console.log('Service Worker Registered'); });
}

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'inline-block';
  // alert("HEY, INSTALL ME!!")

  addBtn.addEventListener('click', () => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});

/* SIDENAV JS */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  document.body.style.backgroundColor = "white";
}
/* WEB SHARE API */
var shareObj = {
  text: (document.title),
    url: (window.location.href)

},
shareItem = {
    init: function(obj){
        if(navigator.share){
            console.log('Web Share API is Supported');
            navigator.share(obj).then(function(){
                console.log('Shared!', obj);
            }).catch(function(error){
                console.log('Not Shared! ', error);
              document.querySelector('#result').innerText = error;
            });
        }else{
            console.log('Web Share API is not Supported');
        }
    }
};

document.querySelector('.btn-share').addEventListener('click', function(e){
  e.preventDefault();
  shareItem.init(shareObj);
});
