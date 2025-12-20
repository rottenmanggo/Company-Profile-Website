document.addEventListener("DOMContentLoaded", function () {
    var yearSpan = document.getElementById("year");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }

    var scrollBtn = document.getElementById("scrollTopBtn");
  
    if (scrollBtn) {
      window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
          scrollBtn.style.display = "flex";
        } else {
          scrollBtn.style.display = "none";
        }
      });

      scrollBtn.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }

    var aboutBtn = document.getElementById("aboutToggleBtn");
    var aboutExtra = document.getElementById("aboutExtra");
  
    if (aboutBtn && aboutExtra) {
      aboutBtn.addEventListener("click", function () {
        var hidden = aboutExtra.classList.toggle("d-none");

        aboutBtn.textContent = hidden ? "Baca selengkapnya" : "Tutup";
      });
    }

    var contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        var nameInput = document.getElementById("name");
        var emailInput = document.getElementById("email");
        var messageInput = document.getElementById("message");
        var alertPlaceholder = document.getElementById("formAlert");
  
        var errors = [];
  
        if (!nameInput.value.trim()) {
          errors.push("Nama wajib diisi.");
        }
  
        if (!emailInput.value.trim()) {
          errors.push("Email wajib diisi.");
        } else {
          var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(emailInput.value.trim())) {
            errors.push("Format email tidak valid.");
          }
        }
  
        if (!messageInput.value.trim()) {
          errors.push("Pesan wajib diisi.");
        }
  
        if (errors.length > 0) {
          e.preventDefault();
          if (alertPlaceholder) {
            alertPlaceholder.innerHTML = `
              <div class="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                ${errors.join("<br>")}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            `;
          } else {
            alert(errors.join("\n"));
          }
        }
      });
    }
    var counters = document.querySelectorAll(".metric-number[data-target]");
    var animated = false;

    function animateCounters() {
      if (animated) return;
      animated = true;

      counters.forEach(function (el) {
        var target = parseInt(el.getAttribute("data-target"), 10);
        var suffix = el.getAttribute("data-suffix") || "";
        var duration = 1500;
        var startTime = null;

        function update(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var current = Math.floor(progress * target);

          el.textContent = current.toLocaleString("id-ID") + suffix;

          if (progress < 1) {
            window.requestAnimationFrame(update);
          }
        }

        window.requestAnimationFrame(update);
      });
    }

    animateCounters();
  });
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if (!name) {
        Swal.fire("Oops!", "Nama harus diisi!", "warning");
        return;
    }
    if (!email) {
        Swal.fire("Oops!", "Email harus diisi!", "warning");
        return;
    }
    if (!message) {
        Swal.fire("Oops!", "Pesan harus diisi!", "warning");
        return;
    }

    Swal.fire("Berhasil!", "Form berhasil dikirim!", "success");
});
  