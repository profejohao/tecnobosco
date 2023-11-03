window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

//

window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('preloader').style.display = 'none';
    }, 1000); // Valor en milisegundos. 1000 milisegundos equivalen a 1 segundo.
});

//

// Función para ajustar la altura y posición de la línea:
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

function adjustLineFill() {
    const icons = document.querySelectorAll('.gato-icon');
    const container = document.querySelector('.gato-lateral');
    const line = document.querySelector('.linea-central');
    const navbar = document.querySelector('.navbar');

    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const sectionTop = container.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    const firstIconCenter = icons[0].getBoundingClientRect().top + (icons[0].offsetHeight / 2) + window.pageYOffset;
    const lastIconCenter = icons[icons.length - 1].getBoundingClientRect().top + (icons[icons.length - 1].offsetHeight / 2) + window.pageYOffset;
    
    const scrollPosition = window.pageYOffset + navbarHeight;

    let fillPercentage;
    if (scrollPosition < sectionTop) {
        fillPercentage = 0;
    } else {
        fillPercentage = (scrollPosition - sectionTop) / (lastIconCenter - firstIconCenter) * 100;
    }

    if (fillPercentage > 100) fillPercentage = 100;
    if (fillPercentage < 0) fillPercentage = 0;

    const lineStart = icons[0].getBoundingClientRect().top - container.getBoundingClientRect().top + (icons[0].offsetHeight / 2);
    const currentLineEnd = lineStart + ((lastIconCenter - firstIconCenter) * fillPercentage / 100);

    line.style.top = lineStart + 'px';
    line.style.height = currentLineEnd - lineStart + 'px';
} 

function handleIconOpacity() {
    const items = document.querySelectorAll('.gato-item');
    const line = document.querySelector('.linea-central');
    const mainImage = document.querySelector('.gato-imagen img');

    // Esta será la altura en la que se encuentra el borde inferior de la línea
    const lineEndHeight = line.getBoundingClientRect().bottom;

    items.forEach((item, index) => {
        const icon = item.querySelector('.gato-icon');
        const text = item.querySelector('.gato-desc');
        const title = item.querySelector('.gato-mes');

        // Esta será la altura en la que se encuentra la parte superior del ícono
        const iconTop = icon.getBoundingClientRect().top;

        // Para el primer ícono, quiero que se encienda solo cuando la línea llegue a la mitad del ícono
        const iconCenter = iconTop + (icon.offsetHeight / 2);

        if (index === 0) {
            if (lineEndHeight > iconCenter) {
                icon.style.opacity = "1";
                text.style.opacity = "1";
                title.style.opacity = "1";
                mainImage.src = icon.getAttribute('data-main-img');
            } else {
                icon.style.opacity = "0.5";
                text.style.opacity = "0.5";
                title.style.opacity = "0.5";
            }
        } else {
            if (lineEndHeight > iconTop) {
                icon.style.opacity = "1";
                text.style.opacity = "1";
                title.style.opacity = "1";

                // Cambia la imagen principal
                if ((index === items.length - 1 && lineEndHeight >= iconTop) || (lineEndHeight < items[index + 1].querySelector('.gato-icon').getBoundingClientRect().top)) {
                    mainImage.src = icon.getAttribute('data-main-img');
                }
            } else {
                icon.style.opacity = "0.5";
                text.style.opacity = "0.5";
                title.style.opacity = "0.5";
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    adjustLineFill();
    handleIconOpacity();
});

window.addEventListener('resize', debounce(adjustLineFill, 100));

window.addEventListener('scroll', function() {
    adjustLineFill();
    handleIconOpacity();
});


function handleScroll() {
    const mainImage = document.querySelector('.gato-imagen img');
    const container = document.querySelector('.gato-info-container');
    const containerPosition = container.getBoundingClientRect();
    const imageHeight = mainImage.offsetHeight;

    const offset = 50;
    const topSpacing = 100;
    const rightSpacing = 87;

    const startFixedPosition = containerPosition.top + window.scrollY + topSpacing;
    const endFixedPosition = containerPosition.bottom + window.scrollY - imageHeight - offset - topSpacing;

    if (window.scrollY >= startFixedPosition && window.scrollY < endFixedPosition) {
        mainImage.style.position = 'fixed';
        mainImage.style.top = topSpacing + 'px';
        mainImage.style.right = rightSpacing + 'px';
        mainImage.style.width = '50%';
        mainImage.style.order = 0;
    } else if (window.scrollY >= endFixedPosition) {
        mainImage.style.position = 'fixed';
        mainImage.style.top = (containerPosition.bottom - imageHeight - offset) + 'px'; // Esto colocará la imagen en el punto exacto para que se paralice.
        mainImage.style.right = rightSpacing + 'px';
    } else {
        mainImage.style.position = 'relative';
        mainImage.style.top = 'auto';
        mainImage.style.right = 'auto';
        mainImage.style.width = 'calc(100% - 6% - 4px)';
        mainImage.style.order = 0;
    }
}

window.addEventListener('scroll', handleScroll);

function showModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

