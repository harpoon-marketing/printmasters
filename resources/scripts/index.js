document.addEventListener("DOMContentLoaded", () => {
  const initVideo = () => {
    const allVideos = document.querySelectorAll(".wp-block-video");

    const playIcon =
      "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#e8eaed'><path d='M340-236.16v-487.68L723.07-480 340-236.16Z'/></svg>";

    const pauseIcon =
      "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#e8eaed'><path d='M560-220v-520h150v520H560Zm-310 0v-520h150v520H250Z'/></svg>";

    /**
     * Renders video controls in the specified wrapper element.
     *
     * @param {HTMLElement} wrapper - The wrapper element to append the controls to.
     * @param {string} action - The action to be performed by the controls (e.g., "play", "pause").
     * @returns {HTMLElement} - The created controls' element.
     */
    const renderControls = (wrapper, action) => {
      const controls = document.createElement("div");
      controls.classList.add("printmasters-video-controls", "show");

      controls.innerHTML = action === "play" ? playIcon : pauseIcon;

      wrapper.appendChild(controls);

      return controls;
    };

    allVideos.forEach((wrapper) => {
      const video = wrapper.querySelector("video");
      video.controls = false;
      const controls = renderControls(wrapper, "play");

      const updateControls = (action) => {
        controls.innerHTML = action === "play" ? playIcon : pauseIcon;
      };

      controls.addEventListener("click", () => {
        if (video.paused) {
          video.play();
          updateControls("pause");
        } else {
          video.pause();
          updateControls("play");
        }
      });

      video.addEventListener("play", () => {
        updateControls("pause");
      });

      video.addEventListener("pause", () => {
        updateControls("play");
      });

      wrapper.addEventListener("mouseenter", () => {
        controls.classList.add("show");
      });

      wrapper.addEventListener("mouseleave", () => {
        video.paused
          ? controls.classList.add("show")
          : controls.classList.remove("show");
      });
    });
  };

  const initSidebar = () => {
    const buttons = Array.from(
      document.querySelectorAll(
        ".printmasters-sidebar-buttons .wp-block-button"
      )
    );

    if (!buttons.length) return;

    const sections = Array.from(buttons).map((button) => {
      const link = button.querySelector("a");
      const sectionId = link.getAttribute("href").slice(1); // Get the ID without the #
      return document.getElementById(sectionId); // Get the corresponding section
    });

    if (!sections) return;

    buttons[0].classList.add("is-active"); // Set the first button as active by default

    let observerActive = true; // Flag to control the observer

    // Define the middle of the viewport using rootMargin
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "-20% 0px -80% 0px", // Middle of the screen (50% from the top and bottom)
      threshold: 0.0, // Trigger as soon as the section crosses the middle
    };

    const observer = new IntersectionObserver((entries) => {
      if (!observerActive) return; // If observer is disabled, don't do anything

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Find the button that corresponds to the section in view
          const activeButton = document.querySelector(
            `a[href="#${entry.target.id}"]`
          ).parentElement;

          // Remove 'is-active' class from all buttons
          buttons.forEach((btn) => btn.classList.remove("is-active"));

          // Add 'is-active' class to the corresponding button
          activeButton.classList.add("is-active");
        }
      });
    }, options);

    // Observe each section
    sections.forEach((section) => observer.observe(section));

    // Add click event to buttons
    buttons.forEach((button, index) => {
      button.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default anchor behavior to handle smooth scroll

        // Disable observer temporarily
        observerActive = false;

        // Manually set the clicked button as active
        buttons.forEach((btn) => btn.classList.remove("is-active"));
        button.classList.add("is-active");

        // Smooth scroll to the corresponding section
        const section = sections[index];
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Re-enable observer after a delay (enough time for smooth scroll to finish)
        setTimeout(() => {
          observerActive = true;
        }, 1000); // Adjust the timeout duration depending on your smooth scroll speed
      });
    });
  };

  const initHeader = () => {
    const header = document.querySelector("header");
    const body = document.querySelector("body");

    if (!header) {
      return;
    }

    // Function to handle scroll event
    const handleScroll = () => {
      if (window.scrollY > 0) {
        header.classList.add("header--scrolled");
      } else {
        header.classList.remove("header--scrolled");
      }
    };

    // Initial check on page load
    handleScroll();

    // Debounce the scroll event for performance
    let timeout;
    window.addEventListener("scroll", () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 0); // Adjust debounce time as needed
    });
  };

  initVideo();
  initSidebar();
  initHeader();
});
