function onError(error) {
  console.error(`Error: ${error}`);
}

window.addEventListener("DOMContentLoaded", () => {
  function onGot(page) {
    if (!page.url.includes("youtube")) {
      $(".container").hide();
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
      let font = document.getElementById("fontSelector");
      font.addEventListener("change", function(e) {
        browser.runtime.sendMessage({
          font: e.target.value
        });
      });

      font.value = page.font;

      var rad = document.getElementsByName("theme");
      var length = document.getElementsByName("theme").length;

      var prev = null;
      for (var i = 0; i < length; i++) {
        rad[i].addEventListener("change", function() {
          prev ? "" : null;
          if (this !== prev) {
            prev = this;
          }
          browser.runtime.sendMessage({
            theme: this.value
          });
        });
      }

      const pickr = Pickr.create({
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

      const pickr2 = Pickr.create({
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

      const pickr3 = Pickr.create({
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

      const pickr4 = Pickr.create({
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

      const pickr5 = Pickr.create({
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

      const pickr6 = Pickr.create({
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
          .then(response => {
            console.log("color 1 :" + color1);
          })
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
          .then(response => {
            console.log("color 2 :" + color2);
          })
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
          .then(response => {
            console.log("color 3 :" + color3);
          })
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
          .then(response => {
            console.log("color 4 :" + color4);
          })
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
          .then(response => {
            console.log("color 5 :" + color5);
          })
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
          .then(response => {
            console.log("color 6 :" + color6);
          })
          .catch(onError);
      });
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
        width: 800,
        height: 800
      });
    });

  function onError(error) {
    console.log(`Error: ${error}`);
  }
});
