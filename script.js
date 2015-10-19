$(document).ready(function(){


    hours= [{id:'hh_00',value:0},{id:'hh_01',value:1},{id:'hh_02',value:2},{id:'hh_03',value:3},
            {id:'hh_04',value:4},{id:'hh_05',value:5},{id:'hh_06',value:6},
            {id:'hh_07',value:7},{id:'hh_08',value:8},{id:'hh_09',value:9},
            {id:'hh_10',value:10},{id:'hh_11',value:11},{id:'hh_12',value:12},
            {id:'hh_13',value:13},{id:'hh_14',value:14},{id:'hh_15',value:15},
            {id:'hh_16',value:16},{id:'hh_17',value:17},{id:'hh_18',value:18},
            {id:'hh_19',value:19},{id:'hh_20',value:20},{id:'hh_21',value:21},
            {id:'hh_22',value:22},{id:'hh_23',value:23},{id:'hh_24',value:24}];

    elements=[{id:'elem1',value:2.2},{id:'elem2',value:3},
        {id:'elem3',value:4.3},{id:'elem4',value:9},{id:'elem5',value:11},{id:'elem6',value:15}];

    elements2=[{id:'elem21',value:1.2},{id:'elem22',value:1.7},
        {id:'elem23',value:3.3},{id:'elem24',value:12.5},{id:'elem25',value:19},{id:'elem26',value:21},{id:'elem27',value:23}];

    elements3=[{id:'elem31',value:5.2},{id:'elem32',value:7.7},
        {id:'elem33',value:13.3},{id:'elem34',value:16},{id:'elem35',value:19.5},{id:'elem36',value:21.5}];

    
    heuresSelectionnes=[];
    elementsSelectionnes=[];
    elements2Selectionnes=[];
    elements3Selectionnes=[];


     firstElement = 0
     lastElement = 24
    

   initialize();

    

  
  $("#handledZone").mousedown(function (e) {
       
        //console.log(e.pageX);
        $("#big-spectre").remove();
        $(".spectre-select").addClass("spectre-active");
        $(".spectre-select").css({
            'left': e.pageX-20,
            'top': 0
        });

        initialW = e.pageX-20;
        initialH = 0;
        
             

        $(document).bind("mouseup", selectionneElements);
        $(document).bind("mousemove", activeSelection);

    });
  
  
});

function activeSelection(e) {
    var w = Math.abs(initialW - e.pageX);
    var h = Math.abs(initialH - e.pageY);

    $(".spectre-select").css({
        'width': w,
        'height': h
    });
    if (e.pageX <= initialW && e.pageY >= initialH) {
        $(".spectre-select").css({
            'left': e.pageX
        });
    } else if (e.pageY <= initialH && e.pageX >= initialW) {
        $(".spectre-select").css({
            'top': e.pageY
        });
    } else if (e.pageY < initialH && e.pageX < initialW) {
        $(".spectre-select").css({
            'left': e.pageX,
            "top": e.pageY
        });
    }
}



  
  
function intersectionObject(a, b) { // a and b are your objects
    //console.log(a.offset().top,a.position().top, b.position().top, a.width(),a.height(), b.width(),b.height());
    var aTop = a.offset().top;
    var aLeft = a.offset().left;
    var bTop = b.offset().top;
    var bLeft = b.offset().left;

    return !(
        ((aTop + a.height()) < (bTop)) ||
        (aTop > (bTop + b.height())) ||
        ((aLeft + a.width()) < bLeft) ||
        (aLeft > (bLeft + b.width()))
    );
}  

