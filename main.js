/* ============================================================
   REGFRED'S HOTEL — MAIN JAVASCRIPT
   File: js/main.js

   TABLE OF CONTENTS
   1. Navigation (scroll effect + mobile menu)
   2. Booking Modal (open / close)
   3. Payment Method Selection
   4. Live Price Calculator
   5. Form Submission + Paystack Integration
   6. Set Min Dates on all date inputs
   ============================================================ */


/* ============================================================
   1. NAVIGATION
   ============================================================ */

// Add dark background to nav when user scrolls down
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Toggle mobile menu open/close
function toggleMenu() {
  document.getElementById('navbar').classList.toggle('menu-open');
}

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navbar').classList.remove('menu-open');
  });
});


/* ============================================================
   2. BOOKING MODAL
   ============================================================ */

function openBooking() {
  document.getElementById('bookingModal').classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent background scroll
}

function closeBooking() {
  document.getElementById('bookingModal').classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal when clicking the dark overlay (outside the modal box)
function closeOnOverlay(event) {
  if (event.target === document.getElementById('bookingModal')) {
    closeBooking();
  }
}

// Close modal with the Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeBooking();
});


/* ============================================================
   3. PAYMENT METHOD SELECTION
   ============================================================ */

function selectPayment(type, element) {
  // Remove 'selected' from all payment options
  document.querySelectorAll('.payment-opt').forEach(opt => {
    opt.classList.remove('selected');
  });

  // Add 'selected' to the clicked option
  element.classList.add('selected');

  // Show MoMo number field only when MoMo is selected
  const momoField = document.getElementById('momo-field');
  if (type === 'momo') {
    momoField.classList.add('visible');
  } else {
    momoField.classList.remove('visible');
  }
}


/* ============================================================
   4. LIVE PRICE CALCULATOR
   ============================================================ */

function calcTotal() {
  const checkIn  = document.getElementById('modal-checkin').value;
  const checkOut = document.getElementById('modal-checkout').value;
  const roomRate = parseInt(document.getElementById('room-select').value);
  const summary  = document.getElementById('price-summary');

  // Hide if dates are not set
  if (!checkIn || !checkOut) {
    summary.style.display = 'none';
    return;
  }

  // Calculate number of nights
  const nights = Math.round(
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
  );

  // Hide if dates are invalid
  if (nights <= 0) {
    summary.style.display = 'none';
    return;
  }

  // Calculate totals
  const subtotal = nights * roomRate;
  const tax      = Math.round(subtotal * 0.15);  // 15% tax
  const total    = subtotal + tax;

  // Update the UI
  document.getElementById('price-label').textContent =
    `GH₵ ${roomRate.toLocaleString()} × ${nights} night${nights > 1 ? 's' : ''}`;
  document.getElementById('price-nights').textContent = `GH₵ ${subtotal.toLocaleString()}`;
  document.getElementById('price-tax').textContent    = `GH₵ ${tax.toLocaleString()}`;
  document.getElementById('price-total').textContent  = `GH₵ ${total.toLocaleString()}`;

  summary.style.display = 'block';
}

// Helper: get total amount in pesewas for Paystack (Paystack uses pesewas, not cedis)
function getAmountInPesewas() {
  const totalText = document.getElementById('price-total').textContent;
  const total = parseInt(totalText.replace('GH₵ ', '').replace(/,/g, ''));
  return total * 100; // convert cedis to pesewas
}


/* ============================================================
   5. FORM SUBMISSION + PAYSTACK INTEGRATION

   HOW TO ACTIVATE PAYSTACK:
   -------------------------------------------------------
   Step 1: Sign up at paystack.com and get your PUBLIC key
   Step 2: In index.html, uncomment this line near the bottom:
           <script src="https://js.paystack.co/v1/inline.js"></script>
   Step 3: Replace 'pk_test_YOUR_KEY_HERE' below with your actual key
   Step 4: Change 'pk_test_' to 'pk_live_' when going live
   -------------------------------------------------------
   ============================================================ */

