<template>
    <div class="v-image-with-loader">

        <!--<img v-if="$imageResponsive"-->
             <!--:src="$imageSrc"-->
             <!--:alt="$imageAlt"-->
             <!--:class="[$imageClass, {'fit-cover' : $fitCover}]"-->
             <!--@load="originalImageIsLoaded = true"-->
             <!--:srcset="$imageData.generated.large +' 1280w,' + $imageData.generated.regular +' 750w'"-->
             <!--&gt;-->
        <img v-if="$startOriginalImageLoad"
             :src="$imageSrc"
             :alt="$imageAlt"
             :class="[$imageClass, {'fit-cover' : $fitCover}]"
             :srcset="$imageResponsive ? $imageData.generated.large +' 1200w,' + $imageData.generated.regular +' 750w' : null"
             :sizes ="$imageResponsive ? $responsiveSizes : null"
             @load="originalImageIsLoaded = true">

        <img :src="$imageSrc_icon"
             :alt="$imageAlt"
             :class="[$imageClass, {'img-loaded' : originalImageIsLoaded}, {'fit-cover' : $fitCover}]"
             @load="emitIconLoadedEvent()"
             class="v-image-with-loader__cache">
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Emit} from "vue-property-decorator"
    import {IMedia_generatedItem} from "../../../api/genericsApiTypesIntefaces"

    @Component({
        // created: function() {
        //     console.log("created")
        // },
    })
    export default class ImageWithLoader extends Vue {
        @Prop() $imageData!: IMedia_generatedItem
        @Prop() $imageAlt!: string
        @Prop() $imageClass!: string
        @Prop({required: true, type: Boolean}) $fitCover!: boolean

        @Prop({default: false, type: Boolean}) $startOriginalImageLoad!: boolean

        @Prop({default: "", type: String})     $responsiveSizes!: string
        get $imageResponsive(): boolean {return this.$responsiveSizes.length > 0}

        @Prop({default: false, type: Boolean}) $alwaysLargeImage!: boolean

        originalImageIsLoaded = false;

        get $imageSrc_icon() {
            return this.$imageData.generated.icon
        }

        get $imageSrc() {
            return this.$alwaysLargeImage ? this.$imageData.generated.large : this.$imageData.generated.regular
        }

        @Emit('icon-image-loaded')
        emitIconLoadedEvent() {}
    }
</script>

<style scoped lang="scss">
    .v-image-with-loader {
        position: relative;

        img {
            position: absolute;
            top: 0;
            left: 0;
            margin: 0;
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;

            &.fit-cover {
                object-fit: cover;
            }
        }
    }

    .v-image-with-loader__cache {
        transition: opacity 250ms ease-in-out;
        opacity: 1;
        filter: blur(3px);

        &.img-loaded {
            opacity: 0;
        }
    }
</style>