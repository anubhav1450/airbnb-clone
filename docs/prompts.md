# Prompts — Airbnb listing clone

Prompts from my session with Claude Code, in the order I sent them, word for word (typos included). Short retries and
connection troubleshooting are left out.

---

## 1. Understand the assignment before any code

@"/Users/anubhav/Downloads/Playpower/Playpower Labs Assignment_ Airbnb-Clone App.pdf"
Read the uploaded Playpower Labs Airbnb-Clone assignment PDF completely and carefully.

Do NOT write any code yet.

First, analyze the assignment and the reference requirement in detail.

Reference:
https://airbnb-clone-umber-two.vercel.app

I want you to produce a concise implementation specification for this exact assignment.

Cover:

1. Every requirement stated in the PDF.
2. The three required views:
   - Listing Page
   - Photo Tour
   - Lightbox
3. All interactions and navigation requirements.
4. Visual fidelity requirements.
5. Animation/transition requirements.
6. Accessibility requirements.
7. AI-native workflow requirements.
8. Required architecture diagram.
9. Required submission deliverables.
10. What must NOT be done, especially regarding copying/lift-and-shift.
11. A proposed project structure and implementation strategy.
12. A step-by-step development plan ordered by priority.

Important:
- Treat the PDF as the authoritative assignment specification.
- Treat the reference website as the single source of truth for the UI and behaviour.
- Do not invent requirements that are not present in the PDF.
- Do not redesign or "improve" the reference.
- Do not start implementation yet.
- If the reference website cannot be accessed because of the 429 restriction, clearly identify exactly what information/screenshots/video we need from the reference before implementation.

At the end, give me:
A) "What we know from the PDF"
B) "What must be inspected from the reference"
C) "Implementation plan"
D) "Information/assets I need to provide you"

Wait for my approval before writing code.

## 2. Approve the plan and start inspecting the reference

Yes, run the full structured inspection pass.

## 3. Implementation direction, constraints, and verification loop

Yes. Proceed with the implementation now.

Use:
- Vite + React + JavaScript
- No TypeScript
- No backend

Use the uploaded Playpower Labs assignment PDF as the authoritative specification.

Use `reference-inspection.md` and everything you discovered through Claude in Chrome as the source of truth for the reference implementation.

The goal is to reproduce the reference EXACTLY, both visually and behaviorally. Do not redesign, improve, simplify, or add features that are not present in the reference.

Implement incrementally:

1. Project setup and architecture
2. Global styles/design tokens
3. Header and navigation
4. Hero/gallery
5. Listing page sections
6. Sticky booking card
7. Scroll-triggered navigation bar
8. Photo Tour
9. Lightbox
10. Previous/next navigation
11. Keyboard ←/→ and Escape behavior
12. Amenities dialog
13. Toast interactions
14. Calendar and remaining sections
15. Animations/transitions
16. Accessibility
17. Final visual/behavioral polish

Use the exact measurements, assets, content, typography, colors, spacing, image layouts, motion values, and interaction behavior that you already extracted from the reference.

For the 43 gallery images and other assets:
- Use the exact publicly served asset URLs/files you identified from the reference where appropriate.
- Keep all assets organized and easy to replace if needed.
- Do not copy the reference application's source code or bundled JavaScript.

For the Airbnb Cereal font:
- Use it only if it is legitimately available for this assignment.
- Otherwise use the closest appropriate fallback and document the decision.

AI-native workflow:
- Use Claude Code as the coding agent.
- Keep useful sub-agent/skill configuration files.
- Preserve the prompt sequence used during development.
- Keep `reference-inspection.md`.
- Do not create meaningless AI configuration just for appearance; the workflow should genuinely be useful.

Verification:
After every major implementation phase:
- run the application
- use Claude in Chrome to inspect the local implementation
- compare it against the reference
- identify discrepancies
- fix them
- continue

Do not stop at a rough approximation. Prioritize pixel-level visual fidelity and behavioral parity with the reference.

Also create the production-scale architecture diagram required by the assignment. Keep this separate from the actual frontend implementation; do not unnecessarily build backend infrastructure for the clone.

Before declaring the assignment complete:
- run the production build
- fix relevant errors/warnings
- verify all required interactions
- verify keyboard navigation
- verify accessibility
- verify desktop behavior
- perform a final reference comparison
- ensure all required submission artifacts are present
- ensure the project does not contain copied reference source code

