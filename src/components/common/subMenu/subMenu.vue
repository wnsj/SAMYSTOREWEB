<template>
    <select class="form-control" v-model="id" v-on:change="menuChange()">
        <option value=0>创建一级菜单</option>
        <option v-for="(item,index) in menuList" :key="index" v-bind:value="item.id">{{item.menuName}}</option>
    </select>
</template>

<script>
    export default {
        data() {
            return {
                id: 0,
                menuList: []
            };
        },
        methods: {

            menuChange: function () {
                this.$emit('menuChange', this.id)
            },
            setMenuId: function (id) {
                this.id = id
                this.queryData()
            },
            async queryData() {
                var url = this.url + '/menuBean/getMenu'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {},
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode === '0000') {
                        this.menuList = res.retData
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('数据请求失败处理' + error)
                });
            },
        },
        created() {
            this.queryData()
        },
    }
</script>

<style scoped>

</style>
