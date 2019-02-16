let formUrl = 'https://script.google.com/macros/s/AKfycbx0cQXSH_DMs1yP-h6DGaE4Utba5qZiowqSGcNgzGt5yyDPxhM/exec'
let form = document.getElementById('newsletter-form')

function handleFormSubmit (event) {
  event.preventDefault()
  let formData = new FormData(form)
  let phoneNumber = formData.get('phone') || ''
  let email = formData.get('email') || ''

  window.fetch(`${formUrl}?phone=${encodeURIComponent(phoneNumber)}&mail=${encodeURIComponent(email)}`)
    .then((response) => {
      form.innerHTML = '<p style="font-style: italic; font-weight: bold;">Nice! Wir werden dich über den Polarstern-Launch informieren.</p>'
    })
    .catch(console.error)
}

form.addEventListener('submit', handleFormSubmit)
