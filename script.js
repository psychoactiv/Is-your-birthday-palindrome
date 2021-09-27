let input = document.querySelector(".input");
let btn = document.querySelector("#check");
let output = document.querySelector(".output");
let output_2 = document.querySelector(".output_2");

let checkFunc = false;

function reverseStr(str) {
  return str.split("").reverse().join("");
}
function isPalindrome(str) {
  let strReversed = reverseStr(str);
  return str === strReversed;
}
function convertDateToString(date) {
  let convertToString = {
    day: "",
    month: "",
    year: "",
  };
  if (date.day < 10) {
    convertToString.day = "0" + date.day;
  } else {
    convertToString.day = date.day.toString();
  }
  if (date.month < 10) {
    convertToString.month = "0" + date.month;
  } else {
    convertToString.month = date.month.toString();
  }
  convertToString.year = date.year.toString();
  return convertToString;
}

function arrangeDates(date) {
  let strDates = convertDateToString(date);

  let ddmmyyyy = strDates.day + strDates.month + strDates.year;
  var mmddyyyy = strDates.month + strDates.day + strDates.year;
  let yyyymmdd = strDates.year + strDates.month + strDates.day;
  let ddmmyy = strDates.day + strDates.month + strDates.year.slice(-2);
  let mmddyy = strDates.month + strDates.day + strDates.year.slice(-2);
  let yymmdd = strDates.year.slice(-2) + strDates.month + strDates.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function CheckPalindrome(date) {
  let arrangeDatesof = arrangeDates(date);
  let ans = false;
  for (let i = 0; i < arrangeDatesof.length; i++) {
    if (isPalindrome(arrangeDatesof[i])) {
      ans = true;
      break;
    }
  }
  return ans;
}

function leapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function dayManager(date) {
  if (checkFunc) {
    return date - 1;
  } else {
    return date + 1;
  }
}

function nextDay(date) {
  day = dayManager(date.day);
  month = date.month;
  year = date.year;

  const DaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (checkFunc) {
    if (month === 3) {
      if (leapYear(year)) {
        if (day < 1) {
          month--;
          day = 29;
        }
      } else {
        if (day < 1) {
          month--;
          day = 28;
        }
      }
    } else if (day < 1) {
      month--;
      day = DaysInMonth[month - 1];
    }
    if (month < 1) {
      month = 12;
      day = 31;
      year--;
    }
    return {
      day: day,
      month: month,
      year: year,
    };
  } else {
    if (month === 2) {
      if (leapYear(year)) {
        if (day > 29) {
          month++;
          day = 1;
        }
      } else {
        if (day > 28) {
          month++;
          day = 1;
        }
      }
    } else if (day > DaysInMonth[month - 1]) {
      month++;
      day = 1;
    }
    if (month > 12) {
      month = 1;
      day = 1;
      year++;
    }
    return {
      day: day,
      month: month,
      year: year,
    };
  }
}

function NextPalindromeday(date) {
  checkFunc = false;
  let days = 0;
  let nextDate = nextDay(date);

  while (1) {
    days++;
    let CheckPalindromefor = CheckPalindrome(nextDate);
    if (CheckPalindromefor) {
      break;
    }
    nextDate = nextDay(nextDate);
  }
  return [days, nextDate];
}

function previousPalindromeday(date) {
  checkFunc = true;
  let previousDays = 0;
  let nextDate_2 = nextDay(date);

  while (1) {
    previousDays++;
    let CheckPalindromefor = CheckPalindrome(nextDate_2);
    if (CheckPalindromefor) {
      break;
    }
    nextDate_2 = nextDay(nextDate_2);
  }
  return [previousDays, nextDate_2];
}

function sumUp(e) {
  let str = input.value;
  if (str !== "") {
    let useDate = str.split("-");
    let date = {
      day: Number(useDate[2]),
      month: Number(useDate[1]),
      year: Number(useDate[0]),
    };
    let isPalindrome = CheckPalindrome(date);

    if (isPalindrome) {
      winMsg();
    } else {
      lostMsg(date);
    }
  }
}

btn.addEventListener("click", sumUp);

function winMsg() {
  output.innerText = "congrats!! your birthday is a palindrome";
  output_2.style.display = "none";
}

function lostMsg(date) {
  output_2.style.display = "block";
  let [days, nextDate] = NextPalindromeday(date);
  let [previousDays, nextDate_2] = previousPalindromeday(date);
  let din = days > 1 ? `days` : `day`;
  let din_2 = previousDays > 1 ? `days` : `day`;
  output.innerText = `Palindrome next to your birthday is on ${nextDate.day}-${nextDate.month}-${nextDate.year}, sorry, you missed it by ${days} ${din}`;
  output_2.innerText = `Palindrome prior to your birthday is on ${nextDate_2.day}-${nextDate_2.month}-${nextDate_2.year}, sorry, you missed it by ${previousDays} ${din_2}`;
}
