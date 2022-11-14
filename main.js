import './style.css'
import { merge } from './merge.js'
import {default as apiData} from  './assets/a22.json';

const rowsPerPage = 10;
let page = 1;
let arr1 = apiData;

document.querySelector('#app').innerHTML = `
  <div id="container">
    <div class='center py-6'>
      <input type='button' value='Add new data' id='id_new_data' class='outline hover: cursor-pointer' />
      <input id="file_input" type="file" class='hidden' accept=".tsv" />
    </div>
    <table class='table-fixed w-full text-center border border-slate-400' id='id_table'>
      <thead class='bg-gray-400'>
        <tr class='border border-slate-400'>
          <th>Image</th>
          <th>Name</th>
          <th>Theme</th>
          <th>Type</th>
          <th>Cost</th>
          <th class='py-3'>Estimated Customers</th>
          <th>Maintenance Time</th>
          <th>Workers Required</th>
        </tr>
      </thead>
      <tbody>
        ${
          arr1.slice(0, page * rowsPerPage) .map(row => {
            return `
              <tr class='border border-slate-400'>
                <td><img class="img" src="/img.jpg" /></td>
                <td>${row.name}</td>
                <td>${row.theme}</td>
                <td>${row.type}</td>
                <td>${row.est_cust}</td>
                <td>${row.cost}</td>
                <td>${row.maintenance_time}</td>
                <td>${row.workers}</td>
              </tr>
            `
          }).join('')
        }
      </tbody>
    </table>
    ${
      (arr1.length > rowsPerPage) && `
      <div class='center py-6'>
        <input type='button' value='Load More' id='id_load_more' class='outline px-10 py-1 hover: cursor-pointer' />
      </div>`
    }
  </div>
`;

/* It occurs CORS error, so it must  be in server.

const url = "http://aukai.dev/test-files/a22.json";
fetch(url)
.then(res => res.json())
.then(out => arr1 = JSON.parse(out);
.catch(err => { throw err });

*/

const loadMore = () => {
  let appendArr = arr1.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  if(appendArr.length == 0) {
    document.getElementById('id_load_more').style.visibility = 'hidden';
    window.removeEventListener("scroll", handleInfiniteScroll);
    return;
  }
  const table = document.getElementById('id_table');
  appendArr.map(data => {
    let new_row = table.rows[1].cloneNode(true);
    new_row.cells[0].innerHTML = `<img class="img" src="/img.jpg" />`
    new_row.cells[1].innerHTML = data.name;
    new_row.cells[2].innerHTML = data.theme;
    new_row.cells[3].innerHTML = data.type;
    new_row.cells[4].innerHTML = data.est_cust;
    new_row.cells[5].innerHTML = data.cost;
    new_row.cells[5].innerHTML = data.maintenance_time;
    new_row.cells[5].innerHTML = data.workers;
    table.appendChild(new_row);
  });

  page ++;
}

document.getElementById('id_new_data').addEventListener('click', () => {
  document.getElementById('file_input').click();
});

document.getElementById('id_load_more').addEventListener('click', () => {
  loadMore();
});

document.getElementById('file_input').addEventListener('change', (e) => {
  if (!e.target.value.length) {
    alert('please select exact file');
    return
  }

  let reader = new FileReader();
  reader.onload = setupFileContent;
  reader.readAsText(e.target.files[0]);
});

const setupFileContent = (event) => {
  const content = event.target.result;
  var jsonData = [];
  var headers = [];
  var rows = content.split("\n");
  for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].split("\t");
      var rowData = {};
      for(var j=0;j<cells.length;j++){
          if(i==0){
              var headerName = cells[j].trim();
              headers.push(headerName);
          }else{
              var key = headers[j];
              if(key){
                  rowData[key] = cells[j].trim();
              }
          }
      }
      //skip the first row (header) data
      if(i!=0){
          jsonData.push(rowData);
      }
  }
  arr1 = merge(arr1, jsonData);
  console.log("merged data:", arr1);
  alert('Successfully added');
}

const handleInfiniteScroll = () => {
  const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
  if (endOfPage) {
    loadMore();
  }
};

window.addEventListener("scroll", handleInfiniteScroll);
