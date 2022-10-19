const newContactHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#username").value.trim();
  const email = document.querySelector("#email").value.trim();

  if (name && email) {
    const response = await fetch(`/api/contacts`, {
      method: "POST",
      body: JSON.stringify({ name, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to create contact");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("id")) {
    const id = event.target.getAttribute("id");

    const response = await fetch(`/api/contacts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete contact");
    }
  }
};

// document
//   .querySelector(".new-contact")
//   .addEventListener("submit", newContactHandler);

// document
//   .querySelector(".contact-list")
//   .addEventListener("click", delButtonHandler);
