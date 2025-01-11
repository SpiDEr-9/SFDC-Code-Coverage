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

    
    // console.log('OUTPUT : handleTestMethodSelect-- ',methodWiseCoveredLines.get(keyName));
    // console.log('OUTPUT : handleTestMethodSelect-- ',methodWiseUnCoveredLines.get(keyName));

    if (keyName == 'All Methods') {
        showAllCoverage(totalCoveredLines,totalUnCoveredLines,false);
    }else{
        showAllCoverage(methodWiseCoveredLines.get(keyName),methodWiseUnCoveredLines.get(keyName),true);
    }
}



function showAllCoverage(covredLines,unCoveredLines,isString) {
    console.log('check is arra---'+Array.isArray(covredLines)+ '    unco--- '+Array.isArray(unCoveredLines));
    let t = window.location;
    console.log('OUTPUT : showAllCoverage-- covredLines \n'+ covredLines);
    console.log('OUTPUT : showAllCoverage-- uncov \n'+ unCoveredLines);
    // console.log('OUTPUT : showAllCoverage-- called');
  
                
                console.log('actualC Code lines---------'+ actualCodeLines.length);
              if (
                (d = String(t).split("salesforce.com/")).length > 1 &&
                (String(d[1]).startsWith("01p") ||
                  String(d[1]).startsWith("01q") ||
                  String(d[1]).includes("setup/build/viewApexClass.apexp") ||
                  String(d[1]).includes("setup/build/viewApexTrigger.apexp"))
              ) {
                console.log('inside 1st if---------');
                
                let p;
                if(isCalled == 0){
                    console.log('inside 2nd if---------');
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
                          
                    console.log('inside 3rd if---------');

                }else{
                    
                    console.log('/inside 4th if---------');
                    p = oldHtml;
                    p = String(p).replace(/&nbsp;/g, " ");

                }
                allLines = [];
                s =[];
                // console.log('inside 5th after else---------');
                for (allLines = p.split("<br>"), n = 0; n < allLines.length; n++ ){
                    "" == allLines[n].trim && allLines.splice(n, 1);
                    // console.log('OUTPUT : allLines'+ n + '---'+allLines[n]);
                }
                // console.log('inside 555rd if allLines len---------'+allLines.length);
                // console.log('inside 555rd if allLines len co---------'+totalCoveredLines);
                // console.log('inside 555rd if allLines len uncov---------'+totalUnCoveredLines);
                // console.log('all lines len-->'+allLines.length);
                
                // console.log('check type----'+typeof covredLines[0]);
                // console.log('check type----'+typeof unCoveredLines[0]);
                
                
                for (o = 0; o < allLines.length; o++){
                    // console.log('inside for lines-------'+ String(o + 1));
                    let indexEle = o + 1;
                    // console.log('inside indexEle-------'+ indexEle + '   type--->' +typeof indexEle);
                    
                    // console.log('index---'+indexEle+'  inside cover  -------'+ covredLines.includes((indexEle))+'   inside uncover -------'+ unCoveredLines.includes((indexEle))+ '  end----');
                    // console.log('inside UncovCoveredLines -------'+ (unCoveredLines.indexOf(indexEle) != -1));
                if (covredLines.includes((indexEle))) { // as code lines start from 1 not 0
                    // console.log('fuck this ss covred line----'+indexEle+' inline--'+allLines[o]);

                    s.push(
                        '<span style="background:#7cfc00">' +
                        allLines[o] +
                        "</span><br>"
                    );
                } else if (unCoveredLines.includes((indexEle))) { // as code lines start from 1 not 0
                    // console.log('uncovred line'+indexEle+' inline--'+allLines[o]);
                    
                    s.push(
                        '<span style="background:#f08080">' +
                        allLines[o] +
                        "</span><br>"
                    );
                } else {                    
                    s.push("<span>" + allLines[o] + "</span><br>");
                }
                }
                    // console.log('after for lines-------'+s);
                    
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
              
                        // console.log('OUTPUT : showAllCoverage-- end \n'+ s);
                        

                    }
}


  

