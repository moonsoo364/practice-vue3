import {computed, ref, type Ref} from 'vue';
export type UseSearchProps = {
    items: Ref<any[]>;
    filter?: string;
    defaultSearch?: string;
};

export const useSearch =({
    items,
    filter = "title",
    defaultSearch = "",
} : UseSearchProps ) =>{
    const search = ref(defaultSearch);
    const searchResults = computed(() =>{
        const searchTerm = search.value.toLowerCase();
        if (searchTerm === ""){
            return items.value;
        }
        return items.value.filter((item)=> {
            const itemValue = item[filter]?.toLowerCase()
                return itemValue.includes(searchTerm);
        });
    });
    return {search,searchResults};
}