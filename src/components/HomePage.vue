<template>
    <div>
        <CarouselEl />
        <div class="body">
            <SearchBar />
            <p>Hot properties in Navi Mumbai for Sale</p>
            <HotPropList />
            <p>Hot properties in New Delhi for Sale</p>
            <HotPropRev />
        </div>
        <FeaturesEl />
        <ContactInfo/>
    </div>
</template>

<script>

import CarouselEl from '@/components/ElCarousel.vue'
import SearchBar from '@/components/SearchBar.vue'
import HotPropList from '@/components/HotPropList.vue';
import HotPropRev from '@/components/HotPropRev.vue';
import FeaturesEl from '@/components/Features.vue';
import ContactInfo from '@/components/ContactInfo.vue';

export default {
    name: 'HomePage',
    components: {
        CarouselEl,
        SearchBar,
        HotPropList,
        HotPropRev,
        FeaturesEl,
        ContactInfo
    }
}
</script>

<style scoped>
.body{
    margin:10%;
    margin-top: 5%;
}
p{
    margin-bottom: 0;
}
</style>