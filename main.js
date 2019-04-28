// ===== Form Submit =====
let formUrl = 'https://script.google.com/macros/s/AKfycbx0cQXSH_DMs1yP-h6DGaE4Utba5qZiowqSGcNgzGt5yyDPxhM/exec'
let forms = [
  document.getElementById('newsletter-form1'),
  document.getElementById('newsletter-form2')
]

function handleFormSubmit (event, formIndex) {
  event.preventDefault()
  console.log(formIndex)
  let form = forms[formIndex]
  let formData = new FormData(form)
  let phoneNumber = formData.get('phone') || ''
  let email = formData.get('email') || ''

  window.fetch(`${formUrl}?phone=${encodeURIComponent(phoneNumber)}&mail=${encodeURIComponent(email)}`)
    .then((response) => {
      form.innerHTML = '<p style="font-style: italic; font-weight: bold;">Nice! Wir werden dich über den Polarstern-Launch informieren.</p>'
    })
    .catch(console.error)
}

forms[0].addEventListener('submit', (event) => handleFormSubmit(event, 0))
forms[1].addEventListener('submit', (event) => handleFormSubmit(event, 1))

// ===== PARALLAX =====
let screens = document.querySelectorAll('.item.parallax')
let screenPositions = []
let windowHeight = window.innerHeight
let viewportMiddle = windowHeight / 2
let scheduledAnimationFrame = false
let isCheckingAfterResize = false

updateScreenPositions()

window.addEventListener('scroll', debounce(udpateParallaxPositions), { passive: true })

function udpateParallaxPositions () {
  screens.forEach((element, index) => {
    scheduledAnimationFrame = false
    let elementOffset = screenPositions[index] - (window.pageYOffset + viewportMiddle)

    element.style.transform = `translateY(${-easingFn(elementOffset)}px)`
  })
}

function debounce (fn) {
  return function () {
    if (scheduledAnimationFrame) return

    scheduledAnimationFrame = true
    requestAnimationFrame(fn)
  }
}

let maxPosOffset = windowHeight / 90
maxPosOffset *= maxPosOffset

function easingFn (yPos) {
  if (yPos > windowHeight) return maxPosOffset

  let positive = yPos > 0
  if (!positive) return 0

  yPos /= 90
  yPos *= yPos
  return yPos
}

window.addEventListener('resize', updateScreenPositions)

function updateScreenPositions () {
  windowHeight = window.innerHeight
  viewportMiddle = windowHeight / 2

  new Promise((resolve) => {
    if (isCheckingAfterResize) return
    isCheckingAfterResize = true
    setTimeout(() => { resolve() }, 250) // Wait a bit until the correct height is available
  })
    .then(() => {
      screens.forEach((element, index) => {
        screenPositions[index] = element.offsetTop + windowHeight
      })

      isCheckingAfterResize = false
    })
}
