const urlConvertForm = document.querySelector('#url-convert-form')
const btnShorten = document.querySelector('#btn-shorten')
const btnCopy = document.querySelector('#btn-copy')

urlConvertForm.addEventListener('submit', function(e) {
  if (!urlConvertForm.checkValidity()) {
    e.stopPropagation()
    e.preventDefault()
    alert('urlConvertForm invalid')  //驗證不通過，就跳 alert
  }
})

btnShorten.addEventListener('click', function (e) {
  urlConvertForm.classList.add('was-validated')
})

btnCopy.addEventListener('click', function (e) {
  const urlShort = document.querySelector('#url-short')

  // Select shortener url input
  urlShort.select();
  urlShort.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside shortener url input
  navigator.clipboard.writeText(urlShort.value);
  
  console.log(`urlShort.value = ${urlShort.value}`)
})
