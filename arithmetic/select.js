function select(arr) {
  for(let i = 0; i < arr.length ;i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
}

let arr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
select(arr);
console.log(arr);
