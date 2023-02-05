import fetch from "node-fetch";
// const fetch = require("node-fetch");

// START USER INPUT
const toBookListt = [
  {
    location: "hervanta", // hervanta | city centre | kauppi
    date: "2023-02-12", // must be unique
    booking_details: [
      {
        start_time: 11, // must be unique
        court_nums: [4, 5, 6, 2, 3, 1], // place in prefer order
      },
      {
        start_time: 12,
        court_nums: [4, 5, 6, 2, 3, 1],
      },
    ],
  },
  // {
  //   location: "hervanta",
  //   date: "2022-09-12",
  //   booking_details: [
  //     {
  //       start_time: 11,
  //       court_nums: [4, 5],
  //     },
  //     {
  //       start_time: 12,
  //       court_nums: [5],
  //     },
  //   ],
  // },
];

const generalInfo = {
  cookie:
    "lb_selection=1541596802.47873.0000; intra_uuid=8729da81-6718-4acb-a9a3-f06f09733d88; _hjSessionUser_1666125=eyJpZCI6ImZhOGE3ZTg4LTg5ZmQtNTBlMy1iZDc5LWExNTE4MTY3ZDY4YiIsImNyZWF0ZWQiOjE2NDc1NDQzODQ0MjksImV4aXN0aW5nIjp0cnVlfQ==; at_check=true; AMCVS_4D6368F454EC41940A4C98A6%40AdobeOrg=1; _ga_XWBJWEFREF=GS1.1.1648308554.2.1.1648308584.0; AMCV_4D6368F454EC41940A4C98A6%40AdobeOrg=-2121179033%7CMCIDTS%7C19082%7CMCMID%7C28771363418298948114077891073556761231%7CMCAID%7CNONE%7CMCOPTOUT-1648669706s%7CNONE%7CMCAAMLH-1649267306%7C6%7CMCAAMB-1649267306%7Cj8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI%7CMCCIDH%7C1611803738%7CMCSYNCSOP%7C411-19083%7CvVersion%7C5.3.0; mbox=PC#3e651271e47b4302a4658e1fd0717a73.37_0#1711907311|session#63ab6ad8a2c045e08c3e45a2068d287d#1648664371; s_pers=%20c19%3Dknovel%2520pi%253Aviewer%253Akhtml%253Aother%253A15%2520viewer%2520page%7C1648666284047%3B%20v68%3D1648662512103%7C1648666284051%3B%20v8%3D1648664604728%7C1743272604728%3B%20v8_s%3DLess%2520than%25207%2520days%7C1648666404728%3B; s_sess=%20s_cpc%3D0%3B%20s_ppvl%3Dknovel%252520pi%25253Aviewer%25253Akhtml%25253Aother%25253A15%252520viewer%252520page%252C100%252C100%252C1289%252C2512%252C1289%252C2560%252C1440%252C1.5%252CP%3B%20s_cc%3Dtrue%3B%20s_sq%3D%3B%20e41%3D1%3B%20v60%3Dcreating%2520a%2520simple%2520visualization%3B%20s_ppv%3Dknovel%252520pi%25253Aviewer%25253Akhtml%25253Aother%25253A15%252520viewer%252520page%252C100%252C100%252C1289%252C2512%252C1289%252C2560%252C1440%252C1.5%252CP%3B; nmstat=405eb518-8e5f-b1bd-50b8-b22dfc70687a; _opensaml_req_https%3A%2F%2Fwww.tuni.fi%2Fsportuni%2Fomasivu%2F%3Fpage%3Dmyevents%3Blang%3Dfi=_4a499b09950ceec97dd6dccf14a9a839; tuni-cookie-agreed=2; _gcl_au=1.1.121740730.1668117214; msd365mkttr=yaTrs5OA8E1frzOnggHXZqu6b8ldicAXEUzhqfdh; msd365mkttrs=fJUwSSxX; giosg_gid_4932=pnsjo7w6z3ci7ubyl4aafkp7ui3f2var5wgwuascvqjaaeqm; giosg_chat_id_4932=zlbjpb54uj6ntc7t5maao7upqpszradxs7tylnmuzsqlffym; _hjSessionUser_1555571=eyJpZCI6Ijc4YzRjMGM4LTI5NDItNThiYi1hM2QxLTg4MzMxNTkwYWY2NCIsImNyZWF0ZWQiOjE2NjgxMTcyMTQxNDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_G52R8486BX=GS1.1.1674587350.4.1.1674587398.0.0.0; _ga_31SHEH5309=GS1.1.1675244519.307.1.1675244522.0.0.0; _ga=GA1.2.1324647022.1647096070; _gid=GA1.2.1360614311.1675277170; _gat_gtag_UA_129142342_1=1; _shibsession_77656270616765732e74756e692e666968747470733a2f2f776562686f74656c342e74756e692e66692f73686962626f6c657468=_ab3d4887a4009989c85357abddb5ec53",
  start_date: "2023-02-12", // yyyy-mm-dd
  end_date: "2023-02-12", // yyyy-mm-dd
  sportUniLocation: {
    hervanta: true,
    center: false,
    kauppi: false,
    otherLocations: false,
  },
};
// END USER INPUT

