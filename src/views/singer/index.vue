<template>
  <section>
    <ListView :data="list" />
  </section>
</template>

<script>
import ListView from '@/components/ListView';
import { getSingerList, getHotSingerList } from "@/service/api/singer";
export default {
  data: () => ({
    list: []
  }),
  components: {
    ListView
  },
  created() {
    this.getAllAlphaSingerList();
  },
  methods: {
    getAllAlphaSingerList() {
      const singerList = [];
      const promiseList = [];
      const hot = getHotSingerList({limit: 30});
      promiseList.push(hot);

      for(let i = 0; i < 26; i++) {
        const promise = getSingerList({initial: String.fromCharCode(97+i)});
        promiseList.push(promise);
      }

      Promise.all(promiseList).then(res => {
        const hotSingers = res.shift().artists;
        singerList.push({ // 热门歌手
          alpha: 'hot',
          data: hotSingers
        });

        for(let i = 0; i < 26; i++) {
          const singers = res.shift().artists;
          singerList.push({
            alpha: String.fromCharCode(97 + i),
            data: singers
          });
        }
      })

      this.list = singerList;
    }
  }
}
</script>

<style scoped>

</style>