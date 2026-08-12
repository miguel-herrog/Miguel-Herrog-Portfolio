// === GESTIÓN DE MODOS Y VISTAS ===
function activarModoLector() {
    document.getElementById('mode-portfolio').style.display = 'none';
    document.getElementById('mode-lector').classList.add('active');
    mostrarIntro(document.getElementById('btn-intro'));
}

function desactivarModoLector() {
    document.getElementById('mode-lector').classList.remove('active');
    document.getElementById('mode-portfolio').style.display = 'flex';
}

function cambiarVista(idVista, btn) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(idVista).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function mostrarRView(idRView) {
    document.querySelectorAll('.reader-view').forEach(rv => rv.classList.remove('active-rview'));
    document.getElementById(idRView).classList.add('active-rview');
}

function mostrarIntro(btn) {
    document.querySelectorAll('.file-btn').forEach(b => b.classList.remove('active-file'));
    if(btn) btn.classList.add('active-file');
    mostrarRView('rview-intro');
}

function mostrarSinopsis(key, btnElement) {
    obraSeleccionadaKey = key;
    const data = baseDatosObras[key];
    const currentLang = document.querySelector('.lang-btn.active').id === 'btn-en' ? 'en' : 'es';
    
    document.querySelectorAll('.file-btn').forEach(b => b.classList.remove('active-file'));
    if(btnElement) btnElement.classList.add('active-file');

    // Cargar datos traducidos de la obra
    document.getElementById('syn-meta').innerText = i18n[currentLang][`w_${key}_meta`];
    document.getElementById('syn-title').innerText = i18n[currentLang][`w_${key}_title`];
    document.getElementById('syn-desc').innerText = i18n[currentLang][`w_${key}_synopsis`];

    const btnRead = document.getElementById('btn-start-read');
    const statusMsg = document.getElementById('syn-status-msg');

    if (data.estado === 'wip') {
        btnRead.style.display = 'none';
        statusMsg.style.display = 'inline-block';
    } else {
        btnRead.style.display = 'block';
        statusMsg.style.display = 'none';
    }

    mostrarRView('rview-synopsis');
}

// ==========================================
// MOTOR DE LECTURA (TOC, PARSER Y BARRA)
// ==========================================
let hojaActual = 0;
let idFichero = '';
let numCapitulos = 0;

async function lanzarLectorActivo() {
    if (!obraSeleccionadaKey) return;
    const data = baseDatosObras[obraSeleccionadaKey];
    const currentLang = document.querySelector('.lang-btn.active').id === 'btn-en' ? 'en' : 'es';
    
    if(data.estado === 'wip') return; 

    mostrarRView('rview-reader');
    document.getElementById('lector-titulo').innerText = i18n[currentLang][`w_${obraSeleccionadaKey}_title`].toUpperCase();
    document.getElementById('info-paginas').innerText = `CARGANDO...`;
    idFichero = data.url.split('/').pop();
    
    try {
        const res = await fetch(data.url);
        if (!res.ok) throw new Error();
        const texto = await res.text();
        
        parsearDocumento(texto);
        
        const salvado = localStorage.getItem('min_prog_' + idFichero);
        hojaActual = salvado ? parseInt(salvado) : 0;

        setTimeout(() => {
            const m = getMath();
            if(hojaActual >= m.total) hojaActual = 0;
            m.box.scrollLeft = hojaActual * m.salto;
            refrescarDatos();
        }, 50);

    } catch (err) {
        document.getElementById('el-texto').innerHTML = `<p style="text-align:center; margin-top:3rem; color:var(--accent);">Error: Archivo no encontrado en local.</p>`;
        document.getElementById('info-paginas').innerText = `ERROR`;
        document.getElementById('toc-dropdown').innerHTML = '<div class="toc-item">Error de archivo</div>';
    }
}

