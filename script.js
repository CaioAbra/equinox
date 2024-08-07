const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navBar = document.getElementById('nav'); // Seleciona o elemento <nav>

// Menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active'); // Alterna a classe 'active' no menu de navegação
    hamburger.classList.toggle('active'); // Alterna a classe 'active' no ícone do menu hambúrguer
    navBar.classList.toggle('active'); // Alterna a classe 'active' na barra de navegação
});

//accordion
$('.accordion-header').click(function () {
    const target = $(this).data('target'); // Obtém o ID do item correspondente a partir do data-target
    const $body = $(target); // Seleciona o corpo do acordeão correspondente
    const $header = $(this); // Armazena o header clicado
    var arrowDownSVG = '<svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.3589 5.1529L14.7969 5.1529L14.7969 20.525L12.2349 20.525L12.2349 23.087L14.7969 23.087L14.7969 25.649L17.3589 25.649L17.3589 23.087L19.9209 23.087L19.9209 20.525L17.3589 20.525L17.3589 5.1529ZM22.4829 17.963L22.4829 20.525L19.9209 20.525L19.9209 17.963L22.4829 17.963ZM22.4829 17.963L22.4829 15.4009L25.0449 15.4009L25.0449 17.963L22.4829 17.963ZM9.67286 17.963L9.67286 20.525L12.2349 20.525L12.2349 17.963L9.67286 17.963ZM9.67286 17.963L9.67286 15.4009L7.11085 15.4009L7.11085 17.963L9.67286 17.963Z" fill="currentColor" /></svg>';
    var arrowUpSVG = '<svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path transform="rotate(180 16 16)" d="M17.3589 5.1529L14.7969 5.1529L14.7969 20.525L12.2349 20.525L12.2349 23.087L14.7969 23.087L14.7969 25.649L17.3589 25.649L17.3589 23.087L19.9209 23.087L19.9209 20.525L17.3589 20.525L17.3589 5.1529ZM22.4829 17.963L22.4829 20.525L19.9209 20.525L19.9209 17.963L22.4829 17.963ZM22.4829 17.963L22.4829 15.4009L25.0449 15.4009L25.0449 17.963L22.4829 17.963ZM9.67286 17.963L9.67286 20.525L12.2349 20.525L12.2349 17.963L9.67286 17.963ZM9.67286 17.963L9.67286 15.4009L7.11085 15.4009L7.11085 17.963L9.67286 17.963Z" fill="currentColor" /></svg>';


    // Verifica se o corpo está aberto
    if ($body.hasClass('open')) {
        // Se estiver aberto, fecha-o
        $body.slideUp(300, function () {
            $body.removeClass('open'); // Remove a classe "open" do corpo
            $header.removeClass('open'); // Remove a classe "open" do header correspondente
            // $header.find('.icon').text('+'); // Muda ícone para +
            $header.find('.icon').html(arrowDownSVG); // Muda ícone para +
        });
    } else {
        // Se não estiver aberto, fecha todos os outros
        $('.accordion-body').slideUp(300).removeClass('open'); // Fecha todos os corpos do acordeão
        $('.accordion-header').removeClass('open'); // Remove a classe "open" de todos os headers
        // $('.accordion-header .icon').text('+'); // Reseta todos os ícones para +
        $('.accordion-header .icon').html(arrowDownSVG); // Reseta todos os ícones para +

        // Abre o corpo atual
        $body.slideDown(300, function () {
            $body.addClass('open'); // Adiciona a classe "open" ao corpo atual
            $header.addClass('open'); // Adiciona a classe "open" ao header correspondente
            $header.find('.icon').text('-'); // Muda ícone para -
            $header.find('.icon').html(arrowUpSVG); // Muda ícone para -
        });
    }
});

