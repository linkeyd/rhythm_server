/**
 * Created by john_ on 2017/1/18.
 */


var index = (function () {
    var token = "";
    var checkBox = $("#form-data");
    var file = $("#file");
    var btnAdd = $(".btn-add");
    var btnDelete = $(".btn-delete");
    var inputJson = $(".data-json");

    var loadData = $("#load-data");
    /**
     * 开启form-data
     */
    var openFormData = function () {
        checkBox.click(function () {
            if (checkBox.prop("checked")) {
                file.show();
            }
            else {
                file.hide();
            }
        })
    };
    /**
     * 添加JSON参数
     */
    var addParameter = function () {
        btnAdd.click(function () {
            inputJson.append('<div class="row input-json">' +
                '<div class="col-lg-6">' +
                '<input type="text" name="code" id="code" class="form-control">' +
                '</div>' +
                '<div class="col-lg-6">' +
                '<input type="text" name="code" id="code" class="form-control">' +
                '</div>' +
                '</div>');
        });
    };
    /**
     * 删除多余参数
     */
    var deleteParameter = function () {
        btnDelete.click(function () {
            var row = inputJson.children(".row");
            row[row.length - 1].remove();
        })
    };
    /**
     * 加载AJAX
     */
    var loadAjax = function () {
        loadData.click(function () {
            var url = $("#url").val();
            var type  = ajaxType();
            if (checkBox.prop("checked")) {
                $.ajax({
                    url: url,
                    type: type,
                    data: formData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: callback,
                    error: callback
                })
            }
            else {
                $.ajax({
                    url: url,
                    dataType:"json",
                    type: type,
                    data: parseJson,
                    success: callback,
                    error: callback
                })
            }

        });
    };
    /**
     * 判断提交测试类型
     * @returns {string}
     */
    var ajaxType = function () {
        var type = "";
        var arr = ["get", "post", "put", "delete"];
        var typeVal = $("input[name='type']");
        for (var i = 0; i < typeVal.length; i++) {
            if (typeVal[i].checked) {
                type = arr[i];
            }
        }
        return type;
    };
    /**
     * 序列化表单提交
     * @returns {*}
     */
    var formData = function () {
        var inputData = $(".data-json .row");
        var form = new FormData(file[0]);
        form.append("token", token);
        for (var i = 0; i < inputJson.children(".row").length; i++) {
            var key = inputData.eq(i).find("input").eq(0).val();
            var value = inputData.eq(i).find("input").eq(1).val();
            form.append(key, value);
        }
        return form;
    };
    /**
     * 将input的值转化为JSON
     * @returns {{}}
     */
    var parseJson = function () {
        var inputData = $(".data-json .row");
        var json = {};
        json["token"] = token;
        for (var i = 0; i < inputJson.children(".row").length; i++) {
            var key = inputData.eq(i).find("input").eq(0).val();
            var value = inputData.eq(i).find("input").eq(1).val();
            if (key != "") {
                json[key] = value;
            }
        }
        return json;
    };
    /**
     * 回调函数
     * @param data
     */
    var callback = function (data) {
        var showData = $(".show-data");
        showData.html(JSON.stringify(data));
    };
    return {
        init: function () {
            openFormData();
            addParameter();
            deleteParameter();
            loadAjax();
        }
    }
})(window);
index.init();