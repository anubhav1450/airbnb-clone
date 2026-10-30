# Typography

The portfolio version uses self-hosted Albert Sans from Google Fonts under the SIL Open Font License 1.1. The full license is included at `public/assets/fonts/OFL.txt`.

`src/styles/fonts.css` declares the variable font and `src/styles/tokens.css` selects it. No runtime font CDN is required.

The proprietary Airbnb Cereal file has been removed from the current source tree. Font metrics differ, so the earlier pixel-identical measurements against the reference do not apply to this font replacement. Layout and interaction behavior should be assessed separately.
