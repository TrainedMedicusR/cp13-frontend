<template>

  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">

          </slot>
          <button type="button" @click="close" class="close">
          <span aria-hidden="true">&times;</span>
          </button>

        </div>

        <div class="modal-body">
          <slot name="body">

          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">

          </slot>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Modal',
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>
