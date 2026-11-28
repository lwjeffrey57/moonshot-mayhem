# Security and launch safety

From the owner, 28 Nov: take security very seriously when the app launches. He has seen how apps built with AI help get compromised and does not want a lawsuit or a hack. Treat this file as a hard requirement, the same weight as the gameplay rules.

This is a checklist for an engineer, not legal advice. Before launch the owner should have a lawyer look at the privacy policy, terms, and anything aimed at children.

## Now, while it is a local game

- **No secrets in the repo, ever.** No API keys, passwords, signing keys or tokens in any file, commit, setting, log or chat. Use the Mac's keychain or environment variables. A Tripo key was once pasted in chat: it must not appear anywhere, and the owner has been told to rotate it.
- **Add a secret scan** to the repo (for example `gitleaks`) and run it before every push. Scan the history once now.
- **Keep the repo private.** The owner's record (`owner/`) stays out of git.
- **Signing keys and certificates** live in the keychain, never in the project.
- **Know every package.** Only Unity's own packages and well-known ones; pin versions; ask before adding any third-party plugin or SDK. Each SDK is code that runs in the owner's name and may collect data.
- **Collect nothing.** The local game should make no network calls except what the owner has approved. List any that exist.
- **Saves on the device** are for convenience only. Assume a player can edit them.

## When accounts, a server, leaderboards or purchases arrive

- **Never trust the app.** Scores, currency, unlocks, purchases and daily-challenge results are decided or checked on the server. Anything the app says can be faked.
- **Do not build sign-in or payments by hand.** Use Sign in with Apple / Game Center and Apple's in-app purchase system, and verify every receipt on the server.
- **No secret ships inside the app.** Anything in the build can be pulled out. Server keys stay on the server.
- **Server basics:** HTTPS only; every request checked for who is asking and whether they may; inputs validated; rate limits; database rules that deny by default (an open database is the most common way these apps leak); least-privilege keys; backups; logs without personal data.
- **Collect the minimum.** No email unless truly needed. No precise location, contacts or ad tracking. Less data held means less to lose.
- **Account deletion** inside the app (Apple requires it when accounts exist).
- **Chat or player-made names** need filtering and reporting, or leave them out.

## Store and legal

- **Privacy policy and Apple's privacy labels** must match what the app really does, including every SDK.
- **Children:** a cartoon baseball game will attract kids. Decide the age rating early; if under-13s may play, COPPA (US) and similar laws apply: no personal data or behavioral ads without parental consent. Simplest safe path: collect nothing.
- **GDPR / CCPA** apply once there are accounts: say what is collected, let players see and delete it.
- **Purchases:** no loot boxes or paid currency (already the owner's rule). Clear prices, restore purchases, no tricks aimed at kids.
- **Content rights:** every model, clip, sound, font and name must be cleared. Current audio is NOT cleared for release. Keep a list of where each asset came from and its license. Avoid anything resembling real teams, players, leagues or their marks.
- **Third-party licenses** screen in the app for open-source fonts and code.

## Before any release

- Secret scan clean; no test keys, debug menus or cheat switches in the build.
- A written list of every network call and every piece of data stored.
- An independent security review of the server and database rules before real players or real money. Tell the owner plainly this is worth paying for.
- A plan for what happens if something leaks: who is told, how keys are rotated.

## How to report

When any work touches accounts, network, purchases, saves or a new package, say so in the report under a "Security" line: what was added, what it can reach, what was checked and what was not.
