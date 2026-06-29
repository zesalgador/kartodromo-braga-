import type { Translations } from "../types";

export const es: Translations = {
  site: {
    name: "Kartódromo Internacional de Braga",
    tagline: "Velocidad, adrenalina y diversión en pista.",
  },
  nav: {
    home: "Inicio",
    karts: "Karts",
    circuit: "Circuito",
    gallery: "Galería",
    contacts: "Contacto",
    rules: "Reglas",
  },
  header: {
    bookContact: "Reservar / Contactar",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    backMenu: "Volver",
    logoAria: "Kartódromo Internacional de Braga — Inicio",
    selectLanguage: "Seleccionar idioma",
  },
  hero: {
    badge: "Karting en Braga",
    titleBefore: "Kartódromo",
    titleHighlight: "Internacional",
    titleAfter: "de Braga",
    subtitle: "Velocidad, adrenalina y experiencias únicas en pista.",
    description:
      "Descubre el karting en Braga — diversión individual, grupos, familias, empresas o eventos privados.",
    quote: "Solicitar Presupuesto",
    hours: "Horarios",
    contacts: "Contacto",
    pricing: "Ver Tarifas",
    imageAlt:
      "Carrera de karts en el Kartódromo Internacional de Braga con arco Rotax Racing",
  },
  photoPreview: {
    title: "El Kartódromo",
    subtitle: "Imágenes reales de nuestra pista, flota y experiencias en Braga.",
    viewGallery: "Ver galería completa",
  },
  quickAccess: {
    explore: "Explorar",
    quotes: {
      title: "Presupuestos",
      description: "Solicitud para eventos en el kartódromo, autódromo o espacio general.",
    },
    pricing: {
      title: "Tarifas",
      description: "Consulta los precios de alquiler individual y de grupo.",
    },
    gallery: {
      title: "Galería",
      description: "Fotos de la pista, karts y momentos de competición.",
    },
    karts: {
      title: "Nuestros Karts",
      description: "Conoce la flota CRG y las opciones para todas las edades.",
    },
  },
  circuit: {
    title: "Circuito de Automóviles",
    subtitle: "Circuito Vasco Sameiro — deporte de motor en Braga",
    paragraph1:
      "El Circuito Vasco Sameiro, en Braga, es una de las principales referencias del deporte de motor en Portugal. Construido a principios de la década de 1990 e inaugurado en 1993, el circuito nació con el objetivo de crear una estructura permanente para eventos automovilísticos, karting y actividades relacionadas con la velocidad. El trazado, situado en Palmeira, junto al Kartódromo Internacional de Braga, se ha convertido a lo largo de los años en un espacio reconocido para pruebas, entrenamientos y experiencias en pista.",
    paragraph2:
      "Actualmente, el circuito acoge diferentes tipos de eventos y actividades, desde track days, entrenamientos privados, pruebas de competición, eventos empresariales, drift days, picas libres, encuentros automovilísticos y acciones especiales para marcas y grupos. Es un espacio pensado para quienes buscan adrenalina, rendimiento y contacto directo con el mundo del automóvil.",
    eventsTitle: "Tipos de eventos en el circuito",
    events: [
      "Track days",
      "Entrenamientos para carreras",
      "Pruebas de competición",
      "Drift days",
      "Picas libres",
      "Eventos empresariales",
      "Encuentros automovilísticos",
      "Presentaciones de marcas",
      "Experiencias privadas en pista",
    ],
    requestQuote: "Solicitar presupuesto",
    imageAlt:
      "Vista aérea del Circuito Vasco Sameiro y del Kartódromo Internacional de Braga, en Palmeira",
  },
  quote: {
    title: "Solicitar Presupuesto",
    subtitle:
      "Organiza tu evento en el kartódromo, autódromo o espacio general del complejo.",
    selectSpace: "Selecciona el espacio",
    spaces: {
      kartodromo: {
        label: "Kartódromo",
        description: "Eventos, alquileres privados y experiencias de karting en pista.",
      },
      autodromo: {
        label: "Autódromo",
        description:
          "Circuito Vasco Sameiro — pruebas, track days y eventos de automovilismo.",
      },
      espacoGeral: {
        label: "Espacio General",
        description: "Salas, reuniones, formaciones o eventos personalizados en el complejo.",
      },
    },
    durations: [
      "Medio día (4 horas)",
      "Día completo (8 horas)",
      "Fin de semana",
      "Varios días",
      "Por definir",
    ],
    selectedSpace: "Espacio seleccionado:",
    name: "Nombre",
    email: "Email",
    phone: "Teléfono",
    date: "Fecha deseada",
    duration: "Duración",
    message: "¿Qué te gustaría hacer?",
    namePlaceholder: "Tu nombre",
    emailPlaceholder: "email@ejemplo.es",
    phonePlaceholder: "+351 ...",
    messagePlaceholder:
      "Describe el evento, número de participantes, necesidades especiales...",
    submit: "Enviar solicitud de presupuesto",
    sending: "Enviando...",
    successTitle: "¡Solicitud enviada!",
    successMessage:
      "Hemos recibido tu solicitud de presupuesto. Nos pondremos en contacto contigo en breve.",
    newRequest: "Enviar nueva solicitud",
    subjectPrefix: "Solicitud de Presupuesto",
  },
  hours: {
    title: "Horarios",
    subtitle: "Selecciona el tipo de horario que deseas consultar.",
    period: "Periodo",
    notes: "Notas",
    exceptionsTitle: "Días de excepción",
    exceptionsNote: "Válido para todos los horarios del kartódromo.",
    tabs: {
      eventos: {
        label: "Horario de Apertura para Eventos y Alquileres Privados",
        shortLabel: "Eventos y Privados",
      },
      aluguer: {
        label: "Horario para Karts de Alquiler",
        shortLabel: "Karts de Alquiler",
      },
      verao: {
        label: "Horario de Verano",
        shortLabel: "Horario de Verano",
      },
    },
    content: {
      eventos: {
        title: "Horario del Kartódromo para alquileres privados",
        schedule: ["9:00 – 13:00", "Pausa para almuerzo", "14:00 – 18:00", "Todos los días"],
      },
      aluguer: {
        title: "Horario del Kartódromo para karts de alquiler",
        schedule: ["9:00 – 18:00"],
        notes: ["Lunes — cerrado", "Martes — abierto a partir de las 14:00"],
      },
      verao: {
        title: "Horario de verano",
        period: "25 de julio al 23 de agosto",
        schedule: [
          "9:00 – 13:00",
          "Pausa para almuerzo",
          "14:00 – 19:00",
          "Pausa para cena",
          "20:00 – 00:00",
        ],
      },
    },
    closedDays: [
      "1 de enero — cerrado",
      "Domingo y lunes de Pascua — cerrado",
      "24 de junio — cerrado",
      "24 de diciembre — cerrado por la tarde",
      "25 de diciembre — cerrado",
      "31 de diciembre — cerrado por la tarde",
    ],
  },
  contact: {
    title: "Contacto",
    subtitle:
      "Para reservas, información o eventos privados, ponte en contacto con nosotros.",
    email: "Email",
    phone: "Teléfono",
    instagram: "Instagram",
    location: "Ubicación",
    ctaTitle: "¿Listo para acelerar?",
    ctaText:
      "Reserva tu experiencia o solicita información sobre eventos privados y alquileres de grupo.",
    sendEmail: "Enviar Email",
    callNow: "Llamar Ahora",
    directions: "Cómo llegar",
    mapTitle: "Ubicación del Kartódromo Internacional de Braga",
  },
  footer: {
    quickLinks: "Enlaces rápidos",
    contacts: "Contacto",
    rights: "Todos los derechos reservados.",
    call: "Llamar",
    openQuickContact: "Contacto rápido",
    closeQuickContact: "Cerrar contacto rápido",
  },
  gallery: {
    title: "Galería",
    subtitle: "Nuestra flota, la pista y la emoción del karting en Braga.",
    items: [
      {
        title: "Grupo en Pista",
        caption: "Experiencias de karting en el Kartódromo Internacional de Braga.",
        alt: "Grupo de pilotos en la parrilla de salida del Kartódromo Internacional de Braga",
      },
      {
        title: "Salida X30",
        caption: "Competición y emoción en cada salida.",
        alt: "Grupo de karts en la salida en el Kartódromo Internacional de Braga",
      },
      {
        title: "Carrera en Pista",
        caption: "Adrenalina y emoción en cada vuelta.",
        alt: "Grupo de karts en carrera en el Kartódromo Internacional de Braga",
      },
      {
        title: "Entre Bastidores",
        caption:
          "Lewis Hamilton corriendo en el kartódromo de Braga en el campeonato mundial de karting",
        alt: "Lewis Hamilton corriendo en el kartódromo de Braga en el campeonato mundial de karting",
      },
      {
        title: "Pista de Karting",
        caption: "Flota CRG lista para acelerar en Braga.",
        alt: "Karts CRG en pista del Kartódromo Internacional de Braga",
      },
      {
        title: "Vista Aérea",
        caption: "1286 metros de pista técnica y emocionante.",
        alt: "Vista aérea del Kartódromo Internacional de Braga",
      },
      {
        title: "Carreras de Karting",
        caption: "Carreras de karting",
        alt: "Carreras de karting en el Kartódromo Internacional de Braga",
      },
      {
        title: "Instalaciones KIB",
        caption: "Complejo deportivo en el corazón del Minho.",
        alt: "Entrada del Kartódromo Internacional de Braga",
      },
      {
        title: "Complejo Deportivo",
        caption: "Autódromo y kartódromo en un solo espacio.",
        alt: "Vista aérea del complejo KIB con autódromo y kartódromo",
      },
      {
        title: "Autódromo Vasco Sameiro",
        caption: "Circuito homologado FIA Grado 3.",
        alt: "Circuito de Velocidad Vasco Sameiro en Braga",
      },
      {
        title: "CRG 390cc",
        caption: "Potencia, adrenalina y competición.",
        alt: "Kart CRG 390cc del Kartódromo Internacional de Braga",
      },
      {
        title: "CRG 270cc",
        caption: "Equilibrio, seguridad y diversión.",
        alt: "Kart CRG 270cc del Kartódromo Internacional de Braga",
      },
      {
        title: "CRG Bi-plaza",
        caption: "Experiencia compartida en familia.",
        alt: "Kart CRG bi-plaza del Kartódromo Internacional de Braga",
      },
    ],
  },
  karts: {
    title: "Nuestros Karts",
    subtitle: "Flota CRG preparada para ocio, familias, grupos y competición.",
    fleetLabel: "Flota KIB",
    specsTitle: "Características técnicas",
    idealForTitle: "Ideal para",
    alsoAvailable: "También disponible",
    viewPricing: "Consultar tarifas",
    detailed: {
      crg270: {
        title: "CRG 270cc",
        tagline: "Equilibrio, seguridad y diversión",
        imageAlt: "Kart CRG 270cc en el Kartódromo Internacional de Braga",
        specs: [
          "Motor Honda GX270",
          "Motor 4 tiempos 270cc",
          "Velocidad máxima aproximada: 60–70 km/h",
          "Frenado hidráulico",
          "Pedales ajustables",
          "Sistema de seguridad adaptado al alquiler",
          "Estructura robusta para uso intensivo",
        ],
        idealFor: [
          "Principiantes",
          "Familias y grupos",
          "Sesiones de ocio",
          "Experiencias de karting accesibles",
          "Conducción segura y equilibrada",
        ],
      },
      crg390: {
        title: "CRG 390cc",
        tagline: "Potencia, adrenalina y competición",
        imageAlt: "Kart CRG 390cc en el Kartódromo Internacional de Braga",
        specs: [
          "Motor Honda GX390",
          "Motor 4 tiempos 390cc",
          "Velocidad máxima aproximada: 70–85 km/h",
          "Frenado hidráulico",
          "Pedales ajustables",
          "Sistema de seguridad adaptado al alquiler",
          "Estructura robusta para uso intensivo",
        ],
        idealFor: [
          "Pilotos con más experiencia",
          "Eventos competitivos",
          "Empresas y grupos",
          "Carreras privadas",
          "Experiencias más intensas en pista",
        ],
      },
    },
    simple: {
      crianca: {
        title: "Karting Infantil",
        description:
          "Karts CRG adaptados a los niños, con conducción segura y divertida. Ideal para que los más pequeños den sus primeras vueltas en pista, siempre con equipamiento de protección incluido.",
        imageAlt:
          "Kart CRG Centurion Mini para niños en el Kartódromo Internacional de Braga",
      },
      bilugar: {
        title: "Kart Bi-plaza",
        description:
          "Experiencia compartida entre adulto y niño en el mismo kart CRG bi-plaza. Perfecto para familias que quieren vivir la emoción de la pista juntos, con total seguridad.",
        imageAlt: "Kart CRG bi-plaza en el Kartódromo Internacional de Braga",
      },
    },
  },
  pricing: {
    title: "Tarifas",
    subtitle: "Consulta los precios de alquiler individual y de grupo.",
    individualTitle: "Alquiler Individual",
    individualSubtitle:
      "Ideal para quien quiera experimentar la adrenalina de la pista de forma sencilla, rápida y divertida.",
    groupTitle: "Alquiler de Grupo",
    groupSubtitle:
      "Formato ideal para grupos, empresas, cumpleaños, reuniones y eventos privados.",
    groupBanner: "Precios Alquiler de Grupo — 12 a 20 karts",
    formatLabel: "Formato",
    minMax: "Mínimo 12 participantes | Máximo 20 participantes",
    individual: {
      adult: "Karting Individual Adulto — CRG",
      child: "Karting Infantil",
      bilugar: "Karting Bi-plaza — Adulto + Niño",
    },
    durations: {
      min10: "10 minutos",
      min20: "20 minutos",
      min30: "30 minutos",
    },
    notes: [
      "Equipamiento de seguridad incluido",
      "Ideal para grupos, familias y eventos",
      "Diversión garantizada para todas las edades",
    ],
    groupFormats: [
      "5 min + 20 min",
      "5 min + 25 min",
      "10 min + 30 min",
      "10 min + 60 min",
      "10 min + 90 min",
    ],
  },
  security: {
    title: "Reglas de Seguridad",
    subtitle: "Tu seguridad y la de todos los pilotos es nuestra prioridad en pista.",
    intro:
      "Nuestras actividades son de ocio y ofrecen seguridad al participante. Sin embargo, al estar sujetas al control y manejo de un vehículo en movimiento, los karts deben conducirse con atención y respetando las reglas de seguridad.",
    warning:
      "En caso de incumplimiento de estas reglas, se ordenará parar de inmediato, sin derecho a ninguna devolución del importe pagado, y estará obligado a pagar cualquier daño causado al kart o a la pista.",
    rules: [
      "No entrar en la pista sin autorización",
      "Comprobar el sentido de circulación de la pista a lo largo de todo el recorrido",
      "Facilitar el adelantamiento a los más rápidos",
      "Evitar maniobras bruscas que puedan provocar accidentes y daños en el material",
      "Al salir de la pista hacia los boxes, señalizar la maniobra levantando uno de los brazos",
      "En caso de salida de pista o si el motor del kart se apaga, no salir del kart y señalizar la posición levantando uno de los brazos. A continuación, el asistente de pista se desplazará hasta el lugar para prestar asistencia",
      "No está permitido utilizar chanclas o calzado similar que no permita ajustarse firmemente al pie del usuario",
    ],
    footer:
      "Si tiene alguna duda, aclárela con los asistentes de pista antes de arrancar.",
  },
};
