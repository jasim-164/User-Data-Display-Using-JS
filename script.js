let userData = [];
const tableBody = document.querySelector("#table_body");
const scoreHeader = document.querySelector("#score_column");
let scoreAscending = false;
let nameAscending = false;
let countryAscending = false;
let rankingAscending = false;

const getUserRankingsAsync = async (url) => {
  // this is aync await syntax for fetching data.
  const response = await fetch(url);
  const userData = await response.json();

  return userData;
};

// Get references to the search field and table
const searchField = document.getElementById("searchField");
const table = document.getElementById("rankingTable");
const tableRows = table.getElementsByTagName("tr");

// Function to perform search filtering
const filterTable = () => {
  const filter = searchField.value.toLowerCase();
  for (let i = 1; i < tableRows.length; i++) {
    const row = tableRows[i];
    const rowData = row.getElementsByTagName("td");
    let match = false;
    for (let j = 0; j < rowData.length; j++) {
      const cell = rowData[j];
      if (cell.innerText.toLowerCase().indexOf(filter) > -1) {
        match = true;
        break;
      }
    }
    row.style.display = match ? "" : "none";
  }
};

// const fetchData = (url) => {
//   return fetch(url).then(res => res.json()).then(res => res)
// }

// it will be passed inside filter function which is a higher order function
// and its an callback function.
const filterValues = (item) => item.score > 50;

const sortUserScores = () => {
  const tempData = [...userData];
  tempData.sort((a, b) =>
    scoreAscending ? a.score - b.score : b.score - a.score
  );
  const filteredData = tempData.filter(filterValues);
  const newData = tempData.map((item) => ({
    name: item.name,
    score: item.score,
  }));
  scoreAscending = !scoreAscending;
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
  console.log(tempData, newData);
  renderTableRows(filteredData);
};

// sorting using name
const sortUserName = () => {
  const tempData = [...userData];

  tempData.sort(function (a, b) {
    //Ascending order
    if (!nameAscending) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }
    //Descending order
    else {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    }
  });

  console.log("hey jasim");
  //tempData.sort((a, b) => scoreAscending ? a.name - b.id : b.id - a.id);
  //const filteredData = tempData.filter(filterValues);
  const newData = tempData.map((item) => ({
    name: item.name,
    score: item.score,
  }));
  nameAscending = !nameAscending;
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
  console.log(tempData, newData);
  renderTableRows(tempData);
};

// sorting using country
const sortUserCountry = () => {
  const tempData = [...userData];

  tempData.sort(function (a, b) {
    //Ascending order
    if (!countryAscending) {
      if (a.country < b.country) {
        return -1;
      }
      if (a.country > b.country) {
        return 1;
      }
      return 0;
    }
    //Descending order
    else {
      if (a.country > b.country) {
        return -1;
      }
      if (a.country < b.country) {
        return 1;
      }
      return 0;
    }
  });

  console.log("hey jasim");
  //tempData.sort((a, b) => scoreAscending ? a.name - b.id : b.id - a.id);
  //const filteredData = tempData.filter(filterValues);
  const newData = tempData.map((item) => ({
    name: item.name,
    score: item.score,
  }));
  countryAscending = !countryAscending;
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
  console.log(tempData, newData);
  renderTableRows(tempData);
};

// Adding event handlers to an element
// scoreHeader.addEventListener('click', sortUserScores)

const renderTableRows = (data) => {
  data?.forEach((user, i) => {
    const tRow = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    td1.textContent = i + 1;
    td1.classList.add("p-3", `${i % 2 === 0 ? "bg-white" : "bg-sky-50"}`);
    td2.textContent = user.name;
    td2.classList.add("p-3", `${i % 2 === 0 ? "bg-white" : "bg-sky-50"}`);
    td3.textContent = user.country;
    td3.classList.add("p-3", `${i % 2 === 0 ? "bg-white" : "bg-sky-50"}`);
    td4.textContent = user.score;
    td4.classList.add("p-3", `${i % 2 === 0 ? "bg-white" : "bg-sky-50"}`);
    tRow.appendChild(td1);
    tRow.appendChild(td2);
    tRow.appendChild(td3);
    tRow.appendChild(td4);
    tableBody.appendChild(tRow);
  });
};

const main = async () => {
  userData = await getUserRankingsAsync(
    "https://64743e827de100807b1a84ab.mockapi.io/api/v1/leaderboard/users"
  );
  // fetchData(
  //   'https://64743e827de100807b1a84ab.mockapi.io/api/v1/leaderboard/users'
  // ).then(data => renderTableRows(data));
  renderTableRows(userData);
};

main();