let startBooking = async (
  { cookie, start_date, end_date, sportUniLocation },
  toBookList,
  logger
) => {
  console.log("vao start booking");
  // fetch the calendar to see if there is available courts at that date
  let data;
  try {
    const url_get = `https://www.tuni.fi/sportuni/kalenteri/?lang=en&embedded=1&type=3&a1=${sportUniLocation.kauppi}&a2=${sportUniLocation.hervanta}&a3=${sportUniLocation.center}&a4=${sportUniLocation.otherLocations}&ajax=1&start=${start_date}&end=${end_date}&_=1647456934063`;
    console.log(url_get);
    data = await fetch(url_get, {
      mode: "no-cors",
    });
    // function a(response) {
    //   return response.text().then(function(text) {
    //     return text ? JSON.parse(text) : {}
    //   })
    // }
    data = await data.json();
    console.log(data);
  } catch (error) {
    console.log(error);
    // logger(error);
  }

  // Only start booking when the calendar have date available
  if (data != undefined && data.length > 1) {
    console.log("danh sach ton tai");
    let shifts = handleShiftList(data, toBookList, logger);

    return await handleBookCourt(shifts, cookie, logger);
  } else {
    console.log("khong tim thay danh sach.");
    // logger("khong tim thay danh sach.");
    return 0;
  }
};

let handleShiftList = (text, toBookList, logger) => {
  console.log("vao handle shift list");
  // log the available courts at the desired date found
  console.log("in ra danh sach vua fetch duoc");
  console.log(text);

  const shifts = text.filter((shift) => {
    // get the date, time, location from return data from server
    const date = shift["start"].substring(0, 10);
    const time = parseInt(shift["start"].substring(11, 13));
    let location = "";
    if (shift["title"].includes("hall\nKauppi")) {
      location = shift["title"].substring(17).toLowerCase();
    } else if (shift["title"].includes("court\nKauppi")) {
      location = shift["title"].substring(11).toLowerCase();
    } else {
      location = shift["title"].substring(10).toLowerCase();
    }

    return (
      shift["color"] == "#8724C1" &&
      toBookList.some((option) => {
        return (
          option["location"] == location &&
          option["date"] == date &&
          option["booking_details"].some((desire_shift) => {
            return desire_shift["start_time"] == time;
          })
        );
      })
    );
  });
  console.log("Danh sach sau khi da filter");
  console.log(shifts);

  // format lai danh sach theo standard
  return shifts.map((shift) => {
    // get the date, time, location from return data from server
    const date = shift["start"].substring(0, 10);
    const start_time = parseInt(shift["start"].substring(11, 13));
    let location = "";
    if (shift["title"].includes("hall\nKauppi")) {
      location = shift["title"].substring(17).toLowerCase();
    } else if (shift["title"].includes("court\nKauppi")) {
      location = shift["title"].substring(11).toLowerCase();
    } else {
      location = shift["title"].substring(10).toLowerCase();
    }
    const toBookListItem = toBookList.find((option) => {
      return option.location == location && option.date == date;
    });
    const booking_detail = toBookListItem.booking_details.find(
      (desire_shift) => {
        return desire_shift.start_time == start_time;
      }
    );
    let court_nums = [];
    let total_courts = 0;

    // console.log(toBookListItem)
    if (toBookListItem != undefined) {
      court_nums = booking_detail.court_nums;
      total_courts = toBookListItem.total_courts;
    }

    return {
      location,
      date,
      start_time,
      court_nums,
      id: shift.id,
    };
  });
};

