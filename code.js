(function ($) {
    $(function () {
  
  
      $(window).on('scroll', function () {
        fnOnScroll();
      });
  
      $(window).on('resize', function () {
        fnOnResize();
      });
  
  
      var agTimeline = $('.js-timeline'),
        agTimelineLine = $('.js-timeline_line'),
        agTimelineLineProgress = $('.js-timeline_line-progress'),
        agTimelinePoint = $('.js-timeline-card_point-box'),
        agTimelineItem = $('.js-timeline_item'),
        agOuterHeight = $(window).outerHeight(),
        agHeight = $(window).height(),
        f = -1,
        agFlag = false;
  
      function fnOnScroll() {
        agPosY = $(window).scrollTop();
  
        fnUpdateFrame();
      }
  
      function fnOnResize() {
        agPosY = $(window).scrollTop();
        agHeight = $(window).height();
  
        fnUpdateFrame();
      }
  
      function fnUpdateWindow() {
        agFlag = false;
  
        agTimelineLine.css({
          top: agTimelineItem.first().find(agTimelinePoint).offset().top - agTimelineItem.first().offset().top,
          bottom: agTimeline.offset().top + agTimeline.outerHeight() - agTimelineItem.last().find(agTimelinePoint).offset().top
        });
  
        f !== agPosY && (f = agPosY, agHeight, fnUpdateProgress());
      }
  
      function fnUpdateProgress() {
        var agTop = agTimelineItem.last().find(agTimelinePoint).offset().top;
  
        i = agTop + agPosY - $(window).scrollTop();
        a = agTimelineLineProgress.offset().top + agPosY - $(window).scrollTop();
        n = agPosY - a + agOuterHeight / 2;
        i <= agPosY + agOuterHeight / 2 && (n = i - a);
        agTimelineLineProgress.css({height: n + "px"});
  
        agTimelineItem.each(function () {
          var agTop = $(this).find(agTimelinePoint).offset().top;
  
          (agTop + agPosY - $(window).scrollTop()) < agPosY + .5 * agOuterHeight ? $(this).addClass('js-ag-active') : $(this).removeClass('js-ag-active');
        })
      }
  
      function fnUpdateFrame() {
        agFlag || requestAnimationFrame(fnUpdateWindow);
        agFlag = true;
      }
  
  
    });
  })(jQuery);
  
// Get the button using the id "myBtn":
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}









// Add an event listener to the "OK!" button to close the modal
const okButton = document.querySelector('.close-button');

okButton.addEventListener('click', function() {
  hideDialog();
});


// Variable to track whether the modal has been shown during this visit
let modalShown = false;

// Function to create and show the dialog
function showDialog() {
    const modal = document.getElementById('modal');
    modal.showModal();
  
    // Disable both vertical and horizontal scrolling when the modal is open
    document.body.style.overflow = 'hidden';
  
    // Add the blur class to the main content
    document.body.classList.add('blur-background');
  }
  
  // Function to hide the dialog
  function hideDialog() {
    const modal = document.getElementById('modal');
    modal.close();
  
    // Re-enable vertical scrolling while keeping horizontal scrolling hidden
    document.body.style.overflowY = 'auto';
  
    // Remove the blur class from the main content
    document.body.classList.remove('blur-background');
  }

// Define the target element by its ID ("pop-up")
const targetElement = document.getElementById('pop-up');

// Options for the Intersection Observer
const options = {
  root: null, // Use the viewport as the root
  rootMargin: '0px', // No margin
  threshold: 0.5, // Trigger when 50% of the target is visible
};

// Create the Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !modalShown) {
      // The target element is in focus, show the dialog only if it hasn't been shown
      showDialog();
      modalShown = true; // Set the flag to indicate it has been shown
    } else {
      // The target element is out of focus, hide the dialog
      hideDialog();
    }
  });
}, options);

// Start observing the target element
observer.observe(targetElement);
