const urlConvertForm = document.querySelector('#url-convert-form')
const btnCopy = document.querySelector('#btn-copy')
const urlOrigin = document.querySelector('#url-origin')
const urlShort = document.querySelector('#url-short')

// check original url
urlConvertForm.addEventListener('submit', function(e) {
  urlConvertForm.classList.add('was-validated')

  if (!urlConvertForm.checkValidity()) {
    e.stopPropagation()
    e.preventDefault()
  }
})

// if original url is empty > short url is empty and btnCopy adds disabled
urlOrigin.addEventListener('input', function(e) {
  if(e.target.value === ''){
    urlShort.value = ''
    if(!btnCopy.matches('.disabled')){
      btnCopy.classList.add('disabled')
    }
  }
})

// copy short url
btnCopy.addEventListener('click', function (e) {
  const urlShort = document.querySelector('#url-short')

  // Select shortener url input
  urlShort.select();
  urlShort.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside shortener url input
  navigator.clipboard.writeText(urlShort.value);
})
