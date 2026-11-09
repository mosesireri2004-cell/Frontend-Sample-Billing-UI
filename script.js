const packages = [
  {
    id: "package_1",
    badge: "hourly",
    price: 5,
    duration: 3600,
    time: "1 hr unlimited",
  },
  {
    id: "package_2",
    badge: "speed-3",
    price: 10,
    duration: 7200,
    time: "3 hrs unlimited",
  },
  {
    id: "package_3",
    badge: "half-day-flex",
    price: 20,
    duration: 43200,
    time: "12 hrs unlimited",
  },
  {
    id: "package_4",
    badge: "daily pass",
    price: 30,
    duration: 86400,
    time: "24 hrs unlimited",
  },
  {
    id: "package_5",
    badge: "3-day trio",
    price: 65,
    duration: 259200,
    time: "3 days unlimited",
  },
  {
    id: "package_6",
    badge: "weekly access",
    price: 180,
    duration: 604800,
    time: "7 days unlimited",
  },
  {
    id: "package_7",
    badge: "monthly 1 device",
    price: 300,
    duration: 2592000,
    time: "30 days unlimited",
  },
];

const phoneOverlay = document.querySelector(".phone-overlay");
const errorOverlay = document.querySelector(".error-overlay");
const processOverlay = document.querySelector(".process-request");
function init() {
  generatePackage();
}

init();

function generatePackage() {
  let packageCard = "";

  packages.forEach((package) => {
    packageCard += `
<div>
  <div class="card">
    <p>${package.badge}</p>
    <p>Ksh <span>${package.price}</span></p>
    <p>${package.time}</p>
  </div>
  <div class="button-section">
    <button class="connect-button" value="${package.price}" onclick="buy(packageId)">Click Here to Connect</button>
  </div>
</div>
        `;
  });

  document.querySelector(".package-wrapper").innerHTML = packageCard;
}

document.querySelectorAll(".connect-button").forEach((button) => {
  button.addEventListener("click", () => {
    phoneOverlay.style.display = "flex";
  });
});

document.querySelector(".cancel-btn").addEventListener("click", () => {
  phoneOverlay.style.display = "none";
});

document.querySelector(".okay-btn").addEventListener("click", () => {
  errorOverlay.style.display = "none";
});

document
  .querySelector(".activate-with-mpesa")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target);

    const mpesa = formdata.get("mpesa-message");

    if (mpesa === "") {
      errorOverlay.style.display = "flex";
      document.querySelector(".error").textContent =
        "Please Enter the Mpesa Message!";
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/mpesa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mpesa }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      return console.log(data.message);
    } catch (error) {
      alert("Unable to connect to Remote Server!");
      console.error("Error:", error);
      return null;
    }
  });

document
  .querySelector(".reconnect-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target);

    const phoneVoucher = formdata.get("phone-voucher");

    if (phoneVoucher === "") {
      errorOverlay.style.display = "flex";
      document.querySelector(".error").textContent =
        "Please Enter Phone Number or Voucher Code!";
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/reconnect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneVoucher }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      return console.log(data.message);
    } catch (error) {
      alert("Unable to connect to Remote Server!");
      console.error(error);
      return null;
    }
  });

document
  .querySelector(".activate-voucher")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target);

    const voucher = formdata.get("voucher");
    const phone = formdata.get("phone");

    if (voucher === "" || phone === "") {
      errorOverlay.style.display = "flex";
      document.querySelector(".error").textContent =
        "Please Enter the Required Fields!";
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:5000/api/activate_voucher",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ voucher, phone }),
        },
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      return console.log(data.message);
    } catch (error) {
      alert("Unable to connect to Remote Server!");
      console.error(error);
      return null;
    }
  });

document
  .querySelector(".activate-package")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target);

    const username = formdata.get("username");
    const password = formdata.get("password");

    if (username === "" || password === "") {
      errorOverlay.style.display = "flex";
      document.querySelector(".error").textContent =
        "Please Enter the Required Fields!";
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/activate_package",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        },
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      return console.log(data.message);
    } catch (error) {
      alert("Unable to connect to Remote Server!");
      console.error(error);
      return null;
    }
  });

document
  .querySelector(".phone-overlay")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const phone = formdata.get("phone");

    if (!phone) {
      return;
    }

    phoneOverlay.style.display = "none";
    processOverlay.style.display = "flex";

    try {
      const response = await fetch("http://localhost:5000/api/phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      return console.log(data.message);
    } catch (error) {
      // alert("Unable to connect to Remote Server!");
      console.error(error);
      return null;
    }
  });

window.addEventListener("load", () => {
  setTimeout(() => {
    // Fade out splash screen
    document.getElementById("splash").classList.add("hide");

    // Fade in website
    document.getElementById("main").classList.add("show");
  }, 3000);
});

// async function buyPackage(packageId) {
//   const response = await fetch("/api/buy-package", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       packageId: packageId,
//     }),
//   });

//   const result = await response.json();

//   console.log(result);
// }
