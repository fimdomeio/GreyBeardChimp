// Recommended filename: Given_I'm_at_the_home_page.js

module.exports = function () {
  var baseUrl = 'http://localhost:3000';
  
  var redCursor = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAYAAABvVQZ0AAABhGlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kb9LQlEUxz9pUWThkENEg4M0RD8tpLYywoqIMAOtFn3+CrQe7ykRjQ2tDQ79oKWIlubaon8gCIJqiqA1GgpaQl7nqqBEnsu993O/95xz7z0XbOGMljUbhyC7kTOCAb87HFlxN79iowsHg9ijmqlPLi7OU9e+H2lQ80O/ylXf719zxBOmBg0twhOabuSEZ4QXtnK64gNhl5aOxoUvhfsMuaDws9JjZX5XnCqxTeV0GaHglLBL2J2q4VgNa2kjKzwq7Mlm8lrlPuolbYmN5SWlS+/GJEgAP25mmWYKH8OMy+ijHy8DsqJOvLcUv8CmxGoy6mxjsE6KNDn6RM1L9oTMSdET0jLiIab+4G9tzeSIt3xC2xw0vVnWVy80H0Nxz7J+Ti2reAZ2qcttoRq/WYCxD9H3q5rnBJy7cHVT1WLncL0PnS961IiWJLt0WzIJnxfQHoGOe2hdLdetss/ZE4R2YP4ODo+gR/yda7/2jGczivU7CAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAm9JREFUOI2VlLFuE0EQhv+Z3btLYoFJBJGQrOgSHQjJHb2fgcZWJEp4DwqehN5+BijcUNNygkviKMRISHZIbO/tzlAkZ4WLA8nfnG408++n/TVLWC1O09RYaw0AeO9DURQBgNzSfzm0qtZut6NEtRkWbhYWbpaoNtvtdnRL/1JU/0/T1MYizVLxc9jrAgA6/QEiwhPHPCmKwgPQu5JFpTGb9aJj3vLex1cztAIEtk4WxzGX8/n6jVNVN621093tXaMb6r335bPRKHy6pNQ6GQEg5xwTkambqehnCnKCJEwoyHkURVtHWdZotVq28qnMOE1Tu7Ozkxhj1gBEdbNhr4vqDoe9LuDDj7Bw0zWiR1U4jGvpGcW5uPKUgOaNm1yhYa+LABqXZ2cP0jQ1lKZplKg2nehf6S0J/qNOfwBY81xVj9laaxZED+sn3kshrMdxzMsAmOlVRVQ3rOr173KWyIQQiL33IRaZKnDKht/UG+8iUQ3GGOWiKILE8W9lPlbB4X1MOv0BDPG+Ms+dc8IAJM9zx8wTNXTCxPv3oRPSMYCp976sVoJarZZNgE01ZpdBL4LIh38F0ekPYNi8BukXWHuY5/l5FYCORqNgG40pqx4J4ath83YV4fWaqI4h8uvi4mIBQOvLynt7e4kReSxCmWj4WDdjw+8kyHsAIKaXAfh2cHBwBkBubD4AzrKsAe+fqlIG1W0wYigEhBlU5yBSBSYMfPfAj6IoZgC0/moAgHrv57H3Y7HWC/SIQIaURJRKgncizEzBGdUJksRVg6vIAICyLDMiEtn53MjGBgGAcy5Ya1VEKEkSCSH4PM8Drp6gP137Qtk1FZkoAAAAAElFTkSuQmCC';
  var fakeMousePos = {x: 0, y:0};
  
  this.Given(/^I'm at the home page$/, function () {
      browser.url(baseUrl);
  });

// Recommended filename: Then_I_see_#.js
  this.Then(/^I see "([^"]*)"$/, function (term) {
    browser.getHTML("//*[contains(text(), '" + term + "')]");
  });

  this.Then(/^I don't see "([^"]*)"$/, function (term) {
    var bodyHtml = browser.getHTML("body");
    expect(bodyHtml.indexOf(term)).toBe(-1);
  });

  this.When(/^I fill "([^"]*)" with "([^"]*)"$/, function (name, content) {
    moveMouseTo('input[name=' + name + ']'); 
    browser.setValue('input[name=' + name + ']', content);
    browser.pause(500); 
  });
  this.When(/^I press "([^"]*)"$/, function (key) { 
    browser.keys([key]);
  });

  var moveMouseTo = function (el) {
    var elLocation = browser.getLocation(el);
    if (elLocation.length) {
      elLocation = elLocation[0];
    }

    elLocation.x += 10;
    elLocation.y += 10;  
    browser.execute("var d1 = document.querySelector('body'); d1.insertAdjacentHTML('beforeend', '<div id=\"testCursor\" style=\"position:absolute;z-index:9000; top:" + (fakeMousePos.y + 5) + "px;left:" + (fakeMousePos.x + 5) + "px;width:19px;height:20px;background: url("+redCursor+") no-repeat;\"></div>');")
    while(elLocation.x != Math.round(fakeMousePos.x) || elLocation.y != Math.round(fakeMousePos.y)){
      fakeMousePos.x += (elLocation.x - fakeMousePos.x)*0.1;
      fakeMousePos.y += (elLocation.y - fakeMousePos.y)*0.1; 
      browser.execute('document.querySelector(\"#testCursor\").style.top = "' + fakeMousePos.y + 'px";');
      browser.execute('document.querySelector(\"#testCursor\").style.left = "' + fakeMousePos.x +'px";' );
      
      //browser.pause(5);
    }
    browser.pause(500);
    browser.execute('document.querySelector("#testCursor").remove();')
  }

  this.When(/^I click the "([^"]*)" element$/, function (el) {
      browser.waitForExist(el);
      browser.pause(500);
      moveMouseTo(el);
      browser.click(el); 
  });
};
