# Ohjeet tiimille

Näin päivität tiedostoja tässä repossa — ilman että tarvitset git-taitoja tai teknistä osaamista. Kaikki tapahtuu selaimessa.

---

## 📝 Tiedoston muokkaus vaihe vaiheelta

1. **Avaa tiedosto** jonka haluat muokata (esim. [SCHEDULE.md](SCHEDULE.md))
2. **Klikkaa kynä-ikonia ✏️** oikeasta yläkulmasta ("Edit this file")
3. **Editori avautuu** — näet sisällön tekstinä
4. **Tee muutokset** — kirjoita, poista, lisää rivejä normaalisti
5. **Klikkaa "Preview"** nähdäksesi miltä muutos näyttää valmiissa näkymässä
6. **Vieritä alas** — siellä on laatikko "Commit changes"
7. **Kirjoita lyhyt kuvaus** mitä teit (esim. *"Simakisan status julkaistuksi"*)
8. **Klikkaa "Commit changes"** — tallentuu

Siinä se. Muutos näkyy heti kaikille.

> 💡 **Vinkki:** Jos huomaat virheen tallentamisen jälkeen, voit aina muokata uudestaan. Mikään muutos ei ole peruuttamaton — GitHub tallentaa kaikki aiemmat versiot automaattisesti.

---

## 🎯 Yleisimmät päivitystilanteet

### Kun olet juuri julkaissut postauksen

Avaa `SCHEDULE.md` → etsi rivi → muuta status:
- `⏳ Seuraava` tai `📅 Suunniteltu` → `✅ Julkaistu`

Kirjoita commit-viestiksi esim. *"Simakisa-ennakko julkaistu 20.4."*

### Kun haluat lisätä uuden suunnitellun postauksen

Avaa `SCHEDULE.md` → etsi aikataulutaulukko → lisää uusi rivi oikeaan kohtaan kronologisesti:

```
| ~5.6. | Feed | Kesän ensimmäinen kisa | Kuvat Suvinuolesta | 📅 Suunniteltu |
```

Taulukon syntaksi on yksinkertainen: jokainen `|` erottaa sarakkeen.

### Kun keksit hyvän idean mutta et vielä tiedä milloin julkaistaisiin

Avaa `SCHEDULE.md` → vieritä kohtaan **"Sisältöideat"** → lisää rivi:

```
- 💡 Ideasi tähän (lyhyt kuvaus mistä olisi kyse)
```

### Kun suunnitelma muuttuu (esim. postaus siirtyy)

Muokkaa rivin päivämäärää ja halutessasi lisää selitys viestiin:
- Commit-viesti: *"Maastoratapostaus siirretty 30.4. → 2.5. sääennusteen takia"*

---

## 🏷️ Statusmerkintöjen käyttö

| Merkki | Tarkoitus | Milloin käyttää |
|--------|-----------|-----------------|
| ✅ | Julkaistu | Postaus on live Instagramissa |
| ⏳ | Seuraava / työn alla | Tätä tehdään nyt, julkaistaan päivien sisällä |
| 📅 | Suunniteltu | Aikataulutettu, mutta työ ei vielä käynnissä |
| 💡 | Idea | Ei vielä aikataulutettu, elää ideoiden listalla |

**Tärkeää:** Vain yksi postaus kerrallaan kannattaa olla ⏳-tilassa. Jos aloitat uuden, muuta edellinen ✅:ksi ensin.

---

## ⚠️ Hyvä muistaa

**Yksi ihminen kerrallaan samassa tiedostossa.** GitHub varoittaa jos joku toinen on muokannut tiedostoa sinun ollessasi editorissa. Jos näin käy, hylkää omat muutoksesi, päivitä sivu ja tee muutokset uudestaan.

**Pienet commitit ovat parempia kuin isot.** Jos teet monta eri muutosta, tallenna ne erikseen. Helpompaa seurata historiaa jälkeenpäin.

**Älä poista tiedostoja.** Jos jokin tuntuu tarpeettomalta, kysy muilta ensin. Poistetut tiedostot saa palautettua, mutta se on turhaa vaivaa.

**Commit-viestit auki:** Kaikki repon jäsenet näkevät mitä teit ja milloin. Tämä on hyvä asia — se pitää tiimin kartalla.

---

## 🤝 Suositeltu rutiini

**Kun julkaiset Instagramissa:**
1. Julkaise Instagramissa
2. Tee samalla Story-jako Feed-postauksesta
3. Avaa `SCHEDULE.md` → muuta status ✅
4. Commit: *"[Postauksen nimi] julkaistu"*

**Kerran viikossa (esim. sunnuntai-ilta):**
1. Katso ensi viikon postaukset `SCHEDULE.md`:stä
2. Valmistele tekstit ja kuvat ajoissa
3. Päivitä status ⏳ kun aloitat

**Kerran kuussa:**
1. Käy `viestintasuunnitelma.md` läpi
2. Onko tavoitteet saavutettu? Pitääkö suunnitelmaa päivittää?
3. Keskustele tiimissä, päivitä tarvittaessa

---

## 🆘 Jos jokin menee pieleen

**"En pääse editoimaan, kynä-ikoni ei näy"**
→ Et ole kirjautunut GitHubiin, tai sinua ei ole vielä kutsuttu collaboratoriksi. Tarkista sähköpostisi kutsun varalta.

**"Tein virheen ja commit meni jo läpi"**
→ Ei hätää. Avaa tiedosto, muokkaa uudestaan oikeaan muotoon, uusi commit. Vanha versio säilyy historiassa mutta uusin näkyy tiimille.

**"Tiedosto näyttää oudolta, rivit menneet sekaisin"**
→ Todennäköisesti taulukon `|`-merkki on jäänyt pois. Vertaa muihin riveihin ja varmista että joka rivillä on sama määrä sarakkeita.

**"Haluan tehdä ison muutoksen mutta pelottaa"**
→ Tee ehdotus Issueen ensin (välilehti *"Issues"* → *"New issue"*) ja kysy muilta. Ei tarvitse yksin päättää isoista linjauksista.

---

## 📬 Kysymykset ja kehitysideat

- **Nopea kysymys?** Viestintätiimin WhatsApp-ryhmä
- **Pidempi pohdinta tai ehdotus?** [Luo Issue](../../issues/new)
- **Et tiedä keneltä kysyisit?** Kysy repon ylläpitäjältä

Tervetuloa mukaan! 🏹