// carousel
$(document).ready(function () {
    var itemWidth = $(".carousel-items .item").outerWidth(true); // Largura de cada item do carrossel
    var itemCount = $(".carousel-items .item").length; // Número de itens no carrossel
    var windowWidth = $(window).width(); // Largura da janela
    var visibleItems = 3; // Número de itens visíveis por padrão
    var responsiveThreshold1 = 500; // Limite de largura para dispositivos até 500px
    var responsiveThreshold2 = 768; // Limite de largura para dispositivos de 501px a 767px

    function moveCarousel(direction) {
        var currentPosition = parseInt($(".carousel-items").css("left")); // Posição atual do carrossel
        var newPosition;

        if (direction === "next") {
            newPosition = currentPosition - itemWidth; // Nova posição para movimento à direita
            $(".carousel-items").animate(
                { left: newPosition },
                500,
                function () {
                    $(".carousel-items .item:first").appendTo(".carousel-items"); // Move o primeiro item para o final
                    $(".carousel-items").css("left", 0); // Reseta a posição do carrossel
                    updateActiveItem(); // Atualiza o item ativo
                }
            );
        } else {
            newPosition = currentPosition + itemWidth; // Nova posição para movimento à esquerda
            $(".carousel-items").animate(
                { left: newPosition },
                500,
                function () {
                    $(".carousel-items .item:last").prependTo(".carousel-items"); // Move o último item para o início
                    $(".carousel-items").css("left", -itemWidth); // Reseta a posição do carrossel
                    updateActiveItem(); // Atualiza o item ativo
                }
            );
        }
    }

    function updateActiveItem() {
        $(".carousel-items .item").removeClass("active"); // Remove a classe "active" de todos os itens
        var activeItemIndex = Math.floor(visibleItems / 2); // Índice do item ativo no meio
        $(".carousel-items .item:nth-child(" + (activeItemIndex + 1) + ")").addClass("active"); // Adiciona a classe "active" ao item ativo
    }

    function adjustCarousel() {
        if (windowWidth <= responsiveThreshold1) {
            visibleItems = 1; // Um item visível para janelas menores que 500px
        } else if (windowWidth <= responsiveThreshold2) {
            visibleItems = 2; // Dois itens visíveis para janelas entre 501px e 767px
        } else {
            visibleItems = 3; // Três itens visíveis para janelas maiores que 767px
        }

        itemWidth = $(".carousel-items .item").outerWidth(true); // Atualiza a largura dos itens
        $(".carousel-items").width(itemWidth * itemCount); // Define a largura do contêiner do carrossel
        updateActiveItem(); // Atualiza o item ativo
    }

    adjustCarousel();

    $(window).resize(function () {
        adjustCarousel(); // Ajusta o carrossel ao redimensionar a janela
    });

    $(".slider-prev").click(function () {
        moveCarousel("prev"); // Move o carrossel para a esquerda
    });

    $(".slider-next").click(function () {
        moveCarousel("next"); // Move o carrossel para a direita
    });
});

//animação de scroll
$(window).scroll(function () {
    let section = $('section.mockUp .computer');
    let image = $('.efeito');
    let computer = $('.mockUp .computer');
    let windowHeight = $(window).height();
    let scrollTop = $(window).scrollTop();
    let sectionOffset = section.offset().top;
    let sectionHeight = section.height();

    let sectionMiddle = sectionOffset + sectionHeight / 2;
    let viewportMiddle = scrollTop + windowHeight / 2;

    if (viewportMiddle > sectionOffset && viewportMiddle < sectionOffset + sectionHeight) {
        if ($(window).width() < 768) {
            image.css('transform', 'scale(1.5) translateY(50%) translateX(40%)'); // Transforma a imagem em telas menores
            computer.css('transform', 'scale(1)');
        } else {
            image.css('transform', 'scale(.7) translateY(40%) translateX(50%)'); // Transforma a imagem em telas maiores
            computer.css('transform', 'scale(.9)');
        }
    } else {
        if ($(window).width() < 768) {
            image.css('transform', 'scale(1) translateY(50%)'); // Reseta a transformação em telas menores
            computer.css('transform', 'scale(1)');
        } else {
            image.css('transform', 'scale(.8) translateY(-17%)'); // Reseta a transformação em telas maiores
            computer.css('transform', 'scale(1)');
        }
    }
});
;
