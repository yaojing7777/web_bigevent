$(function () {
  getUserInofo();

  // 退出登录
  $("#btnLogout").click(() => {
    layui.layer.confirm(
      "确定退出登录？",
      { icon: 3, title: "" },
      function (index) {
        // 清空本地存储里面的 token
        localStorage.removeItem("token");
        // 重新跳转到登录页面
        location.href = "/login.html";
      }
    );
  });
});

const layer = layui.layer;

//获取用户信息
function getUserInofo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    //在请求头里面注入token
    // headers: {
    //   Authorization: localStorage.getItem("token"),
    // },
    success: (res) => {
      console.log(res);
      if (res.status !== 0) return layer.msg("获取用户信息失败！");
      layer.msg("获取用户信息成功！");
      //调用渲染头像函数
      renderAvatar(res.data);
    },
    //不论成功还是失败，最终都会调用complete回调函数
    // complete: (res) => {
    //   console.log(res);
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === "身份认证失败！"
    //   ) {
    //     localStorage.removeItem("token");
    //     location.href = "/login.html";
    //   }
    // },
  });
}

// 渲染用户头像
const renderAvatar = (user) => {
  // 获取用户名字
  let name = user.nickname || user.username;
  // 设置欢迎文本
  $("#welcome").html(`欢迎 ${name}`);
  // 按需渲染用户头像
  if (user.user_pic !== null) {
    // 渲染图片头像
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    // 渲染文本头像
    $(".layui-nav-img").hide();
    let firstName = name[0].toUpperCase();
    $(".text-avatar").html(firstName);
  }
};

function change() {
  $("#art_list").addClass("layui-this").next().removeClass("layui-this");
}
