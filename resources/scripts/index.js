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
        ".printmasters-sidebar-buttons .wp-block-button",
      ),
    );

    if (!buttons) return;

    const sections = Array.from(buttons).map((button) => {
      const link = button.querySelector("a");
      const sectionId = link.getAttribute("href").slice(1); // Get the ID without the #
      return document.getElementById(sectionId); // Get the corresponding section
    });

    buttons[0].classList.add("is-active"); // Set the first button active by default

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.classList.contains("is-active")) return;

        buttons.forEach((btn) => btn.classList.remove("is-active"));

        button.classList.add("is-active");
      });
    });
  };

  // Initialize the sidebar functionality when the DOM is loaded
  document.addEventListener("DOMContentLoaded", initSidebar);

  initVideo();
  initSidebar();
});
