export default {
  state: {
    autoSavedViewDialog: false,
    galleryPaused: true,
    showLoadDialog: false,
    showSaveDialog: false,
    timeStepSelection: false,
    zoomSync: true,
  },
  getters: {
    UI_AUTO_SAVE_DIALOG(state) {
      return state.autoSavedViewDialog;
    },
    UI_PAUSE_GALLERY(state) {
      return state.galleryPaused;
    },
    UI_SHOW_LOAD_DIALOG(state) {
      return state.showLoadDialog;
    },
    UI_SHOW_SAVE_DIALOG(state) {
      return state.showSaveDialog;
    },
    UI_ZOOM_SYNC(state) {
      return state.zoomSync;
    },
    UI_TIME_STEP_SELECTOR(state) {
      return state.timeStepSelection;
    },
  },
  mutations: {
    UI_AUTO_SAVE_DIALOG_SET(state, val) {
      state.autoSavedViewDialog = val;
    },
    UI_PAUSE_GALLERY_SET(state, val) {
      state.galleryPaused = val;
    },
    UI_SHOW_LOAD_DIALOG_SET(state, val) {
      state.showLoadDialog = val;
    },
    UI_SHOW_SAVE_DIALOG_SET(state, val) {
      state.showSaveDialog = val;
    },
    UI_ZOOM_SYNC_SET(state, val) {
      state.zoomSync = val;
    },
    UI_TIME_STEP_SELECTOR_SET(state, val) {
      state.timeStepSelection = val;
    },
  },
  actions: {
    UI_TOGGLE_PLAY_PAUSE({state}) {
      state.galleryPaused = !state.galleryPaused;
    },
    UI_TOGGLE_ZOOM_SYNC({state}) {
      state.zoomSync = !state.zoomSync;
    },
    UI_TOGGLE_TIME_STEP({state}) {
      state.timeStepSelection = !state.timeStepSelection;
    }
  },
}