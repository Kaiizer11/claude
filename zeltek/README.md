# Zeltek — Site vitrine

Site vitrine statique (HTML/CSS/JS, sans framework) pour l'agence digitale Zeltek.

## Structure

- `index.html` — page unique : header, hero, services, réalisations, à propos, témoignages, CTA, contact, footer
- `styles.css` — styles custom (composants, animations, focus states)
- `tailwind.css` — build Tailwind précompilé (pas de dépendance CDN en prod)
- `script.js` — menu mobile, reveal au scroll, retour en haut, validation du formulaire de contact
- `tailwind.config.js` / `tailwind-input.css` — sources pour régénérer `tailwind.css`

## Aperçu local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Régénérer le CSS Tailwind

Après une modification des classes utilitaires dans `index.html` :

```bash
npx tailwindcss -i ./tailwind-input.css -o ./tailwind.css --minify
```

## Notes

- Design system : palette "B2B Service" (navy/bleu), typographie Poppins + Open Sans, style Swiss Modernism (grille, hiérarchie typographique forte).
- Icônes : Phosphor Icons (CDN), aucune emoji utilisée comme icône.
- Le formulaire de contact valide côté client mais n'est relié à aucun backend — à connecter (endpoint API, Formspree, etc.) avant mise en production.