function checkMinMaxPos(a, b, aW, aH, bW, bH, mxX, mnX, mxY, mnY) {
    'use strict';

    if (a.left < b.left) {
        if (a.left < mnX) {
            mnX = a.left;
        }
    } else {
        if (b.left < mnX) {
            mnX = b.left;
        }
    }

    if (a.left + aW > b.left + bW) {
        if (a.left > mxX) {
            mxX = a.left + aW;
        }
    } else {
        if (b.left + bW > mxX) {
            mxX = b.left + bW;
        }
    }
    ////////////////////////////////
    if (a.top < b.top) {
        if (a.top < mnY) {
            mnY = a.top;
        }
    } else {
        if (b.top < mnY) {
            mnY = b.top;
        }
    }

    if (a.top + aH > b.top + bH) {
        if (a.top > mxY) {
            mxY = a.top + aH;
        }
    } else {
        if (b.top + bH > mxY) {
            mxY = b.top + bH;
        }
    }

    return {
        'mxX': mxX,
        'mnX': mnX,
        'mxY': mxY,
        'mnY': mnY
    };
}


function catchElements(classElem,saveElementSelectedMethod,completList,selectedList){

    $("."+classElem).each(function () {
        var aElemSpectre = $(".spectre-select");
        var bElem = $(this);
        var result = intersectionObject(aElemSpectre, bElem);

        //console.log(bElem);

        if (result == true) {

                //saveElementSelected(bElem);
                saveElement(bElem,completList,selectedList);
         
                var aElemSpectrePos = bElem.offset();
                var bElemPos = bElem.offset();
                var aW = bElem.width();
                var aH = bElem.height();
                var bW = bElem.width();
                var bH = bElem.height();

                var coords = checkMinMaxPos(aElemSpectrePos, bElemPos, aW, aH, bW, bH, mxX, mnX, mxY, mnY);
                mxX = coords.mxX;
                mnX = coords.mnX;
                mxY = coords.mxY;
                mnY = coords.mnY;
                var parent = bElem.parent();

                //console.log(aElemSpectre, bElem,mxX, mnX, mxY,mnY);
                if (bElem.css("left") === "auto" && bElem.css("top") === "auto") {
                    bElem.css({
                        'left': parent.css('left'),
                        'top': parent.css('top')
                    });
                }
          $("body").append("<div id='big-spectre' class='big-spectre' x='" + Number(mnX - 20) + "' y='" + Number(mnY - 10) + "'></div>");

            $("#big-spectre").css({
                'width': mxX + 40 - mnX,
                'height': mxY + 20 - mnY,
                'top': mnY - 10,
                'left': mnX - 20
            });
          
          
        }
    });


}


function selectionneElements(e) {

    elementsSelectionnes=[];
    elements2Selectionnes=[];
    elements3Selectionnes=[];
    heuresSelectionnes=[];

    
    $(document).unbind("mousemove", activeSelection);
    $(document).unbind("mouseup", selectionneElements);
    mxX = 0;
    mnX = 5000;
    mxY = 0;
    mnY = 5000;
    
    catchElements("hour",saveElement,hours,heuresSelectionnes)
    catchElements("elements",saveElement,elements,elementsSelectionnes)
    catchElements("elements2",saveElement,elements2,elements2Selectionnes)
    catchElements("elements3",saveElement,elements3,elements3Selectionnes)

    ///////////////////////////////////////////
    
    $(".spectre-select").removeClass("spectre-active");
    $(".spectre-select").width(0).height(0);
    
    zoomOnElementsSelected();
   

}

function saveElement(elt,completList,selectedList){

        completList.forEach(function(elem,index) {
            if (elem.id==elt[0].id)
            {
                selectedList.push(elem);
            }
        });

  //  console.log(selectedList);
}


function saveHoursSelected(elt){

        hours.forEach(function(elem,index) {
            if (elem.id==elt[0].id)
            {
                heuresSelectionnes.push(elem);
            }
        });

   // console.log(heuresSelectionnes);
}

function saveElementSelected(elt){

        elements.forEach(function(elem,index) {
            if (elem.id==elt[0].id)
            {
                elementsSelectionnes.push(elem);
            }
        });

    //console.log(elementsSelectionnes);
}
function zoomOnElementsSelected()
{

    var maxH = 24

     $(".elements").remove();
     $(".elements2").remove();
     $(".elements3").remove();
     $(".hour").remove();

     if (heuresSelectionnes.length>0)
        maxH = heuresSelectionnes[heuresSelectionnes.length-1].value

     representeHours("abscisseHours",heuresSelectionnes,'hour',maxH,true);
     representeElements("abscisse",elementsSelectionnes,'elements',maxH,true);
     representeElements("abscisse2",elements2Selectionnes,'elements2',maxH,true);
     representeElements("abscisse3",elements3Selectionnes,'elements3',maxH,true);

     

      $("#big-spectre").remove();
}

