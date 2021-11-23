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
