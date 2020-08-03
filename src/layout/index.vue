<template>
    <div>
        <Header />
        <AppMain />
    </div>
</template>

<script>
import Header from './components/Header/index';
import AppMain from './components/AppMain';
export default {
    name: 'Layout',
    components: {
        AppMain,
        Header
    }
}
</script>

<style>
</style>