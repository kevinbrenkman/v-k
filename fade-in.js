var fadeDuration = 750; // Duration of the fade animation in milliseconds
    var initialAnimationComplete = false; // Flag to track if initial animation is completed

    function startFadeAnimation() {
        $('img, video').each(function () {
            $(this).css('opacity', '0'); // Set initial opacity to 0
        });

        function animateElements() {
            $('img, video').each(function () {
                var percentValue = 50;
                var bottom_of_object = $(this).offset().top + ($(this).outerHeight() * (percentValue / 100));
                var bottom_of_window = $(window).scrollTop() + $(window).height();

                if (bottom_of_window > bottom_of_object) {
                    $(this).stop().animate({ 'opacity': '1' }, fadeDuration, function () {
                        // Animation completed
                        $(this).css('opacity', '1'); // Ensure opacity is set to 1
                    });
                }
            });
        }

        // Run the animation on page load
        animateElements();

        $(window).scroll(function () {
            if (!initialAnimationComplete) {
                return;
            }

            animateElements();
        });
    }

    function exitGridView() {
        // Stop the current animation and reset opacity to 0
        $('img, video').stop().css('opacity', '0');
        // Restart the fading animation
        startFadeAnimation();
    }

    $(document).ready(function () {
        startFadeAnimation();
        initialAnimationComplete = true;
    });
