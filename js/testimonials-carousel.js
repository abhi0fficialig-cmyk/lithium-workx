/* Testimonials carousel - shared with index.html (infinite loop, 3 cards desktop, 3s auto) */
        document.addEventListener('DOMContentLoaded', function() {
            var track = document.getElementById('testimonialsTrack');
            var viewport = document.querySelector('.testimonials-viewport');
            var prevBtn = document.getElementById('testimonialsPrev');
            var nextBtn = document.getElementById('testimonialsNext');
            var dotsWrap = document.getElementById('testimonialsDots');
            if (!track || !viewport) return;

            var originalSlides = Array.from(track.children);
            var totalOriginal = originalSlides.length; // 6
            var clonesCount = 3; // max visible for testimonials (3 desktop)
            var intervalMs = 3000;
            var timer = null;
            var isAnimating = false;

            // clones
            var fragBefore = document.createDocumentFragment();
            for (var i = totalOriginal - clonesCount; i < totalOriginal; i++) {
                var idx = (i + totalOriginal) % totalOriginal;
                var clone = originalSlides[idx].cloneNode(true);
                clone.classList.add('clone');
                fragBefore.appendChild(clone);
            }
            track.insertBefore(fragBefore, track.firstChild);

            var fragAfter = document.createDocumentFragment();
            for (var j = 0; j < clonesCount; j++) {
                var clone2 = originalSlides[j % totalOriginal].cloneNode(true);
                clone2.classList.add('clone');
                fragAfter.appendChild(clone2);
            }
            track.appendChild(fragAfter);

            var index = clonesCount;

            function getVisible() {
                var w = window.innerWidth;
                if (w >= 992) return 3;
                if (w >= 768) return 2;
                return 1;
            }
            function getSlideWidth() {
                return viewport.offsetWidth / getVisible();
            }
            function updateDotsActive() {
                var dots = dotsWrap.querySelectorAll('.testimonials-dot');
                var activeReal = (index - clonesCount) % totalOriginal;
                if (activeReal < 0) activeReal += totalOriginal;
                dots.forEach(function(d, i) { d.classList.toggle('active', i === activeReal); });
            }
            function setPosition(animate) {
                if (!animate) track.style.transition = 'none';
                else track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                var slideW = getSlideWidth();
                track.style.transform = 'translateX(-' + (index * slideW) + 'px)';
                updateDotsActive();
                if (!animate) { void track.offsetHeight; track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'; }
            }

            // dots - one per original slide
            dotsWrap.innerHTML = '';
            for (var d = 0; d < totalOriginal; d++) {
                var dot = document.createElement('button');
                dot.className = 'testimonials-dot' + (d === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Go to testimonial ' + (d+1));
                (function(idx){
                    dot.addEventListener('click', function(){
                        var realActive = (index - clonesCount) % totalOriginal;
                        if (realActive < 0) realActive += totalOriginal;
                        var diff = idx - realActive;
                        if (diff !== 0) { index += diff; setPosition(true); isAnimating = true; }
                        restart();
                    });
                })(d);
                dotsWrap.appendChild(dot);
            }

            function next() {
                if (isAnimating) return;
                isAnimating = true;
                index++;
                setPosition(true);
            }
            function prev() {
                if (isAnimating) return;
                isAnimating = true;
                index--;
                setPosition(true);
            }

            track.addEventListener('transitionend', function(){
                if (index >= clonesCount + totalOriginal) { index = clonesCount; setPosition(false); }
                else if (index < clonesCount) { index = clonesCount + totalOriginal - 1; setPosition(false); }
                isAnimating = false;
            });

            function start(){ stop(); timer = setInterval(next, intervalMs); }
            function stop(){ if(timer) clearInterval(timer); timer=null; }
            function restart(){ stop(); start(); }

            if (nextBtn) nextBtn.addEventListener('click', function(){ next(); restart(); });
            if (prevBtn) prevBtn.addEventListener('click', function(){ prev(); restart(); });

            var wrapper = document.querySelector('.testimonials-carousel-wrapper');
            if (wrapper) {
                wrapper.addEventListener('mouseenter', stop);
                wrapper.addEventListener('mouseleave', start);
                var startX = 0;
                wrapper.addEventListener('touchstart', function(e){ startX = e.touches[0].clientX; stop(); }, {passive:true});
                wrapper.addEventListener('touchend', function(e){
                    var diff = e.changedTouches[0].clientX - startX;
                    if (Math.abs(diff) > 40) { if(diff<0) next(); else prev(); }
                    start();
                }, {passive:true});
            }

            window.addEventListener('resize', function(){ setPosition(false); });

            setPosition(false);
            start();
        });
