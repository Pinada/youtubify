document.documentElement.setAttribute(
  "style",
  "background-color:#17171c !important;background-image:url('" +
    browser.runtime.getURL("/images/logoLoading.png") +
    "');background-size:5%;position:relative;top:0px;left:0px;z-index:99999;font-size:10px;font-family:Roboto;visibility:hidden"
);

/*
  Colors
*/
var accentGreen = "#32c3af";
var accentBlue = "#523cfe";
var current;
var timer;
var timer1;
var noShadow =
  "	-webkit-box-shadow: none;-moz-box-shadow: none;box-shadow: none;";

document.addEventListener("DOMContentLoaded", function() {
  getCookie();
  /**
   * Get a cookie. If there is none, create a default one
   * @param {*} cookie the name of the cookie you are trying to get
   * @param {*} defaultColor The default value if there is none
   */
  function awaitCookie(cookie, defaultColor) {
    let sending = browser.runtime.sendMessage({
      [cookie]: "getCookie"
    });
    return sending.then(response => {
      if (response) {
        return response;
      } else {
        let sending1 = browser.runtime.sendMessage({
          [cookie]: defaultColor
        });
        return sending1.then(response => {
          return response[cookie];
        });
      }
    });
  }

  setFont(
    "SourceCodePro",
    "https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap"
  );
  setFont(
    "Poppins",
    "https://fonts.googleapis.com/css?family=Poppins&display=swap"
  );

  setFont(
    "Roboto",
    "https://fonts.googleapis.com/css?family=Roboto&display=swap"
  );

  function setFont(id, link) {
    if (!document.getElementById(id)) {
      var link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = link;
      document.head.appendChild(link);
    }
  }

  let myPort = browser.runtime.connect({ name: "port-from-cs" });
  myPort.postMessage({ greeting: "init connection" });
  myPort.onMessage.addListener(function(m) {
    m.color1 ? (window.accentColor = m.color1) : "";
    m.color2 ? (window.underTextColor = m.color2) : "";
    m.color4 ? (window.lightBlue = m.color4) : "";
    m.color3 ? (window.darkBlue = m.color3) : "";
    m.color5 ? (window.iconColor = m.color5) : "";
    m.color6 ? (window.mainText = m.color6) : "";
    m.font ? (window.font = m.font) : "";

    m.heading ? (window.heading = m.heading) : "";
    m.videoTitle ? (window.videoTitle = m.videoTitle) : "";
    getCookie();
    clearTimeout(timer1);

    timer1 = setTimeout(() => {
      replacePop();
      replaceMenu();
      replaceAll();

      if (window.isHeading == "ch") {
        replaceHeading();
      }
      if (window.isVideoTitle == "ch") {
        replaceVideoTitle();
      }
      if (window.isChannNames == "ch") {
        replaceChannNames();
      }
      if (window.isNumViews == "ch") {
        replaceViews();
      }
      if (window.isBadges == "ch") {
        replaceBadges();
      }
      if (window.isBar == "ch") {
        replaceBar();
      }
      if (window.isLeftBG == "ch") {
        replaceLeftBG();
      }
      if (window.isLeftHeading == "ch") {
        replaceLeftHeading();
      }
      if (window.isLeftIcon == "ch") {
        replaceLeftIcon();
      }
      if (window.isLeftText == "ch") {
        replaceLeftText();
      }
    }, 300);
  });

  observerPop = new MutationObserver(function() {
    replacePop();
  });
  function addObserverPopup() {
    let popup = document.getElementsByTagName("ytd-popup-container")[0];
    if (!popup) {
      window.setTimeout(addObserverPopup, 10);
      return;
    }

    observerPop.observe(popup, {
      attributes: false,
      childList: true,
      subtree: true
    });
  }

  addObserverPopup();
  observerPrimary = new MutationObserver(function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      replaceAll();

      if (window.isHeading == "ch") {
        replaceHeading();
      }
      if (window.isVideoTitle == "ch") {
        replaceVideoTitle();
      }
      if (window.isChannNames == "ch") {
        replaceChannNames();
      }
      if (window.isNumViews == "ch") {
        replaceViews();
      }
      if (window.isBadges == "ch") {
        replaceBadges();
      }
      if (window.isBar == "ch") {
        replaceBar();
      }
      if (window.isLeftHeading == "ch") {
        replaceLeftHeading();
      }
      if (window.isLeftIcon == "ch") {
        replaceLeftIcon();
      }
      if (window.isLeftText == "ch") {
        replaceLeftText();
      }
    }, 100);
  });
  function addObserverPrimary() {
    let primary = document.getElementsByTagName("ytd-app")[0];
    if (!primary) {
      window.setTimeout(addObserverPrimary, 1);
      return;
    }
    observerPrimary.observe(primary, {
      attributes: false,
      childList: true,
      subtree: true
    });
  }

  addObserverPrimary();

  observerMenu = new MutationObserver(function() {
    replaceMenu();
    if (window.isLeftBG == "ch") {
      replaceLeftBG();
    }
  });
  function addObserverMenu() {
    let menu = document.getElementById("content");
    if (!menu) {
      window.setTimeout(addObserverMenu, 1);
      return;
    }
    observerMenu.observe(menu, {
      attributes: false,
      childList: true,
      subtree: true
    });
  }
  addObserverMenu();

  replaceAll();

  /*
   *
   *
   * Take all cookies
   *
   *
   */
  async function getCookie() {
    window.isHeading = await awaitCookie("pickr2", "isSetting");
    await awaitCookie("heading", "white");
    if (window.isHeading == "ch") {
      window.heading = await awaitCookie("heading", "white");
    } else {
      window.heading = "dummy";
    }
    window.isVideoTitle = await awaitCookie("pickr3", "isSetting");
    await awaitCookie("videoTitle", "white");
    if (window.isVideoTitle == "ch") {
      window.videoTitle = await awaitCookie("videoTitle", "white");
    } else {
      window.videoTitle = "dummy";
    }

    window.isChannNames = await awaitCookie("pickr4", "isSetting");
    await awaitCookie("channNames", "white");
    if (window.isChannNames == "ch") {
      window.channNames = await awaitCookie("channNames", "white");
    } else {
      window.channNames = "dummy";
    }

    window.isNumViews = await awaitCookie("pickr5", "isSetting");
    await awaitCookie("numViews", "white");
    if (window.isNumViews == "ch") {
      window.numViews = await awaitCookie("numViews", "white");
    } else {
      window.numViews = "dummy";
    }

    window.isBadges = await awaitCookie("pickr6", "isSetting");
    await awaitCookie("badges", "white");
    if (window.isBadges == "ch") {
      window.badges = await awaitCookie("badges", "white");
    } else {
      window.badges = "dummy";
    }

    window.isBar = await awaitCookie("pickr7", "isSetting");
    await awaitCookie("bar", "white");
    if (window.isBar == "ch") {
      window.bar = await awaitCookie("bar", "white");
    } else {
      window.bar = "dummy";
    }

    window.isLeftBG = await awaitCookie("pickr8", "isSetting");
    await awaitCookie("leftBG", "white");
    if (window.isLeftBG == "ch") {
      window.leftBG = await awaitCookie("leftBG", "white");
    } else {
      window.leftBG = "dummy";
    }

    window.isLeftHeading = await awaitCookie("pickr9", "isSetting");
    await awaitCookie("leftHeading", "white");
    if (window.isLeftHeading == "ch") {
      window.leftHeading = await awaitCookie("leftHeading", "white");
    } else {
      window.leftHeading = "dummy";
    }

    window.isLeftIcon = await awaitCookie("pickr10", "isSetting");
    await awaitCookie("leftIcon", "white");
    if (window.isLeftIcon == "ch") {
      window.leftIcon = await awaitCookie("leftIcon", "white");
    } else {
      window.leftIcon = "dummy";
    }

    window.isLeftText = await awaitCookie("pickr11", "isSetting");
    await awaitCookie("leftText", "white");
    if (window.isLeftText == "ch") {
      window.leftText = await awaitCookie("leftText", "white");
    } else {
      window.leftText = "dummy";
    }

    window.accentColor = await awaitCookie("color1", "rgba(227, 43, 58, 1)");

    window.pattern = await awaitCookie("pattern", "0");

    window.underTextColor = await awaitCookie(
      "color2",
      "rgba(178, 178, 178, 1)"
    );

    window.mainText = await awaitCookie("color6", "white", null);
    window.lightBlue = await awaitCookie("color4", "rgba(21, 21, 33, 1)");
    window.darkBlue = await awaitCookie("color3", "rgba(24, 25, 39, 1)");
    window.iconColor = await awaitCookie("color5", "rgba(173, 173, 173, 1)");

    window.font = await awaitCookie("font", "Poppins", null);

    switch (window.font) {
      case "'Poppins', sans-serif":
        window.font = "'Poppins', sans-serif";
        break;
      case "'Source Code Pro', monospace":
        window.font = "'Source Code Pro', monospace";
        break;
      case "'Roboto', sans-serif":
        window.font = "'Roboto', sans-serif";
        break;
    }

    window.border_inside =
      "-webkit-box-shadow: inset 2px 0px  0px  0px " +
      window.accentColor +
      " ;-moz-box-shadow: inset 2px 0px  0px  0px " +
      window.accentColor +
      ";box-shadow: inset 2px 0px  0px 0px " +
      window.accentColor +
      ";";
  }

  function replaceCSS(css, prop, value, condition1, condition2) {
    if (css == "ytd-mini-guide-renderer") {
      selector = document
        .getElementsByTagName("ytd-mini-guide-renderer")[0]
        .getElementsByClassName(css);
    } else if (css == "ytd-app") {
      selector = document.getElementsByClassName(css);
    } else if (
      css == "ytd-popup-container" ||
      css == "ytd-multi-page-menu-renderer" ||
      css == "yt-icon" ||
      css == "guide-icon style-scope ytd-guide-entry-renderer" ||
      css == "yt-simple-endpoint style-scope ytd-compact-link-renderer" ||
      css == "search-icon-legacy" ||
      css == "ytd-searchbox" ||
      css == "ytd-page-manager" ||
      css == "paper-tooltip" ||
      css == "style-scope" ||
      css == "style-scope ytd-topbar-logo-renderer" ||
      css == "yt-simple-endpoint style-scope yt-formatted-string"
    ) {
      selector = document.getElementsByClassName(css);
    } else if (css == "style-scope ytd-app" || css == "ytd-guide-renderer") {
      selector = document
        .getElementById("contentContainer")
        .getElementsByClassName(css);
    } else if (css == "style-scope ytd-masthead") {
      selector = document
        .getElementById("masthead")
        .getElementsByClassName(css);
    } else {
      selector = document.getElementsByClassName(css);
    }

    let length = selector.length;

    for (let i = 0; i < length; i++) {
      if (condition1) {
        if (selector[i][condition1[0]] == condition1[1]) {
          selector[i].style[condition1[2]] = condition1[3];
        }
      }
      if (condition2) {
        if (selector[i][condition2[0]] == condition2[1]) {
          selector[i].style[condition2[2]] = condition2[3];
        }
      }

      if (prop != null && value != null) {
        if (
          css == "yt-simple-endpoint style-scope yt-formatted-string" &&
          condition1 == "2"
        ) {
          if (
            selector[i].parentElement.classList.contains("ytd-channel-name")
          ) {
            selector[i].style[prop] = value;
          } else {
          }
        } else if (
          css == "ytd-video-primary-info-renderer" &&
          condition1 == "2"
        ) {
          if (
            selector[i].parentElement.id == "date" ||
            selector[i].id == "dot"
          ) {
          } else {
            selector[i].style[prop] = value;
          }
        } else {
          selector[i].style[prop] = value;
        }
      }
    }
  }

  function replaceBar() {
    replaceCSS(
      "ytd-thumbnail-overlay-resume-playback-renderer",
      "backgroundColor",
      window.bar
    );

    replaceCSS(
      "ytp-play-progress ytp-swatch-background-color",
      "backgroundColor",
      window.bar
    );

    replaceCSS("ytp-swatch-background-color", "backgroundColor", window.bar);
  }

  function replaceLeftHeading() {
    replaceCSS(
      "style-scope ytd-guide-section-renderer",
      null,
      null,
      ["id", "guide-section-title", "color", window.leftHeading],
      null
    );
  }
  function replaceLeftIcon() {
    replaceCSS(
      "guide-icon style-scope ytd-mini-guide-entry-renderer",
      "color",
      window.leftIcon
    );
    replaceCSS(
      "guide-icon style-scope ytd-guide-entry-renderer",
      "color",
      window.leftIcon
    );
  }
  function replaceLeftText() {
    replaceCSS(
      "title style-scope ytd-guide-entry-renderer",
      "color",
      window.leftText
    );

    replaceCSS(
      "title style-scope ytd-mini-guide-entry-renderer",
      "color",
      window.leftText
    );
  }
  function replaceLeftBG() {
    replaceCSS(
      "ytd-guide-renderer",
      null,
      null,
      [
        "tagName",
        "YTD-GUIDE-SECTION-RENDERER",
        "backgroundColor",
        window.leftBG
      ],
      null
    );

    replaceCSS(
      "style-scope ytd-app",
      null,
      null,
      ["id", "header", "backgroundColor", window.leftBG],
      null
    );

    replaceCSS(
      "ytd-guide-renderer",
      null,
      null,
      ["id", "footer", "backgroundColor", window.leftBG],
      null
    );
    replaceCSS(
      "ytd-app",
      null,
      null,
      ["tagName", "YTD-MINI-GUIDE-RENDERER", "backgroundColor", window.leftBG],
      null
    );
    replaceCSS("ytd-mini-guide-renderer", "backgroundColor", window.leftBG);
  }

  function replaceMenu() {
    replaceCSS(
      "ytd-guide-renderer",
      null,
      null,
      [
        "tagName",
        "YTD-GUIDE-SECTION-RENDERER",
        "backgroundColor",
        window.darkBlue
      ],
      null
    );

    replaceCSS(
      "style-scope ytd-app",
      null,
      null,
      ["id", "header", "backgroundColor", window.darkBlue],
      null
    );

    replaceCSS(
      "ytd-guide-renderer",
      null,
      null,
      ["id", "footer", "backgroundColor", window.darkBlue],
      null
    );

    replaceCSS(
      "ytd-app",
      null,
      null,
      [
        "tagName",
        "YTD-MINI-GUIDE-RENDERER",
        "backgroundColor",
        window.darkBlue
      ],
      null
    );
    replaceCSS("ytd-mini-guide-renderer", "backgroundColor", window.darkBlue);
  }
  function replacePop() {
    replaceCSS("style-scope", "fontFamily", window.font);
    replaceCSS("ytd-popup-container", "border", "none");
    replaceCSS("ytd-popup-container", "backgroundColor", window.lightBlue);
    replaceCSS(
      "ytd-multi-page-menu-renderer",
      "backgroundColor",
      window.darkBlue
    );
    // replaceCSS("ytd-multi-page-menu-renderer", "borderColor", window.iconColor);

    // replaceCSS(
    //   "style-scope ytd-compact-link-renderer",
    //   "backgroundColor",
    //   window.darkBlue
    // );

    replaceCSS(
      "yt-simple-endpoint style-scope yt-formatted-string",
      "color",
      window.accentColor,
      "1",
      null
    );

    replaceCSS("deemphasize", "color", window.underTextColor);
  }

  function replaceBadges() {
    // replaceCSS("yt-icon", "color", window.badges);
    replaceCSS("ytd-badge-supported-renderer", "color", window.badges);
    replaceCSS("ytd-badge-supported-renderer", "borderColor", window.badges);
  }

  function replaceVideoTitle() {
    replaceCSS(
      "ytd-playlist-video-renderer",
      null,
      null,
      ["id", "video-title", "color", window.videoTitle],
      null
    );

    replaceCSS(
      "yt-simple-endpoint",
      null,
      null,
      ["id", "video-title", "color", window.videoTitle],
      null
    );

    replaceCSS(
      "ytd-video-primary-info-renderer",
      "color",
      window.videoTitle,
      "2",
      null
    );

    replaceCSS(
      "style-scope ytd-compact-video-renderer",
      null,
      null,
      ["id", "video-title", "color", window.videoTitle],
      null
    );
  }

  function replaceChannNames() {
    replaceCSS(
      "yt-simple-endpoint style-scope yt-formatted-string",
      "color",
      window.channNames,
      "2",
      null
    );

    replaceCSS("ytd-channel-name", "color", channNames);
  }

  function replaceHeading() {
    replaceCSS("ytd-shelf-renderer", "color", window.heading);
  }

  function replaceViews() {
    replaceCSS(
      "ytd-grid-video-renderer",
      null,
      null,
      ["tagName", "SPAN", "color", window.numViews],
      null
    );

    replaceCSS(
      " view-count style-scope yt-view-count-renderer",
      "color",
      window.numViews
    );

    replaceCSS(
      "style-scope ytd-video-meta-block",
      null,
      null,
      ["id", "metadata-line", "color", window.numViews],
      null
    );
  }

  function replaceAll() {
    replaceCSS("yt-simple-endpoint", "color", window.mainText);

    let length1 = document.getElementsByTagName("yt-formatted-string").length;
    let node = document.getElementsByTagName("yt-formatted-string");

    for (let j = 0; j < length1; j++) {
      if (node[j].id != "text") {
        node[j].style.color = window.mainText;
        if (node[j].previousElementSibling != null) {
          if (node[j].previousElementSibling.id == "dot") {
            node[j].previousElementSibling.style.color = window.mainText;
          }
        }
      }
    }
    replaceCSS("style-scope", "fontFamily", window.font);

    // replaceCSS(
    //   "ytd-app",
    //   null,
    //   null,
    //   [
    //     "tagName",
    //     "YTD-MINI-GUIDE-RENDERER",
    //     "backgroundColor",
    //     window.darkBlue
    //   ],
    //   null
    // );

    replaceCSS(
      "yt-simple-endpoint style-scope yt-formatted-string",
      "color",
      window.accentColor
    );
    replaceCSS(
      "ytd-rich-metadata-renderer",
      "backgroundColor",
      window.lightBlue
    );

    replaceCSS("ytd-shelf-renderer", "color", window.mainText);

    // replaceCSS("ytd-mini-guide-renderer", "backgroundColor", window.darkBlue);

    replaceCSS(
      "ytp-play-progress ytp-swatch-background-color",
      "backgroundColor",
      window.accentColor
    );

    replaceCSS(
      "toggle-button style-scope paper-toggle-button",
      "backgroundColor",
      window.accentColor
    );

    replaceCSS("style-scope ytd-comments-header-renderer", "border", "none");
    replaceCSS(
      "style-scope ytd-backstage-post-dialog-renderer",
      null,
      null,
      ["id", "post-buttons-wrapper", "backgroundColor", "transparent"],
      null
    );

    replaceCSS(
      "style-scope ytd-compact-video-renderer",
      null,
      null,
      ["id", "video-title", "color", window.mainText],
      null
    );

    replaceCSS(" ytd-channel-name", "color", window.accentColor);

    replaceCSS(
      "toggle-bar style-scope paper-toggle-button",
      "backgroundColor",
      window.lightBlue
    );

    replaceCSS(
      "style-scope ytd-compact-autoplay-renderer",
      "color",
      window.mainText
    );

    replaceCSS(
      "style-scope ytd-video-meta-block",
      null,
      null,
      ["id", "byline-container", "color", window.accentColor],
      null
    );

    replaceCSS(
      "style-scope ytd-video-meta-block",
      null,
      null,
      ["id", "metadata-line", "color", window.underTextColor],
      null
    );

    window.accentColor
      ? replaceCSS(
          "style-blue-text",
          null,
          null,
          ["id", "text", "color", window.accentColor],
          ["id", "button", "color", window.accentColor]
        )
      : "";

    window.accentColor
      ? replaceCSS("more-button-exp", "color", accentColor)
      : "";

    window.accentColor
      ? replaceCSS("style-default-active", "color", accentColor)
      : "";
    replaceCSS("ytd-badge-supported-renderer", "color", window.iconColor);
    replaceCSS("ytd-badge-supported-renderer", "borderColor", window.iconColor);
    replaceCSS(
      "ytd-badge-supported-renderer",
      "backgroundColor",
      "transparent"
    );
    replaceCSS("ytd-badge-supported-renderer", "background", "none");

    replaceCSS("ytd-section-list-renderer", "borderColor", "transparent");

    // replaceCSS(
    //   "ytd-multi-page-menu-renderer",
    //   "borderRadius",
    //   "6px 6px 6px 6px"
    // );

    replaceCSS(
      "style-scope ytd-comment-renderer",
      null,
      null,
      [
        "tagName",
        "YTD-AUTHOR-COMMENT-BADGE-RENDERER",
        "backgroundColor",
        window.lightBlue
      ],
      null
    );

    // replaceCSS("yt-icon", "color", window.iconColor);

    replaceCSS(
      "style-scope ytd-sentiment-bar-renderer",
      "color",
      window.iconColor
    );
    window.accentColor
      ? replaceCSS(
          "style-scope ytd-button-renderer style-suggestive",
          "borderColor",
          window.accentColor
        )
      : "";

    replaceCSS(
      "style-scope ytd-settings-options-renderer",
      "color",
      window.underTextColor
    );
    replaceCSS(
      "ytd-playlist-video-renderer",
      null,
      null,
      ["id", "video-title", "color", window.mainText],
      null
    );
    // replaceCSS(
    //   "style-scope ytd-compact-link-renderer",
    //   "backgroundColor",
    //   window.lightBlue
    // );

    replaceCSS(
      "ytd-thumbnail-overlay-resume-playback-renderer",
      "backgroundColor",
      window.accentColor
    );

    replaceCSS(
      "style-scope yt-horizontal-list-renderer",
      "backgroundColor",
      window.darkBlue
    );

    replaceCSS("style-scope ytd-account-settings", "color", window.mainText);

    replaceCSS(
      "style-scope ytd-account-settings",
      "backgroundColor",
      window.darkBlue
    );

    // replaceCSS("ytd-guide-section-renderer", "borderColor", window.iconColor);
    // replaceCSS("ytd-guide-renderer", "borderColor", window.iconColor);

    // replaceCSS("deemphasize", "fontFamily", window.font);

    replaceCSS(
      "ytd-guide-entry-renderer",
      null,
      null,
      ["id", "newness-dot", "backgroundColor", accentBlue],
      null
    );

    replaceCSS(
      "guide-icon style-scope ytd-guide-entry-renderer",
      "color",
      window.iconColor
    );
    replaceCSS("paper-tooltip", "color", "white");

    window.accentColor
      ? replaceCSS("paper-tooltip", "backgroundColor", window.accentColor)
      : "";

    replaceCSS("ytd-searchbox", "color", window.underTextColor);

    // replaceCSS("ytd-searchbox", "fontFamily", window.font);

    replaceCSS(
      "ytd-searchbox",
      null,
      null,
      ["id", "search-icon-legacy", "backgroundColor", window.lightBlue],
      ["id", "container", "backgroundColor", window.lightBlue]
    );

    replaceCSS(
      "ytd-searchbox",
      null,
      null,
      ["id", "search-form", "backgroundColor", window.lightBlue],
      null
    );
    replaceCSS("ytd-searchbox", "borderRadius", "5px");
    replaceCSS("ytd-searchbox", "border", "none");
    replaceCSS("search-icon-legacy", "background", window.darkBlue);
    window.pattern
      ? replaceCSS(
          "style-scope ytd-watch-flexy",
          null,
          null,
          [
            "id",
            "columns",
            "background",
            "url('" +
              browser.runtime.getURL("/patterns/" + window.pattern + ".png") +
              "')"
          ],
          null
        )
      : "";
    replaceCSS(
      "style-scope ytd-watch-flexy",
      null,
      null,
      ["id", "columns", "backgroundColor", window.lightBlue],
      null
    );

    replaceCSS(
      "style-scope ytd-watch-flexy",
      null,
      null,
      [
        "tagName",
        "YTD-VIDEO-SECONDARY-INFO-RENDERER",
        "backgroundColor",
        window.darkBlue
      ],
      [
        "tagName",
        "YTD-VIDEO-SECONDARY-INFO-RENDERER",
        "padding",
        "0px 20px 20px 20px"
      ]
    );

    replaceCSS(
      "less-button-exp style-scope ytd-comment-renderer",
      "color",
      window.accentColor
    );

    replaceCSS(
      " ytd-comment-renderer",
      null,
      null,
      ["id", "body", "backgroundColor", window.darkBlue],
      ["id", "body", "borderRadius", "9px"]
    );
    replaceCSS(
      " ytd-comment-renderer",
      null,
      null,
      ["id", "body", "padding", "15px"],
      ["id", "body", "marginBottom", "12px"]
    );

    replaceCSS(
      "style-scope ytd-watch-flexy",
      null,
      null,
      [
        "tagName",
        "YTD-WATCH-NEXT-SECONDARY-RESULTS-RENDERER",
        "backgroundColor",
        window.darkBlue
      ],
      [
        "tagName",
        "YTD-WATCH-NEXT-SECONDARY-RESULTS-RENDERER",
        "borderRadius",
        "9px"
      ]
    );
    replaceCSS("style-scope ytd-watch-flexy", null, null, [
      "tagName",
      "YTD-WATCH-NEXT-SECONDARY-RESULTS-RENDERER",
      "padding",
      "8px 20px 5px 20px"
    ]);
    replaceCSS(
      "style-scope ytd-watch-flexy",
      null,
      null,
      ["tagName", "YTD-VIDEO-SECONDARY-INFO-RENDERER", "marginBottom", "12px"],
      ["tagName", "YTD-VIDEO-SECONDARY-INFO-RENDERER", "borderRadius", "9px"]
    );

    replaceCSS("style-scope ytd-watch-flexy", null, null, [
      "tagName",
      "YTD-VIDEO-SECONDARY-INFO-RENDERER",
      "border",
      "none"
    ]);

    replaceCSS("style-scope ytd-watch-flexy", null, null, [
      "tagName",
      "YTD-VIDEO-PRIMARY-INFO-RENDERER",
      "border",
      "none"
    ]);

    replaceCSS(
      "style-scope ytd-subscribe-button-renderer",
      "backgroundColor",
      window.accentColor
    );
    window.accentColor
      ? replaceCSS(
          "style-scope ytd-button-renderer",
          "color",
          window.accentColor
        )
      : "";
    window.pattern
      ? replaceCSS(
          "ytd-page-manager",
          "background",
          "url('" +
            browser.runtime.getURL("/patterns/" + window.pattern + ".png") +
            "')"
        )
      : "";
    replaceCSS("ytd-page-manager", "backgroundColor", window.lightBlue);

    replaceCSS("style-primary", "backgroundColor", "transparent");

    replaceCSS("tab-content", "color", "white");

    replaceCSS(
      "ytd-grid-video-renderer",
      null,
      null,
      ["tagName", "SPAN", "color", window.underTextColor],
      null
    );

    // replaceCSS(
    //   "ytd-grid-video-renderer",
    //   null,
    //   null,
    //   ["tagName", "SPAN", "fontFamily", window.font],
    //   null
    // );

    window.accentColor
      ? replaceCSS(
          "paper-tabs",
          null,
          null,
          ["id", "selectionBar", "borderColor", window.accentColor],
          null
        )
      : "";

    replaceCSS(
      " view-count style-scope yt-view-count-renderer",
      "color",
      window.underTextColor
    );

    replaceCSS(
      "style-scope ytd-toggle-button-renderer style-text",
      "color",
      window.iconColor
    );

    replaceCSS("style-scope yt-dropdown-menu", "color", window.mainText);
    replaceCSS("style-scope yt-dropdown-menu", null, null, [
      "id",
      "menu",
      "backgroundColor",
      window.darkBlue
    ]);

    replaceCSS(
      "style-scope ytd-comment-action-buttons-renderer",
      null,
      null,
      ["id", "vote-count-middle", "color", window.underTextColor],
      null
    );

    replaceCSS(
      "ytd-menu-popup-renderer",
      null,
      null,
      ["id", "items", "backgroundColor", window.darkBlue],
      ["id", "items", "color", window.underTextColor]
    );

    replaceCSS(
      "style-scope ytd-sentiment-bar-renderer",
      null,
      null,
      ["id", "like-bar", "background", window.underTextColor],
      ["id", "container", "background", window.iconColor]
    );

    setContentBox("ytd-shelf-renderer");
    function setContentBox(id) {
      for (let i = 0; i < document.getElementsByClassName(id).length; i++) {
        if (document.getElementsByClassName(id)[i].id == "dismissable") {
          document.getElementsByClassName(id)[i];
          document.getElementsByClassName(id)[i].style.backgroundColor =
            window.darkBlue;
          document.getElementsByClassName(id)[i].style.padding =
            "0px 30px 0px 30px";
          document.getElementsByClassName(id)[i].style.marginTop = "10px";
          document.getElementsByClassName(id)[i].style.marginBottom = "10px";
          document.getElementsByClassName(id)[i].style.borderRadius = "9px";
        }
      }
    }

    replaceCSS("ytd-page-manager", "backgroundRepeat", "repeat");

    replaceCSS(
      "ytd-c4-tabbed-header-renderer",
      null,
      null,
      ["id", "channel-header", "backgroundColor", window.darkBlue],
      ["id", "tabs-inner-container", "backgroundColor", window.darkBlue]
    );

    document.getElementById("guide-icon")
      ? (document.getElementById("guide-icon").style.color = window.accentColor)
      : "";

    replaceCSS(
      "ytp-swatch-background-color",
      "backgroundColor",
      window.accentColor
    );

    replaceCSS(
      "style-scope ytd-masthead",
      null,
      null,
      ["id", "container", "backgroundColor", window.darkBlue],
      null
    );
    replaceCSS("style-scope ytd-masthead", "color", window.iconColor);
    replaceCSS(
      "guide-icon style-scope ytd-mini-guide-entry-renderer",
      "color",
      window.iconColor
    );

    replaceCSS(
      "ytd-browse",
      null,
      null,
      [
        "tagName",
        "YTD-PLAYLIST-SIDEBAR-RENDERER",

        "backgroundColor",
        window.lightBlue
      ],
      null
    );

    replaceCSS(
      "ytd-browse",
      null,
      null,
      [
        "tagName",
        "YTD-TWO-COLUMN-BROWSE-RESULTS-RENDERER",

        "backgroundColor",
        "transparent"
      ],
      null
    );

    replaceCSS(
      "ytd-browse",
      null,
      null,
      [
        "tagName",
        "YTD-ALERT-WITH-BUTTON-RENDERER",

        "backgroundColor",
        window.darkBlue
      ],
      null
    );

    // let likeBtn = document
    //   .getElementById("top-level-buttons")
    //   .getElementsByClassName("yt-icon-button");
    // let likeLgth = likeBtn.length;

    // for (k = 0; k < likeLgth; k++) {
    //   if (likeBtn[k].id == "button") {
    //     if (likeBtn[k].getAttribute("aria-pressed") == "true") {
    //       likeBtn[
    //         k
    //       ].children[0].children[0].children[0].children[0].style.color = accentColor;
    //     }
    //   }
    // }

    // let likeBar = current.getElementsByClassName(
    //   " ytd-sentiment-bar-renderer"
    // );

    // let likeLgthBar = likeBar.length;

    // for (l = 0; l < likeLgthBar; l++) {
    //   if (likeBar[l].parentElement.hasAttribute("activated_")) {
    //     likeBar[l].children[0].style.backgroundColor = accentColor;
    //   }
    // }

    /********* OLD LOGIC
     *
     *
     *
     *
     *
     * ****************/
    // let length = document.getElementsByTagName("ytd-guide-entry-renderer")
    //   .length;

    // for (var i = 0; i < length; i++) {
    //   var aTag = document
    //     .getElementsByTagName("ytd-guide-entry-renderer")

    //     [i].getElementsByTagName("A")[0];

    //   var elem = document.getElementsByTagName("ytd-guide-entry-renderer")[i];
    //   elem.removeAttribute("style");

    //   /*
    // on hover left menu
    // */
    //   elem.addEventListener("mouseover", function(e) {
    //     onHover(e);
    //   });

    //   function onHover(e) {
    //     e.target.parentNode.parentNode.style.backgroundColor = "transparent";
    //     if (e.target.parentNode.tagName == "A") {
    //       // e.target.parentNode.parentNode.setAttribute(
    //       //   "style",
    //       //   window.border_inside
    //       // );
    //       e.target.parentNode.parentNode.style.backgroundColor =
    //         window.lightBlue;
    //     } else {
    //       // e.target.parentNode.parentNode.parentNode.setAttribute(
    //       //   "style",
    //       //   window.border_inside
    //       // );
    //       e.target.parentNode.parentNode.parentNode.style.backgroundColor =
    //         window.lightBlue;
    //     }
    //   }

    //   elem.addEventListener("mouseleave", function(event) {
    //     event.target.setAttribute("style", noShadow);
    //     event.target.style.backgroundColor = "transparent";

    //     let currentLink = event.target.children[0].href;

    //     if (
    //       window.location.href.includes(currentLink) &&
    //       currentLink
    //         .substr(currentLink - 5)
    //         .includes(window.location.href) &&
    //       currentLink.title != "Home"
    //     ) {
    //       // event.target.setAttribute("style", window.border_inside);
    //       event.target.style.backgroundColor = window.lightBlue;
    //     }
    //   });

    //   // function notifyBackgroundPage(e) {
    //   //   replaceAll();
    //   //   for (var j = 0; j < length; j++) {
    //   //     document.getElementsByTagName("ytd-guide-entry-renderer")[
    //   //       j
    //   //     ].style.backgroundColor = "transparent";
    //   //   }

    //   //   e.target.parentNode.style.backgroundImage = "none";

    //   //   idCurrent = i;
    //   // }

    //   // elem.addEventListener("click", notifyBackgroundPage);

    //   if (aTag) {
    //     if (
    //       window.location.href.includes(aTag.href) &&
    //       aTag.href.substr(aTag.length - 5).includes(window.location.href) &&
    //       aTag.title != "Home"
    //     ) {
    //       // elem.setAttribute("style", window.border_inside);
    //       elem.style.backgroundColor = window.lightBlue;
    //     }
    //   }
    // }
  }

  document.documentElement.style.visibility = "";
  document.documentElement.style.backgroundColor = window.lightBlue;
});
