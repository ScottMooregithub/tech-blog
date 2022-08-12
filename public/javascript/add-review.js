async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="review-title"]').value;
  const review_text = document.querySelector('input[name="review-text"]').value;

  const response = await fetch(`/api/reviews`, {
    method: "POST",
    body: JSON.stringify({
      title,
      review_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-review-form")
  .addEventListener("submit", newFormHandler);
