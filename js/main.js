window.onload = () => {
    //Navigation
    const navigation = {
        init: function () {
            this.menuClick();
            this.subMenuClick();
            this.fixBugMenu();
        },
        menuClick: function () {
            const btn = document.querySelector('.nav__btn--reponsive');
            const nav = document.querySelector('.nav__navigation');
            const body = document.querySelector('body');
            const shadow = document.querySelector('.shadow');

            btn.addEventListener('click', () => {
                nav.classList.toggle('openMenu');
                shadow.classList.toggle('openMenu');

                let widthNav = nav.offsetWidth;

                if (nav.className.length == 28) {
                    body.style.left = `${widthNav}px`;
                } else {
                    body.style.left = '0';
                }
            });
        },
        subMenuClick: function () {
            const subBtn = document.querySelectorAll('.nav__submenu__btn');

            subBtn.forEach(item => item.addEventListener('click', (e) => {
                const self = e.target.parentNode;
                const subMenu = self.querySelector('.nav__submenu');
                subMenu.classList.toggle("openSubMenu");
            }));

            const backSubBtn = document.querySelectorAll('.nav__btn-submenu-back');
            backSubBtn.forEach(btn => btn.addEventListener('click', (e) => {
                const subMenu = document.querySelectorAll('.nav__submenu');
                subMenu.forEach(item => item.classList.remove('openSubMenu'));
            }));
        },
        fixBugMenu: function () {
            window.addEventListener('resize', () => {
                const body = document.querySelector('body');
                const nav = document.querySelector('.nav__navigation');
                let widthNav = nav.offsetWidth;

                if (window.innerWidth <= 991 && nav.className.length == 28) {
                    body.style.left = `${widthNav}px`;
                } else {
                    body.style.left = '0';
                }
            })
        },
    }
    navigation.init();

    //Infinity Slider
    const slider = {
        init: function () {
            this.infinitySlide('.subNav');
        },
        infinitySlide: function (e) {
            const subNav = document.querySelector(e);
            const slide = subNav.querySelector('#slide');
            const itemSlider = slide.querySelectorAll('.slider__item');

            let count = 1;
            let size = itemSlider[0].offsetWidth;

            slide.style.transform = `translateX(${-size * count}px)`;

            function nextSlide() {
                slide.style.transition = 'all 0.5s ease-in-out';
                count++;
                slide.style.transform = `translateX(${-size * count}px)`;
            }

            setInterval(nextSlide, 3000);

            slide.addEventListener('transitionend', () => {
                if (itemSlider[count].id === 'firstItem') {
                    slide.style.transition = 'none';
                    count = itemSlider.length - count;
                    slide.style.transform = `translateX(${-size * count}px)`;
                }
            });
        },
    }
    slider.init();

    //Tabs
    const tabs = {
        init: function () {
            this.clickTab();
            this.styleSelect();
        },

        clickTab: function () {
            const tabBtn = document.querySelectorAll('.tab__button');
            const tabPanel = document.querySelectorAll('.tab__panel');

            tabBtn.forEach(item => item.addEventListener('click', (e) => {
                const self = e.target;
                tabBtn.forEach(btn => btn.classList.remove('activeTab'));
                self.classList.add('activeTab');

                const panel = document.getElementById(self.dataset.text);
                tabPanel.forEach(tab => tab.classList.remove('activeTab'));
                panel.classList.add('activeTab');

            }));
        },

        styleSelect: function () {
            var x, i, j, selElmnt, a, b, c;
            x = document.getElementsByClassName("custom-select");
            for (i = 0; i < x.length; i++) {
                selElmnt = x[i].getElementsByTagName("select")[0];
                a = document.createElement("DIV");
                a.setAttribute("class", "select-selected");
                a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
                x[i].appendChild(a);
                b = document.createElement("DIV");
                b.setAttribute("class", "select-items select-hide");
                for (j = 1; j < selElmnt.length; j++) {
                    c = document.createElement("DIV");
                    c.innerHTML = selElmnt.options[j].innerHTML;
                    c.addEventListener("click", function (e) {
                        var y, i, k, s, h;
                        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                        h = this.parentNode.previousSibling;
                        for (i = 0; i < s.length; i++) {
                            if (s.options[i].innerHTML == this.innerHTML) {
                                s.selectedIndex = i;
                                h.innerHTML = this.innerHTML;
                                y = this.parentNode.getElementsByClassName("same-as-selected");
                                for (k = 0; k < y.length; k++) {
                                    y[k].removeAttribute("class");
                                }
                                this.setAttribute("class", "same-as-selected");
                                break;
                            }
                        }
                        h.click();
                    });
                    b.appendChild(c);
                }
                x[i].appendChild(b);
                a.addEventListener("click", function (e) {
                    e.stopPropagation();
                    closeAllSelect(this);
                    this.nextSibling.classList.toggle("select-hide");
                    this.classList.toggle("select-arrow-active");
                });
            }

            function closeAllSelect(elmnt) {
                var x, y, i, arrNo = [];
                x = document.getElementsByClassName("select-items");
                y = document.getElementsByClassName("select-selected");
                for (i = 0; i < y.length; i++) {
                    if (elmnt == y[i]) {
                        arrNo.push(i)
                    } else {
                        y[i].classList.remove("select-arrow-active");
                    }
                }
                for (i = 0; i < x.length; i++) {
                    if (arrNo.indexOf(i)) {
                        x[i].classList.add("select-hide");
                    }
                }
            }
            document.addEventListener("click", closeAllSelect);
        }
    };
    tabs.init();

    const grabSlider = {
        init: function () {
            this.grabSlide('.video');
            this.grabSlide('.post');

            this.infinitySlide('.video');
        },
        grabSlide: function (e) {
            const grabSlide = document.querySelector(e);
            const wrap = grabSlide.querySelector('#wrap');

            let isDown = false;
            let startX;
            let scrollLeft;
            

            wrap.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - wrap.offsetLeft;
                scrollLeft = wrap.scrollLeft;
            })
            wrap.addEventListener('mouseleave', () => {
                isDown = false;
            })
            wrap.addEventListener('mouseup', () => {
                isDown = false;
            })
            wrap.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - wrap.offsetLeft;
                const walk = x - startX;
                wrap.scrollLeft = scrollLeft - walk;
            })

        },
        infinitySlide : function (e) {
            const grabSlide = document.querySelector(e);
            const wrap = grabSlide.querySelector('#wrap');
            const slides = grabSlide.querySelectorAll('.video__post');

            let count = 0;
            let size = slides[0].offsetWidth;
            let isDown = false;

            function auto() {
                count++;
                wrap.style.scrollBehavior = 'smooth';
                wrap.scrollLeft = count * size;
                
                if (count == slides.length - 1) {
                    wrap.style.scrollBehavior = 'none';
                    count = 0;
                    wrap.scrollLeft = 0;
                }
            }
            setInterval(auto, 5000);
        }
    }
    grabSlider.init();

    const fixedItem = {
        init: function() {
            this.fixed();
        },
        fixed : function (e) {
            const item = document.querySelector('.post__middle .post__tab');
            const wrap = document.querySelector('.post');
            const top = wrap.offsetTop - 35;

            window.addEventListener('scroll', (e) => {
                if ((window.scrollY > top) && (window.scrollY < top + wrap.offsetHeight - item.offsetHeight -55)) {
                    item.style.position = 'fixed';
                    item.style.top = '55px';
                }
                else {
                    item.style.position = '';
                    item.style.top = wrap.offsetHeight - 700 + "px";
                }
                if (window.scrollY < top) {
                    item.style.position = '';
                    item.style.top = '';
                }
            })
        }
    }
    fixedItem.init();
}