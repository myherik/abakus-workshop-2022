# Getting Started
##### `git clone https://github.com/hanss-geodata/abakus-workshop-2022.git`
##### `npm install`
##### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Oppgave 1
### Sette opp Map, MapView og FeatureLayer
Målet med denne oppgaven er å vise data i et kart. For å oppnå dette må vi sette opp et kart (Map) element, og en visning av dette kartet (MapView).

Vi har lagt inn de nødvendige komponentene i koden, men konstruktørene mangler en del. For å kunne vise noe må disse fylles ut korrekt. For å se hva som mangler må API-dokumentasjonen til Esri brukes. Denne dukumentasjonen ligger på https://developers.arcgis.com/javascript/latest/api-reference/ Det er og mer informasjon i koden som beskriver hva som må gjøres.

I tillegg til kartet og visningen må det legges til et data lag. Vi har noen hjelpefunksjoner som hjelper med å hente data, og opprette dette laget, men det må implementeres og legges til i kartet.

## Oppgave 2
### Legge til widgets
Esri har mange widgets som er enkle å legge til i kartet, og i denne delen skal vi legge til en lokasjons widget. Hvordan dette gjøres er godt dokumentert i API dokumentasjonen. En god idé er å sette zoom nivået med scale attributten, f. eks scale 5000.

Vi har og lagd en egen widged som kan legges til. Dette er en widget som finner en rute mellom minst to punkt i kartet, og forsøker å få denne ruten til å matche et mål om antall skritt. Widgeten ligger i components/RouteWidget, men den er ikke helt ferdig enda. For å legge til denne må det gjøres noen endringer i Map.js, App.js, og det må rettes noen feil i RouteWidget.js fila.

## Oppgave 3
### Utvide widget
I siste oppgave ønsker vi å utvide widgeten slik at brukeren kan velge selv hvor ruten skal starte. For å oppnå dette kan det implementeres med lokasjonswidgeten, eller med klikk i kartet. Implementasjonen er ganske lik for begge alternativene, man lager en lytter på et event, og setter et koordinat inn i contexten.

Det burde og legges til en grafikk i kartet som viser hvor startsstedet er, som tilsvarer brukerens klikk. Esri har et API for grafikk, og man kan bruke SimpleMarkerSymbol, eller CIMSymbol for grafikken. SimpleMarker er enklest å ta i bruk, mens CIM gir flere muligheter for styling.

## Videre arbeid
Det er fremdeles en del som kan gjøres med denne applikasjonen. Slik som det er nå hentes alle punktene basert på hardkodet coordinater, Et mulig sted å begynne med forbedringer er å ta koordinatene basert på kartet. Det kan og jobbes mer med styling, eller man kan prøve å legge til flere nyttige Esri widgets.

Hvis ikke så oppfordrer vi til å prøve ut Esri APIet selv, og lage noe helt eget. Det er mulig å ta utgangspunkt i steg 1 for å komme raskt i gang.