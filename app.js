(function(){
  var data=window.KTV_DATA||[];
  function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
  var cards=document.getElementById('cards');
  if(cards){ // 首頁：由資料自動產生卡片
    data.forEach(function(c){
      var a=el('a','card');a.href='list.html?c='+encodeURIComponent(c.id);
      a.append(el('span','chip',c.tag||c.title),el('h3',null,c.icon+' '+c.title),el('p',null,c.desc),
        el('span','pill',c.songs.length+' 首'),el('span','btn','看歌單 →'));
      cards.appendChild(a);
    });
    var s=el('div','card soon');s.append(el('div',null,'🥚'),el('b',null,'更多歌單，陸續加入中…'));cards.appendChild(s);
    return;
  }
  var list=document.getElementById('list');
  if(!list)return;
  var id=new URLSearchParams(location.search).get('c');
  var cat=data.filter(function(c){return c.id===id})[0]||data[0];
  document.title=cat.title+'｜KTV 點歌指南';
  document.getElementById('tag').textContent=cat.tag||cat.title;
  document.getElementById('title').textContent=cat.icon+' '+cat.title;
  document.getElementById('desc').textContent=cat.desc;
  var q=document.getElementById('q');
  function render(){
    var kw=q.value.trim().toLowerCase();list.innerHTML='';var n=0;
    cat.songs.forEach(function(s){
      if(kw&&(s.title+s.artist).toLowerCase().indexOf(kw)<0)return;
      var li=el('li');li.append(el('b',null,s.title),el('span',null,s.artist));list.appendChild(li);n++;
    });
    if(!n)list.appendChild(el('li','empty','找不到符合的歌'));
  }
  q.addEventListener('input',render);render();
})();
