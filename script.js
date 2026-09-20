// boot counter
var pct = 0;
var bootTimer = setInterval(function () {
  pct += Math.floor(Math.random() * 14) + 4;
  if (pct >= 100) {
    pct = 100;
    clearInterval(bootTimer);
    setTimeout(function () { document.getElementById('boot').className = 'done'; }, 250);
  }
  document.getElementById('pct').textContent = pct + '%';
}, 90);

// capaciblitirse and chips
var Capabilities = {
  'offensive security': [['nmap','Nmap'], ['metasploit','Metasploit_Project'], ['burp suite','Burp_Suite'], ['sql injection','SQL_injection'], ['xss','Cross-site_scripting']],
// ----------------------------------------
  'defensive security': [['log analysis','?Log analysis'], ['siem','Security_information_and_event_management'], ['incident response','Computer_security_incident_management'], ['zero trust','?Zero trust security model'], ['hardening','Hardening_(computing)']],
// ----------------------------------------
  'networking': [['tcp/ip','Internet_protocol_suite'], ['dns','Domain_Name_System'], ['wireshark','Wireshark'], ['firewalls','Firewall_(computing)']],
// ----------------------------------------
  'linux': [['arch linux','Arch_Linux'], ['hyprland','?Hyprland'], ['bash','Bash_(Unix_shell)'], ['quickshell','?Quickshell']],
// ----------------------------------------
  'programming': [['python','Python_(programming_language)'], ['javascript','JavaScript'], ['node.js','Node.js'], ['astro','?Astro web framework'], ['HTML','HTML']],
// ----------------------------------------
  'concepts': [['osint','Open-source_intelligence'], ['owasp top 10','OWASP'], ['threat modeling','Threat_model']]
};

function wikiUrl(t) {
  if (t.charAt(0) == '?') return 'https://en.wikipedia.org/w/index.php?search=' + encodeURIComponent(t.slice(1));
  return 'https://en.wikipedia.org/wiki/' + t;
}

function tags(list) {
  var h = '<div class="tags">';
  list.forEach(function (s) {
    h += '<a href="' + wikiUrl(s[1]) + '" target="_blank" rel="noopener">' + s[0] + '</a>';
  });
  return h + '</div>';
}

function CapabilitiesHtml() {
  var h = '';
  for (var group in Capabilities) {
    h += '<div class="row"><h3>' + group + '</h3>' + tags(Capabilities[group]) + '</div>';
  }
  return h;
}

var pages = {
  about: {
    cmd: 'cat about.txt',
    html:
      '<p>Also known online as <span class="green">timelesshrs</span>. Based in the United Arab Emirates, building a career in cyber.</p>' +

      '<div class="stats"><span class="label">uptime</span><span id="age"></span></div>' +

      '<p>I like breaking systems apart until I fully understand them, because that\'s the only way to find where they bleed.</p>' +

      '<p>I\'m now a Cybersecurity Engineering student at <span class="green">Abu Dhabi University</span>, and proud of it.</p>'
  },
  Capabilities: {
    cmd: 'ls Capabilities/',
    html: '' // down you go
  },
  projects: {
    cmd: 'ls projects/',
    html:
    // prjjc 1
      '<h3>terminal based portfolio</h3>' +
      '<p>A full portfolio with interactive chips and animations.</p>' +
      '<p class="took">⏱ time taken to create: 2 months</p>' +
      tags([['qml','QML'], ['quickshell','?Quickshell'], ['hyprland','?Hyprland'], ['bash','Bash_(Unix_shell)']]) +

    // prjjc 2
      '<h3>twilight desktop</h3>' +
      '<p>A full Arch + Hyprland desktop built from scratch. Custom panels for media, notifications, a Quran reader, prayer times and a pomodoro timer.</p>' +
      '<p class="took">⏱ time taken to create: 1 year (and still going)</p>' +
      tags([['qml','QML'], ['quickshell','?Quickshell'], ['hyprland','?Hyprland'], ['bash','Bash_(Unix_shell)']]) +

    // prjct 3
      '<h3>islamic pwa</h3>' +
      '<p>Offline-first app with prayer times, a full Quran reader and a task board.</p>' +
      '<p class="took">⏱ time taken to create: 5 months</p>' +
      tags([['javascript','JavaScript'], ['service workers','?Service worker']]) +

    // prcjt 4
      '<h3>ctf + lab work</h3>' +
      '<p>Web exploitation, privilege escalation and network enumeration on <span class="green">TryHackMe</span> and <span class="green">HackTheBox</span>. Writeups as I go.</p>' +
      tags([['tryhackme','?TryHackMe'], ['hackthebox','?Hack The Box'], ['kali linux','Kali_Linux'], ['python','Python_(programming_language)']])
  },
  certs: {
    cmd: 'cat certs.txt',
    html:
      '<p><span class="green">[done]</span> Cybersecurity Essentials <span class="dim">(Cisco NetAcad)</span></p>' +

      '<p><span style="color:#f0c95a">[doing]</span> CompTIA Security+</p>' +

      '<p><span style="color:#f0c95a">[doing]</span> Jr Penetration Tester <span class="dim">(<span class="green">TryHackMe</span>)</span></p>' +

      '<p><span class="dim">[later]</span> OSCP <span class="dim">(Offensive Security)</span></p>'
  },
  contact: {
    cmd: 'cat contact.txt',
    html:
      '<p>Open to chats and working together. Email is best, I reply within a day. (mostly)</p>' +
//email
      '<p><span class="label">email</span><a href="mailto:aamirizan.6@gmail.com">aamirizan.6@gmail.com</a></p>' +
//fartstagrm
      '<p><span class="label">insta</span><a href="https://instagram.com/11.izn" target="_blank" rel="noopener">@11.izn</a></p>' +
//disc
      '<p><span class="label">discord</span><span class="green">timelesshrs</span></p>'
  }
};
pages.Capabilities.html = CapabilitiesHtml();

