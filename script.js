(function(){
  document.getElementById('year').textContent = new Date().getFullYear();
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- scroll progress ---------- */
  var progress = document.getElementById('scrollProgress');
  function updateProgress(){
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    progress.style.width = pct + '%';
  }
  document.addEventListener('scroll', updateProgress, { passive:true });
  updateProgress();

  /* ---------- cursor glow ---------- */
  if(fine && !reduced){
    var glow = document.getElementById('cursorGlow');
    glow.classList.add('active');
    var gx=0, gy=0, tx=0, ty=0;
    window.addEventListener('mousemove', function(e){ tx=e.clientX; ty=e.clientY; });
    (function loop(){
      gx += (tx-gx)*0.15; gy += (ty-gy)*0.15;
      glow.style.transform = 'translate(' + gx + 'px,' + gy + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal3d, .reveal-stagger');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function(el){ io.observe(el); });

  /* ---------- count-up stats ---------- */
  var counts = document.querySelectorAll('.count');
  var countIo = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseFloat(el.dataset.target) || 0;
      countIo.unobserve(el);
      if(reduced){ el.textContent = target; return; }
      var start = performance.now(), dur = 1400;
      function step(now){
        var p = Math.min((now-start)/dur, 1);
        var eased = 1 - Math.pow(1-p, 3);
        el.textContent = Math.round(target*eased);
        if(p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  counts.forEach(function(el){ countIo.observe(el); });

  /* ---------- tilt + spotlight ---------- */
  if(fine && !reduced){
    document.querySelectorAll('.tilt').forEach(function(el){
      el.addEventListener('mousemove', function(e){
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left)/r.width, py = (e.clientY - r.top)/r.height;
        var rx = (py-0.5) * -8, ry = (px-0.5) * 8;
        el.style.transform = 'perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-2px)';
        el.style.setProperty('--mx', (px*100) + '%');
        el.style.setProperty('--my', (py*100) + '%');
        var img = el.querySelector('.proj-thumb img');
        if(img){ img.style.transform = 'scale(1.12) translate(' + ((px-0.5)*-14) + 'px,' + ((py-0.5)*-14) + 'px)'; }
      });
      el.addEventListener('mouseleave', function(){
        el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        var img = el.querySelector('.proj-thumb img');
        if(img){ img.style.transform = ''; }
      });
    });
    document.querySelectorAll('.btn').forEach(function(el){
      el.addEventListener('mousemove', function(e){
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', ((e.clientX-r.left)/r.width*100) + '%');
        el.style.setProperty('--my', ((e.clientY-r.top)/r.height*100) + '%');
      });
    });
  }

  /* ---------- typewriter role ---------- */
  var roles = ["Full-Stack Developer", "Data Analyst", "DSA Enthusiast", "Problem Solver"];
  var roleEl = document.getElementById('typedRole');
  if(reduced){
    roleEl.textContent = roles[0];
  } else {
    var ri=0, ci=0, deleting=false;
    (function tick(){
      var cur = roles[ri];
      if(!deleting){ ci++; if(ci>cur.length){ deleting=true; setTimeout(tick,1300); return; } }
      else { ci--; if(ci<0){ deleting=false; ri=(ri+1)%roles.length; ci=0; } }
      roleEl.textContent = cur.slice(0,ci);
      setTimeout(tick, deleting?35:75);
    })();
  }

  /* ---------- skill orbit ---------- */
  (function(){
    var stage = document.getElementById('orbitStage');
    if(!stage) return;
    var data = [
      {name:'C++', ring:0}, {name:'Java', ring:0}, {name:'Python', ring:0}, {name:'SQL', ring:0}, {name:'JavaScript', ring:0}, {name:'TypeScript', ring:0}, {name:'HTML', ring:0}, {name:'CSS', ring:0},
      {name:'React', ring:1}, {name:'Node.js', ring:1}, {name:'Next.js', ring:1}, {name:'Express.js', ring:1}, {name:'Pandas', ring:1}, {name:'NumPy', ring:1}, {name:'Tailwind CSS', ring:1},
      {name:'Tableau', ring:2}, {name:'Power BI', ring:2}, {name:'PostgreSQL', ring:2}, {name:'MongoDB', ring:2}, {name:'Git', ring:2}, {name:'Docker', ring:2}
    ];
    var ringCfg = [
      { rx:130, ry:44, speed:0.28, color:'var(--accent1)' },
      { rx:190, ry:66, speed:-0.20, color:'var(--accent2)' },
      { rx:250, ry:88, speed:0.15, color:'var(--accent3)' }
    ];
    var counts3 = [0,0,0];
    data.forEach(function(d){ d.idx = counts3[d.ring]++; });
    var totals = [0,0,0];
    data.forEach(function(d){ totals[d.ring] = Math.max(totals[d.ring], d.idx+1); });

    var els = data.map(function(d){
      var pill = document.createElement('div');
      pill.className = 'orbit-pill';
      var dot = document.createElement('span');
      dot.className = 'dot';
      dot.style.background = ringCfg[d.ring].color;
      pill.appendChild(dot);
      pill.appendChild(document.createTextNode(d.name));
      stage.appendChild(pill);
      d.angle0 = (d.idx / totals[d.ring]) * Math.PI * 2;
      d.el = pill;
      return d;
    });

    var scale = 1;
    function computeScale(){
      var w = stage.parentElement.clientWidth;
      scale = Math.min(1, w / 620);
    }
    computeScale();
    window.addEventListener('resize', computeScale);

    var t = 0;
    function frame(){
      t += reduced ? 0 : 0.016;
      els.forEach(function(d){
        var cfg = ringCfg[d.ring];
        var angle = d.angle0 + t * cfg.speed;
        var x = Math.cos(angle) * cfg.rx * scale;
        var y = Math.sin(angle) * cfg.ry * scale;
        var depth = (Math.sin(angle) + 1) / 2;
        var sc = 0.72 + depth * 0.46;
        d.el.style.transform = 'translate(-50%,-50%) translate(' + x + 'px,' + y + 'px) scale(' + sc + ')';
        d.el.style.opacity = 0.5 + depth * 0.5;
        d.el.style.zIndex = Math.round(depth * 100) + 1;
      });
      if(!reduced) requestAnimationFrame(frame);
    }
    frame();
  })();

  /* ---------- three.js hero scene ---------- */
  (function(){
    var heroSection = document.getElementById('heroSection');
    var canvas = document.getElementById('heroCanvas');
    if(!heroSection || !canvas || typeof THREE === 'undefined') return;

    var renderer, scene, camera, shellA, shellB, particles;
    try{
      renderer = new THREE.WebGLRenderer({ canvas:canvas, alpha:true, antialias:true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    }catch(e){ return; }

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06070c, 0.03);

    camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.set(0, 5, 34);
    camera.lookAt(0, 2, 0);

    var geoA = new THREE.IcosahedronGeometry(9, 1);
    shellA = new THREE.LineSegments(
      new THREE.EdgesGeometry(geoA),
      new THREE.LineBasicMaterial({ color:0x4ce7d6, transparent:true, opacity:0.85 })
    );
    shellA.position.y = 3;
    scene.add(shellA);

    var geoB = new THREE.IcosahedronGeometry(13, 1);
    shellB = new THREE.LineSegments(
      new THREE.EdgesGeometry(geoB),
      new THREE.LineBasicMaterial({ color:0x9b6bff, transparent:true, opacity:0.22 })
    );
    shellB.position.y = 3;
    scene.add(shellB);

    var grid = new THREE.GridHelper(240, 40, 0x9b6bff, 0x1b2030);
    grid.position.y = -12;
    grid.material.transparent = true;
    grid.material.opacity = 0.35;
    scene.add(grid);

    var COUNT = 260;
    var positions = new Float32Array(COUNT * 3);
    var pts = [];
    for(var i=0;i<COUNT;i++){
      var r = 15 + Math.random()*14;
      var theta = Math.random()*Math.PI*2;
      var phi = Math.acos((Math.random()*2)-1);
      var x = r*Math.sin(phi)*Math.cos(theta);
      var y = r*Math.sin(phi)*Math.sin(theta)*0.6 + 3;
      var z = r*Math.cos(phi);
      positions[i*3] = x; positions[i*3+1] = y; positions[i*3+2] = z;
      pts.push({x:x,y:y,z:z});
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
      color:0xdfffff, size:0.22, transparent:true, opacity:0.85, sizeAttenuation:true
    }));
    scene.add(particles);

    var linePositions = [];
    var maxLines = 200, lineCount = 0;
    outer:
    for(var a=0; a<COUNT; a++){
      for(var b=a+1; b<COUNT; b++){
        var dx=pts[a].x-pts[b].x, dy=pts[a].y-pts[b].y, dz=pts[a].z-pts[b].z;
        var d = Math.sqrt(dx*dx+dy*dy+dz*dz);
        if(d < 5.2){
          linePositions.push(pts[a].x,pts[a].y,pts[a].z, pts[b].x,pts[b].y,pts[b].z);
          lineCount++;
          if(lineCount>=maxLines) break outer;
        }
      }
    }
    var lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(linePositions), 3));
    var lines = new THREE.LineSegments(lGeo, new THREE.LineBasicMaterial({ color:0x4ce7d6, transparent:true, opacity:0.12 }));
    scene.add(lines);

    function resize(){
      var rect = heroSection.getBoundingClientRect();
      var w = rect.width, h = Math.max(rect.height, 480);
      camera.aspect = w/h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    resize();
    window.addEventListener('resize', resize);

    var mx=0, my=0;
    window.addEventListener('mousemove', function(e){
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    });

    function animate(){
      if(!reduced){
        shellA.rotation.y += 0.0022; shellA.rotation.x += 0.0009;
        shellB.rotation.y -= 0.0013; shellB.rotation.x -= 0.0006;
        particles.rotation.y += 0.0007;
        camera.position.x += ((mx*3) - camera.position.x) * 0.02;
        camera.position.y += ((5 - my*1.4) - camera.position.y) * 0.02;
        camera.lookAt(0,2,0);
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
  })();
})();
