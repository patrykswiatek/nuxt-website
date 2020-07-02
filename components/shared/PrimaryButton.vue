<script>
import { defineComponent, h } from '@vue/composition-api'

export default defineComponent({
  props: {
    buttonText: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () => h('button', { attrs: { class: 'button' } }, props.buttonText)
  },
})
</script>

<style lang="scss" scoped>
.button {
  align-items: center;
  background: $havelock-blue;
  border: none;
  color: $alabaster;
  cursor: pointer;
  display: flex;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: $semibold;
  letter-spacing: 0.84px;
  line-height: 1.9;
  padding: 1.2rem 3.5rem;
  text-transform: uppercase;
  transition: box-shadow 0.4s, color 0.5s;

  &:hover {
    box-shadow: inset 260px 0px rgba(0, 0, 0, 0.5);
  }
}
</style>
