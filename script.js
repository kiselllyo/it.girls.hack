// --------- Translations (EN / KZ / RU) -----------
const content = {
  en: {
    loaderQuote: "“I code because it's a way to make ideas real. — a woman in tech”",
    mainQuote: "Empowering young women through technology, creativity and teamwork.",
    about: `AIS Hack is an annual hackathon organized by Aqbobek International School.
    
Goal of the hackathon: IT Girls is an AIS Hackathon designed to empower and support the next generation of women leaders in IT by providing access and opportunities to advance skills such as teamwork, critical thinking, creativity, and programming, creating a community contributing to social issues. IT Girls encourages young women's development in the IT field.`,
    themeEducation: "Education: projects improving learning and access in Kazakhstan.",
    themeHealth: "Health: solutions for wellbeing and access to healthcare.",
    themeSafety: "Safety: ideas that protect and support young women.",
    countdownLabel: "Time left until project defense:",
    submitSuccess: "Registration submitted — thank you! You'll get confirmation by email.",
    submitError: "Submission error. Please try again later."
  },
  kz: {
    loaderQuote: "«Мен код жазамын, өйткені ол идеяларды шындыққа айналдыру жолы.» — IT-саласында әйел",
    mainQuote: "Технология, шығармашылық және команда арқылы жас қыздарды қолдау.",
    about: `AIS Hack — бұл Aqbobek International School ұйымдастыруымен өткізілетін жыл сайынғы хакатон.
    
Хакатонның мақсаты: IT Girls — жас көшбасшы қыздарды қолдау үшін арналған AIS Hackathon. Бұл іс-шара командалық жұмыс, сыни ойлау, шығармашылық және бағдарламалау дағдыларын дамытуға мүмкіндік береді, сондай-ақ әлеуметтік мәселелерге бағытталған қауымдастық құруға көмектеседі.`,
    themeEducation: "Білім: Қазақстандағы оқуға және қолжетімділікке арналған шешімдер.",
    themeHealth: "Денсаулық: әл-ауқат пен медициналық қызметтерге қол жеткізу.",
    themeSafety: "Қауіпсіздік: жас қыздарды қорғауға бағытталған идеялар.",
    countdownLabel: "Жобаларды қорғауға дейін қалған уақыт:",
    submitSuccess: "Тіркелу жіберілді — рақмет! Растау электрондық пошта арқылы келеді.",
    submitError: "Жіберу қатесі. Кейінірек қайталап көріңіз."
  },
  ru: {
    loaderQuote: "«Я программирую, потому что так идеи становятся реальностью.» — женщина в IT",
    mainQuote: "Поддерживаем девушек через технологии, творчество и командную работу.",
    about: `AIS Hack — ежегодный хакатон, организуемый Международной школой Aqbobek.
    
Цель хакатона: IT Girls создан для поддержки следующего поколения женщин-лидеров в IT, предоставляя возможности развивать командную работу, критическое мышление, креативность и программирование, а также создавать сообщество, работающее над социально значимыми задачами.`,
    themeEducation: "Образование: проекты для улучшения обучения и доступа в Казахстане.",
    themeHealth: "Здоровье: решения для благополучия и доступа к медицине.",
    themeSafety: "Безопасность: идеи для защиты и поддержки молодых девушек.",
    countdownLabel: "Осталось до защиты проектов:",
    submitSuccess: "Регистрация отправлена — спасибо! Подтверждение придёт на почту.",
    submitError: "Ошибка отправки. Попробуйте позже."
  }
};

// initial language
let lang = 'en';

// elements
const loader = document.getElementById('loader');
const loaderQuote = document.getElementById('loader-quote');
const main = document.getElementById('main');
const mainQuote = document.getElementById('main-quote');
const aboutText = document.getElementById('about-text');
const countdownEl = document.getElementById('countdown-timer');
const countdownLabel = document.querySelector('.countdown div');
const form = document.getElementById('reg-form');
const formStatus = document.getElementById('form-status');

function setLanguage(l){
  lang = l;
  // loader & main text
  loaderQuote.textContent = content[lang].loaderQuote;
  mainQuote.textContent = content[lang].mainQuote;
  aboutText.textContent = content[lang].about;
  countdownLabel.textContent = content[lang].countdownLabel;
}
setLanguage(lang);

// language buttons
document.querySelectorAll('.lang-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.lang-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    setLanguage(btn.dataset.lang);
  });
});

// Simulate loader then show site with typewriter quote animation
function typeWriter(target, text, delay=40){
  target.textContent = '';
  let i=0;
  const interval = setInterval(()=>{
    target.textContent += text.charAt(i);
    i++;
    if(i>=text.length) clearInterval(interval);
  }, delay);
}

// Show loader for 1.4s then reveal (you can increase time if you want)
setTimeout(()=>{
  // typewriter inside loader then hide
  typeWriter(loaderQuote, content[lang].loaderQuote, 35);
}, 120);

setTimeout(()=>{
  loader.style.display='none';
  main.classList.remove('hidden');
  // typewriter for main quote
  typeWriter(document.getElementById('main-quote'), content[lang].mainQuote, 28);
  // fade-in sections
  document.querySelectorAll('.section, .hero').forEach((s,i)=>{
    s.style.animation = `fadeIn .6s ease ${i*0.12}s both`;
  });
}, 1600);

// Countdown — target 28 Sep 2025 12:00 Asia/Aqtobe
// NOTE: Aktobe is UTC+5. We compute target UTC time accordingly:
function getTargetUTC(){
  // 2025-09-28 12:00 in Aqtobe (UTC+5) -> UTC = 07:00
  return Date.UTC(2025, 8, 28, 7, 0, 0); // months are 0-indexed: 8 => September
}

function updateCountdown(){
  const now = Date.now();
  const diff = getTargetUTC() - now;
  if(diff <= 0){
    countdownEl.textContent = '00d 00h 00m 00s';
    return;
  }
  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  const m = Math.floor((diff % (1000*60*60)) / (1000*60));
  const s = Math.floor((diff % (1000*60)) / 1000);
  countdownEl.textContent = `${String(d).padStart(2,'0')}d ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`;
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Smooth section buttons
document.querySelectorAll('.section-btn').forEach(b=>{
  b.addEventListener('click', ()=> {
    const target = document.getElementById(b.dataset.target);
    if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Form submit — POST to backend
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  formStatus.textContent = 'Sending...';
  const fd = new FormData(form);
  const payload = {};
  fd.forEach((v,k)=> payload[k]=v);
  // add language and timestamp
  payload.lang = lang;
  payload.timestamp = new Date().toISOString();

  try{
    const res = await fetch('/api/register', {
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    if(res.ok){
      formStatus.textContent = content[lang].submitSuccess;
      form.reset();
    } else {
      const data = await res.json().catch(()=>null);
      formStatus.textContent = data?.error || content[lang].submitError;
    }
  } catch(err){
    formStatus.textContent = content[lang].submitError;
    console.error(err);
  }
});