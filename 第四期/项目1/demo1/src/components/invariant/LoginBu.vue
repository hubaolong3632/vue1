<template>
  <div class="container-fluid">
    <div class="row">

      <div class="col-lg-8 col-md-2  col-sm-0  col-0"  :style="v1">
      </div>

      <div class=" col-lg-4 col-md-9 col-sm-12 col-12" style="margin-top:7rem!important   ; " >
        <div class="w-lg-600px bg-body rounded shadow-sm p-10  mx-auto" style="opacity: 0.9;">
          <div id="model">
            <br>

            <a href="https://0.00000.work/" style="text-decoration: none;  color: black; cursor: pointer;">
              <div class="container mt-3 pt-sm-2">
                <h1 class="aiText" style="font-weight: bold; position: relative; font-size: 25px" >
                  <span class="badge rounded-pill bg-secondary">AI</span>&nbsp;AI伴侣
                </h1>
              </div>
            </a>
            <br>

            <div class="container mt-3 pt-sm-2" >
              <h1  style="font-weight: bold; position: relative;font-size: 30px" >
                欢迎来到您的用户中心
              </h1>
            </div>
            <div class="container mt-3 pt-sm-2" >
              <h1  style="font-weight: bold; position: relative;font-size: 20px;color: #a6a3a3;" >
                请登入
              </h1>
            </div>

            <form class="form-signin" method="post" action="/signin">
              <div class="container mt-3 pt-sm-2" >
                <div class="form-floating mb-3 mt-3">
                  <input type="text" class="form-control" id="name" placeholder="" name="name"  style="width: 80%; height: 40%">
                  <label for="name">用户名</label>
                </div>
                <br>

                <div class="form-floating mt-3 mb-3">
                  <input type="password" class="form-control" id="password" style="width: 80%; height: 40%" placeholder="" name="password">
                  <label for="password">密码</label>
                </div>

                <p style="font-size: 15px; color:red   ;">账号密码错误</p>

                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something" checked>
                  <label class="form-check-label" for="check1" style="font-weight: bold; position: relative;font-size: 15px;color: #a6a3a3;">记住我</label>
                </div>
                <br>
                <button type="submit" class="btn btn-outline-success" style="width: 30%">登入</button> <div class="spinner-border text-primary spinner-border-sm"></div>
              </div>
            </form>

            <br>
            <br>

            <div class="container mt-3">
              <ul class="list-inline">
                <a class="list-inline-item" href="#">QQ登入</a>
                <a class="list-inline-item" href="#">创建用户</a>
                <a class="list-inline-item" href="#">忘记密码?</a>
              </ul>
            </div>

            <br>
            <br>
            <br>
          </div>

        </div>


      </div>

    </div>
  </div>


</template>

<script>
export default {
  name: "LoginBu",
  data(){
    return {
      v1:{
        background: `url(${require('../image/xk1.png')})`,
      },
      // image2:`url(${require('../image/bjt.png')})`,
    }
  },


}
</script>

<style scoped>
/*<!--        当为手机的时候-->*/
@media (max-width:1000px) {
  .imgClass {
    display: none;
  }
  .body{

    background-image: url("../image/bjt.png");
    /*background-image: none;*/
  }
}

.aiText::before {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 3px;
  background-color: blue;
  transition: width 0.3s;
}

.aiText:hover::before {
  width: 100%;
}

/*屏幕左右两边*/
.list-inline-item {
  color: gray;
  text-decoration: none;
  position: relative;
}
.list-inline-item::before {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: black;
  transition: width 0.3s ease-out;
}
.list-inline-item:hover::before {
  width: 100%;
}
</style>