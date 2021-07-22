$(function () {
  // Handler for .ready() called.

  /***Function: RenderData***/
  function renderData(array) {
    let noHeader = true;
    let selectedYear = $('#selected-year').val(); //(new Date).getFullYear();
    let contElementApi = 0;
    if ($('#tableContainer').length > 0)
      $('#tableContainer').remove();
    let text = `
    <div id="tableContainer">
    <h2>Tabla para el año ${selectedYear}</h2>
    <table class="table">`;
    for (let ob of array) {
      text += '<tr>';
      if (noHeader) {
        for (att in ob)
          if (att == 'date')
            text += `<th class="width-100">${att}</th>`;
          else
            text += `<th>${att}</th>`;
        text += '</tr><tr>';
        noHeader = false;
      }
      if (ob['date'].slice(0, 4) == selectedYear) {
        contElementApi++
        for (att in ob)
          text += (att == 'law' | att == 'law_id') ? `<td>${ob[att].toString().replaceAll(',',', ')}</td>` : `<td>${ob[att]}</td>`;
      }
      text += '</tr>';
    }
    text += `</table><p class="my-3"><strong>Total de elementos encontrados en la API: ${contElementApi}</strong></p></div>`;
    $('#response').append(text);
  }

  /***Function: RequestToAPI***/
  function requestToAPI(a) {
    let request = $.ajax({
      url: a.url,
      type: a.method,
      dataType: 'json',
      success: function (json) {
        renderData(json.data);
      },
      error: function (xhr, status) {
        alert('Disculpe, hubo un problema para acceder a la API.');
      },
    });
  }

  /***MAIN***/
  let access = {
    url: 'https://www.feriadosapp.com/api/holidays.json',
    method: 'GET'
  }
  //Event Submit
  $('#form').submit(function (event) {
    event.preventDefault();
    requestToAPI(access)
  });
}); //End ready