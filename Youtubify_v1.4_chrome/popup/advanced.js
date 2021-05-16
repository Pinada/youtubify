window.addEventListener("DOMContentLoaded", () => {
  function onGotAdv(page) {
    /**** Have to find a better solution */
    for (let k = 2; k < 38; k++) {
      if (page["Pcolor" + k].split("-")[0] == "ch") {
        $("#check" + k).prop("checked", true);
      }
      if (page["Pcolor" + k].split("-")[0] == "unch") {
        $("#check" + k).prop("checked", false);
      }
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

    for (let j = 2; j < 38; j++) {
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
            ["Pcolor" + j]: page["Pcolor" + j].split("-")[1],
            ["pickr" + j]: "ch"
          });
          page["Pcolor" + j] == null;
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
            ["Pcolor" + j]: page["Pcolor" + j].split("-")[1],
            ["pickr" + j]: "unch"
          });
          page["Pcolor" + j] == null;
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
    for (let l = 2; l < 38; l++) {
      createpickr(
        "#cpicker" + l,
        page["Pcolor" + l],
        "pickr" + l,
        "Pcolor" + l
      );
    }

    for (let j = 2; j < 38; j++) {
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
    function createpickr(vari, defaut, pickr, color1) {
      console.log(defaut.split("-")[1]);
      let color2;
      window[vari] = Pickr.create({
        el: vari,
        theme: "classic", // or 'monolith', or 'nano'
        default: defaut.split("-")[1],

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
      });
      window[vari].on("change", (color, instance) => {
        // window[vari].hide();
        color2 = color.toRGBA();

        browser.runtime
          .sendMessage({
            [pickr]: "ch",
            [color1]:
              "rgba(" +
              color2[0] +
              "," +
              color2[1] +
              "," +
              color2[2] +
              "," +
              color2[3] +
              ")"
          })
          .then(response => {});
      });
    }
  }

  var gettingAdv = browser.runtime.getBackgroundPage();
  gettingAdv.then(onGotAdv, onErrorAdv);

  function onErrorAdv(error) {
    console.log(`Error: ${error}`);
  }

  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
});
