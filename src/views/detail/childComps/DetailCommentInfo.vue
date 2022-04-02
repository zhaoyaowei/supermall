<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="header-info">
      <span class="user-comment">用户评价</span>
      <span class="comment-more">更多
        <i class="to-right"></i>
      </span>
    </div>
    <div class="user-info">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="detail-info">
      <p class="comment-content">{{commentInfo.content}}</p>
      <div class="comment-other">
        <span class="comment-date">{{commentInfo.created | showDate}}</span>
        <span class="comment-style">{{commentInfo.style}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '../../../common/utils'

  export default {
    name: 'DetailCommentInfo',
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      showDate:  function(value) {
        let date = new Date(value*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  }

</script>
<style scoped>
  .comment-info {
    padding: 5px 12px;
    border-bottom: 5px solid #f2f5f8;
  }

  .header-info {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    color: #333;
  }

  .header-info .user-comment {
    float: left;
    height: 50px;
    width: 60px;
    font-size: 15px;
  }

  .header-info .comment-more {
    margin: 0 10px 0 0;
    font-size: 13px;
    float: right;
  }

  .to-right {
    height: 9px;
    width: 9px;
    border-top: 1px solid #999;
    border-right: 1px solid #999;
    /* rotate(angle)	定义 2D 旋转，在参数中规定角度。 */
    transform: rotate(45deg);
    /*  不加此样式显示 | 
    inline-block行内块元素  inline行内元素 block块元素 
    行内块元素实际就是把块元素以行的形式展现，保留了块元素可以设置的对应CSS属性。
    css使用display:inline-block样式可以生成行内块元素。
    */
    display: inline-block;
    margin-left: 2px;
  }

  .user-info {
    display: flex;
    /* 让元素垂直中心对齐 */
    align-items: center;
    padding: 10px 0 5px;

  }

  .user-info img {
    height: 42px;
    width: 42px;  
    border-radius: 50%;
  }

  .user-info span {
    font-size: 15px;
    color: #333;
    margin: 0 0 0 10px;
  }

  .detail-info {
    padding: 0 5px 15px;
  }

  .detail-info .comment-content {
    font-size: 14px;
    color: #777;
  }

  .detail-info .comment-other {
    margin: 10px 0 0;
  }

  .detail-info .comment-date , .detail-info .comment-style {
    color: #999;
    font-size: 12px;
  }

  .detail-info .comment-date {
    margin-right: 8px;
  }
</style>