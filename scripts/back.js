// إعداد Canvas
const canvas = document.getElementById('ai-network');
const ctx = canvas.getContext('2d');

// ضبط الحجم
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// قيم المتغيرات بناءً على عرض الشاشة
let pointCount = window.innerWidth < 890 ? 13 : 80;
let radius = window.innerWidth < 890 ? 180 : 380;

let points = [];
const minDistance = 50; // المسافة الدنيا بين النقاط

// تحديد منطقة الاستثناء (المنطقة الملونة)
const centerX = canvas.width / 2; // مركز الدائرة
const centerY = canvas.height / 2;

// إنشاء النقاط بشكل عشوائي خارج المنطقة الملونة
for (let i = 0; i < pointCount; i++) {
  let x, y, distFromCenter;
  do {
    x = Math.random() * canvas.width;
    y = Math.random() * canvas.height;
    distFromCenter = Math.hypot(x - centerX, y - centerY);
  } while (distFromCenter < radius); // إعادة المحاولة إذا كانت النقطة داخل المنطقة الملونة

  points.push({
    x: x,
    y: y,
    vx: (Math.random() - 0.5) * 0.5, // سرعة بطيئة
    vy: (Math.random() - 0.5) * 0.5, // سرعة بطيئة
  });
}

// رسم الخطوط بين النقاط
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];

    // التحقق من المسافة للنقطة من مركز الدائرة
    const distFromCenter = Math.hypot(p1.x - centerX, p1.y - centerY);

    // تأثير الارتداد عند حافة الدائرة
    if (distFromCenter < radius) {
      const angle = Math.atan2(p1.y - centerY, p1.x - centerX); // زاوية الاتجاه من المركز
      // عكس السرعة للخروج من الدائرة
      p1.vx = Math.cos(angle) * 0.5; // تطبيق السرعة البطيئة
      p1.vy = Math.sin(angle) * 0.5; // تطبيق السرعة البطيئة
    }

    // منع التداخل بين النقاط
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue; // تخطي النقطة نفسها
      const p2 = points[j];
      const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);

      if (dist < minDistance) {
        // تعديل السرعة لإبعاد النقاط
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        p1.vx -= Math.cos(angle) * 0.02;
        p1.vy -= Math.sin(angle) * 0.02;
        p2.vx += Math.cos(angle) * 0.02;
        p2.vy += Math.sin(angle) * 0.02;
      }
    }

    // رسم النقطة
    ctx.beginPath();
    ctx.arc(p1.x, p1.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(206, 202, 202, 0.753)"; // لون النقاط
    ctx.fill();

    // رسم الخطوط بين النقاط إذا كانت خارج المنطقة المستثناة
    for (let j = i + 1; j < points.length; j++) {
      const p2 = points[j];
      const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);

      const distP2FromCenter = Math.hypot(p2.x - centerX, p2.y - centerY);
      if (distFromCenter < radius || distP2FromCenter < radius) continue;

      if (dist < 150) {
        ctx.strokeStyle = `rgba(128, 128, 128, ${1 - dist / 150})`; // لون رمادي شفاف
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }

    // تحديث موقع النقطة
    p1.x += p1.vx;
    p1.y += p1.vy;

    // إبقاء النقاط داخل الشاشة
    if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
    if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;
  }

  requestAnimationFrame(draw);
}

// بدء الرسم
draw();






const gradientElement = document.querySelector('.framer-auj29s');
let currentAngle = 0; // زاوية البداية
const motionRadius = 48; // نصف قطر الحركة
const motionCenterX = 50; // مركز الحركة X
const motionCenterY = 50; // مركز الحركة Y
const motionSpeed = 1; // سرعة الحركة

function animateRadialGradient() {
  // حساب الموقع الجديد باستخدام الصيغ الدائرية
  const gradientX = motionCenterX + motionRadius * Math.cos((currentAngle * Math.PI) / 180); // موقع X
  const gradientY = motionCenterY + motionRadius * Math.sin((currentAngle * Math.PI) / 180); // موقع Y

  // تحديث الخلفية مع الموقع الجديد (انتشار قصير)
  gradientElement.style.background = `radial-gradient(
    circle at ${gradientX}% ${gradientY}%,
    rgba(255, 255, 255, 0.8) 0%, /* مركز التدرج */
    rgba(0, 0, 0, 0) 20% /* حدود التدرج */
  )`;

  currentAngle = (currentAngle + motionSpeed) % 360; // زيادة الزاوية لضمان الحركة المستمرة

  // تكرار الحركة
  requestAnimationFrame(animateRadialGradient);
}

// بدء الحركة
animateRadialGradient();

document.addEventListener('DOMContentLoaded', () => {
        const tabs = document.querySelectorAll('.tab');
        const contents = document.querySelectorAll('.content');
        const tabIndicator = document.querySelector('.tab-indicator');

        function setTabIndicator(tab) {
            tabIndicator.style.width = `${tab.offsetWidth}px`;
            tabIndicator.style.left = `${tab.offsetLeft}px`;
        }

        setTabIndicator(tabs[0]); // Set initial position

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                const contentId = tab.getAttribute('data-tab');
                const content = document.querySelector(`.content[data-content="${contentId}"]`);
                content.classList.add('active');

                // Animate the tab indicator
                setTabIndicator(tab);

                // Reset and trigger animations for content
                const contentDivs = content.querySelectorAll('.content-left, .content-right');
                contentDivs.forEach(div => {
                    div.style.animation = 'none';
                    div.offsetHeight; // Trigger reflow
                    div.style.animation = null;
                });
            });
        });
    });


document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".scroll-animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
});
