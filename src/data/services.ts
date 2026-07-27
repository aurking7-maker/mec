// ── Dati servizi per pagine landing SEO ──

export interface Service {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    slug: "pavimenti-e-rivestimenti",
    title: "Pavimenti e Rivestimenti",
    metaTitle: "Pavimenti e Rivestimenti a Carpi, Modena e Reggio Emilia | Maestro Edil Carpi",
    metaDescription: "Posa e sostituzione pavimenti, piastrelle, rivestimenti murali e ceramiche a Carpi, Modena e Reggio Emilia. Gres porcellanato, ceramica, pietra naturale e laminato. Preventivo gratuito!",
    description: "Maestro Edil Carpi realizza posa e sostituzione di pavimenti, piastrelle, rivestimenti murali e ceramiche in tutta la provincia di Modena e Reggio Emilia. Lavoriamo con tutti i materiali — gres porcellanato, ceramica, pietra naturale, laminato e parquet — garantendo lavorazioni di alta qualità e finiture impeccabili. La nostra esperienza nel distretto ceramico di Sassuolo ci permette di offrire materiali premium a prezzi competitivi.",
    features: [
      "Posa gres porcellanato e ceramica",
      "Rivestimenti bagno e cucina",
      "Pavimento in pietra naturale e marmo",
      "Parquet e pavimento in laminato",
      "Posa mosaico e piastrelle decorative",
      "Sostituzione e rifacimento pavimento",
      "Rivestimenti pareti e contropareti",
    ],
  },
  {
    slug: "ristrutturazione-completa",
    title: "Ristrutturazione Completa",
    metaTitle: "Ristrutturazione Completa Chiavi in Mano a Carpi, Modena e Reggio Emilia | Maestro Edil Carpi",
    metaDescription: "Ristrutturazioni complete chiavi in mano a Carpi, Modena e Reggio Emilia. Appartamenti, ville e uffici. Gestiamo ogni fase del progetto. Preventivo gratuito e senza impegno!",
    description: "Trasformiamo ogni ambiente della vostra casa con ristrutturazioni complete chiavi in mano. Bagni, cucine, soggiorni e camere — gestiamo ogni fase del progetto con cura artigianale, dalla demolizione iniziale alle finiture finali. Da oltre 40 anni realizziamo ristrutturazioni in tutta la provincia di Modena e Reggio Emilia, con un approccio che mette al centro la qualità dei materiali, la precisione esecutiva e il rispetto delle tempistiche concordate.",
    features: [
      "Ristrutturazione appartamento chiavi in mano",
      "Ristrutturazione villa completa",
      "Ristrutturazione ufficio e locale commerciale",
      "Ridistribuzione spazi interni",
      "Rifacimento impianti idraulici ed elettrici",
      "Isolamento termico e acustico",
      "Gestione pratiche edilizie (CILA, SCIA)",
    ],
  },
  {
    slug: "bagni-e-cucine",
    title: "Bagni e Cucine",
    metaTitle: "Ristrutturazione Bagni e Cucine a Carpi, Modena e Reggio Emilia | Maestro Edil Carpi",
    metaDescription: "Ristrutturazione completa di bagni e cucine a Carpi, Modena e Reggio Emilia. Dalla demolizione alla posa, impianti, rivestimenti e finiture. Preventivo gratuito!",
    description: "Ristrutturazione completa di bagni e cucine — dalla demolizione alla posa, impianti idraulici di base, rivestimenti e finiture. Risultati professionali nei tempi concordati. Realizziamo bagni e cucine moderni, funzionali e di Design, utilizzando materiali di alta qualità e garantendo lavorazioni impeccabili. Ogni progetto è su misura, studiato sulle esigenze specifiche del cliente.",
    features: [
      "Ristrutturazione bagno completo",
      "Installazione sanitari sospesi",
      "Posa rivestimenti bagno e cucina",
      "Ristrutturazione cucina design",
      "Impianti idraulici base",
      "Arredo bagno e cucina su misura",
      "Vasca da bagno, doccia e box doccia",
    ],
  },
  {
    slug: "cartongesso-e-controsoffitti",
    title: "Cartongesso e Controsoffitti",
    metaTitle: "Cartongesso e Controsoffitti a Carpi, Modena e Reggio Emilia | Maestro Edil Carpi",
    metaDescription: "Pareti in cartongesso, contropareti, controsoffitti e nicchie decorative a Carpi, Modena e Reggio Emilia. Soluzioni moderne per ottimizzare gli spazi. Preventivo gratuito!",
    description: "Realizzazione di pareti in cartongesso, contropareti, controsoffitti e nicchie decorative. Soluzioni moderne per ottimizzare gli spazi interni con finiture di alta qualità. Il cartongesso permette di creare spazi personalizzati, ottimizzare l'acustica, integrare l'illuminazione LED e realizzare soluzioni architettoniche moderne e funzionali.",
    features: [
      "Parete divisoria in cartongesso",
      "Controparete per isolamento acustico",
      "Controsoffitto apribile",
      "Controsoffitto con illuminazione LED",
      "Nicchie decorative e pareti attrezzate",
      "Isolamento acustico e termico",
      "Design e arredamento su misura",
    ],
  },
  {
    slug: "tinteggiatura-e-finiture",
    title: "Tinteggiatura e Finiture",
    metaTitle: "Tinteggiatura e Finiture Decorative a Carpi, Modena e Reggio Emilia | Maestro Edil Carpi",
    metaDescription: "Tinteggiatura professionale, stucco veneziano, rasature e finiture decorative a Carpi, Modena e Reggio Emilia. Ogni dettaglio curato. Preventivo gratuito!",
    description: "Tinteggiatura interna professionale, stucco veneziano, rasature e finiture decorative. Ogni dettaglio curato per un risultato impeccabile. Lavoriamo con pitture e finiture di alta qualità, offrendo una gamma completa di soluzioni per personalizzare ogni ambiente con eleganza e cura artigianale.",
    features: [
      "Tinteggiatura interna ed esterna",
      "Stucco veneziano e effetti decorativi",
      "Rasatura pareti e finiture lisce",
      "Pittura decorativa e effetto spugnato",
      "Verniciatura porte e infissi",
      "Decalcomania e finiture artistiche",
      "Tinteggiatura ville e edifici storici",
    ],
  },
  {
    slug: "consulenza-e-progettazione",
    title: "Consulenza e Progettazione",
    metaTitle: "Consulenza e Progettazione Edile a Carpi, Modena e Reggio Emilia | Maestro Edil Carpi",
    metaDescription: "Supporto tecnico, progettazione architettonica, direzione lavori e pratiche edilizie a Carpi, Modena e Reggio Emilia. Consulenza gratuita!",
    description: "Supporto tecnico dall'ideazione alla realizzazione del tuo progetto edile. Il nostro team di professionisti è al vostro fianco in ogni fase, dalla consulenza iniziale alla direzione lavori, garantendo soluzioni tecniche avanzate e pratiche edilizie regolari.",
    features: [
      "Progettazione architettonica",
      "Direzione lavori",
      "Perizia tecnica e computo metrico",
      "Pratiche edilizie CILA, SCIA, Permesso di costruire",
      "Sicurezza cantieri",
      "Consulenza tecnica edile",
      "Geometrya e rilievi",
    ],
  },
  {
    slug: "piccoli-lavori-e-manutenzione",
    title: "Piccoli Lavori e Manutenzione",
    metaTitle: "Piccoli Lavori e Manutenzione Casa a Carpi, Modena e Reggio Emilia | Maestro Edil Carpi",
    metaDescription: "Riparazioni, montaggio arredi, installazioni e manutenzione ordinaria a Carpi, Modena e Reggio Emilia. Intervento rapido e professionale!",
    description: "Riparazioni, piccoli interventi, montaggio arredi, installazione TV e ventilatori, ritocchi e manutenzione ordinaria. Intervento rapido nella provincia di Modena e Reggio Emilia per ogni tipo di esigenza quotidiana.",
    features: [
      "Riparazioni murarie e muratura",
      "Montaggio mobili e arredi",
      "Installazione TV a parete",
      "Montaggio tende e tendaggi",
      "Riparazione infissi e serramenti",
      "Sostituzione rubinetti e sanitari",
      "Ritocchi tinteggiatura e manutenzione",
    ],
  },
  {
    slug: "costruzione-nuovi-edifici",
    title: "Costruzione Nuovi Edifici",
    metaTitle: "Costruzione Nuovi Edifici e Ville a Carpi, Modena e Reggio Emilia | Maestro Edil Carpi",
    metaDescription: "Costruzione di ville, palazzine ed edifici commerciali a Carpi, Modena e Reggio Emilia. Progettazione e realizzazione chiavi in mano. Preventivo gratuito!",
    description: "Costruzione di ville, palazzine ed edifici commerciali nel territorio emiliano. Gestiamo l'intero processo dalla progettazione alla consegna, con soluzioni moderne, efficienti e rispettose dell'ambiente. Ogni edificio è progettato su misura, integrando comfort moderno e sostenibilità.",
    features: [
      "Costruzione villa unifamiliare",
      "Costruzione palazzina residenziale",
      "Edifici commerciali e direzionali",
      "Edilizia residenziale moderna",
      "Soluzioni bio-ecologiche",
      "Integrazione solare fotovoltaico",
      "Progettazione e direzione lavori",
    ],
  },
  {
    slug: "restauro-edifici-storici",
    title: "Restauro Edifici Storici",
    metaTitle: "Restauro Edifici Storici e Palazzi Antichi a Carpi, Modena e Reggio Emilia | Maestro Edil Carpi",
    metaDescription: "Restauro conservativo e recupero di edifici storici, palazzi antichi e monumenti a Carpi, Modena e Reggio Emilia. Competenza e tradizione. Preventivo gratuito!",
    description: "Restauro conservativo e recupero di edifici storici e palazzi antichi. Interveniamo con competenza e sensibilità sul patrimonio edilizio emiliano, rispettando le tecniche tradizionali e integrando soluzioni moderne dove necessario. Specializzati nel restauro di affreschi, facciate storiche e strutture murarie antiche.",
    features: [
      "Restauro conservativo edifici storici",
      "Restauro affreschi e decorazioni",
      "Restauro facciate e intonaci storici",
      "Recupero palazzi e ville antiche",
      "Restauro monumenti e chiese",
      "Patrimonio edilizio e beni culturali",
      "Recupero abitativo e architettonico",
    ],
  },
];