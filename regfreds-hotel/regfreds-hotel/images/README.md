# Regfred's Hotel Website
## Images Guide — How to Add Photos

---

### Folder Structure

```
regfreds-hotel/
│
├── index.html          ← Main page
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← All JavaScript + Paystack setup
│
└── images/
    ├── hero/           ← Hero background (full screen photo)
    ├── rooms/          ← Room photos
    ├── gallery/        ← Gallery section photos
    ├── amenities/      ← Optional amenity photos
    └── README.md       ← This file
```

---

### Recommended Image Sizes

| Section         | File Name Example          | Recommended Size  |
|-----------------|----------------------------|-------------------|
| Hero background | hero/hotel-front.jpg       | 1920 × 1080px     |
| About section   | about/hotel-lobby.jpg      | 800 × 1000px      |
| Standard Room   | rooms/standard-room.jpg    | 800 × 600px       |
| Deluxe Room     | rooms/deluxe-room.jpg      | 800 × 600px       |
| Executive Suite | rooms/executive-suite.jpg  | 800 × 600px       |
| Gallery 1       | gallery/lobby.jpg          | 900 × 700px       |
| Gallery 2       | gallery/pool.jpg           | 600 × 700px       |
| Gallery 3       | gallery/suite.jpg          | 600 × 700px       |
| Gallery 4       | gallery/restaurant.jpg     | 900 × 700px       |
| Dining          | dining/restaurant.jpg      | 800 × 640px       |

> Tip: Compress all images at tinypng.com or squoosh.app before uploading.
> Target file size: under 300KB per image for fast loading.

---

### How to Add Each Photo

#### 1. HERO BACKGROUND
Open `css/style.css` and find the `.hero` rule. Add these lines:

```css
.hero {
  background-image: url('../images/hero/hotel-front.jpg');
  background-size: cover;
  background-position: center;
  /* Keep the gradient lines below — they darken the image */
}
```

Then change `.hero-bg` to:
```css
.hero-bg {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);  /* dark overlay so text is readable */
}
```

---

#### 2. ABOUT SECTION PHOTO
In `index.html`, find the `<!-- HOW TO ADD A PHOTO HERE -->` comment in the About section.
Replace the entire `.about-card` div with:

```html
<img src="images/about/hotel-lobby.jpg" alt="Regfred's Hotel Lobby" class="about-photo">
```

Then add to `css/style.css`:
```css
.about-photo {
  width: 100%;
  height: 500px;
  object-fit: cover;
}
```

---

#### 3. ROOM PHOTOS
In `index.html`, inside each `.room-visual` div, add an `<img>` tag:

```html
<div class="room-visual room-pattern-1">
  <img src="images/rooms/standard-room.jpg" alt="Standard Room" class="room-photo">
  <div class="room-badge">Most Popular</div>
  <div class="room-number">01</div>
</div>
```

The `.room-photo` class is already in `style.css` — it will cover the full area automatically.

---

#### 4. GALLERY PHOTOS
In `index.html`, inside each `.gallery-item-inner` div, replace the comment with an `<img>`:

```html
<div class="gallery-item-inner g1">
  <img src="images/gallery/lobby.jpg" alt="Hotel Lobby" class="gallery-photo">
</div>
```

You can also remove the `g1`, `g2`, `g3`, `g4` classes from the parent div once you have real photos (those were placeholder gradient colors).

---

#### 5. DINING PHOTO
In `index.html`, find the `.dining-visual` div and add the photo inside it:

```html
<div class="dining-visual">
  <img src="images/dining/restaurant.jpg" alt="Restaurant" class="dining-photo">
</div>
```

Remove the `<div class="dining-quote">` line once you have a real photo.

---

#### 6. GOOGLE MAPS
1. Go to maps.google.com
2. Search "Kasoa, Central Region, Ghana"
3. Click **Share** → **Embed a map** → Copy the `<iframe>` code
4. In `index.html`, find the `.location-map` div and replace the placeholder:

```html
<div class="location-map">
  <iframe
    src="https://www.google.com/maps/embed?pb=..."
    allowfullscreen=""
    loading="lazy">
  </iframe>
</div>
```

---

### Paystack MoMo Setup
See `js/main.js` — the full instructions are in the comments under Section 5.
Short version:
1. Sign up at paystack.com
2. Get your public key
3. In `index.html`, uncomment the Paystack script tag
4. In `js/main.js`, uncomment the PaystackPop block and paste your key
