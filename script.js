document.addEventListener('DOMContentLoaded', () => {
  const optionsUrl = "https://script.google.com/macros/s/AKfycbyKTIEey_gQB-IY7Iun5yuKV-8_6wiTGe6CUGba5OAvBqwYmy22QoGmfJ-BJ1lvslQ/exec"; // Reemplaza con la URL del Apps Script doGet
  fetch(optionsUrl)
    .then(r => r.json())
    .then(data => {
      fillSelect('Año', data.Año);
      fillSelect('Semestre', data.Semestre);
      fillSelect('Profesor', data.Profesor);
      fillSelect('Asignatura', data.Asignatura);
      fillSelect('TipoClase', data.TipoClase);
      fillSelect('Ciudad', data.Ciudad);
    })
    .catch(err => console.error(err));
});

function fillSelect(fieldName, values) {
  const select = document.querySelector(`select[name="${fieldName}"]`);
  if (select) {
    select.innerHTML = '<option value="">Seleccione</option>';
    values.forEach(val => {
      const opt = document.createElement('option');
      opt.value = val;
      opt.textContent = val;
      select.appendChild(opt);
    });
  }
}

document.getElementById('data-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const obj = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });

  const postUrl = "https://script.google.com/macros/s/AKfycbyKTIEey_gQB-IY7Iun5yuKV-8_6wiTGe6CUGba5OAvBqwYmy22QoGmfJ-BJ1lvslQ/exec"; // Reemplaza con la misma URL del Apps Script
  
  fetch(postUrl, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(r => r.text())
  .then(txt => {
    document.getElementById('status').textContent = "Registro exitoso!";
    form.reset();
  })
  .catch(err => {
    document.getElementById('status').textContent = "Error al registrar.";
    console.error(err);
  });
});
