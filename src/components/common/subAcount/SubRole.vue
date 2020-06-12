<template>
    <el-select v-model="roleIdList" multiple
               collapse-tags style="height: 9px" v-on:change="accChange()" placeholder="--未选择--">
        <el-option v-for="item in roleList"
                   :key="item.id"
                   :label="item.roleName"
                   :value="item.id">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        data() {
            return {
                roleIdList: [],
                roleList: []
            };
        },
        methods: {

            accChange: function () {
                this.$emit('accChange', this.roleIdList)
            },
            setRoleId: function (roleIdList) {
                this.roleIdList = roleIdList
                this.queryData()
            },
            async queryData() {
                var url = this.url + '/roleBean/getAllRole'
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
                        this.roleList = res.retData
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
