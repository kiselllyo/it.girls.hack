// script.js
// Countdown target: 28 September 2025 12:00 (Astana / Kazakhstan time).
// We'll create date in UTC by building from components and offsetting to +06:00.
(function(){
  // Language dictionary
  const i18n = {
    en: {
      homeQuote: "IT.GIRLS encourages young women's development in IT field.",
      countdownLabel: "Time until project defense",
      registerBtn: "Register",
      miniTitle: "AIS Hack - Annual event",
      miniText: "AIS Hack is an annual hackathon organized by Aqbobek International School.",
      aboutTitle: "About",
      goalTitle: "Goal / Purpose",
      goalText: "IT Girls is an AIS Hackathon designed to empower and support the next generation of women leaders in IT by providing them opportunities to advance teamwork, critical thinking, creativity and programming.",
      themeTitle: "Theme",
      themeText: "To be announced — 25 September.",
      prizesTitle: "Prizes",
      prizesText: "To be announced on Instagram: @it.girls.ais",
      datesTitle: "Dates",
      datesText: "Registration: 18–25 September 2025\nTheme announcement: 25 September 2025\n3 days online development — 28 September: presentations",
      rulesTitle: "Participation",
      rule1: "Only girls can participate",
      rule2: "Ages 14–18 (grades 8–12)",
      rule3: "Teams of 2–4 people",
      rule4: "Registration fee: 1500 KZT per person",
      contactsTitle: "Contacts",
      addressLabel: "Address:",
      phoneLabel: "Phone:",
      instLabel: "Instagram:",
      hoursLabel: "Working hours:"
    },
    kz: {
      homeQuote: "IT.GIRLS encourages young women's development in IT field.",
      countdownLabel: "Жоба қорғауына дейінгі уақыт",
      registerBtn: "Тіркелу",
      miniTitle: "AIS Hack - жыл сайынғы шара",
      miniText: "AIS Hack — «Ақбөбек» халықаралық мектебі ұйымдастыратын жыл сайынғы хакатон.",
      aboutTitle: "Біз туралы",
      goalTitle: "Мақсаты",
      goalText: "IT Girls — IT саласындағы келешектегі әйел көшбасшыларын қолдауға және құзыреттілігін арттыруға бағытталған AIS Hackathon.",
      themeTitle: "Тақырып",
      themeText: "Тақырып 25 қыркүйекте жарияланады.",
      prizesTitle: "Жүлделер",
      prizesText: "Instagram-да жарияланады: @it.girls.ais",
      datesTitle: "Күндер",
      datesText: "Тіркеу: 18–25 қыркүйек 2025\nТақырып: 25 қыркүйек 2025\n3 күн — онлайн әзірлеу, 28 қыркүйек — қорғау күні",
      rulesTitle: "Қатысу шарттары",
      rule1: "Тек қыздар қатыса алады",
      rule2: "14–18 жаста (8–12 сынып)",
      rule3: "Командада 2–4 адам",
      rule4: "Тіркеу ақысы: 1500 KZT адамға",
      contactsTitle: "Байланыс",
      addressLabel: "Мекен-жай:",
      phoneLabel: "Телефон:",
      instLabel: "Инстаграм:",
      hoursLabel: "Жұмыс уақыты:"
    },
    ru: {
      homeQuote: "IT.GIRLS encourages young women's development in IT field.",
      countdownLabel: "Время до защиты проекта",
      registerBtn: "Регистрация",
      miniTitle: "AIS Hack — ежегодное событие",
      miniText: "AIS Hack — ежегодный хакатон, организуемый Международной школой Ақбөбек.",
      aboutTitle: "О нас",
      goalTitle: "Цель",
      goalText: "IT Girls — хакатон AIS, направленный на развитие и поддержку будущих женщин-лидеров в IT, предоставляя возможности для командной работы, критического мышления, творчества и программирования.",
      themeTitle: "Тема",
      themeText: "Тема будет объявлена 25 сентября.",
      prizesTitle: "Призы",
      prizesText: "Будут объявлены в Instagram: @it.girls.ais",
      datesTitle: "Даты",
      datesText: "Регистрация: 18–25 сентября 2025\nОбъявление темы: 25 сентября 2025\n3 дня онлайн разработки — 28 сентября: защита проектов",
      rulesTitle: "Условия участия",
      rule1: "Участвовать могут только девушки",
      rule2: "Возраст 14–18 лет (8–12 классы)",
      rule3: "Команды 2–4 человека",
      rule4: "Регистрационный взнос: 1500 KZT с человека",
      contactsTitle: "Контакты",
      addressLabel: "Адрес:",
      phoneLabel: "Телефон:",
      instLabel: "Инстаграм:",
      hoursLabel: "Часы работы:"
    }
  };

  // SET LANGUAGE
  let currentLang = localStorage.getItem('itgirls-lang') || 'en';
  setLanguage(currentLang);

  // Language buttons
  document.querySelectorAll('.lang-btn').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const lang = btn.dataset.lang;
      setLanguage(lang);
      document.querySelectorAll('.lang-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      localStorage.setItem('itgirls-lang', lang);
    });
    if(btn.dataset.lang === currentLang) btn.classList.add('active');
  });

  // Apply translations
  function setLanguage(lang){
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.dataset.i18n;
      const text = (i18n[lang] && i18n[lang][key]) ? i18n[lang][key] : '';
      // preserve line breaks
      el.innerHTML = text.replace(/\n/g,'<br>');
    });
  }

  // Countdown
  const countdownEl = document.getElementById('countdown');

  function updateCountdown(){
    // Target: 2025-09-28 12:00 (Asia/Almaty/Astana = UTC+6)
    // Build a date in UTC by subtracting 6 hours
    const targetLocal = new Date(Date.UTC(2025,8,28,12-6,0,0)); // monthIndex 8 = September
    const now = new Date();
    const diff = targetLocal - now;
    if(diff <= 0){
      countdownEl.innerText = "00d 00h 00m 00s";
      return;
    }
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((diff % (1000*60)) / 1000);
    countdownEl.innerText = `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  }
  function pad(n){ return String(n).padStart(2,'0') }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Loader + typing quote animation (English)
  const loader = document.getElementById('loader');
  const typingEl = document.getElementById('typing');
  const fullQuote = "“Code the future — together.” — a young developer";
  // typing effect
  let idx = 0;
  function typeNext(){
    if(idx <= fullQuote.length){
      typingEl.textContent = fullQuote.slice(0, idx);
      idx++;
      setTimeout(typeNext, 40);
    } else {
      // after typing finished, hide loader after short delay
      setTimeout(()=> {
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        setTimeout(()=>loader.remove(),400);
      }, 600);
    }
  }
  // start typing when DOM ready
  document.addEventListener('DOMContentLoaded', ()=> {
    // small delay to let the page paint
    setTimeout(typeNext, 400);
  });

  // Small entrance animations for panels when in view
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(ent=>{
      if(ent.isIntersecting){
        ent.target.style.transform = 'none';
        ent.target.style.opacity = '1';
        ent.target.style.transition = 'transform 600ms ease, opacity 600ms ease';
      }
    });
  }, {threshold:0.15});
  document.querySelectorAll('.panel, .card, .hero-quote').forEach(el=>{
    el.style.transform = 'translateY(12px)';
    el.style.opacity = '0';
    observer.observe(el);
  });

})();

