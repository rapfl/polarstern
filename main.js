// ===== Form Submit =====
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

// ===== PARALLAX =====
let screens = document.querySelectorAll('.item.parallax')
let screenPositions = []
let viewportMiddle = window.innerHeight / 2
let scheduledAnimationFrame = false

new Promise((resolve) => {
  setTimeout(() => { resolve() }, 250) // Wait a bit until the correct height is available
}).then(() => {
  screens.forEach((element, index) => {
    let screenHeight = 400 // Pauschalwert
    screenPositions[index] = element.offsetTop + screenHeight
  })
})

window.addEventListener('scroll', debounce(udpateParallaxPositions), { passive: true })

function udpateParallaxPositions () {
  screens.forEach((element, index) => {
    scheduledAnimationFrame = false
    let scrollOffset = window.pageYOffset + viewportMiddle
    let elementOffset = screenPositions[index] - scrollOffset

    element.style.transform = `translateY(${elementOffset / 9}px)`
  })
}

function debounce (fn) {
  return function () {
    if (scheduledAnimationFrame) return

    scheduledAnimationFrame = true
    requestAnimationFrame(fn)
  }
}
