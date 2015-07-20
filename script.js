$(document).ready(function(){

    elements=[{id:'elem1',value:1},{id:'elem2',value:3},
        {id:'elem3',value:5},{id:'elem4',value:9},{id:'elem5',value:11},{id:'elem6',value:17},
        {id:'elem7',value:25},{id:'elem8',value:27},{id:'elem9',value:50}];

    elementsSelectionnes=[];

   init();

    

  
  $("#grid").mousedown(function (e) {
       
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

    $("#comptage>span").text('0');
    $(document).unbind("mousemove", activeSelection);
    $(document).unbind("mouseup", selectionneElements);
    var maxX = 0;
    var minX = 5000;
    var maxY = 0;
    var minY = 5000;
    var totalElements = 0;
    var elementArr = new Array();
    $(".elements").each(function () {
        var aElemSpectre = $(".spectre-select");
        var bElem = $(this);
        var result = intersectionObject(aElemSpectre, bElem);

        //console.log(bElem);

        if (result == true) {

             $("#comptage>span").text( Number($("#comptage>span").text())+1 );

             saveElementSelected(bElem);

         
                var aElemSpectrePos = bElem.offset();
                var bElemPos = bElem.offset();
                var aW = bElem.width();
                var aH = bElem.height();
                var bW = bElem.width();
                var bH = bElem.height();

                var coords = checkMinMaxPos(aElemSpectrePos, bElemPos, aW, aH, bW, bH, maxX, minX, maxY, minY);
                maxX = coords.maxX;
                minX = coords.minX;
                maxY = coords.maxY;
                minY = coords.minY;
                var parent = bElem.parent();

                //console.log(aElemSpectre, bElem,maxX, minX, maxY,minY);
                if (bElem.css("left") === "auto" && bElem.css("top") === "auto") {
                    bElem.css({
                        'left': parent.css('left'),
                        'top': parent.css('top')
                    });
                }
          $("body").append("<div id='big-spectre' class='big-spectre' x='" + Number(minX - 20) + "' y='" + Number(minY - 10) + "'></div>");

            $("#big-spectre").css({
                'width': maxX + 40 - minX,
                'height': maxY + 20 - minY,
                'top': minY - 10,
                'left': minX - 20
            });
          
          
        }
    });
    
    $(".spectre-select").removeClass("spectre-active");
    $(".spectre-select").width(0).height(0);

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

function checkMinMaxPos(a, b, aW, aH, bW, bH, maxX, minX, maxY, minY) {
    'use strict';

    if (a.left < b.left) {
        if (a.left < minX) {
            minX = a.left;
        }
    } else {
        if (b.left < minX) {
            minX = b.left;
        }
    }

    if (a.left + aW > b.left + bW) {
        if (a.left > maxX) {
            maxX = a.left + aW;
        }
    } else {
        if (b.left + bW > maxX) {
            maxX = b.left + bW;
        }
    }
    ////////////////////////////////
    if (a.top < b.top) {
        if (a.top < minY) {
            minY = a.top;
        }
    } else {
        if (b.top < minY) {
            minY = b.top;
        }
    }

    if (a.top + aH > b.top + bH) {
        if (a.top > maxY) {
            maxY = a.top + aH;
        }
    } else {
        if (b.top + bH > maxY) {
            maxY = b.top + bH;
        }
    }

    return {
        'maxX': maxX,
        'minX': minX,
        'maxY': maxY,
        'minY': minY
    };
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
     $(".elements").remove();
     representeElements(elementsSelectionnes);
      $("#big-spectre").remove();
}

function representeElements(elts)
{
     widthTotal =$("#grid").width();     

    if (elts.length>0)
        total=elts[elts.length-1].value;

    elts.forEach(function(elt, index){

         $("#grid").append("<div id='"+elt.id+"' class='elements'>"+elt.value+" </div>");
         left = Math.floor(widthTotal*elt.value/total);
         
         $("#"+elt.id).css({
                'left': left
            });    

    });
}

function init(){

    $("#comptage>span").text('0');
    representeElements(elements);
    
    elementsSelectionnes=[];
}