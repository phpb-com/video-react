class Fullscreen {
  request(elm) {
    if (elm.requestFullscreen) {
      elm.requestFullscreen();
    } else if (elm.webkitEnterFullscreen) {
      elm.webkitEnterFullscreen();
    } else if (elm.mozRequestFullScreen) {
      elm.mozRequestFullScreen();
    } else if (elm.msRequestFullscreen) {
      elm.msRequestFullscreen();
    }
  }

  exit() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  get isFullscreen() {
    return (
      document.fullscreenElement ||
      document.webkitIsFullScreen ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  }

  get enabled() {
    return (
      document.fullscreenEnabled ||
      document.webkitSupportsFullscreen ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled
    );
  }

  addEventListener(handler) {
    document.addEventListener('fullscreenchange', handler);
    document.addEventListener('onwebkitfullscreenchange', handler);
    document.addEventListener('mozfullscreenchange', handler);
    document.addEventListener('MSFullscreenChange', handler);
  }

  removeEventListener(handler) {
    document.removeEventListener('fullscreenchange', handler);
    document.removeEventListener('onwebkitfullscreenchange', handler);
    document.removeEventListener('mozfullscreenchange', handler);
    document.removeEventListener('MSFullscreenChange', handler);
  }
}

export default new Fullscreen();
