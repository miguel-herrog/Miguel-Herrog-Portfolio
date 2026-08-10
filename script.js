// === ESTADOS GLOBALES ===
let pantallaActualTracker = 0;
let historiaActualId = '';
let zoomActual = 100; // 100% es la base

document.addEventListener("DOMContentLoaded", () => {
    const savedZoom = localStorage.getItem('readerZoom');
    if(savedZoom) {
        zoomActual = parseInt(savedZoom);
        aplicarZoomDOM();
    }
    const savedTheme = localStorage.getItem('readerTheme');
    if(savedTheme === 'oscuro') document.getElementById('reader-gg').classList.add('theme-dark');
});

// ==========================================
// MENÚS Y HERRAMIENTAS (Aa e Índice)
// ==========================================
function toggleMenu(idAbrir, idCerrar) {
    document.getElementById(idCerrar).classList.remove('active');
    document.getElementById(idAbrir).classList.toggle('active');
}

function cerrarMenus() {
    document.getElementById('aa-menu').classList.remove('active');
    document.getElementById('toc-menu').classList.remove('active');
}

function cambiarZoom(incremento) {
    zoomActual += incremento;
    if(zoomActual < 50) zoomActual = 50;
    if(zoomActual > 200) zoomActual = 200;
    
    aplicarZoomDOM();
    localStorage.setItem('readerZoom', zoomActual);
    
    // Recalcular tras pintar
    setTimeout(() => {
        const data = getReaderData('gg');
        if(pantallaActualTracker >= data.totalScreens) pantallaActualTracker = data.totalScreens - 1;
        document.getElementById('content-gg').scrollLeft = pantallaActualTracker * data.stepWidth;
        updateReaderStats('gg');
    }, 100);
}

function aplicarZoomDOM() {
    document.getElementById('zoom-value').innerText = zoomActual + '%';
    // 1.1rem es nuestro 100% base matemático
    const nuevoSize = 1.1 * (zoomActual / 100);
    document.documentElement.style.setProperty('--reader-font-size', nuevoSize + 'rem');
}

function cambiarTema(tema) {
    const reader = document.getElementById('reader-gg');
    const btnDia = document.getElementById('btn-tema-dia');
    const btnNoche = document.getElementById('btn-tema-noche');

    if(tema === 'oscuro') { 
        reader.classList.add('theme-dark'); 
        localStorage.setItem('readerTheme', 'oscuro'); 
        btnNoche.style.borderColor = 'var(--accent)';
        btnDia.style.borderColor = 'var(--border-color)';
    } else { 
        reader.classList.remove('theme-dark'); 
        localStorage.setItem('readerTheme', 'claro'); 
        btnDia.style.borderColor = 'var(--accent)';
        btnNoche.style.borderColor = 'var(--border-color)';
    }
}

// ==========================================
// PARSER DE WORD Y GENERADOR DE ÍNDICE
// ==========================================
function parsearTextoWord(texto) {
    const lineas = texto.split(/\r?\n/);
    let htmlFormateado = '';
    let tocHtml = '';
    let capituloIndex = 0;
    
    lineas.forEach(linea => {
        const txt = linea.trim();
        if (!txt) return; 
        
        if (txt.startsWith('######')) {
            htmlFormateado += `<div class="running-head">${txt.replace('######', '').trim()}</div>`;
        } else if (txt.startsWith('#')) {
            // GENERADOR DE ÍNDICE: Detectamos un título, le asignamos una ID, y creamos su enlace en el menú
            capituloIndex++;
            const idUnico = `capitulo-${capituloIndex}`;
            const tituloLimpio = txt.replace('#', '').trim();
            
            htmlFormateado += `<div class="chapter-title" id="${idUnico}">${tituloLimpio}</div>`;
            tocHtml += `<div class="toc-item" onclick="irAlCapitulo('${idUnico}')">${tituloLimpio}</div>`;
            
        } else if (txt.startsWith('>')) {
            if (txt.includes('—De Historia') || txt.includes('— De Historia')) {
                htmlFormateado += `<div class="epigraph-author">${txt.replace('>', '').trim()}</div>`;
            } else {
                htmlFormateado += `<div class="epigraph">${txt.replace('>', '').trim()}</div>`;
            }
        } else {
            htmlFormateado += `<p class="body-text">${txt}</p>`;
        }
    });
    
    // Inyectamos el índice generado en el menú lateral
    document.getElementById('toc-list').innerHTML = tocHtml || '<div class="toc-item">Sin capítulos</div>';
    return htmlFormateado;
}

