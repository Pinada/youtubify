let portFromCS;

function connected(p) {
  portFromCS = p;
  // portFromCS.postMessage({ color1: window.color1 });
  portFromCS.onMessage.addListener(function(m) {
    console.log("In background script");
  });
}

browser.runtime.onConnect.addListener(connected);

// browser.browserAction.onClicked.addListener(function() {
//   portFromCS.postMessage({ greeting: "they clicked the button!" });
// });

function sendColors(request, sender, sendResponse) {
  request.color1
    ? setCookie(request.color1, "rgba(227, 43, 58, 1)", "color1")
    : "";
  request.color2
    ? setCookie(request.color2, "rgba(178, 178, 178, 1)", "color2")
    : "";
  request.color3
    ? setCookie(request.color3, "rgba(24, 25, 39, 1)", "color3")
    : "";
  request.color4
    ? setCookie(request.color4, "rgba(21, 21, 33, 1)", "color4")
    : "";
  request.color5
    ? setCookie(request.color5, "rgba(173, 173, 173, 1)", "color5")
    : "";
  request.color6 ? setCookie(request.color6, "white", "color6") : "";
  request.font ? setCookie(request.font, "Poppins", "font") : "";

  /****** Advanced  ********/

  request.heading ? setCookie(request.heading, "white", "heading") : "";
  request.videoTitle
    ? setCookie(request.videoTitle, "white", "videoTitle")
    : "";
  request.channNames
    ? setCookie(request.channNames, "white", "channNames")
    : "";
  request.numViews ? setCookie(request.numViews, "white", "numViews") : "";
  request.badges ? setCookie(request.badges, "white", "badges") : "";
  request.bar ? setCookie(request.bar, "white", "bar") : "";
  request.pattern ? setCookie(request.pattern, "1", "pattern") : "";
  request.leftBG ? setCookie(request.leftBG, "white", "leftBG") : "";
  request.leftHeading
    ? setCookie(request.leftHeading, "white", "leftHeading")
    : "";
  request.leftIcon ? setCookie(request.leftIcon, "white", "leftIcon") : "";
  request.leftText ? setCookie(request.leftText, "white", "leftText") : "";

  request.pickr2 ? setCookie(request.pickr2, "none", "pickr2") : "";
  request.pickr3 ? setCookie(request.pickr3, "none", "pickr3") : "";
  request.pickr4 ? setCookie(request.pickr4, "none", "pickr4") : "";
  request.pickr5 ? setCookie(request.pickr5, "none", "pickr5") : "";
  request.pickr6 ? setCookie(request.pickr6, "none", "pickr6") : "";
  request.pickr7 ? setCookie(request.pickr7, "none", "pickr7") : "";
  request.pickr8 ? setCookie(request.pickr8, "none", "pickr8") : "";
  request.pickr9 ? setCookie(request.pickr9, "none", "pickr9") : "";
  request.pickr10 ? setCookie(request.pickr10, "none", "pickr10") : "";
  request.pickr11 ? setCookie(request.pickr11, "none", "pickr11") : "";

  if (request.theme == "Original") {
    setCookie("rgba(227, 43, 58, 1)", "rgba(227, 43, 59, 1)", "color1");
    setCookie("rgba(178, 178, 178, 1)", "rgba(178, 178, 179, 1)", "color2");
    setCookie("rgba(24, 25, 39, 1)", "rgba(24, 25, 38, 1)", "color3");
    setCookie("rgba(21, 21, 33, 1)", "rgba(21, 21, 32, 1)", "color4");
    setCookie("rgba(173, 173, 173, 1)", "rgba(173, 173, 172, 1)", "color5");
    setCookie("rgba(253, 253, 253, 1)", "white", "color6");
    setCookie("'Poppins', sans-serif", "Poppins", "font");
  }

  if (request.theme == "Clean") {
    setCookie("#E81C3E", "rgba(227, 43, 58, 1)", "color1");
    setCookie("rgba(175, 175, 175, 1)", "rgba(178, 178, 178, 1)", "color2");
    setCookie("rgba(28, 28, 28, 1)", "rgba(24, 25, 39, 1)", "color3");
    setCookie("rgba(22, 22, 22, 1)", "rgba(21, 21, 33, 1)", "color4");
    setCookie("rgba(100, 100, 100, 1)", "rgba(173, 173, 173, 1)", "color5");
    setCookie("rgba(253, 253, 253, 1)", "white", "color6");
    setCookie("'Roboto', sans-serif", "Poppins", "font");
  }

  if (request.theme == "Alien Invasion") {
    setCookie("rgba(33, 232, 153, 1)", "rgba(227, 43, 58, 1)", "color1");
    setCookie("rgba(197, 208, 191, 1)", "rgba(178, 178, 178, 1)", "color2");
    setCookie("rgba(31, 41, 52, 1)", "rgba(24, 25, 39, 1)", "color3");
    setCookie("rgba(29, 35, 44, 1)", "rgba(21, 21, 33, 1)", "color4");
    setCookie("rgba(49, 218, 160, 1)", "rgba(173, 173, 173, 1)", "color5");
    setCookie("rgba(225, 255, 242, 1)", "white", "color6");
    setCookie("'Poppins', sans-serif", "Poppins", "font");
  }
  /**
   *
   * @param {*} request The color/value
   * @param {*} defaultColor The default color if there is no cookie
   * @param {*} cookie The cookie Name
   */
  function setCookie(request, defaultColor, cookie) {
    if (request) {
      if (request == defaultColor) {
        //Color being set for the first time
        browser.cookies
          .set({
            url: "https://www.youtube.com/",
            name: cookie,
            value: defaultColor,
            expirationDate: new Date().getTime() / 1000 + 99999999
          })
          .then(sendResponse({ color: defaultColor }));
      } else if (request == "isSetting") {
        //Checkbox being set for the first time
        browser.cookies
          .set({
            url: "https://www.youtube.com/",
            name: cookie,
            value: "unch",
            expirationDate: new Date().getTime() / 1000 + 99999999
          })
          .then(sendResponse({ cookie: request }));
      } else if (request != "getCookie") {
        //Color comming from popup
        portFromCS.postMessage({ [cookie]: request });

        browser.cookies
          .set({
            url: "https://www.youtube.com/",
            name: cookie,
            value: request,
            expirationDate: new Date().getTime() / 1000 + 99999999
          })
          .then(sendResponse({ cookie: request }));
      }
    }
  }

  if (request.color1) {
    return getCookie(request.color1, "color1");
  } else if (request.color2) {
    return getCookie(request.color2, "color2");
  } else if (request.color3) {
    return getCookie(request.color3, "color3");
  } else if (request.color4) {
    return getCookie(request.color4, "color4");
  } else if (request.color5) {
    return getCookie(request.color5, "color5");
  } else if (request.color6) {
    return getCookie(request.color6, "color6");
  } else if (request.font) {
    return getCookie(request.font, "font");
  } else if (request.heading) {
    return getCookie(request.heading, "heading");
  } else if (request.videoTitle) {
    return getCookie(request.videoTitle, "videoTitle");
  } else if (request.channNames) {
    return getCookie(request.channNames, "channNames");
  } else if (request.numViews) {
    return getCookie(request.numViews, "numViews");
  } else if (request.badges) {
    return getCookie(request.badges, "badges");
  } else if (request.bar) {
    return getCookie(request.bar, "bar");
  } else if (request.pattern) {
    return getCookie(request.pattern, "pattern");
  } else if (request.leftBG) {
    return getCookie(request.leftBG, "leftBG");
  } else if (request.leftHeading) {
    return getCookie(request.leftHeading, "leftHeading");
  } else if (request.leftIcon) {
    return getCookie(request.leftIcon, "leftIcon");
  } else if (request.leftText) {
    return getCookie(request.leftText, "leftText");
  }

  if (request.pickr2) {
    return getCookie(request.pickr2, "pickr2");
  } else if (request.pickr3) {
    return getCookie(request.pickr3, "pickr3");
  } else if (request.pickr4) {
    return getCookie(request.pickr4, "pickr4");
  } else if (request.pickr5) {
    return getCookie(request.pickr5, "pickr5");
  } else if (request.pickr6) {
    return getCookie(request.pickr6, "pickr6");
  } else if (request.pickr7) {
    return getCookie(request.pickr7, "pickr7");
  } else if (request.pickr8) {
    return getCookie(request.pickr8, "pickr8");
  } else if (request.pickr9) {
    return getCookie(request.pickr9, "pickr9");
  } else if (request.pickr10) {
    return getCookie(request.pickr10, "pickr10");
  } else if (request.pickr11) {
    return getCookie(request.pickr11, "pickr11");
  }

  /**
   *  Check if a cookie exist. If not, return undefined
   * @param {*} request
   * @param {*} cookie The name of the cookie
   */

  function getCookie(request, cookie) {
    if (request == "getCookie") {
      return browser.cookies
        .get({
          url: "https://www.youtube.com/",
          name: cookie
        })
        .then(function(response) {
          if (response == null) {
            return undefined;
          } else {
            window[cookie] = response.value;
            return response.value;
          }
        });
    }
  }
}
function onError(error) {
  console.error(`Error: ${error}`);
}

function handleActivated(changeInfo) {
  browser.tabs.getSelected(null, function(tab) {
    var url = tab.url;
    window["url"] = url;
  });

  // portFromCS.postMessage({ update: true });
}

function handleUpdated(tabInfo, x, y) {
  console.log(y);

  window["url"] = y.url;
  // portFromCS.postMessage({ update: true });
}

browser.tabs.onActivated.addListener(handleActivated);

browser.tabs.onUpdated.addListener(handleUpdated);

browser.runtime.onMessage.addListener(sendColors);
