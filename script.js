document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Animasi Pengisian Otomatis Skill Progress Bar
    const skillBars = document.querySelectorAll('.skill-progress-fill');
    
    const fillSkillsOnScroll = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            // Cek jika elemen bar sudah muncul di viewport/layar user
            if(rect.top < window.innerHeight && rect.bottom >= 0) {
                bar.style.width = bar.getAttribute('data-percent');
            }
        });
    };

    // 2. Navigasi Aktif Otomatis & Highlight Ketika di-Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    const highlightNavigation = () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 160;
            if (window.pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    };

    // Jalankan deteksi event scroll
    window.addEventListener('scroll', () => {
        fillSkillsOnScroll();
        highlightNavigation();
    });

    // 3. Sistem Modal Interaktif Detail Proyek
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const closeModalBtn = document.querySelector('.close-modal');

    // Menangani aksi klik tombol View Detail
    document.querySelectorAll('.open-proj').forEach(button => {
        button.addEventListener('click', () => {
            modalTitle.innerText = button.getAttribute('data-title');
            modalDesc.innerText = button.getAttribute('data-desc');
            modal.classList.add('active');
        });
    });

    // Menutup modal dengan tombol silang (X) atau klik di area luar popup
    closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
    window.addEventListener('click', (e) => { 
        if(e.target === modal) modal.classList.remove('active'); 
    });


    // Jalankan fungsi pengisian bar langsung saat reload pertama kali
    fillSkillsOnScroll();
});