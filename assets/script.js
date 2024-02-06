    var swiper;
    var modalSwiper;
    var pagination;

    // Function to load Vimeo video


      var swiper;

    // Function to load Vimeo video
    function loadVimeoPlayer(container, videoId) {
      var player = new Vimeo.Player(container, {
         url: "https://player.vimeo.com/video/" + videoId,
         fullscreen: true,
         autoplay: true,
         autopause: 0,
         loop: true
       });


     // Enable fullscreen on video click
      container.addEventListener('click', function() {
         player.requestFullscreen().then(function() {
           player.setAutopause(false).then(function () {
             player.play();
           });
         });
       });
 
 
      return player;
    }

    // Initialize Swiper when DOM is ready
    document.addEventListener("DOMContentLoaded", function() {
      // Load Vimeo video for each slide
      var videoContainers = document.querySelectorAll('.video-container');
      videoContainers.forEach(function(container) {
        var videoId = container.dataset.vimeoId;
        loadVimeoPlayer(container, videoId);
      });

      // Initialize Swiper
      swiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    });