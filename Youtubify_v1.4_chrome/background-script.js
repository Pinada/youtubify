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
  request.pattern ? setCookie(request.pattern, "none", "pattern") : "";

  /****** Advanced  ********/
  for (let i = 2; i < 38; i++) {
    request["Pcolor" + i]
      ? setCookie(
          request["Pcolor" + i],
          "rgba(227, 71, 53, 1)",
          "Pcolor" + i,
          request["pickr" + i]
        )
      : "";
  }

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
  function setCookie(request, defaultColor, cookie, pickr) {
    if (request) {
      if (request == defaultColor) {
        //Color being set for the first time
        browser.cookies
          .set({
            url: "https://www.youtube.com/",
            name: cookie,
            value: pickr ? pickr + "-" + defaultColor : defaultColor,
            expirationDate: new Date().getTime() / 1000 + 55555555
          })
          .then(
            sendResponse({
              color: pickr ? pickr + "-" + defaultColor : defaultColor
            })
          );
      } else if (request == "isSetting") {
        //Checkbox being set for the first time
        browser.cookies
          .set({
            url: "https://www.youtube.com/",
            name: cookie,
            value: "unch-" + defaultColor,
            expirationDate: new Date().getTime() / 1000 + 55555555
          })
          .then(sendResponse({ [cookie]: "unch;" + defaultColor }));
      } else if (request != "getCookie") {
        //Color comming from popup
        portFromCS.postMessage({
          [cookie]: pickr ? pickr + "-" + request : request
        });

        browser.cookies
          .set({
            url: "https://www.youtube.com/",
            name: cookie,
            value: pickr ? pickr + "-" + request : request,
            expirationDate: new Date().getTime() / 1000 + 55555555
          })
          .then(
            sendResponse({
              cookie: pickr ? pickr + "-" + request : request
            })
          );
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
  } else if (request.pattern) {
    return getCookie(request.pattern, "pattern");
  }
  for (let j = 0; j < 38; j++) {
    if (request["Pcolor" + j]) {
      return getCookie(request["Pcolor" + j], "Pcolor" + j);
    }
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
            if (request.includes("Pcolor")) {
              let resp = response.value.split("-")[1];
              window[cookie] = resp;
              return resp;
            } else {
              window[cookie] = response.value;
              return response.value;
            }
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
  window["url"] = y.url;
  // portFromCS.postMessage({ update: true });
}

browser.tabs.onActivated.addListener(handleActivated);

browser.tabs.onUpdated.addListener(handleUpdated);

browser.runtime.onMessage.addListener(sendColors);

google.payments.inapp.getSkuDetails({
  parameters: { env: "prod" },
  success: onLicenseUpdate,
  failure: onLicenseUpdateFail
});
function onLicenseUpdate(e) {
  console.log(e);
}

function onLicenseUpdateFail() {}
