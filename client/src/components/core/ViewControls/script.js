import SaveDialog from "../../widgets/SaveDialog";
import LoadDialog from "../../widgets/LoadDialog";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  inject: ["girderRest"],

  components: {
    SaveDialog,
    LoadDialog,
  },

  data() {
    return {
      showSaveDialog: false,
      showLoadDialog: false,
      zoomSync: 0,
    };
  },

  props: {
    plots: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    ...mapActions({
      toggleSyncZoom: "UI_TOGGLE_ZOOM_SYNC",
      toggleSelectTimeStep: "UI_TOGGLE_TIME_STEP",
      fetchAllViews: "VIEWS_FETCH_ALL_AVAILABLE",
    }),
    ...mapMutations({
      setPaused: "UI_PAUSE_GALLERY_SET",
      setLoadDialogVisible: "UI_SHOW_LOAD_DIALOG_SET",
      setSaveDialogVisible: "UI_SHOW_SAVE_DIALOG_SET",
    }),
    async saveView() {
      await this.fetchAllViews();
      this.setSaveDialogVisible(true);
      this.setPaused(true);
    },
    async loadView() {
      await this.fetchAllViews();
      this.setLoadDialogVisible(true);
    },
  },

  computed: {
    ...mapGetters({
      timeStepSelectorMode: "UI_TIME_STEP_SELECTOR",
      lastSaved: "VIEWS_LAST_SAVED",
      numcols: "VIEWS_COLUMNS",
      numrows: "VIEWS_ROWS",
      run: "VIEWS_RUN_ID",
      simulation: "VIEWS_SIMULATION",
      step: "VIEW_TIME_STEP",
    }),
  },
};
