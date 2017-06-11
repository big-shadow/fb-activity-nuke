// Import jQuery
javascript: (function(e, s) {
    e.src = s;
    e.onload = function() {
        jQuery.noConflict();
        console.log('jQuery injected');
    };
    document.head.appendChild(e);
})(document.createElement('script'), '//code.jquery.com/jquery-latest.min.js');

// Scroll down the page to lazy-load the activities.
for(var x = 0; x < 5000; x += 500){
  setTimeout(function(){
      window.scrollTo(0,document.body.scrollHeight);
  }, x);
}

// Nuke that shit.
setTimeout(function() {
  var activities = $("span:contains('Edit')");
  var x = 0;

  function begin() {
    if(x == activities.length){
      console.log("Complete.");
      return;
    }

    // Report every 10th activity nuked.
    if(x % 10 == 0){
      console.log("Unliked action #"+x);
    }

    setTimeout(function() {
      nuke(x);
      x++;
    }, 1000);
  }

  // Click the 'Edit' icon.
  function nuke(number) {
    var activity = activities[number];

    if(activity != undefined){
      activity.click();
    }

    // Wait, then click the respective <span> to nuke that son of a bitch.
    setTimeout(function() {
      var actions = ['Unlike', 'Remove Reaction', 'Delete'];

      $.each(actions, function(index, value) {
        var button = $("span:contains('"+value+"')");

        if(button != undefined){
          button.click();
        }

        // For confirmation dialogs.
        setTimeout(function() {
          button = $(".layerConfirm");

          if(button != undefined){
            button.click();
          }
        }, 750);

      });
    }, 500);

    // Wait for the Facebook callback to remove the activity from the UI,
    // then repeat the process.
    setTimeout(function() {
        begin();
    }, 1750);
  }

  begin();
}, 6000);
