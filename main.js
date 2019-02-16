let formUrl = 'https://script.google.com/macros/s/AKfycbx0cQXSH_DMs1yP-h6DGaE4Utba5qZiowqSGcNgzGt5yyDPxhM/exec'
let form = document.getElementById('newsletter-form')

function handleFormSubmit (event) {
  event.preventDefault()

  window.fetch(formUrl)
    .then((response) => {
      form.innerHTML = '<p style="font-style: italic;">Nice! Wir informieren dich über den Polarstern-Launch.</p>'
    })
    .catch(console.error)
}

form.addEventListener('submit', handleFormSubmit)