// ==========================================
// MOTOR DE NAVEGACIÓN
// ==========================================
async function cargarHistoria(idVista, elementoClicado, urlArchivo, titulo) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    elementoClicado.classList.add('active');
    
    document.querySelectorAll('.view').forEach(vista => vista.classList.remove('active'));
    document.getElementById(idVista).classList.add('active');
    document.getElementById('titulo-lector').innerText = titulo;
    cerrarMenus();
    
    historiaActualId = urlArchivo.split('/').pop(); 

    try {
        const response = await fetch(urlArchivo);
        if (!response.ok) throw new Error("Archivo no encontrado");
        const textoPlano = await response.text();
        
        document.getElementById('content-gg').innerHTML = parsearTextoWord(textoPlano);
        
        const paginaGuardada = localStorage.getItem('progreso_' + historiaActualId);
        pantallaActualTracker = paginaGuardada ? parseInt(paginaGuardada) : 0;

        setTimeout(() => {
            const data = getReaderData('gg');
            if(pantallaActualTracker >= data.totalScreens) pantallaActualTracker = 0; 
            document.getElementById('content-gg').scrollLeft = pantallaActualTracker * data.stepWidth;
            updateReaderStats('gg');
        }, 50);

    } catch (error) {
        document.getElementById('content-gg').innerHTML = `<p style="text-align:center; color: red; margin-top: 2rem;">Error: Falta el archivo <b>${urlArchivo}</b> en la carpeta stories.</p>`;
    }
}

function irAlCapitulo(idObjeto) {
    cerrarMenus();
    const elemento = document.getElementById(idObjeto);
    if(!elemento) return;

    const data = getReaderData('gg');
    
    // El navegador calcula la distancia del elemento respecto al contenedor total de las columnas
    const distanciaIzquierda = elemento.offsetLeft;
    
    // Averiguamos en qué "pantalla" cae esa distancia matemática
    const pantallaDestino = Math.floor(distanciaIzquierda / data.stepWidth);
    
    pantallaActualTracker = pantallaDestino;
    data.content.scroll({ left: pantallaActualTracker * data.stepWidth, behavior: 'smooth' });
    
    localStorage.setItem('progreso_' + historiaActualId, pantallaActualTracker);
}

function getReaderData(idSuffix) {
    const content = document.getElementById('content-' + idSuffix);
    const stepWidth = content.clientWidth + 80; 
    const totalScreens = Math.ceil(content.scrollWidth / stepWidth);
    return { content, stepWidth, totalScreens };
}

function turnPage(idSuffix, direction) {
    const data = getReaderData(idSuffix);
    let nuevaPantalla = pantallaActualTracker + direction;
    if (nuevaPantalla < 0) nuevaPantalla = 0;
    if (nuevaPantalla >= data.totalScreens) nuevaPantalla = data.totalScreens - 1;
    
    pantallaActualTracker = nuevaPantalla;
    data.content.scroll({ left: pantallaActualTracker * data.stepWidth, behavior: 'smooth' });
    localStorage.setItem('progreso_' + historiaActualId, pantallaActualTracker);
}

function scrollToSlider(idSuffix) {
    const data = getReaderData(idSuffix);
    const slider = document.getElementById('slider-' + idSuffix);
    pantallaActualTracker = Math.round((slider.value / 100) * (data.totalScreens - 1));
    data.content.scroll({ left: pantallaActualTracker * data.stepWidth, behavior: 'auto' });
    localStorage.setItem('progreso_' + historiaActualId, pantallaActualTracker);
}

function updateReaderStats(idSuffix) {
    const data = getReaderData(idSuffix);
    const currentScreenFromScroll = Math.round(data.content.scrollLeft / data.stepWidth);
    pantallaActualTracker = currentScreenFromScroll; 
    
    const firstPageNum = (pantallaActualTracker * 2) + 1;
    const secondPageNum = firstPageNum + 1;
    const totalPages = data.totalScreens * 2;
    
    document.getElementById('counter-' + idSuffix).innerText = `${firstPageNum}-${secondPageNum} / ${totalPages}`;

    const slider = document.getElementById('slider-' + idSuffix);
    if (data.totalScreens <= 1) slider.value = 0; 
    else slider.value = (pantallaActualTracker / (data.totalScreens - 1)) * 100;

    document.getElementById('prev-' + idSuffix).disabled = (pantallaActualTracker === 0);
    document.getElementById('next-' + idSuffix).disabled = (pantallaActualTracker >= data.totalScreens - 1);
}

// ==========================================
// LISTENERS (Resize y Teclado)
// ==========================================
function cambiarVista(idVista, elementoClicado) { document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active')); elementoClicado.classList.add('active'); document.querySelectorAll('.view').forEach(vista => vista.classList.remove('active')); document.getElementById(idVista).classList.add('active'); cerrarMenus(); }
function toggleFullScreen(readerId) { if (!document.fullscreenElement) document.getElementById(readerId).requestFullscreen(); else document.exitFullscreen(); cerrarMenus(); }

const resizeObserver = new ResizeObserver(() => {
    if (document.getElementById('vista-lector').classList.contains('active') && document.getElementById('content-gg').innerHTML !== '') {
        const data = getReaderData('gg');
        data.content.scrollLeft = pantallaActualTracker * data.stepWidth;
        updateReaderStats('gg');
    }
});
resizeObserver.observe(document.getElementById('content-gg'));
document.getElementById('content-gg').addEventListener('scroll', () => { updateReaderStats('gg'); });

document.addEventListener('keydown', (e) => {
    if (document.getElementById('vista-lector').classList.contains('active')) {
        if (e.key === 'ArrowRight' && !document.getElementById('next-gg').disabled) turnPage('gg', 1);
        else if (e.key === 'ArrowLeft' && !document.getElementById('prev-gg').disabled) turnPage('gg', -1);
    }
});