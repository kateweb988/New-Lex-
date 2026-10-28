window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});
document.addEventListener("DOMContentLoaded", () => {
  var accordeonButtons = document.getElementsByClassName("accordeon__button");

  //пишем событие при клике на кнопки - вызов функции toggle
  for (var i = 0; i < accordeonButtons.length; i++) {
    var accordeonButton = accordeonButtons[i];

    accordeonButton.addEventListener("click", toggleItems, false);
  }

  //пишем функцию
  function toggleItems() {

    // переменная кнопки(актульная) с классом
    var itemClass = this.className;

    // добавляем всем кнопкам класс close
    for (var i = 0; i < accordeonButtons.length; i++) {
      accordeonButtons[i].className = "accordeon__button closed";
    }

    // закрываем все открытые панели с текстом
    var pannels = document.getElementsByClassName("accordeon__panel");
    for (var z = 0; z < pannels.length; z++) {
      pannels[z].style.maxHeight = 0;
    }

    // проверка. если кнопка имеет класс close при нажатии
    // к актуальной(нажатой) кнопке добававляем активный класс
    // а панели - которая находится рядом задаем высоту
    if (itemClass == "accordeon__button closed") {
      this.className = "accordeon__button active";
      var panel = this.nextElementSibling;
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

  }
});
document.querySelectorAll('.accordion-toggle').forEach(button => {
	button.addEventListener('click', function (e) {
		e.preventDefault();
		e.stopPropagation();

		const parent = this.closest('.has-submenu');
		parent.classList.toggle('active');

		this.textContent = parent.classList.contains('active') ? '−' : '+';
	});
});
document.addEventListener('DOMContentLoaded', function () {

    $('.articmodal-close').on('click', function (e) {
        e.preventDefault();

        $.arcticmodal('close', {
            speed: 0
        });
    });

    // Универсальное открытие модалок
    $('[data-modal]').on('click', function (e) {
        e.preventDefault();

        const modal = $(this).data('modal');

        $(modal).arcticmodal({
            openEffect: {
                type: 'none',
                speed: 0
            },
            closeEffect: {
                type: 'none',
                speed: 0
            }
        });
    });

});
document.addEventListener("DOMContentLoaded", function () {

	const slider = document.querySelector(".info__slider");

	if (!slider) return;


	const pages = slider.querySelectorAll(".swiper-slide");


	let swiper = null;


	function initSwiper() {

		if (window.innerWidth >= 992) {

			if (!swiper) {

				swiper = new Swiper(slider, {

					slidesPerView: 1,

					speed: 600,

					spaceBetween: 20,

					navigation: {
						nextEl: document.querySelector(".info-next"),
						prevEl: document.querySelector(".info-prev"),
					},

				});

			}

		} else {

			if (swiper) {

				swiper.destroy(true, true);
				swiper = null;

			}

		}

	}


	initSwiper();


	window.addEventListener("resize", function () {
		initSwiper();
	});


});
document.addEventListener("DOMContentLoaded", () => {
  $(document).ready(function () {
    $('[data-submit]').on('click', function (e) {
      e.preventDefault();
      $(this).parents('form').submit();
    })
    $.validator.addMethod(
      "regex",
      function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
      },
      "Please check your input."
    );
    function valEl(el) {

      el.validate({
        rules: {
          tel: {
            required: true,
            regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
          },
          name: {
            required: true
          },
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          tel: {
            required: 'Заполните поле',
            regex: 'Телефон может содержать символы + - ()'
          },
          name: {
            required: 'Заполните поле',
          },
          text: {
            required: 'Заполните поле',
          },
          email: {
            required: 'Заполните поле',
            email: 'Неверный формат E-mail'
          }
        },
        submitHandler: function (form) {
          $('#loader').fadeIn();
          var $form = $(form);
          var $formId = $(form).attr('id');
          switch ($formId) {
            case 'popupResult':
              $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
              })
                .always(function (response) {
                  setTimeout(function () {
                    $('#loader').fadeOut();
                  }, 800);
                  setTimeout(function () {
                    $.arcticmodal('close');
                    $('#popup-thank').arcticmodal({});
                    $form.trigger('reset');
                    //строки для остлеживания целей в Я.Метрике и Google Analytics
                  }, 1100);

                });
              break;
          }
          return false;
        }
      })
    }

    $('.js-form').each(function () {
      valEl($(this));
    });
    $('[data-scroll]').on('click', function () {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'data-scroll')).offset().top
      }, 2000);
      event.preventDefault();
    })
  });
});
document.addEventListener('DOMContentLoaded', function () {

    const sliders = document.querySelectorAll('.custom-range');
    const priceElement = document.querySelector('.calc__area p');

    // Настройки ползунков
    const settings = [
        {
            min: 0,
            max: 40,
            step: 1,
            type: 'employees',
            price: 3000
        },
        {
            min: 0,
            max: 40,
            step: 1,
            type: 'employees',
            price: 6000
        },
        {
            min: 0,
            max: 20,
            step: 1,
            type: 'docs',
            price: 25000
        }
    ];

    // Настраиваем ползунки
    sliders.forEach((slider, index) => {

        slider.min = settings[index].min;
        slider.max = settings[index].max;
        slider.step = settings[index].step;

        // Начальные значения
        slider.value = settings[index].min;

    });

    function updateSlider(slider, index) {

        const value = slider.parentElement.querySelector('.slider-value');

        const min = Number(slider.min);
        const max = Number(slider.max);
        const current = Number(slider.value);

        const percent = ((current - min) / (max - min)) * 100;

        // Текст над ползунком
        if (settings[index].type === 'percent') {
            value.textContent = current === max ? '40+%' : current + '%';
        } else if (settings[index].type === 'employees') {
            value.textContent = current === max ? '40+' : current;
        } else {
            value.textContent = current === max ? '20+' : current;
        }

        // Закрашиваем пройденную часть
        slider.style.background = `
            linear-gradient(
                to right,
                #FFD41D 0%,
                #FFD41D ${percent}%,
                #ddd ${percent}%,
                #ddd 100%
            )
        `;
    }

    function updatePrice() {

        let total = 0;

        sliders.forEach((slider, index) => {

            total += Number(slider.value) * settings[index].price;

        });

        priceElement.innerHTML = `
            Стоимость: ${total.toLocaleString('ru-RU')} <span>/Руб</span>
        `;
    }

    sliders.forEach((slider, index) => {

        updateSlider(slider, index);

        slider.addEventListener('input', function () {

            updateSlider(slider, index);
            updatePrice();

        });

    });

    // Начальная стоимость
    updatePrice();

});
document.addEventListener('DOMContentLoaded', function () {
  const swiper1 = new Swiper('.swiper1', {
    slidesPerView: 2,
    autoHeight: false,
    spaceBetween: 18,
    pagination: {
        el: ".swiper-pagination1",
        type: "progressbar",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 5,
        autoHeight: true,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 18,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 18,
        slidesPerView: 2
      }
    }
  });
  const swiper2 = new Swiper('.swiper2', {
    slidesPerView: 2,
    autoHeight: false,
    spaceBetween: 18,
    pagination: {
        el: ".swiper-pagination2",
        type: "progressbar",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 5,
        autoHeight: true,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 18,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 18,
        slidesPerView: 2
      }
    }
  });
  const swiper3 = new Swiper('.swiper3', {
    slidesPerView: 2,
    autoHeight: false,
    spaceBetween: 18,
    pagination: {
        el: ".swiper-pagination3",
        type: "progressbar",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 5,
        autoHeight: true,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 18,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 18,
        slidesPerView: 2
      }
    }
  });
  const swiper4 = new Swiper('.swiper4', {
    slidesPerView: 2,
    autoHeight: false,
    spaceBetween: 0,
    pagination: {
        el: ".swiper-pagination4",
        type: "progressbar",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 0,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 0,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 0,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 0,
        slidesPerView: 2
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
	const menuBtn = document.querySelector('.menu-btn');
	const menu = document.querySelector('.menu');
	const backLinks = document.querySelectorAll('.back');

	menuBtn.addEventListener('click', () => {
		menuBtn.classList.toggle('active');
		menu.classList.toggle('active');
	});

	backLinks.forEach(link => {
		link.addEventListener('click', () => {
			menuBtn.classList.remove('active');
			menu.classList.remove('active');
		});
	});
});
document.addEventListener('DOMContentLoaded', () => {

	const tabsGroups = document.querySelectorAll('.tabs__btns');

	tabsGroups.forEach((tabsGroup, index) => {

		const tabs = tabsGroup.querySelectorAll('a');

		// Ищем ближайший контейнер с табами по индексу
		const contentGroup = document.querySelectorAll('.tabs__content')[index];

		if (!contentGroup) return;

		const contents = contentGroup.querySelectorAll('.tabs__area');

		tabs.forEach(tab => {

			tab.addEventListener('click', e => {
				e.preventDefault();

				const target = tab.dataset.tab;

				tabs.forEach(btn => btn.classList.remove('active'));

				contents.forEach(content => {
					content.classList.remove('active', 'show');
				});

				tab.classList.add('active');

				const activeContent = contentGroup.querySelector(
					`[data-tab-content="${target}"]`
				);

				if (!activeContent) return;

				activeContent.classList.add('active');

				requestAnimationFrame(() => {
					activeContent.classList.add('show');
				});
			});

		});

		const firstTab = contentGroup.querySelector('.tabs__area.active');

		if (firstTab) {
			requestAnimationFrame(() => {
				firstTab.classList.add('show');
			});
		}

	});

});
function initFileUploads() {
   document.querySelectorAll('.file-upload').forEach(upload => {
      const input = upload.querySelector('.file-upload__input');
      const label = upload.querySelector('.file-upload__label');
      const list = upload.querySelector('.file-upload__files');

      if (!input || !label || !list) return;

      let files = [];

      const paperclip = `
         <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.44 11.05L12.25 20.24C9.91 22.58 6.11 22.58 3.77 20.24C1.43 17.9 1.43 14.1 3.77 11.76L12.96 2.57C14.52 1.01 17.05 1.01 18.61 2.57C20.17 4.13 20.17 6.66 18.61 8.22L9.41 17.41C8.63 18.19 7.37 18.19 6.59 17.41C5.81 16.63 5.81 15.37 6.59 14.59L14.95 6.22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
      `;

      const cross = `
         <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
         </svg>
      `;

      function formatSize(bytes) {
         return (bytes / (1024 * 1024)).toFixed(1) + ' МБ';
      }

      function syncInput() {
         const transfer = new DataTransfer();

         files.forEach(file => {
            transfer.items.add(file);
         });

         input.files = transfer.files;
      }

      function renderFiles() {
         list.innerHTML = '';

         const hasFiles = files.length > 0;

         label.style.display = hasFiles ? 'none' : 'inline-flex';
         list.classList.toggle('active', hasFiles);

         files.forEach((file, index) => {
            const item = document.createElement('div');
            item.className = 'file-upload__item';

            const icon = document.createElement('div');
            icon.className = 'file-upload__icon';
            icon.innerHTML = paperclip;

            const info = document.createElement('div');
            info.className = 'file-upload__info';

            const name = document.createElement('span');
            name.className = 'file-upload__name';
            name.textContent = file.name;
            name.title = file.name;

            const size = document.createElement('span');
            size.className = 'file-upload__size';
            size.textContent = formatSize(file.size);

            const remove = document.createElement('button');
            remove.type = 'button';
            remove.className = 'file-upload__remove';
            remove.setAttribute('aria-label', `Удалить ${file.name}`);
            remove.innerHTML = cross;

            remove.addEventListener('click', () => {
               files.splice(index, 1);
               syncInput();
               renderFiles();
            });

            info.append(name, size);
            item.append(icon, info, remove);
            list.append(item);
         });
      }

      input.addEventListener('change', () => {
         const selectedFiles = Array.from(input.files);

         selectedFiles.forEach(file => {
            const exists = files.some(existing =>
               existing.name === file.name &&
               existing.size === file.size &&
               existing.lastModified === file.lastModified
            );

            if (!exists) files.push(file);
         });

         syncInput();
         renderFiles();
      });

      label.addEventListener('click', event => {
         event.preventDefault();
         input.click();
      });

      list.addEventListener('click', event => {
         if (event.target.closest('.file-upload__remove')) return;
         input.click();
      });

      renderFiles();
   });
}

document.addEventListener('DOMContentLoaded', initFileUploads);

document.addEventListener('DOMContentLoaded', initFileUploads);
// Замена <img class="svg"> на inline SVG
document.addEventListener("DOMContentLoaded", () => {
  const svgImages = document.querySelectorAll('img.svg');

  svgImages.forEach(img => {
    const imgURL = img.getAttribute('src');

    fetch(imgURL)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'image/svg+xml');
        let svg = xmlDoc.querySelector('svg');

        if (!svg) return;

        // Перенос ID
        if (img.id) {
          svg.setAttribute('id', img.id);
        }

        // Перенос классов
        const classes = img.getAttribute('class');
        if (classes) {
          svg.setAttribute('class', `${classes} replaced-svg`);
        }

        // Удаление некорректных xmlns
        svg.removeAttribute('xmlns:a');

        // Добавление viewBox, если его нет
        if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
          svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
        }

        // Замена <img> на <svg>
        img.parentNode.replaceChild(svg, img);
      })
      .catch(error => {
        console.error(`Ошибка при загрузке SVG: ${imgURL}`, error);
      });
  });
});

