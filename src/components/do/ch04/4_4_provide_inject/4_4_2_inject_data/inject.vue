<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    inject:{
        currentSelectedIds:{
            from: 'selectedIds',
            default: []
        }
    }
})
</script>
