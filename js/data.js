/* Datos de las redes de estudio - FIUSAC
   Fuente: redesestudio.ingenieria.usac.edu.gt
   Pensum CLAR 2022. Generado para el proyecto Control de Cursos Aprobados. */
const CAREERS = {
  "sistemas": {
    "id": "sistemas",
    "name": "Ingeniería en Ciencias y Sistemas",
    "shortName": "Sistemas",
    "pensum": "CLAR 2022",
    "accent": "#f79645",
    "accentDark": "#c96a1e",
    "soft": "#fdf0e4",
    "deep": "#6b3410",
    "description": "Formación orientada al análisis, diseño, construcción y puesta en marcha de soluciones informáticas, con énfasis en la optimización de recursos y la agilización de procesos mediante tecnologías de la información.",
    "areas": {
      "metodologia": {
        "name": "Metodología de Sistemas",
        "color": "#32849a"
      },
      "ciencias": {
        "name": "Ciencias de la Computación",
        "color": "#ffc100"
      },
      "desarrollo": {
        "name": "Desarrollo de Software",
        "color": "#76913b"
      }
    },
    "targetCredits": 300,
    "planCredits": 351,
    "totalCourses": 75,
    "semesters": [
      {
        "number": 1,
        "label": "Primer semestre",
        "courses": [
          {
            "code": "0005",
            "name": "Técnicas de Estudio e Investigación",
            "credits": 3,
            "prereqs": [],
            "area": null
          },
          {
            "code": "0017",
            "name": "Área Social Humanística 1",
            "credits": 3,
            "prereqs": [],
            "area": null
          },
          {
            "code": "0101",
            "name": "Área Matemática Básica 1",
            "credits": 9,
            "prereqs": [],
            "area": null
          },
          {
            "code": "0006",
            "name": "Idioma Técnico 1",
            "credits": 3,
            "prereqs": [],
            "area": null
          },
          {
            "code": "0039",
            "name": "Deportes 1",
            "credits": 2,
            "prereqs": [],
            "area": null
          }
        ]
      },
      {
        "number": 2,
        "label": "Segundo semestre",
        "courses": [
          {
            "code": "0019",
            "name": "Área Social Humanística 2",
            "credits": 3,
            "prereqs": [
              "0017"
            ],
            "area": null
          },
          {
            "code": "0103",
            "name": "Área Matemática Básica 2",
            "credits": 9,
            "prereqs": [
              "0101"
            ],
            "area": null
          },
          {
            "code": "0147",
            "name": "Física Básica",
            "credits": 5,
            "prereqs": [
              "0101"
            ],
            "area": null
          },
          {
            "code": "0960",
            "name": "Matemática para Computación 1",
            "credits": 5,
            "prereqs": [
              "0101"
            ],
            "area": null
          },
          {
            "code": "0008",
            "name": "Idioma Técnico 2",
            "credits": 3,
            "prereqs": [
              "0006"
            ],
            "area": null
          },
          {
            "code": "0040",
            "name": "Deportes 2",
            "credits": 2,
            "prereqs": [
              "0039"
            ],
            "area": null
          }
        ]
      },
      {
        "number": 3,
        "label": "Tercer semestre",
        "courses": [
          {
            "code": "0107",
            "name": "Área Matemática Intermedia 1",
            "credits": 9,
            "prereqs": [
              "0103"
            ],
            "area": null
          },
          {
            "code": "0150",
            "name": "Física 1",
            "credits": 5,
            "prereqs": [
              "0103",
              "0147"
            ],
            "area": null
          },
          {
            "code": "0770",
            "name": "Introducción a la Programación y Computación 1",
            "credits": 6,
            "prereqs": [
              "0103",
              "0147",
              "0960"
            ],
            "area": "desarrollo"
          },
          {
            "code": "0795",
            "name": "Lógica de Sistemas",
            "credits": 3,
            "prereqs": [
              "0103",
              "0147",
              "0960"
            ],
            "area": "metodologia"
          },
          {
            "code": "0962",
            "name": "Matemática para Computación 2",
            "credits": 5,
            "prereqs": [
              "0103",
              "0147",
              "0960"
            ],
            "area": null
          },
          {
            "code": "0001",
            "name": "Ética Profesional",
            "credits": 2,
            "prereqs": [
              "0019"
            ],
            "area": null
          },
          {
            "code": "0009",
            "name": "Idioma Técnico 3",
            "credits": 3,
            "prereqs": [
              "0008"
            ],
            "area": null
          }
        ]
      },
      {
        "number": 4,
        "label": "Cuarto semestre",
        "courses": [
          {
            "code": "0112",
            "name": "Área Matemática Intermedia 2",
            "credits": 6,
            "prereqs": [
              "0107"
            ],
            "area": null
          },
          {
            "code": "0114",
            "name": "Área Matemática Intermedia 3",
            "credits": 6,
            "prereqs": [
              "0107"
            ],
            "area": null
          },
          {
            "code": "0152",
            "name": "Física 2",
            "credits": 6,
            "prereqs": [
              "0107",
              "0150"
            ],
            "area": null
          },
          {
            "code": "0771",
            "name": "Introducción a la Programación y Computación 2",
            "credits": 6,
            "prereqs": [
              "0107",
              "0770",
              "0795",
              "0960"
            ],
            "area": "desarrollo"
          },
          {
            "code": "0796",
            "name": "Lenguajes Formales y de Programación",
            "credits": 4,
            "prereqs": [
              "0770",
              "0795",
              "0960"
            ],
            "area": "ciencias"
          },
          {
            "code": "2025",
            "name": "Prácticas Iniciales",
            "credits": 0,
            "prereqs": [
              "0103",
              "0770"
            ],
            "area": null
          },
          {
            "code": "0010",
            "name": "Lógica",
            "credits": 1,
            "prereqs": [
              "0019"
            ],
            "area": null
          },
          {
            "code": "0011",
            "name": "Idioma Técnico 4",
            "credits": 3,
            "prereqs": [
              "0009"
            ],
            "area": null
          }
        ]
      },
      {
        "number": 5,
        "label": "Quinto semestre",
        "courses": [
          {
            "code": "0116",
            "name": "Matemática Aplicada 3",
            "credits": 5,
            "prereqs": [
              "0112",
              "0114"
            ],
            "area": null
          },
          {
            "code": "0118",
            "name": "Matemática Aplicada 1",
            "credits": 5,
            "prereqs": [
              "0112",
              "0114"
            ],
            "area": null
          },
          {
            "code": "0732",
            "name": "Estadística 1",
            "credits": 5,
            "prereqs": [
              "0107",
              "0005"
            ],
            "area": null
          },
          {
            "code": "0772",
            "name": "Estructuras de Datos",
            "credits": 6,
            "prereqs": [
              "0771",
              "0796",
              "0962"
            ],
            "area": "desarrollo"
          },
          {
            "code": "0777",
            "name": "Organización de Lenguajes y Compiladores 1",
            "credits": 6,
            "prereqs": [
              "0771",
              "0796",
              "0962"
            ],
            "area": "ciencias"
          },
          {
            "code": "0964",
            "name": "Organización Computacional",
            "credits": 4,
            "prereqs": [
              "0152",
              "0771",
              "0962"
            ],
            "area": "ciencias"
          },
          {
            "code": "0018",
            "name": "Filosofía de la Ciencia",
            "credits": 1,
            "prereqs": [
              "0019"
            ],
            "area": null
          }
        ]
      },
      {
        "number": 6,
        "label": "Sexto semestre",
        "courses": [
          {
            "code": "0014",
            "name": "Economía",
            "credits": 3,
            "prereqs": [
              "0732"
            ],
            "area": "metodologia"
          },
          {
            "code": "0601",
            "name": "Investigación de Operaciones I",
            "credits": 6,
            "prereqs": [
              "0732",
              "0771"
            ],
            "area": null
          },
          {
            "code": "0722",
            "name": "Teoría de Sistemas 1",
            "credits": 4,
            "prereqs": [
              "0116",
              "0118",
              "0732",
              "0772"
            ],
            "area": "metodologia"
          },
          {
            "code": "0773",
            "name": "Manejo e Implementación de Archivos",
            "credits": 5,
            "prereqs": [
              "0772",
              "0796"
            ],
            "area": "desarrollo"
          },
          {
            "code": "0778",
            "name": "Arquitectura de Computadores y Ensambladores 1",
            "credits": 5,
            "prereqs": [
              "0796",
              "0964"
            ],
            "area": "ciencias"
          },
          {
            "code": "0781",
            "name": "Organización de Lenguajes y Compiladores 2",
            "credits": 6,
            "prereqs": [
              "0772",
              "0777"
            ],
            "area": "ciencias"
          },
          {
            "code": "0120",
            "name": "Matemática Aplicada 2",
            "credits": 5,
            "prereqs": [
              "0118"
            ],
            "area": null
          },
          {
            "code": "0122",
            "name": "Matemática Aplicada 4",
            "credits": 5,
            "prereqs": [
              "0118"
            ],
            "area": null
          },
          {
            "code": "0200",
            "name": "Ingeniería Eléctrica 1",
            "credits": 6,
            "prereqs": [
              "0114",
              "0152"
            ],
            "area": null
          }
        ]
      },
      {
        "number": 7,
        "label": "Séptimo semestre",
        "courses": [
          {
            "code": "0281",
            "name": "Sistemas Operativos 1",
            "credits": 6,
            "prereqs": [
              "0778",
              "0781"
            ],
            "area": "ciencias"
          },
          {
            "code": "0603",
            "name": "Investigación de Operaciones II",
            "credits": 6,
            "prereqs": [
              "0601"
            ],
            "area": null
          },
          {
            "code": "0724",
            "name": "Teoría de Sistemas 2",
            "credits": 4,
            "prereqs": [
              "0601",
              "0722"
            ],
            "area": "metodologia"
          },
          {
            "code": "0774",
            "name": "Sistemas de Bases de Datos 1",
            "credits": 6,
            "prereqs": [
              "0773"
            ],
            "area": "desarrollo"
          },
          {
            "code": "0779",
            "name": "Arquitectura de Computadores y Ensambladores 2",
            "credits": 5,
            "prereqs": [
              "0778"
            ],
            "area": "ciencias"
          },
          {
            "code": "0970",
            "name": "Redes de Computadoras 1",
            "credits": 5,
            "prereqs": [
              "0773",
              "0778"
            ],
            "area": "ciencias"
          },
          {
            "code": "2036",
            "name": "Prácticas Intermedias",
            "credits": 0,
            "prereqs": [
              "0773",
              "0777",
              "0778",
              "2025"
            ],
            "area": null
          },
          {
            "code": "0734",
            "name": "Estadística 2",
            "credits": 5,
            "prereqs": [
              "0732"
            ],
            "area": null
          }
        ]
      },
      {
        "number": 8,
        "label": "Octavo semestre",
        "courses": [
          {
            "code": "0283",
            "name": "Análisis y Diseño de Sistemas 1",
            "credits": 6,
            "prereqs": [
              "0774"
            ],
            "area": "desarrollo"
          },
          {
            "code": "0285",
            "name": "Sistemas Operativos 2",
            "credits": 4,
            "prereqs": [
              "0281"
            ],
            "area": "ciencias"
          },
          {
            "code": "0775",
            "name": "Sistemas de Bases de Datos 2",
            "credits": 7,
            "prereqs": [
              "0281",
              "0774"
            ],
            "area": "desarrollo"
          },
          {
            "code": "0797",
            "name": "Seminario de Sistemas I",
            "credits": 5,
            "prereqs": [
              "0281",
              "0724",
              "0774"
            ],
            "area": "metodologia"
          },
          {
            "code": "0975",
            "name": "Redes de Computadoras 2",
            "credits": 6,
            "prereqs": [
              "0970"
            ],
            "area": "ciencias"
          },
          {
            "code": "0700",
            "name": "Ingeniería Económica 1",
            "credits": 4,
            "prereqs": [
              "0732"
            ],
            "area": null
          }
        ]
      },
      {
        "number": 9,
        "label": "Noveno semestre",
        "courses": [
          {
            "code": "0729",
            "name": "Modelación y Simulación 1",
            "credits": 5,
            "prereqs": [
              "0603",
              "0724"
            ],
            "area": "metodologia"
          },
          {
            "code": "0785",
            "name": "Análisis y Diseño de Sistemas 2",
            "credits": 7,
            "prereqs": [
              "0283"
            ],
            "area": "desarrollo"
          },
          {
            "code": "0786",
            "name": "Sistemas Organizacionales y Gerenciales 1",
            "credits": 5,
            "prereqs": [
              "0283",
              "0722"
            ],
            "area": "metodologia"
          },
          {
            "code": "0798",
            "name": "Seminario de Sistemas 2",
            "credits": 5,
            "prereqs": [
              "0285",
              "0775",
              "0797"
            ],
            "area": "metodologia"
          },
          {
            "code": "0972",
            "name": "Inteligencia Artificial 1",
            "credits": 7,
            "prereqs": [
              "0724",
              "0775",
              "0781"
            ],
            "area": "ciencias"
          },
          {
            "code": "2009",
            "name": "Prácticas Finales Ingeniería Ciencias y Sistemas",
            "credits": 0,
            "prereqs": [
              "0283",
              "0285",
              "0975",
              "2036"
            ],
            "area": null
          },
          {
            "code": "0776",
            "name": "Bases de Datos Avanzadas",
            "credits": 5,
            "prereqs": [
              "0775"
            ],
            "area": "desarrollo"
          },
          {
            "code": "0788",
            "name": "Sistemas Aplicados 1",
            "credits": 5,
            "prereqs": [
              "0283"
            ],
            "area": "desarrollo"
          },
          {
            "code": "0966",
            "name": "Seguridad y Auditoría de Redes de Computadoras",
            "credits": 3,
            "prereqs": [
              "0975"
            ],
            "area": "ciencias"
          }
        ]
      },
      {
        "number": 10,
        "label": "Décimo semestre",
        "courses": [
          {
            "code": "0720",
            "name": "Modelación y Simulación 2",
            "credits": 6,
            "prereqs": [
              "0729"
            ],
            "area": "metodologia"
          },
          {
            "code": "0780",
            "name": "Software Avanzado",
            "credits": 8,
            "prereqs": [
              "0785"
            ],
            "area": "desarrollo"
          },
          {
            "code": "0787",
            "name": "Sistemas Organizacionales y Gerenciales 2",
            "credits": 6,
            "prereqs": [
              "0786"
            ],
            "area": "metodologia"
          },
          {
            "code": "0799",
            "name": "Seminario de Investigación",
            "credits": 3,
            "prereqs": [
              "0785",
              "0786",
              "0798"
            ],
            "area": "metodologia"
          },
          {
            "code": "0735",
            "name": "Auditoría de Proyectos de Software",
            "credits": 6,
            "prereqs": [
              "0785"
            ],
            "area": "metodologia"
          },
          {
            "code": "0789",
            "name": "Sistemas Aplicados 2",
            "credits": 5,
            "prereqs": [
              "0785",
              "0788"
            ],
            "area": "desarrollo"
          },
          {
            "code": "0790",
            "name": "Emprendedores de Negocios Informáticos",
            "credits": 6,
            "prereqs": [
              "0786"
            ],
            "area": "metodologia"
          },
          {
            "code": "0968",
            "name": "Inteligencia Artificial 2",
            "credits": 5,
            "prereqs": [
              "0972"
            ],
            "area": "ciencias"
          },
          {
            "code": "0974",
            "name": "Redes de Nueva Generación",
            "credits": 3,
            "prereqs": [
              "0975"
            ],
            "area": "metodologia"
          },
          {
            "code": "7999",
            "name": "Seminario de Investigación E.P.S. Sistemas",
            "credits": 3,
            "prereqs": [
              "0785",
              "0786",
              "0798"
            ],
            "area": null
          }
        ]
      }
    ]
  },
  "industrial": {
    "id": "industrial",
    "name": "Ingeniería Industrial",
    "shortName": "Industrial",
    "pensum": "CLAR 2022",
    "accent": "#76933c",
    "accentDark": "#4f6b22",
    "soft": "#edf3e1",
    "deep": "#2f4210",
    "description": "Formación enfocada en la optimización de procesos, la productividad y la gestión de recursos, integrando áreas de investigación, producción y gestión para la mejora continua de las organizaciones.",
    "areas": {
      "investigacion": {
        "name": "Investigación",
        "color": "#ffff00"
      },
      "produccion": {
        "name": "Producción",
        "color": "#00b050"
      },
      "gestion": {
        "name": "Gestión",
        "color": "#00b0f0"
      }
    },
    "targetCredits": 300,
    "planCredits": 349,
    "totalCourses": 77,
    "semesters": [
      {
        "number": 1,
        "label": "Primer semestre",
        "courses": [
          {
            "code": "0005",
            "name": "Técnicas de Estudio e Investigación",
            "credits": 3,
            "prereqs": [],
            "area": null
          },
          {
            "code": "0017",
            "name": "Área Social Humanística 1",
            "credits": 3,
            "prereqs": [],
            "area": null
          },
          {
            "code": "0069",
            "name": "Área Técnica Complementaria 1",
            "credits": 4,
            "prereqs": [],
            "area": null
          },
          {
            "code": "0101",
            "name": "Área Matemática Básica 1",
            "credits": 9,
            "prereqs": [],
            "area": null
          },
          {
            "code": "0348",
            "name": "Química General 1",
            "credits": 7,
            "prereqs": [],
            "area": null
          },
          {
            "code": "0610",
            "name": "Informática",
            "credits": 3,
            "prereqs": [],
            "area": "investigacion"
          }
        ]
      },
      {
        "number": 2,
        "label": "Segundo semestre",
        "courses": [
          {
            "code": "0019",
            "name": "Área Social Humanística 2",
            "credits": 3,
            "prereqs": [
              "0017"
            ],
            "area": null
          },
          {
            "code": "0028",
            "name": "Ecología",
            "credits": 4,
            "prereqs": [
              "0348"
            ],
            "area": null
          },
          {
            "code": "0103",
            "name": "Área Matemática Básica 2",
            "credits": 9,
            "prereqs": [
              "0101"
            ],
            "area": null
          },
          {
            "code": "0147",
            "name": "Física Básica",
            "credits": 5,
            "prereqs": [
              "0101"
            ],
            "area": null
          },
          {
            "code": "0662",
            "name": "Legislación 1",
            "credits": 3,
            "prereqs": [
              "0005",
              "0017"
            ],
            "area": "gestion"
          },
          {
            "code": "0667",
            "name": "Programación Comercial 1",
            "credits": 4,
            "prereqs": [
              "0610"
            ],
            "area": null
          },
          {
            "code": "0352",
            "name": "Química 2",
            "credits": 6,
            "prereqs": [
              "0101",
              "0348"
            ],
            "area": null
          }
        ]
      },
      {
        "number": 3,
        "label": "Tercer semestre",
        "courses": [
          {
            "code": "0022",
            "name": "Psicología Industrial",
            "credits": 3,
            "prereqs": [
              "0019"
            ],
            "area": "gestion"
          },
          {
            "code": "0073",
            "name": "Dibujo Técnico Mecánico",
            "credits": 3,
            "prereqs": [
              "0069",
              "0667"
            ],
            "area": null
          },
          {
            "code": "0107",
            "name": "Área Matemática Intermedia 1",
            "credits": 9,
            "prereqs": [
              "0103"
            ],
            "area": null
          },
          {
            "code": "0150",
            "name": "Física 1",
            "credits": 5,
            "prereqs": [
              "0103",
              "0147"
            ],
            "area": null
          },
          {
            "code": "0664",
            "name": "Legislación 2",
            "credits": 3,
            "prereqs": [
              "0662"
            ],
            "area": "gestion"
          },
          {
            "code": "0732",
            "name": "Estadística 1",
            "credits": 5,
            "prereqs": [
              "0005",
              "0103"
            ],
            "area": null
          },
          {
            "code": "2025",
            "name": "Prácticas Iniciales",
            "credits": 0,
            "prereqs": [
              "0103"
            ],
            "area": null
          },
          {
            "code": "0001",
            "name": "Ética Profesional",
            "credits": 2,
            "prereqs": [
              "0019"
            ],
            "area": null
          }
        ]
      },
      {
        "number": 4,
        "label": "Cuarto semestre",
        "courses": [
          {
            "code": "0112",
            "name": "Área Matemática Intermedia 2",
            "credits": 6,
            "prereqs": [
              "0107"
            ],
            "area": null
          },
          {
            "code": "0114",
            "name": "Área Matemática Intermedia 3",
            "credits": 6,
            "prereqs": [
              "0107"
            ],
            "area": null
          },
          {
            "code": "0152",
            "name": "Física 2",
            "credits": 6,
            "prereqs": [
              "0107",
              "0150"
            ],
            "area": null
          },
          {
            "code": "0170",
            "name": "Mecánica Analítica 1",
            "credits": 4,
            "prereqs": [
              "0107",
              "0150"
            ],
            "area": null
          },
          {
            "code": "0734",
            "name": "Estadística 2",
            "credits": 5,
            "prereqs": [
              "0732"
            ],
            "area": null
          },
          {
            "code": "0018",
            "name": "Filosofía de la Ciencia",
            "credits": 1,
            "prereqs": [
              "0019"
            ],
            "area": null
          }
        ]
      },
      {
        "number": 5,
        "label": "Quinto semestre",
        "courses": [
          {
            "code": "0116",
            "name": "Matemática Aplicada 3",
            "credits": 5,
            "prereqs": [
              "0112",
              "0114"
            ],
            "area": null
          },
          {
            "code": "0200",
            "name": "Ingeniería Eléctrica 1",
            "credits": 6,
            "prereqs": [
              "0114",
              "0152"
            ],
            "area": null
          },
          {
            "code": "0250",
            "name": "Mecánica de Fluidos",
            "credits": 5,
            "prereqs": [
              "0114",
              "0170"
            ],
            "area": null
          },
          {
            "code": "0300",
            "name": "Resistencia de Materiales 1",
            "credits": 5,
            "prereqs": [
              "0114",
              "0170"
            ],
            "area": null
          },
          {
            "code": "0452",
            "name": "Ciencia de los Materiales",
            "credits": 4,
            "prereqs": [
              "0152"
            ],
            "area": null
          },
          {
            "code": "0637",
            "name": "Diseño Industrial",
            "credits": 6,
            "prereqs": [
              "0734"
            ],
            "area": "produccion"
          },
          {
            "code": "0118",
            "name": "Matemática Aplicada 1",
            "credits": 5,
            "prereqs": [
              "0112",
              "0114"
            ],
            "area": null
          },
          {
            "code": "0172",
            "name": "Mecánica Analítica 2",
            "credits": 5,
            "prereqs": [
              "0114",
              "0170"
            ],
            "area": null
          },
          {
            "code": "0368",
            "name": "Principios de Metrología",
            "credits": 4,
            "prereqs": [
              "0152",
              "0734"
            ],
            "area": null
          }
        ]
      },
      {
        "number": 6,
        "label": "Sexto semestre",
        "courses": [
          {
            "code": "0390",
            "name": "Termodinámica 1",
            "credits": 6,
            "prereqs": [
              "0250"
            ],
            "area": null
          },
          {
            "code": "0520",
            "name": "Procesos de Manufactura 1",
            "credits": 5,
            "prereqs": [
              "0452"
            ],
            "area": null
          },
          {
            "code": "0601",
            "name": "Investigación de Operaciones I",
            "credits": 6,
            "prereqs": [
              "0116"
            ],
            "area": "investigacion"
          },
          {
            "code": "0639",
            "name": "Control Estadístico de la Calidad",
            "credits": 6,
            "prereqs": [
              "0637"
            ],
            "area": "produccion"
          },
          {
            "code": "0653",
            "name": "Ingeniería de Costos",
            "credits": 4,
            "prereqs": [
              "0637"
            ],
            "area": "gestion"
          },
          {
            "code": "0122",
            "name": "Matemática Aplicada 4",
            "credits": 5,
            "prereqs": [
              "0118"
            ],
            "area": null
          },
          {
            "code": "0302",
            "name": "Resistencia de Materiales 2",
            "credits": 5,
            "prereqs": [
              "0300"
            ],
            "area": null
          }
        ]
      },
      {
        "number": 7,
        "label": "Séptimo semestre",
        "courses": [
          {
            "code": "0603",
            "name": "Investigación de Operaciones II",
            "credits": 6,
            "prereqs": [
              "0601"
            ],
            "area": "investigacion"
          },
          {
            "code": "0634",
            "name": "Ingeniería de Métodos",
            "credits": 7,
            "prereqs": [
              "0639",
              "0653"
            ],
            "area": "produccion"
          },
          {
            "code": "0655",
            "name": "Administración Financiera",
            "credits": 4,
            "prereqs": [
              "0653"
            ],
            "area": "gestion"
          },
          {
            "code": "0672",
            "name": "Fundamentos de Administración",
            "credits": 4,
            "prereqs": [
              "0022",
              "0639"
            ],
            "area": "gestion"
          },
          {
            "code": "0674",
            "name": "Fundamentos de Mercadotecnia",
            "credits": 4,
            "prereqs": [
              "0639"
            ],
            "area": "gestion"
          },
          {
            "code": "2036",
            "name": "Prácticas Intermedias",
            "credits": 0,
            "prereqs": [
              "0639",
              "2025"
            ],
            "area": null
          },
          {
            "code": "0335",
            "name": "Gestión de Desastres",
            "credits": 4,
            "prereqs": [
              "0639"
            ],
            "area": null
          },
          {
            "code": "0392",
            "name": "Termodinámica 2",
            "credits": 6,
            "prereqs": [
              "0390"
            ],
            "area": null
          },
          {
            "code": "0454",
            "name": "Metalurgia y Metalografía",
            "credits": 6,
            "prereqs": [
              "0452"
            ],
            "area": null
          }
        ]
      },
      {
        "number": 8,
        "label": "Octavo semestre",
        "courses": [
          {
            "code": "0620",
            "name": "Gestión Ambiental",
            "credits": 4,
            "prereqs": [
              "0634"
            ],
            "area": "produccion"
          },
          {
            "code": "0640",
            "name": "Control de la Producción",
            "credits": 6,
            "prereqs": [
              "0634"
            ],
            "area": "produccion"
          },
          {
            "code": "0659",
            "name": "Administración de Recursos Humanos",
            "credits": 6,
            "prereqs": [
              "0672"
            ],
            "area": "gestion"
          },
          {
            "code": "0676",
            "name": "Comercio Internacional",
            "credits": 3,
            "prereqs": [
              "0674"
            ],
            "area": "gestion"
          },
          {
            "code": "0700",
            "name": "Ingeniería Económica 1",
            "credits": 4,
            "prereqs": [
              "0655"
            ],
            "area": null
          },
          {
            "code": "0504",
            "name": "Motores de Combustión Interna",
            "credits": 6,
            "prereqs": [
              "0392"
            ],
            "area": null
          },
          {
            "code": "0506",
            "name": "Plantas de Vapor",
            "credits": 6,
            "prereqs": [
              "0392"
            ],
            "area": null
          },
          {
            "code": "0524",
            "name": "Diseño de Máquinas 1",
            "credits": 4,
            "prereqs": [
              "0302",
              "0452"
            ],
            "area": null
          }
        ]
      },
      {
        "number": 9,
        "label": "Noveno semestre",
        "courses": [
          {
            "code": "0508",
            "name": "Montaje y Mantenimiento de Equipo",
            "credits": 4,
            "prereqs": [
              "0640"
            ],
            "area": null
          },
          {
            "code": "0612",
            "name": "Gestión Tecnológica",
            "credits": 4,
            "prereqs": [
              "0603",
              "0640"
            ],
            "area": "investigacion"
          },
          {
            "code": "0614",
            "name": "Logística y Cadena de Suministro",
            "credits": 4,
            "prereqs": [
              "0640"
            ],
            "area": "investigacion"
          },
          {
            "code": "0643",
            "name": "Salud y Seguridad Ocupacional",
            "credits": 5,
            "prereqs": [
              "0640"
            ],
            "area": "produccion"
          },
          {
            "code": "0665",
            "name": "Microeconomía",
            "credits": 3,
            "prereqs": [
              "0700"
            ],
            "area": "investigacion"
          },
          {
            "code": "0706",
            "name": "Preparación y Evaluación de Proyectos 1",
            "credits": 5,
            "prereqs": [
              "0674",
              "0700"
            ],
            "area": null
          },
          {
            "code": "7905",
            "name": "Seminario de Investigación Industrial",
            "credits": 3,
            "prereqs": [
              "0640"
            ],
            "area": "investigacion"
          },
          {
            "code": "7985",
            "name": "Seminario de Investigación E.P.S. Industrial",
            "credits": 3,
            "prereqs": [
              "0640"
            ],
            "area": null
          },
          {
            "code": "0606",
            "name": "Análisis de Sistemas Industriales",
            "credits": 3,
            "prereqs": [
              "0603",
              "0640"
            ],
            "area": "investigacion"
          }
        ]
      },
      {
        "number": 10,
        "label": "Décimo semestre",
        "courses": [
          {
            "code": "0609",
            "name": "Innovación y Emprendimiento",
            "credits": 6,
            "prereqs": [
              "0706"
            ],
            "area": "investigacion"
          },
          {
            "code": "0622",
            "name": "Sistema de Gestión de la Calidad",
            "credits": 6,
            "prereqs": [
              "0643"
            ],
            "area": "produccion"
          },
          {
            "code": "0632",
            "name": "Ingeniería de Plantas",
            "credits": 6,
            "prereqs": [
              "0643"
            ],
            "area": "produccion"
          },
          {
            "code": "0709",
            "name": "Gestión de Proyectos",
            "credits": 4,
            "prereqs": [
              "0706"
            ],
            "area": "gestion"
          },
          {
            "code": "2005",
            "name": "Prácticas Finales Ingeniería Industrial",
            "credits": 0,
            "prereqs": [
              "0643",
              "2036"
            ],
            "area": null
          },
          {
            "code": "0288",
            "name": "Introducción al Estudio de Impacto Ambiental",
            "credits": 4,
            "prereqs": [
              "0643"
            ],
            "area": null
          },
          {
            "code": "0645",
            "name": "Ingeniería Textil",
            "credits": 4,
            "prereqs": [
              "0640"
            ],
            "area": "produccion"
          },
          {
            "code": "0669",
            "name": "Economía Industrial",
            "credits": 2,
            "prereqs": [
              "0665"
            ],
            "area": "investigacion"
          }
        ]
      }
    ]
  }
};

// Utilidades de datos
const ALL_COURSES = Object.fromEntries(
  Object.values(CAREERS).map(career => [
    career.id,
    career.semesters.flatMap(sem => sem.courses.map(course => ({ ...course, semester: sem.number })))
  ])
);