function submitBooking() {
  // --- FORM VALIDATION ---
  const firstName = document.querySelector('input[placeholder="Kwame"]').value;
  const lastName  = document.querySelector('input[placeholder="Mensah"]').value;
  const email     = document.querySelector('input[type="email"]').value;
  const phone     = document.querySelector('input[placeholder="+233 XXXXXXXXX"]').value;
  const checkIn   = document.getElementById('modal-checkin').value;
  const checkOut  = document.getElementById('modal-checkout').value;

  if (!firstName || !lastName || !email || !phone || !checkIn || !checkOut) {
    alert('Please fill in all fields before proceeding.');
    return;
  }

  // Check if price was calculated (dates are valid)
  const priceVisible = document.getElementById('price-summary').style.display !== 'none';
  if (!priceVisible) {
    alert('Please select valid check-in and check-out dates.');
    return;
  }

  // --- PAYSTACK PAYMENT ---
  // Uncomment the block below once you have your Paystack public key

  /*
  const handler = PaystackPop.setup({
    key: 'pk_test_YOUR_PUBLIC_KEY_HERE',  // ← Replace with your key
    email: email,
    amount: getAmountInPesewas(),          // Amount in pesewas (GH₵ × 100)
    currency: 'GHS',
    channels: ['mobile_money', 'card'],    // Allow both MoMo and card
    ref: 'REGFREDS_' + new Date().getTime(), // Unique reference per transaction
    metadata: {
      custom_fields: [
        {
          display_name: 'Guest Name',
          variable_name: 'guest_name',
          value: firstName + ' ' + lastName
        },
        {
          display_name: 'Room Type',
          variable_name: 'room_type',
          value: document.getElementById('room-select').options[
            document.getElementById('room-select').selectedIndex
          ].text
        },
        {
          display_name: 'Check-In',
          variable_name: 'check_in',
          value: checkIn
        },
        {
          display_name: 'Check-Out',
          variable_name: 'check_out',
          value: checkOut
        }
      ]
    },
    callback: function(response) {
      // Payment was successful — verify on your backend if needed
      alert('Booking confirmed! Your reference is: ' + response.reference);
      closeBooking();
    },
    onClose: function() {
      alert('Payment was cancelled. You can try again.');
    }
  });

  handler.openIframe();
  */

  // --- PLACEHOLDER (remove this alert when Paystack is active) ---
  alert(
    'Booking received!\n\n' +
    'Guest: ' + firstName + ' ' + lastName + '\n' +
    'Check-in: ' + checkIn + '\n' +
    'Check-out: ' + checkOut + '\n\n' +
    'Paystack payment will trigger here once your key is added to main.js'
  );
}


/* ============================================================
   6. SET MIN DATES
   Prevent guests from selecting past dates
   ============================================================ */

const today = new Date().toISOString().split('T')[0];

// Quick book bar
const qbCheckin  = document.getElementById('qb-checkin');
const qbCheckout = document.getElementById('qb-checkout');
if (qbCheckin)  qbCheckin.min  = today;
if (qbCheckout) qbCheckout.min = today;

// Booking modal
const modalCheckin  = document.getElementById('modal-checkin');
const modalCheckout = document.getElementById('modal-checkout');
if (modalCheckin)  modalCheckin.min  = today;
if (modalCheckout) modalCheckout.min = today;

// When check-in changes, update check-out min to be at least check-in date
if (modalCheckin) {
  modalCheckin.addEventListener('change', () => {
    if (modalCheckout) {
      modalCheckout.min = modalCheckin.value;
      // Reset checkout if it's now before check-in
      if (modalCheckout.value && modalCheckout.value <= modalCheckin.value) {
        modalCheckout.value = '';
        document.getElementById('price-summary').style.display = 'none';
      }
    }
  });
}
