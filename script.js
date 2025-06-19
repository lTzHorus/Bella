document.addEventListener('DOMContentLoaded', function() {
    // Filter panel functionality
    const filterBtn = document.getElementById('filterBtn');
    const filterPanel = document.getElementById('filterPanel');
    const closeFilter = document.querySelector('.close-filter');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const fabricCards = document.querySelectorAll('.fabric-card');
    
    // Open filter panel
    filterBtn.addEventListener('click', function() {
        filterPanel.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when panel is open
    });
    
    // Close filter panel
    closeFilter.addEventListener('click', function() {
        filterPanel.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close filter panel when clicking outside
    document.addEventListener('click', function(event) {
        if (filterPanel.classList.contains('active') && 
            !filterPanel.contains(event.target) && 
            event.target !== filterBtn) {
            filterPanel.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter fabric cards
            fabricCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Close the filter panel on mobile after selection
            if (window.innerWidth <= 768) {
                filterPanel.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Add animation delay for fabric cards initial load
    fabricCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });
    
    // Lazy loading images
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    }
});

