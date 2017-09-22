<style lang="scss">
  .au-table-examples {
    padding: 40px;
  }
</style>

<template>
  <div class="au-table-examples">
    <au-table :striped="true">
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>
    </au-table>
    <p>---------------</p>
    <au-table>
      <thead>
        <tr>
          <th>a</th>
          <th>b</th>
          <th>c</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr>
          <td>4</td>
          <td>5</td>
          <td>6</td>
        </tr>
        <tr>
          <td>7</td>
          <td>8</td>
          <td>9</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>q</td>
          <td>t</td>
          <td>j</td>
        </tr>
      </tfoot>
    </au-table>
    <p>---------------</p>
    <au-table :bordered="true" :striped="true">
      <thead>
        <tr>
          <th>#</th>
          <th>项目</th>
          <th>发布时间</th>
          <th>状态</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Cube</td>
          <td>2016-12-14</td>
          <td>已发布</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Stream</td>
          <td>2017-03-15</td>
          <td>开发中</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Web2Data</td>
          <td>2017-05-20</td>
          <td>开发中</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Admin System</td>
          <td>2017-05-30</td>
          <td>开发中</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4">当前显示10行，共100行</td>
        </tr>

      </tfoot>
    </au-table>
    <p>---------------</p>
    <au-table>
      <thead>
        <tr>
          <th>a</th>
          <th>b</th>
          <th>c</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr>
          <td>4</td>
          <td>5</td>
          <td>6</td>
        </tr>
        <tr>
          <td>7</td>
          <td>8</td>
          <td>9</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">ds: 2</td>
        </tr>
      </tfoot>
    </au-table>
  </div>
</template>

<script>
  export default {
    name: 'au-table-examples'
  }
</script>
