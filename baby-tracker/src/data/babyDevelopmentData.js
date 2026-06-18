// Wonder weeks (sprongetjes) occur at specific weeks after birth
// Based on the Wonder Weeks research by Frans Plooij & Hetty van de Rijt
// Weeks are counted from the due date (not birth date)

export const wonderWeeks = [5, 8, 12, 15, 19, 23, 26, 33, 37, 41, 46, 51, 55, 59, 64, 71, 75];

// Check if a given week is a wonder week or within the stormy period (±1 week)
export function isWonderWeek(week) {
  return wonderWeeks.some((ww) => Math.abs(ww - week) <= 1);
}

export function getWonderWeekInfo(week) {
  const leaps = {
    5: {
      name: 'Sprong 1 – De Wereld van Gewaarwordingen',
      description:
        'Baby ontdekt dat er een wereld is buiten zichzelf. Hij/zij begint lichamelijke gewaarwordingen te herkennen. Kan meer huilen, maar ook meer opletten.',
      newSkills: ['Volgt bewegende objecten', 'Reageert op gezichten', 'Meer geluiden herkennen'],
      tips: 'Meer huidcontact helpt. Wieg je baby niet weg van prikkels, maar bied ze rustig aan.',
    },
    8: {
      name: 'Sprong 2 – De Wereld van Patronen',
      description:
        'Baby ontdekt patronen: vaste vormen, klanken en bewegingen. Dit is verwarrend maar fascinerend. Baby kan onrustiger zijn.',
      newSkills: ['Herkent gezichten van dichtbij', 'Merkt handen op', 'Reageert op bekende stemmen'],
      tips: 'Laat je baby je gezicht bestuderen. Maak oogcontact en praat rustig.',
    },
    12: {
      name: 'Sprong 3 – De Wereld van Soepele Overgangen',
      description:
        'Baby leert bewegingen vloeiender te maken. Ontdekt dat dingen en mensen kunnen verdwijnen en weer terugkomen.',
      newSkills: ['Vloeiende armbewegingen', 'Lacht sociaal', 'Slaat naar objecten'],
      tips: 'Speel kiekeboe! Dit leert je baby dat jij altijd terugkomt.',
    },
    15: {
      name: 'Sprong 4 – De Wereld van Gebeurtenissen',
      description:
        'Baby begrijpt dat acties gevolgen hebben. Dingen vallen, rollen, stuiteren — dit is fascinerend. Baby wordt actiever.',
      newSkills: ['Gooit dingen opzettelijk', 'Begrijpt oorzaak-gevolg', 'Meer geluidjes maken'],
      tips: 'Geef veilige speeltjes om mee te experimenteren. Laat je baby dingen laten vallen en oppakken.',
    },
    19: {
      name: 'Sprong 5 – De Wereld van Relaties',
      description:
        'Baby ontdekt de ruimtelijke relatie tussen dingen. Hoe passen dingen in en op elkaar? Afstanden worden begrepen.',
      newSkills: ['Begrijpt "in" en "op"', 'Kruipen of mobiliteitspogingen', 'Wijst naar dingen'],
      tips: 'Stapelbekers en dozen zijn geweldige speeltjes. Laat baby dingen in en uit dozen doen.',
    },
    23: {
      name: 'Sprong 6 – De Wereld van Categorieën',
      description:
        'Baby begint dingen te categoriseren: honden zijn anders dan katten. Emoties worden herkend. Eerste woordjes kunnen komen.',
      newSkills: ['Sorteert objecten', 'Herkent emoties', 'Mama/papa zeggen mogelijk'],
      tips: 'Benoem alles: "Dit is een hond. Waf waf!" Help je baby de wereld te categoriseren.',
    },
    26: {
      name: 'Sprong 7 – De Wereld van Sequences',
      description:
        'Baby begrijpt dat dingen in een volgorde gebeuren. Kan eenvoudige handelingen nadoen. Eerste stapjes kunnen komen!',
      newSkills: ['Doet handelingen na', 'Begrijpt volgorde', 'Eerste stapjes mogelijk', 'Drinkt uit beker'],
      tips: 'Doe handelingen voor en laat baby meedoen. Koken, opruimen — laat ze helpen!',
    },
    33: {
      name: 'Sprong 8 – De Wereld van Programmas',
      description:
        'Baby begrijpt dat er vaste "programmas" zijn voor dingen: wassen, aankleden, eten. Wil meehelpen en zelfstandiger worden.',
      newSkills: ['Begrijpt dagelijkse routines', 'Wil zelf dingen doen', 'Meer woordjes', 'Eenvoudige opdrachten uitvoeren'],
      tips: 'Betrek je peuter bij dagelijkse taken. "Help jij mee met sokken aandoen?" bevordert zelfstandigheid.',
    },
    37: {
      name: 'Sprong 9 – De Wereld van Principes',
      description:
        'Peuter ontdekt principes zoals eerlijk/oneerlijk, van mij/van jou. Grenzen testen is normaal. Zelfstandigheid groeit sterk.',
      newSkills: ['Begrijpt eigendom', 'Test grenzen actief', 'Meer zinnen vormen', 'Fantasiespel'],
      tips: 'Wees consequent in regels. Geef keuzes binnen grenzen: "Wil je rode of blauwe sokken?"',
    },
    41: {
      name: 'Sprong 10 – De Wereld van Systemen',
      description:
        'Dit is de laatste grote sprong. Peuter begrijpt complexe systemen: vriendschap, macht, moraal. Veel meer taal en redeneren.',
      newSkills: ['Complexe verhalen begrijpen', 'Vriendschappen sluiten', 'Moreel redeneren', 'Lange zinnen'],
      tips: 'Lees veel voor. Praat over gevoelens en waarom dingen goed of fout zijn.',
    },
  };

  const closeLeap = wonderWeeks.find((ww) => Math.abs(ww - week) <= 1);
  return closeLeap ? leaps[closeLeap] || null : null;
}

