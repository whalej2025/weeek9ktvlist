(function(){
  var data=window.KTV_DATA||[],cur=data[0]&&data[0].id,
      tabs=document.getElementById('tabs'),list=document.getElementById('list'),
      desc=document.getElementById('desc'),q=document.getElementById('q');
  function render(){
    var kw=q.value.trim().toLowerCase(),cats=kw?data:data.filter(function(c){return c.id===cur});
    list.innerHTML='';desc.textContent=kw?'搜尋結果（所有分類）':(cats[0]?cats[0].desc:'');
    var n=0;
    cats.forEach(function(c){c.songs.forEach(function(s){
      if(kw&&(s.title+s.artist).toLowerCase().indexOf(kw)<0)return;
      var li=document.createElement('li'),b=document.createElement('b'),sp=document.createElement('span');
      b.textContent=s.title;sp.textContent=s.artist;li.append(b,sp);list.appendChild(li);n++;
    })});
    if(!n){var e=document.createElement('li');e.className='empty';e.textContent='找不到符合的歌';list.appendChild(e)}
  }
  data.forEach(function(c){
    var btn=document.createElement('button');btn.textContent=c.title;
    btn.onclick=function(){cur=c.id;q.value='';[].forEach.call(tabs.children,function(x){x.classList.remove('on')});btn.classList.add('on');render()};
    if(c.id===cur)btn.classList.add('on');tabs.appendChild(btn);
  });
  q.addEventListener('input',render);render();
})();
