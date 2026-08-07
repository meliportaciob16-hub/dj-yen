/* =====================================================
   DJ YEN EL INCONTROLABLE
   SCRIPT.JS - FUNCIONES INTERACTIVAS PREMIUM
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       1. CARRUSEL DE GALERÍA
       ================================================= */

    const slider = document.querySelector(".slider");
    const imagenes = document.querySelectorAll(".slider img");

    let imagenActual = 0;
    let intervaloCarrusel;

    if (slider && imagenes.length > 0) {

        // Configuración inicial
        slider.style.position = "relative";
        slider.style.display = "flex";
        slider.style.justifyContent = "center";
        slider.style.alignItems = "center";
        slider.style.overflow = "hidden";

        imagenes.forEach((imagen, index) => {

            imagen.style.display = "none";
            imagen.style.width = "100%";
            imagen.style.maxWidth = "900px";
            imagen.style.height = "450px";
            imagen.style.objectFit = "cover";

            imagen.style.transition =
                "opacity .5s ease, transform .5s ease";

            imagen.style.opacity = "0";

            if (index === 0) {

                imagen.style.display = "block";

                setTimeout(() => {
                    imagen.style.opacity = "1";
                }, 50);
            }
        });

        /* ---------------------------------------------
           CREAR BOTÓN ANTERIOR
           --------------------------------------------- */

        const botonAnterior = document.createElement("button");

        botonAnterior.innerHTML = "❮";

        botonAnterior.className = "carrusel-anterior";

        /* ---------------------------------------------
           CREAR BOTÓN SIGUIENTE
           --------------------------------------------- */

        const botonSiguiente = document.createElement("button");

        botonSiguiente.innerHTML = "❯";

        botonSiguiente.className = "carrusel-siguiente";

        slider.appendChild(botonAnterior);
        slider.appendChild(botonSiguiente);

        /* ---------------------------------------------
           INDICADORES
           --------------------------------------------- */

        const indicadores = document.createElement("div");

        indicadores.className = "indicadores";

        imagenes.forEach((imagen, index) => {

            const punto = document.createElement("span");

            punto.className = "punto";

            if (index === 0) {
                punto.classList.add("activo");
            }

            punto.addEventListener("click", () => {

                mostrarImagen(index);

                reiniciarCarrusel();

            });

            indicadores.appendChild(punto);

        });

        slider.parentElement.appendChild(indicadores);

        const puntos =
            document.querySelectorAll(".punto");


        /* ---------------------------------------------
           FUNCIÓN PARA MOSTRAR IMAGEN
           --------------------------------------------- */

        function mostrarImagen(numero) {

            imagenes.forEach((imagen) => {

                imagen.style.display = "none";
                imagen.style.opacity = "0";

            });

            puntos.forEach((punto) => {

                punto.classList.remove("activo");

            });

            imagenes[numero].style.display = "block";

            setTimeout(() => {

                imagenes[numero].style.opacity = "1";

            }, 30);

            puntos[numero].classList.add("activo");

            imagenActual = numero;
        }


        /* ---------------------------------------------
           SIGUIENTE
           --------------------------------------------- */

        function siguienteImagen() {

            imagenActual++;

            if (imagenActual >= imagenes.length) {

                imagenActual = 0;

            }

            mostrarImagen(imagenActual);
        }


        /* ---------------------------------------------
           ANTERIOR
           --------------------------------------------- */

        function anteriorImagen() {

            imagenActual--;

            if (imagenActual < 0) {

                imagenActual = imagenes.length - 1;

            }

            mostrarImagen(imagenActual);
        }


        botonSiguiente.addEventListener(
            "click",
            () => {

                siguienteImagen();

                reiniciarCarrusel();

            }
        );


        botonAnterior.addEventListener(
            "click",
            () => {

                anteriorImagen();

                reiniciarCarrusel();

            }
        );


        /* ---------------------------------------------
           CARRUSEL AUTOMÁTICO
           --------------------------------------------- */

        function iniciarCarrusel() {

            intervaloCarrusel = setInterval(
                siguienteImagen,
                4000
            );

        }


        function reiniciarCarrusel() {

            clearInterval(intervaloCarrusel);

            iniciarCarrusel();

        }


        iniciarCarrusel();


        /* ---------------------------------------------
           PAUSAR AL PASAR EL MOUSE
           --------------------------------------------- */

        slider.addEventListener(
            "mouseenter",
            () => {

                clearInterval(intervaloCarrusel);

            }
        );


        slider.addEventListener(
            "mouseleave",
            () => {

                iniciarCarrusel();

            }
        );


        /* ---------------------------------------------
           SWIPE PARA CELULAR
           --------------------------------------------- */

        let inicioX = 0;

        slider.addEventListener(
            "touchstart",
            (evento) => {

                inicioX =
                    evento.touches[0].clientX;

            }
        );


        slider.addEventListener(
            "touchend",
            (evento) => {

                const finalX =
                    evento.changedTouches[0].clientX;

                const diferencia =
                    inicioX - finalX;


                if (Math.abs(diferencia) > 50) {

                    if (diferencia > 0) {

                        siguienteImagen();

                    } else {

                        anteriorImagen();

                    }

                    reiniciarCarrusel();

                }

            }
        );

    }


    /* =================================================
       2. ANIMACIONES AL HACER SCROLL
       ================================================= */

    const elementosAnimados =
        document.querySelectorAll(
            ".card, .boton, .slider img, .final h1"
        );


    const observador =
        new IntersectionObserver(
            (entradas) => {

                entradas.forEach((entrada) => {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add(
                            "mostrar"
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    elementosAnimados.forEach((elemento) => {

        elemento.classList.add("oculto");

        observador.observe(elemento);

    });


    /* =================================================
       3. EFECTO RIPPLE EN BOTONES
       ================================================= */

    const botones =
        document.querySelectorAll(
            ".boton, .btn-whatsapp"
        );


    botones.forEach((boton) => {

        boton.addEventListener(
            "click",
            function (evento) {

                const circulo =
                    document.createElement("span");

                circulo.classList.add("ripple");

                const rect =
                    boton.getBoundingClientRect();

                const x =
                    evento.clientX - rect.left;

                const y =
                    evento.clientY - rect.top;

                circulo.style.left =
                    `${x}px`;

                circulo.style.top =
                    `${y}px`;

                boton.appendChild(circulo);


                setTimeout(() => {

                    circulo.remove();

                }, 600);

            }
        );

    });


    /* =================================================
       4. EFECTO DE BRILLO EN EL LOGO
       ================================================= */

    const logo =
        document.querySelector(".logo");


    if (logo) {

        logo.addEventListener(
            "mouseenter",
            () => {

                logo.style.filter =
                    `
                    drop-shadow(0 0 10px #00aaff)
                    drop-shadow(0 0 30px #008cff)
                    drop-shadow(0 0 70px #006eff)
                    `;
            }
        );


        logo.addEventListener(
            "mouseleave",
            () => {

                logo.style.filter =
                    `
                    drop-shadow(0 0 8px #008cff)
                    drop-shadow(0 0 25px #006eff)
                    drop-shadow(
                        0 0 60px rgba(0,110,255,.7)
                    )
                    `;
            }
        );

    }


    /* =================================================
       5. EFECTO 3D EN LAS TARJETAS
       ================================================= */

    const tarjetas =
        document.querySelectorAll(".card");


    tarjetas.forEach((tarjeta) => {

        tarjeta.addEventListener(
            "mousemove",
            (evento) => {

                const rect =
                    tarjeta.getBoundingClientRect();

                const x =
                    evento.clientX - rect.left;

                const y =
                    evento.clientY - rect.top;

                const centroX =
                    rect.width / 2;

                const centroY =
                    rect.height / 2;

                const rotacionX =
                    ((y - centroY) / centroY) * -5;

                const rotacionY =
                    ((x - centroX) / centroX) * 5;

                tarjeta.style.transform =
                    `
                    perspective(700px)
                    rotateX(${rotacionX}deg)
                    rotateY(${rotacionY}deg)
                    scale(1.03)
                    `;

            }
        );


        tarjeta.addEventListener(
            "mouseleave",
            () => {

                tarjeta.style.transform =
                    "";

            }
        );

    });


    /* =================================================
       6. EFECTO PARALLAX DEL LOGO
       ================================================= */

    window.addEventListener(
        "scroll",
        () => {

            if (!logo) return;

            const desplazamiento =
                window.scrollY;

            if (desplazamiento < 700) {

                logo.style.transform =
                    `translateY(${desplazamiento * 0.08}px)`;

            }

        }
    );


    /* =================================================
       7. BOTÓN WHATSAPP
       ================================================= */

    const botonWhatsApp =
        document.querySelector(".btn-whatsapp");


    if (botonWhatsApp) {

        botonWhatsApp.addEventListener(
            "mouseenter",
            () => {

                botonWhatsApp.style.animation =
                    "pulsoWhatsApp .8s infinite";

            }
        );


        botonWhatsApp.addEventListener(
            "mouseleave",
            () => {

                botonWhatsApp.style.animation =
                    "";

            }
        );

    }


    /* =================================================
       8. MENSAJE DE BIENVENIDA EN CONSOLA
       ================================================= */

    console.log(
        "%c DJ YEN EL INCONTROLABLE ",
        `
        background:#006eff;
        color:white;
        font-size:20px;
        font-weight:bold;
        padding:10px;
        `
    );

    console.log(
        "🔥 Página Premium cargada correctamente."
    );

});