// Week-by-week baby development data (postnatal, weeks 1–75)
const babyDevelopmentData = [
  {
    week: 1,
    title: 'Week 1 – Welkom in de wereld!',
    size: 'Gewicht: ~3,4 kg | Lengte: ~51 cm',
    development: 'Je baby slaapt 16–18 uur per dag en is alert tijdens korte periodes. Reflexen zoals zuigen, grijpen en de moro-reflex zijn aanwezig.',
    motor: ['Draait hoofd naar geluid', 'Grijpreflex aanwezig', 'Moro (schrikt bij geluid)'],
    social: ['Herkent jouw stem', 'Kijkt naar gezichten dichtbij (20–30 cm)'],
    sleep: '16–18 uur per dag, in periodes van 2–4 uur',
    feeding: 'Elke 2–3 uur voeden (8–12 keer per dag)',
    tips: 'Huidcontact (kangoeroen) is enorm belangrijk voor hechting en temperatuurregulatie.',
  },
  {
    week: 2,
    title: 'Week 2 – Bijkomen en groeien',
    size: 'Gewicht: ~3,2–3,6 kg',
    development: 'Baby hervindt zijn geboortegewicht. Het afschilferen van de huid is normaal. Meer bewuste momenten van alertheid.',
    motor: ['Spontane armbewegingen', 'Hoofd even optillen bij buikligging'],
    social: ['Meer oogcontact mogelijk', 'Reageert op zachte stemmen'],
    sleep: '16–17 uur per dag',
    feeding: 'Elke 2–3 uur, borstvoeding op vraag',
    tips: "Verander je baby's positie regelmatig om een plat hoofd te voorkomen.",
  },
  {
    week: 3,
    title: 'Week 3 – Meer alertheid',
    size: 'Gewicht: ~3,6–4 kg',
    development: 'Baby is vaker wakker en alert. Huilen is de enige communicatievorm — leer de signalen herkennen.',
    motor: ['Beweegt armen en benen actiever', 'Hoofd draait van kant naar kant'],
    social: ['Kan kort focussen op gezicht', 'Reageert op jouw stem met kalmte'],
    sleep: '15–16 uur per dag',
    feeding: 'Elke 2–3 uur',
    tips: 'Draagdoek of babysling kan helpen bij een onrustige baby.',
  },
  {
    week: 4,
    title: 'Week 4 – Eerste sociale signalen',
    size: 'Gewicht: ~4 kg',
    development: 'Baby begint te coöen en maakt eerste "pratende" geluiden. De eerste glimlach kan verschijnen (hoewel vaak reflexmatig).',
    motor: ['Heft hoofd kort op bij buikligging', 'Grijpt vinger stevig'],
    social: ['Eerste glimlachjes', 'Reageert op jouw stem'],
    sleep: '15–16 uur per dag',
    feeding: 'Elke 2–3 uur',
    tips: 'Vertel alles wat je doet: "Nu gaan we een luier verschonen." Dit bevordert taalontwikkeling.',
  },
  {
    week: 5,
    title: 'Week 5 – Sprong 1 🌟',
    isWonderWeek: true,
    wonderWeekName: 'Sprong 1: Wereld van Gewaarwordingen',
    size: 'Gewicht: ~4,2 kg',
    development: 'EERSTE SPRONG! Baby ontdekt dat er een wereld buiten zichzelf bestaat. Kan meer huilen en klampend zijn. Dit is normaal!',
    motor: ['Meer gecontroleerde armbewegingen', 'Volgt bewegend object met ogen'],
    social: ['Duidelijk oogcontact', 'Meer reactie op stemmen'],
    sleep: '14–15 uur per dag (mogelijk onrustiger)',
    feeding: 'Groeispurt — mogelijk vaker voeden',
    tips: 'Extra geduld en knuffels. De sprong duurt ±1 week. Daarna zie je nieuwe vaardigheden!',
  },
  {
    week: 6,
    title: 'Week 6 – Na de eerste sprong',
    size: 'Gewicht: ~4,5 kg',
    development: 'Na de sprong is baby alerter dan ooit. De ECHTE sociale glimlach verschijnt nu! Je hart smelt er van.',
    motor: ['Heft hoofd 45° bij buikligging', 'Volgt objecten met ogen'],
    social: ['Echte sociale glimlach ❤️', 'Reageert op jouw glimlach'],
    sleep: '14–16 uur per dag',
    feeding: 'Elke 3 uur',
    tips: 'Zing liedjes en maak grappige gezichten. Baby leert door te imiteren.',
  },
  {
    week: 7,
    title: 'Week 7 – Communicatie groeit',
    size: 'Gewicht: ~4,8 kg',
    development: 'Baby coöt en maakt meer gevarieerde geluiden. Reageert duidelijk op bekende gezichten en stemmen.',
    motor: ['Hoofd stabielere controle', 'Slaat naar hangende objecten'],
    social: ['Coöt en "praat" terug', 'Herkent ouders duidelijk'],
    sleep: '14–15 uur per dag',
    feeding: 'Elke 3 uur',
    tips: 'Hang een muziekmobiel boven de box of wieg. Baby leert oorzaak en gevolg.',
  },
  {
    week: 8,
    title: 'Week 8 – Sprong 2 🌟',
    isWonderWeek: true,
    wonderWeekName: 'Sprong 2: Wereld van Patronen',
    size: 'Gewicht: ~5 kg',
    development: 'TWEEDE SPRONG! Baby ontdekt patronen in de wereld. Kan heel vastklamperig zijn. Na de sprong zullen er prachtige nieuwe vaardigheden zijn!',
    motor: ['Heft hoofd 90° bij buikligging', 'Meer gecontroleerde bewegingen'],
    social: ['Glimlacht naar zichzelf in spiegel', 'Lacht hardop'],
    sleep: '14–15 uur (mogelijk onrustiger)',
    feeding: 'Mogelijk groeispurt',
    tips: 'Toon patronen: gestreept, gestippeld. Baby is nu gefascineerd door visuele patronen.',
  },
  {
    week: 10,
    title: 'Week 10 – Sociaal en actief',
    size: 'Gewicht: ~5,5 kg',
    development: 'Baby is nu echt sociaal. Lacht en coöt als reactie op aandacht. Houdt hoofd goed rechtop.',
    motor: ['Houdt hoofd rechtop', 'Kickt met beentjes'],
    social: ['Lacht hardop bij spel', 'Wil aandacht trekken'],
    sleep: '13–15 uur per dag',
    feeding: 'Elke 3–4 uur',
    tips: 'Buikligtijd is essentieel voor nekspieren en latere kruipontwikkeling.',
  },
  {
    week: 12,
    title: 'Week 12 – Sprong 3 🌟',
    isWonderWeek: true,
    wonderWeekName: 'Sprong 3: Wereld van Soepele Overgangen',
    size: 'Gewicht: ~5,8–6 kg',
    development: 'DERDE SPRONG! Baby leert vloeiende overgangen te maken. Begrip dat dingen verdwijnen en terugkomen (object permanence begint).',
    motor: ['Rolt van zij naar rug', 'Grijpt naar objecten', 'Heft borst op bij buikligging'],
    social: ['Herkent eigen naam', 'Duidelijke voorkeur voor vertrouwde mensen'],
    sleep: '13–14 uur',
    feeding: 'Elke 3–4 uur',
    tips: 'Speel kiekeboe! Dit is nu super leerzaam en leuk.',
  },
  {
    week: 15,
    title: 'Week 15 – Sprong 4 🌟',
    isWonderWeek: true,
    wonderWeekName: 'Sprong 4: Wereld van Gebeurtenissen',
    size: 'Gewicht: ~6,5 kg | Lengte: ~64 cm',
    development: 'VIERDE SPRONG! Baby begrijpt dat acties gevolgen hebben. Gooit dingen opzettelijk om te zien wat er gebeurt.',
    motor: ['Rolt van rug naar buik', 'Zit met ondersteuning', 'Grijpt en houdt objecten vast'],
    social: ['Meer expressief', 'Imiteert gezichtsuitdrukkingen', 'Vreemdelingvrees begint'],
    sleep: '12–14 uur',
    feeding: 'Elke 4 uur',
    tips: 'Geduld met de stormy period. Zorg voor consistente routine.',
  },
  {
    week: 19,
    title: 'Week 19 – Sprong 5 🌟',
    isWonderWeek: true,
    wonderWeekName: 'Sprong 5: Wereld van Relaties',
    size: 'Gewicht: ~7,5 kg | Lengte: ~67 cm',
    development: 'VIJFDE SPRONG! Baby ontdekt ruimtelijke relaties. Begrijpt hoe dingen passen en hoe ver dingen zijn. Kruipen kan beginnen!',
    motor: ['Begint te kruipen of schuifelen', 'Trekt zichzelf op', 'Grijpt met duim en wijsvinger (pincetgreep)'],
    social: ['Zwaait "dag dag"', 'Klap-klap spelletjes', 'Sterk vreemdelingvrees'],
    sleep: '12–14 uur',
    feeding: 'Bijvoeding gestart of starten',
    tips: 'Zorg dat de vloer veilig is! Baby gaat nu verkennen.',
  },
  {
    week: 23,
    title: 'Week 23 – Sprong 6 🌟',
    isWonderWeek: true,
    wonderWeekName: 'Sprong 6: Wereld van Categorieën',
    size: 'Gewicht: ~8,5 kg | Lengte: ~71 cm',
    development: 'ZESDE SPRONG! Baby categoriseert de wereld. Honden zijn anders dan katten. Mama is anders dan papa. Eerste woordjes mogelijk!',
    motor: ['Staat met hulp', 'Loopt langs meubels (meubelwandelen)', 'Goede pincetgreep'],
    social: ['Mama/papa roepen', 'Wijst naar dingen', 'Doet gebaren na'],
    sleep: '12–13 uur',
    feeding: '3 maaltijden + borstvoeding/fles',
    tips: 'Benoem alles wat je ziet. "Kijk, een hond! En daar is een kat."',
  },
  {
    week: 26,
    title: 'Week 26 – Sprong 7 🌟',
    isWonderWeek: true,
    wonderWeekName: 'Sprong 7: Wereld van Sequences',
    size: 'Gewicht: ~9 kg | Lengte: ~74 cm',
    development: 'ZEVENDE SPRONG! Baby begrijpt volgorde en sequences. Kan handelingen nabootsen en in volgorde uitvoeren. Eerste stapjes naderen!',
    motor: ['Eerste stapjes mogelijk!', 'Staat zelfstandig', 'Drinkt uit beker'],
    social: ['Doet eenvoudige opdrachten', 'Fantasiespel begint', '5–10 woordjes'],
    sleep: '12–14 uur',
    feeding: '3 maaltijden + snacks + borstvoeding/fles',
    tips: 'Oefen stapjes met de handen vasthouden. Laat baby blootsvoets lopen voor tastzin.',
  },
  {
    week: 33,
    title: 'Week 33 – Sprong 8 🌟',
    isWonderWeek: true,
    wonderWeekName: 'Sprong 8: Wereld van Programmas',
    size: 'Gewicht: ~10 kg | Lengte: ~78 cm',
    development: "ACHTSTE SPRONG! Peuter begrijpt 'programma's': de vaste volgorde van handelingen (aankleden, eten, slapen). Wil alles zelf doen!",
    motor: ['Loopt goed', 'Klimt op stoelen en trappen', 'Gooit en vangt (ruw)'],
    social: ['20+ woordjes', 'Wil meehelpen', 'Drukke fase — testen van grenzen'],
    sleep: '12–13 uur (incl. middagslaap)',
    feeding: '3 maaltijden + 2 snacks',
    tips: 'Bouw vaste routines in. Peuter gedijt bij voorspelbaarheid.',
  },
  {
    week: 37,
    title: 'Week 37 – Sprong 9 🌟',
    isWonderWeek: true,
    wonderWeekName: 'Sprong 9: Wereld van Principes',
    size: 'Gewicht: ~11 kg | Lengte: ~82 cm',
    development: "NEGENDE SPRONG! Peuter ontdekt principes als eerlijk/oneerlijk, van mij/van jou. 'Nee!'-fase is in volle gang. Fantasie bloeit.",
    motor: ['Rent', 'Springt met twee voeten', 'Tekent krabbellijnen'],
    social: ['50+ woordjes of zinnetjes', 'Fantasiespel', 'Teast grenzen intensief'],
    sleep: '11–13 uur',
    feeding: '3 maaltijden + 2 snacks',
    tips: "Geef keuzes: 'Wil je appel of banaan?' Zo behoud jij controle maar voelt peuter zich gehoord.",
  },
  {
    week: 41,
    title: 'Week 41 – Sprong 10 🌟',
    isWonderWeek: true,
    wonderWeekName: 'Sprong 10: Wereld van Systemen',
    size: 'Gewicht: ~12 kg | Lengte: ~86 cm',
    development: 'TIENDE EN LAATSTE SPRONG! Peuter begrijpt complexe systemen: vriendschap, macht, rechtvaardigheid. Enorme taalontwikkeling.',
    motor: ['Fietst op driewieler', 'Tekent mensen en huizen', 'Knippt met schaar (met hulp)'],
    social: ['Lange gesprekken', 'Vriendschappen sluiten', 'Empathie begint', 'Toilet training mogelijk'],
    sleep: '11–13 uur',
    feeding: '3 maaltijden + snacks, gevarieerd',
    tips: 'Na sprong 10 is je kind een volwaardig denkend persoon. Geniet van elk gesprek!',
  },
];

export default babyDevelopmentData;