function parsearDocumento(texto) {
    let html = '';
    let tocHtml = '';
    numCapitulos = 0;

    texto.split(/\r?\n/).forEach(linea => {
        const t = linea.trim();
        if (!t) return;
        
        if (t.startsWith('######')) {
            html += `<div class="running-head">${t.replace('######', '').trim()}</div>`;
        }
        else if (t.startsWith('#')) {
            numCapitulos++;
            const cTitle = t.replace('#', '').trim();
            const cId = `cap-${numCapitulos}`;
            html += `<div class="chapter-title" id="${cId}">${cTitle}</div>`;
            tocHtml += `<div class="toc-item" onclick="irAlCapitulo('${cId}')">${cTitle}</div>`;
        }
        else if (t.startsWith('>')) {
            html += t.includes('—') ? `<div class="epigraph-author">${t.replace('>', '').trim()}</div>` : `<div class="epigraph">${t.replace('>', '').trim()}</div>`;
        }
        else {
            html += `<p class="body-text">${t}</p>`;
        }
    });

    document.getElementById('el-texto').innerHTML = html;
    document.getElementById('toc-dropdown').innerHTML = tocHtml || '<div class="toc-item">Sin capítulos estructurados</div>';
}

function toggleToc() {
    document.getElementById('toc-dropdown').classList.toggle('show');
}

function irAlCapitulo(id) {
    const el = document.getElementById(id);
    if(!el) return;
    const m = getMath();
    hojaActual = Math.floor(el.offsetLeft / m.salto);
    m.box.scroll({ left: hojaActual * m.salto, behavior: 'smooth' });
    document.getElementById('toc-dropdown').classList.remove('show');
    setTimeout(refrescarDatos, 300);
}

function getMath() {
    const box = document.getElementById('el-texto');
    const fontSizePx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const salto = box.clientWidth + (12 * fontSizePx); 
    return { box, salto, total: Math.ceil(box.scrollWidth / salto) };
}

function pasarPagina(dir) {
    const m = getMath();
    hojaActual = Math.max(0, Math.min(hojaActual + dir, m.total - 1));
    m.box.scroll({ left: hojaActual * m.salto, behavior: 'smooth' });
    localStorage.setItem('min_prog_' + idFichero, hojaActual);
    setTimeout(refrescarDatos, 300);
}

function scrollPorBarra() {
    const slider = document.getElementById('progress-slider');
    const m = getMath();
    hojaActual = Math.round((slider.value / 100) * (m.total - 1));
    m.box.scroll({ left: hojaActual * m.salto, behavior: 'auto' });
    localStorage.setItem('min_prog_' + idFichero, hojaActual);
}

function refrescarDatos() {
    const m = getMath();
    if(m.total === 0) return;
    
    hojaActual = Math.round(m.box.scrollLeft / m.salto);
    const slider = document.getElementById('progress-slider');
    slider.value = m.total <= 1 ? 0 : (hojaActual / (m.total - 1)) * 100;

    const isES = document.getElementById('btn-es').classList.contains('active');
    const pag1 = (hojaActual * 2) + 1;
    const pag2 = pag1 + 1;
    const totalPags = m.total * 2;
    
    if(isES) document.getElementById('info-paginas').innerText = `PÁG. ${pag1}-${pag2} DE ${totalPags}`;
    else document.getElementById('info-paginas').innerText = `PG. ${pag1}-${pag2} OF ${totalPags}`;
    
    document.getElementById('btn-prev').disabled = (hojaActual === 0);
    document.getElementById('btn-next').disabled = (hojaActual >= m.total - 1);
}

new ResizeObserver(() => {
    if (document.getElementById('rview-reader').classList.contains('active-rview') && idFichero !== '') {
        const m = getMath(); m.box.scrollLeft = hojaActual * m.salto; refrescarDatos();
    }
}).observe(document.getElementById('el-texto'));

document.getElementById('el-texto').addEventListener('scroll', refrescarDatos);

document.addEventListener('keydown', (e) => {
    if (document.getElementById('rview-reader').classList.contains('active-rview') && idFichero !== '') {
        if (e.key === 'ArrowRight' && !document.getElementById('btn-next').disabled) pasarPagina(1);
        else if (e.key === 'ArrowLeft' && !document.getElementById('btn-prev').disabled) pasarPagina(-1);
    }
});