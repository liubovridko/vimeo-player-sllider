   
   document.addEventListener("DOMContentLoaded", function() {
      var swiper;
    
    
      // Function to load Vimeo video
      function loadVimeoPlayer(container, videoId) {
        var player = new Vimeo.Player(container, {
          url: "https://player.vimeo.com/video/" + videoId,
          autoplay: true,
          autopause: false,
          loop: false
        });
        return player;
      }
    
      // Function to load Vimeo video thumbnail
      function getVimeoThumbnailUrl(videoId) {
        return fetch("https://vimeo.com/api/v2/video/" + videoId + ".json")
          .then(response => response.json())
          .then(data => data[0].thumbnail_large)
          .catch(error => console.error("Error fetching Vimeo thumbnail:", error));
      }
    
      // Initialize Swiper when DOM is ready
      swiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      //   pagination: {
      //     el: '.swiper-pagination',
      //     clickable: true,
      //   },

      });
    
      function openPopup(videoId) {
         var modalContainer = document.querySelector('.modal-video-container');
         if (!modalContainer) {
            console.error('Modal container not found!');
            return;
          }
         var player = loadVimeoPlayer(modalContainer, videoId);
         player.autoplay();
         // Отримайте модальне вікно
         var modal = document.getElementById("myModal");
         modal.style.display = 'block';
       
         // Закрийте модальне вікно при натисканні на кнопку закриття
         document.querySelector('.close').addEventListener('click', function(event) {
           if (event.target === this) {
             player.unload(); // Зупиніть відтворення відео
             modal.style.display = 'none'; // Закрийте модальне вікно
           }
         });
       }
      // Open video modal on thumbnail click
      // var videoThumbnails = document.querySelectorAll('.video-thumbnail');
      // videoThumbnails.forEach(function(thumbnail) {
      //   thumbnail.addEventListener('click', function() {
      //     var videoId = thumbnail.dataset.vimeoId;
      //     var modalContainer = document.querySelector('.modal-video-container');
      //     var player = loadVimeoPlayer(modalContainer, videoId);
          
      //     // Open modal
      //     var modal = document.getElementById("myModal");
      //     modal.style.display = 'block';
    
      //     // Close modal when clicking 
      //     document.querySelector('.close').addEventListener('click', function(event) {
      //       if (event.target === this) {
      //         player.unload();
      //         modal.style.display = 'none';
      //       }
      //     });
      //   });
    
      var videoThumbnails = document.querySelectorAll('.video-thumbnail');
      
       videoThumbnails.forEach(function(thumbnail) {
       // Відкриття модального вікна при кліку на .video-thumbnail
            thumbnail.addEventListener('click', function() {
            var videoId = thumbnail.dataset.vimeoId;
            openPopup(videoId);
            });

            // Отримати Vimeo thumbnail URL та встановити як background-image
            getVimeoThumbnailUrl(thumbnail.dataset.vimeoId).then(function(url) {
            thumbnail.style.backgroundImage = "url('" + url + "')";
            });
        });

   });