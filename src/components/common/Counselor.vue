<template>
    <select class="form-control" v-model="atId" v-on:change="atChange()">
        <option value="0">--未选择--</option>
        <option v-for="(item,index) in atList" :key="index" v-bind:value="item.colId">
            {{item.colName}}
        </option>
    </select>
</template>

<script>
    export default {
        data() {
            return {
                atId: '0',
                atList: []
            };
        },
        methods: {
            //提交岗位名称和ID
            atChange: function() {
                for (var i = 0; i < this.atList.length; i++) {
                    if(this.atId == 0){
                         this.$emit('atChange', null)
                         return
                    }else{
                        if (this.atList[i].colId == this.atId) {
                            this.$emit('atChange', this.atList[i])
                            return
                        }
                    }
                }
            },
            setAtId: function(atId) {
                this.atId = atId
                this.getProject()
            },
            async getProject() {
                var url = this.url + '/counselor/queryCounselorList'
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
                    if (res.retCode == '0000') {
                        this.atList = res.retData
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('数据请求失败处理')
                });
            },
        },
        created() {
            //this.getProject()
        },
    }
</script>

<style>

</style>
