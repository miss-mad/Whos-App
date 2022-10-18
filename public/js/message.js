const newMessageHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#user").value.trim();
  const content = document.querySelector("#message").value.trim();

  if (name && content) {
    const response = await fetch(`/api/message`, {
      method: "POST",
      body: JSON.stringify({ name, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to create message");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("id")) {
    const id = event.target.getAttribute("id");

    const response = await fetch(`/api/message/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete message");
    }
  }
};

document
  .querySelector(".new-contact")
  .addEventListener("submit", newMessageHandler);

document
  .querySelector(".contact-list")
  .addEventListener("click", delButtonHandler);