function init() {

    let methodNameOptions = [];
    // isCalled = 1;
    // console.log('init --- ');
  chrome.storage.sync.get("toggle", function (e) {
    if (1 == 1) {
      initrun = !0;
      let t = window.location,
        
        h = getValueFromCookie("sid");
        // console.log('OUTPUT : ',allLines);

        // console.log(' val  t--- '+t);
    // console.log('init --- '+ d + ' r--- '+ r + ' g--- '+ g + ' c--- '+ c + ' a--- '+ a + ' s--- '+ s + ' h--- '+ h);
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
            "'"+ " order+by+ApexTestClass.name",
          !0
        ),
          u.setRequestHeader("Authorization", "Bearer " + h),
          (u.onreadystatechange = function () {
            if (4 == this.readyState && 200 == this.status) {
                // console.log('OUTPUT : bdm----> \n',JSON.parse(u.responseText));
                // console.log('OUTPUT : spidy----> \n',JSON.parse(u.responseText).records);
              var e = JSON.parse(u.responseText).records;

              let dummyUncoveredLines = [];
              let dummyCoveredLines = [];
              for (i = 0; i < e.length; i++) {
                //let className = e[i].ApexClassOrTrigger.Name; //no need as we are querying single class by id
                let methodName = e[i].TestMethodName;
                let coveredLines = e[i].Coverage.coveredLines;
                let UncoveredLines = e[i].Coverage.uncoveredLines;
                let ApexTestClass = e[i].ApexTestClass.Name;
                let classMethodName = ApexTestClass + '.' + methodName;
                // console.log('coveredLines---'+ classMethodName+' --- lines \n'+coveredLines);
                
                methodNameOptions.push(classMethodName);
                methodWiseCoveredLines.set(classMethodName,coveredLines);
                methodWiseUnCoveredLines.set(classMethodName,UncoveredLines);
                dummyCoveredLines = [...dummyCoveredLines, ...coveredLines];
                dummyUncoveredLines = [...dummyUncoveredLines, ...UncoveredLines];

                //console.log('OUTPUT : bdm----> \n',classMethodName,methodName,ApexTestClass,coveredLines);
              
            }
            dummyCoveredLines.sort((a, b) => a - b);
            dummyCoveredLines.forEach((line) => {
                coveredLinesSet.add(line);
            });
            // console.log('dummyUncoveredLines----=>',dummyUncoveredLines);
            
            dummyUncoveredLines.sort((a, b) => a - b);
            dummyUncoveredLines.forEach((line) => {
                if(!coveredLinesSet.has(line)){
                    unCoveredLinesSet.add(line);
                }
            });



            // console.log('OUTPUT : bdm total covred----> \n'+totalCoveredLines+'  unCoveredLines->'+totalUnCoveredLines);
            // console.log('OUTPUT : bdm total covred----> \n',coveredLinesSet);
            // console.log('\nOUTPUT : bdm total uncovred----> \n',unCoveredLinesSet);
            totalCoveredLines = [...coveredLinesSet];
            totalUnCoveredLines = [...unCoveredLinesSet];
            actualCodeLines = [...actualCodeLines, ...totalCoveredLines];
            actualCodeLines = [...actualCodeLines, ...totalUnCoveredLines];
            actualCodeLines.sort((a, b) => a - b);
            // console.log('OUTPUT : bdm total covred----> \n'+totalCoveredLines+'\n  unCoveredLines->'+totalUnCoveredLines);
            // console.log('OUTPUT : bdm total covred----> \n'+totalCoveredLines.length+'\n  unCoveredLines->'+totalUnCoveredLines.length);
            showAllCoverage(totalCoveredLines,totalUnCoveredLines,false);
            
            if(!isSlectAddec){
                let divToAdd = document.getElementById("ApexClassViewPage:theTemplate:theForm:thePageBlock:j_id27");
                let selectElement = document.createElement("select");
                selectElement.id = "methodNameSelect";
                selectElement.style = "padding-left: 1em; border-radius: 5px; font-weight: 500; height: 2rem;";
                selectElement.onchange = function(e) {
                    let key = e.target.value;
                    // console.log('OUTPUT select change: ',key);
                    handleTestMethodSelect(key);
                    // console.log('cov lines select method---'+ methodWiseCoveredLines.get(key));
                    
                    
                }
                divToAdd.appendChild(selectElement);
                let option = document.createElement("option");
                    option.value = 'All Methods';
                    option.text = 'All Methods';
                    selectElement.appendChild(option);
                methodNameOptions.forEach(opt => {
                    let option = document.createElement("option");
                    option.value = opt;
                    option.text = opt;
                    selectElement.appendChild(option);
                });
                isSlectAddec = !0;
            }
            // divToAdd.appendChild(selectElement);
                        
            // console.log('name options---->',methodNameOptions);
            
            // console.log('after map---->',methodWiseCoveredLines);
            
              
            }
          }),
          u.send();
      }
    }
    // console.log('OUTPUT : after------',e.toggle);
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
function initBtn(){
    let divToAdd = document.getElementById("ApexClassViewPage:theTemplate:theForm:thePageBlock:j_id27")
                        let btn = document.createElement("button");
                        btn.onclick = function(e) {
                            e.preventDefault();
                            console.log('bhush btn click------- ');
                            init();
                        };
                        // btn.onc .appendChild(document.createElement("button"))
                        btn.innerHTML = "Spidy Cov";
                        divToAdd.appendChild(btn);
}