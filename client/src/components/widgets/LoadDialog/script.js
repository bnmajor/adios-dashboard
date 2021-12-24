export default {
  inject: ['girderRest'],

  data () {
    return {
      clicks: 0,
      dialogDelete: false,
      disableLoad: true,
      search: '',
      selection: null,
    };
  },

  props: {
    views: {
      type: Array,
      default: () => [],
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    headers() {
      return [
        {text: 'View Name', value: 'name'},
        {text: 'First Name', value: 'creatorFirst'},
        {text: 'Last Name', value: 'creatorLast'},
        {text: 'Date Created', value: 'created'},
        {text: 'Actions', value: 'actions', sortable: false}
      ]
    },
    loadDialog: {
      get () {
        return this.visible;
      },
      set (value) {
        if (!value) {
          this.$emit('close');
        }
      }
    },
    filteredViews() {
      return this.views.filter((item) => {
        return this.viewIsPublic(item) || this.viewCreatedByUser(item);
      })
    },
  },

  methods: {
    clearSelection() {
      this.selection = null;
      if (this.loadDialog) {
        this.loadDialog = false;
      }
    },
    async deleteView() {
      this.dialogDelete = false;
      await this.girderRest.delete(`/view/${this.selection._id}`)
        .then(() => {
          this.$parent.$emit('views-modified');
          this.selection = null;
        })
        .catch((error) => { console.log('error: ', error) });
    },
    load() {
      this.$root.$children[0].$emit('view-selected', this.selection);
      this.clearSelection();
    },
    rowSelected(selection) {
      this.clicks++;
      this.selection = selection;
      if (this.clicks === 1) {
        setTimeout(() => {
          this.clicks = 0;
        }, 200);
      } else {
        this.clicks = 0;
        this.load();
      }
    },
    loadSelectedRow(event, selection) {
      this.selection = selection.item;
      this.load();
    },
    rowClass(item) {
      if (this.selection && this.selection._id === item._id) {
        return 'selectedRow';
      } else  {
        return '';
      }
    },
    viewCreatedByUser(item) {
      return this.girderRest.user._id === item.creatorId;
    },
    viewIsPublic(item) {
      if (item) {
        return item.public;
      }
      return false;
    },
    async toggleViewStatus() {
      this.dialogTogglePublic = false;
      var formData = new FormData();
      formData.set('public', !this.selection.public);
      await this.girderRest.put(`/view/${this.selection._id}`, formData)
        .then(() => {
          this.$parent.$emit('views-modified');
        })
        .catch((error) => { console.log('error: ', error) });
    },
  },
}
