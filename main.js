// If you get stuck go to axios documentations
// https://github.com/axios/axios

// Gets our div for appending, our input so we can get the value, and our form for the axios post request
const div = document.getElementById("main");
const form = document.querySelector("form");
let symbol = "";
// const createLi = (user) => {
//   const li = document.createElement("li");
//   // add user details to `li`
//   li.textContent = `${user.name}`;
//   return li;
// };
// const appendToDOM = (user) => {
//   div.appendChild(createLi(user));
// };

//let stock = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&interval=5min&apikey=5QVBOICWD044F9EP`;

const getStockInfo = (data) => {
  // send our post request, then append the response to the List
  axios
    .get(data)
    .then((res) => {
      let arr = [];
      (() => {
        let i = 0;
        for (let [k, v] of Object.entries(res.data["Time Series (Daily)"])) {
          if (i === 2) break;

          for (let [k2, v2] of Object.entries(v)) {
            if (k2.includes("close")) {
              arr.push(v2);
            }
          }
          i++;
        }
      })();
      
      // console.log(arr[0] - arr[1]);
      let max = (arr[0] - arr[1]).toFixed(2);
      if (max > 0) {
        $("#status").text(" stock increased by");
      } else if (max < 0) {
        $("#status").text(" stock decreased by");
      } else {
        $("#status").text(" stock didn't change");
      }
      $("#companyName").text(symbol);
      $("#StockValue").text(max);
    })
    .catch((error) => {
      console.log(error, "Error");
    });
};

// Event listener for our form, will listen for submit
const formEvent = form.addEventListener("submit", (event) => {
  const input = document.getElementById("name");
  // prevents the axios call from firing right away
  event.preventDefault();
  symbol = input.value;
  // console.log(symbol);
  // An object of our data, you can access the value of an input by typing .value, this axios post requests require an object
  const key = "1QAOUFN3D3K596VH";
  const stock = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&interval=5min&apikey=${key}`;
  getStockInfo(stock);
});










let img = $('img')
let input = $('#name')
let p = $('p')
let form1 = $('form')
let btn = $('button')
console.log(img.attr('src'))
var utc = new Date().toJSON().slice(0, 8).replace(/-/g, '/');
let day = new Date().toJSON().slice(8, 10).replace(/-/g, '/');
day = parseInt(day)
day1 = day - 1
day2 = day - 2
day1 = day1.toString();
day2 = day2.toString();
console.log(utc + day1)
console.log(utc + day2)
let changePic = (logo) => {
    console.log('klklklklklk8888')
    let url = 'https://cloud.iexapis.com/stable/stock/'+logo+'/logo?token=pk_c9fd7a5c995f4f9b8cd5e75dd5f43356'
    //let url = 'https://cloud.iexapis.com/stable/stock/TSLA/logo?token=pk_c9fd7a5c995f4f9b8cd5e75dd5f43356'
    axios
        .get(url)
        .then(response => {
            console.log(response,'uuuuuuuu')
            console.log('dddddddd', response.data.url)
            img = img.attr('src', response.data.url)
        })
        .catch(error => {
            console.log('8888',error)
        })
}

form1.on('submit', (event) => {
    event.preventDefault()
    //alert(p[0].value)
    changePic(input[0].value)
    //getText(input[0].value)
    // alert(input[0].value)
})






















