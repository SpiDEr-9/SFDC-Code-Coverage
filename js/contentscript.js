var cookie,
  initrun = !1,
  currentinnerhtml = null,
  oldHtml = null,
  isCalled = 0;

function initTotal() {
    // isCalled = 1;
    //console.log('init --- ');
  chrome.storage.sync.get("toggle", function (e) {
    if (1 == 1) {
      initrun = !0;
      let t = window.location,
        d = [],
        totalCoveredLines = [],
        totalUnCoveredLines = [],
        actualCodeLines = [],
        allLines = [],
        s = [],
        h = getValueFromCookie("sid");
        // //console.log('OUTPUT : ',allLines);

        // //console.log(' val  t--- '+t);
    // //console.log('init --- '+ d + ' r--- '+ r + ' g--- '+ g + ' c--- '+ c + ' a--- '+ a + ' s--- '+ s + ' h--- '+ h);
      if (
        (d = String(t).split("salesforce.com/")).length > 1 &&
        (String(d[1]).startsWith("01p") ||
          String(d[1]).startsWith("01q") ||
          String(d[1]).includes("setup/build/viewApexClass.apexp") ||
          String(d[1]).includes("setup/build/viewApexTrigger.apexp"))
      ) {
        let p;
        d.length > 1 &&
          (p =
            String(d[1]).includes("setup/build/viewApexClass.apexp") ||
            String(d[1]).includes("setup/build/viewApexTrigger.apexp")
              ? String(d[1]).split("=")[1].substring(0, 15)
              : String(d[1]).substring(0, 15));
        var u = new XMLHttpRequest();
        u.open(
          "GET",
          d[0] +
            "salesforce.com/services/data/v39.0/tooling/query?q=SELECT+id,numlinescovered,coverage+FROM+apexcodecoverageaggregate+where+ApexClassOrTriggerId='" +
            p +
            "'",
          !0
        ),
          u.setRequestHeader("Authorization", "Bearer " + h),
          (u.onreadystatechange = function () {
            if (4 == this.readyState && 200 == this.status) {
              var e = JSON.parse(u.responseText).records;
              for (i = 0; i < e.length; i++) {
                var h = e[i].Coverage.coveredLines;
                e[i].Coverage.uncoveredLines;
                for (j = 0; j < h.length; j++)
                  -1 == totalCoveredLines.indexOf(String(h[j])) && totalCoveredLines.push(String(h[j]));
              }
              //console.log(' val  r--- '+totalCoveredLines);
              
              for (k = 0; k < e[0].Coverage.coveredLines.length; k++)
                actualCodeLines.push(String(e[0].Coverage.coveredLines[k]));
              //console.log(' val  c1--- '+actualCodeLines);
              for (l = 0; l < e[0].Coverage.uncoveredLines.length; l++)
                actualCodeLines.push(String(e[0].Coverage.uncoveredLines[l]));
              //console.log(' val  c2--- '+actualCodeLines);
              for (m = 0; m < actualCodeLines.length; m++)
                -1 == totalCoveredLines.indexOf(String(actualCodeLines[m])) &&
                  -1 == totalUnCoveredLines.indexOf(String(actualCodeLines[m])) &&
                  totalUnCoveredLines.push(String(actualCodeLines[m]));

                  //console.log(' val  g--- '+totalUnCoveredLines);
              if (
                (d = String(t).split("salesforce.com/")).length > 1 &&
                (String(d[1]).startsWith("01p") ||
                  String(d[1]).startsWith("01q") ||
                  String(d[1]).includes("setup/build/viewApexClass.apexp") ||
                  String(d[1]).includes("setup/build/viewApexTrigger.apexp"))
              ) {
                let p;
                if(isCalled == 0){
                    isCalled = 1;
                    String(d[1]).startsWith("01p") ||
                  String(d[1]).includes("setup/build/viewApexClass.apexp")
                    ? (p = document.getElementById(
                        "ApexClassViewPage:theTemplate:theForm:thePageBlock:j_id70:j_id71:j_id74:0:j_id77"
                      ))
                      ? (p = document.getElementById(
                          "ApexClassViewPage:theTemplate:theForm:thePageBlock:j_id70:j_id71:j_id74:0:j_id77"
                        ).innerHTML)
                      : (p = document.getElementById(
                          "ApexClassViewPage:theTemplate:theForm:thePageBlock:codeBlock:codeBlockItem:codeTable:0:j_id71"
                        )) &&
                        (p = document.getElementById(
                          "ApexClassViewPage:theTemplate:theForm:thePageBlock:codeBlock:codeBlockItem:codeTable:0:j_id71"
                        ).innerHTML)
                    : (String(d[1]).startsWith("01q") ||
                        String(d[1]).includes(
                          "setup/build/viewApexTrigger.apexp"
                        )) &&
                      (null !=
                      document.getElementById(
                        "ApexTriggerViewPage:theTemplate:theForm:thePageBlock:j_id78:j_id79:j_id82:0:j_id85"
                      )
                        ? (p = document.getElementById(
                            "ApexTriggerViewPage:theTemplate:theForm:thePageBlock:j_id78:j_id79:j_id82:0:j_id85"
                          ).innerHTML)
                        : null !=
                            document.getElementById(
                              "ApexTriggerViewPage:theTemplate:theForm:thePageBlock:codeBlock:codeBlockItem:codeTable:0:j_id72"
                            ) &&
                          (p = document.getElementById(
                            "ApexTriggerViewPage:theTemplate:theForm:thePageBlock:codeBlock:codeBlockItem:codeTable:0:j_id72"
                          ).innerHTML));
                          oldHtml = p;
                          p = String(p).replace(/&nbsp;/g, " ");

                }else{
                    p = oldHtml;
                    p = String(p).replace(/&nbsp;/g, " ");

                }
                for (allLines = p.split("<br>"), n = 0; n < allLines.length; n++ ){
                    "" == allLines[n].trim && allLines.splice(n, 1);
                    //console.log('OUTPUT : allLines'+ n + '---'+allLines[n]);
                }
                //console.log('all lines len-->'+allLines.length);
                
                for (o = 0; o < allLines.length; o++)
                  -1 != totalCoveredLines.indexOf(String(o + 1)) // as code lines atrts from 1 not 0
                    ? s.push(
                        '<span style="background:#7cfc00">' +
                          allLines[o] +
                          "</span><br>"
                      )
                    : -1 != totalUnCoveredLines.indexOf(String(o + 1))// as code lines atrts from 1 not 0
                    ? s.push(
                        '<span style="background:#f08080">' +
                          allLines[o] +
                          "</span><br>"
                      )
                    : s.push("<span>" + allLines[o] + "</span><br>");
                String(d[1]).startsWith("01p") ||
                String(d[1]).includes("setup/build/viewApexClass.apexp")
                  ? null !=
                    document.getElementById(
                      "ApexClassViewPage:theTemplate:theForm:thePageBlock:j_id70:j_id71:j_id74:0:j_id77"
                    )
                    ? ((document.getElementById(
                        "ApexClassViewPage:theTemplate:theForm:thePageBlock:j_id70:j_id71:j_id74:0:j_id77"
                      ).innerHTML = s.join("")),
                      (currentinnerhtml = s.join("")))
                    : null !=
                        document.getElementById(
                          "ApexClassViewPage:theTemplate:theForm:thePageBlock:codeBlock:codeBlockItem:codeTable:0:j_id71"
                        ) &&
                      ((document.getElementById(
                        "ApexClassViewPage:theTemplate:theForm:thePageBlock:codeBlock:codeBlockItem:codeTable:0:j_id71"
                      ).innerHTML = s.join("")),
                      (currentinnerhtml = s.join("")))
                  : (String(d[1]).startsWith("01q") ||
                      String(d[1]).includes(
                        "setup/build/viewApexTrigger.apexp"
                      )) &&
                    (null !=
                    document.getElementById(
                      "ApexTriggerViewPage:theTemplate:theForm:thePageBlock:j_id78:j_id79:j_id82:0:j_id85"
                    )
                      ? ((document.getElementById(
                          "ApexTriggerViewPage:theTemplate:theForm:thePageBlock:j_id78:j_id79:j_id82:0:j_id85"
                        ).innerHTML = s.join("")),
                        (currentinnerhtml = s.join("")))
                      : null !=
                          document.getElementById(
                            "ApexTriggerViewPage:theTemplate:theForm:thePageBlock:codeBlock:codeBlockItem:codeTable:0:j_id72"
                          ) &&
                        ((document.getElementById(
                          "ApexTriggerViewPage:theTemplate:theForm:thePageBlock:codeBlock:codeBlockItem:codeTable:0:j_id72"
                        ).innerHTML = s.join("")),
                        (currentinnerhtml = s.join(""))));
              
                        

                    }
            }
          }),
          u.send();
      }
    }
    //console.log('OUTPUT : after------',e.toggle);
  });
}
function getValueFromCookie(e) {
  var t,
    i,
    l,
    n = document.cookie.split(";");
  for (t = 0; t < n.length; t++)
    if (
      ((i = n[t].substr(0, n[t].indexOf("="))),
      (l = n[t].substr(n[t].indexOf("=") + 1)),
      (i = i.replace(/^\s+|\s+$/g, "")),
      i == e)
    )
      return unescape(l);
}
chrome.runtime.onMessage.addListener(function (e, t, i) {
  "toggled" == e.type &&
    chrome.storage.sync.get("toggle", function (e) {
      if (
        (1 == e.toggle &&
          (0 == initrun
            ? initTotal()
            : 1 == initrun &&
              null != currentinnerhtml &&
              (null !=
              document.getElementById(
                "ApexClassViewPage:theTemplate:theForm:thePageBlock:j_id70:j_id71:j_id74:0:j_id77"
              )
                ? (document.getElementById(
                    "ApexClassViewPage:theTemplate:theForm:thePageBlock:j_id70:j_id71:j_id74:0:j_id77"
                  ).innerHTML = currentinnerhtml)
                : null !=
                  document.getElementById(
                    "ApexClassViewPage:theTemplate:theForm:thePageBlock:codeBlock:codeBlockItem:codeTable:0:j_id71"
                  )
                ? (document.getElementById(
                    "ApexClassViewPage:theTemplate:theForm:thePageBlock:codeBlock:codeBlockItem:codeTable:0:j_id71"
                  ).innerHTML = currentinnerhtml)
                : null !=
                  document.getElementById(
                    "ApexTriggerViewPage:theTemplate:theForm:thePageBlock:j_id78:j_id79:j_id82:0:j_id85"
                  )
                ? (document.getElementById(
                    "ApexTriggerViewPage:theTemplate:theForm:thePageBlock:j_id78:j_id79:j_id82:0:j_id85"
                  ).innerHTML = currentinnerhtml)
                : null !=
                    document.getElementById(
                      "ApexTriggerViewPage:theTemplate:theForm:thePageBlock:codeBlock:codeBlockItem:codeTable:0:j_id72"
                    ) &&
                  (document.getElementById(
                    "ApexTriggerViewPage:theTemplate:theForm:thePageBlock:codeBlock:codeBlockItem:codeTable:0:j_id72"
                  ).innerHTML = currentinnerhtml))),
        0 == e.toggle)
      ) {
        var t = null;
        if (
          (null !=
          document.getElementById(
            "ApexClassViewPage:theTemplate:theForm:thePageBlock:j_id70:j_id71:j_id74:0:j_id77"
          )
            ? (t = document.getElementById(
                "ApexClassViewPage:theTemplate:theForm:thePageBlock:j_id70:j_id71:j_id74:0:j_id77"
              ))
            : null !=
              document.getElementById(
                "ApexClassViewPage:theTemplate:theForm:thePageBlock:codeBlock:codeBlockItem:codeTable:0:j_id71"
              )
            ? (t = document.getElementById(
                "ApexClassViewPage:theTemplate:theForm:thePageBlock:codeBlock:codeBlockItem:codeTable:0:j_id71"
              ))
            : null !=
              document.getElementById(
                "ApexTriggerViewPage:theTemplate:theForm:thePageBlock:j_id78:j_id79:j_id82:0:j_id85"
              )
            ? (t = document.getElementById(
                "ApexTriggerViewPage:theTemplate:theForm:thePageBlock:j_id78:j_id79:j_id82:0:j_id85"
              ))
            : null !=
                document.getElementById(
                  "ApexTriggerViewPage:theTemplate:theForm:thePageBlock:codeBlock:codeBlockItem:codeTable:0:j_id72"
                ) &&
              (t = document.getElementById(
                "ApexTriggerViewPage:theTemplate:theForm:thePageBlock:codeBlock:codeBlockItem:codeTable:0:j_id72"
              )),
          null != t && null != t.children)
        )
          for (var i = 0; i < t.children.length; i++)
            null != t.children[i].style && (t.children[i].style = "");
      }
    });
}),
  initBtn();
function initBtn(){
    // let divToAdd = document.getElementById("ApexClassViewPage:theTemplate:theForm:thePageBlock:j_id27")
    //                     let btn = document.createElement("button");
    //                     btn.onclick = function(e) {
    //                         e.preventDefault();
    //                         //console.log('bhush btn click------- ');
    //                         initTotal();
    //                     };
    //                     // btn.onc .appendChild(document.createElement("button"))
    //                     // btn.innerHTML = "Show Coverage";
    //                     divToAdd.appendChild(btn);
}