// ==========================================
// SISTEMA DE TRADUCCIÓN (I18N)
// ==========================================
const i18n = {
    es: {
        "subtitle": "Estudiante de Desarrollo // CFGS DAM",
        "hero": "Me preparo para el desarrollo de <strong>videojuegos y bajo nivel</strong>. Busco mi <strong>primera oportunidad profesional</strong> construyendo arquitecturas sólidas y lógica de sistemas.",
        "nav1": "Perfil y Habilidades",
        "nav2": "Proyectos Técnicos",
        "nav3": "Videojuegos",
        "wolfTitle": "Proyecto Destacado",
        "wolfDesc": "Explora mis relatos de ciencia ficción y diseño narrativo (<i>Worldbuilding</i>). Crear historias es mi pasión y la base para conceptualizar mecánicas de juego.",
        "wolfBtn": "Acceder a Saga Wolf 1061",
        "aboutHeader": "PERFIL DEL DESARROLLADOR",
        "photoOverlay": "Disponible",
        "aboutTitle1": "Sobre mí",
        "aboutP1": "Estudiante de Desarrollo de Software focalizado en construir una carrera sólida en arquitectura <i>backend</i>, lógica de sistemas y desarrollo de videojuegos.",
        "aboutP2": "<strong>Objetivo (Primavera 2027):</strong><br>Busco prácticas internacionales en Europa financiadas totalmente por <strong>Erasmus+</strong> (coste cero para la empresa). Mi meta es resolver problemas complejos y aportar valor junto a ingenieros Senior.",
        "aboutTitle2": "Educación Oficial",
        "edu1": "CFGS Desarrollo de Aplicaciones Multiplataforma (2025-27)",
        "stackTitle": "Stack Tecnológico",
        "certTitle": "Certificaciones & Idiomas",
        "cert1": "Azure Fundamentals (Completado)",
        "cert2": "B2 First Cambridge (Jul 2026)",
        "cert3": "IA / Introducción a Git (En progreso)",
        "projHeader": "DEMOSTRACIÓN TÉCNICA",
        "p1Title": "Intérprete CHIP-8",
        "p1Desc": "Desarrollo desde cero del núcleo de un emulador retro en C puro. Aplicación de control estricto de memoria (4KB), decodificación de <i>opcodes</i> y ciclo <i>Fetch-Decode-Execute</i>.",
        "p2Desc": "Motor lógico en Java para un juego de Blackjack por consola (CLI). Propósito central: diseño estructurado, aplicación estricta de OOP y encapsulación del estado del juego.",
        "gameHeader": "DESARROLLO DE VIDEOJUEGOS",
        "gameWipTitle": "ROM CHIP-8 (En Desarrollo)",
        "gameWipDesc": "Actualmente conceptualizando y diseñando mi primer videojuego nativo para ser ejecutado sobre mi propio intérprete CHIP-8. Aplicando conceptos de <i>game loop</i>, control de inputs y renderizado a bajo nivel.",
        "btnRepo": "Ver Código Fuente ↗",
        "btnBack": "Volver al Portfolio",
        "introTitle": "Introducción",
        "introSub": "Base de Datos Narrativa",
        "cat1": "Historia Principal",
        "tagWip": "Novela (WIP)",
        "cat2": "Relatos Cortos",
        "tagShort": "Relato Corto",
        "cat3": "Apéndices",
        "titleCodex": "Historia de Wolf 1061",
        "tagLore": "Lore / Ensayo",
        "wolfMainTitle": "Saga Wolf 1061",
        "wolfIntro1": "Bienvenido al repositorio documental de Wolf 1061. Este espacio recopila el diseño narrativo, <i>lore</i> y relatos de ciencia ficción dura que componen mi universo personal. Una base fundamental para mi visión al diseñar mecánicas y mundos interactivos.",
        "wolfIntro2": "Selecciona cualquiera de los expedientes en el directorio lateral para consultar su sinopsis oficial, metadatos y sumergirte en la lectura de los relatos.",
        "btnRead": "INICIAR LECTURA",
        "msgWip": "EN PROCESO DE CREACIÓN",
        "btnToc": "Índice",
        "btnPrev": "Anterior",
        "btnNext": "Siguiente",
        
        // TEXTOS NARRATIVOS WOLF 1061
        "w_guerra-gelida_title": "Guerra Gélida",
        "w_guerra-gelida_meta": "HISTORIA PRINCIPAL // SISTEMA WOLF 1061",
        "w_guerra-gelida_synopsis": "El frágil equilibrio de poder entre los tres planetas del sistema Wolf 1061 está a punto de colapsar. En Visturia, un mundo congelado a ochenta grados bajo cero, un matrimonio concertado se erige como la última esperanza diplomática de las Grandes Casas para evitar una devastadora guerra a escala interplanetaria.",
        
        "w_el-mensajero_title": "El Mensajero Kaelen",
        "w_el-mensajero_meta": "RELATO CORTO // PRECUELA",
        "w_el-mensajero_synopsis": "Dos espías de la facción Kaelen se infiltran en los implacables dominios helados de Visturia con una misión suicida: entregar documentos clasificados a la heredera de la Casa Veles. Tras verse obligados a sabotear maquinaria crítica para cubrir su rastro, la operación se tuerce, cobrándose una vida y forjando el destino del mensajero superviviente.",
        
        "w_historia-visturia_title": "Historia de Visturia",
        "w_historia-visturia_meta": "CÓDICE HISTÓRICO // APÉNDICES",
        "w_historia-visturia_synopsis": "Un registro exhaustivo que traza la evolución del planeta Visturia desde el descubrimiento original del sistema Wolf 1061. El documento detalla el brutal asentamiento de la Casa Veles en los yermos helados, las purgas corporativas por la supervivencia y los acontecimientos clave que han moldeado la geopolítica hasta el presente de Helena."
    },    
    en: {
        "subtitle": "Software Dev Student // HND",
        "hero": "Preparing for a career in <strong>game development and low-level programming</strong>. Looking for my <strong>first professional opportunity</strong> building solid architectures and systems logic.",
        "nav1": "Profile & Skills",
        "nav2": "Technical Projects",
        "nav3": "Game Development",
        "wolfTitle": "Featured Project",
        "wolfDesc": "Explore my sci-fi stories and narrative design (<i>Worldbuilding</i>). Creating fiction is my passion and the foundation for conceptualizing game mechanics.",
        "wolfBtn": "Access Wolf 1061 Saga",
        "aboutHeader": "DEVELOPER PROFILE",
        "photoOverlay": "Available",
        "aboutTitle1": "About me",
        "aboutP1": "Software Development student focused on building a solid career in <i>backend</i> architecture, systems logic, and game development.",
        "aboutP2": "<strong>Internship Goal (Spring 2027):</strong><br>Seeking an international internship in Europe, fully funded by the <strong>Erasmus+</strong> grant (zero cost to the company). My goal is to solve complex problems and add value alongside Senior engineers.",
        "aboutTitle2": "Official Education",
        "edu1": "Higher National Diploma - Multiplatform App Dev (2025-27)",
        "stackTitle": "Tech Stack",
        "certTitle": "Certifications & Languages",
        "cert1": "Azure Fundamentals (Completed)",
        "cert2": "B2 First Cambridge (Jul 2026)",
        "cert3": "AI / Intro to Git (In progress)",
        "projHeader": "TECHNICAL SHOWCASE",
        "p1Title": "CHIP-8 Interpreter",
        "p1Desc": "From-scratch development of a retro emulator core in pure C. Strict memory control (4KB), hexadecimal <i>opcode</i> decoding, and <i>Fetch-Decode-Execute</i> cycle implementation.",
        "p2Desc": "Java logic engine for a command-line Blackjack game (CLI). Core purpose: structured design, strict OOP application, and robust game state encapsulation.",
        "gameHeader": "GAME DEVELOPMENT",
        "gameWipTitle": "CHIP-8 ROM (Work in Progress)",
        "gameWipDesc": "Currently conceptualizing and designing my first native video game to run on my own CHIP-8 interpreter. Applying concepts such as game loops, input control, and low-level rendering.",
        "btnRepo": "View Source Code ↗",
        "btnBack": "Back to Portfolio",
        "introTitle": "Introduction",
        "introSub": "Narrative Database",
        "cat1": "Main Story",
        "tagWip": "Novel (WIP)",
        "cat2": "Short Stories",
        "tagShort": "Short Story",
        "cat3": "Appendices",
        "titleCodex": "History of Wolf 1061",
        "tagLore": "Lore / Essay",
        "wolfMainTitle": "Wolf 1061 Saga",
        "wolfIntro1": "Welcome to the Wolf 1061 documentary repository. This space collects the narrative design, <i>lore</i>, and hard sci-fi stories that make up my personal universe. A foundational base for my vision when designing interactive mechanics and worlds.",
        "wolfIntro2": "Select any of the available files in the left directory to check their official synopsis, metadata, and dive into the stories.",
        "btnRead": "START READING",
        "msgWip": "WORK IN PROGRESS",
        "btnToc": "Index",
        "btnPrev": "Previous",
        "btnNext": "Next",
        
        // NARRATIVE TEXTS WOLF 1061
        "w_guerra-gelida_title": "Guerra Gélida",
        "w_guerra-gelida_meta": "MAIN STORY // WOLF 1061 SYSTEM",
        "w_guerra-gelida_synopsis": "The fragile balance of power between the three planets of the Wolf 1061 system is on the verge of collapse. On Visturia, a frozen world at minus eighty degrees, an arranged marriage stands as the Great Houses' last diplomatic hope to prevent a devastating interplanetary war.",
        
        "w_el-mensajero_title": "The Kaelen Messenger",
        "w_el-mensajero_meta": "SHORT STORY // PREQUEL",
        "w_el-mensajero_synopsis": "Two spies from the Kaelen faction infiltrate the unforgiving frozen domains of Visturia on a suicide mission: deliver classified documents to the Veles heiress. After being forced to sabotage critical machinery to cover their tracks, the operation goes awry, claiming a life and forging the destiny of the surviving messenger.",
        
        "w_historia-visturia_title": "History of Visturia",
        "w_historia-visturia_meta": "HISTORICAL CODEX // APPENDICES",
        "w_historia-visturia_synopsis": "A comprehensive record tracing the evolution of the planet Visturia from the original discovery of the Wolf 1061 system. The document details House Veles's brutal settlement in the frozen wastelands, corporate purges for survival, and the key events that have shaped geopolitics up to Helena's present day."
    }
};

