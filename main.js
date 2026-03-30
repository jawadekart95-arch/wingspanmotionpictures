document.querySelector('.hamburger').addEventListener('click',function(){document.querySelector('.mobile-menu').classList.toggle('open')});

// Carousel
(function(){
  var track=document.querySelector('.carousel-track');
  if(!track)return;
  var slides=[].slice.call(track.querySelectorAll('.carousel-slide'));
  var thumbsWrap=document.querySelector('.carousel-thumbs');
  var counterCurrent=document.querySelector('.carousel-current');
  var counterTotal=document.querySelector('.carousel-total');
  var current=0;
  var total=slides.length;
  if(counterTotal)counterTotal.textContent=total;

  // Build thumbnails
  slides.forEach(function(slide,i){
    var img=slide.querySelector('img');
    var thumb=document.createElement('div');
    thumb.className='carousel-thumb'+(i===0?' active':'');
    var tImg=document.createElement('img');
    tImg.src=img.src;
    tImg.alt=img.alt;
    tImg.loading='lazy';
    thumb.appendChild(tImg);
    thumb.addEventListener('click',function(){goTo(i)});
    thumbsWrap.appendChild(thumb);
  });

  function goTo(n){
    current=(n+total)%total;
    track.style.transform='translateX(-'+current*100+'%)';
    var thumbs=[].slice.call(thumbsWrap.querySelectorAll('.carousel-thumb'));
    thumbs.forEach(function(t,i){t.classList.toggle('active',i===current)});
    if(counterCurrent)counterCurrent.textContent=current+1;
    // scroll active thumb into view
    var activeThumb=thumbs[current];
    if(activeThumb)activeThumb.scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'});
  }

  document.querySelector('.carousel-prev').addEventListener('click',function(){goTo(current-1)});
  document.querySelector('.carousel-next').addEventListener('click',function(){goTo(current+1)});

  // Keyboard navigation
  document.addEventListener('keydown',function(e){
    var gallery=document.getElementById('gallery');
    if(!gallery)return;
    var rect=gallery.getBoundingClientRect();
    if(rect.top>window.innerHeight||rect.bottom<0)return;
    if(e.key==='ArrowLeft')goTo(current-1);
    if(e.key==='ArrowRight')goTo(current+1);
  });

  // Touch/swipe
  var touchStartX=0;
  track.addEventListener('touchstart',function(e){touchStartX=e.touches[0].clientX},{passive:true});
  track.addEventListener('touchend',function(e){
    var dx=e.changedTouches[0].clientX-touchStartX;
    if(Math.abs(dx)>50){dx<0?goTo(current+1):goTo(current-1)}
  });
})();
