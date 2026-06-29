import type { Translations } from "../types";

export const fr: Translations = {
  site: {
    name: "Kartódromo Internacional de Braga",
    tagline: "Vitesse, adrénaline et plaisir sur la piste.",
  },
  nav: {
    home: "Accueil",
    karts: "Karts",
    circuit: "Circuit",
    gallery: "Galerie",
    contacts: "Contact",
    rules: "Règles",
  },
  header: {
    bookContact: "Réserver / Contacter",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    backMenu: "Retour",
    logoAria: "Kartódromo Internacional de Braga — Accueil",
    selectLanguage: "Choisir la langue",
  },
  hero: {
    badge: "Karting à Braga",
    titleBefore: "Kartódromo",
    titleHighlight: "Internacional",
    titleAfter: "de Braga",
    subtitle: "Vitesse, adrénaline et expériences uniques sur la piste.",
    description:
      "Découvrez le karting à Braga — plaisir en solo, en groupe, en famille, en entreprise ou lors d'événements privés.",
    quote: "Demander un Devis",
    hours: "Horaires",
    contacts: "Contact",
    pricing: "Voir les Tarifs",
    imageAlt:
      "Course de karts au Kartódromo Internacional de Braga avec l'arche Rotax Racing",
  },
  photoPreview: {
    title: "Le Kartódromo",
    subtitle: "Images réelles de notre piste, de notre flotte et de nos expériences à Braga.",
    viewGallery: "Voir la galerie complète",
  },
  quickAccess: {
    explore: "Explorer",
    quotes: {
      title: "Devis",
      description: "Demande pour des événements au kartódromo, à l'autódromo ou dans l'espace général.",
    },
    pricing: {
      title: "Tarifs",
      description: "Consultez les tarifs de location individuelle et de groupe.",
    },
    gallery: {
      title: "Galerie",
      description: "Photos de la piste, des karts et des moments de compétition.",
    },
    karts: {
      title: "Nos Karts",
      description: "Découvrez la flotte CRG et les options pour tous les âges.",
    },
  },
  circuit: {
    title: "Circuit Automobile",
    subtitle: "Circuit Vasco Sameiro — sport automobile à Braga",
    paragraph1:
      "Le Circuit Vasco Sameiro, à Braga, est l'une des principales références du sport automobile au Portugal. Construit au début des années 1990 et inauguré en 1993, le circuit est né avec l'objectif de créer une structure permanente pour les événements automobiles, le karting et les activités liées à la vitesse. Situé à Palmeira, à côté du Kartódromo Internacional de Braga, le tracé est devenu au fil des ans un espace reconnu pour les épreuves, les entraînements et les expériences sur piste.",
    paragraph2:
      "Aujourd'hui, le circuit accueille différents types d'événements et d'activités, des track days aux entraînements privés, en passant par les tests de compétition, les événements d'entreprise, les drift days, les picas libres, les rencontres automobiles et les actions spéciales pour marques et groupes. C'est un espace conçu pour ceux qui recherchent l'adrénaline, la performance et un contact direct avec l'univers automobile.",
    eventsTitle: "Types d'événements sur le circuit",
    events: [
      "Track days",
      "Entraînements pour courses",
      "Tests de compétition",
      "Drift days",
      "Picas libres",
      "Événements d'entreprise",
      "Rencontres automobiles",
      "Présentations de marques",
      "Expériences privées sur piste",
    ],
    requestQuote: "Demander un devis",
    imageAlt:
      "Vue aérienne du Circuit Vasco Sameiro et du Kartódromo Internacional de Braga, à Palmeira",
  },
  quote: {
    title: "Demander un Devis",
    subtitle:
      "Organisez votre événement au kartódromo, à l'autódromo ou dans l'espace général du complexe.",
    selectSpace: "Sélectionnez l'espace",
    spaces: {
      kartodromo: {
        label: "Kartódromo",
        description: "Événements, locations privées et expériences de karting sur piste.",
      },
      autodromo: {
        label: "Autódromo",
        description:
          "Circuit Vasco Sameiro — épreuves, track days et événements automobiles.",
      },
      espacoGeral: {
        label: "Espace Général",
        description: "Salles, réceptions, formations ou événements personnalisés au complexe.",
      },
    },
    durations: [
      "Demi-journée (4 heures)",
      "Journée complète (8 heures)",
      "Week-end",
      "Plusieurs jours",
      "À définir",
    ],
    selectedSpace: "Espace sélectionné :",
    name: "Nom",
    email: "Email",
    phone: "Téléphone",
    date: "Date souhaitée",
    duration: "Durée",
    message: "Que souhaitez-vous faire ?",
    namePlaceholder: "Votre nom",
    emailPlaceholder: "email@exemple.fr",
    phonePlaceholder: "+351 ...",
    messagePlaceholder:
      "Décrivez l'événement, le nombre de participants, les besoins particuliers...",
    submit: "Envoyer la demande de devis",
    sending: "Envoi en cours...",
    successTitle: "Demande envoyée !",
    successMessage:
      "Nous avons bien reçu votre demande de devis. Nous vous contacterons prochainement.",
    newRequest: "Envoyer une nouvelle demande",
    subjectPrefix: "Demande de Devis",
  },
  hours: {
    title: "Horaires",
    subtitle: "Sélectionnez le type d'horaire que vous souhaitez consulter.",
    period: "Période",
    notes: "Notes",
    exceptionsTitle: "Jours d'exception",
    exceptionsNote: "Valable pour tous les horaires du kartódromo.",
    tabs: {
      eventos: {
        label: "Horaires d'Ouverture pour Événements et Locations Privées",
        shortLabel: "Événements & Privés",
      },
      aluguer: {
        label: "Horaires pour Karts de Location",
        shortLabel: "Karts de Location",
      },
      verao: {
        label: "Horaires d'Été",
        shortLabel: "Horaires d'Été",
      },
    },
    content: {
      eventos: {
        title: "Horaires du Kartódromo pour les locations privées",
        schedule: ["9:00 – 13:00", "Pause déjeuner", "14:00 – 18:00", "Tous les jours"],
      },
      aluguer: {
        title: "Horaires du Kartódromo pour les karts de location",
        schedule: ["9:00 – 18:00"],
        notes: ["Lundi — fermé", "Mardi — ouvert à partir de 14:00"],
      },
      verao: {
        title: "Horaires d'été",
        period: "25 juillet au 23 août",
        schedule: [
          "9:00 – 13:00",
          "Pause déjeuner",
          "14:00 – 19:00",
          "Pause dîner",
          "20:00 – 00:00",
        ],
      },
    },
    closedDays: [
      "1er janvier — fermé",
      "Dimanche et lundi de Pâques — fermé",
      "24 juin — fermé",
      "24 décembre — fermé l'après-midi",
      "25 décembre — fermé",
      "31 décembre — fermé l'après-midi",
    ],
  },
  contact: {
    title: "Contact",
    subtitle:
      "Pour les réservations, informations ou événements privés, contactez-nous.",
    email: "Email",
    phone: "Téléphone",
    instagram: "Instagram",
    location: "Localisation",
    ctaTitle: "Prêt à accélérer ?",
    ctaText:
      "Réservez votre expérience ou demandez des informations sur les événements privés et les locations de groupe.",
    sendEmail: "Envoyer un Email",
    callNow: "Appeler Maintenant",
    directions: "Comment s'y rendre",
    mapTitle: "Localisation du Kartódromo Internacional de Braga",
  },
  footer: {
    quickLinks: "Liens rapides",
    contacts: "Contact",
    rights: "Tous droits réservés.",
    call: "Appeler",
    openQuickContact: "Contact rapide",
    closeQuickContact: "Fermer le contact rapide",
  },
  gallery: {
    title: "Galerie",
    subtitle: "Notre flotte, la piste et l'émotion du karting à Braga.",
    items: [
      {
        title: "Groupe sur Piste",
        caption: "Expériences de karting au Kartódromo Internacional de Braga.",
        alt: "Groupe de pilotes sur la grille de départ du Kartódromo Internacional de Braga",
      },
      {
        title: "Départ X30",
        caption: "Compétition et émotion à chaque départ.",
        alt: "Groupe de karts au départ au Kartódromo Internacional de Braga",
      },
      {
        title: "Course sur Piste",
        caption: "Adrénaline et émotion à chaque tour.",
        alt: "Groupe de karts en course au Kartódromo Internacional de Braga",
      },
      {
        title: "Coulisses",
        caption:
          "Lewis Hamilton en course au kartódromo de Braga lors du championnat du monde de karting",
        alt: "Lewis Hamilton en course au kartódromo de Braga lors du championnat du monde de karting",
      },
      {
        title: "Piste de Karting",
        caption: "Flotte CRG prête à accélérer à Braga.",
        alt: "Karts CRG sur la piste du Kartódromo Internacional de Braga",
      },
      {
        title: "Vue Aérienne",
        caption: "1286 mètres de piste technique et palpitante.",
        alt: "Vue aérienne du Kartódromo Internacional de Braga",
      },
      {
        title: "Courses de Karting",
        caption: "Courses de karting",
        alt: "Courses de karting au Kartódromo Internacional de Braga",
      },
      {
        title: "Installations KIB",
        caption: "Complexe sportif au cœur du Minho.",
        alt: "Entrée du Kartódromo Internacional de Braga",
      },
      {
        title: "Complexe Sportif",
        caption: "Autódromo et kartódromo en un seul lieu.",
        alt: "Vue aérienne du complexe KIB avec autódromo et kartódromo",
      },
      {
        title: "Autódromo Vasco Sameiro",
        caption: "Circuit homologué FIA Grade 3.",
        alt: "Circuit de Vitesse Vasco Sameiro à Braga",
      },
      {
        title: "CRG 390cc",
        caption: "Puissance, adrénaline et compétition.",
        alt: "Kart CRG 390cc du Kartódromo Internacional de Braga",
      },
      {
        title: "CRG 270cc",
        caption: "Équilibre, sécurité et plaisir.",
        alt: "Kart CRG 270cc du Kartódromo Internacional de Braga",
      },
      {
        title: "CRG Biplace",
        caption: "Expérience partagée en famille.",
        alt: "Kart CRG biplace du Kartódromo Internacional de Braga",
      },
    ],
  },
  karts: {
    title: "Nos Karts",
    subtitle: "Flotte CRG prête pour le loisir, les familles, les groupes et la compétition.",
    fleetLabel: "Flotte KIB",
    specsTitle: "Caractéristiques techniques",
    idealForTitle: "Idéal pour",
    alsoAvailable: "Également disponible",
    viewPricing: "Consulter les tarifs",
    detailed: {
      crg270: {
        title: "CRG 270cc",
        tagline: "Équilibre, sécurité et plaisir",
        imageAlt: "Kart CRG 270cc au Kartódromo Internacional de Braga",
        specs: [
          "Moteur Honda GX270",
          "Moteur 4 temps 270cc",
          "Vitesse maximale approximative : 60–70 km/h",
          "Freinage hydraulique",
          "Pédales réglables",
          "Système de sécurité adapté à la location",
          "Structure robuste pour une utilisation intensive",
        ],
        idealFor: [
          "Débutants",
          "Familles et groupes",
          "Sessions de loisir",
          "Expériences de karting accessibles",
          "Conduite sûre et équilibrée",
        ],
      },
      crg390: {
        title: "CRG 390cc",
        tagline: "Puissance, adrénaline et compétition",
        imageAlt: "Kart CRG 390cc au Kartódromo Internacional de Braga",
        specs: [
          "Moteur Honda GX390",
          "Moteur 4 temps 390cc",
          "Vitesse maximale approximative : 70–85 km/h",
          "Freinage hydraulique",
          "Pédales réglables",
          "Système de sécurité adapté à la location",
          "Structure robuste pour une utilisation intensive",
        ],
        idealFor: [
          "Pilotes plus expérimentés",
          "Événements compétitifs",
          "Entreprises et groupes",
          "Courses privées",
          "Expériences plus intenses sur piste",
        ],
      },
    },
    simple: {
      crianca: {
        title: "Karting Enfant",
        description:
          "Karts CRG adaptés aux enfants, avec une conduite sûre et amusante. Idéal pour que les plus jeunes fassent leurs premiers tours sur piste, toujours avec l'équipement de protection inclus.",
        imageAlt:
          "Kart CRG Centurion Mini pour enfants au Kartódromo Internacional de Braga",
      },
      bilugar: {
        title: "Kart Biplace",
        description:
          "Expérience partagée entre adulte et enfant dans le même kart CRG biplace. Parfait pour les familles qui veulent vivre l'émotion de la piste ensemble, en toute sécurité.",
        imageAlt: "Kart CRG biplace au Kartódromo Internacional de Braga",
      },
    },
  },
  pricing: {
    title: "Tarifs",
    subtitle: "Consultez les tarifs de location individuelle et de groupe.",
    individualTitle: "Location Individuelle",
    individualSubtitle:
      "Idéal pour ceux qui veulent vivre l'adrénaline de la piste de manière simple, rapide et amusante.",
    groupTitle: "Location de Groupe",
    groupSubtitle:
      "Format idéal pour les groupes, entreprises, anniversaires, réceptions et événements privés.",
    groupBanner: "Tarifs Location de Groupe — 12 à 20 karts",
    formatLabel: "Format",
    minMax: "Minimum 12 participants | Maximum 20 participants",
    individual: {
      adult: "Karting Individuel Adulte — CRG",
      child: "Karting Enfant",
      bilugar: "Karting Biplace — Adulte + Enfant",
    },
    durations: {
      min10: "10 minutes",
      min20: "20 minutes",
      min30: "30 minutes",
    },
    notes: [
      "Équipement de sécurité inclus",
      "Idéal pour les groupes, familles et événements",
      "Plaisir garanti pour tous les âges",
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
    title: "Règles de Sécurité",
    subtitle: "Votre sécurité et celle de tous les pilotes est notre priorité sur la piste.",
    intro:
      "Nos activités sont de loisir et offrent une sécurité aux participants. Cependant, étant soumises au contrôle et à la conduite d'un véhicule en mouvement, les karts doivent être conduits avec attention et en respectant les règles de sécurité.",
    warning:
      "En cas de non-respect de ces règles, vous serez immédiatement arrêté, sans droit à aucun remboursement du montant payé, et vous serez tenu de payer tout dommage causé au kart ou à la piste.",
    rules: [
      "Ne pas entrer sur la piste sans autorisation",
      "Vérifier le sens de circulation de la piste sur l'ensemble du parcours",
      "Faciliter le dépassement aux pilotes plus rapides",
      "Éviter les manœuvres brusques pouvant provoquer des accidents et des dommages au matériel",
      "En quittant la piste pour les stands, signaler la manœuvre en levant un bras",
      "En cas de sortie de piste ou si le moteur du kart s'arrête, ne pas quitter le kart et signaler votre position en levant un bras. Un assistant de piste se rendra ensuite sur les lieux pour vous assister",
      "Les tongs ou chaussures similaires qui ne permettent pas un bon maintien au pied ne sont pas autorisées",
    ],
    footer:
      "Si vous avez des questions, veuillez les clarifier avec les assistants de piste avant de partir.",
  },
};