function representeElements(abscisId,elts,classColor,maxHour,zoomOn)
{
     widthTotal =$("#abscisseHours").width();  
     
        firstElement = heuresSelectionnes[0]
        nbHours=heuresSelectionnes.length-1

   

     //console.log(firstElement)
     //console.log(lastElement)
    
        if(!zoomOn)
        {
             elts.forEach(function(elt, index){
                
                 $("#"+abscisId).append("<div id='"+elt.id+"' class='"+classColor+"'>"+elt.value+" </div>");            
                    
                left = Math.floor(widthTotal*elt.value/maxHour)

                 $("#"+elt.id).css({
                        'left': left
                    });    

            });
        }
        
        else
        {
             elts.forEach(function(elt, index){
                
                 $("#"+abscisId).append("<div id='"+elt.id+"' class='"+classColor+"'>"+elt.value+" </div>");

                 decale=Math.floor(widthTotal*firstElement.value/maxHour)

                 if(index==0)
                 {
                    left = Math.floor(widthTotal*elt.value/maxHour)-decale
                 }
                    
                 else
                 {  
                    beforeH=getBeforeHour(elt)
                    console.log(beforeH);
                    left = $('#'+beforeH.id).position().left + Math.floor(widthTotal*(elt.value-beforeH.value)/nbHours)//-decale+Math.floor(decale*elt.value/lastElement.value)
                   // console.log(Math.floor(decale*elt.value/lastElement.value));
                  
                 }


                 $("#"+elt.id).css({
                        'left': left
                    });    

            });
        }
}
   
function getBeforeHour(elt)
{
    var bhr=0;

    for (var i = 0; i < heuresSelectionnes.length; i++) {
       if (heuresSelectionnes[i].value>elt.value){
            bhr=heuresSelectionnes[i-1];
            break;
       }
    }
    
    return bhr
}
function representeHours(abscisId,elts,classColor,maxHour,zoomOn)
{
    widthTotal =$("#abscisseHours").width();  
    firstElement = elts[0]
    lastElement = elts[elts.length-1]
    nbHours=elts.length-1

     //console.log(firstElement)
     //console.log(lastElement)
    
        if(!zoomOn)
        {
             elts.forEach(function(elt, index){
                
                 $("#"+abscisId).append("<div id='"+elt.id+"' class='"+classColor+"'>"+elt.value+" </div>");            
                    
                left = Math.floor(widthTotal*elt.value/maxHour)

                 $("#"+elt.id).css({
                        'left': left
                    });    

            });
        }
        
        else
        {
             elts.forEach(function(elt, index){
                
                 $("#"+abscisId).append("<div id='"+elt.id+"' class='"+classColor+"'>"+elt.value+" </div>");

                 decale=Math.floor(widthTotal*firstElement.value/maxHour)
                 
                 if(index==0)
                 {
                    left = Math.floor(widthTotal*elt.value/maxHour)-decale
                    beforeVal = elt.value
                 }
                    
                 else
                 {  
                    left = left + Math.floor(widthTotal*(elt.value-beforeVal)/nbHours)//-decale+Math.floor(decale*elt.value/lastElement.value)
                   // console.log(Math.floor(decale*elt.value/lastElement.value));
                   beforeVal = elt.value
                   //console.log(left)
                 }


                 $("#"+elt.id).css({
                        'left': left
                    });    

            });
        }
}

function initialize(){

    representeHours("abscisseHours",hours,'hour',24,false);
    representeElements("abscisse",elements,'elements',24,false); 
    representeElements("abscisse2",elements2,'elements2',24,false);
    representeElements("abscisse3",elements3,'elements3',24,false);    
    elementsSelectionnes=[];
    elements2Selectionnes=[];
    elements3Selectionnes=[];
    heuresSelectionnes=[];
}


