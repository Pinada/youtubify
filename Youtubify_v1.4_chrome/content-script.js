document.documentElement.setAttribute(
  "style",
  "background-color:#17171c !important;background-image:url('" +
    browser.runtime.getURL("/images/logoLoading.png") +
    "');background-size:10%;position:relative;top:0px;left:0px;z-index:99999;font-size:10px;font-family:Roboto;visibility:hidden"
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
    m.pattern ? (window.pattern = m.pattern) : "";

    m.heading ? (window.heading = m.heading) : "";
    m.videoTitle ? (window.videoTitle = m.videoTitle) : "";
    getCookie();
    clearTimeout(timer1);

    timer1 = setTimeout(() => {
      replacePop();
      replaceMenu();
      replaceAll();
      if (window.isLink == "ch") {
        replaceLink();
      }
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
      if (window.isMainBG == "ch") {
        replaceMainBG();
      }
      if (window.isContentBG == "ch") {
        replaceMainContent();
      }
      if (window.isVideoDesc == "ch") {
        replaceVideoDesc();
      }
      if (window.isComReply == "ch") {
        replaceComReply();
      }
      if (window.isShareSave == "ch") {
        replaceShareSave();
      }
      if (window.isLikeVideo == "ch") {
        replaceLikeVideo();
      }
      if (window.isLikeVideoText == "ch") {
        replaceLikeVideoText();
      }
      if (window.isUploadDate == "ch") {
        replaceUploadDate();
      }
      if (window.isNumSub == "ch") {
        replaceNumSub();
      }
      if (window.isSubBtn == "ch") {
        replaceSubBtn();
      }
      if (window.isSubText == "ch") {
        replaceSubText();
      }
      if (window.isJoinBtn == "ch") {
        replaceJoinBtn();
      }
      if (window.isTopIcons == "ch") {
        replaceTopIcons();
      }
      if (window.isSearchBG == "ch") {
        replaceSearchBG();
      }
      if (window.isSearchIcons == "ch") {
        replaceSearchIcons();
      }
      if (window.isTopBG == "ch") {
        replaceTopBG();
      }
      if (window.isComText == "ch") {
        replaceComText();
      }

      if (window.isComPublish == "ch") {
        replaceComPublish();
      }
      if (window.isBubble) {
        replaceBubble();
      }
      if (window.isBubbleText) {
        replaceBubbleText();
      }
      if (window.isPopupBG) {
        replacePopupBG();
      }
      if (window.isPopupText) {
        replacePopupText();
      }
      if (window.isLikeActive) {
        replaceLikeActive();
      }
      if (window.isLikeBar) {
        replaceLikeBar();
      }
      if (window.isOtherIcons) {
        replaceOtherIcons();
      }
    }, 300);
  });

  observerPop = new MutationObserver(function() {
    replacePop();
    if (window.isPopupBG) {
      replacePopupBG();
    }
    if (window.isPopupText) {
      replacePopupText();
    }
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
      if (window.isLink == "ch") {
        replaceLink();
      }
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
      if (window.isMainBG == "ch") {
        replaceMainBG();
      }
      if (window.isContentBG == "ch") {
        replaceMainContent();
      }
      if (window.isVideoDesc == "ch") {
        replaceVideoDesc();
      }
      if (window.isComReply == "ch") {
        replaceComReply();
      }
      if (window.isShareSave == "ch") {
        replaceShareSave();
      }
      if (window.isLikeVideo == "ch") {
        replaceLikeVideo();
      }
      if (window.isLikeVideoText == "ch") {
        replaceLikeVideoText();
      }
      if (window.isUploadDate == "ch") {
        replaceUploadDate();
      }
      if (window.isNumSub == "ch") {
        replaceNumSub();
      }
      if (window.isSubBtn == "ch") {
        replaceSubBtn();
      }
      if (window.isSubText == "ch") {
        replaceSubText();
      }
      if (window.isJoinBtn == "ch") {
        replaceJoinBtn();
      }
      if (window.isTopIcons == "ch") {
        replaceTopIcons();
      }
      if (window.isSearchBG == "ch") {
        replaceSearchBG();
      }
      if (window.isSearchIcons == "ch") {
        replaceSearchIcons();
      }
      if (window.isTopBG == "ch") {
        replaceTopBG();
      }
      if (window.isComText == "ch") {
        replaceComText();
      }

      if (window.isComPublish == "ch") {
        replaceComPublish();
      }
      if (window.isBubble) {
        replaceBubble();
      }
      if (window.isBubbleText) {
        replaceBubbleText();
      }
      if (window.isPopupBG) {
        replacePopupBG();
      }
      if (window.isPopupText) {
        replacePopupText();
      }
      if (window.isLikeActive) {
        replaceLikeActive();
      }
      if (window.isLikeBar) {
        replaceLikeBar();
      }
      if (window.isOtherIcons) {
        replaceOtherIcons();
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

  setFont(
    "SourceSansPro",
    "https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap"
  );
  setFont(
    "Poppins",
    "https://fonts.googleapis.com/css?family=Poppins&display=swap"
  );

  setFont(
    "Roboto",
    "https://fonts.googleapis.com/css?family=Roboto&display=swap"
  );

  setFont(
    "Nunito",
    "https://fonts.googleapis.com/css?family=Nunito&display=swap"
  );

  /*
   *
   *
   * Take all cookies
   *
   *
   */
  async function getCookie() {
    async function getC(is, name, pickr, cookie, def) {
      let placeHolder = await awaitCookie(pickr, "isSetting");
      window[is] = placeHolder.split("-")[0];
      await awaitCookie(cookie, def);

      if (window[is] == "ch") {
        let cookiePlh = await awaitCookie(cookie, def);
        window[name] = cookiePlh.split("-")[1];
      } else {
        window[name] = "dummy";
      }
    }
    getC("isHeading", "heading", "Pcolor2", "Pcolor2", "rgba(227, 71, 53, 1)");
    getC(
      "isVideoTitle",
      "videoTitle",
      "Pcolor3",
      "Pcolor3",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isChannNames",
      "channNames",
      "Pcolor4",
      "Pcolor4",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isNumViews",
      "numViews",
      "Pcolor5",
      "Pcolor5",
      "rgba(227, 71, 53, 1)"
    );
    getC("isBadges", "badges", "Pcolor6", "Pcolor6", "rgba(227, 71, 53, 1)");
    getC("isBar", "bar", "Pcolor7", "Pcolor7", "rgba(227, 71, 53, 1)");
    getC("isLeftBG", "leftBG", "Pcolor8", "Pcolor8", "rgba(227, 71, 53, 1)");
    getC(
      "isLeftHeading",
      "leftHeading",
      "Pcolor9",
      "Pcolor9",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isLeftIcon",
      "leftIcon",
      "Pcolor10",
      "Pcolor10",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isLeftText",
      "leftText",
      "Pcolor11",
      "Pcolor11",
      "rgba(227, 71, 53, 1)"
    );
    getC("isMainBG", "mainBG", "Pcolor12", "Pcolor12", "rgba(227, 71, 53, 1)");
    getC(
      "isContentBG",
      "contentBG",
      "Pcolor13",
      "Pcolor13",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isVideoDesc",
      "videoDesc",
      "Pcolor14",
      "Pcolor14",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isShareSave",
      "shareSave",
      "Pcolor15",
      "Pcolor15",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isLikeVideo",
      "likeVideo",
      "Pcolor16",
      "Pcolor16",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isLikeVideoText",
      "likeVideoText",
      "Pcolor17",
      "Pcolor17",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isUploadDate",
      "uploadDate",
      "Pcolor18",
      "Pcolor18",
      "rgba(227, 71, 53, 1)"
    );
    getC("isNumSub", "numSub", "Pcolor19", "Pcolor19", "rgba(227, 71, 53, 1)");
    getC("isSubBtn", "subBtn", "Pcolor20", "Pcolor20", "rgba(227, 71, 53, 1)");
    getC(
      "isSubText",
      "subText",
      "Pcolor21",
      "Pcolor21",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isJoinBtn",
      "joinBtn",
      "Pcolor22",
      "Pcolor22",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isTopIcons",
      "topIcons",
      "Pcolor23",
      "Pcolor23",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isSearchBG",
      "searchBG",
      "Pcolor24",
      "Pcolor24",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isSearchIcons",
      "searchIcons",
      "Pcolor25",
      "Pcolor25",
      "rgba(227, 71, 53, 1)"
    );
    getC("isTopBG", "topBG", "Pcolor26", "Pcolor26", "rgba(227, 71, 53, 1)");
    getC(
      "isComText",
      "comText",
      "Pcolor27",
      "Pcolor27",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isComReply",
      "comReply",
      "Pcolor28",
      "Pcolor28",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isComPublish",
      "comPublish",
      "Pcolor29",
      "Pcolor29",
      "rgba(227, 71, 53, 1)"
    );
    getC("isLink", "link", "Pcolor30", "Pcolor30", "rgba(227, 71, 53, 1)");
    getC("isBubble", "bubble", "Pcolor31", "Pcolor31", "rgba(227, 71, 53, 1)");
    getC(
      "isBubbleText",
      "bubbleText",
      "Pcolor32",
      "Pcolor32",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isPopupBG",
      "popupBG",
      "Pcolor33",
      "Pcolor33",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isPopupText",
      "popupText",
      "Pcolor34",
      "Pcolor34",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isLikeActive",
      "likeActive",
      "Pcolor35",
      "Pcolor35",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isLikeBar",
      "likeBar",
      "Pcolor36",
      "Pcolor36",
      "rgba(227, 71, 53, 1)"
    );
    getC(
      "isOtherIcons",
      "otherIcons",
      "Pcolor37",
      "Pcolor37",
      "rgba(227, 71, 53, 1)"
    );

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
      case "'Source Sans Pro', sans-serif":
        window.font = "'Source Sans Pro', sans-serif";
        break;
      case "'Roboto', sans-serif":
        window.font = "'Roboto', sans-serif";
        break;
      case "'Nunito', sans-serif":
        window.font = "'Nunito', sans-serif";
        break;
      case "'Ubuntu', sans-serif":
        window.font = "'Ubuntu', sans-serif";
        break;
      case "'Exo 2', sans-serif":
        window.font = "'Exo 2', sans-serif";
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
      selector = document.getElementsByClassName(css);
    } else {
      selector = document.getElementsByClassName(css);
    }

    let length = selector.length;

    for (let i = 0; i < length; i++) {
      if (condition1) {
        if (selector[i][condition1[0]] == condition1[1]) {
          selector[i].style[condition1[2]] = condition1[3];
          selector[i].style.visibility = "";
        }
      }
      if (condition2) {
        if (selector[i][condition2[0]] == condition2[1]) {
          selector[i].style[condition2[2]] = condition2[3];
          selector[i].style.visibility = "";
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
            selector[i].style.visibility = "";
          } else {
          }
        } else if (
          css == "ytd-video-primary-info-renderer" &&
          condition1 == "2"
        ) {
          if (selector[i].parentElement.tagName == "H1") {
            selector[i].style[prop] = value;
            selector[i].style.visibility = "";
          } else {
          }
        } else if (
          css == "ytd-video-primary-info-renderer" &&
          condition1 == "1"
        ) {
          if (selector[i].parentElement.id == "date") {
            selector[i].style[prop] = value;
            selector[i].style.visibility = "";
          } else {
          }
        } else if (
          css == "style-scope ytd-video-meta-block" ||
          (css == "ytd-grid-video-renderer" && condition1 == "1")
        ) {
          if (
            selector[i].previousElementSibling &&
            selector[i].previousElementSibling.tagName == "SPAN"
          ) {
            selector[i].style[prop] = value;
            selector[i].style.visibility = "";
          } else {
          }
        } else if (
          css == "style-scope ytd-button-renderer" &&
          condition1 == "1"
        ) {
          if (
            selector[i].previousElementSibling &&
            selector[i].previousElementSibling.tagName == "YT-ICON"
          ) {
            selector[i].previousElementSibling.style[prop] = value;
            selector[i].style[prop] = value;
            selector[i].style.visibility = "";
          } else {
          }
        } else if (
          css ==
          "published-time-text above-comment style-scope ytd-comment-renderer"
        ) {
          selector[i].children[0].style[prop] = value;
          selector[i].style.visibility = "";
        } else {
          selector[i].style[prop] = value;
          selector[i].style.visibility = "";
        }
      }
    }
  }
  function replaceOtherIcons() {
    replaceCSS(
      "toggle-button style-scope paper-toggle-button",
      "backgroundColor",
      window.otherIcons
    );
    replaceCSS(
      "style-scope ytd-button-renderer",
      null,
      null,
      ["tagName", "YT-ICON", "color", window.otherIcons],
      null
    );
  }
  function replaceLikeBar() {
    replaceCSS(
      "style-scope ytd-sentiment-bar-renderer",
      null,
      null,
      ["id", "like-bar", "background", window.likeBar],
      ["id", "container", "background", window.likeBar]
    );
  }
  function replaceLikeActive() {
    replaceCSS("style-default-active", "color", window.likeActive);
  }
  function replacePopupBG() {
    replaceCSS("ytd-popup-container", "backgroundColor", window.popupBG);
    replaceCSS(
      "ytd-multi-page-menu-renderer",
      "backgroundColor",
      window.popupBG
    );
    // replaceCSS("ytd-multi-page-menu-renderer", "borderColor", window.iconColor);

    // replaceCSS(
    //   "style-scope ytd-compact-link-renderer",
    //   "backgroundColor",
    //   window.darkBlue
    // );

    // replaceCSS(
    //   "yt-simple-endpoint style-scope yt-formatted-string",
    //   "color",
    //   window.accentColor,
    //   "1",
    //   null
    // );
  }
  function replacePopupText() {
    replaceCSS(
      "style-scope ytd-simple-menu-header-renderer",
      "color",
      window.popupText
    );
    replaceCSS(
      "style-scope ytd-notification-renderer",
      "color",
      window.popupText
    );
    replaceCSS(
      "message style-scope ytd-notification-renderer",
      "color",
      window.popupText
    );
    replaceCSS(
      "style-scope ytd-compact-link-renderer",
      "color",
      window.popupText
    );
  }
  function replaceBubble() {
    replaceCSS("paper-tooltip", "backgroundColor", window.bubble);
  }
  function replaceBubbleText() {
    replaceCSS("paper-tooltip", "color", window.bubbleText);
  }

  function replaceComReply() {
    replaceCSS(
      "style-scope ytd-button-renderer",
      "color",
      window.comReply,
      "1",
      null
    );

    replaceCSS(
      "style-scope ytd-button-renderer style-text size-default",
      null,
      null,
      ["id", "text", "color", window.comReply],
      null
    );
  }
  function replaceComText() {
    replaceCSS(
      "style-scope ytd-comment-renderer",
      null,
      null,
      ["id", "content-text", "color", window.comText],
      null
    );

    replaceCSS(
      "count-text style-scope ytd-comments-header-renderer",
      "color",
      window.comText
    );

    replaceCSS(
      "style-scope yt-dropdown-menu",
      null,
      null,
      ["id", "icon-label", "color", window.comText],
      null
    );

    replaceCSS(
      "style-scope ytd-comment-simplebox-renderer",
      null,
      null,
      ["id", "simplebox-placeholder", "color", window.comText],
      null
    );
  }
  function replaceComPublish() {
    replaceCSS(
      "published-time-text above-comment style-scope ytd-comment-renderer",
      "color",
      window.comPublish
    );
  }
  function replaceLink() {
    replaceCSS(
      "yt-simple-endpoint style-scope yt-formatted-string",
      "color",
      window.link
    );

    replaceCSS("deemphasize", "color", window.link);
  }
  function replaceVideoDesc() {
    replaceCSS(
      "style-scope ytd-backstage-post-dialog-renderer",
      null,
      null,
      ["id", "header-visibility-label", "color", window.videoDesc],
      null
    );
    replaceCSS(
      "style-scope ytd-backstage-post-dialog-renderer",
      null,
      null,
      ["id", "header-default-visibility", "color", window.videoDesc],
      null
    );
    replaceCSS(
      "style-scope ytd-backstage-post-dialog-renderer",
      null,
      null,
      ["id", "commentbox-placeholder", "color", window.videoDesc],
      null
    );

    replaceCSS("style-scope ytd-message-renderer", "color", window.videoDesc);
    replaceCSS(
      "more-button style-scope ytd-video-secondary-info-renderer",
      "color",
      window.videoDesc
    );
    replaceCSS(
      "content style-scope ytd-video-secondary-info-renderer",
      "color",
      window.videoDesc
    );
    replaceCSS(
      " style-scope ytd-video-renderer",
      null,
      null,
      ["id", "description-text", "color", window.videoDesc],
      null
    );
  }
  function replaceShareSave() {
    replaceCSS(
      "style-scope ytd-button-renderer style-default size-default",
      null,
      null,
      ["id", "text", "color", window.shareSave],
      null
    );
  }
  function replaceLikeVideo() {
    replaceCSS(
      "style-scope ytd-toggle-button-renderer style-text",
      null,
      null,
      ["id", "button", "color", window.likeVideo],
      null
    );
  }
  function replaceLikeVideoText() {
    replaceCSS(
      "style-scope ytd-toggle-button-renderer style-text",
      null,
      null,
      ["id", "text", "color", window.likeVideoText],
      null
    );

    replaceCSS(
      "style-scope ytd-comment-action-buttons-renderer",
      null,
      null,
      ["id", "vote-count-middle", "color", window.likeVideoText],
      null
    );
  }
  function replaceUploadDate() {
    replaceCSS(
      "ytd-video-primary-info-renderer",
      "color",

      window.uploadDate,
      "1",
      null
    );
    replaceCSS(
      "style-scope ytd-video-meta-block",
      "color",

      window.uploadDate,
      "1",
      null
    );

    replaceCSS(
      "ytd-grid-video-renderer",
      "color",
      window.uploadDate,
      "1",
      null
    );
  }
  function replaceNumSub() {
    replaceCSS(
      "style-scope ytd-video-owner-renderer",
      null,
      null,
      ["id", "owner-sub-count", "color", window.numSub],
      null
    );

    replaceCSS(
      "style-scope ytd-c4-tabbed-header-renderer",
      null,
      null,
      ["id", "subscriber-count", "color", window.numSub],
      null
    );
  }

  function replaceSubBtn() {
    replaceCSS(
      "style-scope ytd-subscribe-button-renderer",
      "backgroundColor",
      window.subBtn
    );
  }
  function replaceSubText() {
    replaceCSS(
      "style-scope ytd-subscribe-button-renderer",
      "color",
      window.subText
    );

    replaceCSS(
      "style-scope ytd-subscription-notification-toggle-button-renderer",
      "color",
      window.subText
    );
  }
  function replaceJoinBtn() {
    replaceCSS(
      "style-scope ytd-button-renderer style-suggestive",
      "borderColor",
      window.joinBtn
    );

    replaceCSS(
      "style-scope ytd-button-renderer style-suggestive",
      null,
      null,
      ["id", "text", "color", window.joinBtn],
      null
    );
  }
  function replaceTopIcons() {
    replaceCSS(
      "yt-simple-endpoint style-scope ytd-notification-topbar-button-renderer",
      "color",
      window.topIcons
    );

    replaceCSS(
      "style-scope ytd-topbar-menu-button-renderer",
      "color",
      window.topIcons
    );
  }
  function replaceSearchBG() {
    replaceCSS(
      "ytd-searchbox",
      null,
      null,
      ["id", "search-icon-legacy", "backgroundColor", window.searchBG],
      ["id", "container", "backgroundColor", window.searchBG]
    );

    replaceCSS(
      "ytd-searchbox",
      null,
      null,
      ["id", "search-form", "backgroundColor", window.searchBG],
      null
    );
  }
  function replaceSearchIcons() {
    replaceCSS("ytd-searchbox", "color", window.searchIcons);
    replaceCSS("style-scope ytd-masthead", "color", window.searchIcons);
  }
  function replaceTopBG() {
    replaceCSS(
      "style-scope ytd-masthead",
      null,
      null,
      ["id", "container", "backgroundColor", window.topBG],
      null
    );
  }
  function replaceMainBG() {
    replaceCSS("ytd-page-manager", "backgroundColor", window.mainBG);
  }
  function replaceMainContent() {
    replaceCSS(
      "style-scope ytd-backstage-post-dialog-renderer",
      null,
      null,
      ["id", "dialog-header", "backgroundColor", window.contentBG],
      null
    );
    replaceCSS(
      "style-scope ytd-backstage-post-dialog-renderer",
      null,
      null,
      ["id", "unopened-dialog", "backgroundColor", window.contentBG],
      null
    );
    replaceCSS(
      "ytd-c4-tabbed-header-renderer",
      null,
      null,
      ["id", "channel-header", "backgroundColor", window.contentBG],
      ["id", "tabs-inner-container", "backgroundColor", window.contentBG]
    );
    replaceCSS(
      "style-scope ytd-watch-flexy",
      null,
      null,
      [
        "tagName",
        "YTD-MERCH-SHELF-RENDERER",
        "backgroundColor",
        window.contentBG
      ],
      null
    );
    replaceCSS(
      " ytd-comment-renderer",
      null,
      null,
      ["id", "body", "backgroundColor", window.contentBG],
      ["id", "body", "borderRadius", "9px"]
    );
    setContentBox("ytd-shelf-renderer", window.contentBG);

    replaceCSS(
      "style-scope ytd-watch-flexy",
      null,
      null,
      [
        "tagName",
        "YTD-VIDEO-SECONDARY-INFO-RENDERER",
        "backgroundColor",
        window.contentBG
      ],
      null
    );
    replaceCSS(
      "style-scope ytd-watch-flexy",
      null,
      null,
      [
        "tagName",
        "YTD-WATCH-NEXT-SECONDARY-RESULTS-RENDERER",
        "backgroundColor",
        window.contentBG
      ],
      null
    );
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
    replaceCSS("style-scope ytd-guide-renderer", null, null, [
      "tagName",
      "YTD-GUIDE-SECTION-RENDERER",
      "backgroundColor",
      window.darkBlue
    ]);
    // replaceCSS(
    //   "ytd-guide-renderer",
    //   null,
    //   null,
    //   [
    //     "tagName",
    //     "YTD-GUIDE-SECTION-RENDERER",
    //     "backgroundColor",
    //     window.darkBlue
    //   ],
    //   null
    // );

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

    // replaceCSS(
    //   "yt-simple-endpoint style-scope yt-formatted-string",
    //   "color",
    //   window.accentColor,
    //   "1",
    //   null
    // );

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
      "style-scope ytd-subscription-notification-toggle-button-renderer",
      "color",
      window.iconColor
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
      "style-scope ytd-backstage-post-dialog-renderer",
      null,
      null,
      ["id", "header-channel-name", "color", window.channNames],

      null
    );
    replaceCSS(
      "yt-simple-endpoint style-scope ytd-comment-renderer",
      "color",
      window.channNames
    );
    replaceCSS(
      "yt-simple-endpoint style-scope yt-formatted-string",
      "color",
      window.channNames,
      "2",
      null
    );

    replaceCSS(
      "style-scope ytd-active-account-header-renderer",
      null,
      null,
      ["id", "account-name", "color", window.channNames],
      null
    );

    replaceCSS("ytd-channel-name", "color", window.channNames);
  }

  function replaceHeading() {
    replaceCSS("tab-content style-scope paper-tab", "color", window.heading);
    replaceCSS(
      "style-scope yt-dropdown-menu",
      null,
      null,
      ["id", "label-icon", "color", window.heading],
      null
    );
    replaceCSS(
      "style-scope yt-dropdown-menu",
      null,
      null,
      ["id", "label-text", "color", window.heading],
      null
    );
    replaceCSS("ytd-shelf-renderer", "color", window.heading);
    replaceCSS(
      "style-scope ytd-compact-autoplay-renderer",
      "color",
      window.heading
    );
    replaceCSS(
      "style-blue-text",
      null,
      null,
      ["id", "text", "color", window.heading],
      ["id", "button", "color", window.heading]
    );

    replaceCSS(
      "paper-tabs",
      null,
      null,
      ["id", "selectionBar", "borderColor", window.heading],
      null
    );
    replaceCSS(
      "style-scope ytd-button-renderer style-primary size-default",
      "color",
      window.heading
    );
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

    replaceCSS(
      "style-scope ytd-video-meta-block",
      null,
      null,
      ["id", "separator", "color", window.numViews],
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
    replaceCSS(
      "style-scope ytd-backstage-post-dialog-renderer",
      null,
      null,
      ["id", "dialog-header", "backgroundColor", window.darkBlue],
      null
    );
    replaceCSS(
      "style-scope ytd-backstage-post-dialog-renderer",
      null,
      null,
      ["id", "unopened-dialog", "backgroundColor", window.darkBlue],
      null
    );
    replaceCSS("style-scope", "fontFamily", window.font);
    replaceCSS(
      "published-time-text above-comment style-scope ytd-comment-renderer",
      "color",
      window.mainText
    );

    replaceCSS(
      "style-scope ytd-active-account-header-renderer",
      null,
      null,
      ["id", "account-name", "color", window.accentColor],
      null
    );

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
      "style-scope ytd-topbar-menu-button-renderer",
      "color",
      window.mainText
    );
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
      "style-scope ytd-compact-link-renderer",
      "color",
      window.mainText
    );

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
      "style-scope ytd-video-meta-block",
      null,
      null,
      ["id", "separator", "color", window.iconColor],
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
      "count-text style-scope ytd-comments-header-renderer",
      "color",
      window.mainText
    );

    replaceCSS(
      "style-scope yt-dropdown-menu",
      null,
      null,
      ["id", "icon-label", "color", window.mainText],
      null
    );

    replaceCSS(
      "style-scope ytd-comment-simplebox-renderer",
      null,
      null,
      ["id", "simplebox-placeholder", "color", window.mainText],
      null
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

    replaceCSS(
      "style-blue-text",
      null,
      null,
      ["id", "text", "color", window.accentColor],
      ["id", "button", "color", window.accentColor]
    );

    window.accentColor
      ? replaceCSS("more-button-exp", "color", window.accentColor)
      : "";

    replaceCSS("style-default-active", "color", window.accentColor);

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
      ["id", "content-text", "color", window.mainText],
      null
    );
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

    replaceCSS(
      "text style-scope ytd-notification-renderer",
      "color",
      window.mainText
    );
    replaceCSS(
      "style-scope ytd-button-renderer style-suggestive",
      "borderColor",
      window.accentColor
    );

    replaceCSS(
      "style-scope ytd-button-renderer style-primary size-default",
      "color",
      window.accentColor
    );

    replaceCSS(
      "style-scope ytd-toggle-button-renderer style-text",
      null,
      null,
      ["id", "text", "color", window.iconColor],
      null
    );
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

    // replaceCSS(
    //   "style-scope yt-horizontal-list-renderer",
    //   "backgroundColor",
    //   window.darkBlue
    // );

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
      "style-scope ytd-video-owner-renderer",
      null,
      null,
      ["id", "owner-sub-count", "color", window.mainText],
      null
    );

    replaceCSS(
      "style-scope ytd-c4-tabbed-header-renderer",
      null,
      null,
      ["id", "subscriber-count", "color", window.mainText],
      null
    );
    replaceCSS(
      "style-scope ytd-simple-menu-header-renderer",
      "color",
      window.mainText
    );
    replaceCSS(
      "metadata style-scope ytd-notification-renderer",
      "color",
      window.mainText
    );
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

    replaceCSS(
      "more-button style-scope ytd-video-secondary-info-renderer",
      "color",
      window.mainText
    );
    replaceCSS("paper-tooltip", "color", "white");

    replaceCSS("paper-tooltip", "backgroundColor", window.accentColor);

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
    // window.pattern
    //   ? replaceCSS(
    //       "style-scope ytd-watch-flexy",
    //       null,
    //       null,
    //       [
    //         "id",
    //         "columns",
    //         "background",
    //         "url('" +
    //           browser.runtime.getURL("/patterns/" + window.pattern + ".png") +
    //           "')"
    //       ],
    //       null
    //     )
    //   : "";
    // replaceCSS(
    //   "style-scope ytd-watch-flexy",
    //   null,
    //   null,
    //   ["id", "columns", "backgroundColor", window.lightBlue],
    //   null
    // );

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

    replaceCSS(
      "style-scope ytd-watch-flexy",
      null,
      null,
      [
        "tagName",
        "YTD-MERCH-SHELF-RENDERER",
        "backgroundColor",
        window.darkBlue
      ],
      null
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

    replaceCSS("style-scope ytd-button-renderer", "color", window.accentColor);

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

    replaceCSS(
      "paper-tabs",
      null,
      null,
      ["id", "selectionBar", "borderColor", window.accentColor],
      null
    );

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

    setContentBox("ytd-shelf-renderer", window.darkBlue);

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

   
  
  }
  function setContentBox(id, background) {
    for (let i = 0; i < document.getElementsByClassName(id).length; i++) {
      if (document.getElementsByClassName(id)[i].id == "dismissable") {
        document.getElementsByClassName(id)[i];
        document.getElementsByClassName(id)[
          i
        ].style.backgroundColor = background;
        document.getElementsByClassName(id)[i].style.padding =
          "0px 30px 0px 30px";
        document.getElementsByClassName(id)[i].style.marginTop = "10px";
        document.getElementsByClassName(id)[i].style.marginBottom = "10px";
        document.getElementsByClassName(id)[i].style.borderRadius = "9px";
      }
    }
  }
  document.documentElement.style.visibility = "";
  document.documentElement.style.backgroundColor = window.lightBlue;
});