Do not ask me for screenshots unless there is a specific visual detail that genuinely cannot be determined from the live reference, DOM, computed styles, measurements, or assets you already inspected.

Start building now.

## 4. Font investigation and final review

The implementation is looking good. Before finalizing, make the following changes/checks.

1. FONT — IMPORTANT
The reference uses Airbnb Cereal VF.

Do another investigation of the reference font through the live Chrome reference and the publicly served font assets you already identified.

I want the clone to use the same font as the reference if the font file is publicly served by the reference and can be legitimately reused for this assignment.

Do NOT simply settle for Albert Sans because it is convenient.

Determine:
- exact font files/weights used by the reference
- how they are loaded
- which weights are used for body text, headings, buttons, etc.

If the reference font cannot legitimately be included in the submission, tell me exactly why and then use the closest alternative. Otherwise, implement the actual reference font and re-run the visual measurements/diff.

2. Do NOT worry about the submission email.
I will handle the email/submission instructions myself.

3. Do NOT finalize or rewrite the AI prompt history for me.
I will decide which prompts and AI workflow artifacts I want to submit. Preserve the useful development artifacts, but don't treat the current prompts.md as final submission content.

4. Perform a final technical and visual review yourself.
Use the reference and current implementation to identify anything that materially differs from the assignment.

Prioritize:
- visual fidelity
- typography
- spacing
- images
- gallery
- Photo Tour
- Lightbox
- keyboard behavior
- animations/transitions
- accessibility
- sticky elements
- dialogs
- page height/layout

Fix any genuine issues you find.

Do not add unnecessary features or redesign anything.

After completing these checks, give me a concise final report containing:
- what you changed
- what remains different from the reference
- anything that could potentially affect assignment scoring
- exact location of the final ZIP and project folder

Do not send or submit anything externally.

## 5. Use the reference's exact font, within limits

Use the exact reference font for the clone.

The reference uses:
AirbnbCerealVF.woff2
served at:
/assets/fonts/AirbnbCerealVF.woff2

Please investigate whether the font file can be obtained through the normal browser-accessible reference asset and used for this take-home assignment.

If the file is accessible through the normal reference page/browser and can be included, download/use that exact font in the project.

Then:
1. Put it in the appropriate public/assets/fonts/ location.
2. Add the correct @font-face declaration.
3. Match the reference font weights:
   - 400 body
   - 500 headings/buttons/links/labels
   - 700 rating numbers and CHECK-IN/CHECKOUT/GUESTS labels
4. Remove the Albert Sans dependency/use.
5. Re-run the visual measurements/diff after switching fonts.
6. Re-tune any manually adjusted widths that were previously compensated for Albert Sans.
7. Verify the page height, text alignment, search pill, review chips, headings, buttons and overlays again.

Do not bypass security, bot protection, access controls, or licensing restrictions. Use only the normal publicly accessible asset through the browser.

Do not change anything else unless necessary because of the font switch.

## 6. A concrete visual mismatch found by comparing with the reference

there is a small differnece in slider of calender that is used between dates 18 - 23 october 26

in the actual website the slider gap is totally grey between 18-23
whereas in yours there is square the grey bgc does not cover around the permiter of 18 and 23 black circles respectively

## 7. Decision on the font

and what about the font issue
i want you to change that buddy to the original font that the clone is using there is no problem
cause i will mention in a seperate file that ihave use as learning purpose
what ever font is used in this clone
copy it into my work too

## 8. Final Visual Verification

Now compare the local implementation against the reference one more time.

Check the major sections, spacing, typography, images, sticky elements and page height.

Tell me what still differs and fix the genuine mismatches.

## 9. Interaction and Accessibility Verification

Now go through the important interactions once more and make sure they behave like the reference.

Check the Photo Tour, Lightbox, keyboard arrows, Escape, amenities dialog, sticky navigation and focus behaviour.

Fix anything that doesn't match.

## 10. Production Build Check

Before we call this done, run the production build and check the browser console for errors or warnings.

Fix anything that is actually caused by our implementation.

## 11. Final Submission Check

Do one final check against the assignment and make sure we haven't missed anything required for the submission.

Check the architecture diagram, required views, docs and build output.
