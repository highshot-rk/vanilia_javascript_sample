export function merge(data1, data2) {
  // data1 and data2 is given as array, so I think it is not need specially.
  // ** In main.js, arr1 and arr2 is setted as array with original code.
  // ** If data1 is array and data2 is text, this is needed. But it is implemented in main.js
  const start = Date.now();
  let data = [];

  if ((!data1 || data1.length == 0) || (!data2 || data2.length == 0) ) {
    console.error('No data provided');
  }

  //your code - start


  data = [...new Set(data1.concat(data2))];

  //your code - end

  const duration = Date.now() - start;
  console.log("Merge duration: ", duration);
  return data;
}