var current = null;

function show(name) {
  if (current == name) { hide(); return; }
  current = name;
  document.getElementById('cmd').textContent = pages[name].cmd;
  document.getElementById('out-title').textContent = name;
  document.getElementById('content').innerHTML = pages[name].html;
  document.getElementById('content').scrollTop = 0;
  var c = document.getElementById('content');
  c.classList.remove('swap');
  void c.offsetWidth;
  c.classList.add('swap');
  document.getElementById('out').className = 'open';
  var btns = document.querySelectorAll('nav button');
  for (var i = 0; i < btns.length; i++) {
    btns[i].className = btns[i].getAttribute('data-page') == name ? 'on' : '';
  }
  tickAge();
}

function hide() {
  current = null;
  document.getElementById('cmd').textContent = '';
  document.getElementById('out').className = '';
  var btns = document.querySelectorAll('nav button');
  for (var i = 0; i < btns.length; i++) btns[i].className = '';
}

var btns = document.querySelectorAll('nav button');
for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = function () { show(this.getAttribute('data-page')); };
}
document.getElementById('x').onclick = hide;
document.onkeydown = function (e) { if (e.key == 'Escape') hide(); };

// live uptime (how long i been alive)
var BIRTH = new Date(2007, 0, 1, 0, 0, 0);

function pad(n) { return n < 10 ? '0' + n : n; }

function tickAge() {
  var el = document.getElementById('age');
  if (!el) return;
  var n = new Date();
  var y = n.getFullYear() - BIRTH.getFullYear();
  var m = n.getMonth() - BIRTH.getMonth();
  var d = n.getDate() - BIRTH.getDate();
  var h = n.getHours() - BIRTH.getHours();
  var mi = n.getMinutes() - BIRTH.getMinutes();
  var s = n.getSeconds() - BIRTH.getSeconds();
  if (s < 0) { s += 60; mi--; }
  if (mi < 0) { mi += 60; h--; }
  if (h < 0) { h += 24; d--; }
  if (d < 0) { d += new Date(n.getFullYear(), n.getMonth(), 0).getDate(); m--; }
  if (m < 0) { m += 12; y--; }
  el.innerHTML = y + 'y ' + m + 'm ' + d + 'd ' + pad(h) + ':' + pad(mi) + ':<span class="red">' + pad(s) + '</span>';
}
setInterval(tickAge, 1000);

// background "inspired" from DEADSHOT HAHHAHAHAHHAHHAAHHA
var canvas = document.getElementById('bg');
var ctx = canvas.getContext('2d');
var dots = [];
var mouse = { x: -999, y: -999 };
var W, H;

function setupBg() {
  var dpr = window.devicePixelRatio || 1;
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  var count = Math.min(110, Math.floor(W * H / 14000));
  dots = [];
  for (var i = 0; i < count; i++) {
    dots.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35
    });
  }
}

function drawBg() {
  ctx.clearRect(0, 0, W, H);

  // soft light under the cursor
  if (mouse.x > 0) {
    var g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 240);
    g.addColorStop(0, 'rgba(88, 216, 174, .10)');
    g.addColorStop(1, 'rgba(88, 216, 174, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  for (var i = 0; i < dots.length; i++) {
    var a = dots[i];
    a.x += a.vx;
    a.y += a.vy;
    if (a.x < 0) a.x = W;
    if (a.x > W) a.x = 0;
    if (a.y < 0) a.y = H;
    if (a.y > H) a.y = 0;

    // dots hate the cursor :(
    var mx = a.x - mouse.x;
    var my = a.y - mouse.y;
    var md = Math.sqrt(mx * mx + my * my);
    if (md < 150 && md > 0) {
      var push = (1 - md / 150) * 1.6;
      a.x += mx / md * push;
      a.y += my / md * push;
    }

    ctx.fillStyle = 'rgba(88, 216, 174, .55)';
    ctx.beginPath();
    ctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2);
    ctx.fill();

    // lines between dots that are close
    for (var j = i + 1; j < dots.length; j++) {
      var b = dots[j];
      var dx = a.x - b.x;
      var dy = a.y - b.y;
      var d = Math.sqrt(dx * dx + dy * dy);
      if (d < 120) {
        ctx.strokeStyle = 'rgba(88, 216, 174, ' + (1 - d / 120) * 0.2 + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    // and a line from the cursor to nearby dots
    if (md < 190) {
      ctx.strokeStyle = 'rgba(88, 216, 174, ' + (1 - md / 190) * 0.5 + ')';
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
  }

  if (!noMotion) requestAnimationFrame(drawBg);
}

var noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener('pointerdown', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener('pointerup', function (e) {
  if (e.pointerType != 'mouse') { mouse.x = -999; mouse.y = -999; }   // finger lifted
});
document.addEventListener('mouseleave', function () { mouse.x = -999; mouse.y = -999; });
window.addEventListener('resize', setupBg);

setupBg();
drawBg();