let handleBookCourt = async (shifts, cookie, logger) => {
  console.log("vao handle book court");
  let bookCount = 0;
  console.log("danh sach sau khi da format lai de book");
  console.log(shifts);

  for (let i = 0; i < shifts.length; i++) {
    const shift = shifts[i];
    const url_event = `https://www.tuni.fi/sportuni/kalenteri/?showevent=1&lang=en&embedded=1&id=${shift.id}`;

    // Get the available court depending on the shift id
    let data = await fetch(url_event);
    data = await data.text();
    const courts = findCourt(data, shift);
    // In ra danh sach nhung courts tuong ung voi cac shifts
    console.log(courts);

    bookCount = await bookCourt(courts, cookie, bookCount);
  }
  return bookCount;
};

let findCourt = (text, { court_nums, location, date, start_time }) => {
  return court_nums.map((desire_court_num) => {
    const regex = new RegExp(`&court=${desire_court_num}`, "g");
    const search_point = text.search(regex);
    const raw_id_length = 9;
    const court_id_raw = text.slice(search_point - raw_id_length, search_point);
    const court_id = search_point == -1 ? -1 : court_id_raw.substring(3);
    return {
      location,
      date,
      start_time,
      court_num: desire_court_num,
      court_id,
    };
  });
};

let bookCourt = async (courts, cookie, succeedBookCount) => {
  for (let i = 0; i < courts.length; i++) {
    const court = courts[i];
    if (court.court_id == -1) {
      console.log(
        `Không book được sân ${court.court_num}! ngày ${court.date} lúc ${court.start_time} giờ vì sân đã bị book trước hoặc không tồn tại!`
      );
      continue;
    }

    const url_book = `https://www.tuni.fi/sportuni/omasivu/?lang=en&action=badminton&id=${court.court_id}&court=${court.court_num}`;

    let data = await fetch(url_book, {
      headers: {
        cookie: cookie,
      },
    });
    data = await data.text();
    console.log(data);
    const regex = new RegExp(`Thank you`, "g");
    const pos_of_success = data.search(regex);

    if (pos_of_success < 0) {
      // book failed
      const regex2 = RegExp("Login?", "g");
      if (regex2.test(data)) {
        console.log(
          `Book không được sân ${court.court_num}! ngày ${court.date} lúc ${court.start_time} giờ vì cookie không hợp lệ hoặc hết hạn!`
        );
      } else {
        console.log(
          `Book không được sân ${court.court_num}! ngày ${court.date} lúc ${court.start_time} giờ`
        );
      }
    } else {
      // book success
      succeedBookCount++;

      console.log(
        `Book sân ${court.court_num} ngày ${court.date} lúc ${court.start_time} giờ thành công!`
      );
      if (succeedBookCount >= 3) {
        break;
      }
    }
  }

  return succeedBookCount;
};

async function bookTillFull(toBookList, generalInfo) {
  // loop until there is available list of bookings
  let bookCount = 0;
  do {
    bookCount = await startBooking(generalInfo, toBookList);
  } while (bookCount < 3);
  console.log("bookTillFull " + bookCount);
  console.log("ĐÃ BOOK ĐỦ HẾT SÂN!");
}

// module.exports = startBooking;

bookTillFull(toBookListt, generalInfo);
// startBooking(generalInfo, toBookListt);
