var cookie,
  initrun = !1,
  currentinnerhtml = null,
  oldHtml = null,
  isCalled = 0,
  isSlectAddec = 0,
  d = [],
  totalCoveredLines = [],
  totalUnCoveredLines = [],
  actualCodeLines = [],
  allLines = [],
  s = [];
const methodWiseCoveredLines = new Map();
const methodWiseUnCoveredLines = new Map();
const coveredLinesSet = new Set();
const unCoveredLinesSet = new Set();

function handleTestMethodSelect(keyName) {
  if (keyName == "All Methods") {
    showAllCoverage(totalCoveredLines, totalUnCoveredLines, false);
  } else {
    showAllCoverage(
      methodWiseCoveredLines.get(keyName),
      methodWiseUnCoveredLines.get(keyName),
      true
    );
  }
}

function showAllCoverage(covredLines, unCoveredLines, isString) {
  let t = window.location;

  if (
    (d = String(t).split("salesforce.com/")).length > 1 &&
    (String(d[1]).startsWith("01p") ||
      String(d[1]).startsWith("01q") ||
      String(d[1]).includes("setup/build/viewApexClass.apexp") ||
      String(d[1]).includes("setup/build/viewApexTrigger.apexp"))
  ) {
    let p;
    if (isCalled == 0) {
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
            String(d[1]).includes("setup/build/viewApexTrigger.apexp")) &&
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
    } else {
      p = oldHtml;
      p = String(p).replace(/&nbsp;/g, " ");
    }
    allLines = [];
    s = [];
    for (allLines = p.split("<br>"), n = 0; n < allLines.length; n++) {
      "" == allLines[n].trim && allLines.splice(n, 1);
    }

    for (o = 0; o < allLines.length; o++) {
      let indexEle = o + 1;
      if (covredLines.includes(indexEle)) {
        // as code lines start from 1 not 0
        s.push(
          '<span style="background:#c0df94">' + allLines[o] + "</span><br>"
        );
      } else if (unCoveredLines.includes(indexEle)) {
        // as code lines start from 1 not 0
        s.push(
          '<span style="background:#f08080">' + allLines[o] + "</span><br>"
        );
      } else {
        s.push("<span>" + allLines[o] + "</span><br>");
      }
    }

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
          String(d[1]).includes("setup/build/viewApexTrigger.apexp")) &&
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

function init() {
  let methodNameOptions = [];

  chrome.storage.sync.get("toggle", function (e) {
    if (1 == 1) {
      initrun = !0;
      let t = window.location,
        h = getValueFromCookie("sid");

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
            "salesforce.com/services/data/v39.0/tooling/query?q=select+id,ApexClassOrTrigger.name,TestMethodName,ApexTestClass.Name,NumLinesCovered,NumLinesUncovered,Coverage+from+ApexCodeCoverage+where+ApexClassOrTriggerId='" +
            p +
            "'" +
            " order+by+ApexTestClass.name",
          !0
        ),
          u.setRequestHeader("Authorization", "Bearer " + h),
          (u.onreadystatechange = function () {
            if (4 == this.readyState && 200 == this.status) {
              var e = JSON.parse(u.responseText).records;

              let dummyUncoveredLines = [];
              let dummyCoveredLines = [];
              for (i = 0; i < e.length; i++) {
                //let className = e[i].ApexClassOrTrigger.Name; //no need as we are querying single class by id
                let methodName = e[i].TestMethodName;
                let coveredLines = e[i].Coverage.coveredLines;
                let UncoveredLines = e[i].Coverage.uncoveredLines;
                let ApexTestClass = e[i].ApexTestClass.Name;
                let classMethodName = ApexTestClass + "." + methodName;

                methodNameOptions.push(classMethodName);
                methodWiseCoveredLines.set(classMethodName, coveredLines);
                methodWiseUnCoveredLines.set(classMethodName, UncoveredLines);
                dummyCoveredLines = [...dummyCoveredLines, ...coveredLines];
                dummyUncoveredLines = [
                  ...dummyUncoveredLines,
                  ...UncoveredLines,
                ];
              }
              dummyCoveredLines.sort((a, b) => a - b);
              dummyCoveredLines.forEach((line) => {
                coveredLinesSet.add(line);
              });

              dummyUncoveredLines.sort((a, b) => a - b);
              dummyUncoveredLines.forEach((line) => {
                if (!coveredLinesSet.has(line)) {
                  unCoveredLinesSet.add(line);
                }
              });

              totalCoveredLines = [...coveredLinesSet];
              totalUnCoveredLines = [...unCoveredLinesSet];
              actualCodeLines = [...actualCodeLines, ...totalCoveredLines];
              actualCodeLines = [...actualCodeLines, ...totalUnCoveredLines];
              actualCodeLines.sort((a, b) => a - b);

              showAllCoverage(totalCoveredLines, totalUnCoveredLines, false);

              if (!isSlectAddec) {
                let divToAdd = document.getElementById(
                  "ApexClassViewPage:theTemplate:theForm:thePageBlock:j_id27"
                );
                let div = document.createElement("div");
                div.style =
                  "margin-top: 1em; margin-bottom: 1em;     position: fixed; z-index: 100; background-color: white; margin-left : 1em;";
                divToAdd.appendChild(div);
                let selectElement = document.createElement("select");
                selectElement.id = "methodNameSelect";
                selectElement.style =
                  "padding-left: 1em; border-radius: 5px; font-weight: 500; height: 2rem;color: white; background-image: linear-gradient(to right, #364152, #157d95);";
                selectElement.onchange = function (e) {
                  let key = e.target.value;
                  handleTestMethodSelect(key);
                };
                div.appendChild(selectElement);
                let option = document.createElement("option");
                option.value = "All Methods";
                option.text = "All Methods";
                option.style = "color: white; background-color: #364152;";
                selectElement.appendChild(option);
                methodNameOptions.forEach((opt) => {
                  let option = document.createElement("option");
                  option.value = opt;
                  option.text = opt;
                  option.style = "color: white; background-color: #364152;";
                  selectElement.appendChild(option);
                });
                isSlectAddec = !0;
              }
            }
          }),
          u.send();
      }
    }
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
            ? init()
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
function initBtn() {
  let divToAdd = document.getElementById(
    "ApexClassViewPage:theTemplate:theForm:thePageBlock:j_id27"
  );
  let btn = document.createElement("button");
  btn.onclick = function (e) {
    e.preventDefault();
    init();
  };
  btn.style =
    "display: inline-block; outline: none; cursor: pointer; padding: 0px 16px; border-radius: 0.25rem; border: 1px solid rgb(0, 112, 210); font-size: 13px; line-height: 2em; text-align: center; background: #039BD5; color: white;";
  btn.innerHTML = "Show Coverage";
  divToAdd.appendChild(btn);
}
