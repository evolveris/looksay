function lookSay(str) {  
    const arr = str.split("");
    let numberOfOccurences = 1;
      
    let ans = "";
      
    for (let i = 1; i < arr.length; i++) {
      const currentElem = arr[i];
      const prevElem = arr[i - 1];
      if (currentElem !== prevElem) {
        ans += numberOfOccurences;
        ans += prevElem;
          numberOfOccurences = 1;
      } else {
          numberOfOccurences += 1;
      }
    }
    
    ans += numberOfOccurences;
    ans += arr[arr.length - 1];
    
    return ans;
  }

  export default lookSay;