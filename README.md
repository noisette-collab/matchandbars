# Match & Bars — web inicial

Web estàtica (HTML + CSS + JS) amb un primer directori de bars de Barcelona
recollits de guies públiques. No afirma que un bar posi un partit concret avui.

## Publicar al domini de GoDaddy

Opció ràpida (recomanada):

1. Crea un compte a [Cloudflare Pages](https://pages.cloudflare.com) o [Netlify](https://www.netlify.com) o [Vercel](https://vercel.com).
2. Puja la carpeta `matchandbars` (arrel = on hi ha `index.html`).
3. A GoDaddy → DNS del domini:
   - CNAME `www` → el host que et donin (p. ex. `tu-projecte.pages.dev`)
   - A o ALIAS `@` cap al mateix servei (Cloudflare Pages ho fa fàcil amb el proxy).

Opció GoDaddy hosting: puja aquests fitxers a la carpeta `public_html`.

## Afegir un bar

Edita `data/bars.json` i afegeix un objecte amb els mateixos camps.
No inventis programació de partits si el local no ho ha publicat.

## Proper pas

- Formulari real (Tally / Typeform) en lloc del `mailto`
- Camp “competició habitual” només si el bar ho diu a la web o Instagram
- Mapa Leaflet quan tinguis coordenades exactes
