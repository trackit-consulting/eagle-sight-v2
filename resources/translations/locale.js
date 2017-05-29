var lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en';
var file = 'resources/translations/' + lang + '.js';
document.write('<script src="' + file + '"></script>');



document.write('<script src="' + file + '"></script>');

setTimeout(function(){ 

  if(localStorage.getItem('user-lang') != lang){

    location.reload();

  }
 }, 5000);

