<template>
  <div>
    <div class="slide-bar-header">
      <img src="../../../../assets/logo.png">
      <strong>互联网数据采集平台</strong>
    </div>
    <el-menu :defaultOpeneds="['/project']" :default-active="defautActive">
      <div v-for="(item, index) in routes" :key="index">
        <template v-if="!item.hidden&&item.children">
          <router-link
            v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow"
            :to="item.path+'/'+item.children[0].path"
            :key="item.children[0].name"
          >
            <el-menu-item
              :index="item.path+'/'+item.children[0].path"
              :class="{'submenu-title-noDropdown':!isNest}"
            >
              <svg-icon
                v-if="item.children[0].meta&&item.children[0].meta.icon"
                :icon-class="item.children[0].meta.icon"
              ></svg-icon>
              <span
                v-if="item.children[0].meta&&item.children[0].meta.title"
                slot="title"
              >{{item.children[0].meta.title}}</span>
            </el-menu-item>
          </router-link>

          <el-submenu v-else :index="item.path" :key="item.name">
            <template slot="title">
              <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
              <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
            </template>
            <div v-for="child in item.children" :key="child">
              <template v-if="!child.hidden">
                <sidebar-item
                  :is-nest="true"
                  class="nest-menu"
                  v-if="child.children&&child.children.length>0"
                  :routes="[child]"
                  :key="child.path"
                ></sidebar-item>
                <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
                  <el-menu-item :index="item.path+'/'+child.path">
                    <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
                    <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
                  </el-menu-item>
                </router-link>
              </template>
            </div>
          </el-submenu>
        </template>
      </div>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "SidebarItem",
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    defautActive: function() {
      const path = this.$route.path;
      if (path.indexOf('/project') > -1) {
        return '/project'
      } else {
        return this.$route.path;
      }
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden;
      });
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss">
.slide-bar-header {
  @include flex();
  height: 50px;
  
  img {
    height: 30px;
  }
  strong {
    display: block;
    font-size: 18px;
    color: white;
    margin-left: 5px;
  }
}
</style>
