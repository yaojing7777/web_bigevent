$(function () {
  $("#link_reg").click(() => {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").click(() => {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  const form = layui.form;

  //定义表单验证规则
  form.verify({
    //密码规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],
    //定义密码确认规则
    repwd: (val) => {
      const pwd = $(".reg-box [name=password]").val();
      if (pwd !== val) return "两次密码不一致";
    },
  });

  const layer = layui.layer;
  const baseUrl = "http://www.liulongbin.top:3007";

  //发送注册请求
  $("#form_reg").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: baseUrl + "/api/reguser",
      data: {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg("注册成功！");
        // 注册成功后跳转到登录界面
        $("#link_login").click();
      },
    });
  });

  //登录请求
  // 监听登录表单，发送登录请求
  $("#form_login").submit((e) => {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: baseUrl + "/api/login",
      data: $("#form_login").serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg("登录成功！");
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem("token", res.token);
        // 跳转到主页
        location.href = "/index.html";
      },
    });
  });
});