function setLang(lang) {
    // UI de los botones
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + lang).classList.add('active');

    // Traducir todos los elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(i18n[lang][key]) el.innerHTML = i18n[lang][key];
    });

    // Si hay una sinopsis de obra seleccionada, traducirla dinámicamente
    if (obraSeleccionadaKey) {
        document.getElementById('syn-meta').innerText = i18n[lang][`w_${obraSeleccionadaKey}_meta`];
        document.getElementById('syn-title').innerText = i18n[lang][`w_${obraSeleccionadaKey}_title`];
        document.getElementById('syn-desc').innerText = i18n[lang][`w_${obraSeleccionadaKey}_synopsis`];
        
        // Actualizar título en modo lector si está abierto
        if(document.getElementById('rview-reader').classList.contains('active-rview')){
            document.getElementById('lector-titulo').innerText = i18n[lang][`w_${obraSeleccionadaKey}_title`].toUpperCase();
        }
    }
}

// CARGA EL INGLÉS POR DEFECTO AUTOMÁTICAMENTE
document.addEventListener("DOMContentLoaded", () => {
    setLang('en');
});

// ==========================================
// BASE DE DATOS DE ESTADOS Y URLs
// ==========================================
const baseDatosObras = {
    'guerra-gelida': { url: '', estado: 'wip' },
    'el-mensajero': { url: './stories/el-mensajero.md', estado: 'wip' },
    'historia-visturia': { url: './stories/historia-visturia.md', estado: 'wip' }
};