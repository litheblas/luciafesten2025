# Luciafesten2025

Detta är webbsidan som användes för att PR-a Luciafesten 2025: Luciafesten IN SPACE. Den är skriven av Avogadro mestadels i knacking SvelteKit och stilad genom tailwind-klasser, absolut inte något superelegant projekt men rimligt för en PR-sida som bara kommer användas en gång. Om den mot förmodan ska utvecklas på igen kan du följa instruktionerna nedan för att komma igång.

## Kom igång

Sidan är en SvelteKit-app som kompileras ned till statiska filer och hostas på GitHub Pages, det går alltså inte att använda något av SvelteKits server-funktionalitet iom att det inte finns någon server.

### Krav

För att köra sidan behöver du:

- NodeJS version 20 eller nyare, sidan har testats med både NodeJS 20 och NodeJS 25.
- NPM som borde följa med NodeJS
- En webbläsare
- En terminal
- Ungefär 150MB ledigt utrymme på din dator

### Installera paket

Installera alla nödvändiga Node-paket genom att köra

```sh
npm i
```

### Kör webbsidan

Du kan välja att antingen köra webbsidan i utvecklarläge, som i så fall använder Vite för att upprätthålla en automatiskt uppdaterande version av webbsidan utan andra verktyg, eller så kan du bygga en produktionskopia av webbsidan.

#### Utvecklarläge

För att köra webbsidan i utvecklarläge, kör

```sh
npm run dev
```

och öppna sidan genom länken i terminalen.

#### Produktionsläge

För att skapa en produktionskopia av webbsidan, kör

```sh
npm run build
```

Sidans filer hamnar då i mappen `_site` som ligger i samma mapp som projektet. Du kan sedan förhandsvisa sidan genom att köra

```sh
npm run preview
```
