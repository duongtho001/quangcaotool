document.addEventListener('DOMContentLoaded', () => {

    // 1. Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.nav');

    mobileNavToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = mobileNavToggle.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close mobile nav when clicking on nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close nav menu on mobile
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileNavToggle.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    });

    // 3. Category Filter Tabs
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            productCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    // Simple animation reveal
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 4. Copy Phone Number to Clipboard
    const btnCopyPhone = document.getElementById('btnCopyPhone');
    const toast = document.getElementById('toastMessage');

    btnCopyPhone.addEventListener('click', () => {
        const phoneNumber = '0934415387';
        
        navigator.clipboard.writeText(phoneNumber).then(() => {
            // Show toast message
            toast.classList.add('show');
            
            // Hide toast after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }).catch(err => {
            console.error('Không thể copy số điện thoại: ', err);
            alert('Hotline Đường Thọ: 0934.415.387');
        });
    });

    // 5. Consultation Form Handling
    const consultationForm = document.getElementById('consultationForm');
    
    consultationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const userphone = document.getElementById('userphone').value.trim();
        const toolSelect = document.getElementById('toolSelect');
        const toolName = toolSelect.options[toolSelect.selectedIndex].text;
        const message = document.getElementById('message').value.trim();
        
        // Generate pre-filled Zalo message text
        let zaloMessage = `Xin chào Đường Thọ, tôi cần tư vấn tool AI:\n`;
        zaloMessage += `- Họ và tên: ${username}\n`;
        zaloMessage += `- SĐT / Zalo: ${userphone}\n`;
        zaloMessage += `- Tool quan tâm: ${toolName}\n`;
        if (message) {
            zaloMessage += `- Ghi chú thêm: ${message}`;
        }
        
        // Encode URI
        const encodedMsg = encodeURIComponent(zaloMessage);
        
        // Copy text to clipboard so they can paste it if needed
        navigator.clipboard.writeText(zaloMessage).then(() => {
            alert('Đã tạo xong thông tin đăng ký tư vấn và lưu vào bộ nhớ tạm. Hệ thống sẽ chuyển hướng bạn sang Zalo của Đường Thọ để gửi tin nhắn.');
            // Redirect to Zalo chat
            window.open('https://zalo.me/0934415387', '_blank');
        }).catch(() => {
            // If copy fails, still redirect
            window.open('https://zalo.me/0934415387', '_blank');
        });

        // Reset form
        consultationForm.reset();
    });
});

// 6. Modal Functions (declared globally so inline onclick works)
function openModal(id) {
    const modal = document.getElementById(`modal-${id}`);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable page scrolling
    }
}

function closeModal(id) {
    const modal = document.getElementById(`modal-${id}`);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable page scrolling
    }
}

// Close modal when pressing Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModals = document.querySelectorAll('.modal.active');
        activeModals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});
