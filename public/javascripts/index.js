const urlConvertForm = document.querySelector('#url-convert-form')
const btnCopy = document.querySelector('#btn-copy')

// check original url
urlConvertForm.addEventListener('submit', function(e) {
  if (!urlConvertForm.checkValidity()) {
    e.stopPropagation()
    e.preventDefault()
  }
  urlConvertForm.classList.add('was-validated')
})

// copy short url
btnCopy.addEventListener('click', function (e) {
  const urlShort = document.querySelector('#url-short')

  // Select shortener url input
  urlShort.select();
  urlShort.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside shortener url input
  navigator.clipboard.writeText(urlShort.value);
  
  console.log(`urlShort.value = ${urlShort.value}`)
})
