function openBlock (id) {
    var block = $('#'+id)[0]; //document.getElementById(id);
    var blocks = $('#main_content div');//document.getElementById("main_content").getElementsByTagName("div");

    for (var y = 0; y < blocks.length; y++) {
        blocks[y].style.display = "none";
    }
    block.style.display = "block";

    // TODO: remove the "active" class from all of the li elements inside the menu
    // TODO: add the "active" class to the li element that contains the link that was clicked

}
//Set click handlers for menu items
var menuItem;
$("#menu li a").each( function() {
    //When clicked, show content based on class id
    $(this).click( function() {
      menuItem = $(this).attr("id");
      //add active class to list item so it will be highlighted
      $(this).parent().addClass("active");
      //remove active class from all other menu items
      $(this).parent().siblings().removeClass("active");
      //show appropriate content
      openBlock(menuItem.slice(10));
    });
    //When hover, change color of list item
    $(this).hover( function() {
      $(this).addClass("hover");
    }, function() {
      $(this).removeClass("hover");
    });
});

// set up the tooltip plugin on all of the links in the menu
$('menu li a').tooltip( { delay: 1000 });
