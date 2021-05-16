function onError(error) {
  console.error(`Error: ${error}`);
}

window.addEventListener("DOMContentLoaded", () => {
  function onGot(page) {
    if (!page.url.includes("youtube")) {
      $(".container").hide();
      $(".mainContent").hide();
      $("#main").after(
        "<h2 style='text-align:center;color:#292929'>Head over to youtube to modify the page !</h2>"
      );
      $("html").css("height", "200px");
      $("body").css("height", "200px");
    }

    if (page.url.includes("youtube") || page.url.includes("advanced.html")) {
      $("#main")
        .next()
        .remove();
      $(".container").show();
      $(".mainContent").show();
      let font = document.getElementById("fontSelector");
      font.addEventListener("change", function(e) {
        browser.runtime.sendMessage({
          font: e.target.value
        });
      });

      font.value = page.font;

      var pickr = Pickr.create({
        el: "#colorPicker1",
        theme: "nano", // or 'monolith', or 'nano'
        default: page.color1,

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

      var pickr2 = Pickr.create({
        el: "#colorPicker2",
        theme: "nano", // or 'monolith', or 'nano'
        default: page.color2,

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

      var pickr3 = Pickr.create({
        el: "#colorPicker3",
        theme: "nano", // or 'monolith', or 'nano'
        default: page.color3,

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

      var pickr4 = Pickr.create({
        el: "#colorPicker4",
        theme: "nano", // or 'monolith', or 'nano'
        default: page.color4,

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

      var pickr5 = Pickr.create({
        el: "#colorPicker5",
        theme: "nano", // or 'monolith', or 'nano'
        default: page.color5,

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

      var pickr6 = Pickr.create({
        el: "#colorPicker6",
        theme: "nano", // or 'monolith', or 'nano'
        default: page.color6,

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

      var color1;
      var color2;
      var color3;
      var color4;
      var color5;
      var color6;
      pickr.on("save", (color, instance) => {
        pickr.hide();

        color1 = color.toRGBA();
        browser.runtime
          .sendMessage({
            color1:
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
          .then(response => {})
          .catch(onError);
      });

      pickr2.on("save", (color, instance) => {
        pickr2.hide();
        color2 = color.toRGBA();
        browser.runtime
          .sendMessage({
            color2:
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
          .then(response => {})
          .catch(onError);
      });

      pickr3.on("save", (color, instance) => {
        pickr3.hide();
        color3 = color.toRGBA();
        browser.runtime
          .sendMessage({
            color3:
              "rgba(" +
              color3[0] +
              "," +
              color3[1] +
              "," +
              color3[2] +
              "," +
              color3[3] +
              ")"
          })
          .then(response => {})
          .catch(onError);
      });

      pickr4.on("save", (color, instance) => {
        pickr4.hide();
        color4 = color.toRGBA();
        browser.runtime
          .sendMessage({
            color4:
              "rgba(" +
              color4[0] +
              "," +
              color4[1] +
              "," +
              color4[2] +
              "," +
              color4[3] +
              ")"
          })
          .then(response => {})
          .catch(onError);
      });
      pickr5.on("save", (color, instance) => {
        pickr5.hide();
        color5 = color.toRGBA();
        browser.runtime
          .sendMessage({
            color5:
              "rgba(" +
              color5[0] +
              "," +
              color5[1] +
              "," +
              color5[2] +
              "," +
              color5[3] +
              ")"
          })
          .then(response => {})
          .catch(onError);
      });
      pickr6.on("save", (color, instance) => {
        pickr6.hide();
        color6 = color.toRGBA();
        browser.runtime
          .sendMessage({
            color6:
              "rgba(" +
              color6[0] +
              "," +
              color6[1] +
              "," +
              color6[2] +
              "," +
              color6[3] +
              ")"
          })
          .then(response => {})
          .catch(onError);
      });

      var rad = document.getElementsByName("theme");
      var length = document.getElementsByName("theme").length;

      var prev = null;
      for (var i = 0; i < length; i++) {
        rad[i].addEventListener("change", function() {
          prev ? "" : null;
          if (this !== prev) {
            prev = this;
          }
          if (this.value == "Alien Invasion") {
            pickr.setColor("rgba(33, 232, 153, 1)");
            pickr2.setColor("rgba(197, 208, 191, 1)");
            pickr3.setColor("rgba(31, 41, 52, 1)");
            pickr4.setColor("rgba(29, 35, 44, 1)");
            pickr5.setColor("rgba(49, 218, 160, 1)");
            pickr6.setColor("rgba(225, 255, 242, 1)");
          } else if (this.value == "Original") {
            pickr.setColor("rgba(227, 43, 58, 1)");
            pickr2.setColor("rgba(178, 178, 178, 1)");
            pickr3.setColor("rgba(24, 25, 39, 1)");
            pickr4.setColor("rgba(21, 21, 33, 1)");
            pickr5.setColor("rgba(173, 173, 173, 1)");
            pickr6.setColor("rgba(253, 253, 253, 1)");
          }
          browser.runtime.sendMessage({
            theme: this.value
          });
        });
      }
    }
  }

  document.getElementById("logo").style.backgroundImage =
    "url('" + browser.runtime.getURL("../images/logo.png") + "')";

  var getting = browser.runtime.getBackgroundPage();
  getting.then(onGot, onError);

  document
    .getElementsByClassName("button")[0]
    .addEventListener("click", function() {
      browser.windows.create({
        url: browser.extension.getURL("popup/advanced.html"),
        type: "popup",
        width: 650,
        height: 500
      });
    });

  function onError(error) {
    console.log(`Error: ${error}`);
  }
});
