$(document).ready(function(){

    elements=[{id:'elem1',value:1},{id:'elem2',value:3},
        {id:'elem3',value:5},{id:'elem4',value:9},{id:'elem5',value:11},{id:'elem6',value:24}];

    hours= [{id:'hh_01',value:1},{id:'hh_02',value:2},{id:'hh_03',value:3},
            {id:'hh_04',value:4},{id:'hh_05',value:5},{id:'hh_06',value:6},
            {id:'hh_07',value:7},{id:'hh_08',value:8},{id:'hh_09',value:9},
            {id:'hh_10',value:10},{id:'hh_11',value:11},{id:'hh_12',value:12},
            {id:'hh_13',value:13},{id:'hh_14',value:14},{id:'hh_15',value:15},
            {id:'hh_16',value:16},{id:'hh_17',value:17},{id:'hh_18',value:18},
            {id:'hh_19',value:19},{id:'hh_20',value:20},{id:'hh_21',value:21},
            {id:'hh_22',value:22},{id:'hh_23',value:23},{id:'hh_24',value:24}];

    elementsSelectionnes=[];
    heuresSelectionnes=[];

   init();

    

  
  $("#abscisse").mousedown(function (e) {
       
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


function selectionneElements(e) {

    elementsSelectionnes=[];
    heuresSelectionnes=[];

    
    $(document).unbind("mousemove", activeSelection);
    $(document).unbind("mouseup", selectionneElements);
    var mxX = 0;
    var mnX = 5000;
    var mxY = 0;
    var mnY = 5000;


    $(".elements").each(function () {
        var aElemSpectre = $(".spectre-select");
        var bElem = $(this);
        var result = intersectionObject(aElemSpectre, bElem);

        //console.log(bElem);

        if (result == true) {

                saveElementSelected(bElem);

         
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

    ///////////////////////////////////////////


     $(".hour").each(function () {
        var aElemSpectre = $(".spectre-select");
        var bElem = $(this);
        var result = intersectionObject(aElemSpectre, bElem);

        //console.log(bElem);

        if (result == true) {

                saveHoursSelected(bElem);

         
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


    ///////////////////////////////////////////
    
    $(".spectre-select").removeClass("spectre-active");
    $(".spectre-select").width(0).height(0);

    ////////////////////////////////////////////////




    ////////////////////////////////////////////////

    zoomOnElementsSelected();
   

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

function saveHoursSelected(elt){

        hours.forEach(function(elem,index) {
            if (elem.id==elt[0].id)
            {
                heuresSelectionnes.push(elem);
            }
        });

    console.log(heuresSelectionnes);
}

function saveElementSelected(elt){

        elements.forEach(function(elem,index) {
            if (elem.id==elt[0].id)
            {
                elementsSelectionnes.push(elem);
            }
        });

    console.log(elementsSelectionnes);
}
function zoomOnElementsSelected()
{

    var maxH = 24

     $(".elements").remove();
     $(".hour").remove();

     if (heuresSelectionnes.length>0)
        maxH = heuresSelectionnes[heuresSelectionnes.length-1].value

     representeElements("abscisseHours",heuresSelectionnes,'hour',maxH);
     representeElements("abscisse",elementsSelectionnes,'elements',maxH);

     console.log(maxH);

      $("#big-spectre").remove();
}

function representeElements(abscisId,elts,classFormatBack,maxHour)
{
     widthTotal =$("#abscisseHours").width();  

    elts.forEach(function(elt, index){

         $("#"+abscisId).append("<div id='"+elt.id+"' class='"+classFormatBack+"'>"+elt.value+" </div>");
         left = Math.floor(widthTotal*elt.value/maxHour);
         
         $("#"+elt.id).css({
                'left': left
            });    

    });
}

function init(){

    representeElements("abscisseHours",hours,'hour',24);
    representeElements("abscisse",elements,'elements',24);    
    elementsSelectionnes=[];
    heuresSelectionnes=[];
}