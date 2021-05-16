window.addEventListener("DOMContentLoaded", () => {
  function onGotAdv(page) {
    /**** Have to find a better solution */

    if (page.pickr2 == "ch") {
      $("#check2").prop("checked", true);
    }
    if (page.pickr2 == "unch") {
      $("#check2").prop("checked", false);
    }
    if (page.pickr3 == "ch") {
      $("#check3").prop("checked", true);
    }
    if (page.pickr3 == "unch") {
      $("#check3").prop("checked", false);
    }
    if (page.pickr4 == "ch") {
      $("#check4").prop("checked", true);
    }
    if (page.pickr4 == "unch") {
      $("#check4").prop("checked", false);
    }
    if (page.pickr5 == "ch") {
      $("#check5").prop("checked", true);
    }
    if (page.pickr5 == "unch") {
      $("#check5").prop("checked", false);
    }
    if (page.pickr6 == "ch") {
      $("#check6").prop("checked", true);
    }
    if (page.pickr6 == "unch") {
      $("#check6").prop("checked", false);
    }
    if (page.pickr7 == "ch") {
      $("#check7").prop("checked", true);
    }
    if (page.pickr7 == "unch") {
      $("#check7").prop("checked", false);
    }
    if (page.pickr8 == "ch") {
      $("#check8").prop("checked", true);
    }
    if (page.pickr8 == "unch") {
      $("#check8").prop("checked", false);
    }
    if (page.pickr9 == "ch") {
      $("#check9").prop("checked", true);
    }
    if (page.pickr9 == "unch") {
      $("#check9").prop("checked", false);
    }
    if (page.pickr10 == "ch") {
      $("#check10").prop("checked", true);
    }
    if (page.pickr10 == "unch") {
      $("#check10").prop("checked", false);
    }
    if (page.pickr11 == "ch") {
      $("#check11").prop("checked", true);
    }
    if (page.pickr11 == "unch") {
      $("#check11").prop("checked", false);
    }
    for (let i = 2; i < 19; i++) {
      document
        .getElementById("pattern" + i)
        .setAttribute(
          "data-img-src",
          browser.runtime.getURL("../patterns/" + i + ".png")
        );

      document
        .getElementById("pattern" + i)
        .setAttribute("data-img-class", "patternSize");
    }

    $('#patternSelector option[value="' + page.pattern + '"]').attr(
      "selected",
      true
    );

    for (let j = 2; j < 12; j++) {
      $(".column" + j).css({
        height: "70px",
        "background-color": "rgb(235, 235, 235)",
        flex: "50%",
        "border-radius": "5px !important",
        margin: "10px 10px 10px 10px"
      });

      $("#check" + j).change(function() {
        if (this.checked) {
          browser.runtime.sendMessage({
            ["pickr" + j]: "ch"
          });

          $("#check" + j)
            .next("label")
            .css({ color: "black" });
          window["#cpicker" + j].enable();
          $(".column" + j).css({
            height: "70px",
            "background-color": "rgb(235, 235, 235)",
            flex: "50%",
            "border-radius": "5px !important",
            margin: "10px 10px 10px 10px"
          });
        } else {
          browser.runtime.sendMessage({
            ["pickr" + j]: "unch"
          });
          $("#check" + j)
            .next("label")
            .css({ color: "#808080" });
          window["#cpicker" + j].disable();
          $(".column" + j).css({
            height: "70px",
            "background-color": "#d9d9d9",
            flex: "50%",
            "border-radius": "5px !important",
            margin: "10px 10px 10px 10px"
          });
        }
      });
    }

    $("#patternSelector").imagepicker();
    let data = $("#patternSelector").data("picker");

    $("#patternSelector").change(function() {
      let data = $("#patternSelector").data("picker");
      data = data.select[0].value;
      if (data == "") {
        data = "0";
      }

      browser.runtime.sendMessage({
        pattern: data
      });
    });

    createpickr("#cpicker2", page.heading, "heading");
    createpickr("#cpicker3", page.videoTitle, "videoTitle");
    createpickr("#cpicker4", page.channNames, "channNames");
    createpickr("#cpicker5", page.numViews, "numViews");
    createpickr("#cpicker6", page.badges, "badges");
    createpickr("#cpicker7", page.bar, "bar");
    createpickr("#cpicker8", page.leftBG, "leftBG");
    createpickr("#cpicker9", page.leftHeading, "leftHeading");
    createpickr("#cpicker10", page.leftIcon, "leftIcon");
    createpickr("#cpicker11", page.leftText, "leftText");

    for (let j = 2; j < 12; j++) {
      if ($("#check" + j).prop("checked")) {
        $("#check" + j)
          .next("label")
          .css({ color: "black" });
        window["#cpicker" + j].enable();
        $(".column" + j).css({
          height: "70px",
          "background-color": "rgb(235, 235, 235)",
          flex: "50%",
          "border-radius": "5px !important",
          margin: "10px 10px 10px 10px"
        });
      } else {
        $("#check" + j)
          .next("label")
          .css({ color: "#808080" });
        window["#cpicker" + j].disable();
        $(".column" + j).css({
          height: "70px",
          "background-color": "#d9d9d9",
          flex: "50%",
          "border-radius": "5px !important",
          margin: "10px 10px 10px 10px"
        });
      }
    }
    function createpickr(vari, defaut, title) {
      let color1;
      window[vari] = Pickr.create({
        el: vari,
        theme: "classic", // or 'monolith', or 'nano'
        default: defaut,
        position: 'top',
        components: {
          // Main components
          preview: true,
          opacity: true,
          hue: true,

          // Input / output Options
          interaction: {
            rgba: true,
            input: true,
            save: true
          }
        }
      });

      window[vari].on("save", (color, instance) => {
        window[vari].hide();
        color1 = color.toRGBA();

        browser.runtime
          .sendMessage({
            [title]:
              "rgba(" +
              color1[0] +
              "," +
              color1[1] +
              "," +
              color1[2] +
              "," +
              color1[3] +
              ")"
          })
          .then(response => {
            console.log(title + " :" + color1);
          });
      });
    }
  }

  var gettingAdv = browser.runtime.getBackgroundPage();
  gettingAdv.then(onGotAdv, onErrorAdv);

  function onErrorAdv(error) {
    console.log(`Error: ${error}`);
  }
});
